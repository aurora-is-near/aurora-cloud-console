import { abort } from "@/utils/abort"
import { toError } from "@/utils/errors"
import { createApiEndpoint } from "@/utils/api"
import { createStorageClient } from "@/supabase/create-storage-client"
import { updateSilo } from "@/actions/silos/update-silo"
import { SiloAsset } from "@/types/assets"

const BASE_URL = "https://app.auroracloud.dev/"
const BUCKET_NAME = "silo_assets"

export const POST = createApiEndpoint("uploadSiloAsset", async (_req, ctx) => {
  const storage = createStorageClient()

  const formData = ctx.body as FormData
  const file = formData.get("file") as File
  const type = formData.get("type") as SiloAsset
  const width = formData.get("width")
  const w = typeof width === "string" ? parseInt(width, 10) : undefined

  if (!file) {
    abort(400, "No file provided")
  }

  if (w && !Number.isFinite(w)) {
    abort(400, `Invalid width provided: ${width}`)
  }

  const path = `/${ctx.params.id}/${type}/${file.name}`

  const uploadRes = await storage.from(BUCKET_NAME).upload(path, file, {
    contentType: file.type,
    upsert: true,
  })

  if (uploadRes.error) {
    abort(500, toError(uploadRes.error).message)
  }

  const url = new URL(`/images/${BUCKET_NAME}${path}`, BASE_URL)

  // Set the resized image width, if provided
  if (w) {
    url.searchParams.set("w", String(w))
  }

  await updateSilo(Number(ctx.params.id), {
    [type]: url.href,
  })

  return { url: url.href }
})
