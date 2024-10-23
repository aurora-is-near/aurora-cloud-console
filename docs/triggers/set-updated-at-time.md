# Set updated at time

A dump of the Supabase trigger for populating the updated at columns.

```sql
create or replace function public.update_modified_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
END;
$$ language plpgsql security definer;

-- trigger to execute the function on update of deals table
drop trigger if exists set_deals_updated_at on deals;
create trigger set_deals_updated_at
  before update on deals
  for each row execute procedure public.update_modified_column();

-- trigger to execute the function on update of silos table
drop trigger if exists set_silos_updated_at on silos;
create trigger set_silos_updated_at
  before update on silos
  for each row execute procedure public.update_modified_column();

-- trigger to execute the function on update of teams table
drop trigger if exists set_teams_updated_at on teams;
create trigger set_teams_updated_at
  before update on teams
  for each row execute procedure public.update_modified_column();

-- trigger to execute the function on update of oracles table
drop trigger if exists set_oracles_updated_at on oracles;
create trigger set_oracles_updated_at
  before update on oracles
  for each row execute procedure public.update_modified_column();

-- trigger to execute the function on update of bridges table
drop trigger if exists set_bridges_updated_at on bridges;
create trigger set_bridges_updated_at
  before update on bridges
  for each row execute procedure public.update_modified_column();
```
