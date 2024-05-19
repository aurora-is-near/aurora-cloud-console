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
      bridges: {
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
            foreignKeyName: "bridges_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
        ]
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
      oracles: {
        Row: {
          created_at: string
          deployed_at: string | null
          id: number
          silo_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deployed_at?: string | null
          id?: number
          silo_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deployed_at?: string | null
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
      silos: {
        Row: {
          base_token_id: number | null
          chain_id: string
          created_at: string
          engine_account: string
          engine_version: string
          genesis: string
          id: number
          name: string
          network: string
          rpc_url: string
          updated_at: string
        }
        Insert: {
          base_token_id?: number | null
          chain_id: string
          created_at?: string
          engine_account: string
          engine_version: string
          genesis: string
          id?: number
          name: string
          network?: string
          rpc_url?: string
          updated_at?: string
        }
        Update: {
          base_token_id?: number | null
          chain_id?: string
          created_at?: string
          engine_account?: string
          engine_version?: string
          genesis?: string
          id?: number
          name?: string
          network?: string
          rpc_url?: string
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
        ]
      }
      silos_tokens: {
        Row: {
          silo_id: number
          token_id: number
        }
        Insert: {
          silo_id: number
          token_id: number
        }
        Update: {
          silo_id?: number
          token_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "silos_tokens_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "silos_tokens_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
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
          transaction_database: Database["public"]["Enums"]["transaction_database_type"]
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name: string
          team_key: string
          transaction_database: Database["public"]["Enums"]["transaction_database_type"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          team_key?: string
          transaction_database?: Database["public"]["Enums"]["transaction_database_type"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      teams_silos: {
        Row: {
          silo_id: number
          team_id: number
        }
        Insert: {
          silo_id: number
          team_id?: number
        }
        Update: {
          silo_id?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teams_silos_silo_id_fkey"
            columns: ["silo_id"]
            isOneToOne: false
            referencedRelation: "silos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_silos_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          address: string
          created_at: string
          id: number
          symbol: string
          type: Database["public"]["Enums"]["token_type"]
        }
        Insert: {
          address: string
          created_at?: string
          id?: number
          symbol: string
          type: Database["public"]["Enums"]["token_type"]
        }
        Update: {
          address?: string
          created_at?: string
          id?: number
          symbol?: string
          type?: Database["public"]["Enums"]["token_type"]
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
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
      token_type: "ERC20" | "ERC721" | "ERC1155"
      transaction_database_type: "AURORA" | "AURORA_DEMO" | "SILO"
      user_type: "customer" | "admin"
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
