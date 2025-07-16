// Database Types - will be generated from Supabase later
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      negotiations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: 'draft' | 'active' | 'completed' | 'archived';
          created_at: string;
          updated_at: string;
          metadata: Record<string, any> | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          status?: 'draft' | 'active' | 'completed' | 'archived';
          created_at?: string;
          updated_at?: string;
          metadata?: Record<string, any> | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          status?: 'draft' | 'active' | 'completed' | 'archived';
          created_at?: string;
          updated_at?: string;
          metadata?: Record<string, any> | null;
        };
      };
      documents: {
        Row: {
          id: string;
          negotiation_id: string;
          user_id: string;
          name: string;
          file_path: string;
          file_size: number;
          mime_type: string;
          created_at: string;
          metadata: Record<string, any> | null;
        };
        Insert: {
          id?: string;
          negotiation_id: string;
          user_id: string;
          name: string;
          file_path: string;
          file_size: number;
          mime_type: string;
          created_at?: string;
          metadata?: Record<string, any> | null;
        };
        Update: {
          id?: string;
          negotiation_id?: string;
          user_id?: string;
          name?: string;
          file_path?: string;
          file_size?: number;
          mime_type?: string;
          created_at?: string;
          metadata?: Record<string, any> | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};