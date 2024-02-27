# Create enums

A dump of the Supabase trigger for managing enums.

```text
CREATE OR REPLACE FUNCTION add_values_to_enum(enum_name text, enum_values text[]) RETURNS VOID AS $$
DECLARE
  value text;
BEGIN
  -- Create the enum type if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = enum_name) THEN
    EXECUTE format('CREATE TYPE %I AS ENUM ()', enum_name);
  END IF;

  -- Loop through the list of values and add them if they do not already exist
  FOREACH value IN ARRAY enum_values
  LOOP
    RAISE NOTICE 'Adding value: % to enum: %', value, enum_name; -- Debug statement
    IF value NOT IN (SELECT enumlabel FROM pg_enum WHERE enumtypid = enum_name::regtype) THEN
      EXECUTE format('ALTER TYPE %I ADD VALUE %L', enum_name, value);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Use the function to add values to 'api_key_scopes'
SELECT add_values_to_enum(
  'api_key_scopes',
  ARRAY[
    'deals:read',
    'deals:write',
    'silos:read',
    'users:read',
    'users:write',
    'lists:read',
    'lists:write',
    'transactions:read'
  ]
);

-- Use the function to add values to 'token_type'
SELECT add_values_to_enum(
  'token_type',
  ARRAY[
    'ERC20',
    'ERC721',
    'ERC1155'
  ]
);
```
