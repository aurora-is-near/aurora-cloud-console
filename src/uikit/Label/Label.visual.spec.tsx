import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { renderImage } from "../../../test-utils/regression"

import { Label } from "./Label"

const PAGE_SIZE = { width: 300, height: 100 }

describe("Label", () => {
  it("without tooltip", async () => {
    const view = renderToStaticMarkup(<Label>Gas collected</Label>)
    const utils = await renderImage(view, PAGE_SIZE)

    expect(utils).toMatchImageSnapshot()
  })

  it("with tooltip", async () => {
    const view = renderToStaticMarkup(
      <Label tooltip="The amount of gas collected by the silo.">
        Gas collected
      </Label>,
    )

    const utils = await renderImage(view, PAGE_SIZE)

    expect(utils).toMatchImageSnapshot()
  })
})
