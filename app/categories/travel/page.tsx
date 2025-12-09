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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShoppingCart,
  Heart,
  Search,
  MapPin,
  Calendar,
  Users,
  Plane,
  Umbrella,
  Building2,
  Mountain,
  Palmtree,
  Ship,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Hotel as HotelIcon,
  Car,
  Compass,
  HeartHandshake,
  CheckCircle,
  UtensilsCrossed,
  PawPrint,
  Dog,
  Cat,
  Home,
  Shield,
  Clock,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-products";

const travelProducts = [
  {
    id: 10,
    name: "Reise-Kulturbeutel Set",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviews: 78,
    image: "/accessories-bags-social.jpg",
    inStock: true,
  },
  {
    id: 11,
    name: "Universal Reiseadapter",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 156,
    image: "/accessories-bags-social.jpg",
    inStock: true,
  },
  {
    id: 12,
    name: "Nackenkissen Memory Foam",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviews: 203,
    image: "/accessories-bags-social.jpg",
    inStock: true,
  },
];

const popularDestinations = [
  {
    id: 1,
    name: "Malediven",
    subtitle: "Traumhafte Strände & Luxus",
    image: "/destination-maldives.jpg",
    price: "ab 899€",
    rating: 4.8,
    deals: 127,
    category: "Strand",
    gradient: "from-blue-500/90 to-cyan-500/90",
  },
  {
    id: 2,
    name: "Paris",
    subtitle: "Stadt der Liebe",
    image: "/destination-paris.jpg",
    price: "ab 299€",
    rating: 4.7,
    deals: 284,
    category: "Stadt",
    gradient: "from-purple-500/90 to-pink-500/90",
  },
  {
    id: 3,
    name: "Bali",
    subtitle: "Abenteuer & Kultur",
    image: "/destination-bali.jpg",
    price: "ab 799€",
    rating: 4.9,
    deals: 156,
    category: "Abenteuer",
    gradient: "from-green-500/90 to-emerald-500/90",
  },
  {
    id: 4,
    name: "Dubai",
    subtitle: "Luxus & Modernität",
    image: "/destination-dubai.jpg",
    price: "ab 599€",
    rating: 4.6,
    deals: 198,
    category: "Luxus",
    gradient: "from-amber-500/90 to-orange-500/90",
  },
];

const travelCategories = [
  {
    icon: Umbrella,
    title: "Strandurlaub",
    description: "Sonne, Meer & Entspannung",
    color: "bg-blue-500",
    deals: 5,
  },
  {
    icon: Building2,
    title: "Städtereisen",
    description: "Kultur & Sightseeing",
    color: "bg-purple-500",
    deals: 8,
  },
  {
    icon: Mountain,
    title: "Berge & Natur",
    description: "Wandern & Abenteuer",
    color: "bg-green-500",
    deals: 2,
  },
  {
    icon: Ship,
    title: "Kreuzfahrten",
    description: "Luxus auf hoher See",
    color: "bg-cyan-500",
    deals: 5,
  },
  {
    icon: Palmtree,
    title: "Last Minute",
    description: "Spontan verreisen",
    color: "bg-orange-500",
    deals: 9,
  },
  {
    icon: Sparkles,
    title: "Wellness",
    description: "Entspannung pur",
    color: "bg-pink-500",
    deals: 5,
  },
];

const petCareServices = [
  {
    id: 1,
    name: "Hundehotel Premium",
    subtitle: "5-Sterne Betreuung für Ihren Vierbeiner",
    price: 45,
    priceUnit: "pro Tag",
    rating: 4.9,
    reviews: 234,
    image: "/pet-care-dog.jpg",
    features: [
      "24/7 Betreuung",
      "Große Auslaufflächen",
      "Tierarzt vor Ort",
      "Tägliche Updates",
    ],
    type: "Hund",
    icon: Dog,
    color: "bg-amber-500",
    gradient: "from-amber-500/90 to-orange-500/90",
  },
  {
    id: 2,
    name: "Katzenpension Samtpfote",
    subtitle: "Geborgenheit für Ihre Katze",
    price: 35,
    priceUnit: "pro Tag",
    rating: 4.8,
    reviews: 189,
    image: "/pet-care-cat.jpg",
    features: ["Einzelzimmer", "Katzengarten", "Spielstunden", "Foto-Updates"],
    type: "Katze",
    icon: Cat,
    color: "bg-purple-500",
    gradient: "from-purple-500/90 to-pink-500/90",
  },
  {
    id: 3,
    name: "Mobile Tierbetreuung",
    subtitle: "Betreuung in Ihrem Zuhause",
    price: 30,
    priceUnit: "pro Besuch",
    rating: 4.7,
    reviews: 156,
    image: "/pet-care-home.jpg",
    features: [
      "2x täglich",
      "Gassi-Service",
      "Fütterung",
      "Pflanzenpflege inkl.",
    ],
    type: "Alle Tiere",
    icon: Home,
    color: "bg-green-500",
    gradient: "from-green-500/90 to-emerald-500/90",
  },
  {
    id: 4,
    name: "Tiersitter-Vermittlung",
    subtitle: "Vertrauensvolle Betreuung finden",
    price: 25,
    priceUnit: "pro Tag",
    rating: 4.6,
    reviews: 298,
    image: "/pet-care-sitter.jpg",
    features: [
      "Geprüfte Sitter",
      "Versicherung inkl.",
      "Video-Calls",
      "Flexible Zeiten",
    ],
    type: "Alle Tiere",
    icon: Shield,
    color: "bg-blue-500",
    gradient: "from-blue-500/90 to-cyan-500/90",
  },
];

