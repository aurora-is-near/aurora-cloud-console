export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string
          last_used_at?: string | null
          note?: string | null
          scopes: Database["public"]["Enums"]["api_key_scopes"][]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string
          last_used_at?: string | null
          note?: string | null
          scopes?: Database["public"]["Enums"]["api_key_scopes"][]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          website: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          website?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      contracts: {
        Row: {
          address: string
          created_at: string
          deal_id: number
          id: number
          name: string
        }
        Insert: {
          address: string
          created_at?: string
          deal_id: number
          id?: number
          name: string
        }
        Update: {
          address?: string
          created_at?: string
          deal_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          company_id: string
          created_at: string
          enabled: boolean
          id: number
          key: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          enabled?: boolean
          id?: number
          key: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          enabled?: boolean
          id?: number
          key?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          id?: number
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
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
    }
    Enums: {
      api_key_scopes:
        | "deals:read"
        | "deals:write"
        | "silos:read"
        | "users:read"
        | "transactions:read"
      user_type: "customer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
