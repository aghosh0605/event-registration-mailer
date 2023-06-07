import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-org": "cyberzest" },
  },
};
export const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_ANON_KEY,
  options
);
