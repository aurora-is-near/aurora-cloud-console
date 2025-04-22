# Watch for changes

A dump of the Supabase trigger for watching for changes.

```sql
-- Drop existing log_*_change triggers
DO $$
DECLARE
  trig RECORD;
BEGIN
  FOR trig IN
    SELECT
      tg.tgname AS trigger_name,
      cls.relname AS table_name,
      nsp.nspname AS schema_name
    FROM pg_trigger tg
    JOIN pg_class cls ON tg.tgrelid = cls.oid
    JOIN pg_namespace nsp ON cls.relnamespace = nsp.oid
    WHERE tg.tgname LIKE 'log\_%\_change'
      AND NOT tg.tgisinternal
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS %I ON %I.%I;',
      trig.trigger_name,
      trig.schema_name,
      trig.table_name
    );
  END LOOP;
END;
$$;

-- (Re)Create log_change function
CREATE OR REPLACE FUNCTION log_change()
RETURNS TRIGGER AS $$
DECLARE
  affected_id BIGINT;
BEGIN
  -- Check if the table has an 'id' column
  PERFORM column_name
  FROM information_schema.columns
  WHERE table_name = TG_TABLE_NAME AND column_name = 'id' LIMIT 1;

  -- If no 'id' column exists, exit the function
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Determine affected row ID based on operation
  IF TG_OP = 'DELETE' THEN
    affected_id := OLD.id;
  ELSE
    affected_id := NEW.id;
  END IF;

  -- Insert change record
  INSERT INTO public.deal_changes (operation, table_name, row_id, created_at)
  VALUES (TG_OP::public.database_operation, TG_TABLE_NAME, affected_id, now());

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create new triggers on selected tables
DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[  -- the tables to watch for changes
    'deals',
    'limits',
    'rule_user_deal_data',
    'rule_users',
    'rule_users_userlists',
    'rules',
    'rules_userlists',
    'silos',
    'userlists'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS log_%I_change ON %I;
       CREATE TRIGGER log_%I_change
       AFTER INSERT OR UPDATE OR DELETE ON %I
       FOR EACH ROW
       EXECUTE FUNCTION log_change();',
       tbl, tbl, tbl, tbl
    );
  END LOOP;
END;
$$;
```
