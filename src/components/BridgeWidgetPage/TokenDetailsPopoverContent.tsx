import CopyButton from "@/components/CopyButton"

type TokenDetailsPopoverContentProps = {
  network: string
  address: string
}

const TokenDetailsPopoverContent = ({
  network,
  address,
}: TokenDetailsPopoverContentProps) => {
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

const generateTokenDescription = (token: {
  id: number
  symbol: string
  isPending: boolean
  siloAddress: string | null
  auroraAddress: string | null
  nearAddress: string | null
  ethereumAddress: string | null
}) => {
  if (token.isPending) {
    return "This token is pending deployment. Addresses will be available after deployment."
  }

  return (
    <div className="flex flex-col gap-2">
      {!!token.siloAddress && (
        <TokenDetailsPopoverContent
          network="Silo"
          address={token.siloAddress}
        />
      )}
      {!!token.auroraAddress && (
        <TokenDetailsPopoverContent
          network="Aurora"
          address={token.auroraAddress}
        />
      )}
      {!!token.nearAddress && (
        <TokenDetailsPopoverContent
          network="Near"
          address={token.nearAddress}
        />
      )}
      {!!token.ethereumAddress && (
        <TokenDetailsPopoverContent
          network="Ethereum"
          address={token.ethereumAddress}
        />
      )}
    </div>
  )
}

export { generateTokenDescription }
