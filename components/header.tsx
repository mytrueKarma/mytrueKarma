"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { useAuth } from "@/components/auth-provider";
// import { useCart } from "@/contexts/cart-context";

export function Header() {
  // const { user, logout } = useAuth();
  // const { getTotalItems } = useCart();
  // const totalItems = getTotalItems();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          position: "relative",
        }}
      >
        {/* Logo zentriert */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Image src="/myk-logo.png" alt="mytrueKarma Logo" width={32} height={32} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                mytrueKarma
              </span>
              <span style={{ fontSize: "0.625rem", fontStyle: "italic", color: "#4B5563", marginTop: "-0.25rem" }}>
                Sozial & Transparent
              </span>
            </div>
          </Link>
        </div>

        {/* Links: Anmelden */}
        <div>
          <Link href="/auth/login" style={{ color: "black", fontWeight: 500 }}>
            Anmelden
          </Link>
        </div>

        {/* Rechts: Wishlist & Cart */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* <Button asChild variant="ghost" size="icon">
            <Link href="/wishlist">❤️</Link>
          </Button> */}
          <Link href="/wishlist" style={{ fontSize: "1.25rem" }}>❤️</Link>

          {/* <Button asChild variant="ghost" size="icon">
            <Link href="/cart">🛒</Link>
          </Button> */}
          <Link href="/cart" style={{ fontSize: "1.25rem" }}>🛒</Link>
        </div>

        {/* Alle anderen Funktionen aus der alten Header.tsx sind hier auskommentiert */}
        {/* z.B. NavigationMenu, DropdownMenu, Search, UserMenu, MobileMenu */}
      </div>
    </header>
  );
}
