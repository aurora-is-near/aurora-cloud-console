# Manage user creation

A dump of the Supabase trigger for managing user creation.

```text
-- Check if a key exists in the given metadata object
create or replace function public.has_metadata_key(metadata jsonb, key text)
returns boolean as $$
begin
  return metadata is not null and exists (
    select 1 from jsonb_object_keys(metadata) as k where k = key
  );
end;
$$ language plpgsql security definer;

-- Handle new auth user creation
create or replace function public.handle_new_auth_user()
returns trigger as $$
declare
  new_user_id bigint;
  new_team_id bigint;
  new_team_key text;
  sanitized_slug text;
begin
  -- Insert a row into public.users
  insert into public.users (user_id, email, created_at)
  values (new.id::uuid, new.email, new.created_at);

  -- Retrieve user_id from public.users where user_id matches new.id::uuid
  select id into new_user_id
  from public.users
  where user_id = new.id::uuid;

  -- Set the user's initial team
  -- For the case where the user was invited to a specific team
  if public.has_metadata_key(new.raw_user_meta_data, 'new_team') then
    -- Retrieve team_id from teams where team_key matches new_team value from metadata
    select id into new_team_id
    from public.teams
    where team_key = (new.raw_user_meta_data->>'new_team');

    if new_team_id is null then
      raise exception 'new_team_id is null. Cannot proceed with user_team insertion.';
    else
      -- Insert into users_teams using the team_id extracted from the metadata
      insert into public.users_teams (user_id, team_id)
      values (new_user_id, new_team_id);
    end if;
  end if;

  -- Create a team for the user
  -- For the case where they signed up via a form
  if public.has_metadata_key(new.raw_user_meta_data, 'company') then

    -- Generate a sanitized slug from the company name
    select lower(
      regexp_replace(

        -- Replace spaces with hyphens
        regexp_replace(new.raw_user_meta_data->>'company', '\s+', '-', 'g'),

        -- Remove all non-alphanumeric characters except hyphens
        '[^a-z0-9-]', '', 'g'
      )
    ) into sanitized_slug;

    -- Start with the sanitized slug
    new_team_key := sanitized_slug;

    -- If the base team_key already exists append an MD5 hash to ensure uniqueness
    if exists(select 1 from public.teams where team_key = new_team_key) then
      new_team_key := sanitized_slug || '-' || substr(md5(random()::text), 1, 10);
    end if;

    -- Insert a new team for the user
    insert into public.teams (name, team_key, created_at)
    values (
      new.raw_user_meta_data->>'company',
      new_team_key,
      new.created_at
    )

    -- Store the newly created team_id
    returning id into new_team_id;

    -- Insert into users_teams linking the user to the newly created team
    insert into public.users_teams (user_id, team_id)
    values (new_user_id, new_team_id);
  end if;

  -- Set the user's initial name
  if public.has_metadata_key(new.raw_user_meta_data, 'name') then
    update public.users
    set name = (new.raw_user_meta_data->>'name')::text
    where id = new_user_id;
  end if;

  -- Set the user's initial marketing consent flag
  if public.has_metadata_key(new.raw_user_meta_data, 'marketing_consent') then
    update public.users
    set marketing_consent = (new.raw_user_meta_data->>'marketing_consent')::bool
    where id = new_user_id;
  end if;

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
declare
  updated_user_id bigint;
begin
  -- Get the public user ID linked to the auth user GUID
  select id into updated_user_id
  from public.users
  where user_id = new.id::uuid;

  -- Update the users table
  update public.users
  set email = new.email
  where id = updated_user_id;

  -- Update the users_teams table
  update public.users_teams
  set confirmed_at = new.confirmed_at
  where user_id = updated_user_id;

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
  delete from public.users where user_id = old.id::uuid;
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
  where id = old.user_id::uuid;
  return old;
end;
$$ language plpgsql security definer;

-- trigger the function every time a public user is deleted
drop trigger if exists on_user_deleted on public.users;
create trigger on_user_deleted
  after delete on public.users
  for each row execute procedure public.handle_deleted_user();
```
