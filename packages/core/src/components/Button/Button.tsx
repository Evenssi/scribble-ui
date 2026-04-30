import * as React from 'react';

// Note: this component does NOT import its CSS file directly, because
// some bundlers (e.g. Next.js) restrict where third-party CSS can be
// imported. Consumers must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';   // bundles all component CSS

export type ButtonVariant = 'default' | 'primary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /**
   * Visual variant. Defaults to `'default'` (paper-white background).
   * `'primary'` uses the brand low-saturation green.
   */
  variant?: ButtonVariant;

  /**
   * Size preset. Defaults to `'md'`.
   * - `'sm'` ~ 32px tall, body-small font
   * - `'md'` ~ 44px tall, h3 font
   * - `'lg'` ~ 56px tall, h2 font
   */
  size?: ButtonSize;

  /**
   * Optional extra className appended after the built-in classes,
   * letting consumers add layout utilities or override styles.
   */
  className?: string;
}

/**
 * Button — a hand-drawn looking button.
 *
 * Day 1 placeholder: token-based styles only. The hand-drawn wobble
 * (SVG filter `#su-hand-c`) will be wired in on Day 2; the hook is
 * already reserved as a commented-out declaration in `Button.css`.
 *
 * Make sure to import the base styles and mount `<HandDrawnFilters />`
 * at your app root, see the package README for setup.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'default', size = 'md', className, type, children, ...rest },
    ref
  ) {
    const classes = [
      'su-btn',
      `su-btn--${variant}`,
      `su-btn--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type ?? 'button'} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);
