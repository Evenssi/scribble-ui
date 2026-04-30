import * as React from 'react';

/**
 * HandDrawnFilters
 *
 * Renders an invisible <svg> containing three reusable SVG filters that
 * give any element a hand-drawn wobble. Mount it **once** at your app
 * root (e.g. inside Next.js `app/layout.tsx`), then reference the
 * filter ids from any component:
 *
 *   .button { filter: url(#su-hand-c); }
 *
 * Three jitter levels are provided — pick by intent:
 *
 *   - `#su-hand-c` (Calm)   — subtle wobble, recommended for buttons,
 *                             inputs and small interactive elements.
 *   - `#su-hand-b` (Balanced) — default sketch level for cards and
 *                             modal frames.
 *   - `#su-hand-a` (Aggressive) — strong scribble, for decorative
 *                             dividers, illustrations and accents.
 *
 * Implementation note: each filter combines a `feTurbulence` noise
 * source with `feDisplacementMap` to perturb the source graphic. The
 * three levels differ only in `baseFrequency`, `numOctaves`, `scale`
 * and `seed`, keeping rendering cost essentially zero (browsers
 * cache compiled filters).
 */
export function HandDrawnFilters(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Calm — subtle wobble */}
        <filter id="su-hand-c">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="1.4" />
        </filter>

        {/* Balanced — default sketch */}
        <filter id="su-hand-b">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="2"
            seed="7"
          />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>

        {/* Aggressive — strong scribble */}
        <filter id="su-hand-a">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            seed="11"
          />
          <feDisplacementMap in="SourceGraphic" scale="3.5" />
        </filter>
      </defs>
    </svg>
  );
}
