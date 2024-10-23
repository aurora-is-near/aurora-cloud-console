import { SupabaseClientOptions } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

export const COMMON_SERVER_OPTIONS: Pick<
  SupabaseClientOptions<Database>,
  "global"
> = {
  global: {
    // https://github.com/orgs/supabase/discussions/20022#discussioncomment-9757485
    fetch: (url: RequestInfo | URL, init?: RequestInit) => {
      return fetch(url, { ...init, cache: "no-store" })
    },
  },
}
