/**
 * English dictionary.
 *
 * MUST keep the same shape as `zh-CN` — the type alias `Dictionary` is
 * derived from the Chinese dictionary, so any drift here is caught at
 * compile time.
 */

import type { Dictionary } from '../zh-CN';
import { alertEn } from './components/alert';
import { avatarEn } from './components/avatar';
import { backtopEn } from './components/backtop';
import { badgeEn } from './components/badge';
import { breadcrumbEn } from './components/breadcrumb';
import { buttonEn } from './components/button';
import { cardEn } from './components/card';
import { carouselEn } from './components/carousel';
import { checkboxEn } from './components/checkbox';

export const enUS: Dictionary = {
  meta: {
    title: 'scribble-ui — Hand-drawn React component library',
    description:
      'A hand-drawn React component library — sticky notes meet whiteboard sketches.',
  },

  nav: {
    brand: 'scribble-ui',
    gettingStarted: 'Getting started',
    introduction: 'Introduction',
    groups: {
      general: 'General',
      layout: 'Layout',
      navigation: 'Navigation',
      dataEntry: 'Data Entry',
      dataDisplay: 'Data Display',
      feedback: 'Feedback',
      other: 'Other',
    },
  },

  topbar: {
    localeSwitcher: {
      label: 'Language',
      zh: '中文',
      en: 'English',
    },
  },

  home: {
    slogan:
      'A hand-drawn React component library — sticky notes meet whiteboard sketches.',
    ledeBefore: 'Welcome. This is the documentation for ',
    ledeCode: 'scribble-ui',
    ledeAfter:
      ', a small React component library that prefers warm off-white over corporate blue, asymmetric corners over perfect rectangles, and hard offset shadows over Material elevation.',
    components: 'Components',
    statusLine:
      'Day 19 · 34 components shipped · now grouped into 7 categories (General · Layout · Navigation · Data Entry · Data Display · Feedback · Other) aligned with Ant Design / Arco conventions.',
    items: {
      alert: { name: 'Alert', desc: '— static inline feedback strip with 4 variants, closable and banner modes.' },
      avatar: { name: 'Avatar', desc: '— circle/square sticky-note avatar with image fallback and auto initials.' },
      backtop: { name: 'BackTop', desc: '— floating back-to-top button with threshold visibility, smooth scroll and scoped containers.' },
      badge: { name: 'Badge', desc: '— standalone or wrapper badge with count, dot, max overflow and 4 placements.' },
      breadcrumb: { name: 'Breadcrumb', desc: '— hierarchical trail with items + composition APIs, custom separators and mid-path ellipsis.' },
      button: { name: 'Button', desc: '— wobbly, sticky-note styled call to action.' },
      card: { name: 'Card', desc: '— paper or sticky-note surface with optional interactive mode.' },
      carousel: { name: 'Carousel', desc: '— hand-drawn content rotator with slide / fade transitions, autoplay, drag and keyboard nav.' },
      checkbox: { name: 'Checkbox', desc: '— controlled/uncontrolled, indeterminate, plus a CheckboxGroup helper.' },
      datepicker: { name: 'DatePicker', desc: '— calendar dropdown with portalled popup, keyboard month/year nav, min/max disabling and locale labels.' },
      divider: { name: 'Divider', desc: '— horizontal/vertical separator with solid, dashed or hand-drawn wavy lines.' },
      drawer: { name: 'Drawer', desc: '— side-anchored panel from any edge, with focus trap, scroll lock and slide-in.' },
      dropdown: { name: 'Dropdown', desc: '— menu overlay with 8 placements, click / hover / contextMenu triggers and roving-tabindex keyboard nav.' },
      empty: { name: 'Empty', desc: '— hand-drawn placeholder for blank lists, search misses and first-run states.' },
      form: { name: 'Form', desc: '— visual shell for labels, required marks, errors and helpers. Bring your own state (react-hook-form + zod recommended).' },
      input: { name: 'Input', desc: '— text field with prefix/suffix slots, clearable, error states.' },
      modal: { name: 'Modal', desc: '— portalled dialog with focus trap, ESC + overlay close, and scroll lock.' },
      numberinput: { name: 'NumberInput', desc: '— numeric field with ± steppers, keyboard ↑/↓ + Shift/Alt modifiers, min/max clamp and precision.' },
      pagination: { name: 'Pagination', desc: '— data-driven page navigator with smart ellipsis folding, simple / small variants and full a11y.' },
      popover: { name: 'Popover', desc: '— interactive floating panel with title/footer, click-outside dismiss and auto-flip.' },
      progress: { name: 'Progress', desc: '— line or circle progress with status colors, labels and indeterminate mode.' },
      radio: { name: 'Radio', desc: '— paired with RadioGroup for shared name, layout and exclusive selection.' },
      result: { name: 'Result', desc: '— full-page feedback surface for success, failure and HTTP error routes.' },
      select: { name: 'Select', desc: '— portalled listbox dropdown with keyboard nav, typeahead and auto-flip.' },
      skeleton: { name: 'Skeleton', desc: '— text/rect/circle loading placeholder with pulse or wave animation.' },
      slider: { name: 'Slider', desc: '— single or range value picker with marks, sticky-note tooltip, vertical mode and full keyboard nav.' },
      spinner: { name: 'Spinner', desc: '— ring, dots or hand-drawn pencil loader inheriting currentColor.' },
      switch: { name: 'Switch', desc: '— accessible on/off toggle with bouncy thumb and three sizes.' },
      tabs: { name: 'Tabs', desc: '— accessible tabbed navigation with underline / card / pill variants and roving-tabindex keyboard nav.' },
      tag: { name: 'Tag', desc: '— small label with status & sticky-note colors, optional ✕ to remove.' },
      textarea: { name: 'Textarea', desc: '— multi-line input with auto-resize, character count and helper text.' },
      timeline: { name: 'Timeline', desc: '— vertical event ribbon with left / right / alternate modes and 5 status dots.' },
      toast: { name: 'Toast', desc: '— imperative notifications with 6 placements, hover-pause and variants.' },
      tooltip: { name: 'Tooltip', desc: '— portalled bubble with hover + focus triggers, auto-flip and click toggle.' },
    },
  },

  components: {
    alert: alertEn,
    avatar: avatarEn,
    backtop: backtopEn,
    badge: badgeEn,
    breadcrumb: breadcrumbEn,
    button: buttonEn,
    card: cardEn,
    carousel: carouselEn,
    checkbox: checkboxEn,
  },
};
