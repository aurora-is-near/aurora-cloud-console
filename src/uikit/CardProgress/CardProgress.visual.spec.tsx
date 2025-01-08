import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { renderImage } from "../../../test-utils/regression"

import { CardProgress } from "./CardProgress"

const PAGE_SIZE = { width: 500, height: 300 }

describe("CardProgress", () => {
  it("active", async () => {
    const view = renderToStaticMarkup(
      <div className="p-2">
        <CardProgress
          isActive
          index={1}
          title="Request received"
          text="We are preparing to configure your chain and we’ll be soon in touch."
        />
      </div>,
    )

    const utils = await renderImage(view, PAGE_SIZE)
    expect(utils).toMatchImageSnapshot()
  })

  it("not active", async () => {
    const view = renderToStaticMarkup(
      <div className="p-2">
        <CardProgress
          index={1}
          title="Request received"
          text="We are preparing to configure your chain and we’ll be soon in touch."
        />
      </div>,
    )

    const utils = await renderImage(view, PAGE_SIZE)
    expect(utils).toMatchImageSnapshot()
  })
})
