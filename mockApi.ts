import { Silo } from "./types/types"

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

export const getSiloById = async (id: string) => {
  return silos.find((silo) => silo.id === id)
}

export const getSilos = async () => {
  return silos
}
