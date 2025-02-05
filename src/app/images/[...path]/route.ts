import { NextRequest, NextResponse } from "next/server"
import { createStorageClient } from "@/supabase/create-storage-client"
import { toError } from "@/utils/errors"

const getNumberParam = (url: URL, name: string): number | undefined => {
  const value = url.searchParams.get(name)

  if (typeof value === "string") {
    return parseInt(value, 10)
  }

  return undefined
}

/**
 * A basic image transformation service.
 *
 * Used for the image assets that the user uploads via the console. If a
 * particularly large image is loaded there is no need to load that image at
 * its full size when displaying it, for example in the Blockscout UI.
 * @param w - The width of the image.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const imagePath = requestUrl.pathname.replace(/^\/images\//, "")
  const [bucket, ...pathParts] = imagePath.split("/").filter(Boolean)
  const path = pathParts.join("/")
  const storage = createStorageClient()

  const imageExists = await storage.from(bucket).exists(path)

  if (!imageExists) {
    return NextResponse.json({ message: "Image not found" }, { status: 404 })
  }

  const { data, error } = await storage.from(bucket).download(path, {
    transform: {
      width: getNumberParam(requestUrl, "w"),
      resize: "contain",
    },
  })

  if (error) {
    return NextResponse.json({ message: toError }, { status: 500 })
  }

  const headers = new Headers()

  headers.set("Content-Type", data.type)

  return new NextResponse(data, { status: 200, statusText: "OK", headers })
}
