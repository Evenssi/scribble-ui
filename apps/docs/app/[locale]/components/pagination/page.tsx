import { notFound } from 'next/navigation';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

import { PaginationDocClient } from './PaginationDoc.client';

export default async function PaginationDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.pagination;
  if (!t) notFound();
  return <PaginationDocClient t={t} />;
}
