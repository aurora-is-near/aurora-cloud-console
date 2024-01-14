export const isError = (error: unknown): error is Error => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

export const toError = (maybeError: unknown): Error => {
  if (isError(maybeError)) {
    return maybeError
  }

  if (typeof maybeError === "string") {
    return new Error(maybeError)
  }

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // Fallback in case there's an error stringifying the maybeError,
    // like with circular references, for example.
    return new Error(String(maybeError))
  }
}
