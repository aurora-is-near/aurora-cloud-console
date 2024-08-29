import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import Hero from "@/components/v2/dashboard/Hero"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import {
  Partner1,
  Partner2,
  Partner3,
} from "../../../../public/static/v2/images/icons/index"
import { IconPlus } from "../../../../public/static/v2/images/menuIcons"

// TODO
// Links on all content blocks

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

const features = [
  {
    icon: Partner1,
    title: "Dedicated integration team",
  },
  {
    icon: Partner2,
    title: "Expert consultancy and guidance",
  },
  {
    icon: Partner3,
    title: "Community marketing",
  },
]

const meetingLink = "https://calendly.com/d/5f2-77d-766/aurora-cloud-demo"

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
          <Hero
            title="Welcome to Aurora Cloud"
            description="Get all the infrastructure and integrations needed to start your dApp.
          Validators, oracles, onramps—all come ready to be pre-configured on
          your chain, freeing up your time and resources to focus on what really
          matters: your dApp!"
            button={{
              path: `/dashboard/${teamKey}/create_chain`,
              text: "Create Aurora Chain",
              icon: <IconPlus className="h-4 w-4" />,
            }}
            image={
              <Image
                width="180"
                height="180"
                src="/static/v2/images/heroIcons/cloud.png"
                alt="Aurora Cloud"
              />
            }
          />
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

          <div className="p-10 rounded-2xl border border-slate-200 bg-slate-100">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="text-green-900 text-xs font-bold uppercase tracking-widest">
                  Aurora Labs
                </span>
                <span className="font-bold text-slate-900 text-xl tracking-tighter">
                  Your dedicated development team
                </span>
              </div>

              <Link href={meetingLink} target="_blank">
                <button
                  type="button"
                  className="border border-slate-400 rounded-lg p-3"
                >
                  Book a call
                </button>
              </Link>
            </div>

            <div className="mt-5 grid w-full max-w-sm flex-1 gap-4 md:max-w-none md:grid-cols-3 md:gap-8">
              {features.map((feature) => (
                <div
                  className="flex flex-col items-start justify-center rounded-[10px] bg-white p-5 pb-0 md:p-7 border border-slate-200"
                  key={feature.title}
                >
                  <feature.icon className="h-5 w-5 text-green-800 md:h-10 md:w-10" />
                  <h3 className="mt-4 max-w-[65%] text-base font-bold leading-[18px] text-slate-900 md:mt-5 md:text-[16px]">
                    {feature.title}
                  </h3>
                </div>
              ))}
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
