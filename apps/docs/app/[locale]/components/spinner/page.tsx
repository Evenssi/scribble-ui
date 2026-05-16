import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { SpinnerDocClient } from './SpinnerDoc.client';

export default async function SpinnerDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.spinner;
  if (!t) notFound();
  return <SpinnerDocClient t={t} />;
}
