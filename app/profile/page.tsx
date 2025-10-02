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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Settings,
  Heart,
  ShoppingCart,
  Star,
  Award,
  HandHeart,
  Target,
  TreePine,
  Users,
  Package,
  TrendingUp,
  Shield,
  Bell,
  Eye,
  Lock,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";

// Mock data for user profile
const mockUserProfile = {
  id: 1,
  firstName: "Anna",
  lastName: "Müller",
  email: "anna.mueller@email.com",
  phone: "+49 151 12345678",
  avatar: "/placeholder-user.jpg",
  location: "Berlin, Deutschland",
  joinDate: "März 2024",
  bio: "Leidenschaftliche Unterstützerin nachhaltiger Projekte und sozialer Innovationen. Liebe es, durch bewusste Einkäufe positive Veränderungen zu bewirken.",
  socialImpactScore: 2450,
  totalDonated: 127.5,
  projectsSupported: 8,
  ordersCount: 23,
  wishlistItems: 12,
  membershipLevel: "Gold",
  badges: [
    {
      name: "Sozial Bewusst",
      icon: "💚",
      description: "Unterstützt regelmäßig soziale Projekte",
    },
    {
      name: "Umwelt Champion",
      icon: "🌱",
      description: "Kauft bevorzugt nachhaltige Produkte",
    },
    {
      name: "Community Helper",
      icon: "🤝",
      description: "Aktiv in der mytrueKarma Community",
    },
    {
      name: "Early Adopter",
      icon: "⭐",
      description: "Einer der ersten mytrueKarma Nutzer",
    },
  ],
  preferences: {
    newsletter: true,
    orderUpdates: true,
    socialUpdates: false,
    marketingEmails: false,
  },
  privacy: {
    profileVisibility: "public",
    showDonations: true,
    showOrders: false,
  },
};

const recentOrders = [
  {
    id: "ORD-001",
    date: "15. Sep 2024",
    items: 3,
    total: 89.97,
    status: "Geliefert",
    impact: "€4.50 gespendet",
    image: "/mytruekarma-men-s-t-shirt-lifestyle.jpg",
  },
  {
    id: "ORD-002",
    date: "02. Sep 2024",
    items: 1,
    total: 27.0,
    status: "Geliefert",
    impact: "€1.35 gespendet",
    image: "/accessories-bags-social.jpg",
  },
  {
    id: "ORD-003",
    date: "20. Aug 2024",
    items: 2,
    total: 64.99,
    status: "Geliefert",
    impact: "€3.25 gespendet",
    image: "/organic-cotton-shirt.jpg",
  },
];

