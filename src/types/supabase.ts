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
      deals: {
        Row: {
          created_at: string
          demo_key: string | null
          id: number
          name: string
          team_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          demo_key?: string | null
          id?: number
          name: string
          team_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          demo_key?: string | null
          id?: number
          name?: string
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
      lists: {
        Row: {
          created_at: string
          id: number
          name: string
          team_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          team_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lists_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_form: {
        Row: {
          baseToken: string | null
          chainId: string | null
          chainName: string | null
          chainPermission: string | null
          comments: string | null
          created_at: string
          gasMechanics: string | null
          id: number
          integrations: string[] | null
          networkType: string | null
          team_id: number | null
        }
        Insert: {
          baseToken?: string | null
          chainId?: string | null
          chainName?: string | null
          chainPermission?: string | null
          comments?: string | null
          created_at?: string
          gasMechanics?: string | null
          id?: number
          integrations?: string[] | null
          networkType?: string | null
          team_id?: number | null
        }
        Update: {
          baseToken?: string | null
          chainId?: string | null
          chainName?: string | null
          chainPermission?: string | null
          comments?: string | null
          created_at?: string
          gasMechanics?: string | null
          id?: number
          integrations?: string[] | null
          networkType?: string | null
          team_id?: number | null
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
          payment_status: Database["public"]["Enums"]["payment_status"]
          session_id: string
          team_id: number
          type: Database["public"]["Enums"]["order_type"]
        }
        Insert: {
          created_at?: string
          id?: number
          payment_status: Database["public"]["Enums"]["payment_status"]
          session_id: string
          team_id: number
          type: Database["public"]["Enums"]["order_type"]
        }
        Update: {
          created_at?: string
          id?: number
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
      silos: {
        Row: {
          base_token_id: number | null
          blockscout_database_id: number | null
          chain_id: string
          created_at: string
          engine_account: string
          engine_version: string
          explorer_url: string | null
          gas_collection_address: string | null
          gas_price: number | null
          genesis: string
          grafana_network_key: string | null
          id: number
          name: string
          network: string
          rpc_url: string
          team_id: number
          updated_at: string
        }
        Insert: {
          base_token_id?: number | null
          blockscout_database_id?: number | null
          chain_id: string
          created_at?: string
          engine_account: string
          engine_version: string
          explorer_url?: string | null
          gas_collection_address?: string | null
          gas_price?: number | null
          genesis: string
          grafana_network_key?: string | null
          id?: number
          name: string
          network?: string
          rpc_url?: string
          team_id: number
          updated_at?: string
        }
        Update: {
          base_token_id?: number | null
          blockscout_database_id?: number | null
          chain_id?: string
          created_at?: string
          engine_account?: string
          engine_version?: string
          explorer_url?: string | null
          gas_collection_address?: string | null
          gas_price?: number | null
          genesis?: string
          grafana_network_key?: string | null
          id?: number
          name?: string
          network?: string
          rpc_url?: string
          team_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "silos_base_token_id_fkey"
            columns: ["base_token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silos_blockscout_database_id_fkey"
            columns: ["blockscout_database_id"]
            isOneToOne: false
            referencedRelation: "blockscout_databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silos_team_id_fkey"
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
          email: string | null
          id: number
          name: string
          team_key: string
          updated_at: string
          website: string | null
          onboarding_status:
            | Database["public"]["Enums"]["team_onboarding_status"]
            | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name: string
          team_key: string
          updated_at?: string
          website?: string | null
          onboarding_status?:
            | Database["public"]["Enums"]["team_onboarding_status"]
            | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          team_key?: string
          updated_at?: string
          website?: string | null
          onboarding_status?:
            | Database["public"]["Enums"]["team_onboarding_status"]
            | null
        }
        Relationships: []
      }
      tokens: {
        Row: {
          address: string
          bridge_addresses: string[] | null
          bridge_deployment_status: Database["public"]["Enums"]["deployment_status"]
          bridge_origin: string | null
          created_at: string
          decimals: number | null
          deployment_status: Database["public"]["Enums"]["deployment_status"]
          fast_bridge: boolean
          icon_url: string | null
          id: number
          name: string | null
          silo_id: number
          symbol: string
          type: Database["public"]["Enums"]["token_type"] | null
        }
        Insert: {
          address: string
          bridge_addresses?: string[] | null
          bridge_deployment_status?: Database["public"]["Enums"]["deployment_status"]
          bridge_origin?: string | null
          created_at?: string
          decimals?: number | null
          deployment_status?: Database["public"]["Enums"]["deployment_status"]
          fast_bridge?: boolean
          icon_url?: string | null
          id?: number
          name?: string | null
          silo_id: number
          symbol: string
          type?: Database["public"]["Enums"]["token_type"] | null
        }
        Update: {
          address?: string
          bridge_addresses?: string[] | null
          bridge_deployment_status?: Database["public"]["Enums"]["deployment_status"]
          bridge_origin?: string | null
          created_at?: string
          decimals?: number | null
          deployment_status?: Database["public"]["Enums"]["deployment_status"]
          fast_bridge?: boolean
          icon_url?: string | null
          id?: number
          name?: string | null
          silo_id?: number
          symbol?: string
          type?: Database["public"]["Enums"]["token_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "tokens_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: number
          marketing_consent: boolean | null
          name: string | null
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: number
          marketing_consent?: boolean | null
          name?: string | null
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: number
          marketing_consent?: boolean | null
          name?: string | null
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
      deployment_status: "PENDING" | "DEPLOYED" | "NOT_DEPLOYED"
      order_type: "initial_setup"
      payment_status: "paid" | "unpaid" | "no_payment_required"
      token_type: "ERC20" | "ERC721" | "ERC1155"
      user_type: "customer" | "admin"
      widget_network_type: "AURORA" | "NEAR" | "ETHEREUM" | "CUSTOM"
      team_onboarding_status:
        | "REQUEST_RECEIVED"
        | "DEPLOYMENT_IN_PROGRESS"
        | "DEPLOYMENT_DONE"
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
