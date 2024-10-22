import Card from "@/components/Card"
import { Pyth } from "../../../public/static/v2/images/icons"

const OracleAboutTab = () => {
  return (
    <Card>
      <div className="divide-y flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-[16px] text-slate-500">
          <p>
            The Pyth Oracle strives for decentralisation where prices are
            collaboratively fed by the different actors in the network.
          </p>
          <p>
            Since all Virtual Chains are communicating with the Pyth Oracle
            instance on Aurora Mainnet, the more chains and participants there
            are, the more complete, robust and decentralised its Oracle becomes.
          </p>
          <p>
            Besides, you get access from your Virtual Chain to all the other
            price feeds from the ecosystem, which means less development and
            better reliability.
          </p>
        </div>
        <div className="pt-5 flex flex-row items-center gap-3">
          <Pyth />
          <span className="text-sm text-slate-600">Powered by Pyth</span>
        </div>
      </div>
    </Card>
  )
}

export default OracleAboutTab
