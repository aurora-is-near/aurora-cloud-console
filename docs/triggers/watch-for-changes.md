# Watch for changes

A dump of the Supabase trigger for watching for changes.

```sql
CREATE OR REPLACE FUNCTION log_change()
RETURNS TRIGGER AS $$
DECLARE
  affected_id BIGINT;
BEGIN
  -- Determine affected row ID based on operation
  IF TG_OP = 'DELETE' THEN
    affected_id := OLD.id;
  ELSE
    affected_id := NEW.id;
  END IF;

  -- Insert change record
  INSERT INTO latest_changes (operation, table_name, row_id, created_at)
  VALUES (TG_OP, TG_TABLE_NAME, affected_id, now());

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
  excluded_tables TEXT[] := ARRAY[
    'changes',
    'datadog_web3_monitors',
    'replenishments',
    'silo_relayers'
  ];
BEGIN
  FOR tbl IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename <> ALL (excluded_tables)
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
$$ LANGUAGE plpgsql;
```
