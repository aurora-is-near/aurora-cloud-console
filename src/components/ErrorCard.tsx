import httpStatus from "http-status"
import { isRequestError } from "@/utils/api/request"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { notFound } from "next/navigation"

type ErrorCardProps = {
  error: unknown
  showNotFoundPage?: boolean
}

const MESSAGES: Record<number, string> = {
  401: "You are not authorized to access this resource.",
  403: "You are not allowed to access this resource.",
  404: "The requested resource(s) could not be found.",
  500: "An unexpected error occurred. Please try again later.",
}

export const ErrorCard = ({ error, showNotFoundPage }: ErrorCardProps) => {
  const errorDetails = useMemo((): {
    statusCode: number | null
    title: string
    description: string
  } => {
    const defaultErrorDetails = {
      statusCode: null,
      title: "Something went wrong",
      description: "An unexpected error occurred. Please try again later.",
    }

    if (!isRequestError(error)) {
      return defaultErrorDetails
    }

    const title = httpStatus[error.statusCode]
    const description = MESSAGES[error.statusCode]

    if (!title || !description) {
      return defaultErrorDetails
    }

    return {
      title,
      description,
      statusCode: error.statusCode,
    }
  }, [error])

  if (errorDetails.statusCode === 404 && showNotFoundPage) {
    notFound()
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="bg-white py-8 px-10 rounded-lg flex flex-col items-center border border-gray-200">
        <XCircleIcon
          className="w-12 h-12 text-red-600 mb-3"
          aria-hidden="true"
        />
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          {errorDetails.title}
        </h2>

        <p className="text-gray-500">{errorDetails.description}</p>
      </div>
    </div>
  )
}
