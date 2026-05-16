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

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  General
                </summary>
                <Link href="/components/button" className="docs-nav-link">
                  Button
                </Link>
              </details>

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  Layout
                </summary>
                <Link href="/components/card" className="docs-nav-link">
                  Card
                </Link>
                <Link href="/components/divider" className="docs-nav-link">
                  Divider
                </Link>
              </details>

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  Navigation
                </summary>
                <Link href="/components/tabs" className="docs-nav-link">
                  Tabs
                </Link>
                <Link href="/components/breadcrumb" className="docs-nav-link">
                  Breadcrumb
                </Link>
                <Link href="/components/pagination" className="docs-nav-link">
                  Pagination
                </Link>
                <Link href="/components/dropdown" className="docs-nav-link">
                  Dropdown
                </Link>
              </details>

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  Data Entry
                </summary>
                <Link href="/components/form" className="docs-nav-link">
                  Form
                </Link>
                <Link href="/components/input" className="docs-nav-link">
                  Input
                </Link>
                <Link href="/components/textarea" className="docs-nav-link">
                  Textarea
                </Link>
                <Link href="/components/numberinput" className="docs-nav-link">
                  NumberInput
                </Link>
                <Link href="/components/select" className="docs-nav-link">
                  Select
                </Link>
                <Link href="/components/checkbox" className="docs-nav-link">
                  Checkbox
                </Link>
                <Link href="/components/radio" className="docs-nav-link">
                  Radio
                </Link>
                <Link href="/components/switch" className="docs-nav-link">
                  Switch
                </Link>
                <Link href="/components/slider" className="docs-nav-link">
                  Slider
                </Link>
                <Link href="/components/datepicker" className="docs-nav-link">
                  DatePicker
                </Link>
              </details>

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  Data Display
                </summary>
                <Link href="/components/tag" className="docs-nav-link">
                  Tag
                </Link>
                <Link href="/components/avatar" className="docs-nav-link">
                  Avatar
                </Link>
                <Link href="/components/badge" className="docs-nav-link">
                  Badge
                </Link>
                <Link href="/components/carousel" className="docs-nav-link">
                  Carousel
                </Link>
                <Link href="/components/timeline" className="docs-nav-link">
                  Timeline
                </Link>
                <Link href="/components/tooltip" className="docs-nav-link">
                  Tooltip
                </Link>
                <Link href="/components/popover" className="docs-nav-link">
                  Popover
                </Link>
                <Link href="/components/empty" className="docs-nav-link">
                  Empty
                </Link>
              </details>

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  Feedback
                </summary>
                <Link href="/components/alert" className="docs-nav-link">
                  Alert
                </Link>
                <Link href="/components/toast" className="docs-nav-link">
                  Toast
                </Link>
                <Link href="/components/modal" className="docs-nav-link">
                  Modal
                </Link>
                <Link href="/components/drawer" className="docs-nav-link">
                  Drawer
                </Link>
                <Link href="/components/progress" className="docs-nav-link">
                  Progress
                </Link>
                <Link href="/components/spinner" className="docs-nav-link">
                  Spinner
                </Link>
                <Link href="/components/skeleton" className="docs-nav-link">
                  Skeleton
                </Link>
                <Link href="/components/result" className="docs-nav-link">
                  Result
                </Link>
              </details>

              <details className="docs-nav-group" open>
                <summary className="docs-nav-section docs-nav-summary">
                  Other
                </summary>
                <Link href="/components/backtop" className="docs-nav-link">
                  BackTop
                </Link>
              </details>
            </nav>
          </aside>
          <main className="docs-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
