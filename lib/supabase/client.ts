import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase Client für Browser/Client-Side
 * Wird in Client Components verwendet
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
