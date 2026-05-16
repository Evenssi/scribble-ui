import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { SliderDocClient } from './SliderDoc.client';

export default async function SliderDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.slider;
  if (!t) notFound();
  return <SliderDocClient t={t} />;
}
