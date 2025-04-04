export const decimalsToFloat = (value: number, decimals: number) => {
  return value / 10 ** decimals
}

export const floatToDecimals = (value: number, decimals: number) => {
  return value * 10 ** decimals
}

export const displayDecimalsWithoutScientificNotation = (
  value: number,
  decimals: number,
) => {
  return value.toFixed(decimals).replace(/(?<=\.\d*[1-9])0+$|\.0*$/, "")
}
