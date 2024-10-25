"use client"

import { LinkButton } from "@/components/LinkButton"

type CalendlyWidgetProps = {
  teamKey: string
}

export const CalendlyWidget = ({ teamKey }: CalendlyWidgetProps) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full">
      <div className="fixed top-0 left-0 bg-white w-full h-full">
        <div className="bg-green-100 rounded-full w-full h-full blur-3xl fixed -bottom-3/4" />
      </div>

      <div
        className="calendly-inline-widget mt-1/10 w-full h-full"
        data-url="https://calendly.com/d/5f2-77d-766/aurora-cloud-demo"
      />

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
        <LinkButton href={`/dashboard/${teamKey}`} size="lg">
          Go back to Dashboard
        </LinkButton>
      </div>
    </div>
  )
}
