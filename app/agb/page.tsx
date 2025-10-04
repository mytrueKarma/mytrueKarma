"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  ShoppingCart,
  Globe,
  Truck,
  CreditCard,
  Shield,
  AlertTriangle,
  Scale,
  Euro,
  Package,
  ExternalLink,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function AGBPage() {
  const sections = [
    { id: "geltungsbereich", title: "Geltungsbereich", icon: Globe },
    {
      id: "vertragspartner",
      title: "Vertragspartner, Vertragsschluss",
      icon: FileText,
    },
    {
      id: "vertragssprache",
      title: "Vertragssprache, Vertragstextspeicherung",
      icon: Globe,
    },
    { id: "lieferbedingungen", title: "Lieferbedingungen", icon: Truck },
    { id: "bezahlung", title: "Bezahlung", icon: CreditCard },
    { id: "eigentumsvorbehalt", title: "Eigentumsvorbehalt", icon: Shield },
    { id: "transportschäden", title: "Transportschäden", icon: AlertTriangle },
    {
      id: "gewährleistung",
      title: "Gewährleistung und Garantien",
      icon: Shield,
    },
    { id: "haftung", title: "Haftung", icon: Scale },
    { id: "streitbeilegung", title: "Streitbeilegung", icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ALLGEMEINE GESCHÄFTSBEDINGUNGEN
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Rechtliche Bedingungen für alle Bestellungen in unserem
              Online-Shop
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Inhaltsverzeichnis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sections.map((section, index) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    size="sm"
                    asChild
                    className="justify-start h-auto p-3"
                  >
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <section.icon className="h-4 w-4 text-blue-600" />
                      <span className="text-xs">{section.title}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1: Geltungsbereich */}
          <Card id="geltungsbereich">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                1. Geltungsbereich
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Für alle Bestellungen über unseren Online-Shop gelten die
                nachfolgenden AGB. Unser Online-Shop richtet sich ausschließlich
                an Verbraucher.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Verbraucher
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Jede natürliche Person, die ein Rechtsgeschäft zu Zwecken
                    abschließt, die überwiegend weder ihrer gewerblichen noch
                    ihrer selbständigen beruflichen Tätigkeit zugerechnet werden
                    können.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Unternehmer
                  </h4>
                  <p className="text-green-700 text-sm">
                    Eine natürliche oder juristische Person oder eine
                    rechtsfähige Personengesellschaft, die bei Abschluss eines
                    Rechtsgeschäfts in Ausübung ihrer gewerblichen oder
                    selbständigen beruflichen Tätigkeit handelt.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Vertragspartner */}
          <Card id="vertragspartner">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                2. Vertragspartner, Vertragsschluss, Korrekturmöglichkeiten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500">
                <p className="text-green-800 font-medium">
                  Der Kaufvertrag kommt zustande mit der mytrueKarma e.K.
                </p>
              </div>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Mit Einstellung der Produkte in den Online-Shop geben wir ein
                  verbindliches Angebot zum Vertragsschluss über diese Artikel
                  ab. Sie können unsere Produkte zunächst unverbindlich in den
                  Warenkorb legen und Ihre Eingaben vor Absenden Ihrer
                  verbindlichen Bestellung jederzeit korrigieren, indem Sie die
                  hierfür im Bestellablauf vorgesehenen und erläuterten
                  Korrekturhilfen nutzen.
                </p>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Vertragsschluss
                  </h4>
                  <p className="text-blue-700">
                    Der Vertrag kommt zustande, indem Sie durch Anklicken des
                    Bestellbuttons das Angebot über die im Warenkorb enthaltenen
                    Waren annehmen. Unmittelbar nach dem Absenden der Bestellung
                    erhalten Sie noch einmal eine Bestätigung per E-Mail.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Vertragssprache */}
          <Card id="vertragssprache">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                3. Vertragssprache, Vertragstextspeicherung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    Verfügbare Sprache
                  </h4>
                  <p className="text-purple-700">
                    Die für den Vertragsschluss zur Verfügung stehende Sprache:{" "}
                    <strong>Deutsch</strong>
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Vertragstextspeicherung
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Wir speichern den Vertragstext und senden Ihnen die
                    Bestelldaten und unsere AGB zu. Den Vertragstext können Sie
                    in unserem Kunden-Login einsehen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Lieferbedingungen */}
          <Card id="lieferbedingungen">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-orange-600" />
                4. Lieferbedingungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    Versandweg
                  </h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Wir liefern nur über den Versandweg</li>
                    <li>• Selbstabholung der Ware ist nicht möglich</li>
                    <li>• Wir liefern nicht an Packstationen</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Versandkosten Deutschland
                  </h4>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>
                      • <strong>Paketsendungen:</strong> 4,99 € pauschal
                    </p>
                    <p>
                      • <strong>Briefsendungen:</strong> 1,90 € pauschal
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Printful-Kooperationsprodukte
                </h4>
                <p className="text-yellow-700 text-sm">
                  Für bestimmte Produkte, die in Kooperation mit unserem Partner
                  Printful verschickt werden, berechnen sich die Versandkosten
                  je nach Produkt und Produktionsstandort. Den genauen Preis
                  erfahren Sie aber VOR der Bestellung an der Kasse.
                </p>
              </div>

              <p className="text-sm text-gray-600">
                Zuzüglich zu den angegebenen Produktpreisen kommen noch
                Versandkosten hinzu. Näheres zur Höhe der Versandkosten erfahren
                Sie bei den Angeboten oder in den obigen Absätzen.
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Bezahlung */}
          <Card id="bezahlung">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                5. Bezahlung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 mb-4">
                In unserem Shop stehen Ihnen grundsätzlich die folgenden
                Zahlungsarten zur Verfügung:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Kreditkarte
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Mit Abgabe der Bestellung geben Sie Ihre Kreditkartendaten
                    an. Nach Ihrer Legitimation als rechtmäßiger Karteninhaber
                    wird die Zahlungstransaktion automatisch durchgeführt und
                    Ihre Karte belastet.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">PayPal</h4>
                  <p className="text-purple-700 text-sm">
                    Im Bestellprozess werden Sie auf die Webseite des
                    Online-Anbieters PayPal weitergeleitet. Um den
                    Rechnungsbetrag über PayPal bezahlen zu können, müssen Sie
                    dort registriert sein bzw. sich erst registrieren, mit Ihren
                    Zugangsdaten legitimieren und die Zahlungsanweisung an uns
                    bestätigen. Nach Abgabe der Bestellung im Shop fordern wir
                    PayPal zur Einleitung der Zahlungstransaktion auf.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Giropay</h4>
                  <p className="text-green-700 text-sm">
                    Nach Abgabe der Bestellung werden Sie auf die Webseite Ihrer
                    Bank weitergeleitet. Um den Rechnungsbetrag über Giropay
                    bezahlen zu können, müssen Sie über ein für Online-Banking
                    freigeschaltetes Bankkonto verfügen, sich entsprechend
                    legitimieren und die Zahlungsanweisung an uns bestätigen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Eigentumsvorbehalt */}
          <Card id="eigentumsvorbehalt">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                6. Eigentumsvorbehalt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-red-50 border-l-4 border-red-500">
                <p className="text-red-800 font-medium">
                  Die Ware bleibt bis zur vollständigen Bezahlung unser
                  Eigentum.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Transportschäden */}
          <Card id="transportschäden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                7. Transportschäden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Werden Waren mit offensichtlichen Transportschäden
                  angeliefert, so reklamieren Sie solche Fehler bitte möglichst
                  sofort beim Zusteller und nehmen Sie bitte unverzüglich
                  Kontakt zu uns auf.
                </p>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Wichtig:</strong> Die Versäumung einer Reklamation
                    oder Kontaktaufnahme hat für Ihre gesetzlichen Ansprüche und
                    deren Durchsetzung, insbesondere Ihre Gewährleistungsrechte,
                    keinerlei Konsequenzen. Sie helfen uns aber, unsere eigenen
                    Ansprüche gegenüber dem Frachtführer bzw. der
                    Transportversicherung geltend machen zu können.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Gewährleistung */}
          <Card id="gewährleistung">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                8. Gewährleistung und Garantien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Es gilt das gesetzliche Mängelhaftungsrecht.
                </p>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Informationen zu gegebenenfalls geltenden zusätzlichen
                    Garantien und deren genaue Bedingungen finden Sie jeweils
                    beim Produkt und auf besonderen Informationsseiten im
                    Online-Shop.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 9: Haftung */}
          <Card id="haftung">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                9. Haftung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Unbeschränkte Haftung
                  </h4>
                  <p className="text-red-700">
                    Für Ansprüche aufgrund von Schäden, die durch uns, unsere
                    gesetzlichen Vertreter oder Erfüllungsgehilfen verursacht
                    wurden, haften wir stets unbeschränkt:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                      bei Verletzung des Lebens, des Körpers oder der Gesundheit
                    </li>
                    <li>
                      bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung
                    </li>
                    <li>bei Garantieversprechen, soweit vereinbart</li>
                    <li>
                      soweit der Anwendungsbereich des Produkthaftungsgesetzes
                      eröffnet ist
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Beschränkte Haftung
                  </h4>
                  <p className="text-yellow-700">
                    Bei Verletzung wesentlicher Vertragspflichten
                    (Kardinalpflichten) durch leichte Fahrlässigkeit von uns,
                    unseren gesetzlichen Vertretern oder Erfüllungsgehilfen ist
                    die Haftung der Höhe nach auf den bei Vertragsschluss
                    vorhersehbaren Schaden begrenzt, mit dessen Entstehung
                    typischerweise gerechnet werden muss.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>
                      Im Übrigen sind Ansprüche auf Schadensersatz
                      ausgeschlossen.
                    </strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 10: Streitbeilegung */}
          <Card id="streitbeilegung">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                10. Streitbeilegung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    EU-Kommission Online-Streitbeilegung
                  </h4>
                  <p className="text-blue-700 text-sm mb-3">
                    Die Europäische Kommission stellt eine Plattform zur
                    Online-Streitbeilegung (OS) bereit:
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://ec.europa.eu/odr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      EU Online-Streitbeilegung
                    </a>
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle sind wir nicht verpflichtet
                    und nicht bereit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <p className="text-blue-800 text-sm">
                <strong>Rechtlicher Hinweis:</strong> AGB erstellt mit
                rechtstexter.de.
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
              <Link href="/widerruf">Widerrufsrecht</Link>
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
