// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Returns null if credentials are not configured — the app falls back to placeholders
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const STORAGE_BUCKET = "birthday-memories";

/**
 * Returns the public URL for an image in the birthday-memories bucket.
 * Returns null if Supabase is not configured.
 */
export function getImageUrl(path: string): string | null {
  if (!supabase || !supabaseUrl) return null;
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}
