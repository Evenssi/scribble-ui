import * as React from 'react';

// Note: this component does NOT import its CSS file directly, because
// some bundlers (e.g. Next.js) restrict where third-party CSS can be
// imported. Consumers must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';   // bundles all component CSS

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'wavy';
export type DividerLabelAlign = 'start' | 'center' | 'end';
export type DividerThickness = 'thin' | 'default' | 'bold';

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  /**
   * Layout orientation. Defaults to `'horizontal'`.
   *
   * `'vertical'` divides content laid out side-by-side (e.g. inside a
   * flex row). The host container decides the rendered height — the
   * divider stretches to it via `align-self: stretch` when used in a
   * flex layout, or you can set a fixed height yourself.
   */
  orientation?: DividerOrientation;

  /**
   * Stroke style. Defaults to `'solid'`.
   *
   * - `'solid'` / `'dashed'` use CSS `border-style` plus the hand-drawn
   *   wobble filter so straight lines still feel sketched.
   * - `'wavy'` paints an SVG wave as a repeating background image —
   *   `border-style: wavy` is not a thing in CSS.
   */
  variant?: DividerVariant;

  /**
   * Optional label rendered in the middle of a horizontal divider
   * (e.g. `OR`, `Today`). Ignored when `orientation` is `'vertical'`;
   * a one-shot `console.warn` fires in development if both are set.
   */
  children?: React.ReactNode;

  /** Alignment of the label along the divider. Defaults to `'center'`. */
  labelAlign?: DividerLabelAlign;

  /**
   * Stroke thickness preset. Defaults to `'default'`.
   *
   * Maps to `--su-stroke-thin` / `--su-stroke-default` / `--su-stroke-bold`.
   * For the wavy variant, the SVG path's stroke-width is bumped instead.
   */
  thickness?: DividerThickness;

  /** Optional extra className appended after the built-in classes. */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Divider — a hand-drawn looking horizontal or vertical separator.
 *
 * Renders a `<div role="separator">` with `aria-orientation` so assistive
 * tech announces it correctly. Three stroke variants (`solid`, `dashed`,
 * `wavy`), three thickness presets, and an optional inline label that
 * splits the line into two segments around it.
 *
 * Make sure to import the base styles and mount `<HandDrawnFilters />`
 * at your app root for the wobble to take effect.
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      variant = 'solid',
      labelAlign = 'center',
      thickness = 'default',
      children,
      className,
      role,
      ...rest
    },
    ref
  ) {
    const isVertical = orientation === 'vertical';
    const hasLabel =
      !isVertical && children !== undefined && children !== null && children !== false;

    if (
      process.env.NODE_ENV !== 'production' &&
      isVertical &&
      children !== undefined &&
      children !== null &&
      children !== false
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        '[scribble-ui] <Divider>: children are ignored when orientation is vertical.'
      );
    }

    const classes = cx(
      'su-divider',
      `su-divider--${orientation}`,
      `su-divider--${variant}`,
      `su-divider--${thickness}`,
      hasLabel && 'su-divider--with-label',
      hasLabel && `su-divider--label-${labelAlign}`,
      className
    );

    if (hasLabel) {
      return (
        <div
          ref={ref}
          role={role ?? 'separator'}
          aria-orientation="horizontal"
          className={classes}
          {...rest}
        >
          <span className="su-divider__line" aria-hidden="true" />
          <span className="su-divider__label">{children}</span>
          <span className="su-divider__line" aria-hidden="true" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={role ?? 'separator'}
        aria-orientation={orientation}
        className={classes}
        {...rest}
      />
    );
  }
);

Divider.displayName = 'Divider';
