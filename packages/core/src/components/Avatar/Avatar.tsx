import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarColor =
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'blue'
  | 'mint'
  | 'purple'
  | 'green';

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Image URL. When loading fails the avatar falls back gracefully to
   * `fallback` → `initials` → derived initials → "?" placeholder.
   */
  src?: string;

  /**
   * Alt text. Also used as the accessible label and as a fallback
   * source for auto-derived initials.
   */
  alt?: string;

  /**
   * Explicit initial letters. When omitted, initials are derived from
   * `name` (or `alt`) by taking the first letter of each whitespace
   * segment, uppercased, capped at 2 characters.
   */
  initials?: string;

  /**
   * Source string used to derive both auto-initials and a stable
   * sticky-note background color when `color` is not specified.
   */
  name?: string;

  /**
   * Custom fallback node (icon, etc.). Takes precedence over initials.
   */
  fallback?: React.ReactNode;

  /** Size preset. Defaults to `'md'` (40px). */
  size?: AvatarSize;

  /** Shape preset. Defaults to `'circle'`. */
  shape?: AvatarShape;

  /**
   * Explicit sticky-note background color. When omitted, a stable color
   * is derived from `name` so the same name always renders the same hue.
   */
  color?: AvatarColor;

  /** Optional extra className appended after the built-in classes. */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

const PALETTE: AvatarColor[] = [
  'yellow',
  'orange',
  'pink',
  'blue',
  'mint',
  'purple',
  'green',
];

/**
 * Compute up to 2 uppercase initials from a free-form name.
 *
 * - Splits on whitespace and takes the first character of each segment.
 * - Returns an empty string for empty / whitespace-only input so the
 *   caller can decide whether to fall back further.
 */
function deriveInitials(source: string | undefined): string {
  if (!source) return '';
  const segments = source.trim().split(/\s+/).filter(Boolean);
  if (segments.length === 0) return '';
  const letters = segments
    .slice(0, 2)
    .map((seg) => seg.charAt(0).toUpperCase())
    .join('');
  return letters;
}

/**
 * Map an arbitrary string to a stable sticky-note color via a tiny
 * `charCodeAt` sum. This is intentionally not cryptographic — it just
 * needs to be deterministic and well-distributed across the 7-color
 * palette so the same name always renders the same hue.
 */
function hashToColor(source: string | undefined): AvatarColor {
  if (!source) return PALETTE[0]!;
  let sum = 0;
  for (let i = 0; i < source.length; i += 1) {
    sum += source.charCodeAt(i);
  }
  return PALETTE[sum % PALETTE.length]!;
}

/**
 * Built-in placeholder glyph — a simple person silhouette used when
 * neither image, custom fallback nor any text source is available.
 */
function PlaceholderGlyph(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="60%"
      height="60%"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="9"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 19c1.2-3.4 4-5 7-5s5.8 1.6 7 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Avatar — a hand-drawn portrait surface.
 *
 * Renders a circular (or rounded-square) tile that displays an image,
 * a custom fallback, derived initials, or a generic placeholder — in
 * that order of preference. The sticky-note background color is either
 * specified explicitly via `color`, or derived deterministically from
 * `name` so a list of avatars stays visually stable across renders.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(
    {
      src,
      alt,
      initials,
      name,
      fallback,
      size = 'md',
      shape = 'circle',
      color,
      className,
      ...rest
    },
    ref
  ) {
    // Track whether the <img> failed to load so we can swap to a
    // fallback render without unmounting the wrapper. We reset the
    // flag whenever `src` changes so a new URL gets a fresh chance.
    const [imgFailed, setImgFailed] = React.useState(false);
    React.useEffect(() => {
      setImgFailed(false);
    }, [src]);

    const showImage = !!src && !imgFailed;

    // Resolve fallback content in priority order:
    // explicit fallback > explicit initials > derived initials > "?"
    const resolvedInitials =
      initials && initials.length > 0
        ? initials.slice(0, 2).toUpperCase()
        : deriveInitials(name ?? alt);

    const resolvedColor: AvatarColor = color ?? hashToColor(name ?? alt ?? '');

    const ariaLabel = alt ?? name ?? 'avatar';

    const classes = cx(
      'su-avatar',
      `su-avatar--${size}`,
      `su-avatar--${shape}`,
      `su-avatar--${resolvedColor}`,
      showImage && 'su-avatar--has-image',
      className
    );

    return (
      <span
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={classes}
        {...rest}
      >
        {showImage ? (
          <img
            className="su-avatar__img"
            src={src}
            alt=""
            // alt is intentionally empty: the wrapper carries the
            // accessible label, so AT users hear it once, not twice.
            onError={() => setImgFailed(true)}
            draggable={false}
          />
        ) : fallback !== undefined && fallback !== null ? (
          <span className="su-avatar__fallback" aria-hidden="true">
            {fallback}
          </span>
        ) : resolvedInitials.length > 0 ? (
          <span className="su-avatar__initials" aria-hidden="true">
            {resolvedInitials}
          </span>
        ) : (
          <span className="su-avatar__fallback" aria-hidden="true">
            <PlaceholderGlyph />
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
