# Watch for changes

A dump of the Supabase trigger for watching for changes.

```sql
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
