"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  X,
  ArrowLeft,
  Save,
  Eye,
  TrendingUp,
  Package,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Accessories",
  "Home & Garden",
  "Travel",
  "Exclusive Designs",
  "Electronics",
  "Books",
  "Sports & Outdoor",
];

const conditions = [
  { value: "new", label: "Neu" },
  { value: "like_new", label: "Wie neu" },
  { value: "good", label: "Gut" },
  { value: "fair", label: "Akzeptabel" },
];

// Mock product data
const mockProduct = {
  id: 1,
  title: "Handmade Ceramic Vase",
  description:
    "Eine wunderschöne handgemachte Keramikvase, perfekt für Ihr Zuhause. Jede Vase ist ein Unikat und wird mit viel Liebe zum Detail gefertigt.",
  price: "45.99",
  category: "Home & Garden",
  condition: "new",
  stock: "12",
  brand: "Handwerk & Mehr",
  tags: ["handgemacht", "keramik", "vase", "wohnaccessoires"],
  socialImpact: true,
  donationPercentage: "10",
  images: ["/ceramic-vase.png", "/placeholder.svg", "/placeholder.svg"],
  status: "active",
  views: 234,
  favorites: 18,
  sold: 8,
  rating: 4.8,
  reviews: 24,
  createdAt: "2024-01-15",
  lastUpdated: "2024-01-20",
};

export default function EditProductPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState(mockProduct);
  const [images, setImages] = useState<string[]>(mockProduct.images);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Produkt aktualisiert!",
        description: "Ihre Änderungen wurden erfolgreich gespeichert.",
      });

      router.push("/seller/products");
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          "Beim Aktualisieren des Produkts ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData((prev) => ({ ...prev, status: newStatus }));

      toast({
        title: "Status aktualisiert",
        description: `Produkt ist jetzt ${
          newStatus === "active" ? "aktiv" : "inaktiv"
        }.`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Status konnte nicht geändert werden.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div
        className={`transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/seller/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu Produkten
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Produkt bearbeiten</h1>
            <p className="text-muted-foreground">
              Aktualisieren Sie Ihre Produktinformationen
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/shop/${params.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Vorschau
              </Link>
            </Button>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="inactive">Inaktiv</SelectItem>
                <SelectItem value="draft">Entwurf</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aufrufe</p>
                  <p className="text-xl font-bold">{formData.views}</p>
                </div>
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Favoriten</p>
                  <p className="text-xl font-bold">{formData.favorites}</p>
                </div>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verkauft</p>
                  <p className="text-xl font-bold text-green-600">
                    {formData.sold}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lagerbestand</p>
                  <p className="text-xl font-bold">{formData.stock}</p>
                </div>
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bewertung</p>
                  <p className="text-xl font-bold">{formData.rating} ⭐</p>
                </div>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Form */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Grunddaten</TabsTrigger>
          <TabsTrigger value="images">Bilder</TabsTrigger>
          <TabsTrigger value="seo">SEO & Tags</TabsTrigger>
          <TabsTrigger value="social">Soziales</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Produktinformationen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Produkttitel *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Marke</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) =>
                        handleInputChange("brand", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preis (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Lagerbestand *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) =>
                        handleInputChange("stock", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Zustand *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) =>
                        handleInputChange("condition", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem
                            key={condition.value}
                            value={condition.value}
                          >
                            {condition.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Produktbilder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <Label
                      htmlFor="images"
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                    >
                      Weitere Bilder hochladen
                    </Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground">
                      Laden Sie bis zu 10 Bilder hoch (JPG, PNG, max. 5MB pro
                      Bild)
                    </p>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-blue-600">
                            Hauptbild
                          </Badge>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO & Tags Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO & Schlagwörter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Tag hinzufügen..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Hinzufügen
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-600"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Impact Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sozialer Einfluss</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="socialImpact"
                    checked={formData.socialImpact}
                    onCheckedChange={(checked) =>
                      handleInputChange("socialImpact", checked as boolean)
                    }
                  />
                  <Label htmlFor="socialImpact">
                    Dieses Produkt unterstützt soziale Projekte
                  </Label>
                </div>

                {formData.socialImpact && (
                  <div className="space-y-2">
                    <Label htmlFor="donationPercentage">
                      Spendenprozentsatz (%)
                    </Label>
                    <Input
                      id="donationPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.donationPercentage}
                      onChange={(e) =>
                        handleInputChange("donationPercentage", e.target.value)
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      {formData.donationPercentage}% des Verkaufspreises (€
                      {(
                        (Number.parseFloat(formData.price) *
                          Number.parseFloat(formData.donationPercentage)) /
                        100
                      ).toFixed(2)}
                      ) wird an soziale Projekte gespendet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Button */}
          <div className="flex gap-4 justify-end pt-6">
            <Button type="button" variant="outline" asChild>
              <Link href="/seller/products">Abbrechen</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Wird gespeichert..." : "Änderungen speichern"}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
