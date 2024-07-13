import { PostgrestResponse, PostgrestResponseSuccess } from "@/types/postgrest"
import { abort } from "@/utils/abort"

export function assertValidSupabaseResult<T>(
  result: PostgrestResponse<T>,
): asserts result is PostgrestResponseSuccess<T> {
  if (result.error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw result.error
  }
}

export function assertNonNullSupabaseResult<T>(
  result: PostgrestResponse<T>,
): asserts result is PostgrestResponseSuccess<NonNullable<T>> {
  if (!result.data) {
    throw new Error("No data returned from Supabase query")
  }
}

export function abortIfNoSupabaseResult<T>(
  statusCode: number,
  result?: PostgrestResponse<T>,
): asserts result is PostgrestResponseSuccess<T> {
  if (!result) {
    abort(statusCode)
  }
}
