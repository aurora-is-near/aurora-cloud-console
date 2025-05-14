import { formatUnits } from "ethers"
import { getCryptoOrders } from "@/actions/orders/get-crypto-orders"
import { updateTeam } from "@/actions/teams/update-team"
import { Team } from "@/types/types"
import {
  addOrder,
  type OrderWithRequiredFields,
} from "@/actions/orders/add-order"
import { logger } from "@/logger"

const AURORA_EXPLORER_API_URL =
  process.env.AURORA_EXPLORER_API_URL ??
  "https://explorer.testnet.aurora.dev/api/"

const AURORA_USDT_CONTRACT =
  process.env.AURORA_USDT_CONTRACT_ADDRESS ??
  "0x80da25da4d783e57d2fcda0436873a193a4beccf"

const TX_COST_USDT = Number(process.env.TX_COST_USDT) ?? 0.004628

// Define the function that will be used later in the file
async function getFundingWalletTxs(
  fundingWalletAddress: string,
): Promise<getFundingWalletTxsResponse[]> {
  const url = `${AURORA_EXPLORER_API_URL}?module=account&action=tokentx&address=${fundingWalletAddress}&sort=desc`

  try {
    const response = await fetch(url)
    const data: AuroraExplorerResponse = await response.json()

    if (data.status !== "1") {
      return []
    }

    const inflows = data.result.filter(
      (tx: AuroraExplorerResponse["result"][0]) =>
        tx.to?.toLowerCase() === fundingWalletAddress.toLowerCase() &&
        tx.value !== "0" &&
        tx.tokenSymbol &&
        tx.contractAddress &&
        tx.tokenSymbol === "USDT" &&
        tx.contractAddress.toLowerCase() === AURORA_USDT_CONTRACT.toLowerCase(),
    )

    const transformedInflows = inflows.map((tx) => {
      const parseTokenTxValue = formatUnits(
        Number(tx.value),
        Number(tx.tokenDecimal) || 6,
      )

      const txAmount = Math.ceil(Number(parseTokenTxValue) / TX_COST_USDT)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { input, ...rest } = tx

      return {
        ...rest,
        value: Number(parseTokenTxValue),
        txAmount,
      }
    })

    return transformedInflows
  } catch (err) {
    logger.error(`Error fetching for ${fundingWalletAddress}:`, err)

    return []
  }
}

export async function processTeamTx(team: Team) {
  const fundingWalletAddress = team.funding_wallet_address

  if (!fundingWalletAddress) {
    return
  }

  const inflows = await getFundingWalletTxs(fundingWalletAddress)

  if (inflows.length === 0) {
    return
  }

  const orders = await getCryptoOrders(team.id)

  if (orders.length === 0) {
    await Promise.all(
      inflows.map(async (tx) => {
        const txHash = tx.hash
        const { txAmount } = tx
        const newOrder: OrderWithRequiredFields = {
          number_of_transactions: txAmount,
          team_id: team.id,
          tx_hash: txHash,
          payment_status: "paid",
          type: "top_up",
        }

        await addOrder(newOrder)
        await updateTeam(team.id, {
          prepaid_transactions: team.prepaid_transactions
            ? team.prepaid_transactions + txAmount
            : txAmount,
        })
      }),
    )
  } else {
    // Disable ESLint rules for this specific loop
    // We need sequential execution here as we're processing financial transactions in order
    // and need to stop processing as soon as we find an existing transaction
    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    for (const tx of inflows) {
      const txHash = tx.hash
      const { txAmount } = tx
      const foundOrder = orders.find((order) => order.tx_hash === txHash)

      if (foundOrder) {
        // if order was found, then all orders after it are also found
        break
      }

      const newOrder: OrderWithRequiredFields = {
        number_of_transactions: txAmount,
        team_id: team.id,
        tx_hash: txHash,
        payment_status: "paid",
        type: "top_up",
      }

      // Sequential processing is required
      await addOrder(newOrder)
      await updateTeam(team.id, {
        prepaid_transactions: team.prepaid_transactions
          ? team.prepaid_transactions + txAmount
          : txAmount,
      })
    }
    /* eslint-enable no-restricted-syntax, no-await-in-loop */
  }
}

type AuroraExplorerResponse = {
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
type getFundingWalletTxsResponse = Omit<
  AuroraExplorerResponse["result"][0],
  "value" | "input"
> & {
  value: number // Changed from string to number
  txAmount: number
}
