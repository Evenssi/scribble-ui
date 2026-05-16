import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HandDrawnFilters } from 'scribble-ui';

// Pull tokens + component styles from the published package entry.
// `transpilePackages: ['scribble-ui']` lets Next.js SWC compile the
// workspace JS source on the fly, while CSS is loaded from dist/.
import 'scribble-ui/styles/tokens.css';
import 'scribble-ui/styles/components.css';

import './globals.css';

import { DocsTopbar } from '../../components/DocsTopbar';
import { isLocale, locales, type Locale } from '../../i18n/config';
import { getDictionary } from '../../i18n/getDictionary';

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

  // Component slugs are grouped here (not in the dictionary) because the
  // grouping is structural data, not translatable text. Each slug just
  // looks up its display name (kept in English) elsewhere.
  const groups: Array<{ title: string; items: string[] }> = [
    { title: nav.groups.general, items: ['button'] },
    { title: nav.groups.layout, items: ['card', 'divider'] },
    {
      title: nav.groups.navigation,
      items: ['tabs', 'breadcrumb', 'pagination', 'dropdown'],
    },
    {
      title: nav.groups.dataEntry,
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
      title: nav.groups.dataDisplay,
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
      title: nav.groups.feedback,
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
    { title: nav.groups.other, items: ['backtop'] },
  ];

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
              <Link href={`/${locale}`} className="docs-nav-link">
                {nav.introduction}
              </Link>

              {groups.map((group) => (
                <details key={group.title} className="docs-nav-group" open>
                  <summary className="docs-nav-section docs-nav-summary">
                    {group.title}
                  </summary>
                  {group.items.map((slug) => (
                    <Link
                      key={slug}
                      href={`/${locale}/components/${slug}`}
                      className="docs-nav-link"
                    >
                      {dict.home.items[slug as keyof typeof dict.home.items].name}
                    </Link>
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
