import { TabCard } from "@/components/TabCard/TabCard"

export const GasAbstractionAboutTab = () => (
  <TabCard>
    <div className="flex flex-col gap-2 text-[16px] text-slate-500">
      <p>
        Your virtual chain has gas fully abstracted, meaning that gas charged on
        your chain can be fully configured, from specific plans to removed
        entirely, you choose what works best for your application.
      </p>
      <p>
        This feature is setup at the relayer level, meaning you don't need any
        additional infrastructure to control gas fees.
      </p>
      <p>
        A gas plan enables free transactions within the conditions defined by
        the plan. It usually involves a whitelist of EOA addresses, a contract
        whitelist and some limits such as transactions per user or per unit of
        time.
      </p>
      <p>
        Example: You decide that your premium users get 100 free transactions
        per month each when they interact with your dapp contract.
      </p>
      <ul className="list-disc ml-4">
        <li>Simply add their address to the whitelist via API</li>
        <li>Add your contract address to the contract whitelist</li>
        <li>Set the parameters to 100 each per month</li>
      </ul>
      <p>
        From this point any transaction that will meet the above criteria will
        be exempt of gas fees.
      </p>
    </div>
  </TabCard>
)
