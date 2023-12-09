# Manage user creation

A dump of the Supabase trigger for managing user creation.

```text
-- inserts a row into public.users
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (user_id, email, created_at)
  values (new.id::uuid, new.email, new.created_at);
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
  where user_id = new.id::uuid;
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
