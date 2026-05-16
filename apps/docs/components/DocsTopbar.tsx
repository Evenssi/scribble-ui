import type { Locale } from '../i18n/config';
import { LocaleSwitcher } from './LocaleSwitcher';

import './DocsTopbar.css';

type Props = {
  locale: Locale;
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
 * Sticky top bar with a right-aligned language switcher overlay.
 *
 * Server component — renders once per request and only the
 * `<LocaleSwitcher>` islands ship JS to the browser.
 */
export function DocsTopbar({ locale, t }: Props) {
  return (
    <header className="docs-topbar" aria-label="Site header">
      <div className="docs-topbar__spacer" />
      <div className="docs-topbar__actions">
        <LocaleSwitcher
          currentLocale={locale}
          labels={t.localeSwitcher}
        />
      </div>
    </header>
  );
}
