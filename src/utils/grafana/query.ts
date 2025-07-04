import fetch from "node-fetch"
import https from "https"
import { createDebugger } from "@/debug"
import { logger } from "@/logger"

const GRAFANA_BASE_URL = "https://grafana.aurora.dev/"
const DEFAULT_INTERVAL = "now-24h"
const MAX_DAYS = 90
const GRAFANA_DATASOURCE = {
  type: "prometheus",
  uid: "jE6lCJO4k",
}

type Query = {
  datasource: {
    type: string
    uid: string
  }
  datasourceId: number
  editorMode: string
  exemplar: boolean
  expr: string
  hide: boolean
  intervalMs: number
  range: boolean
  refId: string
  utcOffsetSec: number
}

type QueryResults = {
  results: Record<string, { frames: { data: { values: number[][] } }[] }>
}

const httpsAgent = new https.Agent({
  // At the time of writing the certificate for the Grafana API has expired.
  rejectUnauthorized: false,
})

/**
 * Adapt the interval depending on the length of time we're requesting data for.
 *
 * This is so that we don't ask Grafana for too much data at once, which will
 * slow down the response time.
 */
const getIntervalMs = (interval: string | null) => {
  const time = (interval ?? DEFAULT_INTERVAL).split("-")[1]
  const unit = time.slice(-1)
  const hours = {
    m: Number(time.slice(0, -1)) / 60,
    h: Number(time.slice(0, -1)),
    d: Number(time.slice(0, -1)) * 24,
    w: Number(time.slice(0, -1)) * 24 * 7,
    M: Number(time.slice(0, -1)) / 60 / 24,
  }[unit]

  if (!hours) {
    throw new Error(`Invalid interval: ${interval}`)
  }

  const days = hours / 24

  if (days > MAX_DAYS) {
    logger.warn(
      `Requested interval (${days} days) is too long, data is available for a maximum of ${MAX_DAYS} days.`,
    )
  }

  if (Number(hours) > 48) {
    return 7200000 // 2 hours
  }

  if (Number(hours) > 24) {
    return 3600000 // 1 hour
  }

  if (Number(hours) > 12) {
    return 1800000 // 30 minutes
  }

  if (Number(hours) > 6) {
    return 900000 // 15 minutes
  }

  if (Number(hours) > 1) {
    return 300000 // 5 minutes
  }

  if (Number(hours) > 0.5) {
    return 60000 // 1 minute
  }

  return 15000 // 15 seconds
}

/**
 * Queries a datasource in Grafana.
 *
 * The actual `expr`ession was built by inspecting what happens in the Grafana UI.
 * @see https://grafana.com/docs/grafana/latest/developers/http_api/data_source/#query-a-data-source
 */
const query = async (
  queries: Query[],
  interval: string | null = DEFAULT_INTERVAL,
): Promise<QueryResults> => {
  const { href } = new URL("/api/ds/query", GRAFANA_BASE_URL)
  const username = process.env.GRAFANA_USERNAME
  const password = process.env.GRAFANA_PASSWORD
  const debug = createDebugger("grafana")

  debug("Grafana request", href)

  const res = await fetch(href, {
    agent: httpsAgent,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64",
      )}`,
    },
    body: JSON.stringify({
      from: interval,
      to: "now",
      queries,
    }),
  })

  if (!res.ok) {
    let message

    try {
      ;({ message } = (await res.json()) as { message: string })
    } catch (e) {
      message = "Unknown error"
    }

    throw new Error(`Failed to query Grafana: ${res.status} - ${message}`)
  }

  const result = await res.json()

  return result as QueryResults
}

const getParameters = (obj: { [x: string]: unknown }) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}="${value}"`)
    .join(", ")

export const queryLatency = (
  percentiles: number[],
  {
    interval,
    network,
  }: {
    interval: string | null
    network: string | null
  },
) => {
  return query(
    percentiles.map((quartile, index) => ({
      datasource: GRAFANA_DATASOURCE,
      datasourceId: 8,
      editorMode: "builder",
      exemplar: false,
      expr: `histogram_quantile(${quartile}, sum by(le) (rate(borealis_prober_entries_request_size_bucket{${getParameters(
        {
          network,
        },
      )}}[$__rate_interval])))`,
      hide: false,
      intervalMs: getIntervalMs(interval),
      range: true,
      refId: String(index),
      utcOffsetSec: 0,
    })),
    interval,
  )
}

export const queryRpc = ({ network }: { network: string | null }) => {
  const interval = "now-90d"

  return query(
    [
      {
        datasource: GRAFANA_DATASOURCE,
        datasourceId: 8,
        editorMode: "builder",
        exemplar: false,
        expr: `sum(rate(borealis_prober_entries_count{${getParameters({
          network,
        })}}[$__rate_interval]))`,
        hide: false,
        intervalMs: getIntervalMs(interval),
        range: true,
        refId: "0",
        utcOffsetSec: 0,
      },
    ],
    interval,
  )
}

export const queryFailureRate = ({ network }: { network: string | null }) => {
  const interval = "now-90d"

  return query(
    [
      {
        datasource: GRAFANA_DATASOURCE,
        datasourceId: 8,
        editorMode: "builder",
        exemplar: false,
        expr: `sum(rate(borealis_prober_entries_count{${getParameters({
          rpcstatus: "error",
          network,
        })}}[$__rate_interval])) / sum(rate(borealis_prober_entries_count{}[$__rate_interval]))`,
        hide: false,
        intervalMs: getIntervalMs(interval),
        range: true,
        refId: "0",
        utcOffsetSec: 0,
      },
    ],
    interval,
  )
}
