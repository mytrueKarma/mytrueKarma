"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "mytrueKarma Herren T-Shirt",
    price: 39.0,
    originalPrice: 49.0,
    rating: 4.8,
    reviews: 156,
    images: [
      "https://image.spreadshirtmedia.net/image-server/v1/products/T812A2PA5886PT17X8Y12D341218728W32899H42315/views/1,width=650,height=650,appearanceId=2,backgroundColor=ffffff,crop=detail,modelId=85/ein-modernes-design-der-duesseldorfer-skyline-kombiniert-mit-dem-logo-von-x-perfekt-fuer-fans-und-liebhaber-der-stadt-am-rhein.jpg",
      "/mytruekarma-men-s-t-shirt-back-view.jpg",
      "/mytruekarma-men-s-t-shirt-detail-view.jpg",
      "/mytruekarma-men-s-t-shirt-lifestyle.jpg",
    ],
    category: "Herrenmode",
    inStock: true,
    stockCount: 15,
    description:
      "Unser exklusives mytrueKarma Herren T-Shirt vereint Stil mit sozialer Verantwortung. Hergestellt aus 100% Bio-Baumwolle, ist dieses T-Shirt nicht nur bequem und langlebig, sondern unterstützt auch soziale Projekte durch unsere transparente Spendenpolitik.",
    features: [
      "100% Bio-Baumwolle",
      "Faire Arbeitsbedingungen",
      "Klimaneutral produziert",
      "Exklusives mytrueKarma Design",
      "50% des Erlöses geht an soziale Projekte",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Schwarz", "Weiß", "Grau", "Navy"],
    socialImpact:
      "Mit dem Kauf dieses T-Shirts unterstützen Sie Bildungsprojekte für benachteiligte Kinder in Deutschland.",
    specifications: {
      Material: "100% Bio-Baumwolle",
      Gewicht: "180 g/m²",
      Passform: "Regular Fit",
      Pflege: "Maschinenwäsche bei 30°C",
      Herkunft: "Deutschland",
      Zertifizierung: "GOTS, Fair Trade",
    },
  },
  {
    id: 2,
    name: "mytrueKarma Damen T-Shirt",
    price: 24.99,
    originalPrice: 37.99,
    rating: 4.7,
    reviews: 203,
    images: [
      "https://image.spreadshirtmedia.net/image-server/v1/products/T813A803PA5870PT17X0Y3D303055792W27793H33352/views/1,width=650,height=650,appearanceId=803,backgroundColor=ffffff,crop=detail,modelId=5468/exklusives-design-schnappen-sie-sich-dieses-schoene-design-als-geschenk-fuer-einen-freund-in-ihrer-naehe-fuer-jeden-unterstuetzer-der-sozialen-bewegung-u.jpg",
      "/mytruekarma-women-s-t-shirt-back-view.jpg",
      "/mytruekarma-women-s-t-shirt-detail-view.jpg",
      "/mytruekarma-women-s-t-shirt-lifestyle.jpg",
    ],
    category: "Damenmode",
    inStock: true,
    stockCount: 23,
    description:
      "Das mytrueKarma Damen T-Shirt kombiniert femininen Stil mit unserem Engagement für soziale Gerechtigkeit. Aus nachhaltigen Materialien gefertigt, ist es perfekt für bewusste Konsumentinnen.",
    features: [
      "100% Bio-Baumwolle",
      "Taillierte Passform",
      "Nachhaltig produziert",
      "Soziales Design",
      "Transparente Lieferkette",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rosa", "Weiß", "Schwarz", "Mint"],
    socialImpact:
      "Ihr Kauf unterstützt Frauenförderungsprogramme in Entwicklungsländern.",
    specifications: {
      Material: "100% Bio-Baumwolle",
      Gewicht: "160 g/m²",
      Passform: "Slim Fit",
      Pflege: "Maschinenwäsche bei 30°C",
      Herkunft: "Deutschland",
      Zertifizierung: "GOTS, Fair Trade",
    },
  },
  {
    id: 3,
    name: "Crossbody Tasche 'Planet Whale'",
    price: 27.0,
    originalPrice: 35.0,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://i0.wp.com/mytruekarma.com/wp-content/uploads/2024/04/all-over-print-utility-crossbody-bag-white-front-661532e26a196.jpg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    category: "Accessoires",
    inStock: true,
    stockCount: 12,
    description:
      "Stylische Crossbody Tasche mit dem exklusiven 'Planet Whale' Design. Nachhaltig produziert und perfekt für den Alltag.",
    features: [
      "Nachhaltiges Material",
      "Verstellbarer Gurt",
      "Praktische Innentaschen",
      "Exklusives Design",
      "Umweltfreundlich",
    ],
    sizes: ["Einheitsgröße"],
    colors: ["Weiß", "Blau", "Grün"],
    socialImpact: "Ihr Kauf unterstützt Meeresschutzprojekte weltweit.",
    specifications: {
      Material: "Recyceltes Polyester",
      Abmessungen: "25x18x8 cm",
      Gewicht: "180g",
      Pflege: "Handwäsche empfohlen",
      Herkunft: "Europa",
      Zertifizierung: "Ocean Positive",
    },
  },
  {
    id: 4,
    name: "Exklusive Design Kollektion",
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviews: 127,
    images: [
      "/exclusive-social-design-merchandise.jpg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    category: "Exklusiv",
    inStock: false,
    stockCount: 0,
    description:
      "Limitierte exklusive Design Kollektion von mytrueKarma. Jedes Stück ist ein Unikat und unterstützt soziale Projekte.",
    features: [
      "Limitierte Auflage",
      "Handgesignet",
      "Premium Qualität",
      "Exklusives Design",
      "Hoher sozialer Impact",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Schwarz", "Weiß"],
    socialImpact: "75% des Erlöses gehen an ausgewählte Bildungsprojekte.",
    specifications: {
      Material: "Premium Bio-Baumwolle",
      Gewicht: "220 g/m²",
      Passform: "Regular Fit",
      Pflege: "Schonwaschgang bei 30°C",
      Herkunft: "Deutschland",
      Zertifizierung: "GOTS, Fair Trade, B-Corp",
    },
  },
  {
    id: 5,
    name: "Premium Kaffeetasse",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.2,
    reviews: 67,
    images: [
      "/premium-coffee-mug-mytruekarma.jpg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    category: "Haushalt",
    inStock: true,
    stockCount: 25,
    description:
      "Hochwertige Keramik-Kaffeetasse mit dem mytrueKarma Logo. Perfekt für Ihren morgendlichen Kaffee mit gutem Gewissen.",
    features: [
      "Premium Keramik",
      "Spülmaschinenfest",
      "Mikrowellengeeignet",
      "Ergonomischer Griff",
      "Nachhaltiger Druck",
    ],
    sizes: ["350ml"],
    colors: ["Weiß", "Schwarz", "Blau"],
    socialImpact: "Pro verkaufter Tasse wird ein Baum gepflanzt.",
    specifications: {
      Material: "Premium Keramik",
      Volumen: "350ml",
      Höhe: "9,5 cm",
      Durchmesser: "8 cm",
      Gewicht: "280g",
      Pflege: "Spülmaschinen- und mikrowellengeeignet",
    },
  },
  {
    id: 6,
    name: "Ergonomischer Bürostuhl",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 45,
    images: [
      "/ergonomic-office-chair.png",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    category: "Möbel",
    inStock: true,
    stockCount: 8,
    description:
      "Ergonomischer Bürostuhl für gesundes Arbeiten. Nachhaltig produziert mit recycelten Materialien und höchstem Komfort.",
    features: [
      "Ergonomisches Design",
      "Recycelte Materialien",
      "Höhenverstellbar",
      "Atmungsaktive Rückenlehne",
      "10 Jahre Garantie",
    ],
    sizes: ["Standard"],
    colors: ["Schwarz", "Grau", "Blau"],
    socialImpact:
      "Pro Stuhl werden 5 Schreibtische für Schulen in Entwicklungsländern finanziert.",
    specifications: {
      Material: "Recyceltes Mesh und Aluminium",
      Belastbarkeit: "120 kg",
      Höhenverstellung: "42-52 cm",
      Abmessungen: "65x65x95-105 cm",
      Gewicht: "18 kg",
      Zertifizierung: "Greenguard Gold, Cradle to Cradle",
    },
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
          <p className="text-muted-foreground mb-4">
            Das angeforderte Produkt konnte nicht gefunden werden.
          </p>
          <Link href="/shop">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Bitte wählen Sie Größe und Farbe",
        description:
          "Wählen Sie eine Größe und Farbe aus, bevor Sie das Produkt in den Warenkorb legen.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: `${product.name} (${selectedSize}, ${selectedColor})`,
      price: product.price,
      image: product.images[0],
      inStock: product.inStock,
    });

    toast({
      title: "In den Warenkorb gelegt!",
      description: `${product.name} wurde zu Ihrem Warenkorb hinzugefügt.`,
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Startseite
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground">
          Alle Produkte
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 mb-6 text-sm hover:text-green-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zu den Produkten
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`h-4 w-4 ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                  selectedImage === index
                    ? "border-green-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 bg-green-100 text-green-800">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} Bewertungen)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-green-600">
                €{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  €{product.originalPrice}
                </span>
              )}
              {product.originalPrice > product.price && (
                <Badge variant="destructive">
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
          </div>

          {/* Social Impact */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-800 mb-2">
                🌱 Sozialer Einfluss
              </h3>
              <p className="text-sm text-green-700">{product.socialImpact}</p>
            </CardContent>
          </Card>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Größe wählen</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  className={
                    selectedSize === size
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Farbe wählen</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  className={
                    selectedColor === color
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Menge</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stockCount}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                ({product.stockCount} verfügbar)
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              In den Warenkorb - €{(product.price * quantity).toFixed(2)}
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Kostenloser Versand</p>
              <p className="text-xs text-muted-foreground">ab 50€</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">2 Jahre Garantie</p>
              <p className="text-xs text-muted-foreground">auf alle Produkte</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">30 Tage Rückgabe</p>
              <p className="text-xs text-muted-foreground">kostenlos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Beschreibung</TabsTrigger>
            <TabsTrigger value="features">Eigenschaften</TabsTrigger>
            <TabsTrigger value="specifications">Spezifikationen</TabsTrigger>
            <TabsTrigger value="reviews">Bewertungen</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Produktbeschreibung
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Besondere Eigenschaften
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technische Daten</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Kundenbewertungen
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground mt-1">
                        5.0
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Ausgezeichnete Qualität!</p>
                      <p className="text-sm text-muted-foreground">
                        Das T-Shirt ist super bequem und die Qualität ist top.
                        Toll zu wissen, dass ich gleichzeitig etwas Gutes tue!
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        - Maria K., vor 2 Wochen
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="text-sm text-muted-foreground mt-1">
                        4.0
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Sehr zufrieden</p>
                      <p className="text-sm text-muted-foreground">
                        Schnelle Lieferung und gute Passform. Das Design gefällt
                        mir sehr gut.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        - Thomas M., vor 1 Monat
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
