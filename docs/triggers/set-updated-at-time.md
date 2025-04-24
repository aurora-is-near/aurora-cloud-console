# Set updated at time

A dump of the Supabase trigger for populating the updated at columns.

```sql
do $$
declare
  tbl record;
  new_trigger_name text;
  existing_trigger record;
begin
  -- Step 1: Drop triggers from tables that no longer have updated_at
  for existing_trigger in
    select event_object_table as table_name, trigger_name
    from information_schema.triggers
    where trigger_schema = 'public'
      and trigger_name like 'set\_%\_updated_at'
  loop
    -- Check if this table still has an updated_at column
    if not exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = existing_trigger.table_name
        and column_name = 'updated_at'
    ) then
      execute format(
        'drop trigger if exists %I on public.%I;',
        existing_trigger.trigger_name,
        existing_trigger.table_name
      );
    end if;
  end loop;

  -- Step 2: Add triggers to tables that have updated_at
  for tbl in
    select table_name
    from information_schema.columns
    where column_name = 'updated_at'
      and table_schema = 'public'
    group by table_name
  loop
    new_trigger_name := 'set_' || tbl.table_name || '_updated_at';

    -- Drop existing one just in case
    execute format('drop trigger if exists %I on public.%I;', new_trigger_name, tbl.table_name);

    -- Create trigger
    execute format($f$
      create trigger %I
      before update on public.%I
      for each row
      execute procedure public.update_modified_column();
    $f$, new_trigger_name, tbl.table_name);
  end loop;
end
$$ language plpgsql;
```
