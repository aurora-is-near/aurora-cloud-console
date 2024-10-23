import dynamic from "next/dynamic"

const CalendlyWidget = dynamic(
  () => import("./CalendlyWidget").then((mod) => mod.CalendlyWidget),
  {
    ssr: false,
  },
)

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  return <CalendlyWidget teamKey={teamKey} />
}

export default Page
