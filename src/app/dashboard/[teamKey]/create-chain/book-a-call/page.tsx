import dynamic from "next/dynamic"
import Script from "next/script"

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
  return (
    <>
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
      <CalendlyWidget teamKey={teamKey} />
    </>
  )
}

export default Page
