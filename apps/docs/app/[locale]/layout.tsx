import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HandDrawnFilters } from 'scribble-ui';

// Pull tokens + component styles from the published package entry.
// `transpilePackages: ['scribble-ui']` lets Next.js SWC compile the
// workspace JS source on the fly, while CSS is loaded from dist/.
import 'scribble-ui/styles/tokens.css';
import 'scribble-ui/styles/components.css';

import './globals.css';

import { DocsNavLink } from '../../components/DocsNavLink';
import { DocsTopbar } from '../../components/DocsTopbar';
import { isLocale, locales, type Locale } from '../../i18n/config';
import { getDictionary } from '../../i18n/getDictionary';
import { COMPONENT_GROUPS } from '../../i18n/groups';

type LayoutParams = { locale: string };

/**
 * Pre-render both locales at build time — App Router will still render
 * 404 for any URL that doesn't pass the `notFound()` guard below.
 */
export function generateStaticParams(): LayoutParams[] {
  return locales.map((locale) => ({ locale }));
}

/**
 * Per-locale title / description, driven by the dictionary so en-US and
 * zh-CN never drift apart.
 */
export async function generateMetadata({
  params,
}: {
  params: LayoutParams;
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LayoutParams;
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = await getDictionary(locale);
  const { nav, topbar } = dict;

  // Structural grouping (which slug belongs to which group, in what order)
  // lives in i18n/groups.ts so the sidebar and home page can't drift apart.
  // Translatable text (group titles, item names) still comes from the dict.
  const groups = COMPONENT_GROUPS.map(({ key, items }) => ({
    title: nav.groups[key],
    items,
  }));

  return (
    <html lang={locale}>
      <body>
        {/* Mount once so any component can reference #su-hand-c/b/a */}
        <HandDrawnFilters />

        <DocsTopbar locale={locale} brand={nav.brand} t={topbar} />

        <div className="docs-shell">
          <aside className="docs-sidebar">
            <nav className="docs-nav">
              <p className="docs-nav-section">{nav.gettingStarted}</p>
              <DocsNavLink href={`/${locale}`}>{nav.introduction}</DocsNavLink>

              {groups.map((group) => (
                <details key={group.title} className="docs-nav-group" open>
                  <summary className="docs-nav-section docs-nav-summary">
                    {group.title}
                  </summary>
                  {group.items.map((slug) => (
                    <DocsNavLink
                      key={slug}
                      href={`/${locale}/components/${slug}`}
                    >
                      {dict.home.items[slug as keyof typeof dict.home.items].name}
                    </DocsNavLink>
                  ))}
                </details>
              ))}
            </nav>
          </aside>
          <main className="docs-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
