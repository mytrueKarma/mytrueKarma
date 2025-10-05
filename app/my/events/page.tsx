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
  Calendar,
  Plus,
  Edit,
  Trash2,
  Users,
  Euro,
  MapPin,
  Clock,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Ticket,
  HandHeart,
  PartyPopper,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Mock user events
const mockEvents = [
  {
    id: 1,
    title: "Yoga im Park - Sonnenaufgang",
    category: "Sport & Fitness",
    date: "2025-06-15",
    time: "06:00",
    location: "Hofgarten Düsseldorf",
    price: 12,
    attendees: 18,
    maxAttendees: 25,
    status: "active",
    revenue: 216,
    socialImpact: "20% für mentale Gesundheitsprojekte",
    views: 142,
  },
  {
    id: 2,
    title: "DJ Workshop für Anfänger",
    category: "Musik & Konzerte",
    date: "2025-07-08",
    time: "18:00",
    location: "Music Studio, Düsseldorf",
    price: 45,
    attendees: 8,
    maxAttendees: 12,
    status: "active",
    revenue: 360,
    socialImpact: "15% für Musikschulen",
    views: 89,
  },
  {
    id: 3,
    title: "Veganes Kochevent",
    category: "Food & Drinks",
    date: "2025-05-20",
    time: "17:00",
    location: "Kochschule Düsseldorf",
    price: 35,
    attendees: 15,
    maxAttendees: 15,
    status: "completed",
    revenue: 525,
    socialImpact: "10% für Umweltschutz",
    views: 203,
  },
  {
    id: 4,
    title: "Street Photography Walk",
    category: "Kunst & Kultur",
    date: "2025-06-25",
    time: "14:00",
    location: "Altstadt Düsseldorf",
    price: 20,
    attendees: 0,
    maxAttendees: 20,
    status: "draft",
    revenue: 0,
    socialImpact: "25% für Kunstförderung",
    views: 12,
  },
];

const stats = [
  {
    label: "Aktive Events",
    value: "2",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    label: "Gesamt Teilnehmer",
    value: "41",
    icon: Users,
    color: "text-green-600",
  },
  {
    label: "Einnahmen",
    value: "1.101 €",
    icon: Euro,
    color: "text-purple-600",
  },
  {
    label: "Social Impact",
    value: "165 €",
    icon: HandHeart,
    color: "text-pink-600",
  },
];

