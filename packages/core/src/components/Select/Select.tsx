import * as React from 'react';
import { createPortal } from 'react-dom';
import { Option } from './Option';
import {
  SelectContext,
  type RegisteredOption,
  type SelectContextValue,
} from './SelectContext';

// Note: this component does NOT import its CSS file directly. Consumers
// must import `scribble-ui/styles/components.css` once at the app root.

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Controlled selected value. Pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Fires with the picked value whenever the selection changes. */
  onChange?: (value: string) => void;
  /** Array form. Mutually exclusive with `children`; if both given, children win. */
  options?: SelectOptionItem[];
  /** JSX form. `<Option>` children. Wins over `options` when both are present. */
  children?: React.ReactNode;
  /** Text shown when no value is selected. */
  placeholder?: string;
  /** Visual size — matches Input. */
  size?: SelectSize;
  /** Disable the entire select. */
  disabled?: boolean;
  /** Render with the danger color. */
  error?: boolean;
  /** Helper text rendered under the select. Picks danger color when `error`. */
  helperText?: React.ReactNode;
  /** Optional className appended to the trigger button. */
  className?: string;
  /** Optional className on the outermost wrapper. */
  wrapperClassName?: string;
  /** Optional className on the listbox (portalled). */
  listboxClassName?: string;
  /** Native form name. */
  name?: string;
  /** Native id (forwarded to the trigger button). */
  id?: string;
  /** aria-label for the trigger when no visible label is provided. */
  'aria-label'?: string;
  /** aria-labelledby for the trigger. */
  'aria-labelledby'?: string;
  /** Called when the listbox opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let selectIdCounter = 0;
const nextSelectId = (): string => `su-select-${++selectIdCounter}`;

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const VIEWPORT_PADDING = 8;
const TYPEAHEAD_RESET_MS = 350;

interface ListboxPosition {
  top: number;
  left: number;
  width: number;
  /** True if we flipped to render above the trigger. */
  above: boolean;
}

/** Compute listbox absolute (page-coord) position; flips up if no room below. */
function computeListboxPosition(
  triggerRect: DOMRect,
  listboxHeight: number
): ListboxPosition {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const viewportH = window.innerHeight;

  const spaceBelow = viewportH - triggerRect.bottom - VIEWPORT_PADDING;
  const spaceAbove = triggerRect.top - VIEWPORT_PADDING;

  // Prefer below; flip up only if it doesn't fit AND above has more room.
  const above =
    spaceBelow < listboxHeight && spaceAbove > spaceBelow;

  return {
    top: above
      ? scrollY + triggerRect.top - listboxHeight - 4
      : scrollY + triggerRect.bottom + 4,
    left: scrollX + triggerRect.left,
    width: triggerRect.width,
    above,
  };
}

/**
 * Hand-drawn dropdown picker.
 *
 * Visually inherits the Input wrapper look (paper background, hand-drawn
 * border, wobble filter) so a Select sits naturally next to inputs in a
 * form. The listbox itself is portalled into `document.body` to escape
 * any ancestor `overflow: hidden` and rendered as a sticky-note panel.
 *
 * Keyboard model (combobox + listbox pattern):
 *   - Space / Enter / ArrowDown / ArrowUp open the closed listbox
 *   - ArrowDown / ArrowUp move highlight (skipping disabled)
 *   - Home / End jump to first / last enabled
 *   - Enter / Space select the highlighted option and close
 *   - Esc closes without changing
 *   - Tab closes; selection is committed only via Enter / Space / click
 *   - Letter keys typeahead (350ms reset) jump to the next matching label
 */
