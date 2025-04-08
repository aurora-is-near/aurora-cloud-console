export function safeBigintToNumber(value: bigint): number {
  if (
    value < BigInt(Number.MIN_SAFE_INTEGER) ||
    value > BigInt(Number.MAX_SAFE_INTEGER)
  ) {
    throw new Error(
      `BigInt value ${value} is too large to safely convert to number`,
    )
  }

  return Number(value)
}
