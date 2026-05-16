import { NextResponse, type NextRequest } from 'next/server';

import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  detectLocaleFromAcceptLanguage,
  isLocale,
  locales,
} from './i18n/config';

/**
 * Locale routing middleware.
 *
 * Responsibilities (in order):
 *   1. If the path already starts with a known locale segment (e.g.
 *      `/zh-CN/...`), pass through untouched.
 *   2. Otherwise, decide a target locale using:
 *        cookie  >  Accept-Language  >  defaultLocale ('zh-CN')
 *      and 302-redirect to `/<locale><pathname>`.
 *   3. When we redirect (or the cookie is missing on a locale-prefixed
 *      visit), refresh the `NEXT_LOCALE` cookie so the next visit is
 *      sticky without re-running detection.
 *
 * The matcher (bottom of the file) excludes `_next/`, `api/`, and any
 * file extension request so static assets, RSC payloads and route
 * handlers are never touched.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Already locale-prefixed? Just refresh the sticky cookie if it
  //    drifted from the URL (e.g. user manually edited the URL).
  const prefixed = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (prefixed) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale !== prefixed) {
      const res = NextResponse.next();
      res.cookies.set(LOCALE_COOKIE, prefixed, {
        path: '/',
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: 'lax',
      });
      return res;
    }
    return NextResponse.next();
  }

  // 2. Decide target locale.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const target = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(request.headers.get('accept-language')) ??
      defaultLocale;

  // 3. Redirect, preserving query string.
  const url = request.nextUrl.clone();
  url.pathname = `/${target}${pathname === '/' ? '' : pathname}`;

  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, target, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });
  return res;
}

export const config = {
  // Run on every request EXCEPT:
  //   - /_next/*           (build output, RSC payloads, hot-reload)
  //   - /api/*             (route handlers, none today but future-proof)
  //   - any path with a dot (favicon.ico, *.svg, *.png, robots.txt, …)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
