"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plus, DollarSign, ShoppingCart, Eye, Edit, Trash2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

// Mock data for seller products
const sellerProducts = [
  {
    id: 1,
    name: "Handmade Ceramic Vase",
    price: 45.99,
    stock: 12,
    sold: 8,
    status: "active",
    image: "/ceramic-vase.png",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    stock: 0,
    sold: 15,
    status: "out_of_stock",
    image: "/organic-cotton-shirt.jpg",
    rating: 4.6,
    reviews: 12,
  },
  {
    id: 3,
    name: "Wooden Phone Stand",
    price: 19.99,
    stock: 25,
    sold: 32,
    status: "active",
    image: "/wooden-phone-stand.jpg",
    rating: 4.9,
    reviews: 18,
  },
]

const salesData = {
  totalRevenue: 1247.85,
  totalOrders: 55,
  totalProducts: 12,
  averageRating: 4.7,
}

export default function SellerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div
        className={`transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Verkäufer Dashboard</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Produkte und verfolgen Sie Ihre Verkäufe</p>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/seller/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Neues Produkt
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">€{salesData.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">+12% vom letzten Monat</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bestellungen</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{salesData.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+8% vom letzten Monat</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produkte</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{salesData.totalProducts}</div>
              <p className="text-xs text-muted-foreground">3 aktive Produkte</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bewertung</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{salesData.averageRating}</div>
              <p className="text-xs text-muted-foreground">Durchschnittsbewertung</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Meine Produkte</TabsTrigger>
          <TabsTrigger value="orders">Bestellungen</TabsTrigger>
          <TabsTrigger value="analytics">Statistiken</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="grid gap-6">
            {sellerProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <Badge
                        className={`absolute -top-2 -right-2 ${
                          product.status === "active" ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {product.status === "active" ? "Aktiv" : "Ausverkauft"}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Preis:</span>
                          <div className="font-semibold text-green-600">€{product.price}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Lagerbestand:</span>
                          <div className="font-semibold">{product.stock}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Verkauft:</span>
                          <div className="font-semibold">{product.sold}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Bewertung:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{product.rating}</span>
                            <span className="text-muted-foreground">({product.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktuelle Bestellungen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Hier werden Ihre aktuellen Bestellungen angezeigt.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verkaufsstatistiken</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Hier werden detaillierte Statistiken zu Ihren Verkäufen angezeigt.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