export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onChange,
  options,
  children,
  placeholder = 'Select…',
  size = 'md',
  disabled = false,
  error = false,
  helperText,
  className,
  wrapperClassName,
  listboxClassName,
  name,
  id,
  onOpenChange,
  ...ariaRest
}) => {
  // ---- controlled / uncontrolled bridge -----------------------------------
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<string | undefined>(
    defaultValue
  );
  const selectedValue = isControlled ? value : innerValue;

  // ---- ids ----------------------------------------------------------------
  const idBaseRef = React.useRef<string | null>(null);
  if (idBaseRef.current === null) idBaseRef.current = nextSelectId();
  const idBase = idBaseRef.current;
  const triggerId = id ?? `${idBase}-trigger`;
  const listboxId = `${idBase}-listbox`;

  // ---- options meta (render-time, NOT mount-dependent) -------------------
  // We resolve the canonical list of options *before* the listbox mounts so
  // that things like the trigger label, keyboard navigation, and typeahead
  // work even while the listbox is closed (the listbox only mounts inside
  // a portal when `open` flips to true). For JSX children we shallow-walk
  // <Option> elements and read `value` / `label` / `disabled` straight off
  // their props, falling back to the same string-children rule that Option
  // itself uses internally.
  const hasChildren = React.Children.count(children) > 0;
  const optionsMeta = React.useMemo(() => {
    if (hasChildren) {
      const collected: Array<{
        value: string;
        label: string;
        disabled: boolean;
      }> = [];
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        const props = child.props as {
          value?: string;
          label?: string;
          disabled?: boolean;
          children?: React.ReactNode;
        };
        if (typeof props.value !== 'string') return;
        const label =
          props.label ??
          (typeof props.children === 'string' ? props.children : props.value);
        collected.push({
          value: props.value,
          label,
          disabled: !!props.disabled,
        });
      });
      return collected;
    }
    return (options ?? []).map((opt) => ({
      value: opt.value,
      label: opt.label,
      disabled: !!opt.disabled,
    }));
  }, [hasChildren, children, options]);

  // ---- registered options (mount-time, used for aria-activedescendant) ---
  // Each <Option> still self-registers its DOM id via SelectContext. We
  // need that for `aria-activedescendant`, which must point at a real
  // element id; everything else (label, keyboard nav, typeahead) reads
  // `optionsMeta` above and works regardless of whether Option is mounted.
  const [registered, setRegistered] = React.useState<RegisteredOption[]>([]);
  const register = React.useCallback((opt: RegisteredOption) => {
    setRegistered((prev) => {
      // de-dupe by id (StrictMode can register twice)
      if (prev.some((o) => o.id === opt.id)) return prev;
      return [...prev, opt];
    });
    return () => {
      setRegistered((prev) => prev.filter((o) => o.id !== opt.id));
    };
  }, []);

  // ---- open state ---------------------------------------------------------
  const [open, setOpen] = React.useState(false);
  const setOpenSafe = React.useCallback(
    (next: boolean) => {
      setOpen((prev) => {
        if (prev === next) return prev;
        onOpenChange?.(next);
        return next;
      });
    },
    [onOpenChange]
  );

  // ---- highlight ----------------------------------------------------------
  const [highlightedValue, setHighlightedValue] = React.useState<
    string | undefined
  >(undefined);

  // Reset highlight to selected (or first enabled) every time we open.
  React.useEffect(() => {
    if (!open) return;
    const startFrom =
      optionsMeta.find((o) => o.value === selectedValue && !o.disabled) ??
      optionsMeta.find((o) => !o.disabled);
    setHighlightedValue(startFrom?.value);
  }, [open, optionsMeta, selectedValue]);

  const isHighlighted = React.useCallback(
    (v: string) => highlightedValue === v,
    [highlightedValue]
  );

  const activeOption = registered.find((o) => o.value === highlightedValue);
  const activeId = activeOption?.id ?? '';

  // ---- pick ---------------------------------------------------------------
  const pick = React.useCallback(
    (next: string) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
      setOpenSafe(false);
      // Return focus to the trigger so the user can keep tab-navigating.
      triggerRef.current?.focus();
    },
    [isControlled, onChange, setOpenSafe]
  );

  // ---- positioning --------------------------------------------------------
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);
  const [position, setPosition] = React.useState<ListboxPosition>({
    top: 0,
    left: 0,
    width: 0,
    above: false,
  });
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const updatePosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    const listbox = listboxRef.current;
    if (!trigger) return;
    const listH = listbox?.offsetHeight ?? 0;
    setPosition(computeListboxPosition(trigger.getBoundingClientRect(), listH));
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition, registered.length]);

  React.useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updatePosition);
      if (triggerRef.current) ro.observe(triggerRef.current);
      if (listboxRef.current) ro.observe(listboxRef.current);
    }
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [open, updatePosition]);

  // ---- outside click ------------------------------------------------------
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        listboxRef.current?.contains(target)
      ) {
        return;
      }
      setOpenSafe(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, setOpenSafe]);

  // ---- keep highlight in view --------------------------------------------
  React.useEffect(() => {
    if (!open || !activeId) return;
    const node = document.getElementById(activeId);
    node?.scrollIntoView({ block: 'nearest' });
  }, [open, activeId]);

  // ---- typeahead ----------------------------------------------------------
  const typeBufferRef = React.useRef('');
  const typeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeahead = React.useCallback(
    (char: string) => {
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
      typeBufferRef.current = (typeBufferRef.current + char).toLowerCase();
      const buf = typeBufferRef.current;
      // Find first enabled option whose label starts with buffer.
      const candidate = optionsMeta.find(
        (o) => !o.disabled && o.label.toLowerCase().startsWith(buf)
      );
      if (candidate) {
        setHighlightedValue(candidate.value);
        if (!open) setOpenSafe(true);
      }
      typeTimerRef.current = setTimeout(() => {
        typeBufferRef.current = '';
      }, TYPEAHEAD_RESET_MS);
    },
    [optionsMeta, open, setOpenSafe]
  );

  React.useEffect(() => {
    return () => {
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
    };
  }, []);

  // ---- keyboard ------------------------------------------------------------
  const moveHighlight = React.useCallback(
    (direction: 1 | -1) => {
      const enabled = optionsMeta.filter((o) => !o.disabled);
      if (enabled.length === 0) return;
      const currentIdx = enabled.findIndex((o) => o.value === highlightedValue);
      const nextIdx =
        currentIdx === -1
          ? direction === 1
            ? 0
            : enabled.length - 1
          : (currentIdx + direction + enabled.length) % enabled.length;
      const nextOption = enabled[nextIdx];
      if (nextOption) setHighlightedValue(nextOption.value);
    },
    [optionsMeta, highlightedValue]
  );

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const key = event.key;
    if (!open) {
      if (
        key === 'ArrowDown' ||
        key === 'ArrowUp' ||
        key === 'Enter' ||
        key === ' '
      ) {
        event.preventDefault();
        setOpenSafe(true);
        return;
      }
      if (key.length === 1 && /\S/.test(key)) {
        event.preventDefault();
        typeahead(key);
      }
      return;
    }
    // open
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        moveHighlight(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveHighlight(-1);
        break;
      case 'Home': {
        event.preventDefault();
        const first = optionsMeta.find((o) => !o.disabled);
        if (first) setHighlightedValue(first.value);
        break;
      }
      case 'End': {
        event.preventDefault();
        const enabled = optionsMeta.filter((o) => !o.disabled);
        const last = enabled[enabled.length - 1];
        if (last) setHighlightedValue(last.value);
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (highlightedValue) pick(highlightedValue);
        break;
      case 'Escape':
        event.preventDefault();
        setOpenSafe(false);
        break;
      case 'Tab':
        // Don't preventDefault — let focus move naturally.
        setOpenSafe(false);
        break;
      default:
        if (key.length === 1 && /\S/.test(key)) {
          event.preventDefault();
          typeahead(key);
        }
    }
  };

  // ---- displayed label ----------------------------------------------------
  // Reads from `optionsMeta` so the trigger shows the right label even
  // before the listbox has ever been opened (i.e. before any <Option> has
  // mounted and self-registered).
  const displayLabel = React.useMemo(() => {
    if (selectedValue === undefined) return undefined;
    const found = optionsMeta.find((o) => o.value === selectedValue);
    return found?.label ?? selectedValue;
  }, [selectedValue, optionsMeta]);

  // ---- context value ------------------------------------------------------
  const ctx = React.useMemo<SelectContextValue>(
    () => ({
      selectedValue,
      activeId,
      idBase,
      onPick: pick,
      register,
      setHighlightedValue: (v) => setHighlightedValue(v),
      isHighlighted,
    }),
    [selectedValue, activeId, idBase, pick, register, isHighlighted]
  );

  // ---- option nodes -------------------------------------------------------
  // children win when both `options` and JSX children are passed.
  const optionNodes = hasChildren
    ? children
    : (options ?? []).map((opt) => (
        <Option
          key={opt.value}
          value={opt.value}
          label={opt.label}
          disabled={opt.disabled}
        >
          {opt.label}
        </Option>
      ));

  // ---- listbox JSX --------------------------------------------------------
  const listbox =
    mounted && open ? (
      createPortal(
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          className={cx(
            'su-select__listbox',
            position.above && 'su-select__listbox--above',
            listboxClassName
          )}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            minWidth: position.width,
          }}
        >
          {optionNodes}
        </ul>,
        document.body
      )
    ) : null;

  return (
    <SelectContext.Provider value={ctx}>
      <span className={cx('su-select', wrapperClassName)}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open && activeId ? activeId : undefined}
          aria-invalid={error || undefined}
          aria-label={ariaRest['aria-label']}
          aria-labelledby={ariaRest['aria-labelledby']}
          disabled={disabled}
          className={cx(
            'su-select__trigger',
            `su-select__trigger--${size}`,
            error && 'su-select__trigger--error',
            disabled && 'su-select__trigger--disabled',
            open && 'su-select__trigger--open',
            !displayLabel && 'su-select__trigger--placeholder',
            className
          )}
          onClick={() => {
            if (disabled) return;
            setOpenSafe(!open);
          }}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="su-select__value">
            {displayLabel ?? placeholder}
          </span>
          <span className="su-select__caret" aria-hidden="true">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              focusable="false"
              aria-hidden="true"
            >
              <path
                d="M2.5 4.5 L6 8 L9.5 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Hidden native input so this Select participates in <form> submits. */}
        {name ? (
          <input
            type="hidden"
            name={name}
            value={selectedValue ?? ''}
            // Read-only; the parent button is the source of truth.
          />
        ) : null}

        {helperText ? (
          <span
            className={cx(
              'su-select__helper',
              error && 'su-select__helper--error'
            )}
          >
            {helperText}
          </span>
        ) : null}

        {listbox}
      </span>
    </SelectContext.Provider>
  );
};

Select.displayName = 'Select';
