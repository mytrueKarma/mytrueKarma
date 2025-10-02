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

const wishlistItems = [
  {
    id: 1,
    name: "mytrueKarma Herren T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "/mytruekarma-men-s-t-shirt.jpg",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    addedDate: "2024-01-15",
    tags: ["Bio", "Fair Trade"],
  },
  {
    id: 2,
    name: "mytrueKarma Damen T-Shirt",
    price: 27.99,
    originalPrice: 35.99,
    image: "/mytruekarma-women-s-t-shirt.jpg",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    addedDate: "2024-01-10",
    tags: ["Bio", "Vegan"],
  },
  {
    id: 3,
    name: "Premium Kaffeetasse",
    price: 19.99,
    originalPrice: 24.99,
    image: "/premium-coffee-mug-mytruekarma.jpg",
    rating: 4.7,
    reviews: 156,
    inStock: false,
    addedDate: "2024-01-05",
    tags: ["Keramik", "Handgefertigt"],
  },
];

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [items, setItems] = useState(wishlistItems);
  const [removingItem, setRemovingItem] = useState<number | null>(null);

  const handleRemoveItem = (id: number) => {
    setRemovingItem(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingItem(null);
    }, 300);
  };

  const handleAddToCart = (item: (typeof wishlistItems)[0]) => {
    if (item.inStock) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        inStock: item.inStock,
      });
    }
  };

  const handleAddAllToCart = () => {
    items
      .filter((item) => item.inStock)
      .forEach((item) => {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          inStock: item.inStock,
        });
      });
  };

  if (items.length === 0) {
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
            {items.length} {items.length === 1 ? "Artikel" : "Artikel"} in Ihrer
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
            disabled={!items.some((item) => item.inStock)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Alle verfügbaren in den Warenkorb
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
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
                {item.originalPrice > item.price && (
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
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
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
                  ({item.reviews})
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-green-600">
                  €{item.price}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    €{item.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Hinzugefügt am{" "}
                {new Date(item.addedDate).toLocaleDateString("de-DE")}
              </p>
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
