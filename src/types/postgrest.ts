import { PostgrestError } from "@supabase/supabase-js"

interface PostgrestResponseBase {
  status: number
  statusText: string
}

export interface PostgrestResponseSuccess<T> extends PostgrestResponseBase {
  error: null
  data: T
  count: number | null
}

export interface PostgrestResponseFailure extends PostgrestResponseBase {
  error: PostgrestError
  data: null
  count: null
}

export type PostgrestResponse<T> =
  | PostgrestResponseSuccess<T>
  | PostgrestResponseFailure
