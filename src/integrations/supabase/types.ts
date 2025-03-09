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
      categories: {
        Row: {
          icon: string
          id: string
          title: string
          total_modules: number | null
          total_skills: number | null
        }
        Insert: {
          icon: string
          id?: string
          title: string
          total_modules?: number | null
          total_skills?: number | null
        }
        Update: {
          icon?: string
          id?: string
          title?: string
          total_modules?: number | null
          total_skills?: number | null
        }
        Relationships: []
      }
      gift_cards: {
        Row: {
          bg_color: string
          cost: number
          created_at: string
          id: string
          logo: string
          name: string
          value: number
        }
        Insert: {
          bg_color?: string
          cost: number
          created_at?: string
          id?: string
          logo: string
          name: string
          value: number
        }
        Update: {
          bg_color?: string
          cost?: number
          created_at?: string
          id?: string
          logo?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
      leaderboard_users: {
        Row: {
          avatar: string
          coins: number | null
          id: string
          name: string
          position: number
        }
        Insert: {
          avatar: string
          coins?: number | null
          id?: string
          name: string
          position: number
        }
        Update: {
          avatar?: string
          coins?: number | null
          id?: string
          name?: string
          position?: number
        }
        Relationships: []
      }
      lessons: {
        Row: {
          completed: boolean | null
          content: string
          id: string
          module_id: string | null
          order_index: number | null
          title: string
        }
        Insert: {
          completed?: boolean | null
          content: string
          id?: string
          module_id?: string | null
          order_index?: number | null
          title: string
        }
        Update: {
          completed?: boolean | null
          content?: string
          id?: string
          module_id?: string | null
          order_index?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          category: string
          category_id: string | null
          coins: number | null
          current_part: number | null
          description: string | null
          icon: string
          id: string
          order_index: number | null
          participants: number | null
          progress: number | null
          status: string | null
          time_estimate: number | null
          title: string
          total_parts: number | null
        }
        Insert: {
          category: string
          category_id?: string | null
          coins?: number | null
          current_part?: number | null
          description?: string | null
          icon: string
          id?: string
          order_index?: number | null
          participants?: number | null
          progress?: number | null
          status?: string | null
          time_estimate?: number | null
          title: string
          total_parts?: number | null
        }
        Update: {
          category?: string
          category_id?: string | null
          coins?: number | null
          current_part?: number | null
          description?: string | null
          icon?: string
          id?: string
          order_index?: number | null
          participants?: number | null
          progress?: number | null
          status?: string | null
          time_estimate?: number | null
          title?: string
          total_parts?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          id: string
          question_id: string | null
          text: string
        }
        Insert: {
          id?: string
          question_id?: string | null
          text: string
        }
        Update: {
          id?: string
          question_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          coins: number | null
          completed_modules: number | null
          hearts: number | null
          id: string
          joined_date: string | null
          last_login: string | null
          name: string
          referral_code: string | null
          streak: number | null
          streak_updated_at: string | null
          total_earned: number | null
          user_id: string | null
          xp: number | null
        }
        Insert: {
          avatar?: string | null
          coins?: number | null
          completed_modules?: number | null
          hearts?: number | null
          id?: string
          joined_date?: string | null
          last_login?: string | null
          name: string
          referral_code?: string | null
          streak?: number | null
          streak_updated_at?: string | null
          total_earned?: number | null
          user_id?: string | null
          xp?: number | null
        }
        Update: {
          avatar?: string | null
          coins?: number | null
          completed_modules?: number | null
          hearts?: number | null
          id?: string
          joined_date?: string | null
          last_login?: string | null
          name?: string
          referral_code?: string | null
          streak?: number | null
          streak_updated_at?: string | null
          total_earned?: number | null
          user_id?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_option_id: string | null
          explanation: string | null
          id: string
          quiz_id: string | null
          text: string
        }
        Insert: {
          correct_option_id?: string | null
          explanation?: string | null
          id?: string
          quiz_id?: string | null
          text: string
        }
        Update: {
          correct_option_id?: string | null
          explanation?: string | null
          id?: string
          quiz_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_correct_option"
            columns: ["correct_option_id"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string | null
          time_limit: number | null
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          time_limit?: number | null
        }
        Update: {
          id?: string
          lesson_id?: string | null
          time_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          cost: number
          created_at: string
          description: string
          icon: string
          id: string
          image: string
          name: string
          type: string
        }
        Insert: {
          cost: number
          created_at?: string
          description: string
          icon: string
          id?: string
          image: string
          name: string
          type: string
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string
          icon?: string
          id?: string
          image?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      trivia_events: {
        Row: {
          date: string
          description: string
          icon: string
          id: string
          participants: number | null
          prize: number | null
          title: string
        }
        Insert: {
          date: string
          description: string
          icon: string
          id?: string
          participants?: number | null
          prize?: number | null
          title: string
        }
        Update: {
          date?: string
          description?: string
          icon?: string
          id?: string
          participants?: number | null
          prize?: number | null
          title?: string
        }
        Relationships: []
      }
      user_gift_cards: {
        Row: {
          code: string | null
          gift_card_id: string
          id: string
          redeemed_at: string
          status: string
          user_id: string
        }
        Insert: {
          code?: string | null
          gift_card_id: string
          id?: string
          redeemed_at?: string
          status?: string
          user_id: string
        }
        Update: {
          code?: string | null
          gift_card_id?: string
          id?: string
          redeemed_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_gift_cards_gift_card_id_fkey"
            columns: ["gift_card_id"]
            isOneToOne: false
            referencedRelation: "gift_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_modules: {
        Row: {
          completed_lessons: string[] | null
          id: string
          last_access: string | null
          module_id: string | null
          progress: number | null
          started_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_lessons?: string[] | null
          id?: string
          last_access?: string | null
          module_id?: string | null
          progress?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_lessons?: string[] | null
          id?: string
          last_access?: string | null
          module_id?: string | null
          progress?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rewards: {
        Row: {
          id: string
          redeemed_at: string
          reward_id: string
          user_id: string
        }
        Insert: {
          id?: string
          redeemed_at?: string
          reward_id: string
          user_id: string
        }
        Update: {
          id?: string
          redeemed_at?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
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
      [_ in never]: never
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
