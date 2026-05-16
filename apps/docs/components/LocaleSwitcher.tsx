'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  isLocale,
  locales,
  type Locale,
} from '../i18n/config';

import './LocaleSwitcher.css';

type Props = {
  currentLocale: Locale;
  /**
   * Translated UI labels — provided by the layout (server component)
   * so the switcher itself doesn't have to re-import the dictionary.
   */
  labels: {
    label: string;
    zh: string;
    en: string;
  };
};

const DISPLAY: Record<Locale, keyof Props['labels']> = {
  'zh-CN': 'zh',
  'en-US': 'en',
};

/**
 * Replace the locale segment of the current path with `next` and push.
 *
 * The router needs the new pathname *with* the locale prefix. Since
 * middleware guarantees we always render under `/<locale>/...`, we can
 * just split on `/` and swap index 1.
 */
function buildHref(pathname: string, next: Locale): string {
  const segments = pathname.split('/');
  // segments[0] === '' (leading slash), segments[1] === current locale.
  if (segments.length > 1 && isLocale(segments[1] ?? '')) {
    segments[1] = next;
    const joined = segments.join('/');
    return joined || `/${next}`;
  }
  // Fallback (shouldn't happen under middleware): prepend the locale.
  return `/${next}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function setLocaleCookie(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

export function LocaleSwitcher({ currentLocale, labels }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const onPick = useCallback(
    (next: Locale) => {
      if (next === currentLocale) return;
      setLocaleCookie(next);
      router.replace(buildHref(pathname || `/${currentLocale}`, next));
      router.refresh();
    },
    [currentLocale, pathname, router],
  );

  return (
    <div
      className="docs-locale-switcher"
      role="group"
      aria-label={labels.label}
    >
      {locales.map((loc) => {
        const isActive = loc === currentLocale;
        const key = DISPLAY[loc];
        return (
          <button
            key={loc}
            type="button"
            className={
              'docs-locale-switcher__pill' +
              (isActive ? ' docs-locale-switcher__pill--active' : '')
            }
            aria-pressed={isActive}
            onClick={() => onPick(loc)}
          >
            {labels[key]}
          </button>
        );
      })}
    </div>
  );
}
