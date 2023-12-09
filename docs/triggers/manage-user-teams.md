# Manage user teams

A dump of the Supabase trigger for managing user teams.

```text
-- Shared function to update a user's teams
create or replace function public.update_user_metadata(user_id_param bigint)
returns void as $$
begin
  update auth.users u
  set raw_user_meta_data = raw_user_meta_data || jsonb_build_object('teams', (
    select json_agg(t.team_key)
    from teams t
    inner join users_teams ON t.id = users_teams.team_id
    where users_teams.user_id = user_id_param
  ))
  where u.id = (select user_id from users where id = user_id_param);
end;
$$ language plpgsql security definer;

-- Update a user's teams when a row is inserted
create or replace function public.handle_updated_users_teams()
returns trigger as $$
begin
  perform public.update_user_metadata(new.user_id);
  return new;
end;
$$ language plpgsql security definer;

-- Update a user's teams when a row is removed
create or replace function public.handle_deleted_users_teams()
returns trigger as $$
begin
  perform public.update_user_metadata(old.user_id);
  return old;
end;
$$ language plpgsql security definer;

-- trigger the function every time a public.users_teams row is inserted
drop trigger if exists on_users_teams_updated on public.users_teams;
create trigger on_users_teams_updated
  after insert on public.users_teams
  for each row execute procedure public.handle_updated_users_teams();

-- trigger the function every time public.users_teams row is deleted
drop trigger if exists on_users_teams_deleted on public.users_teams;
create trigger on_users_teams_deleted
  after delete on public.users_teams
  for each row execute procedure public.handle_deleted_users_teams();
```
