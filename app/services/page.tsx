"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  MapPin,
  Clock,
  Euro,
  Star,
  Plus,
  Users,
  Briefcase,
  Heart,
  MessageCircle,
  Filter,
  Calendar,
  HandHeart,
  Mail,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";

// Sample data for services and jobs
const featuredServices = [
  {
    id: 1,
    title: "Professionelles Webdesign & Entwicklung",
    provider: "Sarah Weber",
    category: "IT & Tech",
    location: "München",
    price: "ab 89€/Stunde",
    rating: 4.9,
    reviews: 127,
    image: "/placeholder-user.jpg",
    description: "Moderne, responsive Websites mit React und Next.js",
    tags: ["React", "Next.js", "UI/UX"],
    verified: true,
    socialImpact: "5% für Bildungsprojekte",
  },
  {
    id: 2,
    title: "Nachhaltiges Grafikdesign",
    provider: "Marcus Green",
    category: "Design",
    location: "Berlin",
    price: "ab 65€/Stunde",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder-user.jpg",
    description: "Umweltbewusstes Design für soziale Unternehmen",
    tags: ["Eco-Design", "Branding", "Print"],
    verified: true,
    socialImpact: "10% für Umweltschutz",
  },
  {
    id: 3,
    title: "Soziale Medien Management",
    provider: "Lisa Chang",
    category: "Marketing",
    location: "Hamburg",
    price: "ab 45€/Stunde",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder-user.jpg",
    description: "Authentisches Social Media für nachhaltige Brands",
    tags: ["Instagram", "LinkedIn", "Content"],
    verified: true,
    socialImpact: "3% für Bildung",
  },
  {
    id: 4,
    title: "Nachhaltigkeitsberatung",
    provider: "Dr. Thomas Müller",
    category: "Beratung",
    location: "Frankfurt",
    price: "ab 120€/Stunde",
    rating: 5.0,
    reviews: 67,
    image: "/placeholder-user.jpg",
    description: "CSR-Strategien für Unternehmen jeder Größe",
    tags: ["CSR", "Nachhaltigkeit", "Strategie"],
    verified: true,
    socialImpact: "15% für Klimaschutz",
  },
];

