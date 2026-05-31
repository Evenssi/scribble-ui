import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

/**
 * Form layout direction.
 *
 * - `vertical` (default): label stacked above the control. The canonical
 *   layout for mobile-first and long forms.
 * - `horizontal`: label to the left of the control on a single row. Useful
 *   for dense desktop forms and settings panels.
 */
export type FormLayout = 'vertical' | 'horizontal';

export type FormSize = 'sm' | 'md' | 'lg';

// ---------------------------------------------------------------------------
// Context — layout/size inheritance only
//
// scribble-ui's Form intentionally does NOT own any form state. The D-plan
// decision is: `<Form>` + `<Form.Item>` are pure visual shells that give
// you the label / required mark / error / helper slots, and every actual
// state concern (values, validation, submit, reset, field arrays, async
// validators, cross-field rules) is delegated to a dedicated form library
// — our docs recommend react-hook-form + zod, same as shadcn/ui.
//
// The one thing this context DOES do is let `<Form.Item>` inherit the
// parent `<Form layout>` and `<Form size>` so you don't have to repeat it
// on every item. Any `<Form.Item>` prop always wins over the context.
// ---------------------------------------------------------------------------

interface FormContextValue {
  layout: FormLayout;
  size: FormSize;
}

const FormContext = createContext<FormContextValue>({
  layout: 'vertical',
  size: 'md',
});

// ---------------------------------------------------------------------------
// <Form>
// ---------------------------------------------------------------------------

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Label/control layout for every descendant `<Form.Item>`. Default `vertical`. */
  layout?: FormLayout;
  /** Size inherited by descendant `<Form.Item>`. Default `md`. */
  size?: FormSize;
  /**
   * Submit handler. Kept as a plain native handler — we do NOT swap it for a
   * library-specific signature, because `<Form>` does not own any state.
   * When driving with react-hook-form, pass `handleSubmit(onValid)` here.
   */
  onSubmit?: FormHTMLAttributes<HTMLFormElement>['onSubmit'];
  children?: ReactNode;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Visual form shell.
 *
 * `<Form>` is deliberately thin: it renders a native `<form>` with
 * `noValidate` so the browser's built-in validation UI doesn't clash with
 * your library of choice (react-hook-form + zod, formik, TanStack Form,
 * plain useState — all welcome), and it shares layout/size to every
 * descendant `<Form.Item>` via context.
 *
 * It does NOT:
 *  - hold form state
 *  - run validation
 *  - collect errors
 *  - wire up field names
 *
 * That's on purpose. See the docs for the full write-up.
 */
const FormRoot = forwardRef<HTMLFormElement, FormProps>(function Form(
  {
    layout = 'vertical',
    size = 'md',
    className,
    children,
    noValidate = true,
    ...rest
  },
  ref
) {
  const ctx = useMemo<FormContextValue>(
    () => ({ layout, size }),
    [layout, size]
  );

  return (
    <FormContext.Provider value={ctx}>
      <form
        {...rest}
        ref={ref}
        noValidate={noValidate}
        className={cx(
          'su-form',
          `su-form--${layout}`,
          `su-form--${size}`,
          className
        )}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});

// ---------------------------------------------------------------------------
// <Form.Item>
// ---------------------------------------------------------------------------

export interface FormItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Label text. Rendered in a `<label>` with `htmlFor` auto-wired when possible. */
  label?: ReactNode;
  /** Mark the label with a hand-drawn asterisk. Purely visual — does not enforce anything. */
  required?: boolean;
  /**
   * Error message. When a string is passed, rendered in the helper slot with
   * the danger color and `role="alert"`. Truthy non-string values are
   * rendered as-is (so you can ship JSX errors from zod issues etc.).
   * When set, the item also marks its children with an error affordance.
   */
  error?: ReactNode;
  /** Helper text rendered under the control. Hidden when `error` is present. */
  helperText?: ReactNode;
  /** Override the inherited `<Form layout>`. */
  layout?: FormLayout;
  /** Override the inherited `<Form size>` (currently affects label spacing only). */
  size?: FormSize;
  /**
   * Explicit `htmlFor` target. If omitted, `<Form.Item>` generates a stable
   * id and forwards it to its first child via `React.cloneElement`. Pass
   * your own here when you have multiple controls or your own id scheme.
   */
  htmlFor?: string;
  /** Optional class on the label element. */
  labelClassName?: string;
  /** Optional class on the control wrapper. */
  controlClassName?: string;
  /** The form control. Any node is accepted — we do not require a specific shape. */
  children?: ReactNode;
}

