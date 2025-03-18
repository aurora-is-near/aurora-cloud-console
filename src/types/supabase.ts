export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          id: number
          key: string
          last_used_at: string | null
          note: string | null
          scopes: Database["public"]["Enums"]["api_key_scopes"][]
          team_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string
          last_used_at?: string | null
          note?: string | null
          scopes: Database["public"]["Enums"]["api_key_scopes"][]
          team_id: number
        }
        Update: {
          created_at?: string
          id?: number
          key?: string
          last_used_at?: string | null
          note?: string | null
          scopes?: Database["public"]["Enums"]["api_key_scopes"][]
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_api_keys_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      blockscout_databases: {
        Row: {
          created_at: string
          database: string
          host: string
          id: number
          name: string
          password: string
          port: number
          updated_at: string
          user: string
        }
        Insert: {
          created_at?: string
          database: string
          host: string
          id?: number
          name: string
          password: string
          port: number
          updated_at?: string
          user: string
        }
        Update: {
          created_at?: string
          database?: string
          host?: string
          id?: number
          name?: string
          password?: string
          port?: number
          updated_at?: string
          user?: string
        }
        Relationships: []
      }
      bridged_token_requests: {
        Row: {
          address: string
          created_at: string
          id: number
          resolved_at: string | null
          silo_id: number
          symbol: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: number
          resolved_at?: string | null
          silo_id: number
          symbol: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: number
          resolved_at?: string | null
          silo_id?: number
          symbol?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridged_token_requests_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
      }
      bridged_tokens: {
        Row: {
          aurora_address: string | null
          created_at: string
          decimals: number
          ethereum_address: string | null
          icon_url: string | null
          id: number
          name: string
          near_address: string | null
          symbol: string
        }
        Insert: {
          aurora_address?: string | null
          created_at?: string
          decimals: number
          ethereum_address?: string | null
          icon_url?: string | null
          id?: number
          name: string
          near_address?: string | null
          symbol: string
        }
        Update: {
          aurora_address?: string | null
          created_at?: string
          decimals?: number
          ethereum_address?: string | null
          icon_url?: string | null
          id?: number
          name?: string
          near_address?: string | null
          symbol?: string
        }
        Relationships: []
      }
      datadog_web3_monitors: {
        Row: {
          created_at: string | null
          datadog_id: number | null
          engine_account: string | null
          id: number
          key: string
          name: string
          need_remove: boolean | null
          need_update: boolean | null
          removed: boolean | null
          silo_chain_id: number | null
          silo_name: string | null
          silo_rpc_url: string | null
          template_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          datadog_id?: number | null
          engine_account?: string | null
          id?: number
          key: string
          name: string
          need_remove?: boolean | null
          need_update?: boolean | null
          removed?: boolean | null
          silo_chain_id?: number | null
          silo_name?: string | null
          silo_rpc_url?: string | null
          template_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          datadog_id?: number | null
          engine_account?: string | null
          id?: number
          key?: string
          name?: string
          need_remove?: boolean | null
          need_update?: boolean | null
          removed?: boolean | null
          silo_chain_id?: number | null
          silo_name?: string | null
          silo_rpc_url?: string | null
          template_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      deals: {
        Row: {
          created_at: string
          deleted_at: string | null
          demo_key: string | null
          enabled: boolean
          end_time: string | null
          id: number
          name: string
          open: boolean
          silo_id: number | null
          start_time: string | null
          team_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          demo_key?: string | null
          enabled?: boolean
          end_time?: string | null
          id?: number
          name: string
          open?: boolean
          silo_id?: number | null
          start_time?: string | null
          team_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          demo_key?: string | null
          enabled?: boolean
          end_time?: string | null
          id?: number
          name?: string
          open?: boolean
          silo_id?: number | null
          start_time?: string | null
          team_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      limits: {
        Row: {
          created_at: string
          deal_id: number
          deleted_at: string | null
          duration: string
          id: number
          limit_scope: Database["public"]["Enums"]["limit_scope"]
          limit_type: Database["public"]["Enums"]["limit_type"]
          limit_value: number
          ui_enabled: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          deal_id: number
          deleted_at?: string | null
          duration: string
          id?: number
          limit_scope: Database["public"]["Enums"]["limit_scope"]
          limit_type: Database["public"]["Enums"]["limit_type"]
          limit_value?: number
          ui_enabled?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          deal_id?: number
          deleted_at?: string | null
          duration?: string
          id?: number
          limit_scope?: Database["public"]["Enums"]["limit_scope"]
          limit_type?: Database["public"]["Enums"]["limit_type"]
          limit_value?: number
          ui_enabled?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "limits_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_form: {
        Row: {
          baseToken: Database["public"]["Enums"]["base_token_symbol"]
          chainName: string | null
          chainPermission:
            | Database["public"]["Enums"]["chain_permission"]
            | null
          comments: string | null
          created_at: string
          customTokenDetails: string | null
          gasMechanics: Database["public"]["Enums"]["gas_mechanics"] | null
          id: number
          integrations: Database["public"]["Enums"]["user_integration"][] | null
          networkType: Database["public"]["Enums"]["network_type"] | null
          team_id: number | null
          telegramHandle: string | null
        }
        Insert: {
          baseToken: Database["public"]["Enums"]["base_token_symbol"]
          chainName?: string | null
          chainPermission?:
            | Database["public"]["Enums"]["chain_permission"]
            | null
          comments?: string | null
          created_at?: string
          customTokenDetails?: string | null
          gasMechanics?: Database["public"]["Enums"]["gas_mechanics"] | null
          id?: number
          integrations?:
            | Database["public"]["Enums"]["user_integration"][]
            | null
          networkType?: Database["public"]["Enums"]["network_type"] | null
          team_id?: number | null
          telegramHandle?: string | null
        }
        Update: {
          baseToken?: Database["public"]["Enums"]["base_token_symbol"]
          chainName?: string | null
          chainPermission?:
            | Database["public"]["Enums"]["chain_permission"]
            | null
          comments?: string | null
          created_at?: string
          customTokenDetails?: string | null
          gasMechanics?: Database["public"]["Enums"]["gas_mechanics"] | null
          id?: number
          integrations?:
            | Database["public"]["Enums"]["user_integration"][]
            | null
          networkType?: Database["public"]["Enums"]["network_type"] | null
          team_id?: number | null
          telegramHandle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_form_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      oracles: {
        Row: {
          created_at: string
          id: number
          silo_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          silo_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          silo_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_oracles_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: number
          number_of_transactions: number | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          session_id: string
          team_id: number
          type: Database["public"]["Enums"]["order_type"]
        }
        Insert: {
          created_at?: string
          id?: number
          number_of_transactions?: number | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          session_id: string
          team_id: number
          type: Database["public"]["Enums"]["order_type"]
        }
        Update: {
          created_at?: string
          id?: number
          number_of_transactions?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          session_id?: string
          team_id?: number
          type?: Database["public"]["Enums"]["order_type"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      replenishments: {
        Row: {
          account_id: string
          amount: number
          error_message: string | null
          id: number
          inserted_at: string
          near_transaction_hash: string | null
          status: string
        }
        Insert: {
          account_id: string
          amount: number
          error_message?: string | null
          id?: number
          inserted_at?: string
          near_transaction_hash?: string | null
          status: string
        }
        Update: {
          account_id?: string
          amount?: number
          error_message?: string | null
          id?: number
          inserted_at?: string
          near_transaction_hash?: string | null
          status?: string
        }
        Relationships: []
      }
      rule_user_deal_data: {
        Row: {
          created_at: string
          deal_id: number | null
          deleted_at: string | null
          id: number
          prepaid_txs: number
          rule_user_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deal_id?: number | null
          deleted_at?: string | null
          id?: number
          prepaid_txs?: number
          rule_user_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deal_id?: number | null
          deleted_at?: string | null
          id?: number
          prepaid_txs?: number
          rule_user_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_deal_data_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_deal_data_role_user_id_fkey"
            columns: ["rule_user_id"]
            isOneToOne: false
            referencedRelation: "rule_users"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_users: {
        Row: {
          created_at: string
          deleted_at: string | null
          eoas: string[] | null
          id: number
          ips: string[] | null
          team_id: number | null
          tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          eoas?: string[] | null
          id?: number
          ips?: string[] | null
          team_id?: number | null
          tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          eoas?: string[] | null
          id?: number
          ips?: string[] | null
          team_id?: number | null
          tokens?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rule_users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_users_userlists: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          rule_user_id: number | null
          updated_at: string
          userlist_id: number | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          rule_user_id?: number | null
          updated_at?: string
          userlist_id?: number | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          rule_user_id?: number | null
          updated_at?: string
          userlist_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "role_users_userlists_role_user_id_fkey"
            columns: ["rule_user_id"]
            isOneToOne: false
            referencedRelation: "rule_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rule_users_userlists_userlist_id_fkey"
            columns: ["userlist_id"]
            isOneToOne: false
            referencedRelation: "userlists"
            referencedColumns: ["id"]
          },
        ]
      }
      rules: {
        Row: {
          chains: number[]
          contracts: string[]
          created_at: string
          deal_id: number
          deleted_at: string | null
          except_chains: number[]
          except_contracts: string[]
          id: number
          ui_enabled: boolean
          updated_at: string
        }
        Insert: {
          chains: number[]
          contracts: string[]
          created_at?: string
          deal_id: number
          deleted_at?: string | null
          except_chains: number[]
          except_contracts: string[]
          id?: number
          ui_enabled?: boolean
          updated_at?: string
        }
        Update: {
          chains?: number[]
          contracts?: string[]
          created_at?: string
          deal_id?: number
          deleted_at?: string | null
          except_chains?: number[]
          except_contracts?: string[]
          id?: number
          ui_enabled?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rules_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      rules_userlists: {
        Row: {
          blacklist: boolean
          created_at: string
          deleted_at: string | null
          id: number
          rule_id: number | null
          updated_at: string
          userlist_id: number | null
        }
        Insert: {
          blacklist?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: number
          rule_id?: number | null
          updated_at?: string
          userlist_id?: number | null
        }
        Update: {
          blacklist?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: number
          rule_id?: number | null
          updated_at?: string
          userlist_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rules_userlists_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rules_userlists_userlist_id_fkey"
            columns: ["userlist_id"]
            isOneToOne: false
            referencedRelation: "userlists"
            referencedColumns: ["id"]
          },
        ]
      }
      silo_bridged_tokens: {
        Row: {
          bridged_token_id: number
          is_deployment_pending: boolean
          silo_id: number
        }
        Insert: {
          bridged_token_id: number
          is_deployment_pending?: boolean
          silo_id?: number
        }
        Update: {
          bridged_token_id?: number
          is_deployment_pending?: boolean
          silo_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "silo_bridged_tokens_bridged_token_id_fkey"
            columns: ["bridged_token_id"]
            isOneToOne: false
            referencedRelation: "bridged_tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silo_bridged_tokens_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
      }
      silo_config_transactions: {
        Row: {
          created_at: string
          id: number
          operation:
            | Database["public"]["Enums"]["silo_config_transaction_operation"]
            | null
          silo_id: number
          status: Database["public"]["Enums"]["silo_config_transaction_status"]
          transaction_hash: string
        }
        Insert: {
          created_at?: string
          id?: number
          operation?:
            | Database["public"]["Enums"]["silo_config_transaction_operation"]
            | null
          silo_id: number
          status?: Database["public"]["Enums"]["silo_config_transaction_status"]
          transaction_hash: string
        }
        Update: {
          created_at?: string
          id?: number
          operation?:
            | Database["public"]["Enums"]["silo_config_transaction_operation"]
            | null
          silo_id?: number
          status?: Database["public"]["Enums"]["silo_config_transaction_status"]
          transaction_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "silo_config_transactions_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
      }
      silo_relayers: {
        Row: {
          account_id: string
          id: number
          inserted_at: string
          replenish_amount: number
          replenish_threshold: number
          type: Database["public"]["Enums"]["account_type"]
          updated_at: string
        }
        Insert: {
          account_id: string
          id?: number
          inserted_at?: string
          replenish_amount: number
          replenish_threshold: number
          type?: Database["public"]["Enums"]["account_type"]
          updated_at?: string
        }
        Update: {
          account_id?: string
          id?: number
          inserted_at?: string
          replenish_amount?: number
          replenish_threshold?: number
          type?: Database["public"]["Enums"]["account_type"]
          updated_at?: string
        }
        Relationships: []
      }
      silo_whitelist_addresses: {
        Row: {
          add_tx_id: number | null
          address: string
          id: number
          is_applied: boolean
          list: Database["public"]["Enums"]["address_whitelist_type"]
          remove_tx_id: number | null
          silo_id: number
        }
        Insert: {
          add_tx_id?: number | null
          address: string
          id?: number
          is_applied?: boolean
          list: Database["public"]["Enums"]["address_whitelist_type"]
          remove_tx_id?: number | null
          silo_id: number
        }
        Update: {
          add_tx_id?: number | null
          address?: string
          id?: number
          is_applied?: boolean
          list?: Database["public"]["Enums"]["address_whitelist_type"]
          remove_tx_id?: number | null
          silo_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "silo_addresses_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silo_whitelist_addresses_add_tx_id_fkey"
            columns: ["add_tx_id"]
            isOneToOne: false
            referencedRelation: "silo_config_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silo_whitelist_addresses_remove_tx_id_fkey"
            columns: ["remove_tx_id"]
            isOneToOne: false
            referencedRelation: "silo_config_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      silos: {
        Row: {
          applied_deal_ids: number[]
          base_token_decimals: number
          base_token_name: string
          base_token_symbol: string
          blockscout_database_id: number | null
          chain_id: number
          created_at: string
          deleted_at: string | null
          engine_account: string
          engine_version: string
          explorer_url: string | null
          favicon: string
          gas_collection_address: string | null
          gas_price: number
          genesis: string
          grafana_network_key: string | null
          id: number
          is_active: boolean
          is_deploy_contracts_public: boolean
          is_make_txs_public: boolean
          name: string
          network: string
          network_logo: string
          network_logo_dark: string
          replenish_amount: number
          replenish_threshold: number
          rpc_url: string
          silo_to_silo_bridge_address: string | null
          type: string
          updated_at: string
        }
        Insert: {
          applied_deal_ids: number[]
          base_token_decimals?: number
          base_token_name: string
          base_token_symbol: string
          blockscout_database_id?: number | null
          chain_id: number
          created_at?: string
          deleted_at?: string | null
          engine_account: string
          engine_version: string
          explorer_url?: string | null
          favicon?: string
          gas_collection_address?: string | null
          gas_price?: number
          genesis: string
          grafana_network_key?: string | null
          id?: number
          is_active?: boolean
          is_deploy_contracts_public?: boolean
          is_make_txs_public?: boolean
          name: string
          network?: string
          network_logo?: string
          network_logo_dark?: string
          replenish_amount?: number
          replenish_threshold?: number
          rpc_url?: string
          silo_to_silo_bridge_address?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          applied_deal_ids?: number[]
          base_token_decimals?: number
          base_token_name?: string
          base_token_symbol?: string
          blockscout_database_id?: number | null
          chain_id?: number
          created_at?: string
          deleted_at?: string | null
          engine_account?: string
          engine_version?: string
          explorer_url?: string | null
          favicon?: string
          gas_collection_address?: string | null
          gas_price?: number
          genesis?: string
          grafana_network_key?: string | null
          id?: number
          is_active?: boolean
          is_deploy_contracts_public?: boolean
          is_make_txs_public?: boolean
          name?: string
          network?: string
          network_logo?: string
          network_logo_dark?: string
          replenish_amount?: number
          replenish_threshold?: number
          rpc_url?: string
          silo_to_silo_bridge_address?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "silos_blockscout_database_id_fkey"
            columns: ["blockscout_database_id"]
            isOneToOne: false
            referencedRelation: "blockscout_databases"
            referencedColumns: ["id"]
          },
        ]
      }
      silos_teams: {
        Row: {
          silo_id: number
          team_id: number
        }
        Insert: {
          silo_id: number
          team_id: number
        }
        Update: {
          silo_id?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "silos_teams_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silos_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          name: string
          onboarding_status:
            | Database["public"]["Enums"]["team_onboarding_status"]
            | null
          prepaid_transactions: number
          team_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          onboarding_status?:
            | Database["public"]["Enums"]["team_onboarding_status"]
            | null
          prepaid_transactions?: number
          team_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          onboarding_status?:
            | Database["public"]["Enums"]["team_onboarding_status"]
            | null
          prepaid_transactions?: number
          team_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      userlists: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          team_id: number
          ui_enabled: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          team_id: number
          ui_enabled?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          team_id?: number
          ui_enabled?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "userlists_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          id: number
          marketing_consent: boolean | null
          name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          id?: number
          marketing_consent?: boolean | null
          name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          id?: number
          marketing_consent?: boolean | null
          name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users_teams: {
        Row: {
          confirmed_at: string | null
          team_id: number
          user_id: number
        }
        Insert: {
          confirmed_at?: string | null
          team_id: number
          user_id: number
        }
        Update: {
          confirmed_at?: string | null
          team_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      widgets: {
        Row: {
          created_at: string
          from_networks:
            | Database["public"]["Enums"]["widget_network_type"][]
            | null
          id: number
          silo_id: number
          to_networks:
            | Database["public"]["Enums"]["widget_network_type"][]
            | null
          tokens: number[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_networks?:
            | Database["public"]["Enums"]["widget_network_type"][]
            | null
          id?: number
          silo_id: number
          to_networks?:
            | Database["public"]["Enums"]["widget_network_type"][]
            | null
          tokens?: number[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_networks?:
            | Database["public"]["Enums"]["widget_network_type"][]
            | null
          id?: number
          silo_id?: number
          to_networks?:
            | Database["public"]["Enums"]["widget_network_type"][]
            | null
          tokens?: number[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bridges_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: true
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_scope_to_api_key_type: {
        Args: {
          scope_name: string
        }
        Returns: undefined
      }
      add_scopes_to_api_key_type: {
        Args: {
          scopes_to_add: string[]
        }
        Returns: undefined
      }
      add_values_to_enum: {
        Args: {
          enum_name: string
          enum_values: string[]
        }
        Returns: undefined
      }
      has_metadata_key: {
        Args: {
          metadata: Json
          key: string
        }
        Returns: boolean
      }
      update_user_metadata: {
        Args: {
          user_id_param: number
        }
        Returns: undefined
      }
    }
    Enums: {
      account_type: "contract" | "wallet"
      address_whitelist_type: "DEPLOY_CONTRACT" | "MAKE_TRANSACTION"
      api_key_scopes:
        | "deals:read"
        | "deals:write"
        | "silos:read"
        | "users:read"
        | "transactions:read"
        | "users:write"
        | "lists:read"
        | "lists:write"
        | "forwarder:read"
        | "forwarder:write"
        | "payments:read"
        | "payments:write"
        | "assets:write"
      base_token_symbol:
        | "AURORA"
        | "BTC"
        | "ETH"
        | "USDC"
        | "USDT"
        | "WNEAR"
        | "CUSTOM"
      chain_permission: "public" | "public_permissioned" | "private"
      deployment_status: "PENDING" | "DEPLOYED" | "NOT_DEPLOYED"
      filter_type: "USER" | "CONTRACT" | "CHAIN" | "EOA" | "TOKEN" | "IP"
      gas_mechanics: "usage" | "free" | "custom"
      limit_scope: "USER" | "GLOBAL"
      limit_type: "CYCLIC" | "RATELIMIT"
      network_type: "devnet" | "mainnet"
      order_type: "initial_setup" | "top_up"
      payment_status:
        | "PAID"
        | "UNPAID"
        | "NO_PAYMENT_REQUIRED"
        | "paid"
        | "unpaid"
        | "no_payment_required"
      silo_config_transaction_operation:
        | "SET_BASE_TOKEN"
        | "ENABLE_MAKE_TXS_WHITELIST"
        | "DISABLE_MAKE_TXS_WHITELIST"
        | "ENABLE_DEPLOY_CONTRACT_WHITELIST"
        | "DISABLE_DEPLOY_CONTRACT_WHITELIST"
        | "POPULATE_MAKE_TXS_WHITELIST"
        | "POPULATE_DEPLOY_CONTRACT_WHITELIST"
        | "PURGE_MAKE_TXS_WHITELIST"
        | "PURGE_DEPLOY_CONTRACT_WHITELIST"
        | "DEPLOY_AURORA"
        | "DEPLOY_USDT"
        | "DEPLOY_USDC"
        | "DEPLOY_NEAR"
        | "DEPLOY_ETH"
      silo_config_transaction_status: "PENDING" | "SUCCESSFUL" | "FAILED"
      team_onboarding_status:
        | "REQUEST_RECEIVED"
        | "DEPLOYMENT_IN_PROGRESS"
        | "DEPLOYMENT_DONE"
      token_type: "ERC20" | "ERC721" | "ERC1155"
      user_integration:
        | "onramp"
        | "oracle"
        | "bridge_widget"
        | "cex_withdrawals_widget"
        | "block_explorer"
        | "intense_support"
        | "dex"
      user_type: "customer" | "admin"
      widget_network_type: "AURORA" | "NEAR" | "ETHEREUM" | "CUSTOM"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
