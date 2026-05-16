import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { ModalDocClient } from './ModalDoc.client';

export default async function ModalDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.modal;
  if (!t) notFound();
  return <ModalDocClient t={t} />;
}
