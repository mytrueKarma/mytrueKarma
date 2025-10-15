"use client";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Home,
  Plus,
  Edit,
  Trash2,
  Euro,
  MapPin,
  Maximize,
  Bed,
  Bath,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  HandHeart,
  Building2,
  Calendar,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Mock user properties
const mockProperties = [
  {
    id: 1,
    title: "Moderne 3-Zimmer Wohnung",
    type: "Wohnung",
    purpose: "Vermietung",
    price: 1450,
    priceType: "Monat",
    location: "Düsseldorf, Pempelfort",
    size: 85,
    rooms: 3,
    bathrooms: 1,
    status: "active",
    views: 342,
    inquiries: 12,
    socialImpact: "5% der Mieteinnahmen für Bildungsprojekte",
    energyClass: "B",
  },
  {
    id: 2,
    title: "Charmantes Stadthaus",
    type: "Haus",
    purpose: "Verkauf",
    price: 485000,
    location: "Düsseldorf, Oberkassel",
    size: 120,
    rooms: 4,
    bathrooms: 2,
    status: "active",
    views: 589,
    inquiries: 24,
    socialImpact: "2% der Provision für Wohnprojekte",
    energyClass: "A",
  },
  {
    id: 3,
    title: "Penthouse mit Dachterrasse",
    type: "Wohnung",
    purpose: "Verkauf",
    price: 695000,
    location: "Düsseldorf, Hafen",
    size: 140,
    rooms: 4,
    bathrooms: 2,
    status: "sold",
    views: 892,
    inquiries: 45,
    socialImpact: "3% für lokale Sozialeinrichtungen",
    energyClass: "A+",
  },
  {
    id: 4,
    title: "Gemütliches Studio-Apartment",
    type: "Wohnung",
    purpose: "Vermietung",
    price: 850,
    priceType: "Monat",
    location: "Düsseldorf, Stadtmitte",
    size: 45,
    rooms: 1,
    bathrooms: 1,
    status: "draft",
    views: 23,
    inquiries: 0,
    socialImpact: "10% für Jugendförderung",
    energyClass: "C",
  },
];

const stats = [
  { label: "Aktive Anzeigen", value: "2", icon: Home, color: "text-blue-600" },
  {
    label: "Gesamt Anfragen",
    value: "81",
    icon: TrendingUp,
    color: "text-green-600",
  },
  { label: "Aufrufe", value: "1.846", icon: Eye, color: "text-purple-600" },
  {
    label: "Social Impact",
    value: "8.250 €",
    icon: HandHeart,
    color: "text-pink-600",
  },
];

