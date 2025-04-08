export const decimalsToFloat = (value: number, decimals: number) => {
  return value / 10 ** decimals
}

export const floatToDecimals = (value: number, decimals: number) => {
  return value * 10 ** decimals
}
