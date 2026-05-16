import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { DatePickerDocClient } from './DatePickerDoc.client';

export default async function DatePickerDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.datepicker;
  if (!t) notFound();
  return <DatePickerDocClient t={t} />;
}
