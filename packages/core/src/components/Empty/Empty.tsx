import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// import the aggregated stylesheet once via `scribble-ui/styles/components.css`.

export type EmptySize = 'sm' | 'md' | 'lg';
export type EmptyPreset = 'default' | 'search' | 'data';

export interface EmptyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Built-in illustration preset. Ignored when `image` is provided.
   * Defaults to `'default'` — an empty sticky note with a pencil.
   */
  preset?: EmptyPreset;

  /**
   * Custom illustration node. Overrides `preset`. Can be any ReactNode
   * (SVG, <img>, emoji…). Rendered inside `.su-empty__image` so it
   * stays centered and scales with `size`.
   */
  image?: React.ReactNode;

  /**
   * Primary headline. Defaults to `'No data'` so the component stays
   * announceable by screen readers even without props.
   */
  title?: React.ReactNode;

  /**
   * Supporting copy displayed below the title.
   */
  description?: React.ReactNode;

  /**
   * Action slot. Typically holds 0–2 `<Button>`s or links.
   */
  action?: React.ReactNode;

  /**
   * Overall visual scale. Affects illustration height and typography.
   * Defaults to `'md'`.
   */
  size?: EmptySize;

  /**
   * When true, wraps the content in a sticky-note enclosure (paper
   * background, hand-drawn border, hard offset shadow, slight tilt).
   * When false (default), renders as transparent plain stack.
   */
  bordered?: boolean;
}

/**
 * DefaultPreset — an empty sticky note with a pencil laid across it.
 * Lines inherit color via `currentColor` so the illustration tints with
 * the surrounding `--su-color-ink` text color.
 */
function DefaultPreset(): JSX.Element {
  return (
    <svg
      className="su-empty__svg"
      viewBox="0 0 120 96"
      aria-hidden="true"
      focusable="false"
    >
      {/* sticky note body */}
      <g transform="rotate(-4 60 48)">
        <path
          d="M24 20 H92 V78 H24 Z"
          fill="var(--su-note-yellow)"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* ruled lines */}
        <path
          d="M32 36 H84 M32 46 H78 M32 56 H82 M32 66 H70"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>
      {/* pencil */}
      <g transform="rotate(18 72 60)">
        <rect
          x="46"
          y="72"
          width="44"
          height="8"
          fill="var(--su-note-orange)"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* pencil tip */}
        <path
          d="M90 72 L98 76 L90 80 Z"
          fill="var(--su-bg-paper)"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* eraser */}
        <rect
          x="40"
          y="72"
          width="6"
          height="8"
          fill="var(--su-note-pink)"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/**
 * SearchPreset — a hand-drawn magnifier over a torn note corner.
 */
function SearchPreset(): JSX.Element {
  return (
    <svg
      className="su-empty__svg"
      viewBox="0 0 120 96"
      aria-hidden="true"
      focusable="false"
    >
      {/* translucent note corner hint */}
      <path
        d="M14 58 L14 86 L54 86 L54 72 L40 72 L40 58 Z"
        fill="var(--su-note-blue)"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* magnifier ring */}
      <circle
        cx="66"
        cy="42"
        r="24"
        fill="var(--su-bg-paper)"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      {/* highlight inside ring */}
      <path
        d="M54 34 Q58 28 66 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* handle */}
      <path
        d="M84 60 L102 80"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * DataPreset — an empty archive box / open folder.
 */
function DataPreset(): JSX.Element {
  return (
    <svg
      className="su-empty__svg"
      viewBox="0 0 120 96"
      aria-hidden="true"
      focusable="false"
    >
      {/* folder back */}
      <path
        d="M18 28 H46 L54 36 H102 V80 H18 Z"
        fill="var(--su-note-mint)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* folder front flap */}
      <path
        d="M22 44 H98 L94 80 H18 Z"
        fill="var(--su-bg-paper)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* dotted empty indicator */}
      <path
        d="M44 62 H76"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 5"
        opacity="0.55"
      />
    </svg>
  );
}

function renderPreset(preset: EmptyPreset): JSX.Element {
  switch (preset) {
    case 'search':
      return <SearchPreset />;
    case 'data':
      return <DataPreset />;
    case 'default':
    default:
      return <DefaultPreset />;
  }
}

/**
 * Empty — a placeholder shown when a list, search, or data region has
 * nothing to render. Ships three built-in illustrations and accepts a
 * fully custom one via `image`.
 *
 * Renders as `<div role="status" aria-live="polite">` so assistive
 * technologies announce the empty state when it appears.
 *
 * Make sure to import the base styles and mount `<HandDrawnFilters />`
 * once at your app root — see the package README for setup.
 */
export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  function Empty(
    {
      preset = 'default',
      image,
      title,
      description,
      action,
      size = 'md',
      bordered = false,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const classes = [
      'su-empty',
      `su-empty--size-${size}`,
      bordered ? 'su-empty--bordered' : null,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Fallback copy keeps the component announceable even when the
    // caller omits both `title` and `description`.
    const resolvedTitle =
      title !== undefined && title !== null && title !== ''
        ? title
        : description === undefined || description === null || description === ''
        ? 'No data'
        : null;

    const illustration = image ?? renderPreset(preset);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={classes}
        {...rest}
      >
        <div className="su-empty__image">{illustration}</div>

        {resolvedTitle !== null && resolvedTitle !== undefined ? (
          <div className="su-empty__title">{resolvedTitle}</div>
        ) : null}

        {description !== undefined && description !== null && description !== '' ? (
          <div className="su-empty__description">{description}</div>
        ) : null}

        {action !== undefined && action !== null ? (
          <div className="su-empty__action">{action}</div>
        ) : null}

        {children !== undefined && children !== null ? (
          <div className="su-empty__extra">{children}</div>
        ) : null}
      </div>
    );
  }
);

Empty.displayName = 'Empty';