/**
 * Visual wrapper for a single form field.
 *
 * Provides:
 *  - A hand-drawn label with an optional required asterisk.
 *  - An `aria-live="polite"` error slot with `role="alert"`.
 *  - A helper slot (hidden when an error is shown).
 *  - Automatic `htmlFor`/`id` wiring for the first child that accepts an `id` prop.
 *
 * Does NOT:
 *  - Read a `value` prop or drive a controlled child.
 *  - Subscribe to any form store.
 *  - Validate anything. The `error` prop is the single source of truth for
 *    rendering — pass in whatever error string/ReactNode your chosen form
 *    library produced.
 */
function FormItem({
  label,
  required = false,
  error,
  helperText,
  layout: layoutProp,
  size: sizeProp,
  htmlFor,
  labelClassName,
  controlClassName,
  className,
  children,
  id: idProp,
  ...rest
}: FormItemProps) {
  const ctx = useContext(FormContext);
  const layout = layoutProp ?? ctx.layout;
  const size = sizeProp ?? ctx.size;

  const autoId = useId();
  const controlId = htmlFor ?? idProp ?? `su-form-item-${autoId}`;
  const helperId = `${controlId}-helper`;
  const errorId = `${controlId}-error`;

  const hasError = error !== undefined && error !== null && error !== false;

  // Render the label as a native <label> when we have something to link it
  // to; fall back to a presentational <span> otherwise. This keeps SR
  // semantics honest — a <label for="..."> that points nowhere is worse
  // than no label at all.
  const labelNode = label ? (
    <label
      htmlFor={controlId}
      className={cx('su-form-item__label', labelClassName)}
    >
      {label}
      {required ? (
        <span className="su-form-item__required" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  ) : null;

  return (
    <div
      {...rest}
      className={cx(
        'su-form-item',
        `su-form-item--${layout}`,
        `su-form-item--${size}`,
        hasError && 'su-form-item--error',
        required && 'su-form-item--required',
        className
      )}
    >
      {labelNode}

      <div className={cx('su-form-item__control', controlClassName)}>
        {/*
          Form.Item is a *purely visual* container. We deliberately do NOT
          clone children — that means we inject neither value/onChange NOR
          aria-describedby. The D-plan says injecting anything would force
          consumers to hand react-hook-form's <Controller> a bare React-
          Element, defeating the whole "bring your own state" ethos.

          What we DO provide:
            - `htmlFor` on the <label>, derived from htmlFor / id / autoId,
              so the label points at a stable id.
            - `id` on the error/helper <div>s ({controlId}-error / -helper),
              ready for the consumer to reference.
            - `role="alert"` on the error message so SR users hear it.

          What the consumer is responsible for wiring:
            <Form.Item label="Email" error={errors.email?.message} helperText="...">
              <Input
                id={controlId}                              // optional, see htmlFor flow
                aria-describedby={`${controlId}-helper ${controlId}-error`}
                aria-invalid={!!errors.email}
              />
            </Form.Item>

          (See the README "Form with react-hook-form + zod" example.)
        */}
        {children}

        {hasError ? (
          <div
            id={errorId}
            className="su-form-item__error"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        ) : helperText ? (
          <div id={helperId} className="su-form-item__helper">
            {helperText}
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Attach Form.Item as a namespaced member for ergonomic JSX authoring
// (matches the Breadcrumb.Item pattern already shipped).
type FormComponent = typeof FormRoot & { Item: typeof FormItem };
const Form = FormRoot as FormComponent;
Form.Item = FormItem;

export { Form, FormItem };
