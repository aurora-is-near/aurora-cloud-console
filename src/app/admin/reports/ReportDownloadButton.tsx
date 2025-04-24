"use client"

import { useState } from "react"
import { Button } from "@/components/Button"
import { logger } from "@/logger"
import Modal from "@/components/Modal"

type ReportDownloadButtonProps = {
  getCsvData: () => Promise<string>
}

export const ReportDownloadButton = ({
  getCsvData,
}: ReportDownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [reportUrl, setReportUrl] = useState<string | null>(null)

  const downloadReport = async () => {
    const csvData = await getCsvData()
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    setReportUrl(url)
  }

  const onExportButtonClick = async () => {
    setIsLoading(true)

    try {
      await downloadReport()
    } catch (error) {
      logger.error(error)
    }

    setIsLoading(false)
  }

  const onDownloadButtonClick = () => {
    if (!reportUrl) {
      return
    }

    window.open(reportUrl, "_blank")
    setReportUrl(null)
  }

  return (
    <>
      <Button onClick={onExportButtonClick} loading={isLoading}>
        Export
      </Button>
      <Modal
        title="Report ready"
        open={!!reportUrl}
        close={() => {
          setReportUrl(null)
        }}
      >
        <div className="flex flex-col items-center space-y-4 mt-4">
          <p className="text-sm text-gray-500">
            Your report is ready. Click the button below to download it.
          </p>
          <Button onClick={onDownloadButtonClick}>Download</Button>
        </div>
      </Modal>
    </>
  )
}
