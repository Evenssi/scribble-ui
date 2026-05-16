import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { AvatarDocClient } from './AvatarDoc.client';

export default async function AvatarDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.avatar;
  if (!t) notFound();
  return <AvatarDocClient t={t} />;
}
