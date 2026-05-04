import * as React from 'react';

// Note: this component does NOT import its CSS file directly — see the
// Button/Input components for the rationale. The consumer imports
// `scribble-ui/styles/components.css` once at app root.

export type ResultStatus =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | '404'
  | '403'
  | '500';

export interface ResultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Result status. Drives the built-in icon and the accent color.
   * Defaults to `'info'`.
   */
  status?: ResultStatus;

  /**
   * Custom icon node. When provided it replaces the built-in SVG for
   * the current `status`. Handy for illustrations or brand marks.
   */
  icon?: React.ReactNode;

  /** Result title. Required — the whole component exists to announce one. */
  title: React.ReactNode;

  /** Optional sub-title / description shown below the title. */
  subTitle?: React.ReactNode;

  /**
   * Action slot — typically one or two `<Button>`s (primary + secondary).
   * Rendered as a horizontal row below the sub-title.
   */
  extra?: React.ReactNode;

  /**
   * Optional supplementary content rendered on a sticky-note surface
   * below `extra` — e.g. an "error details" code block or a "what to do
   * next" checklist. Only rendered when `children` is truthy.
   */
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------ *
 *  Built-in status icons.
 *  All strokes use `currentColor` so the `.su-result--status-*` rule
 *  is the single source of truth for the accent.
 * ------------------------------------------------------------------ */

const ICON_VIEWBOX = '0 0 64 64';

function SuccessIcon(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-result__glyph"
    >
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 33 L29 42 L45 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-result__glyph"
    >
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 22 L42 42 M42 22 L22 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-result__glyph"
    >
      <path
        d="M32 8 L57 52 L7 52 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M32 24 L32 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="45" r="1.8" fill="currentColor" />
    </svg>
  );
}

function InfoIcon(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-result__glyph"
    >
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="21" r="2" fill="currentColor" />
      <path
        d="M32 30 L32 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Renders a big handwritten number (404 / 403 / 500) inside a dashed
 * sticky-note frame. The digit itself uses the hand font so the SVG
 * filter wobble still applies to the whole icon block.
 */
function HttpCodeIcon({ code }: { code: '404' | '403' | '500' }): JSX.Element {
  return (
    <span
      className="su-result__http"
      role="img"
      aria-hidden="true"
    >
      {code}
    </span>
  );
}

function resolveDefaultIcon(status: ResultStatus): React.ReactNode {
  switch (status) {
    case 'success':
      return <SuccessIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
      return <InfoIcon />;
    case '404':
    case '403':
    case '500':
      return <HttpCodeIcon code={status} />;
    default:
      return <InfoIcon />;
  }
}

/**
 * Result — a full-page feedback surface.
 *
 * Use for "one action / one route finished" moments: success screens,
 * failure screens, empty 404 / 403 / 500 pages, confirmation pages.
 * For "this list has no items yet" prefer `<Empty />` instead — Result
 * is heavier and leans on a single large status glyph.
 *
 * Layout (top → bottom): icon · title · sub-title · extra · children.
 *
 * Accessibility: the root gets `role="status"` + `aria-live="polite"`
 * so screen readers announce the outcome without interrupting the
 * user. The decorative SVG is marked `aria-hidden`.
 */
export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  function Result(
    {
      status = 'info',
      icon,
      title,
      subTitle,
      extra,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const classes = [
      'su-result',
      `su-result--status-${status}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderedIcon = icon ?? resolveDefaultIcon(status);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={classes}
        {...rest}
      >
        <div className="su-result__icon">{renderedIcon}</div>
        <h2 className="su-result__title">{title}</h2>
        {subTitle ? (
          <p className="su-result__subtitle">{subTitle}</p>
        ) : null}
        {extra ? <div className="su-result__extra">{extra}</div> : null}
        {children ? (
          <div className="su-result__content">{children}</div>
        ) : null}
      </div>
    );
  }
);

Result.displayName = 'Result';
