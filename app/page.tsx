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
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowRight,
  Users,
  ScanSearchIcon as TransparencyIcon,
  HandHeart,
  Target,
  TreePine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

const featuredProducts = [
  {
    id: 1,
    name: "mytrueKarma Men's T-Shirts",
    price: 39.0,
    originalPrice: 49.0,
    rating: 4.8,
    reviews: 156,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T812A2PA5886PT17X8Y12D341218728W32899H42315/views/1,width=650,height=650,appearanceId=2,backgroundColor=ffffff,crop=detail,modelId=85/ein-modernes-design-der-duesseldorfer-skyline-kombiniert-mit-dem-logo-von-x-perfekt-fuer-fans-und-liebhaber-der-stadt-am-rhein.jpg",
    badge: "Social Impact",
  },
  {
    id: 2,
    name: "mytrueKarma Women's T-Shirts",
    price: 24.99,
    originalPrice: 37.99,
    rating: 4.7,
    reviews: 203,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T813A803PA5870PT17X0Y3D303055792W27793H33352/views/1,width=650,height=650,appearanceId=803,backgroundColor=ffffff,crop=detail,modelId=5468/exklusives-design-schnappen-sie-sich-dieses-schoene-design-als-geschenk-fuer-einen-freund-in-ihrer-naehe-fuer-jeden-unterstuetzer-der-sozialen-bewegung-u.jpg",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Crossbody Bag 'Planet Whale'",
    price: 27.0,
    originalPrice: 35.0,
    rating: 4.6,
    reviews: 89,
    image:
      "https://i0.wp.com/mytruekarma.com/wp-content/uploads/2024/04/all-over-print-utility-crossbody-bag-white-front-661532e26a196.jpg",
    badge: "Eco-Friendly",
  },
  {
    id: 4,
    name: "Exclusive Design Collection",
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviews: 127,
    image: "/exclusive-social-design-merchandise.jpg",
    badge: "Limited Edition",
  },
];

const categories = [
  { name: "Men's Fashion", count: 45, image: "/mens-fashion-social.jpg" },
  { name: "Women's Fashion", count: 67, image: "/womens-fashion-social.jpg" },
  { name: "Accessories", count: 23, image: "/accessories-bags-social.jpg" },
  { name: "Home & Garden", count: 34, image: "/home-garden-social.jpg" },
  { name: "Travel", count: 18, image: "/travel-accessories-social.jpg" },
  {
    name: "Exclusive Designs",
    count: 12,
    image: "/exclusive-designs-social.jpg",
  },
];

