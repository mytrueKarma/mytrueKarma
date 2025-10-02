"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Store, Upload, CheckCircle, ArrowRight, Shield, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
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

export default function SellerRegistrationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    businessName: "",
    businessType: "",
    description: "",
    website: "",
    phone: "",

    // Step 2: Address & Legal
    address: "",
    city: "",
    postalCode: "",
    country: "Deutschland",
    taxId: "",

    // Step 3: Business Details
    categories: [] as string[],
    expectedMonthlyVolume: "",
    socialImpactCommitment: false,
    donationPercentage: "0",

    // Step 4: Documents
    businessLicense: null as File | null,
    taxDocument: null as File | null,

    // Step 5: Agreement
    termsAccepted: false,
    privacyAccepted: false,
    socialMissionAccepted: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return <div>Loading...</div>
  }

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Verkäufer-Antrag eingereicht!",
        description: "Wir werden Ihren Antrag innerhalb von 2-3 Werktagen prüfen.",
      })

      router.push("/seller/dashboard")
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Einreichen des Antrags ist ein Fehler aufgetreten.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.businessName && formData.businessType && formData.description
      case 2:
        return formData.address && formData.city && formData.postalCode
      case 3:
        return formData.categories.length > 0 && formData.expectedMonthlyVolume
      case 4:
        return true // Documents are optional
      case 5:
        return formData.termsAccepted && formData.privacyAccepted && formData.socialMissionAccepted
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Store className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold">Verkäufer werden</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Schließen Sie sich unserer sozialen Gemeinschaft an und machen Sie einen Unterschied
        </p>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
          <TrendingUp className="h-12 w-12 mx-auto text-green-600 mb-4" />
          <h3 className="font-semibold mb-2">Steigern Sie Ihr Geschäft</h3>
          <p className="text-sm text-muted-foreground">Erreichen Sie neue Kunden und steigern Sie Ihren Umsatz</p>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
          <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h3 className="font-semibold mb-2">Soziale Gemeinschaft</h3>
          <p className="text-sm text-muted-foreground">Teil einer Bewegung für positive Veränderung werden</p>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
          <Shield className="h-12 w-12 mx-auto text-purple-600 mb-4" />
          <h3 className="font-semibold mb-2">Vertrauenswürdig</h3>
          <p className="text-sm text-muted-foreground">Transparente Plattform mit fairen Gebühren</p>
        </Card>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step < currentStep
                    ? "bg-green-600 text-white"
                    : step === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 5 && (
                <div
                  className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card>
        <CardHeader>
          <CardTitle>
            Schritt {currentStep} von 5: {currentStep === 1 && "Grundinformationen"}
            {currentStep === 2 && "Adresse & Rechtliches"}
            {currentStep === 3 && "Geschäftsdetails"}
            {currentStep === 4 && "Dokumente"}
            {currentStep === 5 && "Vereinbarungen"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Geschäftsname *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="z.B. Mein Handwerk Shop"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Geschäftstyp *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleInputChange("businessType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Geschäftstyp wählen" />
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
                <Label htmlFor="description">Geschäftsbeschreibung *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Beschreiben Sie Ihr Geschäft und was Sie verkaufen..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://www.meinshop.de"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer (optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address & Legal */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Geschäftsadresse *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Straße und Hausnummer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">Stadt *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Berlin"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postleitzahl *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="10115"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Land</Label>
                  <Input id="country" value={formData.country} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Steuernummer (optional)</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="123/456/78901"
                />
                <p className="text-sm text-muted-foreground">Erforderlich für Unternehmen mit Umsatzsteuerpflicht</p>
              </div>
            </div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Produktkategorien * (mindestens eine auswählen)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedMonthlyVolume">Erwartetes monatliches Verkaufsvolumen *</Label>
                <Select
                  value={formData.expectedMonthlyVolume}
                  onValueChange={(value) => handleInputChange("expectedMonthlyVolume", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Volumen wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-500">€0 - €500</SelectItem>
                    <SelectItem value="500-2000">€500 - €2.000</SelectItem>
                    <SelectItem value="2000-5000">€2.000 - €5.000</SelectItem>
                    <SelectItem value="5000-10000">€5.000 - €10.000</SelectItem>
                    <SelectItem value="10000+">€10.000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="socialImpactCommitment"
                    checked={formData.socialImpactCommitment}
                    onCheckedChange={(checked) => handleInputChange("socialImpactCommitment", checked as boolean)}
                  />
                  <Label htmlFor="socialImpactCommitment">
                    Ich möchte einen Teil meiner Verkäufe für soziale Projekte spenden
                  </Label>
                </div>

                {formData.socialImpactCommitment && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="donationPercentage">Spendenprozentsatz (%)</Label>
                    <Input
                      id="donationPercentage"
                      type="number"
                      min="0"
                      max="50"
                      value={formData.donationPercentage}
                      onChange={(e) => handleInputChange("donationPercentage", e.target.value)}
                      placeholder="5"
                    />
                    <p className="text-sm text-muted-foreground">Empfohlen: 5-10% für maximale soziale Wirkung</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Laden Sie relevante Dokumente hoch, um Ihren Verkäufer-Status zu verifizieren. Diese Dokumente sind
                optional, können aber den Genehmigungsprozess beschleunigen.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Gewerbeschein (optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <Label htmlFor="businessLicense" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      Datei auswählen
                    </Label>
                    <Input
                      id="businessLicense"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("businessLicense", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {formData.businessLicense && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.businessLicense.name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxDocument">Steuerliche Bescheinigung (optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <Label htmlFor="taxDocument" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      Datei auswählen
                    </Label>
                    <Input
                      id="taxDocument"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("taxDocument", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {formData.taxDocument && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.taxDocument.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Agreements */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="termsAccepted">
                      Ich akzeptiere die{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Allgemeinen Geschäftsbedingungen
                      </Link>{" "}
                      *
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="privacyAccepted">
                      Ich akzeptiere die{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Datenschutzerklärung
                      </Link>{" "}
                      *
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="socialMissionAccepted"
                    checked={formData.socialMissionAccepted}
                    onCheckedChange={(checked) => handleInputChange("socialMissionAccepted", checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="socialMissionAccepted">
                      Ich unterstütze die soziale Mission von mytrueKarma und verpflichte mich zu transparentem und
                      ethischem Handel *
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Was passiert als nächstes?</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Wir prüfen Ihren Antrag innerhalb von 2-3 Werktagen</li>
                  <li>• Sie erhalten eine E-Mail mit dem Ergebnis</li>
                  <li>• Nach Genehmigung können Sie sofort mit dem Verkauf beginnen</li>
                  <li>• Unser Support-Team steht Ihnen bei Fragen zur Verfügung</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-transparent"
            >
              Zurück
            </Button>

            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Weiter
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep) || isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Wird eingereicht..." : "Antrag einreichen"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
