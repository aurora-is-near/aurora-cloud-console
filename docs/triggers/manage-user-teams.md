# Manage user teams

A dump of the Supabase trigger for managing user teams.

```sql
-- Shared function to update a user's teams
create or replace function public.update_user_metadata(user_id_param bigint)
returns void as $$
declare
  team_keys_agg jsonb;
begin
  -- Aggregate team_key values into a variable
  select jsonb_agg(t.team_key) into team_keys_agg
  from public.teams t
  inner join public.users_teams ut ON t.id = ut.team_id
  where ut.user_id = user_id_param;

  update auth.users u
  set raw_user_meta_data = (
    select COALESCE(
      jsonb_set(
        COALESCE(u.raw_user_meta_data, '{}'::jsonb),
        '{teams}',
        COALESCE(u.raw_user_meta_data->'teams', '[]'::jsonb) || team_keys_agg
      ),
      '{}'::jsonb
    )
  )
  where u.id = (select user_id from public.users where id = user_id_param);
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


-- Update all relevant user teams on team_key change
create or replace function public.update_users_teams_on_team_key_change()
returns trigger as $$
declare
  user_id bigint;
begin
  for user_id in (
    select ut.user_id
    from users_teams ut
    where ut.team_id = new.id
  )
  loop
    perform public.update_user_metadata(user_id);
  end loop;
  return new;
end;
$$ language plpgsql security definer;

-- trigger to execute the function on team_key changes
drop trigger if exists on_team_key_change_update_users_teams on teams;
create trigger on_team_key_change_update_users_teams
  after update of team_key on teams
  for each row execute procedure public.update_users_teams_on_team_key_change();
```
