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
action. Scopes are set against each operation defined in the API contract.

Within the database the scopes are defined as an enum, managed via a Supabase
trigger. This trigger can be updated via the
[SQL Editor](https://supabase.com/dashboard/project/xqharbhfobwuhpcdsapg/sql) in
the Supabase UI. When defining new scopes use the format `<category>:<level>`,
for example `deals:read` or `deals:write`.

Note that if a valid session cookie is included with the request we assume the
user is logged in via the dashboard and should be given `admin` permissions,
which is a special scope that authorises the user to do everything.

## API request handlers

All public API request handlers should be wrapped with the `createApiEndpoint()`
function. This function calls the given handler, attaching a context object that
includes the user object from the `public.users` table and the `team` associated
with the current domain. It is called with an operation ID, as defined in the API
contract, and the handler that operation, for example:

```ts
import { NextRequest } from "next/server"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { ApiRequestContext, createApiEndpoint } from "@/utils/api"

export const PATCH = createApiEndpoint('updateThing', async (
  req: NextRequest,
  ctx: ApiRequestContext
) => {
  const { name } = await req.json();
  const supabase = createAdminSupabaseClient()

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("user_id", ctx.user.user_id)

  if (error) throw error

  return { status: "OK" }
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

## Muti-site setup

The Aurora Cloud Console implements a teams system based on subdomains. Each
team is associated with one or more silos and the dashboard for that team
can be accessed via a unique subdomain. For example, to access the Whitebit
team we can visit <http://whitebit.aurora-cloud-console.com>.

### User access

When a user is invited to a team we create a row in the `users_teams` table.
We also set some custom metadata on the Supabase Auth user object, via
a Postgres trigger. This custom metadata contains all of the teams that the user
has been granted access to.

For example, if a user is a member of the `aurora` and `whitebit` teams their
user object might look something like this:

```json
{
  "id": "da153a55-00b2-4661-95c3-e79663486b86",
  "email": "alex.mendes@aurora.dev",
  "user_metadata": {
    "teams": [
      "aurora",
      "whitebit"
    ]
  },
}
```

This setup means we can create authentication middleware that check the session
object to see if a user should be granted access to a team's dashboard.

Users and teams have a many-to-many relationship. Most users will only ever be
invited to a single team, but could be invited to many.

### Creating a team

To create a new team add a row to the `teams` table. The `team_key` is
effectively the subdomain from which we want to serve the dashboard for that
team.

A team should always contain at least one user. This user will be allowed to
invite other users to the team.

### Local development

In development we can set the `DEFAULT_TEAM_KEY` environment variable in order
to switch between teams (rather than relying on subdomains).

### Admin access

At the time of writing, all email addresses ending with `aurora.dev` are
provided with admin access to all teams. These users do not need to be invited
to a team explicitly to be able to view that team's dashboard, although they
do need to exist in Supabase Auth.

An admin area is provided at `/admin` or at <https://admin.auroracloud.dev>
in production.
