"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Home,
  Building2,
  MapPin,
  Euro,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Phone,
  Mail,
  Search,
  Filter,
  TrendingUp,
  Award,
  Users,
  Heart,
  CheckCircle,
  Star,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  Video,
  DollarSign,
  HandHeart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Moderne Penthouse-Wohnung mit Dachterrasse",
    type: "Wohnung",
    purpose: "Verkauf",
    price: 685000,
    location: "Düsseldorf, Oberkassel",
    size: 145,
    rooms: 4,
    bathrooms: 2,
    image: "/placeholder.jpg",
    features: [
      "Dachterrasse",
      "Aufzug",
      "Tiefgarage",
      "Einbauküche",
      "Fußbodenheizung",
    ],
    description:
      "Exklusive Penthouse-Wohnung in begehrter Lage mit herrlichem Rheinblick.",
    energyClass: "A+",
    yearBuilt: 2022,
    featured: true,
    socialImpact:
      "2% der Provision fließen in lokale Wohnprojekte für Bedürftige",
    donationAmount: 13700,
  },
  {
    id: 2,
    title: "Charmantes Einfamilienhaus mit Garten",
    type: "Haus",
    purpose: "Verkauf",
    price: 895000,
    location: "Düsseldorf, Niederkassel",
    size: 180,
    rooms: 5,
    bathrooms: 3,
    image: "/placeholder.jpg",
    features: ["Garten", "Garage", "Kamin", "Smart Home", "Solarpanels"],
    description:
      "Familienfreundliches Einfamilienhaus mit großzügigem Garten und moderner Ausstattung.",
    energyClass: "A",
    yearBuilt: 2020,
    featured: true,
    socialImpact:
      "3% der Provision unterstützen Umweltschutzprojekte in der Region",
    donationAmount: 26850,
  },
  {
    id: 3,
    title: "Zentrale 3-Zimmer Wohnung",
    type: "Wohnung",
    purpose: "Vermietung",
    price: 1450,
    priceType: "Monat",
    location: "Düsseldorf, Stadtmitte",
    size: 85,
    rooms: 3,
    bathrooms: 1,
    image: "/placeholder.jpg",
    features: ["Balkon", "Einbauküche", "Kellerabteil", "Stellplatz"],
    description:
      "Perfekt für Berufstätige: Helle Wohnung in Top-Lage mit exzellenter Verkehrsanbindung.",
    energyClass: "B",
    yearBuilt: 2015,
    featured: false,
    socialImpact:
      "5% der Mieteinnahmen im ersten Jahr gehen an Bildungsprojekte",
    donationAmount: 870,
  },
  {
    id: 4,
    title: "Luxuriöse Villa mit Pool",
    type: "Haus",
    purpose: "Verkauf",
    price: 1890000,
    location: "Düsseldorf, Golzheim",
    size: 320,
    rooms: 7,
    bathrooms: 4,
    image: "/placeholder.jpg",
    features: ["Pool", "Sauna", "Weinkeller", "Heimkino", "Doppelgarage"],
    description:
      "Repräsentative Villa in exklusiver Wohnlage mit höchstem Komfort.",
    energyClass: "A+",
    yearBuilt: 2023,
    featured: true,
    socialImpact: "1% der Provision fließt in soziale Wohnbauprojekte",
    donationAmount: 18900,
  },
  {
    id: 5,
    title: "Moderne 2-Zimmer Wohnung",
    type: "Wohnung",
    purpose: "Vermietung",
    price: 980,
    priceType: "Monat",
    location: "Düsseldorf, Bilk",
    size: 62,
    rooms: 2,
    bathrooms: 1,
    image: "/placeholder.jpg",
    features: ["Balkon", "Einbauküche", "Parkett", "Kellerabteil"],
    description:
      "Kompakte Wohnung ideal für Singles oder Paare in beliebtem Stadtteil.",
    energyClass: "C",
    yearBuilt: 2010,
    featured: false,
    socialImpact: "4% der Mieteinnahmen unterstützen lokale Jugendarbeit",
    donationAmount: 470,
  },
  {
    id: 6,
    title: "Geräumige Maisonette-Wohnung",
    type: "Wohnung",
    purpose: "Vermietung",
    price: 1850,
    priceType: "Monat",
    location: "Düsseldorf, Pempelfort",
    size: 120,
    rooms: 4,
    bathrooms: 2,
    image: "/placeholder.jpg",
    features: ["2 Ebenen", "Gäste-WC", "Einbauküche", "Tiefgarage", "Balkon"],
    description:
      "Besondere Wohnung über zwei Etagen mit viel Platz und hochwertiger Ausstattung.",
    energyClass: "B",
    yearBuilt: 2018,
    featured: false,
    socialImpact: "3% der Jahresmiete fließen in Familienhilfsprojekte",
    donationAmount: 666,
  },
];

