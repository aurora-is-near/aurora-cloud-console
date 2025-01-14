import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

import { Typography } from "@/uikit"
import { LinkButton } from "@/components/LinkButton"

const CompleteOnboardingBanner = () => (
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5 w-full px-6 py-8 border border-green-300 bg-green-50 shadow-sm rounded-lg">
    <div className="grow-0">
      <SparklesIcon className="w-11 h-11 text-green-900" />
    </div>
    <div className="mr-auto">
      <Typography variant="heading" size={4}>
        Complete your onboarding
      </Typography>
      <Typography variant="paragraph" size={4} className="text-gray-500">
        Schedule a call to finalize configurations, go-to-market strategy, and
        ensure everything is ready for launch.
      </Typography>
    </div>
    <LinkButton
      size="lg"
      href="https://calendly.com/d/5f2-77d-766/aurora-cloud-demo"
    >
      Book a call
    </LinkButton>
  </div>
)

const ExploreAuroraDocsBanner = () => (
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5 w-full px-6 py-8 border border-slate-200 bg-slate-100 rounded-lg">
    <div className="grow-0">
      <BookOpenIcon className="w-11 h-11 text-slate-500" />
    </div>
    <div className="mr-auto">
      <Typography variant="heading" size={4}>
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
      href="https://app.gitbook.com/o/n5HlK4HD4c2SMkTWdXdM/s/s1NkUrRikxqj1akDiExv/"
    >
      View docs
      <ArrowTopRightOnSquareIcon className="w-6 h-6" />
    </LinkButton>
  </div>
)

export const WhatsNext = () => (
  <section className="flex flex-col gap-6">
    <Typography variant="heading" size={4}>
      What’s next?
    </Typography>
    <div className="flex flex-col gap-5">
      <CompleteOnboardingBanner />
      <ExploreAuroraDocsBanner />
    </div>
  </section>
)
