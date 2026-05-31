/**
 * Single source of truth for the docs-site component grouping.
 *
 * Both the sidebar (apps/docs/app/[locale]/layout.tsx) and the home
 * page (apps/docs/app/[locale]/page.tsx) consume this file — keeping
 * the structural ordering in one place means adding a new component
 * is a one-line edit, not a "did I remember to update both?" hazard.
 *
 * Translation strings (group titles, item names/descriptions) still
 * live in i18n/dictionaries/{locale}/index.ts; only the *structure*
 * (which slug belongs to which group, in what order) is captured
 * here.
 *
 * `GROUP_KEYS` mirror the keys in `dict.nav.groups`; `slug` values
 * mirror the keys in `dict.home.items`. The check-i18n.mjs script
 * cross-references both to fail CI on drift.
 */

export const GROUP_KEYS = [
  'general',
  'layout',
  'navigation',
  'dataEntry',
  'dataDisplay',
  'feedback',
  'other',
] as const;

export type GroupKey = (typeof GROUP_KEYS)[number];

export interface ComponentGroup {
  /** Translation key under `dict.nav.groups`. */
  readonly key: GroupKey;
  /** Slugs in display order; each must match a key under `dict.home.items`. */
  readonly items: readonly string[];
}

export const COMPONENT_GROUPS: readonly ComponentGroup[] = [
  { key: 'general', items: ['button'] },
  { key: 'layout', items: ['card', 'divider'] },
  {
    key: 'navigation',
    items: ['tabs', 'breadcrumb', 'pagination', 'dropdown'],
  },
  {
    key: 'dataEntry',
    items: [
      'form',
      'input',
      'textarea',
      'numberinput',
      'select',
      'checkbox',
      'radio',
      'switch',
      'slider',
      'datepicker',
    ],
  },
  {
    key: 'dataDisplay',
    items: [
      'tag',
      'avatar',
      'badge',
      'carousel',
      'timeline',
      'tooltip',
      'popover',
      'empty',
    ],
  },
  {
    key: 'feedback',
    items: [
      'alert',
      'toast',
      'modal',
      'drawer',
      'progress',
      'spinner',
      'skeleton',
      'result',
    ],
  },
  { key: 'other', items: ['backtop'] },
] as const;

/** Flat list of every slug in display order. Useful for parity checks. */
export const ALL_COMPONENT_SLUGS: readonly string[] = COMPONENT_GROUPS.flatMap(
  (g) => g.items,
);