export default function TravelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTravel, setSelectedTravel] = useState<any>(null);
  const [selectedPetCare, setSelectedPetCare] = useState<any>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { products: allProducts } = useProducts();

  // Filter nur Travel-Produkte
  const travelDeals = allProducts.filter((p) => p.category === "Travel");

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
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
      title: "Reise gebucht!",
      description: `${product.destination} wurde zu Ihrem Warenkorb hinzugefügt.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section mit Suchformular */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/travel-hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                Mit gutem Gewissen reisen
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Dein Traumurlaub
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                mit Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              50% der Erlöse unterstützen soziale Projekte weltweit
            </p>
          </div>

          {/* Suchformular */}
          <Card className="max-w-5xl mx-auto shadow-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Wohin?
                  </label>
                  <Input
                    placeholder="Reiseziel eingeben..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Hinreise
                  </label>
                  <Input type="date" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Rückreise
                  </label>
                  <Input type="date" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <Users className="h-4 w-4 inline mr-2" />
                    Reisende
                  </label>
                  <Input
                    type="number"
                    placeholder="2"
                    min="1"
                    className="h-12"
                  />
                </div>
              </div>
              <Button className="w-full mt-6 h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Search className="h-5 w-5 mr-2" />
                Traumreise finden
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link href="/categories/travel#hotels">
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <HotelIcon className="h-4 w-4 mr-2" />
                Hotels
              </Button>
            </Link>
            <Link href="/categories/travel#flights">
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <Plane className="h-4 w-4 mr-2" />
                Flüge
              </Button>
            </Link>
            <Link href="/categories/travel#cars">
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <Car className="h-4 w-4 mr-2" />
                Mietwagen
              </Button>
            </Link>
            <Link href="/categories/travel#cruises">
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <Ship className="h-4 w-4 mr-2" />
                Kreuzfahrten
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Angebote */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Top Angebote</h2>
            <p className="text-lg text-muted-foreground">
              Die besten Deals für deinen nächsten Traumurlaub
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="#all-deals">
              Alle Angebote
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelDeals.slice(0, 3).map((deal) => (
            <Card
              key={deal.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => setSelectedTravel(deal)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.destination || deal.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  -{deal.discount}%
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {deal.destination}
                  </h3>
                  <p className="text-white/90 text-sm">{deal.hotel}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(deal.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{deal.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({deal.reviews} Bewertungen)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {deal.included?.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {deal.nights} Nächte
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">
                        €{deal.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        €{deal.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">pro Person</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Jetzt buchen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Beliebte Reiseziele */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Beliebte Reiseziele</h2>
          <p className="text-lg text-muted-foreground">
            Entdecke die schönsten Orte der Welt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-0"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} group-hover:opacity-75 transition-opacity`}
                ></div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-medium">
                    {destination.deals} Angebote
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className="mb-3 bg-white/20 backdrop-blur-sm border-0 text-white">
                    {destination.category}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-white/90 mb-3">{destination.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {destination.rating}
                      </span>
                    </div>
                    <span className="text-2xl font-bold">
                      {destination.price}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Reise-Kategorien */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Reise nach deinem Stil</h2>
          <p className="text-lg text-muted-foreground">
            Finde die perfekte Reise für deine Bedürfnisse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelCategories.map((category) => (
            <Card
              key={category.title}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50"
            >
              <CardContent className="p-8">
                <div
                  className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    {category.deals} Angebote
                  </span>
                  <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Alle Reise-Deals */}
      <section
        id="all-deals"
        className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Exklusive Angebote</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Alle Reise-Deals</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecke unsere komplette Auswahl an traumhaften Reisezielen mit
            Social Impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {travelDeals.map((deal) => (
            <Card
              key={deal.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => setSelectedTravel(deal)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.destination || deal.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {deal.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                    -{deal.discount}%
                  </div>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white text-xs">
                    {deal.travelType}
                  </Badge>
                  <h3 className="text-white text-lg font-bold mb-1 line-clamp-1">
                    {deal.destination}
                  </h3>
                  <p className="text-white/90 text-xs line-clamp-1">
                    {deal.hotel}
                  </p>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(deal.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium">{deal.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({deal.reviews})
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {deal.included?.slice(0, 3).map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>

                {/* Social Impact Mini Badge */}
                {deal.socialImpact && (
                  <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center gap-1 text-xs text-green-700">
                      <HeartHandshake className="h-3 w-3" />
                      <span className="font-medium line-clamp-1">
                        {deal.socialImpact}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {deal.nights} Nächte
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-green-600">
                        €{deal.price}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        €{deal.originalPrice}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Buchen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {travelDeals.length === 0 && (
          <div className="text-center py-12">
            <Plane className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2">
              Keine Angebote gefunden
            </h3>
            <p className="text-muted-foreground">
              Aktuell sind keine Reise-Deals verfügbar. Schauen Sie bald wieder
              vorbei!
            </p>
          </div>
        )}
      </section>

      {/* Tierbetreuung während der Reise */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-4 py-2 rounded-full mb-4">
            <PawPrint className="h-4 w-4" />
            <span className="text-sm font-medium">Für Tierbesitzer</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Dein Haustier in guten Händen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Genieße deinen Urlaub sorgenfrei – wir kümmern uns liebevoll um
            deine Vierbeiner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {petCareServices.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-0"
              onClick={() => setSelectedPetCare(service)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${service.gradient} group-hover:opacity-75 transition-opacity`}
                ></div>

                <div
                  className={`absolute top-4 left-4 ${service.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <Badge className="mb-2 bg-white/20 backdrop-blur-sm border-0 text-white text-xs">
                    {service.type}
                  </Badge>
                  <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                  <p className="text-white/90 text-sm mb-2">
                    {service.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {service.rating}
                      </span>
                      <span className="text-xs text-white/80">
                        ({service.reviews})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">
                        €{service.price}
                      </span>
                      <span className="text-xs block text-white/80">
                        {service.priceUnit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full ${service.color} hover:opacity-90`}>
                  Jetzt anfragen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info-Banner */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Für den guten Zweck</h3>
                <p className="text-muted-foreground">
                  Von jedem Euro, den du für Tierbetreuung ausgibst, geht ein
                  Teil an Tierschutzprojekte und Tierheime. Gemeinsam machen wir
                  das Leben von Tieren besser!
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link href="/transparency">
                  <Button variant="outline" size="lg">
                    <PawPrint className="h-5 w-5 mr-2" />
                    Unsere Projekte
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Große Shiny Card - Special Offer */}
      <section className="container mx-auto px-4 py-16">
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite] -skew-x-12"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <CardContent className="relative z-10 p-12 md:p-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Icon Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 animate-pulse">
                <Dog className="h-6 w-6 text-yellow-300" />
                <span className="text-lg font-bold">Neu für Hundebesitzer</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Entdecke Deutschlands schönste perfekt für dich
                <span className="block text-yellow-300 mt-2">
                  ... und deinen Hund!
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl md:text-2xl opacity-95 mb-8 leading-relaxed max-w-3xl mx-auto">
                Über{" "}
                <strong className="text-yellow-300 text-3xl">
                  320 Aussichtspunkte
                </strong>{" "}
                in 16 Bundesländern mit Informationen zu Hundepensionen in der
                Nähe. Plane den perfekten Ausflug für dich und deinen
                Vierbeiner!
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-yellow-300" />
                  </div>
                  <p className="font-bold text-lg mb-2">320+ Aussichtspunkte</p>
                  <p className="text-sm opacity-90">in ganz Deutschland</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PawPrint className="h-8 w-8 text-yellow-300" />
                  </div>
                  <p className="font-bold text-lg mb-2">Hundefreundlich</p>
                  <p className="text-sm opacity-90">geprüfte Wanderwege</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-yellow-300" />
                  </div>
                  <p className="font-bold text-lg mb-2">Hundepensionen</p>
                  <p className="text-sm opacity-90">in der Nähe finden</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://happy-dog-sights.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-yellow-300 hover:text-emerald-700 font-bold text-lg h-16 px-10 shadow-2xl transform hover:scale-110 transition-all duration-300 group"
                  >
                    <Compass className="h-6 w-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                    Aussichtspunkte entdecken
                    <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </a>
              </div>

              {/* Trust Badge */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-yellow-300" />
                  <span>16 Bundesländer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dog className="h-5 w-5 text-yellow-300" />
                  <span>100% hundefreundlich</span>
                </div>
              </div>

              {/* Additional Info Banner */}
              <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <p className="font-bold text-lg">Besonderes Feature</p>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  Finde nicht nur die schönsten Aussichtspunkte, sondern auch
                  hundefreundliche Unterkünfte und Pensionen in der Nähe.
                  Perfekt für Wochenendausflüge und Urlaubsplanung mit deinem
                  vierbeinigen Freund!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add CSS animation for shimmer effect */}
        <style jsx global>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
            }
          }
        `}</style>
      </section>

      {/* Reise-Accessoires */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            <Compass className="h-4 w-4" />
            <span className="text-sm font-medium">Reise-Essentials</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Perfekt ausgestattet</h2>
          <p className="text-lg text-muted-foreground">
            Praktische Reise-Accessoires für dein nächstes Abenteuer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-0">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <Badge
                        variant="secondary"
                        className="absolute top-4 left-4"
                      >
                        Nicht verfügbar
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.originalPrice > product.price && (
                      <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                        -
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <CardTitle className="text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 mb-3">
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
                  <div className="flex items-center gap-2 mb-4">
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
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
          <CardContent className="p-12 md:p-16 text-center relative z-10">
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Reise mit gutem Gewissen
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              50% unserer Einnahmen fließen direkt in soziale Projekte weltweit.
              Gemeinsam machen wir die Welt zu einem besseren Ort – eine Reise
              nach der anderen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/transparency">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg h-14 px-8"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Unsere Projekte entdecken
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8 border-white text-white hover:bg-white/20"
                >
                  Mehr über uns erfahren
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

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

      {/* Pet Care Dialog */}
      <Dialog
        open={!!selectedPetCare}
        onOpenChange={() => setSelectedPetCare(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPetCare && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <selectedPetCare.icon className="h-6 w-6 text-amber-600" />
                  {selectedPetCare.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedPetCare.subtitle}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="relative h-80 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedPetCare.image}
                    alt={selectedPetCare.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${selectedPetCare.gradient} opacity-60`}
                  ></div>
                  <div
                    className={`absolute top-4 left-4 ${selectedPetCare.color} px-4 py-2 rounded-full text-white font-semibold flex items-center gap-2`}
                  >
                    <selectedPetCare.icon className="h-5 w-5" />
                    {selectedPetCare.type}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <Clock className="h-8 w-8 text-amber-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Preis</p>
                      <p className="font-bold">
                        €{selectedPetCare.price} {selectedPetCare.priceUnit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bewertung</p>
                      <p className="font-bold">
                        {selectedPetCare.rating} ({selectedPetCare.reviews}{" "}
                        Bewertungen)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Leistungen im Überblick
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPetCare.features.map(
                      (feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-green-50 dark:bg-green-950 p-3 rounded-lg"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <PawPrint className="h-5 w-5" />
                    Social Impact - Gemeinsam für Tiere
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    50% der Einnahmen aus dieser Buchung fließen direkt in
                    Tierschutzprojekte und lokale Tierheime. Damit hilfst du
                    nicht nur deinem eigenen Haustier, sondern auch Tieren in
                    Not.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                    <HeartHandshake className="h-4 w-4" />
                    <span>Jede Buchung macht einen Unterschied</span>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Preis
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-amber-600">
                          €{selectedPetCare.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {selectedPetCare.priceUnit}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        inkl. MwSt. und Versicherung
                      </p>
                    </div>
                  </div>
                  <Button
                    className={`w-full h-14 text-lg ${selectedPetCare.color} hover:opacity-90`}
                    onClick={() => {
                      toast({
                        title: "Anfrage gesendet!",
                        description: `Wir melden uns in Kürze bezüglich ${selectedPetCare.name}.`,
                      });
                      setSelectedPetCare(null);
                    }}
                  >
                    <PawPrint className="h-5 w-5 mr-2" />
                    Jetzt anfragen
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Kostenlose Stornierung bis 48 Stunden vor Betreuungsbeginn
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
