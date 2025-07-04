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
        {address?.slice(0, 6)}...
        {address?.slice(-4)}
        <CopyButton value={address ?? ""} />
      </div>
    </div>
  )
}

export default TokenDetailsPopoverContent
