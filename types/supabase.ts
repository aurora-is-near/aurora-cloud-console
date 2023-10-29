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
          description: string | null
          id: number
          key: string
          scopes: Database["public"]["Enums"]["api_key_scopes"][]
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          key?: string
          scopes: Database["public"]["Enums"]["api_key_scopes"][]
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          key?: string
          scopes?: Database["public"]["Enums"]["api_key_scopes"][]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "companies"
            referencedColumns: ["id"]
          }
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
      api_key_scopes: "deals:read" | "deals:write" | "silos:read" | "users:read"
      user_type: "customer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
