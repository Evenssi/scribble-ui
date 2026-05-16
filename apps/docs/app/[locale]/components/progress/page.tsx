import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { ProgressDocClient } from './ProgressDoc.client';

export default async function ProgressDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.progress;
  if (!t) notFound();
  return <ProgressDocClient t={t} />;
}
