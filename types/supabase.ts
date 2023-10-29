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
          company_id: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          company_id?: string | null
          confirmed_at?: string | null
          created_at: string
          email: string
          id: string
          name?: string | null
          type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          company_id?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
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
