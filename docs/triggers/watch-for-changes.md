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
  i INT;
  column_changed BOOLEAN := FALSE;
BEGIN
  -- For UPDATE queries, check if any of the watched columns have changed
  IF TG_OP = 'UPDATE' THEN
     IF TG_NARGS > 0 THEN
      FOR i IN 0..TG_NARGS - 1 LOOP
        EXECUTE format('SELECT ($1).%I IS DISTINCT FROM ($2).%I', TG_ARGV[i], TG_ARGV[i])
        INTO column_changed
        USING OLD, NEW;

        IF column_changed THEN
          EXIT; -- If a column changed, exit the loop
        END IF;
      END LOOP;

      -- If no changes in any specified column, return NULL (don't log)
      IF NOT column_changed THEN
        RETURN NULL;
      END IF;
    END IF;
  END IF;

  -- Determine affected row ID
  IF TG_OP = 'DELETE' THEN
    affected_id := OLD.id;
  ELSE
    affected_id := NEW.id;
  END IF;

  -- Insert audit record
  INSERT INTO public.deal_changes (operation, table_name, row_id, created_at)
  VALUES (TG_OP::public.database_operation, TG_TABLE_NAME, affected_id, now());

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create new triggers on selected tables
DO $$
DECLARE
  tbl RECORD;
  trigger_sql TEXT;
  trigger_args TEXT := '';
BEGIN
  -- Loop through table names and respective columns to monitor
  FOR tbl IN
    VALUES
      ('deals', NULL::TEXT[]),                 -- table_name, columns_to_monitor (NULL for all)
      ('limits', NULL::TEXT[]),
      ('rule_user_deal_data', NULL::TEXT[]),
      ('rule_users', NULL::TEXT[]),
      ('rule_users_userlists', NULL::TEXT[]),
      ('rules', NULL::TEXT[]),
      ('rules_userlists', NULL::TEXT[]),
      ('silos', ARRAY['name', 'applieddealids', 'gasprice']),
      ('userlists', NULL::TEXT[])
  LOOP
    -- Prepare trigger arguments if any columns are specified for the table
    trigger_args := CASE
      WHEN tbl.column2 IS NOT NULL THEN
        '(' || array_to_string(ARRAY(SELECT quote_literal(x) FROM unnest(tbl.column2) AS x), ', ') || ')'
      ELSE
        '()'  -- No columns to track, so pass an empty string
    END;

    -- Dynamically generate the SQL to create the trigger
    -- If trigger_args is not empty, it will be included, otherwise, it is excluded
    EXECUTE format(
      'DROP TRIGGER IF EXISTS log_%I_change ON %I;
       CREATE TRIGGER log_%I_change
       AFTER INSERT OR UPDATE OR DELETE ON %I
       FOR EACH ROW
       EXECUTE FUNCTION log_change%s;',
      tbl.column1, tbl.column1, tbl.column1, tbl.column1,
      CASE WHEN trigger_args <> '' THEN trigger_args ELSE '' END
    );
  END LOOP;
END;
$$;
```
