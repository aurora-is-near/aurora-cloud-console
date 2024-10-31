import { TabCard } from "@/components/TabCard/TabCard"

export const GasAbstractionAboutTab = () => (
  <TabCard>
    <div className="flex flex-col gap-2 text-[16px] text-slate-500">
      <p>
        Your virtual chain offers fully abstracted gas, allowing you to
        configure gas fees to best suit your application—from setting specific
        plans to removing fees entirely.
      </p>
      <p>
        This feature is managed at the relayer level, so you won’t need
        additional infrastructure to control gas fees.
      </p>
      <p>
        With a gas plan, you can enable free transactions under defined
        conditions, typically including a whitelist of user addresses,
        whitelisted contracts, and limits on transactions per user or time
        period.
      </p>
      <p>
        Example: You decide that a segment of your users should get 100 free
        transactions per month when interacting with your dApp contract.
      </p>
      <ul className="list-disc ml-4">
        <li>Add users’ addresses to the whitelist via API</li>
        <li>Add your contract address to the contract whitelist</li>
        <li>Set transaction limits (e.g., 100 per month per user)</li>
      </ul>
      <p>
        Once set, any transaction that meets these criteria will be exempt from
        gas fees.
      </p>
    </div>
  </TabCard>
)
