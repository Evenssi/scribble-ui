import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { DropdownDocClient } from './DropdownDoc.client';

export default async function DropdownDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.dropdown;
  if (!t) notFound();
  return <DropdownDocClient t={t} />;
}
