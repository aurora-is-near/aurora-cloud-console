"use client"

import { getOnboardingReport } from "@/actions/reports/onboarding"
import { ReportDownloadButton } from "@/app/admin/reports/ReportDownloadButton"

export const OnboardingReportDownloadButton = () => {
  return <ReportDownloadButton getCsvData={getOnboardingReport} />
}
