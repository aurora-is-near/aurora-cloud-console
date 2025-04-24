import { MarketplaceApp } from "@/types/marketplace"

export const MARKETPLACE_APPS: MarketplaceApp[] = [
  {
    title: "Dune",
    description:
      "Access to onchain data by enabling users to query, visualize, and share insights across various blockchains.",
    categories: ["Analytics"],
    logo: "/v2/images/marketplace/dune-logo.png",
    content: [
      {
        heading: "Seamless Blockchain Integration",
        body: "Effortlessly import, decode, query, and store your blockchain data in a human-readable, organized Web3 warehouse. Dune Catalyst supports both EVM and non-EVM chains, providing full historical data with enterprise-grade SLAs and storage. Benefit from 24/7 support via Slack and Telegram to ensure a smooth integration process.",
      },
      {
        heading: "Extensive Data Distribution",
        body: "Share your blockchain’s trusted data with over 5 million consumers, including app developers, analysts, investors, and media platforms. Dune Catalyst enables you to prepare, package, and deliver data through platforms like Dune.com for querying and sharing, Datashare for streaming data to engineers, and Echo for providing real-time data to app builders. ",
      },
      {
        heading: "Collaborative Ecosystem Growth",
        body: "Partner with Dune to enhance your blockchain’s ecosystem. Dune Catalyst helps you connect with talented data analysts, educate your data community, and onboard top projects and protocols. From launch to maturity, Dune works with you to promote your chain to millions of viewers across various channels.",
      },
    ],
  },
]
