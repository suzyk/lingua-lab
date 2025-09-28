import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // from dashboard → Settings → API
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // from same place

console.log("env var : " + supabaseUrl + " " + supabaseAnonKey);
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl or anon key is missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
