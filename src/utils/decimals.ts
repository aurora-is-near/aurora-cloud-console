export const decimalsToFloat = (value: number, decimals: number = 18) => {
  return value / 10 ** decimals
}

export const floatToDecimals = (value: number, decimals: number = 18) => {
  return value * 10 ** decimals
}
