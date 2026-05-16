/**
 * Root layout — intentionally minimal.
 *
 * The real <html>/<body>, metadata, sidebar and topbar live in
 * `app/[locale]/layout.tsx`, because we need access to the `locale`
 * segment to:
 *   - set `<html lang="...">` correctly,
 *   - generate the right `<title>` / `<meta>` per locale,
 *   - and load the matching dictionary.
 *
 * Next.js App Router allows segment layouts to render `<html>`/`<body>`,
 * which is the official pattern for `app/[locale]` i18n routing
 * (see Next 14 i18n routing example).
 *
 * We still need *this* file to exist (every `app/` tree needs a root
 * layout) — keep it as a transparent passthrough.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
