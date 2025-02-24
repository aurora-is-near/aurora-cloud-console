import { BookOpenIcon, SparklesIcon } from "@heroicons/react/24/outline"

import { Typography } from "@/uikit"
import type { Team } from "@/types/types"

import { BannerTopup } from "./BannerTopup"
import { Banner } from "./Banner"

type Props = {
  team: Team
}

export const WhatsNext = ({ team }: Props) => (
  <section className="flex flex-col gap-5">
    <Typography variant="heading" size={1}>
      Discover more
    </Typography>
    <div className="flex flex-col gap-4">
      <Banner
        variant="info"
        title="Book a call with our team"
        description="Schedule a call to finalize configurations, go-to-market strategy, and ensure everything is ready for launch."
        Icon={<SparklesIcon className="w-11 h-11 text-green-900" />}
        link={{
          isExternal: true,
          label: "Book a call",
          trackEventName: "book_a_call_click",
          url: "https://calendly.com/d/5f2-77d-766/aurora-cloud-demo",
        }}
      />
      <BannerTopup team={team} />
      <Banner
        variant="info"
        title="Explore Aurora Cloud documentation"
        description="Dive into our docs to understand how virtual chains work and get started with development."
        Icon={<BookOpenIcon className="w-11 h-11 text-green-900" />}
        link={{
          isExternal: true,
          label: "View docs",
          trackEventName: "view_docs_click",
          url: "https://doc.aurora.dev/aurora-cloud/welcome/about-virtual-chains",
        }}
      />
    </div>
  </section>
)
