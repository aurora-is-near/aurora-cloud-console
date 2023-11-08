const deals = [
  {
    id: "uuid-1",
    name: "A very big deal",
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
    id: "uuid-2",
    name: "Another deal",
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

const silos = [
  {
    name: "Silo 1",
    href: "silo-1",
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
    name: "Silo 2",
    href: "silo-2",
    tokens: [],
  },
]

export const sleep = async (ms: number = 2500) =>
  new Promise((r) => setTimeout(r, ms))

export const getDealById = async (id: string) => {
  await sleep()
  return deals.find((deal) => deal.id === id)
}

export const getDeals = async () => {
  await sleep()
  return deals
}

export const getSiloById = async (id: string) => {
  await sleep()
  return silos.find((silo) => silo.href === id)
}

export const getSilos = async () => {
  await sleep()
  return silos
}
