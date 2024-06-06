"use client"

import Card from "@/components/Card"
import { usePathname } from "next/navigation"

const ORIGIN = "https://app.auroracloud.dev"

export const BridgeEmbedCodeCard = () => {
  const pathname = usePathname()

  return (
    <Card tag="section">
      <Card.Title>Embed code</Card.Title>
      <Card.Body>
        <p className="text-sm mb-3">
          Copy and paste the following code into your website, immediately after
          the opening <pre className="font-mono inline-block">&lt;body&gt;</pre>{" "}
          tag.
        </p>
        <pre className="text-sm font-mono bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
          {`<script src="${ORIGIN}${pathname}/script.js"></script>`}
        </pre>
        <p className="text-sm mt-6 mb-3">
          Open the widget by calling the following function:
        </p>
        <pre className="text-sm font-mono bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
          {`window.auroraBridge.open()`}
        </pre>
      </Card.Body>
    </Card>
  )
}
