"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Package,
  Plus,
  DollarSign,
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Star,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock data for seller products
const initialProducts = [
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
    description:
      "Handgefertigte Keramikvase aus nachhaltigem Material. Jedes Stück ist ein Unikat und wurde von lokalen Kunsthandwerkern gefertigt.",
    category: "Wohnaccessoires",
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
    description:
      "100% Bio-Baumwolle T-Shirt in fairer Produktion. Weich, atmungsaktiv und umweltfreundlich.",
    category: "Mode",
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
    description:
      "Nachhaltiger Handyständer aus FSC-zertifiziertem Holz. Perfekt für den Schreibtisch oder das Homeoffice.",
    category: "Zubehör",
  },
];

const salesData = {
  totalRevenue: 1247.85,
  totalOrders: 55,
  totalProducts: 12,
  averageRating: 4.7,
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState<
    (typeof initialProducts)[0] | null
  >(null);
  const [viewingProduct, setViewingProduct] = useState<
    (typeof initialProducts)[0] | null
  >(null);
  const [deletingProduct, setDeletingProduct] = useState<
    (typeof initialProducts)[0] | null
  >(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleViewProduct = (product: (typeof initialProducts)[0]) => {
    setViewingProduct(product);
    setViewDialogOpen(true);
  };

  const handleEditProduct = (product: (typeof initialProducts)[0]) => {
    setEditingProduct({ ...product });
    setEditDialogOpen(true);
  };

  const handleDeleteProduct = (product: (typeof initialProducts)[0]) => {
    setDeletingProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );

    toast({
      title: "Produkt aktualisiert",
      description: "Das Produkt wurde erfolgreich aktualisiert.",
    });

    setEditDialogOpen(false);
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;

    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));

    toast({
      title: "Produkt gelöscht",
      description: "Das Produkt wurde erfolgreich entfernt.",
      variant: "destructive",
    });

    setDeleteDialogOpen(false);
    setDeletingProduct(null);
  };

  if (!user) {
    return <div>Loading...</div>;
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
            <p className="text-muted-foreground">
              Verwalten Sie Ihre Produkte und verfolgen Sie Ihre Verkäufe
            </p>
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
              <CardTitle className="text-sm font-medium">
                Gesamtumsatz
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                €{salesData.totalRevenue}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% vom letzten Monat
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bestellungen
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {salesData.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                +8% vom letzten Monat
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produkte</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {salesData.totalProducts}
              </div>
              <p className="text-xs text-muted-foreground">3 aktive Produkte</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bewertung</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {salesData.averageRating}
              </div>
              <p className="text-xs text-muted-foreground">
                Durchschnittsbewertung
              </p>
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
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
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
                          product.status === "active"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {product.status === "active" ? "Aktiv" : "Ausverkauft"}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProduct(product)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                            className="hover:bg-green-50 hover:text-green-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Preis:</span>
                          <div className="font-semibold text-green-600">
                            €{product.price}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Lagerbestand:
                          </span>
                          <div className="font-semibold">{product.stock}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Verkauft:
                          </span>
                          <div className="font-semibold">{product.sold}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Bewertung:
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {product.rating}
                            </span>
                            <span className="text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Umsatz: €{(product.price * product.sold).toFixed(2)}
                        </span>
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
              <p className="text-muted-foreground">
                Hier werden Ihre aktuellen Bestellungen angezeigt.
              </p>
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
                Hier werden detaillierte Statistiken zu Ihren Verkäufen
                angezeigt.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Product Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Produktdetails</DialogTitle>
            <DialogDescription>
              Detaillierte Informationen zu Ihrem Produkt
            </DialogDescription>
          </DialogHeader>
          {viewingProduct && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <Image
                  src={viewingProduct.image || "/placeholder.svg"}
                  alt={viewingProduct.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold">
                    {viewingProduct.name}
                  </h3>
                  <Badge
                    className={
                      viewingProduct.status === "active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }
                  >
                    {viewingProduct.status === "active"
                      ? "Aktiv"
                      : "Ausverkauft"}
                  </Badge>
                  <p className="text-muted-foreground">
                    {viewingProduct.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Kategorie:</span>
                      <div className="font-semibold">
                        {viewingProduct.category}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Preis:</span>
                      <div className="font-semibold text-green-600">
                        €{viewingProduct.price}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Lagerbestand:
                      </span>
                      <div className="font-semibold">
                        {viewingProduct.stock}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Verkauft:</span>
                      <div className="font-semibold">{viewingProduct.sold}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Gesamtumsatz:
                      </span>
                      <div className="font-semibold text-green-600">
                        €
                        {(viewingProduct.price * viewingProduct.sold).toFixed(
                          2
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bewertung:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {viewingProduct.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({viewingProduct.reviews} Bewertungen)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Schließen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Produkt bearbeiten</DialogTitle>
            <DialogDescription>
              Ändern Sie die Details Ihres Produkts
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Produktname</Label>
                  <Input
                    id="name"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategorie</Label>
                  <Input
                    id="category"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct((prev) =>
                        prev ? { ...prev, category: e.target.value } : null
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preis (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct((prev) =>
                        prev
                          ? { ...prev, price: parseFloat(e.target.value) || 0 }
                          : null
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Lagerbestand</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct((prev) =>
                        prev
                          ? { ...prev, stock: parseInt(e.target.value) || 0 }
                          : null
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingProduct.status}
                    onChange={(e) =>
                      setEditingProduct((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: e.target.value as
                                | "active"
                                | "out_of_stock",
                            }
                          : null
                      )
                    }
                  >
                    <option value="active">Aktiv</option>
                    <option value="out_of_stock">Ausverkauft</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Abbrechen
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Produkt löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie "{deletingProduct?.name}" löschen
              möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
