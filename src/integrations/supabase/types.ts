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
      admin_operations: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          operation_type: string
          record_count: number | null
          status: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          operation_type: string
          record_count?: number | null
          status?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          operation_type?: string
          record_count?: number | null
          status?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contentful_courses: {
        Row: {
          category: string
          contentful_id: string
          created_at: string | null
          description: string | null
          duration: number | null
          featured: boolean | null
          id: string
          instructor_id: string | null
          is_published: boolean | null
          level: string
          order_index: number | null
          package_type: string
          short_description: string | null
          slug: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          category: string
          contentful_id: string
          created_at?: string | null
          description?: string | null
          duration?: number | null
          featured?: boolean | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          level: string
          order_index?: number | null
          package_type: string
          short_description?: string | null
          slug: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string
          contentful_id?: string
          created_at?: string | null
          description?: string | null
          duration?: number | null
          featured?: boolean | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          level?: string
          order_index?: number | null
          package_type?: string
          short_description?: string | null
          slug?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      contentful_live_sessions: {
        Row: {
          category: string
          contentful_id: string
          created_at: string | null
          description: string | null
          duration: number | null
          end_time: string
          id: string
          instructor_id: string | null
          instructor_name: string | null
          is_published: boolean | null
          is_recurring: boolean | null
          level: string
          max_participants: number | null
          meeting_url: string | null
          package_types: string[] | null
          platform: string
          price: number | null
          recurring_pattern: string | null
          registration_required: boolean | null
          scheduled_date: string
          slug: string
          start_time: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          contentful_id: string
          created_at?: string | null
          description?: string | null
          duration?: number | null
          end_time: string
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_published?: boolean | null
          is_recurring?: boolean | null
          level: string
          max_participants?: number | null
          meeting_url?: string | null
          package_types?: string[] | null
          platform: string
          price?: number | null
          recurring_pattern?: string | null
          registration_required?: boolean | null
          scheduled_date: string
          slug: string
          start_time: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          contentful_id?: string
          created_at?: string | null
          description?: string | null
          duration?: number | null
          end_time?: string
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_published?: boolean | null
          is_recurring?: boolean | null
          level?: string
          max_participants?: number | null
          meeting_url?: string | null
          package_types?: string[] | null
          platform?: string
          price?: number | null
          recurring_pattern?: string | null
          registration_required?: boolean | null
          scheduled_date?: string
          slug?: string
          start_time?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contentful_sync_log: {
        Row: {
          action: string
          content_type: string | null
          contentful_id: string | null
          error_message: string | null
          id: string
          payload: Json | null
          processed_at: string | null
          status: string
          webhook_name: string | null
        }
        Insert: {
          action: string
          content_type?: string | null
          contentful_id?: string | null
          error_message?: string | null
          id?: string
          payload?: Json | null
          processed_at?: string | null
          status?: string
          webhook_name?: string | null
        }
        Update: {
          action?: string
          content_type?: string | null
          contentful_id?: string | null
          error_message?: string | null
          id?: string
          payload?: Json | null
          processed_at?: string | null
          status?: string
          webhook_name?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          document_url: string | null
          id: string
          package_type: Database["public"]["Enums"]["subscription_package"]
          quiz_data: Json | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          package_type: Database["public"]["Enums"]["subscription_package"]
          quiz_data?: Json | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          package_type?: Database["public"]["Enums"]["subscription_package"]
          quiz_data?: Json | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          course_id: string
          created_at: string | null
          file_url: string
          id: string
          size_bytes: number | null
          title: string
          type: Database["public"]["Enums"]["document_type"]
        }
        Insert: {
          course_id: string
          created_at?: string | null
          file_url: string
          id?: string
          size_bytes?: number | null
          title: string
          type: Database["public"]["Enums"]["document_type"]
        }
        Update: {
          course_id?: string
          created_at?: string | null
          file_url?: string
          id?: string
          size_bytes?: number | null
          title?: string
          type?: Database["public"]["Enums"]["document_type"]
        }
        Relationships: [
          {
            foreignKeyName: "documents_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      live_session_participants: {
        Row: {
          id: string
          joined_at: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_session_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_sessions: {
        Row: {
          course_id: string | null
          created_at: string | null
          created_by: string | null
          date: string
          end_time: string
          id: string
          live_link: string | null
          max_participants: number | null
          platform: Database["public"]["Enums"]["live_platform"]
          recording_url: string | null
          session_status: string | null
          start_time: string
          title: string
          webrtc_room_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          end_time: string
          id?: string
          live_link?: string | null
          max_participants?: number | null
          platform: Database["public"]["Enums"]["live_platform"]
          recording_url?: string | null
          session_status?: string | null
          start_time: string
          title: string
          webrtc_room_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          end_time?: string
          id?: string
          live_link?: string | null
          max_participants?: number | null
          platform?: Database["public"]["Enums"]["live_platform"]
          recording_url?: string | null
          session_status?: string | null
          start_time?: string
          title?: string
          webrtc_room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_sessions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          profile_picture: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          profile_picture?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          profile_picture?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          quiz_id: string
          score: number
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          quiz_id: string
          score: number
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          quiz_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          questions: Json
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          questions: Json
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          questions?: Json
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          connection_type: string | null
          id: string
          joined_at: string | null
          left_at: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          connection_type?: string | null
          id?: string
          joined_at?: string | null
          left_at?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          connection_type?: string | null
          id?: string
          joined_at?: string | null
          left_at?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          expiry_date: string
          hours_used: number | null
          id: string
          is_active: boolean | null
          package: Database["public"]["Enums"]["subscription_package"]
          start_date: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expiry_date: string
          hours_used?: number | null
          id?: string
          is_active?: boolean | null
          package: Database["public"]["Enums"]["subscription_package"]
          start_date?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expiry_date?: string
          hours_used?: number | null
          id?: string
          is_active?: boolean | null
          package?: Database["public"]["Enums"]["subscription_package"]
          start_date?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      document_type: "pdf" | "doc" | "docx"
      live_platform: "zoom" | "tiktok"
      subscription_package: "general" | "cefr" | "combo"
      user_role: "student" | "teacher" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: ["pdf", "doc", "docx"],
      live_platform: ["zoom", "tiktok"],
      subscription_package: ["general", "cefr", "combo"],
      user_role: ["student", "teacher", "admin"],
    },
  },
} as const
