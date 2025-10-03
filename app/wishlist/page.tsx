"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Trash2, Share2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useToast } from "@/hooks/use-toast";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [removingItem, setRemovingItem] = useState<number | null>(null);

  const handleRemoveItem = (id: number) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeFromWishlist(id);
      setRemovingItem(null);
      toast({
        title: "Von Wunschliste entfernt",
        description: "Das Produkt wurde von Ihrer Wunschliste entfernt.",
      });
    }, 300);
  };

  const handleAddToCart = (item: any) => {
    if (item.inStock) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        inStock: item.inStock,
        category: item.category,
        provider: item.provider,
        serviceType: item.serviceType,
      });
      toast({
        title: "In den Warenkorb gelegt!",
        description: `${item.name} wurde zu Ihrem Warenkorb hinzugefügt.`,
      });
    }
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    inStockItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        inStock: item.inStock,
        category: item.category,
        provider: item.provider,
        serviceType: item.serviceType,
      });
    });
    if (inStockItems.length > 0) {
      toast({
        title: "Alle verfügbaren Artikel hinzugefügt!",
        description: `${inStockItems.length} Artikel wurden zu Ihrem Warenkorb hinzugefügt.`,
      });
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Ihre Wunschliste ist leer</h1>
          <p className="text-muted-foreground mb-6">
            Entdecken Sie unsere Produkte und fügen Sie Ihre Favoriten zur
            Wunschliste hinzu.
          </p>
          <Button asChild>
            <Link href="/shop">Produkte entdecken</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meine Wunschliste</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "Artikel" : "Artikel"} in Ihrer
            Wunschliste
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Teilen
          </Button>
          <Button
            onClick={handleAddAllToCart}
            disabled={!wishlistItems.some((item) => item.inStock)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Alle verfügbaren in den Warenkorb
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            className={`group hover:shadow-lg transition-all duration-300 ${
              removingItem === item.id
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            }`}
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white hover:scale-110 transition-all"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white hover:scale-110 transition-all"
                    asChild
                  >
                    <Link href={`/shop/${item.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    -
                    {Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100
                    )}
                    %
                  </Badge>
                )}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm">
                      Nicht verfügbar
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags &&
                  item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
              {item.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({item.reviews || 0})
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-green-600">
                  €{item.price}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    €{item.originalPrice}
                  </span>
                )}
              </div>
              {item.addedDate && (
                <p className="text-xs text-muted-foreground">
                  Hinzugefügt am{" "}
                  {new Date(item.addedDate).toLocaleDateString("de-DE")}
                </p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                className="flex-1 group-hover:scale-105 transition-transform"
                onClick={() => handleAddToCart(item)}
                disabled={!item.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {item.inStock ? "In den Warenkorb" : "Nicht verfügbar"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:scale-110 transition-transform bg-transparent"
              >
                <Link href={`/shop/${item.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
