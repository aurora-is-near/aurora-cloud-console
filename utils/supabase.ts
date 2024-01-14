import { PostgrestResponse, PostgrestResponseSuccess } from "@/types/postgrest"

export function assertValidSupabaseResult<T>(
  result: PostgrestResponse<T>,
): asserts result is PostgrestResponseSuccess<T> {
  if (result.error) {
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
