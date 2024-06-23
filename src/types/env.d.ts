declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SENTRY_ENABLED: string
    SUPABASE_SERVICE_ROLE_KEY: string
    POSTMARK_SERVER_TOKEN: string
  }
}
