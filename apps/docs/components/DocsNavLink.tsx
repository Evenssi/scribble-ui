'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Target route, same shape you'd pass to next/link. */
  href: string;
  /** Visible link label. */
  children: React.ReactNode;
  /** Optional extra className appended after `docs-nav-link`. */
  className?: string;
};

/**
 * Sidebar nav link with an optimistic active state and hover-driven
 * route prefetch.
 *
 * The docs layout is a server component, so it cannot read the current
 * pathname directly. This thin client island wraps `<Link>` and
 * exposes the active state through both `aria-current="page"` (a11y)
 * and `data-active="true"` (CSS hook in globals.css). Matching is
 * exact: each component page (`/en-US/components/button`,
 * `/zh-CN/components/button`, …) is a distinct route, and the
 * "Introduction" link points to `/${locale}`. There are no nested
 * doc routes today, so we don't need a startsWith() prefix match.
 *
 * Two perf tricks layered on top:
 *
 * 1. Hover prefetch — on the first `pointerenter`/`focus` we ask the
 *    router to warm up the target route. Under `next dev` each docs
 *    page is lazily SWC-compiled the first time it is requested
 *    (transpilePackages also pulls scribble-ui source through), so a
 *    cold first click can take seconds. Warming on hover means by
 *    the time the user actually clicks the route is already
 *    compiled. The `prefetched` ref keeps it one-shot.
 *
 * 2. Optimistic active — `usePathname()` only updates after the new
 *    route has finished rendering, which means the active marker
 *    visually lags behind the click by however long the navigation
 *    takes. We work around that by tracking `pendingHref` in local
 *    state: on click we immediately set it to `href`, and the active
 *    test becomes `pathname === href || pendingHref === href`. Once
 *    pathname catches up we clear pending. The user sees the new
 *    item highlight the instant they click, regardless of how long
 *    the actual navigation takes.
 */
export function DocsNavLink({ href, children, className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const prefetched = useRef(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Clear the optimistic pending state on every pathname change,
  // regardless of whether the new pathname matches what we predicted.
  // This guards against navigations that get redirected or hijacked
  // mid-flight (e.g. middleware rewrite, push() racing another
  // push()): without this, pendingHref could outlive its target and
  // leave a "ghost" active marker on a link the user no longer cares
  // about. Once pathname has settled, isActive falls back to the
  // pathname === href path naturally.
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const isActive = pathname === href || pendingHref === href;
  const cls = ['docs-nav-link', className].filter(Boolean).join(' ');

  const warm = () => {
    if (prefetched.current) return;
    prefetched.current = true;
    router.prefetch(href);
  };

  const handleClick = () => {
    // Skip the optimistic write when we're already on this route —
    // there's nothing to "predict" and we'd just trigger a no-op
    // re-render.
    if (pathname === href) return;
    setPendingHref(href);
  };

  return (
    <Link
      href={href}
      className={cls}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive ? 'true' : undefined}
      onPointerEnter={warm}
      onFocus={warm}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
