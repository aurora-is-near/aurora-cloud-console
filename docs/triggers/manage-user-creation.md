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
begin
  -- Insert a row into public.users
  insert into public.users (user_id, email, created_at)
  values (new.id::uuid, new.email, new.created_at);

  -- Retrieve user_id from public.users where user_id matches new.id::uuid
  select id into new_user_id
  from public.users
  where user_id = new.id::uuid;

  -- Set the user's initial team
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

  -- Set the user's initial name
  if public.has_metadata_key(new.raw_user_meta_data, 'name') then
    update public.users
    set name = (new.raw_user_meta_data->>'name')::text
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
