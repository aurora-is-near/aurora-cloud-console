import { getCryptoOrders } from "@/actions/orders/get-crypto-orders"
import { updateTeam } from "@/actions/teams/update-team"
import { Team } from "@/types/types"
import { addOrder, type OrderWithRequiredFields } from "@/actions/orders/add-order"

const AURORA_API_URL = "https://explorer.testnet.aurora.dev/api/"
// const AURORA_API_URL = "https://explorer.mainnet.aurora.dev/api/"
const AURORA_USDT_CONTRACT =
  "0x80da25da4d783e57d2fcda0436873a193a4beccf".toLowerCase()
const QUERY_TYPE_TOKEN = 'tokentx'
const QUERY_TYPE_COIN = 'txlist'
const TX_COST_USDT = 0.004628

export async function processTeamTx(team: Team) {
  const fundingWalletAddress = team.funding_wallet_address
  if (!fundingWalletAddress) return
  const inflows = await getFundingWalletTxs(fundingWalletAddress)
  if (inflows.length === 0) return
  const orders = await getCryptoOrders(team.id)
  if (orders.length === 0) {
    await Promise.all(
      inflows.map(async (tx) => {
        const txHash = tx.hash
        const txAmount = tx.txAmount
        const newOrder: OrderWithRequiredFields = {
          number_of_transactions: txAmount,
          team_id: team.id,
          tx_hash: txHash,
          payment_status: "paid",
          type: "top_up",
        }
        await addOrder(newOrder)
        await updateTeam(team.id, {
          prepaid_transactions: team.prepaid_transactions ? team.prepaid_transactions + txAmount : txAmount
        })
      }))
  } else {
    for (let i = 0; i < inflows.length; i++) {
      const tx = inflows[i]
      const txHash = tx.hash
      const txAmount = tx.txAmount
      const foundOrder = orders.find((order) => order.tx_hash === txHash)
      if (foundOrder) {
        //if order was found, then all orders after it are also found
        break
      }
      const newOrder: OrderWithRequiredFields = {
        number_of_transactions: txAmount,
        team_id: team.id,
        tx_hash: txHash,
        payment_status: "paid",
        type: "top_up",
      }
      await addOrder(newOrder)
      await updateTeam(team.id, {
        prepaid_transactions: team.prepaid_transactions ? team.prepaid_transactions + txAmount : txAmount
      })
    }
  }
}

async function getFundingWalletTxs(
  fundingWalletAddress: string,
): Promise<getFundingWalletTxsResponse[]> {
  const url = `${AURORA_API_URL}?module=account&action=${QUERY_TYPE_COIN}&address=${fundingWalletAddress}&sort=desc`
  try {
    const response = await fetch(url)
    const data: AuroraAPIResponse = await response.json()
    if (data.status !== "1") return []
    const inflows = data.result.filter(
      (tx: any) =>
        tx.to?.toLowerCase() === fundingWalletAddress.toLowerCase()
        // &&
        // tx.value !== "0" &&
        // tx.tokenSymbol
        // &&
        // tx.contractAddress &&
        // tx.tokenSymbol === "USDT" &&
        // tx.contractAddress.toLowerCase() === AURORA_USDT_CONTRACT,
    )
    const transformedInflows = inflows.map((tx) => {
      const parseTokenTxValue =
        Number(tx.value) / Math.pow(10, Number(tx.tokenDecimal) || 6)
      const txAmount = Math.ceil(parseTokenTxValue / TX_COST_USDT)
      const { input, ...rest } = tx
      return {
        ...rest,
        value: parseTokenTxValue,
        txAmount,
      }
    })
    return transformedInflows
  } catch (err) {
    console.error(`Error fetching for ${fundingWalletAddress}:`, err)
    return []
  }
}

type AuroraAPIResponse = {
  status: string
  message: string
  result: Array<{
    blockNumber: string
    timeStamp: string
    hash: string
    nonce: string
    blockHash: string
    transactionIndex: string
    from: string
    to: string
    value: string
    gas: string
    gasPrice: string
    isError: string
    txreceipt_status: string
    input: string
    contractAddress?: string
    tokenName?: string
    tokenDecimal?: string
    tokenSymbol?: string
  }>
}

type AuroraAPIResult = AuroraAPIResponse["result"][0]

type getFundingWalletTxsResponse = Omit<AuroraAPIResult, "value" | "input"> & {
  value: number // Changed from string to number
  txAmount: number
}
