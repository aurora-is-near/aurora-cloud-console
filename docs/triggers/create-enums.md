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

SELECT add_values_to_enum(
  'api_key_scopes',
  ARRAY[
    'deals:read',
    'deals:write',
    'silos:read',
    'silos:write',
    'users:read',
    'users:write',
    'lists:read',
    'lists:write',
    'transactions:read',
    'forwarder:read',
    'forwarder:write',
    'payments:read',
    'payments:write',
    'assets:write',
  ]
);

SELECT add_values_to_enum(
  'widget_network_type',
  ARRAY[
    'AURORA',
    'NEAR',
    'ETHEREUM',
    'CUSTOM'
  ]
);

SELECT add_values_to_enum(
  'deployment_status',
  ARRAY[
    'NOT_DEPLOYED',
    'PENDING',
    'DEPLOYED'
  ]
);

SELECT add_values_to_enum(
  'payment_status',
  ARRAY[
    'paid',
    'unpaid',
    'no_payment_required'
  ]
);

SELECT add_values_to_enum(
  'order_type',
  ARRAY[
    'initial_setup',
    'top_up',
  ]
);

SELECT add_values_to_enum(
  'base_token_symbol',
  ARRAY[
    'AURORA',
    'BTC',
    'ETH',
    'USDC',
    'USDT',
    'NEAR',
    'CUSTOM'
  ]
);

SELECT add_values_to_enum(
  'silo_config_transaction_operation',
  ARRAY[
    'SET_BASE_TOKEN',
    'DEPLOY_AURORA',
    'DEPLOY_USDT',
    'DEPLOY_USDC',
    'DEPLOY_NEAR',
    'DEPLOY_ETH'
  ]
);

SELECT add_values_to_enum(
  'silo_config_transaction_status',
  ARRAY[
    'PENDING',
    'SUCCESSFUL',
    'FAILED'
  ]
);

SELECT add_values_to_enum(
  'database_operation',
  ARRAY[
    'INSERT',
    'UPDATE',
    'DELETE'
  ]
);
```
