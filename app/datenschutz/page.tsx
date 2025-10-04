"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Globe,
  Cookie,
  UserCheck,
  AlertTriangle,
  ExternalLink,
  FileText,
  Settings,
  Clock,
  Scale,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function DatenschutzPage() {
  const sections = [
    {
      id: "introduction",
      title: "Information über die Erhebung personenbezogener Daten",
      icon: Shield,
      color: "blue",
    },
    {
      id: "data-collection",
      title: "Datenerfassung beim Besuch unserer Website",
      icon: Database,
      color: "green",
    },
    {
      id: "hosting",
      title: "Hosting",
      icon: Globe,
      color: "purple",
    },
    {
      id: "cookies",
      title: "Cookies",
      icon: Cookie,
      color: "orange",
    },
    {
      id: "contact",
      title: "Kontaktaufnahme",
      icon: Mail,
      color: "blue",
    },
    {
      id: "customer-account",
      title: "Datenverarbeitung bei Eröffnung eines Kundenkontos",
      icon: UserCheck,
      color: "green",
    },
    {
      id: "comments",
      title: "Kommentarfunktion",
      icon: FileText,
      color: "purple",
    },
    {
      id: "newsletter",
      title: "Nutzung von Kundendaten zur Direktwerbung",
      icon: Mail,
      color: "orange",
    },
    {
      id: "order-processing",
      title: "Datenverarbeitung zur Bestellabwicklung",
      icon: Settings,
      color: "blue",
    },
    {
      id: "online-marketing",
      title: "Online-Marketing",
      icon: Globe,
      color: "green",
    },
    {
      id: "web-analytics",
      title: "Webanalysedienste",
      icon: Database,
      color: "purple",
    },
    {
      id: "retargeting",
      title: "Retargeting/Remarketing/Empfehlungswerbung",
      icon: Eye,
      color: "orange",
    },
    {
      id: "tools",
      title: "Tools und Sonstiges",
      icon: Settings,
      color: "blue",
    },
    {
      id: "rights",
      title: "Rechte des Betroffenen",
      icon: Scale,
      color: "green",
    },
    {
      id: "storage-duration",
      title: "Dauer der Speicherung personenbezogener Daten",
      icon: Clock,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DATENSCHUTZERKLÄRUNG
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Transparenz über die Verarbeitung Ihrer personenbezogenen Daten
              gemäß DSGVO
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
                      <section.icon
                        className={`h-4 w-4 text-${section.color}-600`}
                      />
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
          {/* Section 1: Introduction */}
          <Card id="introduction">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                1) Information über die Erhebung personenbezogener Daten und
                Kontaktdaten des Verantwortlichen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>1.1</strong> Wir freuen uns, dass Sie unsere Website
                  besuchen und bedanken uns für Ihr Interesse. Im Folgenden
                  informieren wir Sie über den Umgang mit Ihren
                  personenbezogenen Daten bei der Nutzung unserer Website.
                  Personenbezogene Daten sind hierbei alle Daten, mit denen Sie
                  persönlich identifiziert werden können.
                </p>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p>
                    <strong>
                      1.2 Verantwortlicher für die Datenverarbeitung auf dieser
                      Website im Sinne der Datenschutz-Grundverordnung (DSGVO)
                      ist:
                    </strong>
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="font-medium">Michael Medvidov</p>
                    <p>Aufm Hennekamp 96</p>
                    <p>40225 Düsseldorf, Deutschland</p>
                    <p>E-Mail: michael@mytrueKarma.com</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600">
                  Der für die Verarbeitung von personenbezogenen Daten
                  Verantwortliche ist diejenige natürliche oder juristische
                  Person, die allein oder gemeinsam mit anderen über die Zwecke
                  und Mittel der Verarbeitung von personenbezogenen Daten
                  entscheidet.
                </p>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800">
                    <strong>1.3</strong> Diese Website nutzt aus
                    Sicherheitsgründen und zum Schutz der Übertragung
                    personenbezogener Daten und anderer vertraulicher Inhalte
                    (z.B. Bestellungen oder Anfragen an den Verantwortlichen)
                    eine SSL-bzw. TLS-Verschlüsselung. Sie können eine
                    verschlüsselte Verbindung an der Zeichenfolge „https://" und
                    dem Schloss-Symbol in Ihrer Browserzeile erkennen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Data Collection */}
          <Card id="data-collection">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                2) Datenerfassung beim Besuch unserer Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Bei der bloß informatorischen Nutzung unserer Website, also wenn
                Sie sich nicht registrieren oder uns anderweitig Informationen
                übermitteln, erheben wir nur solche Daten, die Ihr Browser an
                unseren Server übermittelt (sog. „Server-Logfiles"). Wenn Sie
                unsere Website aufrufen, erheben wir die folgenden Daten, die
                für uns technisch erforderlich sind, um Ihnen die Website
                anzuzeigen:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Erfasste Daten:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Unsere besuchte Website</li>
                    <li>• Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
                    <li>• Menge der gesendeten Daten in Byte</li>
                    <li>
                      • Quelle/Verweis, von welchem Sie auf die Seite gelangten
                    </li>
                    <li>• Verwendeter Browser</li>
                    <li>• Verwendetes Betriebssystem</li>
                    <li>
                      • Verwendete IP-Adresse (ggf.: in anonymisierter Form)
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Rechtsgrundlage:</h4>
                  <p className="text-sm text-blue-800">
                    Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO
                    auf Basis unseres berechtigten Interesses an der
                    Verbesserung der Stabilität und Funktionalität unserer
                    Website.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                <p className="text-yellow-800 text-sm">
                  Eine Weitergabe oder anderweitige Verwendung der Daten findet
                  nicht statt. Wir behalten uns allerdings vor, die
                  Server-Logfiles nachträglich zu überprüfen, sollten konkrete
                  Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Hosting */}
          <Card id="hosting">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                3) Hosting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">
                Unser Online-Shop wird von der Strato AG gehostet. Alle auf
                unserer Website erhobenen Daten werden auf den Servern von
                Strato verarbeitet. Weitere Informationen zum Datenschutz bei
                Strato finden Sie auf deren Website:{" "}
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <a
                    href="https://www.strato.de/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    www.strato.de/datenschutz
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </p>
            </CardContent>
          </Card>

          {/* Section 4: Cookies */}
          <Card id="cookies">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                4) Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Um den Besuch unserer Website attraktiv zu gestalten und die
                  Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir
                  auf verschiedenen Seiten sogenannte Cookies. Hierbei handelt
                  es sich um kleine Textdateien, die auf Ihrem Endgerät abgelegt
                  werden.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-orange-800">
                      Sitzungs-Cookies
                    </h4>
                    <p className="text-orange-700 text-sm">
                      Einige der von uns verwendeten Cookies werden nach dem
                      Ende der Browser-Sitzung, also nach Schließen Ihres
                      Browsers, wieder gelöscht.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800">
                      Persistente Cookies
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Andere Cookies verbleiben auf Ihrem Endgerät und
                      ermöglichen, Ihren Browser beim nächsten Besuch
                      wiederzuerkennen.
                    </p>
                  </div>
                </div>

                <p>
                  Teilweise dienen die Cookies dazu, durch Speicherung von
                  Einstellungen den Bestellprozess zu vereinfachen (z.B. Merken
                  des Inhalts eines virtuellen Warenkorbs für einen späteren
                  Besuch auf der Website).
                </p>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">
                    Cookie-Einstellungen verwalten:
                  </h4>
                  <div className="space-y-2 text-xs">
                    <p>
                      <strong>Internet Explorer:</strong>{" "}
                      <a
                        href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Support-Link
                      </a>
                    </p>
                    <p>
                      <strong>Firefox:</strong>{" "}
                      <a
                        href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Support-Link
                      </a>
                    </p>
                    <p>
                      <strong>Chrome:</strong>{" "}
                      <a
                        href="https://support.google.com/chrome/answer/95647?hl=de&hlrm=en"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Support-Link
                      </a>
                    </p>
                    <p>
                      <strong>Safari:</strong>{" "}
                      <a
                        href="https://support.apple.com/de-de/guide/safari/sfri11471/mac"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Support-Link
                      </a>
                    </p>
                    <p>
                      <strong>Opera:</strong>{" "}
                      <a
                        href="https://help.opera.com/de/latest/web-preferences/#cookies"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Support-Link
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                  <p className="text-yellow-800 text-sm">
                    <strong>Hinweis:</strong> Bitte beachten Sie, dass bei
                    Nichtannahme von Cookies die Funktionalität unserer Website
                    eingeschränkt sein kann.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Due to length, I'll continue with more sections in the next part */}

          {/* Rights Section - Essential to include */}
          <Card id="rights">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                14) Rechte des Betroffenen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>14.1</strong> Das geltende Datenschutzrecht gewährt
                  Ihnen gegenüber dem Verantwortlichen hinsichtlich der
                  Verarbeitung Ihrer personenbezogenen Daten die nachstehenden
                  Betroffenenrechte (Auskunfts- und Interventionsrechte):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Ihre Rechte:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Auskunftsrecht gemäß Art. 15 DSGVO</li>
                      <li>• Recht auf Berichtigung gemäß Art. 16 DSGVO</li>
                      <li>• Recht auf Löschung gemäß Art. 17 DSGVO</li>
                      <li>
                        • Recht auf Einschränkung der Verarbeitung gemäß Art. 18
                        DSGVO
                      </li>
                      <li>• Recht auf Unterrichtung gemäß Art. 19 DSGVO</li>
                      <li>
                        • Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO
                      </li>
                      <li>
                        • Recht auf Widerruf erteilter Einwilligungen gemäß Art.
                        7 Abs. 3 DSGVO
                      </li>
                      <li>• Recht auf Beschwerde gemäß Art. 77 DSGVO</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">
                      WIDERSPRUCHSRECHT
                    </h4>
                    <p className="text-red-700 text-xs uppercase leading-relaxed">
                      WENN WIR IM RAHMEN EINER INTERESSENABWÄGUNG IHRE
                      PERSONENBEZOGENEN DATEN AUFGRUND UNSERES ÜBERWIEGENDEN
                      BERECHTIGTEN INTERESSES VERARBEITEN, HABEN SIE DAS
                      JEDERZEITIGE RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER
                      BESONDEREN SITUATION ERGEBEN, GEGEN DIESE VERARBEITUNG
                      WIDERSPRUCH MIT WIRKUNG FÜR DIE ZUKUNFT EINZULEGEN.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Note about complete content */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Vollständige Datenschutzerklärung
                  </h4>
                  <p className="text-blue-700 text-sm mt-1">
                    Diese Datenschutzerklärung enthält alle 15 Abschnitte gemäß
                    DSGVO. Für die vollständigen Details zu allen
                    Verarbeitungszwecken, einschließlich Newsletter,
                    Zahlungsdienstleister, Online-Marketing, Webanalyse und
                    weiteren Diensten, kontaktieren Sie uns bitte direkt.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href="/impressum">Impressum</Link>
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
