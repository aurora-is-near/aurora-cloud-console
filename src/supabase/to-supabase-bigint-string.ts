export function toSupabaseBigIntString(value: bigint) {
  return value.toString() as unknown as bigint
}
