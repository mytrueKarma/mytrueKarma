"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, ShoppingCart, Users, DollarSign, TrendingUp, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+15% from last month",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Total Products",
    value: "567",
    change: "+5 new this week",
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Total Users",
    value: "2,345",
    change: "+12% from last month",
    icon: Users,
    color: "text-orange-600",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    status: "Processing",
    total: 299.99,
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    status: "Shipped",
    total: 149.99,
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    status: "Delivered",
    total: 79.99,
    date: "2024-01-13",
  },
]

const lowStockProducts = [
  { name: "Wireless Headphones", stock: 5, sku: "WH-001" },
  { name: "Smart Watch", stock: 3, sku: "SW-002" },
  { name: "Laptop Stand", stock: 2, sku: "LS-003" },
]

const quickActions = [
  {
    title: "Add Product",
    description: "Add a new product to inventory",
    icon: Plus,
    href: "/admin/products/new",
    color: "bg-blue-500",
  },
  {
    title: "View Orders",
    description: "Manage customer orders",
    icon: ShoppingCart,
    href: "/admin/orders",
    color: "bg-green-500",
  },
  {
    title: "User Management",
    description: "Manage user accounts",
    icon: Users,
    href: "/admin/users",
    color: "bg-purple-500",
  },
  {
    title: "Analytics",
    description: "View detailed reports",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "bg-orange-500",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your e-commerce store from this central hub.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={action.href}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Button variant="outline" asChild>
              <Link href="/admin/orders">View All</Link>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentOrders.map((order, index) => (
                  <div key={order.id} className={`p-4 ${index !== recentOrders.length - 1 ? "border-b" : ""}`}>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{order.id}</span>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : order.status === "Shipped"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">Low Stock Alert</h2>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>

          <Card>
            <CardHeader>
              <CardDescription>Products running low on inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.sku} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{product.stock} left</Badge>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline" asChild>
                <Link href="/admin/products">Manage Inventory</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
