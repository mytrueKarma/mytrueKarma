"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Home,
  Package,
  Heart,
  Info,
  Palette,
  ScanSearchIcon as TransparencyIcon,
  Store,
  BarChart3,
  Settings,
  Users,
  LogOut,
  LogIn,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/contexts/cart-context";

const customerItems = [
  {
    title: "Startseite",
    url: "/",
    icon: Home,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: Package,
  },
  {
    title: "Dienstleistungen",
    url: "/services",
    icon: Briefcase,
  },
  {
    title: "Suchen",
    url: "/search",
    icon: Search,
  },
  {
    title: "Wunschliste",
    url: "/wishlist",
    icon: Heart,
  },
  {
    title: "Über uns",
    url: "/about",
    icon: Info,
  },
  {
    title: "Nachwuchsförderung",
    url: "/talent",
    icon: Palette,
  },
  {
    title: "Transparenz",
    url: "/transparency",
    icon: TransparencyIcon,
  },
];

const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: User,
  },
  {
    title: "Bestellungen",
    url: "/orders",
    icon: Package,
  },
  {
    title: "Profil",
    url: "/profile",
    icon: Settings,
  },
];

const sellerItems = [
  {
    title: "Verkäufer Dashboard",
    url: "/seller/dashboard",
    icon: Store,
  },
  {
    title: "Meine Produkte",
    url: "/seller/products",
    icon: Package,
  },
  {
    title: "Bestellungen",
    url: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    title: "Verkäufer werden",
    url: "/seller/register",
    icon: User,
  },
];

const adminItems = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Manage Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Manage Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Manage Users",
    url: "/admin/users",
    icon: Users,
  },
];

export function Header() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartHovered, setCartHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Image
              src="/myk-logo.png"
              alt="mytrueKarma Logo"
              width={32}
              height={32}
              className="animate-pulse"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                mytrueKarma
              </span>
              <span className="text-xs text-gray-600 italic -mt-1">
                Sozial & Transparent Einkaufen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Startseite
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/shop"
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Shop
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/services"
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Dienstleistungen
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Über uns
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/seller/register"
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Verkäufer werden
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* "Mehr" Dropdown - Separate from NavigationMenu */}
          <div className="hidden lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium px-4 py-2"
                >
                  Mehr
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/talent" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Nachwuchsförderung
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/transparency"
                    className="flex items-center gap-2"
                  >
                    <TransparencyIcon className="h-4 w-4" />
                    Transparenz
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/search" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Suchen
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar - Compact */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex max-w-36 mx-1"
          >
            <div
              className={`relative w-full transition-all duration-300 ${
                searchFocused ? "scale-105" : "scale-100"
              }`}
            >
              <Search
                className={`absolute left-1.5 top-1.5 h-3 w-3 text-muted-foreground transition-colors ${
                  searchFocused ? "text-blue-500" : ""
                }`}
              />
              <Input
                type="search"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-6 h-7 text-xs transition-all duration-200 focus:ring-1 focus:ring-blue-500"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </form>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-all duration-200"
              asChild
              onMouseEnter={() => setCartHovered(true)}
              onMouseLeave={() => setCartHovered(false)}
            >
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart
                    className={`h-5 w-5 transition-all duration-200 ${
                      cartHovered ? "text-blue-600 scale-110" : ""
                    }`}
                  />
                  {totalItems > 0 && (
                    <Badge
                      className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs transition-all duration-200 ${
                        cartHovered ? "scale-125 bg-blue-600" : ""
                      }`}
                    >
                      {totalItems}
                    </Badge>
                  )}
                </div>
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:scale-110 transition-transform"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userItems.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Verkaufen</DropdownMenuLabel>
                  {sellerItems.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {user?.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Admin</DropdownMenuLabel>
                      {adminItems.map((item) => (
                        <DropdownMenuItem key={item.title} asChild>
                          <Link
                            href={item.url}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Abmelden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="hover:scale-105 transition-transform" asChild>
                <Link href="/auth/login">Anmelden</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:scale-110 transition-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <div className="grid gap-2">
              {/* Search on mobile */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </form>

              {customerItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}

              {/* Verkäufer werden - prominent placement */}
              <Link
                href="/seller/register"
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-md border-t mt-2 pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Store className="h-4 w-4" />
                Verkäufer werden
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
