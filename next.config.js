const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    })

    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    })

    return config
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.datocms-assets.com",
    },
  ],
}

const sentryConfig = {
  org: "aurora-k2",
  project: "aurora-cloud-console",
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring-tunnel",
}

module.exports = withSentryConfig(nextConfig, sentryConfig)
