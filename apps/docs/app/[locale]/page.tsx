import Link from 'next/link';
import { notFound } from 'next/navigation';

import { isLocale, type Locale } from '../../i18n/config';
import { getDictionary } from '../../i18n/getDictionary';

import './page.css';

type Group = { title: string; items: Array<{ slug: string }> };

/**
 * The home page mirrors the sidebar grouping; the data ordering lives
 * here (instead of the dictionary) because it's structural, not
 * translatable. Display strings come from `dict.home.items.<slug>`.
 */
function buildGroups(t: {
  general: string;
  layout: string;
  navigation: string;
  dataEntry: string;
  dataDisplay: string;
  feedback: string;
  other: string;
}): Group[] {
  return [
    { title: t.general, items: [{ slug: 'button' }] },
    {
      title: t.layout,
      items: [{ slug: 'card' }, { slug: 'divider' }],
    },
    {
      title: t.navigation,
      items: [
        { slug: 'tabs' },
        { slug: 'breadcrumb' },
        { slug: 'pagination' },
        { slug: 'dropdown' },
      ],
    },
    {
      title: t.dataEntry,
      items: [
        { slug: 'form' },
        { slug: 'input' },
        { slug: 'textarea' },
        { slug: 'numberinput' },
        { slug: 'select' },
        { slug: 'checkbox' },
        { slug: 'radio' },
        { slug: 'switch' },
        { slug: 'slider' },
        { slug: 'datepicker' },
      ],
    },
    {
      title: t.dataDisplay,
      items: [
        { slug: 'tag' },
        { slug: 'avatar' },
        { slug: 'badge' },
        { slug: 'carousel' },
        { slug: 'timeline' },
        { slug: 'tooltip' },
        { slug: 'popover' },
        { slug: 'empty' },
      ],
    },
    {
      title: t.feedback,
      items: [
        { slug: 'alert' },
        { slug: 'toast' },
        { slug: 'modal' },
        { slug: 'drawer' },
        { slug: 'progress' },
        { slug: 'spinner' },
        { slug: 'skeleton' },
        { slug: 'result' },
      ],
    },
    { title: t.other, items: [{ slug: 'backtop' }] },
  ];
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = await getDictionary(locale);
  const { home, nav } = dict;
  const groups = buildGroups(nav.groups);

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
