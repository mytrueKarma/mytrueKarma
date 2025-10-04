"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  Shield,
  Scale,
  Globe,
  AlertTriangle,
  Copyright,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Scale className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IMPRESSUM</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Rechtliche Informationen und Angaben gemäß § 5 TMG
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Warning Notice */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">
                    WICHTIGER HINWEIS
                  </h3>
                  <p className="text-orange-700">
                    <strong>
                      ACHTUNG – unter dieser Adresse befindet sich KEIN
                      LADENGESCHÄFT
                    </strong>
                  </p>
                  <p className="text-orange-700 mt-1">
                    Besuche sind nach vorheriger telefonischer Anmeldung
                    Werktags möglich.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Angaben gemäß § 5 TMG
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Unternehmen</h3>
                <div className="space-y-2">
                  <p className="font-medium text-green-600">
                    mytrueKarma – Do good deeds by mytrueKarma
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p>Aufm Hennekamp 96</p>
                      <p>40225 Düsseldorf, Deutschland</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Vertreten durch</h3>
                <p className="font-medium">Michael Medvidov</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Kontakt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Telefon</p>
                    <p className="font-medium">+49-15678 443874</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">E-Mail</p>
                    <p className="font-medium">michael@mytruekarma.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Michael Medvidov</p>
                  <p>Aufm Hennekamp 96</p>
                  <p>40225 Düsseldorf</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Das Impressum hat gleichermaßen für die Social Media Auftritte
                  von mytrueKarma Gültigkeit – insbesondere für Facebook,
                  Instagram und Pinterest.{" "}
                  <Link
                    href="/datenschutz"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Informationen zum Datenschutz finden Sie hier.
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-indigo-600" />
                Steuerinformationen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                  Umsatzsteuergesetz
                </p>
                <p className="font-medium">DE294333145</p>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-600" />
                Online-Streitbeilegung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Plattform der EU-Kommission zur Online-Streitbeilegung:
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://ec.europa.eu/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    https://ec.europa.eu/odr
                  </a>
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor
                  einer Verbraucherschlichtungsstelle weder verpflichtet noch
                  bereit.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Copyright */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copyright className="h-5 w-5 text-green-600" />
                Urheberrecht
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
                <p>
                  Downloads und Kopien dieser Seite sind nur für den privaten,
                  nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                  dieser Seite nicht vom Betreiber erstellt wurden, werden die
                  Urheberrechte Dritter beachtet.
                </p>
                <p>
                  Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                  aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
                  Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                  Inhalte umgehend entfernen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-6 border-t">
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
