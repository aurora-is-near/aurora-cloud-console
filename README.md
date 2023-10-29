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

## API keys

A user can generate an API key via the settings section of the dashboard. This
key can be used to make requests to the `/api/*` endpoints defined in this repo.

### Scopes

Each key can be assigned a set of scopes. Before we perform a particular action
we should validate that the given API key includes the required scope(s) for that
action. This can be done via the `abortIfUnauthorised()` function (see below).

The scopes are defined as an enum, which can be updated via the
[SQL Editor](https://supabase.com/dashboard/project/xqharbhfobwuhpcdsapg/sql) in
the Supabase UI. When defining new scopes use the format `<category>:<level>`,
for example `deals:read` or `deals:write`.

Note that if a valid session cookie is included with the request we assume the
user is logged in via the dashboard and should be given `admin` permissions,
which is a special scope that authorises the user to do everything.

## API handlers

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
  abortIfUnauthorised(ctx, ['user:write'])

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_id", ctx.user.user_id)

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