const services = [
  {
    icon: Home,
    title: "Immobilienverkauf",
    description:
      "Professionelle Vermarktung und Verkauf Ihrer Immobilie zum besten Preis",
    features: [
      "Kostenlose Immobilienbewertung",
      "Professionelle Fotografie & Videos",
      "360° Virtual Tours",
      "Marketing auf allen relevanten Portalen",
      "Käuferqualifizierung",
      "Verhandlungsführung",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Building2,
    title: "Immobilienvermietung",
    description: "Zuverlässige Vermietung und Verwaltung Ihrer Mietobjekte",
    features: [
      "Mietpreisanalyse",
      "Mietersuche & -auswahl",
      "Bonitätsprüfung",
      "Vertragsgestaltung",
      "Objektverwaltung",
      "24/7 Notfall-Service",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Investmentberatung",
    description: "Strategische Beratung für erfolgreiche Immobilieninvestments",
    features: [
      "Marktanalysen",
      "Renditeprognosen",
      "Objektauswahl",
      "Finanzierungsberatung",
      "Steueroptimierung",
      "Portfolio-Management",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

const stats = [
  { label: "Vermittelte Immobilien", value: "250+", icon: Home },
  { label: "Zufriedene Kunden", value: "98%", icon: Heart },
  { label: "Durchschnittliche Verkaufszeit", value: "45 Tage", icon: Calendar },
  { label: "Marktabdeckung", value: "100%", icon: MapPin },
];

const testimonials = [
  {
    name: "Familie Schmidt",
    rating: 5,
    text: "Dank mytrueKarma haben wir unser Traumhaus gefunden! Die Beratung war erstklassig und der gesamte Prozess verlief reibungslos.",
    property: "Einfamilienhaus in Niederkassel",
  },
  {
    name: "Thomas Müller",
    rating: 5,
    text: "Professionelle Vermarktung meiner Wohnung. Innerhalb von 3 Wochen war ein passender Käufer gefunden. Absolut empfehlenswert!",
    property: "Eigentumswohnung in Oberkassel",
  },
  {
    name: "Sarah Weber",
    rating: 5,
    text: "Als Erstvermieterin war ich unsicher. Das Team hat mich perfekt beraten und die idealen Mieter für mein Objekt gefunden.",
    property: "3-Zimmer Wohnung in Bilk",
  },
];

export default function ImmobilienPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterPurpose, setFilterPurpose] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<
    (typeof properties)[0] | null
  >(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesType = filterType === "all" || property.type === filterType;
    const matchesPurpose =
      filterPurpose === "all" || property.purpose === filterPurpose;
    const matchesSearch =
      searchQuery === "" ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesPurpose && matchesSearch;
  });

  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-green-600 to-teal-600 text-white py-24 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-green-600/80 to-teal-600/80 animate-gradient"></div>

        {/* Floating shapes for depth */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Animated building silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <div className="absolute bottom-0 left-[5%] w-16 h-24 bg-white/30 animate-building-1"></div>
          <div className="absolute bottom-0 left-[15%] w-20 h-28 bg-white/20 animate-building-2"></div>
          <div className="absolute bottom-0 left-[25%] w-12 h-20 bg-white/25 animate-building-3"></div>
          <div className="absolute bottom-0 right-[25%] w-16 h-26 bg-white/30 animate-building-1"></div>
          <div className="absolute bottom-0 right-[15%] w-20 h-24 bg-white/20 animate-building-2"></div>
          <div className="absolute bottom-0 right-[5%] w-14 h-28 bg-white/25 animate-building-3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              <Home className="h-4 w-4 mr-2" />
              Ihr Immobilienexperte in Düsseldorf
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Finden Sie Ihr perfektes
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Traumhaus
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Professionelle Immobilienvermittlung mit Herz. Wir begleiten Sie
              auf dem Weg zu Ihrem Zuhause.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <a href="#properties">
                  <Search className="h-5 w-5 mr-2" />
                  Immobilien durchsuchen
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all"
                asChild
              >
                <a href="#contact">
                  <Phone className="h-5 w-5 mr-2" />
                  Kostenlose Beratung
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-600">
              <Star className="h-4 w-4 mr-2" />
              Empfohlene Objekte
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Ausgewählte Immobilien</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie unsere handverlesenen Top-Immobilien in besten Lagen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Card
                key={property.id}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProperty(property)}
              >
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                    {property.purpose}
                  </Badge>
                  <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                    {property.energyClass}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {property.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Maximize className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                      <div className="text-sm font-semibold">
                        {property.size} m²
                      </div>
                    </div>
                    <div className="text-center">
                      <Bed className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                      <div className="text-sm font-semibold">
                        {property.rooms} Zimmer
                      </div>
                    </div>
                    <div className="text-center">
                      <Bath className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                      <div className="text-sm font-semibold">
                        {property.bathrooms} Bad
                      </div>
                    </div>
                  </div>

                  {/* Social Impact */}
                  {property.socialImpact && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <HandHeart className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          Social Impact
                        </span>
                      </div>
                      <p className="text-xs text-green-600">
                        {property.socialImpact}
                      </p>
                      <p className="text-xs font-semibold text-green-700 mt-1">
                        ≈ {property.donationAmount.toLocaleString("de-DE")} €
                        Spende
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">
                        {property.priceType ? "Kaltmiete" : "Kaufpreis"}
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {property.price.toLocaleString("de-DE")} €
                        {property.priceType && (
                          <span className="text-sm">/{property.priceType}</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm">
                      Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Properties Section */}
      <section id="properties" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Alle Immobilien</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Durchsuchen Sie unser komplettes Angebot an Immobilien
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search">Suche</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Standort, Titel durchsuchen..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Objekttyp</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Typen</SelectItem>
                      <SelectItem value="Wohnung">Wohnung</SelectItem>
                      <SelectItem value="Haus">Haus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="purpose">Zweck</Label>
                  <Select
                    value={filterPurpose}
                    onValueChange={setFilterPurpose}
                  >
                    <SelectTrigger id="purpose">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle</SelectItem>
                      <SelectItem value="Verkauf">Verkauf</SelectItem>
                      <SelectItem value="Vermietung">Vermietung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProperty(property)}
              >
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                    {property.purpose}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {property.location}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Maximize className="h-3 w-3 text-gray-500" />
                      {property.size} m²
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-3 w-3 text-gray-500" />
                      {property.rooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-3 w-3 text-gray-500" />
                      {property.bathrooms}
                    </div>
                  </div>

                  {/* Social Impact Badge */}
                  {property.socialImpact && (
                    <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center gap-1 text-xs text-green-700">
                        <HandHeart className="h-3 w-3" />
                        <span className="font-medium">Social Impact:</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {property.socialImpact}
                      </p>
                    </div>
                  )}

                  <div className="text-xl font-bold text-blue-600">
                    {property.price.toLocaleString("de-DE")} €
                    {property.priceType && (
                      <span className="text-sm">/{property.priceType}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">
                Keine Immobilien gefunden
              </h3>
              <p className="text-gray-600">
                Versuchen Sie andere Suchkriterien oder Filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-600">
              <Award className="h-4 w-4 mr-2" />
              Unsere Services
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Umfassende Immobilien-Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Von der Bewertung bis zum Vertragsabschluss – wir begleiten Sie
              bei jedem Schritt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <CardContent className="p-6">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} mb-4`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Mehr erfahren
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-600">
              <Heart className="h-4 w-4 mr-2" />
              Kundenstimmen
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Was unsere Kunden sagen</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Erfahrungsberichte von zufriedenen Käufern und Verkäufern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.property}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-br from-blue-600 to-green-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Kostenlose Erstberatung
              </h2>
              <p className="text-xl text-white/90">
                Lassen Sie uns gemeinsam Ihr Immobilienprojekt besprechen
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ihr vollständiger Name"
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">
                        E-Mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ihre@email.com"
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-white">
                        Telefon *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 ..."
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interest" className="text-white">
                        Ich interessiere mich für
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kaufen">
                            Immobilie kaufen
                          </SelectItem>
                          <SelectItem value="mieten">
                            Immobilie mieten
                          </SelectItem>
                          <SelectItem value="verkaufen">
                            Immobilie verkaufen
                          </SelectItem>
                          <SelectItem value="vermieten">
                            Immobilie vermieten
                          </SelectItem>
                          <SelectItem value="beratung">Beratung</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      Ihre Nachricht
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                      rows={4}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Nachricht senden
                  </Button>

                  <div className="text-center text-sm text-white/80">
                    Oder rufen Sie uns direkt an:{" "}
                    <a
                      href="tel:+4915678443874"
                      className="font-semibold underline"
                    >
                      +49 15678 443874
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Property Detail Dialog */}
      {selectedProperty && (
        <Dialog
          open={!!selectedProperty}
          onOpenChange={() => setSelectedProperty(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedProperty.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedProperty.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Maximize className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {selectedProperty.size} m²
                    </div>
                    <div className="text-sm text-gray-600">Wohnfläche</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {selectedProperty.rooms}
                    </div>
                    <div className="text-sm text-gray-600">Zimmer</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {selectedProperty.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Badezimmer</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {selectedProperty.yearBuilt}
                    </div>
                    <div className="text-sm text-gray-600">Baujahr</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Beschreibung</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProperty.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Ausstattung</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedProperty.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Impact Section in Dialog */}
              {selectedProperty.socialImpact && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-green-600 rounded-full">
                        <HandHeart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-900">
                          Social Impact - Mit Herz
                        </h3>
                        <p className="text-sm text-green-700">
                          Ein Teil geht an soziale Einrichtungen
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <p className="text-green-800 mb-2">
                        {selectedProperty.socialImpact}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-green-200">
                        <Euro className="h-5 w-5 text-green-600" />
                        <span className="text-lg font-bold text-green-900">
                          ≈{" "}
                          {selectedProperty.donationAmount.toLocaleString(
                            "de-DE"
                          )}{" "}
                          €
                        </span>
                        <span className="text-sm text-green-700">
                          für soziale Projekte
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between pt-6 border-t">
                <div>
                  <div className="text-sm text-gray-500">
                    {selectedProperty.priceType ? "Kaltmiete" : "Kaufpreis"}
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedProperty.price.toLocaleString("de-DE")} €
                    {selectedProperty.priceType && (
                      <span className="text-lg">
                        /{selectedProperty.priceType}
                      </span>
                    )}
                  </div>
                </div>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-5 w-5 mr-2" />
                  Besichtigung vereinbaren
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
