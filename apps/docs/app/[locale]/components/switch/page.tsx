import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { SwitchDocClient } from './SwitchDoc.client';

export default async function SwitchDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.switch;
  if (!t) notFound();
  return <SwitchDocClient t={t} />;
}
