import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { SkeletonDocClient } from './SkeletonDoc.client';

export default async function SkeletonDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.skeleton;
  if (!t) notFound();
  return <SkeletonDocClient t={t} />;
}
