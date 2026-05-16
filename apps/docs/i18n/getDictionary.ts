/**
 * Server-side dictionary loader.
 *
 * Each locale lives in `dictionaries/<locale>/index.ts` as a plain TS
 * `const` object. We `import()` it dynamically so Next.js can split
 * each language into its own RSC chunk and only ship the ones we
 * actually render.
 *
 * Because the dictionaries are pure data (no React, no side effects),
 * the result is fully cacheable inside a single request — Next 14's
 * RSC dedupe handles that automatically when this function is awaited
 * from a Server Component.
 */

import type { Locale } from './config';
import type { Dictionary } from './dictionaries/zh-CN';

const loaders = {
  'zh-CN': () => import('./dictionaries/zh-CN').then((m) => m.zhCN),
  'en-US': () => import('./dictionaries/en-US').then((m) => m.enUS),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export type { Dictionary } from './dictionaries/zh-CN';
