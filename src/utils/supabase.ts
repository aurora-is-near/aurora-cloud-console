import { PostgrestResponse, PostgrestResponseSuccess } from "@/types/postgrest"
import { abort } from "@/utils/abort"

export function assertValidSupabaseResult<T>(
  result: PostgrestResponse<T>,
): asserts result is PostgrestResponseSuccess<T> {
  if (result.error) {
    throw new Error(result.error.message)
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

function assertUniqueConstraintNotViolated<T>(
  result: PostgrestResponse<T>,
  key: string,
  message: string,
): void {
  if (
    result.error?.code === "23505" &&
    result.error?.message.includes(`"${key}"`)
  ) {
    throw new Error(message)
  }
}

export function assertUniqueChainIdNotViolated<T>(
  result: PostgrestResponse<T>,
): void {
  assertUniqueConstraintNotViolated(
    result,
    "silos_chain_id_key",
    "A silo with that chain ID already exists",
  )
}
