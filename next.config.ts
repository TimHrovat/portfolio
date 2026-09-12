import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {/* config options here */};

// Points the build at i18n/request.ts, which is what lets a server component
// read messages without a provider above it.
export default createNextIntlPlugin()(nextConfig);
