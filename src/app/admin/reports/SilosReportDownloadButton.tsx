"use client"

import { getSilosReport } from "@/actions/reports/silos"
import { ReportDownloadButton } from "@/app/admin/reports/ReportDownloadButton"

export const SilosReportDownloadButton = () => {
  return <ReportDownloadButton getCsvData={getSilosReport} />
}
