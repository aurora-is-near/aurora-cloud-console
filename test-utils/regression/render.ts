import htmlToImage from "node-html-to-image"

import { wrapInHtmlTag } from "./html"
import type { RenderOptions } from "./html"

export const renderImage = async (html: string, options?: RenderOptions) => {
  return htmlToImage({
    html: wrapInHtmlTag(html, options),
    waitUntil: "domcontentloaded",
    quality: 100,
  })
}
