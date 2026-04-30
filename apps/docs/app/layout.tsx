import type { Metadata } from 'next';
import Link from 'next/link';
import { HandDrawnFilters } from 'scribble-ui';

// Pull tokens + component styles from the workspace source. Next.js
// SWC compiles `scribble-ui` thanks to `transpilePackages` in next.config.
import 'scribble-ui/src/styles/tokens.css';
import 'scribble-ui/src/styles/components.css';

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
