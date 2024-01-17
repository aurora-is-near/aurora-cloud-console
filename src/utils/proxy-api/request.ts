const PROXY_API_BASE_URL = "https://aclproxy.aurora.dev"

const request = async (endpoint: string, body: string) => {
  const { href } = new URL(endpoint, PROXY_API_BASE_URL)

  console.debug("Mock Proxy API request", href, body)

  // const res = await fetch(href, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.PROXY_API_TOKEN}`,
  //   },
  //   body,
  // })

  // if (!res.ok) {
  //   throw new Error(`Proxy API call failed: ${res.status} ${res.statusText}`)
  // }

  // return res
}

export const proxyApiClient = {
  view: (body: string) => request("/aclproxy/v1/view", body),
  update: (body: string) => request("/aclproxy/v1/update", body),
}
