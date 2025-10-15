"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-products";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { addProduct } = useProducts();
  const [productType, setProductType] = useState<
    "product" | "event" | "immobilie" | "service"
  >("product");

  // Gemeinsame Felder
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(true);
  const [rating, setRating] = useState("4.5");
  const [reviews, setReviews] = useState("0");

  // Event-spezifische Felder
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [socialImpact, setSocialImpact] = useState("");

  // Immobilien-spezifische Felder
  const [size, setSize] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [priceType, setPriceType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [energyClass, setEnergyClass] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");

  // Service-spezifische Felder
  const [provider, setProvider] = useState("");
  const [hourlyRate, setHourlyRate] = useState(true);
  const [verified, setVerified] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category || !image) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    const baseProduct = {
      name,
      price: parseFloat(price),
      originalPrice: parseFloat(originalPrice) || parseFloat(price),
      rating: parseFloat(rating),
      reviews: parseInt(reviews),
      image,
      category,
      inStock,
      type: productType,
    };

    let productData: any = baseProduct;

    if (productType === "event") {
      productData = {
        ...baseProduct,
        date,
        time,
        location,
        attendees: 0,
        maxAttendees: parseInt(maxAttendees) || 100,
        description,
        organizer,
        tags,
        socialImpact,
      };
    } else if (productType === "immobilie") {
      productData = {
        ...baseProduct,
        size: parseInt(size),
        rooms: parseInt(rooms),
        bathrooms: parseInt(bathrooms),
        propertyType,
        purpose,
        priceType,
        features,
        description,
        socialImpact,
        energyClass,
        yearBuilt: parseInt(yearBuilt),
        location,
      };
    } else if (productType === "service") {
      productData = {
        ...baseProduct,
        provider,
        hourlyRate,
        location,
        description,
        tags,
        verified,
        socialImpact,
      };
    }

    try {
      addProduct(productData);
      toast({
        title: "Erfolgreich!",
        description: `${
          productType === "product"
            ? "Produkt"
            : productType === "event"
            ? "Event"
            : productType === "immobilie"
            ? "Immobilie"
            : "Service"
        } wurde hinzugefügt.`,
      });
      router.push("/shop");
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Etwas ist schiefgelaufen.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Neues Produkt hinzufügen</h1>
        <p className="text-muted-foreground">
          Fügen Sie ein neues Produkt, Event oder eine Immobilie hinzu
        </p>
      </div>

      <Tabs value={productType} onValueChange={(v: any) => setProductType(v)}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="product">Produkt</TabsTrigger>
          <TabsTrigger value="event">Event</TabsTrigger>
          <TabsTrigger value="immobilie">Immobilie</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          {/* Gemeinsame Felder */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basisinformationen</CardTitle>
              <CardDescription>
                Grundlegende Informationen für alle Typen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Produktname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategorie *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {productType === "product" && (
                        <>
                          <SelectItem value="Herrenmode">Herrenmode</SelectItem>
                          <SelectItem value="Damenmode">Damenmode</SelectItem>
                          <SelectItem value="Accessoires">
                            Accessoires
                          </SelectItem>
                          <SelectItem value="Haushalt">Haushalt</SelectItem>
                          <SelectItem value="Möbel">Möbel</SelectItem>
                          <SelectItem value="Sport">Sport</SelectItem>
                          <SelectItem value="Exklusiv">Exklusiv</SelectItem>
                        </>
                      )}
                      {productType === "event" && (
                        <SelectItem value="Events">Events</SelectItem>
                      )}
                      {productType === "immobilie" && (
                        <SelectItem value="Immobilien">Immobilien</SelectItem>
                      )}
                      {productType === "service" && (
                        <>
                          <SelectItem value="IT & Tech">IT & Tech</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Beratung">Beratung</SelectItem>
                          <SelectItem value="Gesundheit">Gesundheit</SelectItem>
                          <SelectItem value="Bildung">Bildung</SelectItem>
                          <SelectItem value="Umwelt">Umwelt</SelectItem>
                          <SelectItem value="Soziales">Soziales</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preis (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Preis (€)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Bild URL *</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Bewertung (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviews">Anzahl Bewertungen</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStock}
                  onCheckedChange={(checked) => setInStock(checked as boolean)}
                />
                <Label htmlFor="inStock">Verfügbar</Label>
              </div>
            </CardContent>
          </Card>

          {/* Event-spezifische Felder */}
          <TabsContent value="event">
            <Card>
              <CardHeader>
                <CardTitle>Event-Details</CardTitle>
                <CardDescription>
                  Spezifische Informationen für Events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Datum</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Uhrzeit</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ort</Label>
                    <Input
                      id="location"
                      placeholder="Event-Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Max. Teilnehmer</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      placeholder="100"
                      value={maxAttendees}
                      onChange={(e) => setMaxAttendees(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizer">Veranstalter</Label>
                  <Input
                    id="organizer"
                    placeholder="Veranstalter-Name"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    placeholder="Event-Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialImpact">Social Impact</Label>
                  <Textarea
                    id="socialImpact"
                    placeholder="Beschreiben Sie den sozialen Impact..."
                    value={socialImpact}
                    onChange={(e) => setSocialImpact(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tag hinzufügen"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddTag())
                      }
                    />
                    <Button type="button" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Immobilien-spezifische Felder */}
          <TabsContent value="immobilie">
            <Card>
              <CardHeader>
                <CardTitle>Immobilien-Details</CardTitle>
                <CardDescription>
                  Spezifische Informationen für Immobilien
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Immobilientyp</Label>
                    <Select
                      value={propertyType}
                      onValueChange={setPropertyType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Typ wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wohnung">Wohnung</SelectItem>
                        <SelectItem value="Haus">Haus</SelectItem>
                        <SelectItem value="Büro">Büro</SelectItem>
                        <SelectItem value="Grundstück">Grundstück</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Zweck</Label>
                    <Select value={purpose} onValueChange={setPurpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Zweck wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Verkauf">Verkauf</SelectItem>
                        <SelectItem value="Vermietung">Vermietung</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {purpose === "Vermietung" && (
                  <div className="space-y-2">
                    <Label htmlFor="priceType">Preistyp</Label>
                    <Input
                      id="priceType"
                      placeholder="z.B. Monat, Woche"
                      value={priceType}
                      onChange={(e) => setPriceType(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="immobilienLocation">Lage</Label>
                  <Input
                    id="immobilienLocation"
                    placeholder="Stadt, Stadtteil"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Größe (m²)</Label>
                    <Input
                      id="size"
                      type="number"
                      placeholder="100"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Zimmer</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="3"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Badezimmer</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="2"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="energyClass">Energieklasse</Label>
                    <Input
                      id="energyClass"
                      placeholder="A, B, C..."
                      value={energyClass}
                      onChange={(e) => setEnergyClass(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Baujahr</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="2020"
                      value={yearBuilt}
                      onChange={(e) => setYearBuilt(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="immobilienDescription">Beschreibung</Label>
                  <Textarea
                    id="immobilienDescription"
                    placeholder="Immobilien-Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="immobilienSocialImpact">Social Impact</Label>
                  <Textarea
                    id="immobilienSocialImpact"
                    placeholder="Beschreiben Sie den sozialen Impact..."
                    value={socialImpact}
                    onChange={(e) => setSocialImpact(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ausstattung</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Feature hinzufügen"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddFeature())
                      }
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="ml-2"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Tab */}
          <TabsContent value="service">
            <Card>
              <CardHeader>
                <CardTitle>Service-Details</CardTitle>
                <CardDescription>
                  Spezifische Informationen für Dienstleistungen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Anbieter *</Label>
                  <Input
                    id="provider"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="Name des Anbieters"
                    required={productType === "service"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-location">Standort</Label>
                  <Input
                    id="service-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="z.B. München, Berlin, Remote"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-description">Beschreibung *</Label>
                  <Textarea
                    id="service-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detaillierte Beschreibung der Dienstleistung"
                    rows={4}
                    required={productType === "service"}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hourly-rate"
                    checked={hourlyRate}
                    onCheckedChange={(checked) =>
                      setHourlyRate(checked as boolean)
                    }
                  />
                  <Label htmlFor="hourly-rate">Preis ist Stundensatz</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={verified}
                    onCheckedChange={(checked) =>
                      setVerified(checked as boolean)
                    }
                  />
                  <Label htmlFor="verified">Verifizierter Anbieter</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-tags">Tags/Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="service-tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Tag eingeben und Enter drücken"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-social-impact">Sozialer Impact</Label>
                  <Textarea
                    id="service-social-impact"
                    value={socialImpact}
                    onChange={(e) => setSocialImpact(e.target.value)}
                    placeholder="Beschreiben Sie den sozialen Impact (z.B. '5% für Bildungsprojekte')"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Abbrechen
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {productType === "product"
                ? "Produkt"
                : productType === "event"
                ? "Event"
                : productType === "immobilie"
                ? "Immobilie"
                : "Service"}{" "}
              hinzufügen
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
