export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      contact_leads: {
        Row: {
          birth_day: number | null
          birth_month: number | null
          birth_year: number | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          gender: string | null
          id: string
          message: string | null
          name: string
          nationality: string | null
          phone: string | null
          salutation: string | null
          typology: string | null
        }
        Insert: {
          birth_day?: number | null
          birth_month?: number | null
          birth_year?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          gender?: string | null
          id?: string
          message?: string | null
          name: string
          nationality?: string | null
          phone?: string | null
          salutation?: string | null
          typology?: string | null
        }
        Update: {
          birth_day?: number | null
          birth_month?: number | null
          birth_year?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          gender?: string | null
          id?: string
          message?: string | null
          name?: string
          nationality?: string | null
          phone?: string | null
          salutation?: string | null
          typology?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          area: string
          bank_entity: string | null
          building: string
          company_name: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          floor: number
          iban: string | null
          id: string
          last_name: string
          nif: string | null
          orientation: string
          parking: number
          phone: string
          price: number
          privacy_accepted: boolean
          status: string
          terms_accepted: boolean
          typology: string
          unit_id: string
          updated_at: string
        }
        Insert: {
          area: string
          bank_entity?: string | null
          building: string
          company_name?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          floor: number
          iban?: string | null
          id?: string
          last_name: string
          nif?: string | null
          orientation: string
          parking?: number
          phone: string
          price: number
          privacy_accepted?: boolean
          status?: string
          terms_accepted?: boolean
          typology: string
          unit_id: string
          updated_at?: string
        }
        Update: {
          area?: string
          bank_entity?: string | null
          building?: string
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          floor?: number
          iban?: string | null
          id?: string
          last_name?: string
          nif?: string | null
          orientation?: string
          parking?: number
          phone?: string
          price?: number
          privacy_accepted?: boolean
          status?: string
          terms_accepted?: boolean
          typology?: string
          unit_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          area: string
          building: string
          floor: number
          floor_plan_url: string | null
          id: string
          orientation: string
          parking: number
          price: number | null
          sort_order: number
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          area: string
          building: string
          floor: number
          floor_plan_url?: string | null
          id: string
          orientation: string
          parking?: number
          price?: number | null
          sort_order?: number
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          area?: string
          building?: string
          floor?: number
          floor_plan_url?: string | null
          id?: string
          orientation?: string
          parking?: number
          price?: number | null
          sort_order?: number
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_reserved_unit_ids: {
        Args: never
        Returns: {
          unit_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
