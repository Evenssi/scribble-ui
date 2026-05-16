import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { BreadcrumbDocClient } from './BreadcrumbDoc.client';

export default async function BreadcrumbDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.breadcrumb;
  if (!t) notFound();
  return <BreadcrumbDocClient t={t} />;
}
