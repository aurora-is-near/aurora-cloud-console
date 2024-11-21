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
      deals: {
        Row: {
          created_at: string
          deleted_at: string | null
          enabled: boolean
          end_date: string
          id: number
          open: boolean
          silo_id: number | null
          start_date: string
          team_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          enabled?: boolean
          end_date: string
          id?: number
          open?: boolean
          silo_id?: number | null
          start_date: string
          team_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          enabled?: boolean
          end_date?: string
          id?: number
          open?: boolean
          silo_id?: number | null
          start_date?: string
          team_id?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      filter_entries: {
        Row: {
          filter_id: number | null
          id: number
          value: string
        }
        Insert: {
          filter_id?: number | null
          id?: number
          value: string
        }
        Update: {
          filter_id?: number | null
          id?: number
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "filter_entries_filter_id_fkey"
            columns: ["filter_id"]
            isOneToOne: false
            referencedRelation: "filters"
            referencedColumns: ["id"]
          },
        ]
      }
      filters: {
        Row: {
          blacklist: boolean
          created_at: string
          deal_id: number
          deleted_at: string | null
          filter_type: Database["public"]["Enums"]["filter_type"]
          id: number
          updated_at: string
        }
        Insert: {
          blacklist?: boolean
          created_at?: string
          deal_id: number
          deleted_at?: string | null
          filter_type: Database["public"]["Enums"]["filter_type"]
          id?: number
          updated_at?: string
        }
        Update: {
          blacklist?: boolean
          created_at?: string
          deal_id?: number
          deleted_at?: string | null
          filter_type?: Database["public"]["Enums"]["filter_type"]
          id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "filters_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      filter_type: "USER" | "CONTRACT" | "CHAIN" | "EOA" | "TOKEN" | "IP"
      limit_scope: "USER" | "GLOBAL"
      limit_type: "CYCLIC" | "RATELIMIT"
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
