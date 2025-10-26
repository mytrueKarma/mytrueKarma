"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Gift,
  TreePine,
  Euro,
  TrendingUp,
  ExternalLink,
  Instagram,
  Mail,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FallingHeartsBackground from "@/components/falling-hearts-background";
import { TransparencyFeed } from "@/components/transparency/TransparencyFeed";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Transaction } from "@/components/transparency/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatDateTime(date: Date) {
  return date.toLocaleString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const currentProjects = [
  {
    name: "EDEN REFORESTATION PROJECTS",
    description:
      "Die gemeinnützige Organisation pflanzt mehr als 67 verschiedene einheimische Baumarten im Nordwesten Madagaskars.",
    details:
      "Es entstehen gesunde einheimische Wälder, die mehr als 200.000 Pflanzen- und Tierarten beherbergen, welche nirgendwo sonst auf der Welt vorkommen.",
    icon: TreePine,
    color: "text-green-600",
    bgColor: "bg-green-50",
    slogan: "You Play, We Plant!",
  },
  {
    name: "PROJEKT HILFE FÜR UKRAINE",
    description:
      "UNICEF versorgt geflüchtete Familien in der Ukraine und in den Nachbarländern mit dem Nötigsten.",
    details:
      "Mit Lebensmitteln und Wasser, Hygieneartikeln, wärmender Kleidung und Erste-Hilfe-Sets. Entlang der Fluchtrouten richten wir sichere Anlaufstellen ein.",
    icon: Heart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    slogan: "Hier möchten wir unbedingt helfen!",
  },
];

const yearlyReports = [
  {
    year: "2021",
    income: 15,
    expenses: 26,
    details: [
      {
        type: "Ausgaben",
        item: "Anmeldung Melderegister Düsseldorf 01.07.2021",
        amount: -26,
      },
      {
        type: "Einnahmen",
        item: "Männer Premium T-Shirt am 25.07.2021, NL",
        amount: 11,
      },
      { type: "Einnahmen", item: "Trucker Cap am 18.07.2021, NL", amount: 4 },
    ],
  },
  {
    year: "2022",
    income: 1.31,
    expenses: 0,
    details: [{ type: "Einnahmen", item: "März – 2 x T-Shirts", amount: 1.31 }],
  },
  {
    year: "2023",
    income: 0,
    expenses: 0,
    details: [],
  },
  {
    year: "2024",
    income: 5.9,
    expenses: 0,
    details: [
      {
        type: "Einnahmen",
        item: "Good Vibes Only T-Shirt by myKarma",
        amount: 1.9,
      },
      { type: "Einnahmen", item: "Turnbeutel", amount: 4.0 },
    ],
  },
];

const instagramUpdates = [
  "Es gibt Fortschritte 😊 wir haben den nächsten sale!",
  "Positive news! Wir haben endlich Bewegung auf dem Konto 😊❤️",
  "Neues Jahr, Neues Glück 🍀 bisher aber noch keine Veränderung.",
  "Kontogebühren belasteten alles derzeit .. Suche nach neuen Konto läuft ..",
  "😍 myKarma hat die ersten Sales im Jahr 2022 gemacht! 🎉",
];

