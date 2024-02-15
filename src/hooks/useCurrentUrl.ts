import { useEffect, useState } from "react"

export const useCurrentUrl = (path: string) => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(new URL(path, window.location.origin).href)
  }, [path])

  return url
}