export default function MyEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof mockEvents)[0] | null
  >(null);
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    maxAttendees: "",
    description: "",
    socialImpact: "",
    socialImpactPercentage: "10",
  });

  const handleCreateEvent = () => {
    toast({
      title: "Event erstellt!",
      description: `${newEvent.title} wurde erfolgreich erstellt.`,
    });
    setIsCreateDialogOpen(false);
    setNewEvent({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      price: "",
      maxAttendees: "",
      description: "",
      socialImpact: "",
      socialImpactPercentage: "10",
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    toast({
      title: "Event gelöscht",
      description: "Das Event wurde erfolgreich gelöscht.",
      variant: "destructive",
    });
  };

  const handleEditEvent = (event: (typeof mockEvents)[0]) => {
    setSelectedEvent(event);
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
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Abgeschlossen
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <PartyPopper className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meine Events
              </h1>
              <p className="text-gray-600">
                Verwalte deine Veranstaltungen und erreiche Menschen
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button asChild variant="outline">
              <Link href="/events">
                <Eye className="h-4 w-4 mr-2" />
                Alle Events ansehen
              </Link>
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Neues Event erstellen
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Neues Event erstellen</DialogTitle>
                  <DialogDescription>
                    Erstelle ein neues Event und teile es mit der Community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event-Titel *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="z.B. Summer Music Festival"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategorie *</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) =>
                          setNewEvent({ ...newEvent, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategorie wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="musik">
                            Musik & Konzerte
                          </SelectItem>
                          <SelectItem value="kunst">Kunst & Kultur</SelectItem>
                          <SelectItem value="food">Food & Drinks</SelectItem>
                          <SelectItem value="sport">Sport & Fitness</SelectItem>
                          <SelectItem value="bildung">
                            Bildung & Workshop
                          </SelectItem>
                          <SelectItem value="film">Film & Theater</SelectItem>
                          <SelectItem value="party">
                            Party & Nightlife
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Ort *</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                        placeholder="z.B. Rheinpark Düsseldorf"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Datum *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Uhrzeit *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Preis (€) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newEvent.price}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, price: e.target.value })
                        }
                        placeholder="0 für kostenlos"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxAttendees">Max. Teilnehmer *</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        value={newEvent.maxAttendees}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            maxAttendees: e.target.value,
                          })
                        }
                        placeholder="z.B. 50"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      placeholder="Beschreibe dein Event..."
                      rows={4}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <HandHeart className="h-5 w-5 text-green-600" />
                      Social Impact (Optional)
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="socialImpactPercentage">
                          Spenden-Prozentsatz
                        </Label>
                        <Select
                          value={newEvent.socialImpactPercentage}
                          onValueChange={(value) =>
                            setNewEvent({
                              ...newEvent,
                              socialImpactPercentage: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5% der Einnahmen</SelectItem>
                            <SelectItem value="10">
                              10% der Einnahmen
                            </SelectItem>
                            <SelectItem value="15">
                              15% der Einnahmen
                            </SelectItem>
                            <SelectItem value="20">
                              20% der Einnahmen
                            </SelectItem>
                            <SelectItem value="25">
                              25% der Einnahmen
                            </SelectItem>
                            <SelectItem value="50">
                              50% der Einnahmen
                            </SelectItem>
                            <SelectItem value="100">
                              100% der Einnahmen (Charity)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="socialImpact">Verwendungszweck</Label>
                        <Input
                          id="socialImpact"
                          value={newEvent.socialImpact}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              socialImpact: e.target.value,
                            })
                          }
                          placeholder="z.B. für lokale Musikschulen"
                        />
                      </div>
                      {newEvent.price && newEvent.maxAttendees && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700">
                            Geschätzter Social Impact bei vollem Event:{" "}
                            <span className="font-bold">
                              ≈{" "}
                              {(
                                (parseFloat(newEvent.price) *
                                  parseInt(newEvent.maxAttendees) *
                                  parseFloat(newEvent.socialImpactPercentage)) /
                                100
                              ).toFixed(2)}{" "}
                              €
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Abbrechen
                    </Button>
                    <Button
                      onClick={handleCreateEvent}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      Event erstellen
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Event bearbeiten</DialogTitle>
                  <DialogDescription>
                    Bearbeite die Details deines Events
                  </DialogDescription>
                </DialogHeader>
                {selectedEvent && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">Event Titel *</Label>
                      <Input
                        id="edit-title"
                        defaultValue={selectedEvent.title}
                        placeholder="z.B. Yoga im Park"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-category">Kategorie *</Label>
                        <Select defaultValue={selectedEvent.category}>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategorie wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Musik & Konzerte">
                              Musik & Konzerte
                            </SelectItem>
                            <SelectItem value="Kunst & Kultur">
                              Kunst & Kultur
                            </SelectItem>
                            <SelectItem value="Food & Drinks">
                              Food & Drinks
                            </SelectItem>
                            <SelectItem value="Sport & Fitness">
                              Sport & Fitness
                            </SelectItem>
                            <SelectItem value="Bildung & Workshops">
                              Bildung & Workshops
                            </SelectItem>
                            <SelectItem value="Film & Theater">
                              Film & Theater
                            </SelectItem>
                            <SelectItem value="Party & Nightlife">
                              Party & Nightlife
                            </SelectItem>
                            <SelectItem value="Community & Networking">
                              Community & Networking
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-location">
                          Veranstaltungsort *
                        </Label>
                        <Input
                          id="edit-location"
                          defaultValue={selectedEvent.location}
                          placeholder="z.B. Hofgarten Düsseldorf"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-date">Datum *</Label>
                        <Input
                          id="edit-date"
                          type="date"
                          defaultValue={selectedEvent.date}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-time">Uhrzeit *</Label>
                        <Input
                          id="edit-time"
                          type="time"
                          defaultValue={selectedEvent.time}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-price">Preis (€)</Label>
                        <Input
                          id="edit-price"
                          type="number"
                          defaultValue={selectedEvent.price}
                          placeholder="0 für kostenlos"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-maxAttendees">
                        Max. Teilnehmer *
                      </Label>
                      <Input
                        id="edit-maxAttendees"
                        type="number"
                        defaultValue={selectedEvent.maxAttendees}
                        placeholder="z.B. 50"
                      />
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
                          defaultValue={selectedEvent.socialImpact}
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
                            title: "Event aktualisiert!",
                            description:
                              "Die Änderungen wurden erfolgreich gespeichert.",
                          });
                          setIsEditDialogOpen(false);
                        }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
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

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>Deine Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Datum & Zeit</TableHead>
                    <TableHead>Ort</TableHead>
                    <TableHead>Teilnehmer</TableHead>
                    <TableHead>Preis</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Einnahmen</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => {
                    const attendancePercentage =
                      (event.attendees / event.maxAttendees) * 100;
                    return (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-gray-500">
                              {event.category}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm">
                                {new Date(event.date).toLocaleDateString(
                                  "de-DE"
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                {event.time} Uhr
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-semibold">
                              {event.attendees} / {event.maxAttendees}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                                style={{ width: `${attendancePercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {event.price === 0
                              ? "Kostenlos"
                              : `${event.price} €`}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-purple-600">
                              {event.revenue} €
                            </p>
                            {event.socialImpact && (
                              <p className="text-xs text-green-600 flex items-center gap-1">
                                <HandHeart className="h-3 w-3" />
                                Social Impact
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
