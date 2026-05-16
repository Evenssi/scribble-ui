import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { TimelineDocClient } from './TimelineDoc.client';

export default async function TimelineDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.timeline;
  if (!t) notFound();
  return <TimelineDocClient t={t} />;
}