const jobListings = [
  {
    id: 1,
    title: "React Developer für soziale Plattform",
    company: "GreenTech Solutions",
    location: "Remote/Berlin",
    type: "Vollzeit",
    salary: "55.000-70.000€",
    posted: "vor 2 Tagen",
    description: "Entwicklung einer Plattform für nachhaltigen Handel",
    tags: ["React", "TypeScript", "Node.js"],
    urgent: false,
    socialMission: "CO2-neutrale Technologien",
  },
  {
    id: 2,
    title: "UX Designer für Non-Profit",
    company: "Helping Hands e.V.",
    location: "München",
    type: "Teilzeit",
    salary: "30.000-40.000€",
    posted: "vor 1 Tag",
    description: "Design für digitale Hilfsprojekte",
    tags: ["UX/UI", "Figma", "Research"],
    urgent: true,
    socialMission: "Digitale Inklusion",
  },
  {
    id: 3,
    title: "Marketing Manager Nachhaltigkeit",
    company: "EcoLife GmbH",
    location: "Hamburg",
    type: "Vollzeit",
    salary: "45.000-60.000€",
    posted: "vor 3 Tagen",
    description: "Marketing für umweltfreundliche Produkte",
    tags: ["Marketing", "SEO", "Content"],
    urgent: false,
    socialMission: "Umweltschutz",
  },
];

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
  const [activeTab, setActiveTab] = useState<"services" | "jobs">("services");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [priceFilter, setPriceFilter] = useState("Alle");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<"service" | "job">("service");
  const [allServices, setAllServices] = useState(featuredServices);
  const [allJobs, setAllJobs] = useState(jobListings);
  const [newServiceForm, setNewServiceForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    tags: "",
    socialImpact: "",
  });
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    tags: "",
    socialMission: "",
  });

  const handleCreateService = () => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description:
          "Bitte melden Sie sich an, um einen Service zu inserieren.",
        variant: "destructive",
      });
      return;
    }

    // Create new service object
    const newService = {
      id: Date.now(),
      title: newServiceForm.title,
      provider: `${user.firstName} ${user.lastName}`,
      category: newServiceForm.category,
      location: "Deutschland", // Could be user's location
      price: newServiceForm.price,
      rating: 0,
      reviews: 0,
      image: "/placeholder-user.jpg",
      description: newServiceForm.description,
      tags: newServiceForm.tags.split(",").map((tag) => tag.trim()),
      verified: false, // New services start unverified
      socialImpact: newServiceForm.socialImpact,
    };

    // Add to services list
    setAllServices((prev) => [newService, ...prev]);

    toast({
      title: "Service erfolgreich erstellt!",
      description: "Ihr Service wird nach Prüfung veröffentlicht.",
    });
    setIsCreateModalOpen(false);
    setNewServiceForm({
      title: "",
      category: "",
      price: "",
      description: "",
      tags: "",
      socialImpact: "",
    });
  };

  const handleCreateJob = () => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melden Sie sich an, um einen Job zu inserieren.",
        variant: "destructive",
      });
      return;
    }

    // Create new job object
    const newJob = {
      id: Date.now(),
      title: newJobForm.title,
      company: newJobForm.company || `${user.firstName} ${user.lastName}`,
      location: newJobForm.location,
      type: newJobForm.type,
      salary: newJobForm.salary,
      posted: "gerade eben",
      description: newJobForm.description,
      tags: newJobForm.tags.split(",").map((tag) => tag.trim()),
      urgent: false,
      socialMission: newJobForm.socialMission,
    };

    // Add to jobs list
    setAllJobs((prev) => [newJob, ...prev]);

    toast({
      title: "Job erfolgreich erstellt!",
      description: "Ihr Job wird nach Prüfung veröffentlicht.",
    });
    setIsCreateModalOpen(false);
    setNewJobForm({
      title: "",
      company: "",
      location: "",
      type: "",
      salary: "",
      description: "",
      tags: "",
      socialMission: "",
    });
  };

  const handleSubmit = () => {
    if (createType === "service") {
      handleCreateService();
    } else {
      handleCreateJob();
    }
  };

  const handleAddServiceToCart = (
    e: React.MouseEvent,
    service: (typeof featuredServices)[0]
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Convert service to cart item format
    const serviceCartItem = {
      id: service.id,
      name: service.title,
      price:
        parseFloat(service.price.replace(/[^\d,]/g, "").replace(",", ".")) || 0, // Extract price from "ab 89€/Stunde"
      image: service.image,
      inStock: true,
      category: "service",
      provider: service.provider,
      serviceType: service.category,
    };

    addToCart(serviceCartItem);

    toast({
      title: "Service in den Warenkorb gelegt!",
      description: `${service.title} wurde zu Ihrem Warenkorb hinzugefügt.`,
    });
  };

  const handleToggleWishlist = (
    e: React.MouseEvent,
    service: (typeof featuredServices)[0]
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Convert service to wishlist item format
    const serviceWishlistItem = {
      id: service.id,
      name: service.title,
      price:
        parseFloat(service.price.replace(/[^\d,]/g, "").replace(",", ".")) || 0,
      image: service.image,
      inStock: true,
      category: "service",
      provider: service.provider,
      serviceType: service.category,
    };

    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id);
      toast({
        title: "Von Wunschliste entfernt",
        description: `${service.title} wurde von Ihrer Wunschliste entfernt.`,
      });
    } else {
      addToWishlist(serviceWishlistItem);
      toast({
        title: "Zur Wunschliste hinzugefügt!",
        description: `${service.title} wurde zu Ihrer Wunschliste hinzugefügt.`,
      });
    }
  };

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Alle" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Briefcase className="h-12 w-12 text-yellow-300 animate-pulse" />
              <HandHeart className="h-12 w-12 text-pink-300 animate-pulse" />
              <Users className="h-12 w-12 text-blue-300 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Soziale Dienstleistungen
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Verbinden Sie Ihre Fähigkeiten mit sozialer Wirkung. Bieten Sie
              Services an oder finden Sie Jobs, die einen Unterschied machen.
            </p>
            <p className="text-lg opacity-80 mb-8">
              Jede Transaktion auf unserer Plattform trägt zu sozialen Projekten
              bei. Arbeiten Sie nicht nur für Geld, sondern für eine bessere
              Welt.
            </p>

            {user ? (
              <Dialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Service oder Job inserieren
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-green-600" />
                      {createType === "service"
                        ? "Neuen Service erstellen"
                        : "Neuen Job erstellen"}
                    </DialogTitle>
                    <DialogDescription>
                      {createType === "service"
                        ? "Bieten Sie Ihre Dienstleistung an und tragen Sie zu sozialen Projekten bei."
                        : "Erstellen Sie eine Stellenausschreibung für Ihr soziales Unternehmen."}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Type Selection */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-4">
                    <Button
                      variant={createType === "service" ? "default" : "ghost"}
                      onClick={() => setCreateType("service")}
                      className="flex-1"
                      size="sm"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Service
                    </Button>
                    <Button
                      variant={createType === "job" ? "default" : "ghost"}
                      onClick={() => setCreateType("job")}
                      className="flex-1"
                      size="sm"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Job
                    </Button>
                  </div>

                  {/* Service Form */}
                  {createType === "service" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Titel</label>
                        <Input
                          placeholder="z.B. Professionelles Webdesign"
                          value={newServiceForm.title}
                          onChange={(e) =>
                            setNewServiceForm({
                              ...newServiceForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Kategorie
                          </label>
                          <Select
                            value={newServiceForm.category}
                            onValueChange={(value) =>
                              setNewServiceForm({
                                ...newServiceForm,
                                category: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Kategorie wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.slice(1).map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Preis</label>
                          <Input
                            placeholder="z.B. ab 50€/Stunde"
                            value={newServiceForm.price}
                            onChange={(e) =>
                              setNewServiceForm({
                                ...newServiceForm,
                                price: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Beschreibung
                        </label>
                        <Textarea
                          placeholder="Beschreiben Sie Ihre Dienstleistung..."
                          value={newServiceForm.description}
                          onChange={(e) =>
                            setNewServiceForm({
                              ...newServiceForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Tags (kommagetrennt)
                        </label>
                        <Input
                          placeholder="z.B. React, Design, SEO"
                          value={newServiceForm.tags}
                          onChange={(e) =>
                            setNewServiceForm({
                              ...newServiceForm,
                              tags: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Sozialer Beitrag
                        </label>
                        <Input
                          placeholder="z.B. 5% für Bildungsprojekte"
                          value={newServiceForm.socialImpact}
                          onChange={(e) =>
                            setNewServiceForm({
                              ...newServiceForm,
                              socialImpact: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Job Form */}
                  {createType === "job" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Job Titel</label>
                        <Input
                          placeholder="z.B. Senior Frontend Developer"
                          value={newJobForm.title}
                          onChange={(e) =>
                            setNewJobForm({
                              ...newJobForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Unternehmen
                          </label>
                          <Input
                            placeholder="z.B. GreenTech Solutions"
                            value={newJobForm.company}
                            onChange={(e) =>
                              setNewJobForm({
                                ...newJobForm,
                                company: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Standort
                          </label>
                          <Input
                            placeholder="z.B. Berlin oder Remote"
                            value={newJobForm.location}
                            onChange={(e) =>
                              setNewJobForm({
                                ...newJobForm,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Arbeitstyp
                          </label>
                          <Select
                            value={newJobForm.type}
                            onValueChange={(value) =>
                              setNewJobForm({
                                ...newJobForm,
                                type: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Arbeitstyp wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Vollzeit">Vollzeit</SelectItem>
                              <SelectItem value="Teilzeit">Teilzeit</SelectItem>
                              <SelectItem value="Freelance">
                                Freelance
                              </SelectItem>
                              <SelectItem value="Praktikum">
                                Praktikum
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Gehalt</label>
                          <Input
                            placeholder="z.B. 50.000-65.000€"
                            value={newJobForm.salary}
                            onChange={(e) =>
                              setNewJobForm({
                                ...newJobForm,
                                salary: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Job Beschreibung
                        </label>
                        <Textarea
                          placeholder="Beschreiben Sie die Stelle und Anforderungen..."
                          value={newJobForm.description}
                          onChange={(e) =>
                            setNewJobForm({
                              ...newJobForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Skills (kommagetrennt)
                        </label>
                        <Input
                          placeholder="z.B. React, TypeScript, Node.js"
                          value={newJobForm.tags}
                          onChange={(e) =>
                            setNewJobForm({
                              ...newJobForm,
                              tags: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Soziale Mission
                        </label>
                        <Input
                          placeholder="z.B. Umweltschutz, Bildung, Gesundheit"
                          value={newJobForm.socialMission}
                          onChange={(e) =>
                            setNewJobForm({
                              ...newJobForm,
                              socialMission: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSubmit} className="flex-1">
                      {createType === "service"
                        ? "Service erstellen"
                        : "Job erstellen"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Abbrechen
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg"
                asChild
              >
                <Link href="/auth/login">Anmelden zum Inserieren</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <div className="flex gap-1">
              <Button
                variant={activeTab === "services" ? "default" : "ghost"}
                onClick={() => setActiveTab("services")}
                className="flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4" />
                Dienstleistungen
              </Button>
              <Button
                variant={activeTab === "jobs" ? "default" : "ghost"}
                onClick={() => setActiveTab("jobs")}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Jobs
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                activeTab === "services"
                  ? "Services durchsuchen..."
                  : "Jobs durchsuchen..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {activeTab === "services" && (
            <>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Preisbereich" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alle">Alle Preise</SelectItem>
                  <SelectItem value="0-50">0-50€/Stunde</SelectItem>
                  <SelectItem value="50-100">50-100€/Stunde</SelectItem>
                  <SelectItem value="100+">100€+/Stunde</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        {/* Services Grid */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={service.image}
                        alt={service.provider}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">
                          {service.provider}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {service.rating} ({service.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                    {service.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        Verifiziert
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {service.location}
                    </div>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 mb-3">
                    <div className="flex items-center gap-1">
                      <HandHeart className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">
                        {service.socialImpact}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      {service.price}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex gap-2 w-full">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => handleAddServiceToCart(e, service)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      In den Warenkorb
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => handleToggleWishlist(e, service)}
                      className={
                        isInWishlist(service.id)
                          ? "text-red-500 border-red-500"
                          : ""
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(service.id) ? "fill-red-500" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Jobs List */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            {job.urgent && (
                              <Badge className="bg-red-100 text-red-800">
                                Dringend
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 font-medium">
                            {job.company}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <Euro className="h-3 w-3" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {job.posted}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {job.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="flex items-center gap-1">
                          <HandHeart className="h-3 w-3 text-blue-600" />
                          <span className="text-xs text-blue-700 font-medium">
                            Mission: {job.socialMission}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Bewerben
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-3 w-3 mr-1" />
                        Merken
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="opacity-90">Aktive Services</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="opacity-90">Offene Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">€25.000</div>
              <div className="opacity-90">Für soziale Projekte</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="opacity-90">Zufriedene Kunden</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Project Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Gesuchtes Projekt nicht dabei? Kein Problem!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Kontaktiere mich einfach für ein individuell auf dich
                zugeschnittenes Angebot.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Ich bin mir sicher, wir finden die perfekte Lösung!
              </p>
              <p className="text-gray-600 mb-8">
                Schreib mir doch eine E-Mail oder eine WhatsApp-Nachricht und
                melde dich bei mir.
                <br />
                <span className="font-semibold">
                  Nein sagen kannst du immer noch!
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  E-Mail schreiben
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold"
                  asChild
                >
                  <a
                    href="https://api.whatsapp.com/send?phone=4915678443874"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Nachricht
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Wie geht es weiter?
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                🤝 Erfolgreiche Zusammenarbeit in 4 Schritten
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Erfahren Sie, wie unsere bewährten 4 Schritte Ihnen helfen, eine
                effektive und erfolgreiche Zusammenarbeit mit uns aufzubauen.
                Von der Bedarfsermittlung über die Angebotserstellung bis zur
                Umsetzung und kontinuierlichen Optimierung begleiten wir Sie auf
                jedem Schritt des Weges.
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 transform -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="group">
                <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:border-blue-400 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="pb-6 relative z-10">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300">
                        <span className="text-3xl font-bold text-white">1</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                    </div>
                    <CardTitle className="text-xl font-bold text-blue-700 mb-3">
                      📞 Kontakt und Bedarfsermittlung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Beginnen Sie Ihre Zusammenarbeit, indem Sie uns
                      kontaktieren. Teilen Sie uns Ihre Bedürfnisse, Ziele und
                      Erwartungen mit.
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Kontakt
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Step 2 */}
              <div className="group">
                <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:border-green-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="pb-6 relative z-10">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300">
                        <span className="text-3xl font-bold text-white">2</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping delay-200"></div>
                    </div>
                    <CardTitle className="text-xl font-bold text-green-700 mb-3">
                      📋 Angebotsphase und Vereinbarung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Nach der Bedarfsermittlung erstellen wir ein
                      maßgeschneidertes Angebot, das Ihren Anforderungen
                      entspricht. Wir besprechen gemeinsam das Angebot und
                      vereinbaren die Details.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      <span>📄</span>
                      Maßgeschneidert
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 3 */}
              <div className="group">
                <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:border-purple-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="pb-6 relative z-10">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300">
                        <span className="text-3xl font-bold text-white">3</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping delay-300"></div>
                    </div>
                    <CardTitle className="text-xl font-bold text-purple-700 mb-3">
                      🚀 Umsetzung und Zusammenarbeit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Sobald alle Vereinbarungen getroffen sind, beginnen wir
                      mit der Umsetzung. Wir arbeiten eng mit Ihnen zusammen, um
                      die vereinbarten Ziele zu erreichen.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                      <span>⚡</span>
                      Professionell
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 4 */}
              <div className="group">
                <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 hover:border-orange-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="pb-6 relative z-10">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300">
                        <span className="text-3xl font-bold text-white">4</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping delay-500"></div>
                    </div>
                    <CardTitle className="text-xl font-bold text-orange-700 mb-3">
                      ⭐ Feedback und Optimierung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Nach Abschluss sammeln wir Ihr Feedback. Basierend darauf
                      optimieren wir unsere Zusammenarbeit kontinuierlich, um
                      Ihre Erwartungen zu übertreffen.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                      <span>🎯</span>
                      Kontinuierlich
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-gray-200">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                  🎯 Bereit für den ersten Schritt?
                </h4>
                <p className="text-gray-600 mb-6">
                  Lassen Sie uns gemeinsam Ihr Projekt zum Erfolg führen!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Jetzt starten
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold"
                    asChild
                  >
                    <a
                      href="https://api.whatsapp.com/send?phone=4915678443874"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Fragen stellen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Mehr über unser Team erfahren
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Besuche unsere Seite "Über uns", um mehr über unser Team, unsere
              Werte und unsere Mission zu erfahren.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/about">
                <Users className="mr-2 h-5 w-5" />
                Über Uns
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seller CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HandHeart className="h-12 w-12 text-yellow-300 animate-pulse" />
              <Heart className="h-10 w-10 text-red-300 animate-pulse" />
              <Users className="h-12 w-12 text-blue-300 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Verkaufe mit Herz und Sinn! Werde Teil unseres Netzwerks
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Bist du bereit, deine Produkte & Dienstleistungen auf mytrueKarma
              zu verkaufen und gleichzeitig einen positiven Einfluss zu
              hinterlassen? Melde dich bei uns an und sei Teil unserer Mission,
              indem du 50% deiner Erlöse transparent an gemeinnützige
              Organisationen spendest.
            </p>
            <p className="text-lg mb-8 opacity-80">
              Gemeinsam können wir die Welt verändern. Melde dich noch heute an
              und werde Teil dieser bewegenden Reise!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/auth/login">
                  <Users className="mr-2 h-5 w-5" />
                  Anmelden
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm bg-transparent font-semibold"
                asChild
              >
                <Link href="/seller/register">
                  <Plus className="mr-2 h-5 w-5" />
                  Registrieren
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
