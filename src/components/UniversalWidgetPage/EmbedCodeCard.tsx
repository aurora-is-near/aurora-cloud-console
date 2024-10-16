"use client"

import { usePathname } from "next/navigation"
import { TabCard } from "@/components/TabCard/TabCard"

const ORIGIN = "https://app.auroracloud.dev"

export const EmbedCodeCard = () => {
  const pathname = usePathname()

  return (
    <TabCard>
      <p className="text-sm">
        Copy and paste the following code into your website, immediately after
        the opening <pre className="font-mono inline-block">&lt;body&gt;</pre>{" "}
        tag.
      </p>
      <pre className="text-sm font-mono bg-slate-100 p-4 rounded-md whitespace-pre-wrap">
        {`<script src="${ORIGIN}${pathname
          .split("/")
          .slice(0, 5)
          .join("/")}/widget.js"></script>`}
      </pre>
      <p className="text-sm mt-1 pt-3">
        Open the widget by calling the following function:
      </p>
      <pre className="text-sm font-mono bg-slate-100 p-4 rounded-md whitespace-pre-wrap">
        window.auroraBridge.open()
      </pre>
    </TabCard>
  )
}
