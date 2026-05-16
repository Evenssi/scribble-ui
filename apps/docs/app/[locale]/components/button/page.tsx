import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { ButtonDocClient } from './ButtonDoc.client';

/**
 * Server entry — pulls the per-locale dictionary subset for this page
 * and forwards it to the client island that owns the interactive demo.
 */
export default async function ButtonDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.button;
  if (!t) notFound();
  return <ButtonDocClient t={t} />;
}
