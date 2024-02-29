import { TransactionDatabaseType } from "@/types/types"
import { PoolConfig } from "pg"

export const TRANSACTION_DATABASES: Record<
  TransactionDatabaseType,
  { name: string; config: PoolConfig }
> = {
  SILO: {
    name: "Silo Transaction Database",
    config: {
      database: "aurora_transaction_database",
      host: "65.108.120.211",
      port: 5437,
      user: "silos_tx_db",
      password: process.env.SILO_TRANSACTION_DATABASE_PASSWORD,
    },
  },
  AURORA: {
    name: "Aurora Transaction Database",
    config: {
      database: "aurora_transaction_database",
      host: "65.21.192.70",
      port: 1893,
      user: "txtest",
      password: process.env.AURORA_TRANSACTION_DATABASE_PASSWORD,
    },
  },
  AURORA_DEMO: {
    name: "Aurora Transaction Demo Database",
    config: {
      database: "aurora_transaction_database_seed",
      host: "65.21.192.70",
      port: 1893,
      user: "txtest",
      password: process.env.AURORA_TRANSACTION_DATABASE_PASSWORD,
    },
  },
}
