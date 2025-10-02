"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, ShoppingCart, Heart, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "mytrueKarma Herren T-Shirt",
    price: 39.0,
    originalPrice: 49.0,
    rating: 4.8,
    reviews: 156,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T812A2PA5886PT17X8Y12D341218728W32899H42315/views/1,width=650,height=650,appearanceId=2,backgroundColor=ffffff,crop=detail,modelId=85/ein-modernes-design-der-duesseldorfer-skyline-kombiniert-mit-dem-logo-von-x-perfekt-fuer-fans-und-liebhaber-der-stadt-am-rhein.jpg",
    category: "Herrenmode",
    inStock: true,
  },
  {
    id: 2,
    name: "mytrueKarma Damen T-Shirt",
    price: 24.99,
    originalPrice: 37.99,
    rating: 4.7,
    reviews: 203,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T813A803PA5870PT17X0Y3D303055792W27793H33352/views/1,width=650,height=650,appearanceId=803,backgroundColor=ffffff,crop=detail,modelId=5468/exklusives-design-schnappen-sie-sich-dieses-schoene-design-als-geschenk-fuer-einen-freund-in-ihrer-naehe-fuer-jeden-unterstuetzer-der-sozialen-bewegung-u.jpg",
    category: "Damenmode",
    inStock: true,
  },
  {
    id: 3,
    name: "Crossbody Tasche 'Planet Whale'",
    price: 27.0,
    originalPrice: 35.0,
    rating: 4.6,
    reviews: 89,
    image:
      "https://i0.wp.com/mytruekarma.com/wp-content/uploads/2024/04/all-over-print-utility-crossbody-bag-white-front-661532e26a196.jpg",
    category: "Accessoires",
    inStock: true,
  },
  {
    id: 4,
    name: "Exklusive Design Kollektion",
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviews: 127,
    image: "/exclusive-social-design-merchandise.jpg",
    category: "Exklusiv",
    inStock: false,
  },
  {
    id: 5,
    name: "Premium Kaffeetasse",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.2,
    reviews: 67,
    image: "/premium-coffee-mug-mytruekarma.jpg",
    category: "Haushalt",
    inStock: true,
  },
  {
    id: 6,
    name: "Ergonomischer Bürostuhl",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 45,
    image: "/ergonomic-office-chair.png",
    category: "Möbel",
    inStock: true,
  },
];

const categories = [
  "Herrenmode",
  "Damenmode",
  "Accessoires",
  "Haushalt",
  "Möbel",
  "Sport",
  "Exklusiv",
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0]
  ) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();

    if (!product.inStock) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: product.inStock,
    });

    toast({
      title: "In den Warenkorb gelegt!",
      description: `${product.name} wurde zu Ihrem Warenkorb hinzugefügt.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`lg:w-64 space-y-6 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Filter</h3>

            {/* Search */}
            <div className="space-y-2">
              <Label>Produkte suchen</Label>
              <Input
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Kategorien</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label htmlFor={category} className="text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Preisbereich</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Produkte</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} Produkte gefunden
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sortieren nach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Empfohlen</SelectItem>
                  <SelectItem value="price-low">
                    Preis: Niedrig zu Hoch
                  </SelectItem>
                  <SelectItem value="price-high">
                    Preis: Hoch zu Niedrig
                  </SelectItem>
                  <SelectItem value="rating">Bestbewertet</SelectItem>
                  <SelectItem value="newest">Neueste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? "In den Warenkorb" : "Nicht verfügbar"}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Keine Produkte gefunden, die Ihren Kriterien entsprechen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
