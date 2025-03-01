// @ts-check
import { createClient, PostgrestError, AuthError, Session, User } from "@supabase/supabase-js";
import { type Database } from "./database.ts";

export { AuthError };
export type { Database, PostgrestError, Session, User };
export type { PostId } from "../framework/nominal";

// @ts-ignore
const SUPABASE_URL = process.env.SUPABASE_URL || "";
// @ts-ignore
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

if (SUPABASE_URL === "" || SUPABASE_ANON_KEY === "") {
  console.error("SUPABASE_URL and SUPABASE_ANON_KEY are not set");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);


