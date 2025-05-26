const SQL_QUERY_GET_SILOS_FOR_GAS_SWAP_RELAYER = `
  CREATE OR REPLACE FUNCTION get_silos_for_gas_swap_relayer(boundary TIMESTAMP)
  RETURNS SETOF silos AS $$
  BEGIN
    RETURN QUERY
      SELECT s.*
      FROM silos AS s

      LEFT JOIN silo_gas_swaps AS tx
        ON tx.silo_id = s.id
        AND tx.variant = 'TO_RELAYER'
        AND tx.created_at >= boundary

      GROUP BY s.id
      HAVING
        COUNT(tx.*) = 0
        OR BOOL_OR(tx.status = 'FAILED');
  END;
  $$ LANGUAGE plpgsql;
`

const SQL_QUERY_GET_SILOS_FOR_GAS_BURN = `
  CREATE OR REPLACE FUNCTION get_silos_for_gas_burn(boundary TIMESTAMP)
  RETURNS SETOF silos AS $$
  BEGIN
    RETURN QUERY
      SELECT s.*
      FROM silos AS s

      LEFT JOIN silo_gas_swaps AS to_relayer
        ON to_relayer.silo_id = s.id
        AND to_relayer.variant = 'TO_RELAYER'
        AND to_relayer.created_at >= boundary
        AND to_relayer.status = 'SUCCEED'

      LEFT JOIN silo_gas_swaps AS to_burn
        ON to_burn.silo_id = s.id
        AND to_burn.variant = 'BURN'
        AND to_burn.created_at >= boundary

      WHERE s.gas_burn_percent IS NOT NULL
        AND s.gas_burn_percent > 0
        AND s.gas_burn_percent < 100

      GROUP BY s.id
      HAVING
        COUNT(to_relayer.*) = 1
        AND (
          COUNT(to_burn.*) = 0
          OR BOOL_AND(to_burn.status = 'FAILED')
        );
  END;
  $$ LANGUAGE plpgsql;
`

const SQL_QUERY_GET_SILOS_TO_CHECK_SWAP_STATUS = `
  CREATE OR REPLACE FUNCTION get_silos_to_get_swap_status(boundary TIMESTAMP)
  RETURNS SETOF silos AS $$
  BEGIN
    RETURN QUERY
      SELECT s.*
      FROM silos AS s

      LEFT JOIN silo_gas_swaps AS tx
        ON tx.silo_id = s.id
        AND tx.created_at >= boundary
        AND (tx.status = 'PENDING' OR tx.status = 'INITIATED')

      GROUP BY s.id;
  END;
  $$ LANGUAGE plpgsql;
`
