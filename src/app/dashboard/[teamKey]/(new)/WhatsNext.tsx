import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

import { clsx, Typography } from "@/uikit"
import { LinkButton } from "@/components/LinkButton"

const CompleteOnboardingBanner = () => (
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5 w-full px-6 py-8 border border-slate-200 bg-white rounded-lg shadow-sm">
    <div className="grow-0">
      <SparklesIcon className="w-11 h-11 text-green-900" />
    </div>
    <div className="mr-auto flex flex-col gap-1">
      <Typography variant="heading" size={3}>
        Book a call with our team
      </Typography>
      <Typography variant="paragraph" size={4} className="text-gray-500">
        Schedule a call to finalize configurations, go-to-market strategy, and
        ensure everything is ready for launch.
      </Typography>
    </div>
    <LinkButton
      size="lg"
      variant="border"
      isExternal
      href="https://calendly.com/d/5f2-77d-766/aurora-cloud-demo"
      trackEventName="book_a_call_click"
    >
      Book a call
      <ArrowTopRightOnSquareIcon className="w-6 h-6" />
    </LinkButton>
  </div>
)

const ExploreAuroraDocsBanner = () => (
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5 w-full px-6 py-8 border border-slate-200 bg-white rounded-lg shadow-sm">
    <div className="grow-0">
      <BookOpenIcon className="w-11 h-11 text-green-900" />
    </div>
    <div className="mr-auto flex flex-col gap-1">
      <Typography variant="heading" size={3}>
        Explore Aurora Cloud documentation
      </Typography>
      <Typography variant="paragraph" size={4} className="text-gray-500">
        Dive into our docs to understand the virtual chain concept and get
        started with development.
      </Typography>
    </div>
    <LinkButton
      size="lg"
      isExternal
      variant="border"
      href="https://doc.aurora.dev/aurora-cloud/welcome/about-virtual-chains"
    >
      View docs
      <ArrowTopRightOnSquareIcon className="w-6 h-6" />
    </LinkButton>
  </div>
)

type Props = {
  className?: string
}

export const WhatsNext = ({ className }: Props) => (
  <section className={clsx("flex flex-col gap-5", className)}>
    <Typography variant="heading" size={3}>
      Discover more
    </Typography>
    <div className="flex flex-col gap-4">
      <CompleteOnboardingBanner />
      <ExploreAuroraDocsBanner />
    </div>
  </section>
)
