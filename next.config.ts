import { NextConfig } from "next"
import { withSentryConfig } from "@sentry/nextjs"

const nextConfig: NextConfig = {
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },
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

export default withSentryConfig(nextConfig, sentryConfig)
