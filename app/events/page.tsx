"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Euro,
  Search,
  Filter,
  Heart,
  Share2,
  Ticket,
  Music,
  Palette,
  Utensils,
  Dumbbell,
  BookOpen,
  Film,
  PartyPopper,
  Sparkles,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  HandHeart,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Event categories
const categories = [
  {
    id: "all",
    name: "Alle Events",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "musik",
    name: "Musik & Konzerte",
    icon: Music,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "kunst",
    name: "Kunst & Kultur",
    icon: Palette,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "food",
    name: "Food & Drinks",
    icon: Utensils,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "sport",
    name: "Sport & Fitness",
    icon: Dumbbell,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "bildung",
    name: "Bildung & Workshop",
    icon: BookOpen,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "film",
    name: "Film & Theater",
    icon: Film,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "party",
    name: "Party & Nightlife",
    icon: PartyPopper,
    color: "from-fuchsia-500 to-purple-500",
  },
];

// Mock events data
const events = [
  {
    id: 1,
    title: "Summer Music Festival 2025",
    category: "musik",
    date: "2025-07-15",
    time: "18:00",
    location: "Rheinpark Düsseldorf",
    price: 45,
    attendees: 2500,
    maxAttendees: 3000,
    image: "/placeholder.jpg",
    description:
      "Das größte Open-Air Festival des Sommers mit internationalen Künstlern und lokalen Bands.",
    organizer: "mytrueKarma Events",
    featured: true,
    tags: ["Open Air", "Live Music", "Festival"],
    socialImpact: "10% der Ticketeinnahmen gehen an lokale Musikschulen",
    donationAmount: 11250,
  },
  {
    id: 2,
    title: "Street Art Workshop",
    category: "kunst",
    date: "2025-06-20",
    time: "14:00",
    location: "Kunsthalle Düsseldorf",
    price: 25,
    attendees: 15,
    maxAttendees: 20,
    image: "/placeholder.jpg",
    description:
      "Lerne von professionellen Street-Art-Künstlern die Grundlagen der urbanen Kunst.",
    organizer: "Art Collective Düsseldorf",
    featured: true,
    tags: ["Workshop", "Kunst", "Kreativität"],
    socialImpact: "15% für Kunstförderung benachteiligter Jugendlicher",
    donationAmount: 75,
  },
  {
    id: 3,
    title: "Veganes Food Festival",
    category: "food",
    date: "2025-06-10",
    time: "11:00",
    location: "Marktplatz Düsseldorf",
    price: 0,
    attendees: 800,
    maxAttendees: 1500,
    image: "/placeholder.jpg",
    description:
      "Entdecke die Vielfalt der veganen Küche mit über 40 Food-Ständen und Live-Cooking.",
    organizer: "Green Food Movement",
    featured: true,
    tags: ["Vegan", "Food", "Kostenlos"],
    socialImpact: "Spenden gehen an Projekte für nachhaltige Landwirtschaft",
    donationAmount: 3200,
  },
  {
    id: 4,
    title: "Charity Marathon",
    category: "sport",
    date: "2025-09-05",
    time: "08:00",
    location: "Rheinufer Start/Ziel",
    price: 30,
    attendees: 450,
    maxAttendees: 500,
    image: "/placeholder.jpg",
    description:
      "Laufe für den guten Zweck! Marathon, Halbmarathon und 5km-Lauf für alle Fitnesslevel.",
    organizer: "Düsseldorf Runners Club",
    featured: false,
    tags: ["Sport", "Charity", "Gesundheit"],
    socialImpact: "100% der Startgebühren gehen an Kinderhospize",
    donationAmount: 13500,
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass",
    category: "bildung",
    date: "2025-06-25",
    time: "10:00",
    location: "Tech Hub Düsseldorf",
    price: 89,
    attendees: 35,
    maxAttendees: 50,
    image: "/placeholder.jpg",
    description:
      "Intensive Ganztages-Schulung zu Social Media Marketing und Content Creation.",
    organizer: "Digital Academy",
    featured: false,
    tags: ["Workshop", "Marketing", "Business"],
    socialImpact: "5% für digitale Bildung in Entwicklungsländern",
    donationAmount: 156,
  },
  {
    id: 6,
    title: "Open-Air Kino Nacht",
    category: "film",
    date: "2025-07-22",
    time: "21:00",
    location: "Hofgarten Düsseldorf",
    price: 12,
    attendees: 200,
    maxAttendees: 300,
    image: "/placeholder.jpg",
    description:
      "Klassische Filme unter freiem Himmel mit Food-Trucks und Bar.",
    organizer: "Cinema Paradiso",
    featured: false,
    tags: ["Film", "Open Air", "Sommer"],
    socialImpact: "20% für Filmförderung junger Regisseure",
    donationAmount: 720,
  },
  {
    id: 7,
    title: "Electronic Night: DJ Battle",
    category: "party",
    date: "2025-06-30",
    time: "22:00",
    location: "Club Unique Düsseldorf",
    price: 15,
    attendees: 280,
    maxAttendees: 400,
    image: "/placeholder.jpg",
    description:
      "Die besten DJs der Stadt battlen um den Titel 'Best Mixer 2025'.",
    organizer: "Nightlife Collective",
    featured: true,
    tags: ["Party", "Electronic", "DJ"],
    socialImpact: "10% für Musik-Therapie-Programme",
    donationAmount: 420,
  },
  {
    id: 8,
    title: "Yoga im Park",
    category: "sport",
    date: "2025-06-08",
    time: "09:00",
    location: "Nordpark Düsseldorf",
    price: 10,
    attendees: 45,
    maxAttendees: 60,
    image: "/placeholder.jpg",
    description: "Entspannende Yoga-Session in der Natur für alle Level.",
    organizer: "Mindful Movement",
    featured: false,
    tags: ["Yoga", "Wellness", "Natur"],
    socialImpact: "25% für mentale Gesundheitsprojekte",
    donationAmount: 113,
  },
];

