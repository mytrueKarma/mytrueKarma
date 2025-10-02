"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Network,
  Palette,
  MessageCircle,
  Camera,
  Code,
  PenTool,
  Heart,
  Star,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Eye,
    title: "Erhöhte Sichtbarkeit und Präsenz",
    description:
      "Durch die Teilnahme an unserem Programm erhalten Künstler eine Plattform, um ihre Arbeit einem breiteren Publikum zu präsentieren.",
  },
  {
    icon: Network,
    title: "Zugang zu einem wachsenden Netzwerk",
    description:
      "Unsere Initiative bietet Künstlern die Möglichkeit, sich mit anderen Kreativen und potenziellen Kunden zu vernetzen.",
  },
  {
    icon: Heart,
    title: "Kreative Freiheit und Unterstützung",
    description:
      "Wir glauben an die Bedeutung der kreativen Freiheit und ermutigen Künstler, ihre Visionen zu verwirklichen.",
  },
];

const featuredArtists = [
  {
    name: "Sara Jane Gupton",
    specialty: "Designerin",
    description:
      "Sara ist die erste Designerin, die für uns das Design der 'Hamza Hand' entworfen hat. Vielen Dank für diese großartige erste Zusammenarbeit.",
    image: "/sari.jpg",
    featured: true,
    artworkLink: "https://www.instagram.com/featherlightarts/",
  },
  {
    name: "Lyubow Landa",
    specialty: "Künstlerin",
    description:
      "Lubi ist die erste Künstlerin, die ich durch Sara kennengelernt habe, und sie ist eine fantastische Designerin, die das Design 'Whale' für uns entworfen hat.",
    image: "/lubi.jpg",
    featured: true,
    artworkLink: "https://bilderbilder-atelier.de/bilder-von-lubi/",
  },
];

const opportunities = [
  {
    icon: Palette,
    title: "DESIGNER/KÜNSTLER",
    description:
      "Wir sind stets auf der Suche nach Designern, Künstlern & Illustratoren für unseren Onlineshop für bedruckte T-Shirts und Kleidung.",
    requirements: [
      "Du kannst Schnitt und Farben selbst auswählen",
      "Du kannst alle Farben nutzen (Digitaldruck)",
      "Du kannst die Themen der Motive vielfältig gestalten",
      "Deine Designs werden durch unserem Store einem breiten Publikum vorgestellt",
    ],
  },
  {
    icon: Camera,
    title: "BLOGGER",
    description:
      "Du nutzt gerne Instagram, TikTok, Facebook oder Youtube? Du postest gern? Du bloggst mit Leidenschaft?",
    requirements: [
      "Du bist verantwortlich für die Durchführung und Bewertung von Inhalten der Blogs",
      "Dabei achtest du auf die Qualität und Relevanz der Anzeigen",
      "Du richtest dich nach den Kundenbedürfnissen",
      "Du recherchierst und verwendest Quellen für Glaubwürdigkeit",
    ],
  },
  {
    icon: PenTool,
    title: "CONTENT CREATOR",
    description:
      "Du hast eine Affinität für knackige Texte und die Fähigkeit dich schnell in verschiedene Thematiken einzuarbeiten?",
    requirements: [
      "Erstellen von journalistischem Mehrwert-/SEO-Content",
      "Pflege und Optimierung von Bestands-Inhalten",
      "Erstellen von Content-Strategien",
      "Bildbearbeitung und Recherche",
    ],
  },
  {
    icon: Code,
    title: "PROGRAMMIERER",
    description:
      "Gerne würde ich diese Website optimieren um eine automatisierte Transparenz einzubauen. Willst du mir dabei helfen?",
    requirements: [
      "Entwicklung revolutionärer Transparenz-Features",
      "Website-Optimierung und Automatisierung",
      "Innovative Lösungen für soziale Projekte",
      "Zusammenarbeit an zukunftsweisenden Technologien",
    ],
  },
];

