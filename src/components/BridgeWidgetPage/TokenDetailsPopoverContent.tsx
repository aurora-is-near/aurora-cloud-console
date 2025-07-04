import CopyButton from "@/components/CopyButton"

type AddressBoxProps = {
  network: string
  address: string
}

const AddressBox = ({ network, address }: AddressBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-medium text-slate-700">{network}</h3>
      <div
        className="flex items-center gap-2 bg-slate-100 text-slate-700 rounded-md px-2 py-0"
        title={address ?? ""}
      >
        {address && address.length > 10
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : address}
        <CopyButton value={address || ""} />
      </div>
    </div>
  )
}

type TokenDetailsPopoverContentProps = {
  token: {
    id: number
    symbol: string
    isPending: boolean
    siloAddress: string | null
    auroraAddress: string | null
    nearAddress: string | null
    ethereumAddress: string | null
  }
}

const TokenDetailsPopoverContent = ({
  token,
}: TokenDetailsPopoverContentProps) => {
  const {
    isPending,
    siloAddress,
    auroraAddress,
    nearAddress,
    ethereumAddress,
  } = token

  if (isPending) {
    return (
      <div className="text-sm text-slate-700">
        This token is pending deployment. Addresses will be available after
        deployment.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {!!siloAddress && <AddressBox network="Silo" address={siloAddress} />}
      {!!auroraAddress && (
        <AddressBox network="Aurora" address={auroraAddress} />
      )}
      {!!nearAddress && <AddressBox network="Near" address={nearAddress} />}
      {!!ethereumAddress && (
        <AddressBox network="Ethereum" address={ethereumAddress} />
      )}
    </div>
  )
}

export default TokenDetailsPopoverContent
