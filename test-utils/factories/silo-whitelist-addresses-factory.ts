import { SiloWhitelistAddress } from "@/types/types"

export const createMockSiloWhitelistAddress = (
  data?: Partial<SiloWhitelistAddress>,
): SiloWhitelistAddress => ({
  id: 1,
  address: "0x00",
  is_applied: false,
  list: "MAKE_TRANSACTION",
  silo_id: 1,
  add_tx_id: 1,
  remove_tx_id: 1,
  ...data,
})

export const createMockSiloWhitelistAddresses = (
  count: number,
  data?: Partial<SiloWhitelistAddress>,
): SiloWhitelistAddress[] =>
  Array.from({ length: count }, (_, index) =>
    createMockSiloWhitelistAddress({
      id: index + 1,
      ...data,
    }),
  )