const faqItems = [
  {
    question: "Wer kann sich für das Förderungsprogramm bewerben?",
    answer:
      "Kreative Köpfe, die soziale Projekte und kreative Ideen unterstützen, sind herzlich eingeladen!",
  },
  {
    question: "Welche Arten von Kunst werden unterstützt?",
    answer:
      "Jede Stilrichtung ist willkommen, sollte aber gewaltfrei und einen sozialen Touch haben!",
  },
  {
    question: "Wie läuft der Bewerbungsprozess ab?",
    answer:
      "Kontaktiere uns einfach über WhatsApp oder E-Mail mit deinem Portfolio und deinen Ideen.",
  },
  {
    question: "Gibt es eine Altersbeschränkung für Bewerber?",
    answer:
      "Nein, wir begrüßen Talente jeden Alters, die unsere Mission teilen.",
  },
];

export default function TalentPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Unsere Nachwuchs-Gestalter
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Wir suchen die aufstrebenden Talente von morgen mit unserem
              Nachwuchsförderungsprogramm!
            </p>
            <p className="text-lg opacity-80 mb-8">
              Als leidenschaftliche Förderer aufstrebender Künstler,
              Schauspieler und Musiker sind wir ständig auf der Suche nach neuen
              Talenten, die wir unterstützen können.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <a
                href="https://api.whatsapp.com/send?phone=4915678443874"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Jetzt per WhatsApp kontaktieren
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Warum unser Programm?</h2>
          <p className="text-xl text-muted-foreground">
            In einem wachsenden Netzwerk bieten wir jungen Talenten die
            Plattform und die Ressourcen, um ihre Fähigkeiten zu entwickeln und
            zu präsentieren.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="mb-4">
                <benefit.icon className="h-12 w-12 mx-auto text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-purple-600 mb-4">
            Verpasse nicht die Chance, dein Talent zu entfalten und dich zu
            entfalten.
          </p>
          <p className="text-xl">
            Melde dich noch heute und werde Teil unserer Gemeinschaft!
          </p>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unsere Featured Artists</h2>
            <p className="text-xl text-muted-foreground">
              Erfolgreiche Kooperationen, die den Weg für andere ebnen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredArtists.map((artist, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={
                        artist.image ||
                        "/placeholder.svg?height=128&width=128&query=artist portrait"
                      }
                      alt={artist.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                    {artist.featured && (
                      <Badge className="absolute -top-2 -right-2 bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{artist.name}</CardTitle>
                  <Badge variant="secondary">{artist.specialty}</Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {artist.description}
                  </p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <a
                        href={artist.artworkLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Artworks ansehen
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <a
                        href="https://api.whatsapp.com/send?phone=4915678443874"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Kontakt
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Wen suchen wir?</h2>
          <p className="text-xl text-muted-foreground">
            Verschiedene Möglichkeiten, Teil unserer kreativen Community zu
            werden
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {opportunities.map((opportunity, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <opportunity.icon className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                </div>
                <p className="text-muted-foreground">
                  {opportunity.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <h4 className="font-semibold mb-3">
                  Deine Aufgaben/Möglichkeiten:
                </h4>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <h3 className="text-xl font-bold mb-4">Allgemeine Anforderungen:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Kreatives Denken und Leidenschaft für soziale Themen
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Idealerweise Erfahrung im Grafikdesign oder verwandten
                  Bereichen
                </span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Teamfähigkeit und konstruktive Ideeneinbringung</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Realistische Erwartungen an die Vergütung in einem sozialen
                  Projekt
                </span>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Bereit, Teil unserer Community zu werden?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Wenn diese Begriffe positive Assoziationen bei dir auslösen, dann
              melde dich gerne bei mir!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                Kreativität
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                Soziales Engagement
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                Nachhaltigkeit
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                Transparenz
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                Gemeinschaft
              </Badge>
            </div>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <a
                href="https://api.whatsapp.com/send?phone=4915678443874"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Jetzt Kontakt aufnehmen
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
