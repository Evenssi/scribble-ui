/**
 * i18n core constants & types for the scribble-ui docs site.
 *
 * Locales follow the BCP-47 / Ant Design / Arco / Semi convention so the
 * URL form is unambiguous (`zh-CN` not `zh`, `en-US` not `en`).
 *
 * The default locale (`zh-CN`) is used both:
 *   - as the route a user lands on when they have no `NEXT_LOCALE`
 *     cookie and no usable `Accept-Language` header,
 *   - and as the source-of-truth shape that drives the `Dictionary`
 *     type — `en-US` is required to implement the same shape, so a
 *     missing translation is a TypeScript error, not a runtime bug.
 */

export const locales = ['zh-CN', 'en-US'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-CN';

/** Cookie name used to persist the user's explicit choice. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** One year — long enough that the choice survives across visits. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Parse `Accept-Language` and return the first locale we support, or
 * the default. We deliberately do NOT pull in `@formatjs/intl-localematcher`
 * — the matching surface for two locales is trivial:
 *   - any tag starting with `zh` -> `zh-CN`
 *   - everything else            -> `en-US`
 */
export function detectLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) return defaultLocale;

  // `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7` — first token wins.
  const primary = acceptLanguage
    .split(',')[0]
    ?.trim()
    .toLowerCase();

  if (!primary) return defaultLocale;
  if (primary.startsWith('zh')) return 'zh-CN';
  if (primary.startsWith('en')) return 'en-US';

  return defaultLocale;
}
