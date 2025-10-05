"use client";

import { useState } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function KontaktPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Nachricht gesendet!",
      description: "Wir werden uns schnellstmöglich bei dir melden.",
    });
    setFormData({ email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h1>
            <p className="text-xl mb-2">
              <strong>Rund um die Uhr erreichbar</strong> – aber lass dich
              deswegen nicht um den Schlaf bringen.
            </p>
            <p className="text-lg opacity-90">
              Du kannst mich auch gerne nur tagsüber anrufen und alles andere
              per Email anfragen.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Kontaktiere mich gerne für:
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">→</span>
                  <span>Feedback und Verbesserungsvorschläge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">→</span>
                  <span>Potenzielle Zusammenarbeit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">→</span>
                  <span>Allgemeine Anfragen und Vorschläge</span>
                </li>
              </ul>
              <p className="mt-6 text-lg text-muted-foreground italic">
                Ich freue mich auf deine Nachricht und darauf, wie wir gemeinsam
                etwas bewegen können!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">Erreichbarkeiten</h3>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">
                        Öffnungszeiten
                      </h4>
                      <p className="text-muted-foreground">
                        Mon – Fr : 9:30 – 18:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">
                        Unsere Adresse
                      </h4>
                      <p className="text-muted-foreground">
                        Aufm Hennekamp 96, 40225 Düsseldorf
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">
                        Telefon (& WhatsApp)
                      </h4>
                      <a
                        href="tel:+015678443874"
                        className="text-muted-foreground hover:text-purple-600 transition-colors"
                      >
                        +015678443874
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-100 rounded-lg">
                      <Mail className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email</h4>
                      <a
                        href="mailto:michael@mytrueKarma.com"
                        className="text-muted-foreground hover:text-pink-600 transition-colors"
                      >
                        michael@mytrueKarma.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warning Card */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-yellow-900">
                        ACHTUNG – unter dieser Adresse befindet sich KEIN
                        LADENGESCHÄFT
                      </h4>
                      <p className="text-yellow-800">
                        Besuche sind nach vorheriger telefonischer Anmeldung
                        Werktags möglich.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  Schreib uns eine Nachricht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Deine Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="deine@email.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Anliegen *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">
                          Feedback und Verbesserungsvorschläge
                        </SelectItem>
                        <SelectItem value="partnership">
                          Partnerschaft oder Zusammenarbeit
                        </SelectItem>
                        <SelectItem value="general">
                          Allgemeine Anfrage
                        </SelectItem>
                        <SelectItem value="support">
                          Technischer Support
                        </SelectItem>
                        <SelectItem value="other">Sonstiges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Deine Nachricht *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Erzähl uns, wie wir dir helfen können..."
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    size="lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Nachricht senden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-white rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-green-600">
                  Bietet mytrueKarma internationalen Versand an?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ja, wir bieten internationalen Versand in viele Länder
                  weltweit an. Die Versandkosten und Lieferzeiten variieren je
                  nach Zielort. Du kannst die genauen Versandkosten während des
                  Checkout-Prozesses einsehen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-green-600">
                  Welche Schritte unternimmt mytrueKarma, um umweltfreundlich zu
                  sein?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Wir setzen auf nachhaltige Materialien, umweltfreundliche
                  Verpackungen und arbeiten mit Partnern zusammen, die unsere
                  Werte teilen. Zudem unterstützen wir aktiv
                  Aufforstungsprojekte wie Eden Reforestation und andere
                  Umweltschutzprojekte durch unsere Spendenaktionen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-green-600">
                  Kann ich Teil der mytrueKarma-Community werden?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolut! Du kannst dich als Verkäufer registrieren, eigene
                  Produkte anbieten, Dienstleistungen anbieten, Immobilien
                  inserieren oder Events organisieren. Jede Aktivität auf
                  unserer Plattform trägt zu unserem Social Impact bei. Melde
                  dich einfach an und werde Teil unserer Bewegung!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-green-600">
                  Wie wählt mytrueKarma die wohltätigen Projekte aus, an die
                  gespendet wird?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Wir wählen Projekte nach strengen Kriterien aus: Transparenz,
                  messbare Wirkung und Ausrichtung auf unsere Werte. Unsere
                  Community kann Projekte vorschlagen, und wir veröffentlichen
                  regelmäßig Updates über die unterstützten Initiativen auf
                  unserer Transparenz-Seite. 50% unserer Erlöse fließen direkt
                  in diese Projekte.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Schließe dich 50+ Abonnenten an
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Bleibe auf dem Laufenden mit allem, was du wissen musst.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="sample@mail.com"
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8">
                Abonnieren
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
