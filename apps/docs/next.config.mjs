/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow Next.js SWC to compile the workspace-linked source of
  // `scribble-ui` directly (no need for a pre-built dist during dev).
  transpilePackages: ['scribble-ui'],
};

export default nextConfig;
