import { notFound } from 'next/navigation';
import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';
import { TextareaDocClient } from './TextareaDoc.client';

export default async function TextareaDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.textarea;
  if (!t) notFound();
  return <TextareaDocClient t={t} />;
}
