import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// import the aggregated stylesheet once via `scribble-ui/styles/components.css`.

export type TimelineMode = 'left' | 'right' | 'alternate';
export type TimelineItemStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface TimelineItemProps {
  /**
   * Time / headline line — typically a short string, a `<time>` element,
   * or any ReactNode. When a plain `string` or `number` is provided it is
   * wrapped in a `<time>` tag so assistive tech can announce it as a time
   * stamp.
   */
  time?: React.ReactNode;

  /** Main body content of the entry. */
  children?: React.ReactNode;

  /**
   * Status color. Drives the node fill and, together with the sibling
   * position, can tint the connector line. Defaults to `'default'`.
   */
  status?: TimelineItemStatus;

  /**
   * Optional override for the node glyph. Replaces the default hand-drawn
   * dot — handy for putting an emoji, letter or small SVG there. The
   * node container keeps its size so sibling items stay aligned.
   */
  dot?: React.ReactNode;

  /**
   * When true, the connector going down to the next item renders dashed
   * instead of solid — good for marking "in progress" or "future"
   * milestones. Has no effect on the last item.
   */
  dashed?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Where items sit relative to the rail.
   * - `'left'` (default): rail on the left, content on the right.
   * - `'right'`: mirrored — rail on the right, content on the left.
   * - `'alternate'`: rail down the middle, items alternate sides.
   */
  mode?: TimelineMode;

  /**
   * Render newest-first visually without reordering the DOM. Uses
   * `flex-direction: column-reverse`, so screen readers still hear the
   * original document order.
   */
  reverse?: boolean;

  /** Which list element to render. Defaults to `'ol'` (ordered semantics). */
  as?: 'ol' | 'ul';

  /** Expected to be a list of `<Timeline.Item>` children. */
  children: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}

/* ------------------------------------------------------------------ *
 *  TimelineItem
 * ------------------------------------------------------------------ */

function TimelineItem({
  time,
  children,
  status = 'default',
  dot,
  dashed = false,
  className,
  style,
  ...rest
}: TimelineItemProps &
  Omit<React.LiHTMLAttributes<HTMLLIElement>, keyof TimelineItemProps>): JSX.Element {
  const classes = [
    'su-timeline__item',
    `su-timeline__item--status-${status}`,
    dashed ? 'su-timeline__item--dashed' : null,
    dot ? 'su-timeline__item--custom-dot' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Only wrap `time` in a <time> element when we're given a plain primitive;
  // for ReactNodes we assume the caller has chosen their own markup.
  const renderedTime =
    typeof time === 'string' || typeof time === 'number' ? (
      <time className="su-timeline__time-text">{time}</time>
    ) : (
      time
    );

  return (
    <li className={classes} style={style} {...rest}>
      <span className="su-timeline__rail" aria-hidden="true">
        <span className="su-timeline__dot">
          {dot !== undefined && dot !== null ? (
            <span className="su-timeline__dot-custom">{dot}</span>
          ) : null}
        </span>
      </span>

      <div className="su-timeline__body">
        {renderedTime !== undefined && renderedTime !== null && renderedTime !== '' ? (
          <div className="su-timeline__time">{renderedTime}</div>
        ) : null}
        {children !== undefined && children !== null && children !== '' ? (
          <div className="su-timeline__content">{children}</div>
        ) : null}
      </div>
    </li>
  );
}

TimelineItem.displayName = 'Timeline.Item';

/* ------------------------------------------------------------------ *
 *  Timeline
 * ------------------------------------------------------------------ */

/**
 * Timeline — a hand-drawn, sticky-note flavoured vertical timeline.
 *
 * Compose with `<Timeline.Item>` children. Supports left / right /
 * alternate layouts, semantic `<ol>` (default) or `<ul>` container,
 * status-coloured nodes, custom dot glyphs, and a `dashed` connector
 * for "in progress / future" entries. `reverse` flips the visual order
 * without touching the DOM order so screen readers are unaffected.
 *
 * Make sure to import the base styles and mount `<HandDrawnFilters />`
 * once at your app root for the wobble to take effect.
 */
function TimelineRoot({
  mode = 'left',
  reverse = false,
  as = 'ol',
  children,
  className,
  style,
  'aria-label': ariaLabel,
  ...rest
}: TimelineProps): JSX.Element {
  const classes = [
    'su-timeline',
    `su-timeline--${mode}`,
    reverse ? 'su-timeline--reverse' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Tag = (as === 'ul' ? 'ul' : 'ol') as 'ol' | 'ul';

  return (
    <Tag
      className={classes}
      style={style}
      aria-label={ariaLabel ?? 'Timeline'}
      {...rest}
    >
      {children}
    </Tag>
  );
}

TimelineRoot.displayName = 'Timeline';

type TimelineComponent = React.FC<TimelineProps> & {
  Item: React.FC<TimelineItemProps>;
};

export const Timeline = TimelineRoot as TimelineComponent;
Timeline.Item = TimelineItem;
