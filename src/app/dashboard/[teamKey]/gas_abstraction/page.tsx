import Image from "next/image"
import Layout from "@/app/dashboard/Layout"
import Hero from "@/components/v2/dashboard/Hero"

const Page = () => {
  return (
    <Layout>
      <div className="divide-y flex flex-col gap-10">
        <Hero
          title="Gas Abstraction"
          description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
          button={{
            text: "Available on Devnet and Mainnet",
          }}
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/gas.png"
              alt="Aurora Cloud"
            />
          }
        />

        <div className="flex flex-col pt-10 gap-5">
          <span className="text-2xl text-slate-900 font-bold">
            Your Gas Plans
          </span>

          <div className="flex flex-row justify-between rounded-xl bg-slate-100 p-6">
            <div className="flex flex-col gap-2">
              <span className="text-slate-900 font-semibold text-[16px]">
                Want to create your own plan?
              </span>
              <span className="text-sm text-slate-500">
                Set up devnet or mainnet chain on Aurora Cloud.
              </span>
            </div>
            <button
              type="button"
              className="flex self-center text-sm border border-slate-400 rounded-lg p-1 px-2"
            >
              Create chain
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page
