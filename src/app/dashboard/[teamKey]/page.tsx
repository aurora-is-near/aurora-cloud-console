import Image from "next/image"
import Layout from "@/app/dashboard/Layout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import HeroTitle from "@/components/v2/Hero/HeroTitle"
import HeroContent from "@/components/v2/Hero/HeroContent"
import AuroraButton from "@/components/v2/AuroraButton"
import { redirect } from "next/navigation"

const ExploreItem = ({ title, description, icon }: ExploreItemProps) => {
  return (
    <div className="rounded-xl border border-slate-200 w-full max-w-[310px]">
      <div className="rounded-t-xl overflow-hidden">
        <Image src={icon} width="310" height="170" alt="Example" />
      </div>
      <div className="rounded-b-xl bg-white p-5">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-slate-900 font-bold text-md">{title}</h3>
          <p className="text-center text-slate-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  if (!teamKey) {
    redirect("/dashboard_v1")
  }
  const team = await getTeamByKey(teamKey)

  // https://www.figma.com/design/83g9SAME00sIuoOPqd8EYj/Aurora-Cloud?node-id=3775-10045&t=PGhHmzDnXi5hsRI0-0
  return (
    <Layout>
      <div className="w-full">
        <div className="divide-y flex flex-col gap-10">
          <div className="flex flex-row gap-48 justify-between">
            <div className="flex flex-col gap-5">
              <HeroTitle>Welcome to Aurora Cloud</HeroTitle>
              <HeroContent>
                Get all the infrastructure and integrations needed to start your
                dApp. Validators, oracles, onramps—all come ready to be
                pre-configured on your chain, freeing up your time and resources
                to focus on what really matters: your dApp!
              </HeroContent>
              <div className="flex justify-items-start">
                <AuroraButton
                  icon={
                    <Image
                      width="16"
                      height="16"
                      src="/static/v2/images/menuIcons/ic_plus.svg"
                      alt="Create Aurora Chain"
                      style={{ filter: "invert(1)" }}
                    />
                  }
                >
                  Create Aurora Chain
                </AuroraButton>
              </div>
            </div>
            <div>
              <Image
                width="360"
                height="360"
                src="/static/v2/images/heroIcons/cloud.png"
                alt="Aurora Cloud"
              />
            </div>
          </div>
          <div className="flex flex-col pt-10 gap-10">
            <span className="text-xl text-slate-900 font-bold">
              Expore what you can do
            </span>

            <div className="flex flex-row gap-10">
              <ExploreItem
                title="Set up your Devnet"
                description="Get access to a shared Aurora Chain identical to the production
              ones."
                icon="/static/v2/images/examples/devnet.png"
              />
              <ExploreItem
                title="Read documentation"
                description="Explore our documentation to start developing and deploying on Aurora."
                icon="/static/v2/images/examples/docs.png"
              />
              <ExploreItem
                title="Talk to a developer"
                description="Join our Aurora Cloud developers community on Discord."
                icon="/static/v2/images/examples/talk.png"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface ExploreItemProps {
  title: string
  description: string
  icon: string
}

export default Page