export default function TransparencyPage() {
  const { data } = useSWR<Transaction[]>("/api/transactions", fetcher);
  const [summary, setSummary] = useState<{
    revenue: number;
    expenses: number;
    details: { productName: string; revenue: number }[];
  }>({ revenue: 0, expenses: 0, details: [] });
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    setNow(formatDateTime(new Date()));
    if (!data) return;
    const year = 2024;
    const filtered = data.filter((tx) => tx.year === year);
    const revenue = filtered.reduce((sum, tx) => sum + tx.revenue, 0);
    // Dummy: expenses always 0 for now
    const details = filtered.map((tx) => ({
      productName: tx.productName,
      revenue: tx.revenue,
    }));
    setSummary({ revenue, expenses: 0, details });
  }, [data]);

  const [isVisible, setIsVisible] = useState(false);
  const [currentDonationPot] = useState(5);
  const [selectedYear, setSelectedYear] = useState("2024");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const donationProgress = (currentDonationPot / 50) * 100;

  return (
    <div className="space-y-12">
      {/* Hero Section: Spendentopf & Projekte */}
      <section
        className="relative min-h-[60vh] text-white overflow-hidden"
        style={{ background: "#201e30" }}
      >
        {/* Custom animated hearts background (FinisherHeader style) */}
        <FallingHeartsBackground
          count={100}
          size={{ min: 2, max: 8, pulse: 0 }}
          speed={{ x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.6 } }}
          colors={{
            background: "#201e30",
            particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"],
          }}
          blending="overlay"
          opacity={{ center: 1, edge: 0 }}
          skew={-2}
          shapes={["c"]}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Unsere Herzensprojekte
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Aktuell suchen wir noch nach weiteren Projekten, wo wir mit
              unseren Umsätzen tatkräftig und sinnvoll unterstützen können!
            </p>
            <p className="text-lg opacity-80">
              Sobald der Spendentopf 50€ erreicht, erfolgt immer eine Spende an
              ein ausgewähltes Projekt.
            </p>
          </div>
        </div>
      </section>

      {/* Aktueller Spendentopf Status & Projekte */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">
                Aktueller Spendentopf Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-6xl font-bold text-green-600 mb-2">
                  {currentDonationPot}€
                </div>
                <p className="text-muted-foreground">von 50€ Spendenziel</p>
              </div>
              <Progress value={donationProgress} className="h-4 mb-4" />
              <p className="text-sm text-muted-foreground">
                {50 - currentDonationPot}€ bis zur nächsten Spende
              </p>
              <p>
                Derzeit erfolgt unsere Transparenz in Bezug auf Transaktionen
                über Instagram, jedoch arbeiten wir noch an einer effizienteren
                Lösung für dieses System. Aktuelle Test-Version des "Transparenz
                Live-Feeds" findest du weiter unten auf dieser Seite.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Aktuelle Spendenprojekte
            </h2>
            <p>
              Mitentscheiden erwünscht! Hier möchten wir euch die Chance geben
              mitzuentscheiden, wer die Spendenempfänger sein werden. Vielleicht
              liegen euch bestimmte Organisationen & Aktionen besonders am
              Herzen? Kontakt für Vorschläge
            </p>
            {currentProjects.map((project, index) => (
              <Card
                key={index}
                className={`p-4 flex flex-col md:flex-row items-start md:items-center gap-4 ${project.bgColor}`}
              >
                <div className="flex items-center gap-4 w-full">
                  <project.icon className={`h-8 w-8 ${project.color}`} />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {project.description}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {project.slogan}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto whitespace-nowrap"
                  >
                    Infos dazu
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jahresauswahl & Report */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Finanzübersicht & Jahresreport
          </h2>
          <p className="text-xl text-muted-foreground">
            Alle Einnahmen & Ausgaben nach Jahr
          </p>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {yearlyReports.map((report) => (
            <Button
              key={report.year}
              variant={selectedYear === report.year ? "default" : "outline"}
              onClick={() => setSelectedYear(report.year)}
              className="min-w-[80px]"
            >
              {report.year}
            </Button>
          ))}
        </div>
        {yearlyReports.map(
          (report) =>
            selectedYear === report.year && (
              <Card key={report.year} className="max-w-4xl mx-auto p-6">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">
                    Einnahmen & Ausgaben {report.year}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <Card className="p-4 bg-green-50 border-green-200">
                      <h3 className="font-bold text-green-600 mb-2">
                        Einnahmen
                      </h3>
                      <div className="text-2xl font-bold text-green-600">
                        €{report.income}
                      </div>
                    </Card>
                    <Card className="p-4 bg-red-50 border-red-200">
                      <h3 className="font-bold text-red-600 mb-2">Ausgaben</h3>
                      <div className="text-2xl font-bold text-red-600">
                        €{report.expenses}
                      </div>
                    </Card>
                  </div>
                  {report.details.length > 0 ? (
                    <div className="space-y-2">
                      <h4 className="font-semibold mb-3">
                        Detaillierte Aufstellung:
                      </h4>
                      {report.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <Badge
                              variant={
                                detail.type === "Einnahmen"
                                  ? "default"
                                  : "secondary"
                              }
                              className="mr-2"
                            >
                              {detail.type}
                            </Badge>
                            <span>{detail.item}</span>
                          </div>
                          <span
                            className={`font-semibold ${
                              detail.amount > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {detail.amount > 0 ? "+" : ""}€
                            {Math.abs(detail.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      Keine Transaktionen in diesem Jahr
                    </div>
                  )}
                </CardContent>
              </Card>
            )
        )}
      </section>

      {/* Transparenz Live-Feed */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full bg-green-400 text-gray-900 font-bold text-lg shadow animate-pulse border-2 border-green-500 flex items-center gap-2">
            Transparenz LIVE-FEED - Aktualisiert am:
            <span className="text-xs font-mono font-semibold ml-2">{now}</span>
          </span>
        </div>
        
        <p className="text-base text-gray-600 mb-8 text-center max-w-7xl mx-auto">
          Entdecke alle Transaktionen, Spenden und den Social Impact von
          mytrueKarma, transparent und in Echtzeit. (Aktuell noch mit Testdaten)
        </p>
        <TransparencyFeed />
      </section>

      {/* Instagram Updates & Blog */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Instagram Transparenz-Updates
              </h2>
              <p className="text-base text-muted-foreground">
                Regelmäßige Updates über unsere Fortschritte
              </p>
            </div>
            <div className="grid gap-4 mb-8">
              {instagramUpdates.slice(0, 4).map((update, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Instagram className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                    <p className="text-sm">{update}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" className="mb-4 bg-transparent">
                <Instagram className="h-4 w-4 mr-2" />
                @mytruekarma auf Instagram folgen
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Für alle aktuellen Transparenz-Updates und Einblicke in unsere
                Arbeit
              </p>
            </div>
          </div>
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">BLOG</h2>
              <p className="text-base text-muted-foreground">
                Aktuelle Artikel über Transparenz und soziale Projekte
              </p>
            </div>
            <div className="grid gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Image
                    src="/social-commerce-transparent-shopping-community.jpg"
                    alt="Transparenz in sozialen Projekten"
                    width={400}
                    height={200}
                    className="rounded-lg mb-4 w-full h-48 object-cover"
                  />
                  <CardTitle className="text-lg">
                    Die Bedeutung von Transparenz in sozialen Projekten:
                    Vertrauen schaffen und Wirkung erhöhen
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">März 15, 2024</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    In der Welt der aktuellen "sozialen Projekte" ist
                    Transparenz nicht nur ein Schlagwort, sondern ein
                    grundlegendes Prinzip, das das Vertrauen...
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blog/transparenz-in-sozialen-projekten">
                      Weiterlesen
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/blog">
                  Alle Blog-Artikel ansehen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