export default function MyImmobilienPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<
    (typeof mockProperties)[0] | null
  >(null);
  const { toast } = useToast();

  const [newProperty, setNewProperty] = useState({
    title: "",
    type: "",
    purpose: "",
    price: "",
    priceType: "Monat",
    location: "",
    size: "",
    rooms: "",
    bathrooms: "",
    description: "",
    energyClass: "",
    socialImpact: "",
    socialImpactPercentage: "5",
  });

  const handleCreateProperty = () => {
    toast({
      title: "Immobilie erstellt!",
      description: `${newProperty.title} wurde erfolgreich erstellt.`,
    });
    setIsCreateDialogOpen(false);
    setNewProperty({
      title: "",
      type: "",
      purpose: "",
      price: "",
      priceType: "Monat",
      location: "",
      size: "",
      rooms: "",
      bathrooms: "",
      description: "",
      energyClass: "",
      socialImpact: "",
      socialImpactPercentage: "5",
    });
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((p) => p.id !== id));
    toast({
      title: "Immobilie gelöscht",
      description: "Die Immobilie wurde erfolgreich gelöscht.",
      variant: "destructive",
    });
  };

  const handleEditProperty = (property: (typeof mockProperties)[0]) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aktiv
          </Badge>
        );
      case "sold":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verkauft/Vermietet
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Entwurf
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Meine Immobilien
              </h1>
              <p className="text-gray-600">
                Verwalte deine Immobilien-Anzeigen
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button asChild variant="outline">
              <Link href="/immobilien">
                <Eye className="h-4 w-4 mr-2" />
                Alle Immobilien ansehen
              </Link>
            </Button>
            <Link href="/admin/products/new">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Neue Immobilie inserieren
              </Button>
            </Link>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Immobilie bearbeiten</DialogTitle>
                  <DialogDescription>
                    Bearbeite die Details deiner Immobilie
                  </DialogDescription>
                </DialogHeader>
                {selectedProperty && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">Titel der Anzeige *</Label>
                      <Input
                        id="edit-title"
                        defaultValue={selectedProperty.title}
                        placeholder="z.B. Moderne 3-Zimmer Wohnung"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-type">Objekttyp *</Label>
                        <Select defaultValue={selectedProperty.type}>
                          <SelectTrigger>
                            <SelectValue placeholder="Typ wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Wohnung">Wohnung</SelectItem>
                            <SelectItem value="Haus">Haus</SelectItem>
                            <SelectItem value="Grundstück">
                              Grundstück
                            </SelectItem>
                            <SelectItem value="Gewerbe">Gewerbe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-purpose">Zweck *</Label>
                        <Select defaultValue={selectedProperty.purpose}>
                          <SelectTrigger>
                            <SelectValue placeholder="Zweck" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Verkauf">Verkauf</SelectItem>
                            <SelectItem value="Vermietung">
                              Vermietung
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-energyClass">
                          Energieklasse *
                        </Label>
                        <Select defaultValue={selectedProperty.energyClass}>
                          <SelectTrigger>
                            <SelectValue placeholder="Klasse" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="E">E</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-location">Adresse / Lage *</Label>
                      <Input
                        id="edit-location"
                        defaultValue={selectedProperty.location}
                        placeholder="z.B. Düsseldorf, Pempelfort"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-price">
                          {selectedProperty.purpose === "Vermietung"
                            ? "Kaltmiete"
                            : "Kaufpreis"}{" "}
                          (€) *
                        </Label>
                        <Input
                          id="edit-price"
                          type="number"
                          defaultValue={selectedProperty.price}
                          placeholder={
                            selectedProperty.purpose === "Vermietung"
                              ? "z.B. 1200"
                              : "z.B. 450000"
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-size">Wohnfläche (m²) *</Label>
                        <Input
                          id="edit-size"
                          type="number"
                          defaultValue={selectedProperty.size}
                          placeholder="z.B. 85"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-rooms">Anzahl Zimmer *</Label>
                        <Input
                          id="edit-rooms"
                          type="number"
                          defaultValue={selectedProperty.rooms}
                          placeholder="z.B. 3"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-bathrooms">
                          Anzahl Badezimmer *
                        </Label>
                        <Input
                          id="edit-bathrooms"
                          type="number"
                          defaultValue={selectedProperty.bathrooms}
                          placeholder="z.B. 1"
                        />
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <HandHeart className="h-5 w-5 text-green-600" />
                        Social Impact
                      </h4>
                      <div>
                        <Label htmlFor="edit-socialImpact">
                          Verwendungszweck
                        </Label>
                        <Input
                          id="edit-socialImpact"
                          defaultValue={selectedProperty.socialImpact}
                          placeholder="z.B. für Bildungsprojekte"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                      >
                        Abbrechen
                      </Button>
                      <Button
                        onClick={() => {
                          toast({
                            title: "Immobilie aktualisiert!",
                            description:
                              "Die Änderungen wurden erfolgreich gespeichert.",
                          });
                          setIsEditDialogOpen(false);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-green-600"
                      >
                        Änderungen speichern
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg`}
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Properties Table */}
        <Card>
          <CardHeader>
            <CardTitle>Deine Immobilien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Immobilie</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Lage</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Preis</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Statistiken</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{property.title}</p>
                          <Badge variant="outline" className="mt-1">
                            {property.energyClass}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{property.type}</p>
                          <p className="text-xs text-gray-500">
                            {property.purpose}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Maximize className="h-3 w-3 text-gray-500" />
                            {property.size}m²
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
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-blue-600">
                            {property.price.toLocaleString("de-DE")} €
                          </p>
                          {property.priceType && (
                            <p className="text-xs text-gray-500">
                              /{property.priceType}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(property.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-gray-500" />
                            {property.views} Aufrufe
                          </p>
                          <p className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            {property.inquiries} Anfragen
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProperty(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
