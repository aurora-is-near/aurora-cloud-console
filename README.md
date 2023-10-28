# Aurora Cloud Console

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies using [yarn](https://classic.yarnpkg.com/):

```text
yarn install
```

Create a local environment variables file:

```text
cp .env.local.template .env.local
```

Fill in the values accordingly, then run the development server:

```text
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Authentication

We use [Supabase Auth](https://supabase.com/docs/guides/auth) for handling
authentication for both the dashboard and the API routes.

A unique API key is generated whenever a user is created, via Postgres triggers
(see below). This key can be used when accessing the API routes at `/api/*`
directly.

### API

All API request handlers that deal with private data should be wrapped with the
`apiRequestHandler()` function. This function calls the given handler,
attaching a context object that includes the user object from the `public.users`
table.

This context object can be used within the handler. For example, when updating
private data for a given user:

```ts
import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { abortIfUnauthorised } from "@/utils/abort"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"

export const PATCH = apiRequestHandler(async (
  req: NextRequest,
  _res: NextResponse,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { newName } = await req.json();

  // Respond with a 401 if not authorised
  abortIfUnauthorised(ctx)

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_guid", ctx.user.user_guid)

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})
```

## Triggers

The `public.users` table holds additional information about the user. This table
needs to be kept in sync with the `auth.users` table
(which is what Supabase Auth uses).

To to this we use the set of
[Postgres triggers](https://supabase.com/docs/guides/database/postgres/triggers),
which can be seen in the [SQL Queries](https://supabase.com/dashboard/project/xqharbhfobwuhpcdsapg/sql)
section of the Subabase UI.
