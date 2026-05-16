import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { BadgeDocClient } from './BadgeDoc.client';

export default async function BadgeDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.badge;
  if (!t) notFound();
  return <BadgeDocClient t={t} />;
}
