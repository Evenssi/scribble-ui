import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { NumberInputDocClient } from './NumberInputDoc.client';

export default async function NumberInputDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.numberinput;
  if (!t) notFound();
  return <NumberInputDocClient t={t} />;
}
