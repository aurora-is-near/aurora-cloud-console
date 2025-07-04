declare namespace NodeJS {
  interface ProcessEnv {
    MUNZEN_API_SECRET: string
    NEXT_PUBLIC_MUNZEN_API_KEY: string
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SENTRY_ENABLED: string
    SUPABASE_SERVICE_ROLE_KEY: string
    POSTMARK_SERVER_TOKEN: string
    BLOCKSCOUT_DB_PASSWORD: string
    NEAR_PRIVATE_KEY: string
  }
}
