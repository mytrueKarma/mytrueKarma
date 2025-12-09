"use client";

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Euro,
  Star,
  Heart,
  ShoppingCart,
  Clock,
  CheckCircle,
  HandHeart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useProducts } from "@/hooks/use-products";

const categories = [
  "Alle",
  "IT & Tech",
  "Design",
  "Marketing",
  "Beratung",
  "Gesundheit",
  "Bildung",
  "Umwelt",
  "Soziales",
];

export default function ServicesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [priceFilter, setPriceFilter] = useState("Alle");
  const [selectedService, setSelectedService] = useState<any>(null);

  // Filter nur Services
  const allServices = products.filter((p) => p.type === "service");

  // Gefilterte Services
  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Alle" || service.category === selectedCategory;

    let matchesPrice = true;
    if (priceFilter === "Unter 50€") matchesPrice = service.price < 50;
    else if (priceFilter === "50€-100€")
      matchesPrice = service.price >= 50 && service.price <= 100;
    else if (priceFilter === "Über 100€") matchesPrice = service.price > 100;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (service: any) => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melden Sie sich an, um Services zu buchen.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
      inStock: service.inStock, // Ensure this property exists in the service object
    });

    toast({
      title: "Service hinzugefügt",
      description: `${service.name} wurde zum Warenkorb hinzugefügt.`,
    });
  };

  const toggleWishlist = (service: any) => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melden Sie sich an, um Services zu merken.",
        variant: "destructive",
      });
      return;
    }

    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id);
      toast({
        title: "Entfernt",
        description: `${service.name} wurde von der Wunschliste entfernt.`,
      });
    } else {
      addToWishlist({
        id: service.id,
        name: service.name,
        price: service.price,
        image: service.image,
        inStock: service.inStock, // Ensure this property exists in the service object
      });
      toast({
        title: "Gespeichert",
        description: `${service.name} wurde zur Wunschliste hinzugefügt.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services-social.jpg"
            alt="Services - Menschen helfen Menschen"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Services & Jobs
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
            Finden Sie nachhaltige Dienstleistungen oder Jobs mit sozialem
            Impact
          </p>

          {/* Quick Link to Admin */}
          <Link href="/admin/products/new">
            <Button size="lg" variant="secondary">
              Service inserieren
            </Button>
          </Link>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-card border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Service suchen..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Preis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alle">Alle Preise</SelectItem>
                <SelectItem value="Unter 50€">Unter 50€</SelectItem>
                <SelectItem value="50€-100€">50€ - 100€</SelectItem>
                <SelectItem value="Über 100€">Über 100€</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} Services gefunden
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Keine Services gefunden. Versuchen Sie andere Filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {service.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">
                            {service.image &&
                            service.image !== "/placeholder.svg" ? (
                              <Image
                                src={service.image}
                                alt={service.provider || "Provider"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                                {(service.provider || "?")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">{service.provider}</p>
                            {service.verified && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                <span className="text-xs">Verifiziert</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleWishlist(service)}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isInWishlist(service.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {/* Category Badge */}
                      <Badge variant="secondary">{service.category}</Badge>

                      {/* Location */}
                      {service.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{service.location}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>

                      {/* Tags */}
                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">
                            {service.rating || "5.0"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({service.reviews || 0} Bewertungen)
                        </span>
                      </div>

                      {/* Social Impact */}
                      {service.socialImpact && (
                        <div className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <HandHeart className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-green-700 dark:text-green-400">
                            {service.socialImpact}
                          </p>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <Euro className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold text-primary">
                          {service.price}€
                        </span>
                        {service.hourlyRate && (
                          <span className="text-sm text-muted-foreground">
                            /Stunde
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setSelectedService(service)}
                        >
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {selectedService?.name}
                          </DialogTitle>
                          <DialogDescription>
                            von {selectedService?.provider}
                          </DialogDescription>
                        </DialogHeader>

                        {selectedService && (
                          <div className="space-y-4">
                            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                              {selectedService.image &&
                              selectedService.image !== "/placeholder.svg" ? (
                                <Image
                                  src={selectedService.image}
                                  alt={selectedService.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <Image
                                  src="/services-social.jpg"
                                  alt={selectedService.name}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              <Badge>{selectedService.category}</Badge>
                              {selectedService.verified && (
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm">
                                    Verifizierter Anbieter
                                  </span>
                                </div>
                              )}
                            </div>

                            {selectedService.location && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{selectedService.location}</span>
                              </div>
                            )}

                            <div>
                              <h3 className="font-semibold mb-2">
                                Beschreibung
                              </h3>
                              <p className="text-muted-foreground">
                                {selectedService.description}
                              </p>
                            </div>

                            {selectedService.tags &&
                              selectedService.tags.length > 0 && (
                                <div>
                                  <h3 className="font-semibold mb-2">
                                    Skills & Expertise
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedService.tags.map(
                                      (tag: string, idx: number) => (
                                        <Badge key={idx} variant="secondary">
                                          {tag}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                            <div className="flex items-center gap-2">
                              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {selectedService.rating || "5.0"}
                              </span>
                              <span className="text-muted-foreground">
                                ({selectedService.reviews || 0} Bewertungen)
                              </span>
                            </div>

                            {selectedService.socialImpact && (
                              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <HandHeart className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <h3 className="font-semibold text-green-700 dark:text-green-400 mb-1">
                                      Sozialer Impact
                                    </h3>
                                    <p className="text-sm text-green-700 dark:text-green-400">
                                      {selectedService.socialImpact}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-baseline gap-2 pt-4 border-t">
                              <span className="text-3xl font-bold text-primary">
                                {selectedService.price}€
                              </span>
                              {selectedService.hourlyRate && (
                                <span className="text-muted-foreground">
                                  /Stunde
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button
                                className="flex-1"
                                onClick={() => handleAddToCart(selectedService)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buchen
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(service)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buchen
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Bieten Sie Ihre Services an
          </h2>
          <p className="text-lg mb-8">
            Erreichen Sie Kunden, die Wert auf Nachhaltigkeit und soziale
            Verantwortung legen
          </p>
          <Link href="/admin/products/new">
            <Button size="lg" variant="secondary">
              Jetzt Service inserieren
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
