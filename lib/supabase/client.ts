// TEMPORÄR DEAKTIVIERT - Wird nach DB Setup reaktiviert
/**
 * Supabase Client ist temporär deaktiviert
 * Grund: Datenbank-Tabellen existieren noch nicht
 */
export function createClient() {
  throw new Error(
    "Supabase Client ist temporär deaktiviert. Bitte erst die Datenbank-Tabellen erstellen."
  );
}

/*
ORIGINAL CODE - FÜR SPÄTER:

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
*/
