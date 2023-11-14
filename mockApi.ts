import { Deal, Silo } from "./types/types"

// The `id` maps to a column in the Proxy DB test data.
const deals: Deal[] = [
  {
    id: "basic plan",
    name: "Basic Plan",
    created_at: "2023-06-03T12:00:00.000Z",
    contracts: [
      {
        name: "Contract 1",
        address: "0x514c44c9Ef991388f37A3857133d41eC79f9Eb88",
      },
      {
        name: "Contract 2",
        address: "0x8Df9Fc8C176Ecb44b143076505bE0EBC1dfC4B8D",
      },
    ],
  },
  {
    id: "premium plan",
    name: "Premium Plan",
    created_at: "2023-05-23T12:00:00.000Z",
    contracts: [
      {
        name: "Contract 1",
        address: "0x514c44c9Ef991388f37A3857133d41eC79f9Eb88",
      },
      {
        name: "Contract 2",
        address: "0x8Df9Fc8C176Ecb44b143076505bE0EBC1dfC4B8D",
      },
    ],
  },
]

const silos: Silo[] = [
  {
    id: "silo-1",
    name: "Silo 1",
    chainId: "1313161556",
    tokens: [
      {
        name: "AURORA",
        address: "0x8f16e84e93B649590319c8329728b7A39915cEd5",
        type: "ERC-20",
      },
      {
        name: "USDC",
        address: "0xBf2686935B77Fe1Afb6468a98D06ABE2Bf906f94",
        type: "ERC-20",
      },
    ],
  },
  {
    id: "silo-2",
    name: "Silo 2",
    chainId: "1313161557",
    tokens: [],
  },
]

export const getDealById = async (id: string) => {
  return deals.find((deal) => deal.id === id)
}

export const getDeals = async () => {
  return deals
}

export const getSiloById = async (id: string) => {
  return silos.find((silo) => silo.id === id)
}

export const getSilos = async () => {
  return silos
}
