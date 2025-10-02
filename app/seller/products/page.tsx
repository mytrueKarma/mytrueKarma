"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Plus, Search, Edit, Trash2, Eye, TrendingUp } from "lucide-react"
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
    category: "Home & Garden",
    createdAt: "2024-01-15",
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
    category: "Men's Fashion",
    createdAt: "2024-01-10",
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
    category: "Accessories",
    createdAt: "2024-01-05",
  },
]

export default function SellerProductsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
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

  const filteredProducts = sellerProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

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
            <h1 className="text-3xl font-bold mb-2">Meine Produkte</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Produktangebote</p>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/seller/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Neues Produkt
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Gesamt Produkte</p>
                  <p className="text-2xl font-bold">{sellerProducts.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktive Produkte</p>
                  <p className="text-2xl font-bold text-green-600">
                    {sellerProducts.filter((p) => p.status === "active").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ausverkauft</p>
                  <p className="text-2xl font-bold text-red-600">
                    {sellerProducts.filter((p) => p.status === "out_of_stock").length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Gesamt Verkäufe</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {sellerProducts.reduce((sum, p) => sum + p.sold, 0)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Produkte suchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="out_of_stock">Ausverkauft</SelectItem>
                  <SelectItem value="draft">Entwurf</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Kategorie filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kategorien</SelectItem>
                  <SelectItem value="Men's Fashion">Herrenmode</SelectItem>
                  <SelectItem value="Women's Fashion">Damenmode</SelectItem>
                  <SelectItem value="Accessories">Accessoires</SelectItem>
                  <SelectItem value="Home & Garden">Haus & Garten</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredProducts.map((product, index) => (
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
                    width={120}
                    height={120}
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
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <Badge variant="outline" className="mb-2">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" title="Anzeigen">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Bearbeiten">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
                      <div className="font-semibold">
                        {product.rating} ⭐ ({product.reviews})
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Erstellt:</span>
                      <div className="font-semibold">{new Date(product.createdAt).toLocaleDateString("de-DE")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Keine Produkte gefunden</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Versuchen Sie, Ihre Filter zu ändern."
                : "Sie haben noch keine Produkte erstellt."}
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/seller/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Erstes Produkt erstellen
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
