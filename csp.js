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
