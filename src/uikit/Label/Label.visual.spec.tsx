import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { renderImage } from "../../../test-utils/regression"

import { Label } from "./Label"

const PAGE_SIZE = { width: 300, height: 100 }

describe("Label", () => {
  it("without tooltip", async () => {
    const html = renderToStaticMarkup(<Label>Gas collected</Label>)
    const image = await renderImage(html, PAGE_SIZE)
    expect(image).toMatchImageSnapshot()
  })

  it("with tooltip", async () => {
    const html = renderToStaticMarkup(
      <Label tooltip="The amount of gas collected by the silo.">
        Gas collected
      </Label>,
    )

    const image = await renderImage(html, PAGE_SIZE)
    expect(image).toMatchImageSnapshot()
  })
})
