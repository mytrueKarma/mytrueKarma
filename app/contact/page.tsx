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
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  ArrowRight,
  AlertTriangle,
  Users,
  Heart,
  Lightbulb,
  Handshake,
} from "lucide-react";

const contactReasons = [
  {
    icon: Lightbulb,
    title: "Feedback und Verbesserungsvorschläge",
    description: "Teile deine Ideen mit uns",
  },
  {
    icon: Handshake,
    title: "Potenzielle Zusammenarbeit",
    description: "Lass uns gemeinsam etwas bewegen",
  },
  {
    icon: MessageCircle,
    title: "Allgemeine Anfragen und Vorschläge",
    description: "Wir freuen uns auf deine Nachricht",
  },
];

const faqItems = [
  {
    question: "Bietet mytrueKarma internationalen Versand an?",
    answer:
      "Ja, wir bieten internationalen Versand in viele Länder weltweit an. Die Versandkosten und Lieferzeiten variieren je nach Zielort.",
  },
  {
    question:
      "Welche Schritte unternimmt mytrueKarma, um umweltfreundlich zu sein?",
    answer:
      "Wir setzen auf nachhaltige Materialien, umweltfreundliche Verpackungen und unterstützen Umweltprojekte durch unsere 50%-Spendenregel.",
  },
  {
    question: "Kann ich Teil der mytrueKarma-Community werden?",
    answer:
      "Absolut! Du kannst dich für unser Nachwuchsförderungsprogramm bewerben oder einfach durch den Kauf unserer Produkte Teil unserer sozialen Bewegung werden.",
  },
  {
    question:
      "Wie wählt mytrueKarma die wohltätigen Projekte aus, an die gespendet wird?",
    answer:
      "Wir wählen transparent Projekte aus, die einen direkten positiven Einfluss haben. Alle Spenden werden auf unserer Transparenz-Seite veröffentlicht.",
  },
];

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde die Form-Submission Logik stehen
    console.log("Form submitted:", formData);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Kontakt
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4">
              Rund um die Uhr erreichbar – aber lass dich deswegen nicht um den
              Schlaf bringen.
            </p>
            <p className="text-lg opacity-80 mb-8">
              Du kannst mich auch gerne nur tagsüber anrufen und alles andere
              per Email anfragen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Kontaktiere mich gerne für:
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactReasons.map((reason, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="mb-4">
                <reason.icon className="h-12 w-12 mx-auto text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold text-green-600 mb-4">
            Ich freue mich auf deine Nachricht und darauf, wie wir gemeinsam
            etwas bewegen können!
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Erreichbarkeiten</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Öffnungszeiten</h3>
                      <p className="text-muted-foreground">
                        Mon – Fr : 9:30 – 18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Unsere Adresse</h3>
                      <p className="text-muted-foreground">
                        Aufm Hennekamp 96, 40225 Düsseldorf
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        Telefon (& WhatsApp)
                      </h3>
                      <p className="text-muted-foreground">+015678443874</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        asChild
                      >
                        <a
                          href="https://api.whatsapp.com/send?phone=4915678443874"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp öffnen
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-muted-foreground">
                        michael@mytrueKarma.com
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        asChild
                      >
                        <a href="mailto:michael@mytrueKarma.com">
                          <Mail className="h-4 w-4 mr-2" />
                          Email senden
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <Card className="mt-8 p-4 bg-yellow-50 border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">ACHTUNG</h4>
                      <p className="text-yellow-700 text-sm">
                        Unter dieser Adresse befindet sich KEIN LADENGESCHÄFT.
                        Besuche sind nach vorheriger telefonischer Anmeldung
                        Werktags möglich.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl">
                    Schreib uns eine Nachricht
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email">Deine Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="deine@email.com"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Anliegen</Label>
                      <Select onValueChange={handleSubjectChange} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Wähle dein Anliegen aus" />
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
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="other">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Deine Nachricht</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Erzähl uns, wie wir dir helfen können..."
                        rows={6}
                        required
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Nachricht senden
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-xl text-muted-foreground">
            Häufig gestellte Fragen
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.question}</h3>
                  <ArrowRight
                    className={`h-5 w-5 transition-transform ${
                      expandedFaq === index ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für eine Zusammenarbeit?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Lass uns gemeinsam etwas bewegen und die Welt zu einem besseren
              Ort machen!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
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
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm bg-transparent"
                asChild
              >
                <a href="mailto:michael@mytrueKarma.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Email schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
