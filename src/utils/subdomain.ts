export const getSubdomain = (headers: Headers) => {
  const host = headers.get("x-forwarded-host") ?? headers.get("host")

  if (!host) {
    return
  }

  const hostname = host.split(":")[0]
  const hostnameParts = hostname.split(".")

  if (hostnameParts.length !== 3) {
    return
  }

  return hostnameParts[0]
}
