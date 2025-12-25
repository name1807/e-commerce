import type { NextConfig } from "next";
import createNextInitPlugin from "next-intl/plugin";

const withNextIntl = createNextInitPlugin()

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);