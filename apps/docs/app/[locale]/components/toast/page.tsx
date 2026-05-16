import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { ToastDocClient } from './ToastDoc.client';

export default async function ToastDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.toast;
  if (!t) notFound();
  return <ToastDocClient t={t} />;
}
