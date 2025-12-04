import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  projects: {
    id: string;
    name: string;
    status: string;
    progress: number;
    priority: string;
    user_id: string;
    created_at: string;
  };
  tasks: {
    id: string;
    title: string;
    project_id: string;
    priority: string;
    status: string;
    user_id: string;
    created_at: string;
  };
  measurements: {
    id: string;
    label: string;
    value: string;
    unit: string;
    project_id: string;
    user_id: string;
    created_at: string;
  };
  photos: {
    id: string;
    title: string;
    category: string;
    measurements_count: number;
    project_id: string;
    user_id: string;
    created_at: string;
  };
  comments: {
    id: string;
    text: string;
    project_id: string;
    user_id: string;
    user_name: string;
    reactions: number;
    created_at: string;
  };
  notifications: {
    id: string;
    type: string;
    title: string;
    message: string;
    unread: boolean;
    user_id: string;
    created_at: string;
  };
};
