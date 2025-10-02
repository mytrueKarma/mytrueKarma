"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Search,
  Heart,
  User,
  LogOut,
  LogIn,
  Store,
  Info,
  Palette,
  ScanSearchIcon as TransparencyIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

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
    title: "Suchen",
    url: "/search",
    icon: Search,
  },
  {
    title: "Warenkorb",
    url: "/cart",
    icon: ShoppingCart,
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

export function AppSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/myk-logo.png"
            alt="mytrueKarma Logo"
            width={24}
            height={24}
            className="animate-pulse"
          />
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            mytrueKarma
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 font-semibold">
            Shop
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`transition-all duration-200 hover:scale-105 ${
                      hoveredItem === item.title
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url}>
                      <item.icon
                        className={`transition-all duration-200 ${
                          hoveredItem === item.title ? "scale-110" : ""
                        }`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-green-600 font-semibold">
                Konto
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className={`transition-all duration-200 hover:scale-105 ${
                          hoveredItem === item.title
                            ? "bg-green-50 text-green-600"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={`transition-all duration-200 ${
                              hoveredItem === item.title ? "scale-110" : ""
                            }`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-orange-600 font-semibold">
                Verkaufen
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sellerItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className={`transition-all duration-200 hover:scale-105 ${
                          hoveredItem === item.title
                            ? "bg-orange-50 text-orange-600"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={`transition-all duration-200 ${
                              hoveredItem === item.title ? "scale-110" : ""
                            }`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {user?.isAdmin && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-600 font-semibold">
                Admin
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className={`transition-all duration-200 hover:scale-105 ${
                          hoveredItem === item.title
                            ? "bg-purple-50 text-purple-600"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={`transition-all duration-200 ${
                              hoveredItem === item.title ? "scale-110" : ""
                            }`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col gap-2 p-2">
                <div className="text-sm p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border">
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-muted-foreground">{user.email}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="w-full hover:scale-105 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="hover:scale-105 transition-transform"
              >
                <Link href="/auth/login">
                  <LogIn />
                  <span>Anmelden</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
