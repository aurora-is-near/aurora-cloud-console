import { StorageClient } from "@supabase/storage-js"

export const createStorageClient = () => {
  const storageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`

  return new StorageClient(storageUrl, {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  })
}
