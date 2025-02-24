export type ForwarderApiCreateContractResponse = {
  result: {
    address: string
    existed: boolean
  }
}

export type ForwarderApiGetContractResponse = {
  result: {
    address: string
    account_created: boolean
  }
}

export type ForwarderApiGetSupportedTokensResponse = {
  result: {
    tokens: {
      address: string
      decimals: number
      symbol: string
    }[]
  }
}
