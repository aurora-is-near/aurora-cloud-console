import {
  ProxyApiUpateOperation,
  ProxyApiViewOperation,
} from "@/types/proxy-api"

const PROXY_API_BASE_URL = "https://aclproxy.aurora.dev"

const request = async (
  endpoint: string,
  operations: ProxyApiUpateOperation[] | ProxyApiViewOperation[],
) => {
  const { href } = new URL(endpoint, PROXY_API_BASE_URL)

  console.debug("Mock Proxy API request", href, JSON.stringify(operations))

  // const res = await fetch(href, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.PROXY_API_TOKEN}`,
  //   },
  //   body: JSON.stringify(operations),
  // })

  // if (!res.ok) {
  //   throw new Error(`Proxy API call failed: ${res.status} ${res.statusText}`)
  // }

  // return res
}

export const proxyApiClient = {
  view: (operations: ProxyApiViewOperation[]) =>
    request("/aclproxy/v1/view", operations),
  update: (operations: ProxyApiUpateOperation[]) =>
    request("/aclproxy/v1/update", operations),
}
