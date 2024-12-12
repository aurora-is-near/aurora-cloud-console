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

-- trigger to execute the function on update of widgets table
drop trigger if exists set_widgets_updated_at on widgets;
create trigger set_widgets_updated_at
  before update on widgets
  for each row execute procedure public.update_modified_column();

-- trigger to execute the function on update of blockscout_databases table
drop trigger if exists set_blockscout_databases_updated_at on blockscout_databases;
create trigger set_blockscout_databases_updated_at
  before update on blockscout_databases
  for each row execute procedure public.update_modified_column();
```
