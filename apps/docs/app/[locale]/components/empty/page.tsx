import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { EmptyDocClient } from './EmptyDoc.client';

export default async function EmptyDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.empty;
  if (!t) notFound();
  return <EmptyDocClient t={t} />;
}