const supportedProjects = [
  {
    name: "Eden Reforestation",
    category: "Umwelt",
    donated: "€45.20",
    impact: "67 Bäume gepflanzt",
    icon: "🌳",
  },
  {
    name: "Ukraine Hilfe",
    category: "Humanitär",
    donated: "€32.15",
    impact: "8 Familien unterstützt",
    icon: "❤️",
  },
  {
    name: "Bildung für Alle",
    category: "Bildung",
    donated: "€28.90",
    impact: "12 Kinder unterstützt",
    icon: "📚",
  },
  {
    name: "Clean Water Project",
    category: "Wasser",
    donated: "€21.25",
    impact: "5 Brunnen finanziert",
    icon: "💧",
  },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState(mockUserProfile);
  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    bio: profileData.bio,
  });

  const handleSaveProfile = () => {
    setProfileData({ ...profileData, ...formData });
    setIsEditing(false);
    toast({
      title: "Profil aktualisiert!",
      description: "Ihre Profildaten wurden erfolgreich gespeichert.",
    });
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setProfileData({
      ...profileData,
      preferences: { ...profileData.preferences, [key]: value },
    });
    toast({
      title: "Einstellung gespeichert",
      description: "Ihre Präferenz wurde aktualisiert.",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              Anmeldung erforderlich
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Bitte melden Sie sich an, um Ihr Profil zu sehen.
            </p>
            <Button asChild>
              <Link href="/auth/login">Zur Anmeldung</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Profile Header */}
      <section className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                  <AvatarImage
                    src={profileData.avatar}
                    alt={`${profileData.firstName} ${profileData.lastName}`}
                  />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-500">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Profilbild ändern</DialogTitle>
                      <DialogDescription>
                        Laden Sie ein neues Profilbild hoch
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Drag & Drop oder klicken Sie hier, um ein Bild
                        hochzuladen
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-300">
                    {profileData.membershipLevel}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm opacity-90 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Dabei seit {profileData.joinDate}
                  </div>
                </div>

                <p className="text-lg opacity-90 mb-6 max-w-2xl">
                  {profileData.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">
                      €{profileData.totalDonated}
                    </div>
                    <div className="text-sm opacity-80">Total gespendet</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-300">
                      {profileData.projectsSupported}
                    </div>
                    <div className="text-sm opacity-80">
                      Projekte unterstützt
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">
                      {profileData.ordersCount}
                    </div>
                    <div className="text-sm opacity-80">Bestellungen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-300">
                      {profileData.socialImpactScore}
                    </div>
                    <div className="text-sm opacity-80">Impact Score</div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Profil bearbeiten
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="orders">Bestellungen</TabsTrigger>
              <TabsTrigger value="impact">Social Impact</TabsTrigger>
              <TabsTrigger value="badges">Auszeichnungen</TabsTrigger>
              <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Letzte Aktivitäten
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                          <div
                            key={order.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Image
                              src={order.image}
                              alt="Bestellung"
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">
                                  {order.id}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-green-600 border-green-600"
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {order.items} Artikel • €{order.total} •{" "}
                                {order.date}
                              </p>
                              <p className="text-xs text-green-600 font-medium">
                                {order.impact}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                  {/* Impact Score */}
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <HandHeart className="h-5 w-5 text-green-600" />
                        Impact Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {profileData.socialImpactScore}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Punkte durch soziales Engagement
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Noch 550 Punkte bis zum nächsten Level
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wishlist */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Wunschliste
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500 mb-2">
                          {profileData.wishlistItems}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Artikel gespeichert
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/wishlist">Zur Wunschliste</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Alle Bestellungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {order.date}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">
                              {order.items} Artikel • €{order.total}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              {order.impact}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Details ansehen
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TreePine className="h-5 w-5 text-green-600" />
                      Unterstützte Projekte
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supportedProjects.map((project, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="text-2xl">{project.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{project.name}</h4>
                            <p className="text-sm text-gray-600">
                              {project.category}
                            </p>
                            <p className="text-sm font-medium text-green-600">
                              {project.donated}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {project.impact}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Impact Zusammenfassung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          €{profileData.totalDonated}
                        </div>
                        <p className="text-gray-600">Total gespendet</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            67
                          </div>
                          <p className="text-sm text-gray-600">
                            Bäume gepflanzt
                          </p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            25
                          </div>
                          <p className="text-sm text-gray-600">
                            Menschen geholfen
                          </p>
                        </div>
                      </div>

                      <Button className="w-full" asChild>
                        <Link href="/transparency">Alle Projekte ansehen</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Meine Auszeichnungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                      >
                        <div className="text-4xl">{badge.icon}</div>
                        <div>
                          <h4 className="font-bold text-yellow-800">
                            {badge.name}
                          </h4>
                          <p className="text-sm text-yellow-700">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-600" />
                      Benachrichtigungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(profileData.preferences).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={key} className="flex-1">
                            {key === "newsletter" && "Newsletter"}
                            {key === "orderUpdates" && "Bestellungsupdates"}
                            {key === "socialUpdates" && "Social Updates"}
                            {key === "marketingEmails" && "Marketing E-Mails"}
                          </Label>
                          <Button
                            variant={value ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePreferenceChange(key, !value)}
                          >
                            {value ? "An" : "Aus"}
                          </Button>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      Privatsphäre
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profil Sichtbarkeit</Label>
                      <Select
                        defaultValue={profileData.privacy.profileVisibility}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Öffentlich</SelectItem>
                          <SelectItem value="friends">Nur Freunde</SelectItem>
                          <SelectItem value="private">Privat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Spenden anzeigen</Label>
                      <Button
                        variant={
                          profileData.privacy.showDonations
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                      >
                        {profileData.privacy.showDonations ? "An" : "Aus"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Bestellungen anzeigen</Label>
                      <Button
                        variant={
                          profileData.privacy.showOrders ? "default" : "outline"
                        }
                        size="sm"
                      >
                        {profileData.privacy.showOrders ? "An" : "Aus"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Danger Zone */}
              <Card className="mt-6 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Trash2 className="h-5 w-5" />
                    Gefährlicher Bereich
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Diese Aktionen sind irreversibel. Bitte seien Sie
                    vorsichtig.
                  </p>
                  <Button variant="destructive" size="sm">
                    Konto löschen
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Edit Profile Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Profil bearbeiten</DialogTitle>
            <DialogDescription>
              Aktualisieren Sie Ihre Profildaten
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vorname</Label>
              <Input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Nachname</Label>
              <Input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>E-Mail</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Standort</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSaveProfile} className="flex-1">
              Speichern
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Abbrechen
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
