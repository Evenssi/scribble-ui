/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow Next.js SWC to compile the workspace-linked source of
  // `scribble-ui` directly (no need for a pre-built dist during dev).
  transpilePackages: ["scribble-ui"],
  // When the e2e harness drives a production build, redirect the build
  // output to a sibling directory so it never collides with `pnpm dev`,
  // which keeps the developer's hot-reload session alive while CI/e2e
  // builds run in parallel. See `.codebuddy/rules/main-agent-workflow.md`
  // §1.3 for the failure mode this guards against.
  ...(process.env.E2E_DIST_DIR ? { distDir: process.env.E2E_DIST_DIR } : {}),
};

export default nextConfig;
