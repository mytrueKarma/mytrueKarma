import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Temporär deaktiviert - Supabase Middleware wird aktiviert nach DB Setup
  // Für jetzt: Einfach durchlassen
  return NextResponse.next();

  // TODO: Nach Supabase DB Setup wieder aktivieren:
  // import { updateSession } from "@/lib/supabase/middleware";
  // return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