const stats = [
  { label: "Events pro Monat", value: "10+", icon: Calendar },
  { label: "Teilnehmer", value: "25K+", icon: Users },
  { label: "Zufriedenheit", value: "98%", icon: Heart },
  { label: "Städte", value: "15+", icon: Globe },
];

const testimonials = [
  {
    name: "Lisa M.",
    rating: 5,
    text: "Die Events sind immer perfekt organisiert und die Social Impact-Komponente macht es noch besser!",
    event: "Summer Music Festival",
  },
  {
    name: "Thomas K.",
    rating: 5,
    text: "Tolle Plattform um neue Leute kennenzulernen und gleichzeitig Gutes zu tun.",
    event: "Veganes Food Festival",
  },
  {
    name: "Sarah W.",
    rating: 5,
    text: "Die Workshops sind hochwertig und praxisnah. Absolut empfehlenswert!",
    event: "Digital Marketing Masterclass",
  },
];

export default function EventsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = events.filter((e) => e.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.icon || Sparkles;
  };

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-24 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-pink-600/80 to-orange-600/80 animate-gradient"></div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Confetti pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              <PartyPopper className="h-4 w-4 mr-2" />
              Entdecke unvergessliche Events
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Erlebe mehr
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Gemeinsam
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Events mit Herz. Verbinde dich mit Menschen und unterstütze
              soziale Projekte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <a href="#events">
                  <Ticket className="h-5 w-5 mr-2" />
                  Events entdecken
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all"
                asChild
              >
                <a href="#categories">
                  <Filter className="h-5 w-5 mr-2" />
                  Kategorien durchsuchen
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
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        id="categories"
        className="py-16 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-600">
              <Filter className="h-4 w-4 mr-2" />
              Event-Kategorien
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Was interessiert dich?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wähle deine Lieblingskategorie und entdecke passende Events
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className={`cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "ring-2 ring-purple-600"
                    : ""
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <CardContent className="p-6 text-center">
                  <category.icon className="h-10 w-10 mx-auto mb-3 text-gray-700" />
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-600">
              <Star className="h-4 w-4 mr-2" />
              Featured Events
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Highlights des Monats</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unsere Top-Events mit besonderem Social Impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => {
              const CategoryIcon = getCategoryIcon(event.category);
              const attendancePercentage =
                (event.attendees / event.maxAttendees) * 100;

              return (
                <Card
                  key={event.id}
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-64 bg-gray-200">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-purple-600 text-white">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categories.find((c) => c.id === event.category)?.name}
                    </Badge>
                    {event.price === 0 && (
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                        Kostenlos
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatDate(event.date)} • {event.time} Uhr
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{event.location}</span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          {event.attendees} / {event.maxAttendees} Teilnehmer
                        </span>
                        <span className="text-gray-600">
                          {attendancePercentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                          style={{ width: `${attendancePercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Social Impact */}
                    {event.socialImpact && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <HandHeart className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">
                            Social Impact
                          </span>
                        </div>
                        <p className="text-xs text-green-600 mb-1">
                          {event.socialImpact}
                        </p>
                        <p className="text-xs font-semibold text-green-700">
                          ≈ {event.donationAmount.toLocaleString("de-DE")} €
                          Spende
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-sm text-gray-500">
                          Preis pro Person
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          {event.price === 0 ? "Kostenlos" : `${event.price} €`}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Tickets
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Events Section */}
      <section
        id="events"
        className="py-16 bg-gradient-to-br from-purple-50 to-orange-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Alle Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Durchsuche unser komplettes Event-Angebot
            </p>
          </div>

          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">
                    Suche nach Events, Orten oder Tags
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="z.B. Konzert, Workshop, Düsseldorf..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const CategoryIcon = getCategoryIcon(event.category);

              return (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-purple-600 text-white">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categories.find((c) => c.id === event.category)?.name}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">
                        {formatDate(event.date)} • {event.time}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">
                        {event.location}
                      </span>
                    </div>

                    {/* Social Impact Badge */}
                    {event.socialImpact && (
                      <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center gap-1 text-xs text-green-700">
                          <HandHeart className="h-3 w-3" />
                          <span className="font-medium">Social Impact</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1 line-clamp-1">
                          {event.socialImpact}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-purple-600">
                        {event.price === 0 ? "Kostenlos" : `${event.price} €`}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        {event.attendees}/{event.maxAttendees}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">
                Keine Events gefunden
              </h3>
              <p className="text-gray-600">
                Versuche andere Suchbegriffe oder wähle eine andere Kategorie
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-600">
              <Heart className="h-4 w-4 mr-2" />
              Erfahrungen
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Das sagen Teilnehmer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Echte Bewertungen von echten Menschen
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
                      {testimonial.event}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <PartyPopper className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Bereit für unvergessliche Erlebnisse?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Entdecke Events in deiner Nähe und unterstütze gleichzeitig
              soziale Projekte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                asChild
              >
                <a href="#events">
                  <Ticket className="h-5 w-5 mr-2" />
                  Events durchstöbern
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Users className="h-5 w-5 mr-2" />
                Event erstellen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedEvent.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-bold">
                      {formatDate(selectedEvent.date)}
                    </div>
                    <div className="text-xs text-gray-600">Datum</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-bold">
                      {selectedEvent.time} Uhr
                    </div>
                    <div className="text-xs text-gray-600">Uhrzeit</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-bold">
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                    </div>
                    <div className="text-xs text-gray-600">Teilnehmer</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Euro className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-bold">
                      {selectedEvent.price === 0
                        ? "Gratis"
                        : `${selectedEvent.price} €`}
                    </div>
                    <div className="text-xs text-gray-600">Preis</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Beschreibung</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Veranstalter</h3>
                <p className="text-gray-700">{selectedEvent.organizer}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map((tag, i) => (
                    <Badge key={i} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Impact Section */}
              {selectedEvent.socialImpact && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-green-600 rounded-full">
                        <HandHeart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-900">
                          Social Impact - Gemeinsam Gutes tun
                        </h3>
                        <p className="text-sm text-green-700">
                          Mit deiner Teilnahme unterstützt du soziale Projekte
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <p className="text-green-800 mb-2">
                        {selectedEvent.socialImpact}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-green-200">
                        <Euro className="h-5 w-5 text-green-600" />
                        <span className="text-lg font-bold text-green-900">
                          ≈{" "}
                          {selectedEvent.donationAmount.toLocaleString("de-DE")}{" "}
                          €
                        </span>
                        <span className="text-sm text-green-700">
                          gehen an soziale Einrichtungen
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center gap-4 pt-6 border-t">
                <Button
                  size="lg"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Ticket className="h-5 w-5 mr-2" />
                  Ticket kaufen
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Heart className="h-5 w-5 mr-2" />
                  Auf Wunschliste
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
