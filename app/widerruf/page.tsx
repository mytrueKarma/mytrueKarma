"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  RotateCcw,
  Clock,
  Mail,
  FileText,
  AlertCircle,
  Euro,
  Package,
  Calendar,
  Download,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WiderrufPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    orderNumber: "",
    orderDate: "",
    products: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Widerrufsformular eingereicht:", formData);
    alert(
      "Ihr Widerruf wurde erfolgreich eingereicht. Sie erhalten eine Bestätigung per E-Mail."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-red-600 via-orange-600 to-blue-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <RotateCcw className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              WIDERRUFSRECHT
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Ihr Recht auf Widerruf binnen 14 Tagen ohne Angabe von Gründen
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Widerrufsrecht Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Ihr Widerrufsrecht
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium">
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
                  Gründen diesen Vertrag zu widerrufen.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag an dem Sie
                oder ein von Ihnen benannter Dritter, der nicht der Beförderer
                ist, die letzte Ware in Besitz genommen haben bzw. hat.
              </p>
            </CardContent>
          </Card>

          {/* How to Exercise Right */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Ausübung des Widerrufsrechts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    Kontaktdaten
                  </h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Michael Medvidov</strong>
                    </p>
                    <p>Aufm Hennekamp 96</p>
                    <p>40225 Düsseldorf, Deutschland</p>
                    <p>E-Mail: michael@medvidov.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Send className="h-4 w-4 text-green-500" />
                    Mitteilungsformen
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Mit der Post versandter Brief</li>
                    <li>• Telefax</li>
                    <li>• E-Mail</li>
                    <li>• Online-Formular auf unserer Website</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  Sie können das Muster-Widerrufsformular oder eine andere
                  eindeutige Erklärung auch auf unserer Webseite{" "}
                  <Link
                    href="/kontakt"
                    className="text-green-600 underline hover:text-green-800"
                  >
                    https://mytruekarma.com/kontakt/
                  </Link>{" "}
                  elektronisch ausfüllen und übermitteln. Machen Sie von dieser
                  Möglichkeit Gebrauch, so werden wir Ihnen unverzüglich (z. B.
                  per E-Mail) eine Bestätigung über den Eingang eines solchen
                  Widerrufs übermitteln.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                <p className="text-yellow-800 text-sm">
                  <strong>Wichtig:</strong> Zur Wahrung der Widerrufsfrist
                  reicht es aus, dass Sie die Mitteilung über die Ausübung des
                  Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consequences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-orange-600" />
                Folgen des Widerrufs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    Rückzahlung
                  </h4>
                  <p className="text-orange-700">
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                    Zahlungen, die wir von Ihnen erhalten haben, einschließlich
                    der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die
                    sich daraus ergeben, dass Sie eine andere Art der Lieferung
                    als die von uns angebotene, günstigste Standardlieferung
                    gewählt haben), unverzüglich und spätestens binnen vierzehn
                    Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
                    Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Zahlungsmittel
                  </h4>
                  <p className="text-blue-700">
                    Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel,
                    das Sie bei der ursprünglichen Transaktion eingesetzt haben,
                    es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
                    vereinbart; in keinem Fall werden Ihnen wegen dieser
                    Rückzahlung Entgelte berechnet.
                  </p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Rücksendung der Waren
                  </h4>
                  <p className="text-red-700">
                    Wir können die Rückzahlung verweigern, bis wir die Waren
                    wieder zurückerhalten haben oder bis Sie den Nachweis
                    erbracht haben, dass Sie die Waren zurückgesandt haben, je
                    nachdem, welches der frühere Zeitpunkt ist.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Rücksendung an:</h4>
                  <div className="text-sm text-gray-700">
                    <p>Michael Medvidov</p>
                    <p>Aufm Hennekamp 96</p>
                    <p>40225 Düsseldorf, Deutschland</p>
                    <p>michael@medvidov.com</p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    Wichtige Fristen
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Rücksendung binnen 14 Tagen</li>
                    <li>• Sie tragen die Rücksendungskosten</li>
                    <li>• Wertverlust nur bei unsachgemäßer Prüfung</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Widerruf Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Muster-Widerrufsformular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-purple-800 text-sm mb-4">
                    <strong>Hinweis:</strong> Wenn Sie den Vertrag widerrufen
                    wollen, dann füllen Sie bitte dieses Formular aus und senden
                    Sie es zurück.
                  </p>
                  <p className="text-purple-700 text-sm">
                    An Michael Medvidov, Aufm Hennekamp 96, 40225 Düsseldorf,
                    Deutschland, michael@medvidov.com
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name des/der Verbraucher(s) *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail-Adresse *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="ihre@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Anschrift des/der Verbraucher(s) *
                  </Label>
                  <Textarea
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Straße, Hausnummer, PLZ Ort"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Bestellnummer</Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          orderNumber: e.target.value,
                        })
                      }
                      placeholder="z.B. ORD-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderDate">Bestellt am / erhalten am</Label>
                    <Input
                      id="orderDate"
                      type="date"
                      value={formData.orderDate}
                      onChange={(e) =>
                        setFormData({ ...formData, orderDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="products">
                    Gekaufte Waren / Dienstleistungen
                  </Label>
                  <Textarea
                    id="products"
                    value={formData.products}
                    onChange={(e) =>
                      setFormData({ ...formData, products: e.target.value })
                    }
                    placeholder="Beschreibung der Waren oder Dienstleistungen"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">
                    Grund für den Widerruf (optional)
                  </Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    placeholder="Optional: Grund für den Widerruf"
                    rows={2}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Widerrufserklärung:</strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen
                    Vertrag über den Kauf der oben genannten Waren / die
                    Erbringung der oben genannten Dienstleistung.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Widerruf einreichen
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Als PDF herunterladen
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  * Pflichtfelder. Das ausgefüllte Formular wird per E-Mail an
                  uns gesendet. Sie erhalten eine Bestätigung über den Eingang
                  Ihres Widerrufs.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <p className="text-blue-800 text-sm">
                <strong>Rechtlicher Hinweis:</strong> Widerrufsbelehrung
                erstellt mit rechtstexter.de.
              </p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href="/impressum">Impressum</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/datenschutz">Datenschutz</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/kontakt">Kontakt</Link>
            </Button>
            <Button asChild>
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
