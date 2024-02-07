"use client"

import Card from "@/components/Card"
import { useCurrentUrl } from "@/hooks/useCurrentUrl"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

type DealApiRequestCardProps = {
  id: number
}

export const DealApiRequestCard = ({ id }: DealApiRequestCardProps) => {
  const { data: deal } = useQuery(getQueryFnAndKey("getDeal", { id }))
  const apiUrl = useCurrentUrl("/api-docs")

  if (!deal) {
    return null
  }

  return (
    <Card>
      <Card.Title tag="h3">ACC API response</Card.Title>
      <Card.Subtitle>
        When merged with Proxy API data this is the full response returned from
        the Aurora Cloud Console API for this deal
        {apiUrl && (
          <>
            {" "}
            (see{" "}
            {apiUrl && (
              <Link
                className="underline text-blue-600 hover:text-blue-800"
                href={apiUrl}
              >
                {apiUrl}
              </Link>
            )}
            )
          </>
        )}
        .
      </Card.Subtitle>
      <div className="px-6 pb-7">
        <pre>
          <code>{deal ? JSON.stringify(deal, null, 2) : null}</code>
        </pre>
      </div>
    </Card>
  )
}
