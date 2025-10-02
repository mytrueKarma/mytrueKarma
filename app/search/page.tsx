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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, ShoppingCart, Heart, Search, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

const products = [
  {
    id: 1,
    name: "mytrueKarma Herren T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "/mytruekarma-men-s-t-shirt.jpg",
    rating: 4.8,
    reviews: 124,
    category: "Kleidung",
    tags: ["Bio", "Fair Trade", "Nachhaltig"],
  },
  {
    id: 2,
    name: "mytrueKarma Damen T-Shirt",
    price: 27.99,
    originalPrice: 35.99,
    image: "/mytruekarma-women-s-t-shirt.jpg",
    rating: 4.9,
    reviews: 89,
    category: "Kleidung",
    tags: ["Bio", "Fair Trade", "Vegan"],
  },
  {
    id: 3,
    name: "Premium Kaffeetasse",
    price: 19.99,
    originalPrice: 24.99,
    image: "/premium-coffee-mug-mytruekarma.jpg",
    rating: 4.7,
    reviews: 156,
    category: "Haushalt",
    tags: ["Keramik", "Handgefertigt", "Nachhaltig"],
  },
];

export default function SearchPage() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const allTags = Array.from(new Set(products.flatMap((p) => p.tags)));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => product.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesPrice && matchesTags;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0]
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: true,
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, 100]);
    setSelectedTags([]);
    setSortBy("relevance");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Suchen</label>
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

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Kategorie
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Preis: €{priceRange[0]} - €{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Filter zurücksetzen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Produktsuche</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {sortedProducts.length} Produkte gefunden
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sortieren nach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevanz</SelectItem>
                  <SelectItem value="price-low">
                    Preis: Niedrig zu Hoch
                  </SelectItem>
                  <SelectItem value="price-high">
                    Preis: Hoch zu Niedrig
                  </SelectItem>
                  <SelectItem value="rating">Bewertung</SelectItem>
                  <SelectItem value="reviews">Anzahl Bewertungen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Keine Produkte gefunden
                </h3>
                <p className="text-muted-foreground mb-4">
                  Versuchen Sie andere Suchbegriffe oder passen Sie Ihre Filter
                  an.
                </p>
                <Button onClick={clearFilters}>Filter zurücksetzen</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/80 hover:bg-white hover:scale-110 transition-all"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        {product.originalPrice > product.price && (
                          <Badge className="absolute top-2 left-2 bg-red-500">
                            -
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            %
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
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
                        <span className="text-2xl font-bold text-green-600">
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
                        className="w-full group-hover:scale-105 transition-transform"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        In den Warenkorb
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
