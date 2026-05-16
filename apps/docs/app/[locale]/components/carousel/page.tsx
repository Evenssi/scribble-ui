import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { CarouselDocClient } from './CarouselDoc.client';

export default async function CarouselDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.carousel;
  if (!t) notFound();
  return <CarouselDocClient t={t} />;
}
