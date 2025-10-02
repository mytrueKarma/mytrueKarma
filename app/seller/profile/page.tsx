"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Store,
  Settings,
  Upload,
  Save,
  Edit,
  Star,
  TrendingUp,
  Shield,
  Heart,
  MapPin,
  Phone,
  Globe,
  Mail,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const businessTypes = [
  { value: "individual", label: "Einzelperson" },
  { value: "small_business", label: "Kleinunternehmen" },
  { value: "company", label: "Unternehmen" },
  { value: "nonprofit", label: "Gemeinnützige Organisation" },
]

const categories = [
  "Handgemachte Produkte",
  "Mode & Accessoires",
  "Haus & Garten",
  "Elektronik",
  "Bücher & Medien",
  "Sport & Freizeit",
  "Gesundheit & Schönheit",
  "Lebensmittel",
  "Kunst & Sammlerobjekte",
  "Sonstiges",
]

// Mock seller profile data
const mockSellerProfile = {
  businessName: "Handwerk & Mehr",
  businessType: "small_business",
  description:
    "Wir sind ein kleines Familienunternehmen, das handgemachte Keramikprodukte und nachhaltige Wohnaccessoires herstellt. Unsere Mission ist es, schöne und funktionale Gegenstände zu schaffen, die gleichzeitig die Umwelt schonen.",
  website: "https://handwerk-und-mehr.de",
  phone: "+49 30 12345678",
  email: "info@handwerk-und-mehr.de",
  address: "Musterstraße 123",
  city: "Berlin",
  postalCode: "10115",
  country: "Deutschland",
  taxId: "123/456/78901",
  categories: ["Handgemachte Produkte", "Haus & Garten"],
  socialImpactCommitment: true,
  donationPercentage: "10",
  profileImage: "/placeholder-user.jpg",
  coverImage: "/placeholder.svg",
  rating: 4.8,
  totalReviews: 156,
  totalSales: 1247,
  joinedDate: "2024-01-15",
  verified: true,
}

export default function SellerProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState(mockSellerProfile)

  useEffect(() => {
    setIsVisible(true)
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleCategory = (category: string) => {
    setProfileData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Profil gespeichert!",
        description: "Ihre Änderungen wurden erfolgreich gespeichert.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Speichern des Profils ist ein Fehler aufgetreten.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = (type: "profile" | "cover") => {
    // Mock image upload - in real app, would upload to service like Vercel Blob
    toast({
      title: "Bild hochgeladen",
      description: `${type === "profile" ? "Profilbild" : "Titelbild"} wurde erfolgreich hochgeladen.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div
        className={`transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Verkäufer Profil</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Geschäftsinformationen und Einstellungen</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isSaving}
            className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Speichern..." : "Speichern"}
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Bearbeiten
              </>
            )}
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-green-600 via-blue-600 to-teal-700">
            <div className="absolute inset-0 bg-black/20"></div>
            {isEditing && (
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4 z-10"
                onClick={() => handleImageUpload("cover")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Titelbild ändern
              </Button>
            )}
          </div>

          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt={profileData.businessName} />
                  <AvatarFallback className="text-2xl">{profileData.businessName.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2"
                    onClick={() => handleImageUpload("profile")}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{profileData.businessName}</h2>
                  {profileData.verified && (
                    <Badge className="bg-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Verifiziert
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.city}, {profileData.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {profileData.rating} ({profileData.totalReviews} Bewertungen)
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {profileData.totalSales} Verkäufe
                  </div>
                  {profileData.socialImpactCommitment && (
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      {profileData.donationPercentage}% für soziale Projekte
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">{profileData.description}</p>

                <div className="flex flex-wrap gap-2">
                  {profileData.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Management Tabs */}
      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business">Geschäftsdaten</TabsTrigger>
          <TabsTrigger value="contact">Kontakt</TabsTrigger>
          <TabsTrigger value="social">Soziales Engagement</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>

        {/* Business Information Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Geschäftsinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Geschäftsname</Label>
                  <Input
                    id="businessName"
                    value={profileData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Geschäftstyp</Label>
                  <Select
                    value={profileData.businessType}
                    onValueChange={(value) => handleInputChange("businessType", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Geschäftsbeschreibung</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Produktkategorien</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={profileData.categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        disabled={!isEditing}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Steuernummer</Label>
                <Input
                  id="taxId"
                  value={profileData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Kontaktinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Geschäftsadresse</h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Straße und Hausnummer</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">Stadt</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postleitzahl</Label>
                    <Input
                      id="postalCode"
                      value={profileData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Land</Label>
                    <Input id="country" value={profileData.country} disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Impact Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Soziales Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="socialImpactCommitment"
                  checked={profileData.socialImpactCommitment}
                  onCheckedChange={(checked) => handleInputChange("socialImpactCommitment", checked as boolean)}
                  disabled={!isEditing}
                />
                <Label htmlFor="socialImpactCommitment">
                  Ich spende einen Teil meiner Verkäufe für soziale Projekte
                </Label>
              </div>

              {profileData.socialImpactCommitment && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="donationPercentage">Spendenprozentsatz (%)</Label>
                    <Input
                      id="donationPercentage"
                      type="number"
                      min="0"
                      max="50"
                      value={profileData.donationPercentage}
                      onChange={(e) => handleInputChange("donationPercentage", e.target.value)}
                      disabled={!isEditing}
                    />
                    <p className="text-sm text-muted-foreground">
                      Aktuell spenden Sie {profileData.donationPercentage}% Ihrer Verkäufe für soziale Projekte
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Ihre soziale Wirkung</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-green-700">Gesamt gespendet</p>
                        <p className="text-xl font-bold text-green-800">€124.78</p>
                      </div>
                      <div>
                        <p className="text-green-700">Unterstützte Projekte</p>
                        <p className="text-xl font-bold text-green-800">3</p>
                      </div>
                      <div>
                        <p className="text-green-700">Menschen geholfen</p>
                        <p className="text-xl font-bold text-green-800">~45</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Kontoeinstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Benachrichtigungen</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>E-Mail-Benachrichtigungen für neue Bestellungen</Label>
                      <p className="text-sm text-muted-foreground">
                        Erhalten Sie eine E-Mail bei jeder neuen Bestellung
                      </p>
                    </div>
                    <Checkbox defaultChecked disabled={!isEditing} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing-E-Mails</Label>
                      <p className="text-sm text-muted-foreground">Tipps und Updates für Verkäufer</p>
                    </div>
                    <Checkbox defaultChecked disabled={!isEditing} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bewertungsbenachrichtigungen</Label>
                      <p className="text-sm text-muted-foreground">Benachrichtigung bei neuen Produktbewertungen</p>
                    </div>
                    <Checkbox defaultChecked disabled={!isEditing} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Datenschutz</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profil öffentlich sichtbar</Label>
                      <p className="text-sm text-muted-foreground">Ihr Verkäuferprofil ist für Kunden sichtbar</p>
                    </div>
                    <Checkbox defaultChecked disabled={!isEditing} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Verkaufsstatistiken anzeigen</Label>
                      <p className="text-sm text-muted-foreground">Zeigen Sie Ihre Verkaufszahlen auf Ihrem Profil</p>
                    </div>
                    <Checkbox defaultChecked disabled={!isEditing} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-600">Gefahrenzone</h3>

                <div className="space-y-3">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    Verkäuferkonto deaktivieren
                  </Button>

                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    Konto löschen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
