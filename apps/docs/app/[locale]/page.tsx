import Link from 'next/link';
import { notFound } from 'next/navigation';

import { isLocale, type Locale } from '../../i18n/config';
import { getDictionary } from '../../i18n/getDictionary';
import { COMPONENT_GROUPS } from '../../i18n/groups';

import './page.css';

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = await getDictionary(locale);
  const { home, nav } = dict;

  // Structural grouping comes from i18n/groups.ts (shared with the sidebar
  // in layout.tsx); display text still comes from the dictionary.
  const groups = COMPONENT_GROUPS.map(({ key, items }) => ({
    title: nav.groups[key],
    items: items.map((slug) => ({ slug })),
  }));

  return (
    <article className="home">
      <h1 className="home-title">scribble-ui</h1>
      <p className="home-slogan">{home.slogan}</p>

      <p className="home-lede">
        {home.ledeBefore}
        <code className="home-code">{home.ledeCode}</code>
        {home.ledeAfter}
      </p>

      <h2 className="home-heading">{home.components}</h2>

      {groups.map((group) => (
        <details key={group.title} className="home-group" open>
          <summary className="home-group-title">
            {group.title}{' '}
            <span className="home-group-count">({group.items.length})</span>
          </summary>
          <ul className="home-component-list">
            {group.items.map(({ slug }) => {
              const item = home.items[slug as keyof typeof home.items];
              return (
                <li key={slug}>
                  <Link
                    className="home-component-link"
                    href={`/${locale}/components/${slug}`}
                  >
                    {item.name}
                  </Link>
                  <span className="home-component-desc">{item.desc}</span>
                </li>
              );
            })}
          </ul>
        </details>
      ))}

      <p className="home-status">{home.statusLine}</p>
    </article>
  );
}
