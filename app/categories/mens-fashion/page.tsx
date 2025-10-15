"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mensProducts = [
  {
    id: 1,
    name: "mytrueKarma Herren T-Shirt",
    price: 39.0,
    originalPrice: 49.0,
    rating: 4.8,
    reviews: 156,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T812A2PA5886PT17X8Y12D341218728W32899H42315/views/1,width=650,height=650,appearanceId=2,backgroundColor=ffffff,crop=detail,modelId=85/ein-modernes-design-der-duesseldorfer-skyline-kombiniert-mit-dem-logo-von-x-perfekt-fuer-fans-und-liebhaber-der-stadt-am-rhein.jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Bio-Baumwolle Hemd",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviews: 89,
    image: "/organic-cotton-shirt.jpg",
    inStock: true,
  },
];

export default function MensFashionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" size="sm" className="mb-4" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-2">Men's Fashion</h1>
        <p className="text-muted-foreground">
          Entdecke nachhaltige Herrenmode mit sozialem Impact - 50% der Erlöse
          gehen an soziale Projekte
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mensProducts.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2"
                    >
                      Nicht verfügbar
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </CardTitle>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">
                    €{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      €{product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "In den Warenkorb" : "Nicht verfügbar"}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
