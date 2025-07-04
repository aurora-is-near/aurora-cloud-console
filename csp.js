const cspProperties = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    "beacon-v2.helpscout.net",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "blob:",
    "data:",
    "www.datocms-assets.com",
    "assets.coingecko.com",
  ],
  "font-src": ["'self'"],
  "object-src": ["'none'"],
  "connect-src": [
    "'self'",
    "xqharbhfobwuhpcdsapg.supabase.co",
    "beaconapi.helpscout.net",
    "chatapi.helpscout.net",
    "hooks.slack.com",
    "api-js.mixpanel.com",
    "https://rpc.mainnet.near.org",
    "https://1rpc.io/near",
    "https://near.blockpi.network/v1/rpc/public",
    "https://near.drpc.org",
    "https://rpc.web4.near.page",
    "https://free.rpc.fastnear.com",
    "https://near.lava.build",
    "https://endpoints.omniatech.io/v1/near/mainnet/public",
    "https://nearrpc.aurora.dev",
  ],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
}

// See https://nextjs.org/docs/app/guides/content-security-policy#without-nonces
module.exports.cspHeader = [
  ...Object.entries(cspProperties).map(([key, values]) => {
    return `${key} ${values.join(" ")}`
  }),
  "upgrade-insecure-requests",
].join("; ")
