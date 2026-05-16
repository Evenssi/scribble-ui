import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { BackTopDocClient } from './BackTopDoc.client';

export default async function BackTopDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.backtop;
  if (!t) notFound();
  return <BackTopDocClient t={t} />;
}
