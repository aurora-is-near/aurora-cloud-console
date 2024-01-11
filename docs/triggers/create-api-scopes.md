# Create API scopes

A dump of the Supabase trigger for managing API scopes.

```text
-- Create type if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'api_key_scopes') THEN
    CREATE TYPE api_key_scopes AS ENUM ();
  END IF;
END$$;

-- Add the scopes
DO $$
DECLARE
  scope_name text;
  scopes_to_add text[] := ARRAY[
    'deals:read',
    'deals:write',
    'silos:read',
    'users:read',
    'users:write',
    'transactions:read'
  ];
BEGIN
  -- Loop through the list of scopes and add them if they do not already exist
  FOR scope_name IN SELECT unnest(scopes_to_add)
  LOOP
    RAISE NOTICE 'Adding scope: %', scope_name; -- Debug statement
    IF scope_name NOT IN (SELECT enumlabel FROM pg_enum WHERE enumtypid = 'api_key_scopes'::regtype) THEN
      EXECUTE 'ALTER TYPE api_key_scopes ADD VALUE ' || quote_literal(scope_name);
    END IF;
  END LOOP;
END$$;
```
