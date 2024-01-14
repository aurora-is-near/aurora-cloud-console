import { notFound } from "next/navigation"
import { useEffect } from "react"
import { isRequestError } from "../utils/api/request"

export const useNotFoundError = (error: unknown) => {
  useEffect(() => {
    if (!error) {
      return
    }

    if (!isRequestError(error)) {
      return
    }

    if (error.statusCode === 404) {
      notFound()
    }
  }, [error])
}
