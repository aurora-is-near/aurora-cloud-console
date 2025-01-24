import { snakeCase } from "change-case"
import { abort } from "@/utils/abort"
import { toError } from "@/utils/errors"
import { createApiEndpoint } from "@/utils/api"
import { createStorageClient } from "@/supabase/create-storage-client"
import { updateSilo } from "@/actions/silos/update-silo"
import { SiloAsset } from "@/types/assets"

export const POST = createApiEndpoint("uploadSiloAsset", async (_req, ctx) => {
  const storage = createStorageClient()
  const file = ctx.body.get("file") as File
  const type = ctx.body.get("type") as SiloAsset

  if (!file) {
    abort(400, "No file provided")
  }

  const filename = snakeCase(file.name)
  const path = `/${ctx.params.id}/${type}sss/${filename}`

  const uploadRes = await storage.from("silo_assets").upload(path, file, {
    contentType: file.type,
    upsert: true,
  })

  if (uploadRes.error) {
    abort(500, toError(uploadRes.error).message)
  }

  const {
    data: { publicUrl: url },
  } = storage.from("silo_assets").getPublicUrl(path)

  await updateSilo(Number(ctx.params.id), {
    [type]: url,
  })

  return { url }
})
