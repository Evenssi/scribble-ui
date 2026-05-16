import Link from 'next/link';

import type { Locale } from '../i18n/config';
import { LocaleSwitcher } from './LocaleSwitcher';

import './DocsTopbar.css';

type Props = {
  locale: Locale;
  /** Brand text shown on the top-left, links back to the locale home. */
  brand: string;
  /** `dict.topbar` from the dictionary, pre-resolved by the layout. */
  t: {
    localeSwitcher: {
      label: string;
      zh: string;
      en: string;
    };
  };
};

/**
 * Sticky top bar with a left-aligned brand and a right-aligned language
 * switcher. Both ends share the same flex row so they're vertically
 * centered against each other automatically (`align-items: center`).
 *
 * Server component — renders once per request; only the
 * `<LocaleSwitcher>` island ships JS to the browser.
 */
export function DocsTopbar({ locale, brand, t }: Props) {
  return (
    <header className="docs-topbar" aria-label="Site header">
      <Link href={`/${locale}`} className="docs-topbar__brand">
        {brand}
      </Link>
      <div className="docs-topbar__actions">
        <LocaleSwitcher
          currentLocale={locale}
          labels={t.localeSwitcher}
        />
      </div>
    </header>
  );
}
