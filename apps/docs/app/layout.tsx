import type { Metadata } from 'next';
import Link from 'next/link';
import { HandDrawnFilters } from 'scribble-ui';

// Pull tokens + component styles from the published package entry.
// `transpilePackages: ['scribble-ui']` lets Next.js SWC compile the
// workspace JS source on the fly, while CSS is loaded from dist/.
import 'scribble-ui/styles/tokens.css';
import 'scribble-ui/styles/components.css';

import './globals.css';

export const metadata: Metadata = {
  title: 'scribble-ui',
  description:
    'A hand-drawn React component library — sticky notes meet whiteboard sketches.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Mount once so any component can reference #su-hand-c/b/a */}
        <HandDrawnFilters />

        <div className="docs-shell">
          <aside className="docs-sidebar">
            <Link href="/" className="docs-brand">
              scribble-ui
            </Link>
            <nav className="docs-nav">
              <p className="docs-nav-section">Getting started</p>
              <Link href="/" className="docs-nav-link">
                Introduction
              </Link>
              <p className="docs-nav-section">Components</p>
              <Link href="/components/button" className="docs-nav-link">
                Button
              </Link>
            </nav>
          </aside>
          <main className="docs-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