export default function HomePage() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof featuredProducts)[0]
  ) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: true,
    });

    toast({
      title: "In den Warenkorb gelegt!",
      description: `${product.name} wurde zu Ihrem Warenkorb hinzugefügt.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative min-h-screen text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/KarmaMockup.png"
            alt="mytrueKarma Social Commerce Platform Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-4xl mx-auto">
            <div
              className={`space-y-6 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 mb-4"></div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent flex items-center gap-2 flex-wrap">
                  <HandHeart className="h-6 w-6 text-yellow-300 animate-pulse" />{" "}
                  <span className="break-words">
                    <strong>mytrueKarma</strong> klingt zwar Englisch ...
                  </span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 text-white drop-shadow-lg">
                ... aber wir sind ein stolzes deutsches Unternehmen, das sich
                für positive Veränderungen einsetzt.
                <br />
                Wir <strong>veröffentlichen</strong> jede Transaktion auf
                unserer Website & spenden <strong>50%</strong> aller Einnahmen
                transparent an soziale Organisationen.
              </p>
              <p className="text-lg opacity-90 text-white drop-shadow-lg">
                Schauen Sie sich also unsere Produkte an & kaufen Sie sozial ein
                oder schauen Sie sich unsere Projekte an!
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 group"
                  asChild
                >
                  <Link href="/shop">
                    Sozial Einkaufen
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-200 bg-transparent"
                  asChild
                >
                  <Link href="/transparency">Projekte Ansehen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Good vibes only</h2>
          <p className="text-xl text-muted-foreground">
            EXKLUSIVE DESIGNS - Nur für soziale Verbraucher.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <Users className="h-12 w-12 mx-auto text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Solidarität</h3>
            <p className="text-muted-foreground">
              Unser Engagement für eine bessere Welt
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <HandHeart className="h-12 w-12 mx-auto text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sozial</h3>
            <p className="text-muted-foreground">
              Spenden gehen an soziale Projekte
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <TransparencyIcon className="h-12 w-12 mx-auto text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transparent</h3>
            <p className="text-muted-foreground">
              Klarheit schaffen! mytrueKarma bleibt für immer völlig
              transparent!
            </p>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div
          className={`text-center mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Nach Kategorie Einkaufen</h2>
          <p className="text-muted-foreground">
            Entdecken Sie unsere sozial bewussten Produktkategorien
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(
                category.name.toLowerCase().replace(/\s+/g, "-")
              )}`}
            >
              <Card
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredCategory === index
                    ? "shadow-xl ring-2 ring-green-200"
                    : ""
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <CardContent className="p-4 text-center">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={100}
                      height={100}
                      className={`mx-auto transition-transform duration-300 ${
                        hoveredCategory === index ? "scale-110" : "scale-100"
                      }`}
                    />
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Artikel
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div
          className={`flex justify-between items-center mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Empfohlene Produkte</h2>
            <p className="text-muted-foreground">
              Handverlesene Produkte, die einen Unterschied machen
            </p>
          </div>
          <Button
            variant="outline"
            className="hover:scale-105 transition-transform bg-transparent"
            asChild
          >
            <Link href="/shop">Alle Ansehen</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
              <Card
                className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredProduct === product.id
                    ? "shadow-2xl ring-2 ring-green-200"
                    : ""
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-2 left-2 animate-pulse bg-green-600">
                      {product.badge}
                    </Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`absolute top-2 right-2 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100 scale-110"
                          : "opacity-0 scale-90"
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <div
                      className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-all duration-200 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400 scale-110"
                              : "text-gray-300"
                          }`}
                          style={{ transitionDelay: `${i * 50}ms` }}
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
                    <span className="text-sm text-muted-foreground line-through">
                      €{product.originalPrice}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    In den Warenkorb
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission & Team Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Unsere Mission & Unser Team
          </h2>
          <p className="text-xl text-muted-foreground">
            Erfahren Sie mehr über die Menschen und die Vision hinter
            mytrueKarma
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <Target className="h-12 w-12 mx-auto text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">50% Spendenmodell</h3>
            <p className="text-muted-foreground mb-4">
              Die Hälfte unserer Erlöse fließt in wohltätige Projekte - jeder
              Kauf wird zu einer guten Tat.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/about">
                Mehr erfahren
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <Users className="h-12 w-12 mx-auto text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nachwuchsförderung</h3>
            <p className="text-muted-foreground mb-4">
              Wir unterstützen aufstrebende Künstler, Designer und kreative
              Talente auf ihrem Weg.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/talent">
                Talent werden
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <TransparencyIcon className="h-12 w-12 mx-auto text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vollständige Transparenz</h3>
            <p className="text-muted-foreground mb-4">
              Jede Transaktion wird veröffentlicht - sehen Sie genau, wohin Ihre
              Unterstützung fließt.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/transparency">
                Transparenz ansehen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Social Impact Preview */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Aktuelle Spendenprojekte
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Sehen Sie, welche Projekte wir aktuell unterstützen und wie Ihr
              Beitrag wirkt
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <TreePine className="h-8 w-8 text-green-300" />
                  <h3 className="font-bold text-lg">Eden Reforestation</h3>
                </div>
                <p className="text-sm opacity-90">
                  Aufforstung in Madagaskar - über 67 einheimische Baumarten für
                  200.000+ Pflanzen- und Tierarten
                </p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-8 w-8 text-red-300" />
                  <h3 className="font-bold text-lg">Ukraine Hilfe</h3>
                </div>
                <p className="text-sm opacity-90">
                  UNICEF-Unterstützung für geflüchtete Familien mit
                  Lebensmitteln, Wasser und Erste-Hilfe-Sets
                </p>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/transparency">
                  <TransparencyIcon className="mr-2 h-5 w-5" />
                  Alle Projekte & Transparenz
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm bg-transparent"
                asChild
              >
                <Link href="/shop">
                  Jetzt sozial einkaufen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Left Side - Title */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="mb-8">
                <Image
                  src="/myk-logo.png"
                  alt="mytrueKarma Logo"
                  width={120}
                  height={120}
                  className="mx-auto lg:mx-0"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Warum gerade mytrueKarma?
              </h2>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-1/2 space-y-6 text-lg text-muted-foreground">
              <p>
                Bei <strong>mytrueKarma</strong> fließen <u>50%</u> unserer
                Erlöse in soziale Projekte, die dazu beitragen, die Welt zu
                einem besseren Ort zu machen.
              </p>
              <p>
                Diese Projekte werden aktiv in unserer Community vorgestellt, um
                Transparenz und gemeinsames Engagement zu fördern. Du kannst
                ganz einfach über unsere Webseite mit einem{" "}
                <strong>Einkauf</strong> einen Beitrag dazu leisten und somit
                einen direkten Einfluss auf die Umsetzung wichtiger Vorhaben
                haben.
              </p>
              <p>
                Um unsere Wertschätzung für <strong>unsere Spender</strong> zum
                Ausdruck zu bringen, veröffentlichen wir monatlich eine Liste
                mit den Namen der Unterstützer und ihren Beiträgen, jedoch nur
                mit ausdrücklicher Einwilligung der Spender.
              </p>
              <p>
                Wir sind stolz darauf, ein Teil dieser{" "}
                <strong>positiven Bewegung</strong> zu sein und freuen uns
                darauf, mit dir gemeinsam die Welt zu einem besseren Ort zu
                machen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Features Section - Immobilien & Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Noch mehr Möglichkeiten, Gutes zu tun
          </h2>
          <p className="text-xl text-muted-foreground">
            Entdecke unsere neuen Bereiche mit Social Impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Immobilien Card */}
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="relative h-64">
              <Image
                src="/ceramic-vase.png"
                alt="Immobilien mit Social Impact"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                <HandHeart className="h-3 w-3 mr-1" />
                Social Impact
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Immobilien
              </h3>
              <p className="text-muted-foreground mb-4">
                Finde dein Traumzuhause oder vermiete deine Immobilie - und
                unterstütze dabei soziale Wohnprojekte. Ein Teil jeder Miete
                oder Provision fließt in lokale Initiativen.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">Wohnungen</Badge>
                <Badge variant="outline">Häuser</Badge>
                <Badge variant="outline">Verkauf & Vermietung</Badge>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/immobilien">
                  Immobilien entdecken
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="relative h-64">
              <Image
                src="/organic-cotton-shirt.jpg"
                alt="Events & Veranstaltungen mit Social Impact"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <Badge className="absolute top-4 right-4 bg-purple-600 text-white">
                <HandHeart className="h-3 w-3 mr-1" />
                Social Impact
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                Events & Veranstaltungen
              </h3>
              <p className="text-muted-foreground mb-4">
                Erlebe spannende Events oder organisiere deine eigenen
                Veranstaltungen. Jedes Event trägt zu sozialen Projekten bei und
                bringt die Community zusammen.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">Musik & Konzerte</Badge>
                <Badge variant="outline">Sport & Fitness</Badge>
                <Badge variant="outline">Food & Drinks</Badge>
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                asChild
              >
                <Link href="/events">
                  Events entdecken
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <p className="text-3xl font-bold text-blue-600 mb-1">10+</p>
            <p className="text-sm text-muted-foreground">Immobilien-Angebote</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <p className="text-3xl font-bold text-purple-600 mb-1">15+</p>
            <p className="text-sm text-muted-foreground">Aktive Events</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100">
            <p className="text-3xl font-bold text-green-600 mb-1">2-10%</p>
            <p className="text-sm text-muted-foreground">
              Social Impact Beitrag
            </p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <p className="text-3xl font-bold text-pink-600 mb-1">50+</p>
            <p className="text-sm text-muted-foreground">
              Community Mitglieder
            </p>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div
            className={`text-center transform transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">
              Treten Sie 50+ Abonnenten bei
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Bleiben Sie auf dem Laufenden mit allem, was Sie über unsere
              sozialen Auswirkungen wissen müssen.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ihre@email.com"
                className="flex-1 px-4 py-3 rounded-md border-0 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 hover:scale-105 transition-transform">
                Abonnieren
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
