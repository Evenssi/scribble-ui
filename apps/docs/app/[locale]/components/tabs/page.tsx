import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { TabsDocClient } from './TabsDoc.client';

export default async function TabsDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.tabs;
  if (!t) notFound();
  return <TabsDocClient t={t} />;
}
