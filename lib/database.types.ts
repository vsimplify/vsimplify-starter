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
      _AgentToMission: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: "_AgentToMission_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Agent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_AgentToMission_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "Mission"
            referencedColumns: ["id"]
          },
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Agent: {
        Row: {
          allowDelegation: boolean
          backstory: string | null
          createdAt: string
          creator: string
          domainId: number
          email: string
          goal: string
          id: number
          image: string | null
          memory: boolean
          role: string
          title: string
          tools: Database["public"]["Enums"]["AgentTool"][] | null
          updatedAt: string
          user_id: string
          verbose: boolean
        }
        Insert: {
          allowDelegation?: boolean
          backstory?: string | null
          createdAt?: string
          creator?: string
          domainId: number
          email: string
          goal: string
          id?: number
          image?: string | null
          memory?: boolean
          role: string
          title: string
          tools?: Database["public"]["Enums"]["AgentTool"][] | null
          updatedAt: string
          user_id?: string
          verbose?: boolean
        }
        Update: {
          allowDelegation?: boolean
          backstory?: string | null
          createdAt?: string
          creator?: string
          domainId?: number
          email?: string
          goal?: string
          id?: number
          image?: string | null
          memory?: boolean
          role?: string
          title?: string
          tools?: Database["public"]["Enums"]["AgentTool"][] | null
          updatedAt?: string
          user_id?: string
          verbose?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "fk-domain-agent"
            columns: ["domainId"]
            isOneToOne: false
            referencedRelation: "Domain"
            referencedColumns: ["id"]
          },
        ]
      }
      credits: {
        Row: {
          created_at: string
          credits: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      Domain: {
        Row: {
          agentAbsent: boolean | null
          Agents: Json[]
          Area: string | null
          Audience: string
          Domain: string
          ForUse: string
          id: number
          identifier: number
          Missions: Json[]
        }
        Insert: {
          agentAbsent?: boolean | null
          Agents?: Json[]
          Area?: string | null
          Audience: string
          Domain: string
          ForUse: string
          id: number
          identifier: number
          Missions?: Json[]
        }
        Update: {
          agentAbsent?: boolean | null
          Agents?: Json[]
          Area?: string | null
          Audience?: string
          Domain?: string
          ForUse?: string
          id?: number
          identifier?: number
          Missions?: Json[]
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          id: number
          modelId: number
          uri: string
        }
        Insert: {
          created_at?: string
          id?: number
          modelId: number
          uri: string
        }
        Update: {
          created_at?: string
          id?: number
          modelId?: number
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      Mission: {
        Row: {
          abandonedForTokens: boolean
          createdAt: string
          domainId: number
          email: string
          id: number
          inTokens: number
          name: string
          outTokens: number
          process: Database["public"]["Enums"]["MissionProcess"]
          projectId: number
          result: string | null
          taskResult: string | null
          tasks: Json[] | null
          updatedAt: string
          user_id: string
          verbose: boolean
        }
        Insert: {
          abandonedForTokens?: boolean
          createdAt?: string
          domainId?: number
          email: string
          id?: number
          inTokens?: number
          name: string
          outTokens?: number
          process?: Database["public"]["Enums"]["MissionProcess"]
          projectId?: number
          result?: string | null
          taskResult?: string | null
          tasks?: Json[] | null
          updatedAt: string
          user_id?: string
          verbose?: boolean
        }
        Update: {
          abandonedForTokens?: boolean
          createdAt?: string
          domainId?: number
          email?: string
          id?: number
          inTokens?: number
          name?: string
          outTokens?: number
          process?: Database["public"]["Enums"]["MissionProcess"]
          projectId?: number
          result?: string | null
          taskResult?: string | null
          tasks?: Json[] | null
          updatedAt?: string
          user_id?: string
          verbose?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "fk-domain-mission"
            columns: ["domainId"]
            isOneToOne: false
            referencedRelation: "Domain"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk-project-mission"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          created_at: string
          id: number
          modelId: string | null
          name: string | null
          status: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          modelId?: string | null
          name?: string | null
          status?: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          modelId?: string | null
          name?: string | null
          status?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      portfolios: {
        Row: {
          created_at: string
          description: string | null
          domainId: number | null
          id: string
          progress: number | null
          project_id: number | null
          status: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          domainId?: number | null
          id?: string
          progress?: number | null
          project_id?: number | null
          status?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          domainId?: number | null
          id?: string
          progress?: number | null
          project_id?: number | null
          status?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_portfolio_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolios_domainId_fkey"
            columns: ["domainId"]
            isOneToOne: false
            referencedRelation: "Domain"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolios_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      Project: {
        Row: {
          createdAt: string
          description: string | null
          domainId: number
          dueOn: string
          email: string
          goal: string
          id: number
          nugget: string
          objective: string
          outcome: string
          updatedAt: string | null
          user_id: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          domainId: number
          dueOn: string
          email: string
          goal: string
          id?: number
          nugget: string
          objective: string
          outcome: string
          updatedAt?: string | null
          user_id?: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          domainId?: number
          dueOn?: string
          email?: string
          goal?: string
          id?: number
          nugget?: string
          objective?: string
          outcome?: string
          updatedAt?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "domainId"
            columns: ["domainId"]
            isOneToOne: false
            referencedRelation: "Domain"
            referencedColumns: ["id"]
          },
        ]
      }
      samples: {
        Row: {
          created_at: string
          id: number
          modelId: number
          uri: string
        }
        Insert: {
          created_at?: string
          id?: number
          modelId: number
          uri: string
        }
        Update: {
          created_at?: string
          id?: number
          modelId?: number
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "samples_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      Token: {
        Row: {
          clerkId: string
          email: string
          tokens: number | null
          updatedAt: string | null
          user_id: string
        }
        Insert: {
          clerkId: string
          email: string
          tokens?: number | null
          updatedAt?: string | null
          user_id?: string
        }
        Update: {
          clerkId?: string
          email?: string
          tokens?: number | null
          updatedAt?: string | null
          user_id?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          clerkId: string
          createdAt: string | null
          email: string
          image_url: string | null
          lastName: string | null
          name: string | null
          subscriptionDate: string | null
          updatedAt: string | null
          user_id: string | null
          userType: string
        }
        Insert: {
          clerkId: string
          createdAt?: string | null
          email: string
          image_url?: string | null
          lastName?: string | null
          name?: string | null
          subscriptionDate?: string | null
          updatedAt?: string | null
          user_id?: string | null
          userType?: string
        }
        Update: {
          clerkId?: string
          createdAt?: string | null
          email?: string
          image_url?: string | null
          lastName?: string | null
          name?: string | null
          subscriptionDate?: string | null
          updatedAt?: string | null
          user_id?: string | null
          userType?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      AgentTool:
        | "DUCK_DUCK_GO_SEARCH"
        | "SEMANTIC_SCHOLAR"
        | "WIKIDATA"
        | "WIKIPEDIA"
        | "YAHOO_FINANCE"
        | "YOUTUBE_SEARCH"
        | "ARXIV"
        | "PUBMED"
      MissionProcess: "SEQUENTIAL" | "HIERARCHICAL"
      user_role: "admin" | "user" | "moderator"
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
