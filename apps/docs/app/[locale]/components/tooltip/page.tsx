import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { TooltipDocClient } from './TooltipDoc.client';

export default async function TooltipDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.tooltip;
  if (!t) notFound();
  return <TooltipDocClient t={t} />;
}
