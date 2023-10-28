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
          api_key: string
          company_id: string | null
          created_at: string
          email: string
          id: number
          name: string | null
          user_guid: string
        }
        Insert: {
          api_key: string
          company_id?: string | null
          created_at?: string
          email: string
          id?: number
          name?: string | null
          user_guid: string
        }
        Update: {
          api_key?: string
          company_id?: string | null
          created_at?: string
          email?: string
          id?: number
          name?: string | null
          user_guid?: string
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
      [_ in never]: never
    }
    Enums: {
      user_type: "customer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
