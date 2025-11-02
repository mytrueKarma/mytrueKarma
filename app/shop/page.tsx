"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShoppingCart,
  Heart,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Home,
  Building,
  Bed,
  Bath,
  Maximize,
  Zap,
  HeartHandshake,
  User,
  Tag,
  CheckCircle,
  Plane,
  Hotel as HotelIcon,
  UtensilsCrossed,
  Car,
  Palmtree,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-products";
import { ProductStore } from "@/lib/products-store";

const categories = [
  "Herrenmode",
  "Damenmode",
  "Accessoires",
  "Haushalt",
  "Möbel",
  "Sport",
  "Exklusiv",
  "Travel",
  "Immobilien",
  "Events",
  "Services",
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { products: allProducts, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedTravel, setSelectedTravel] = useState<any>(null);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) => {
        // Spezielle Behandlung für type-basierte "Kategorien"
        if (cat === "Events") return product.type === "event";
        if (cat === "Immobilien") return product.type === "immobilie";
        if (cat === "Services") return product.type === "service";
        // Normale Kategorie-Filterung
        return product.category === cat;
      });

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
    product: (typeof allProducts)[0]
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
            <div className="space-y-3">
              <Label>Preisbereich</Label>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label
                    htmlFor="minPrice"
                    className="text-xs text-muted-foreground"
                  >
                    Min. Preis
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      €
                    </span>
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="0"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value));
                        setPriceRange([value, priceRange[1]]);
                      }}
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="maxPrice"
                    className="text-xs text-muted-foreground"
                  >
                    Max. Preis
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      €
                    </span>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="2000000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Math.max(
                          priceRange[0],
                          Number(e.target.value)
                        );
                        setPriceRange([priceRange[0], value]);
                      }}
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000000}
                    step={1000}
                    className="w-full"
                  />
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
              <div
                key={product.id}
                onClick={() => {
                  if (product.type === "event") {
                    setSelectedEvent(product);
                  } else if (product.type === "immobilie") {
                    setSelectedProperty(product);
                  } else if (product.type === "service") {
                    setSelectedService(product);
                  } else if (product.category === "Travel") {
                    setSelectedTravel(product);
                  }
                }}
              >
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
                      {product.type === "event" && (
                        <Badge className="absolute top-2 left-2 bg-purple-600">
                          Event
                        </Badge>
                      )}
                      {product.type === "immobilie" && (
                        <Badge className="absolute top-2 left-2 bg-blue-600">
                          Immobilie
                        </Badge>
                      )}
                      {product.category === "Travel" && (
                        <Badge className="absolute top-2 left-2 bg-cyan-600">
                          <Plane className="h-3 w-3 mr-1" />
                          Reise
                        </Badge>
                      )}
                      {product.discount && product.discount > 0 && (
                        <Badge className="absolute top-2 right-12 bg-red-500">
                          -{product.discount}%
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
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
                        {product.priceType && (
                          <span className="text-sm font-normal">
                            /{product.priceType}
                          </span>
                        )}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e, product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.type === "event"
                        ? "Ticket kaufen"
                        : product.type === "immobilie"
                        ? "Anfrage stellen"
                        : product.type === "service"
                        ? "Service buchen"
                        : product.category === "Travel"
                        ? "Jetzt buchen"
                        : product.inStock
                        ? "In den Warenkorb"
                        : "Nicht verfügbar"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
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

      {/* Event Dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedEvent.name}
                </DialogTitle>
                <DialogDescription>
                  Alle Details zu diesem Event
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Datum</p>
                      <p className="font-medium">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Uhrzeit</p>
                      <p className="font-medium">{selectedEvent.time} Uhr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ort</p>
                      <p className="font-medium">{selectedEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Teilnehmer
                      </p>
                      <p className="font-medium">
                        {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Beschreibung</h3>
                  <p className="text-muted-foreground">
                    {selectedEvent.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Veranstalter
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedEvent.organizer}
                  </p>
                </div>

                {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5 text-green-600" />
                    Social Impact
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.socialImpact}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Preis pro Ticket
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedEvent.price === 0
                        ? "Kostenlos"
                        : `€${selectedEvent.price}`}
                    </p>
                  </div>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(e, selectedEvent);
                      setSelectedEvent(null);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ticket kaufen
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Property Dialog */}
      <Dialog
        open={!!selectedProperty}
        onOpenChange={() => setSelectedProperty(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedProperty.name}
                </DialogTitle>
                <DialogDescription>
                  Alle Details zu dieser Immobilie
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedProperty.image}
                    alt={selectedProperty.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Typ</p>
                      <p className="font-medium">
                        {selectedProperty.propertyType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Zweck</p>
                      <p className="font-medium">{selectedProperty.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lage</p>
                      <p className="font-medium">{selectedProperty.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Größe</p>
                      <p className="font-medium">{selectedProperty.size} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Zimmer</p>
                      <p className="font-medium">{selectedProperty.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Badezimmer
                      </p>
                      <p className="font-medium">
                        {selectedProperty.bathrooms}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Beschreibung</h3>
                  <p className="text-muted-foreground">
                    {selectedProperty.description}
                  </p>
                </div>

                {selectedProperty.features &&
                  selectedProperty.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Ausstattung
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProperty.features.map((feature: string) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5 text-blue-600" />
                    Social Impact
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProperty.socialImpact}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {selectedProperty.purpose === "Vermietung"
                        ? "Miete"
                        : "Preis"}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      €{selectedProperty.price.toLocaleString()}
                      {selectedProperty.priceType && (
                        <span className="text-sm font-normal">
                          /{selectedProperty.priceType}
                        </span>
                      )}
                    </p>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(e, selectedProperty);
                      setSelectedProperty(null);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Anfrage stellen
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedService.name}
                </DialogTitle>
                <DialogDescription>
                  von {selectedService.provider}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedService.image || "/placeholder-user.jpg"}
                    alt={selectedService.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{selectedService.category}</Badge>
                  {selectedService.verified && (
                    <Badge className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verifiziert
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedService.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Standort
                        </p>
                        <p className="font-medium">
                          {selectedService.location}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bewertung</p>
                      <p className="font-medium">
                        {selectedService.rating} ({selectedService.reviews}{" "}
                        Bewertungen)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Beschreibung</h3>
                  <p className="text-muted-foreground">
                    {selectedService.description}
                  </p>
                </div>

                {selectedService.tags && selectedService.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5 text-purple-600" />
                    Social Impact
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedService.socialImpact}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {selectedService.hourlyRate ? "Stundensatz" : "Preis"}
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      €{selectedService.price}
                      {selectedService.hourlyRate && (
                        <span className="text-sm font-normal">/Stunde</span>
                      )}
                    </p>
                  </div>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(e, selectedService);
                      setSelectedService(null);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Service buchen
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Travel Dialog */}
      <Dialog
        open={!!selectedTravel}
        onOpenChange={() => setSelectedTravel(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTravel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <Plane className="h-6 w-6 text-cyan-600" />
                  {selectedTravel.destination}
                </DialogTitle>
                <DialogDescription>{selectedTravel.hotel}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="relative h-80 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedTravel.image}
                    alt={selectedTravel.destination}
                    fill
                    className="object-cover"
                  />
                  {selectedTravel.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      -{selectedTravel.discount}%
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-cyan-600">
                    {selectedTravel.travelType}
                  </Badge>
                  <Badge variant="secondary">
                    {selectedTravel.nights} Nächte
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-cyan-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Reiseziel</p>
                      <p className="font-medium text-sm">
                        {selectedTravel.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HotelIcon className="h-5 w-5 text-cyan-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Hotel</p>
                      <p className="font-medium text-sm">
                        {selectedTravel.hotel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dauer</p>
                      <p className="font-medium text-sm">
                        {selectedTravel.nights} Nächte
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bewertung</p>
                      <p className="font-medium text-sm">
                        {selectedTravel.rating} ({selectedTravel.reviews})
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Beschreibung</h3>
                  <p className="text-muted-foreground">
                    {selectedTravel.description}
                  </p>
                </div>

                {selectedTravel.included &&
                  selectedTravel.included.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Im Preis enthalten
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedTravel.included.map((item: string) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 bg-green-50 dark:bg-green-950 p-2 rounded-lg"
                          >
                            {item === "Flug" && (
                              <Plane className="h-4 w-4 text-green-600" />
                            )}
                            {item === "Hotel" && (
                              <HotelIcon className="h-4 w-4 text-green-600" />
                            )}
                            {(item === "Frühstück" ||
                              item === "Halbpension" ||
                              item === "Vollpension" ||
                              item === "All Inclusive") && (
                              <UtensilsCrossed className="h-4 w-4 text-green-600" />
                            )}
                            {item === "Transfer" && (
                              <Car className="h-4 w-4 text-green-600" />
                            )}
                            {!["Flug", "Hotel", "Transfer"].includes(item) &&
                              ![
                                "Frühstück",
                                "Halbpension",
                                "Vollpension",
                                "All Inclusive",
                              ].includes(item) && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 p-6 rounded-lg border border-cyan-200 dark:border-cyan-800">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                    <HeartHandshake className="h-5 w-5" />
                    Social Impact - Mit gutem Gewissen reisen
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedTravel.socialImpact}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
                    <Palmtree className="h-4 w-4" />
                    <span>
                      Bei jeder Buchung unterstützt du soziale und
                      Umweltprojekte
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Preis pro Person
                      </p>
                      <div className="flex items-center gap-3">
                        {selectedTravel.originalPrice >
                          selectedTravel.price && (
                          <span className="text-lg text-muted-foreground line-through">
                            €{selectedTravel.originalPrice}
                          </span>
                        )}
                        <span className="text-3xl font-bold text-cyan-600">
                          €{selectedTravel.price}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        inkl. aller Gebühren und Steuern
                      </p>
                    </div>
                    {selectedTravel.discount && (
                      <div className="text-right">
                        <p className="text-sm text-green-600 font-semibold">
                          Sie sparen
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          €{selectedTravel.originalPrice - selectedTravel.price}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full h-14 text-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(e, selectedTravel);
                      setSelectedTravel(null);
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Jetzt buchen
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Kostenlose Stornierung bis 14 Tage vor Reiseantritt
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
