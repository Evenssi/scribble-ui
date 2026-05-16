import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { PopoverDocClient } from './PopoverDoc.client';

export default async function PopoverDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.popover;
  if (!t) notFound();
  return <PopoverDocClient t={t} />;
}
