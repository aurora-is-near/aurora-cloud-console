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
import { NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { NextApiRequest, NextApiResponse } from "next"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"

export const PATCH = apiRequestHandler(async (
  req: NextApiRequest,
  _res: NextApiResponse,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { newName } = await req.body;

  // Respond with a 401 if not authenticated
  if (!ctx.user) {
    return getErrorResponse(401)
  }

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_guid", ctx.user.user_guid)

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})
```

## Triggers

The `public.users` table holds additional information about the user, such
as their name and API key. This table needs to be kept in sync with  the `auth`
table (which is what Supabase Auth uses).

To to this we use the set of
[Postgres triggers](https://supabase.com/docs/guides/database/postgres/triggers)
presented below. If setting up a new database this logic should be migrated
(can be copy and pasted into the SQL Editor via the Supabase UI).

```txt
-- inserts a row into public.users
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (user_guid, email, created_at, api_key)
  values (new.id::uuid, new.email, new.created_at, md5(random()::text));
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();


-- update a row in public.users when the email is updated
create or replace function public.handle_updated_auth_user()
returns trigger as $$
begin
  update public.users
  set email = new.email
  where user_guid = new.id::uuid;
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is updated
drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_updated_auth_user();


-- delete a row from public.users when the user is deleted
create or replace function public.handle_deleted_auth_user()
returns trigger as $$
begin
  delete from public.users where user_guid = old.id::uuid;
  return old;
end;
$$ language plpgsql security definer;

-- trigger the function every time an auth user is deleted
drop trigger if exists on_auth_user_deleted on auth.users;
create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_deleted_auth_user();

-- deleted auth user when public.users is deleted
create or replace function public.handle_deleted_user()
returns trigger as $$
begin
  delete from auth.users
  where id = old.user_guid::uuid;
  return old;
end;
$$ language plpgsql security definer;

-- trigger the function every time a public user is deleted
drop trigger if exists on_user_deleted on public.users;
create trigger on_user_deleted
  after delete on public.users
  for each row execute procedure public.handle_deleted_user();
```
