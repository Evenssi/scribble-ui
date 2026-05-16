import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { DrawerDocClient } from './DrawerDoc.client';

export default async function DrawerDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.drawer;
  if (!t) notFound();
  return <DrawerDocClient t={t} />;
}
