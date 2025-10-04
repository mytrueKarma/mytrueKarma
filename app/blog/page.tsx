"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Tags,
  Heart,
  TreePine,
  TrendingUp,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    slug: "transparenz-in-sozialen-projekten",
    title:
      "Die Bedeutung von Transparenz in sozialen Projekten: Vertrauen schaffen und Wirkung erhöhen",
    excerpt:
      "In der Welt der aktuellen 'sozialen Projekte' ist Transparenz nicht nur ein Schlagwort, sondern ein grundlegendes Prinzip, das das Vertrauen zwischen Organisationen und ihren Unterstützern stärkt.",
    content: `Transparenz ist das Fundament erfolgreicher sozialer Projekte. Sie schafft Vertrauen, ermöglicht Nachvollziehbarkeit und erhöht die Wirksamkeit von Spenden und Unterstützung.

## Warum ist Transparenz so wichtig?

### Vertrauen aufbauen
Wenn Menschen ihr hart verdientes Geld für soziale Zwecke spenden, möchten sie wissen, dass ihre Beiträge sinnvoll eingesetzt werden. Transparenz zeigt, wo das Geld hingeht und welche konkreten Ergebnisse erzielt werden.

### Rechenschaftspflicht
Transparente Organisationen sind rechenschaftspflichtig gegenüber ihren Spendern, Begünstigten und der Gesellschaft als Ganzes. Dies fördert verantwortliches Handeln und ethische Praktiken.

### Wirkung maximieren
Durch offene Kommunikation über Erfolge und Herausforderungen können Organisationen lernen, sich verbessern und ihre Wirkung maximieren.

## Wie wir Transparenz bei mytrueKarma leben

Bei mytrueKarma glauben wir fest an die Kraft der Transparenz. Deshalb teilen wir regelmäßig:

- **Finanzielle Berichte**: Alle Einnahmen und Ausgaben werden detailliert aufgeschlüsselt
- **Projektfortschritte**: Regelmäßige Updates über die unterstützten Projekte
- **Herausforderungen**: Offene Kommunikation über Schwierigkeiten und Lernprozesse

## Die Zukunft transparenter sozialer Arbeit

Transparenz ist nicht nur ein Nice-to-have, sondern eine Notwendigkeit für nachhaltige soziale Wirkung. Sie ermöglicht es Spendern, informierte Entscheidungen zu treffen, und hilft Organisationen dabei, das Vertrauen zu verdienen, das sie für ihre wichtige Arbeit benötigen.`,
    author: "mytrueKarma Team",
    date: "2024-03-15",
    readTime: "5 min",
    image: "/social-commerce-transparent-shopping-community.jpg",
    tags: ["Transparenz", "Soziale Projekte", "Vertrauen", "NGO"],
    category: "Transparenz",
  },
  {
    slug: "nachhaltige-mode-fair-trade",
    title:
      "Nachhaltige Mode & Fair Trade: Wie Verbraucher positive Veränderungen bewirken können",
    excerpt:
      "Die Modeindustrie steht vor einem Wandel. Erfahren Sie, wie bewusste Kaufentscheidungen einen echten Unterschied machen können und warum Fair Trade mehr als nur ein Trend ist.",
    content: `Die Modeindustrie ist einer der größten Umweltverschmutzer weltweit. Doch es gibt Hoffnung: Durch bewusste Entscheidungen können Verbraucher positive Veränderungen bewirken.

## Die Herausforderungen der Fast Fashion

### Umweltauswirkungen
- Wasserverschmutzung durch chemische Färbeprozesse
- Enorme Mengen an Textilabfällen
- Hoher CO2-Fußabdruck durch globale Lieferketten

### Soziale Probleme
- Niedrige Löhne in Produktionsländern
- Schlechte Arbeitsbedingungen
- Kinderarbeit in einigen Regionen

## Was ist Fair Trade Mode?

Fair Trade Mode garantiert:
- **Faire Löhne** für alle Arbeiter in der Lieferkette
- **Sichere Arbeitsbedingungen** und Schutz der Arbeiterrechte
- **Umweltfreundliche Produktion** mit nachhaltigen Materialien
- **Transparenz** in der gesamten Lieferkette

## Wie Sie den Wandel unterstützen können

### Bewusst einkaufen
- Qualität über Quantität wählen
- Nach Zertifizierungen wie GOTS oder Fair Trade suchen
- Lokale und nachhaltige Marken unterstützen

### Kleidung länger nutzen
- Reparieren statt wegwerfen
- Second-Hand kaufen
- Kleidertausch mit Freunden

## mytrueKarma's Beitrag

Bei mytrueKarma setzen wir auf:
- **Nachhaltige Materialien** wie Bio-Baumwolle
- **Faire Produktionsbedingungen**
- **Transparente Lieferketten**
- **50% unserer Erlöse** fließen in soziale Projekte

Gemeinsam können wir die Modeindustrie zu einem Katalysator für positive Veränderungen machen!`,
    author: "Nachhaltigkeits-Team",
    date: "2024-02-28",
    readTime: "7 min",
    image: "/exclusive-social-design-merchandise.jpg",
    tags: ["Nachhaltigkeit", "Fair Trade", "Mode", "Umwelt"],
    category: "Nachhaltigkeit",
  },
  {
    slug: "50-prozent-spendenmodell",
    title: "Unser 50% Spendenmodell: Wie jeder Einkauf zur guten Tat wird",
    excerpt:
      "Entdecken Sie, wie unser einzigartiges Geschäftsmodell funktioniert und warum die Hälfte unserer Erlöse direkt an soziale Projekte fließt. Transparenz, die bewegt.",
    content: `Bei mytrueKarma ist jeder Einkauf mehr als nur ein Kauf – er ist ein Beitrag zu einer besseren Welt. Unser 50% Spendenmodell macht das möglich.

## Wie funktioniert unser Modell?

### Die Grundidee
Von jedem Euro, den Sie bei uns ausgeben, fließen 50 Cent direkt in soziale Projekte. Das ist nicht nur ein Versprechen – das ist unser Geschäftskern.

### Der Weg Ihres Geldes
1. **Sie kaufen ein Produkt** für 20€
2. **10€ gehen direkt** in unseren Spendentopf
3. **Bei 50€ im Topf** erfolgt eine Spende
4. **Vollständige Transparenz** über jede Transaktion

## Warum 50%?

### Maximaler Impact
Wir wollten nicht nur symbolisch spenden, sondern echten Wandel bewirken. 50% ist ein Anteil, der wirklich etwas verändert.

### Nachhaltiges Modell
Trotz der hohen Spendenquote bleibt unser Geschäft nachhaltig und kann langfristig wachsen.

### Vertrauen schaffen
Durch die hohe Spendenquote zeigen wir, dass uns soziale Wirkung wichtiger ist als maximaler Profit.

## Unsere aktuellen Projekte

### Eden Reforestation Projects
- **Aufforstung in Madagaskar**
- **67 verschiedene Baumarten**
- **Lebensraum für 200.000+ Arten**

### Ukraine-Hilfe über UNICEF
- **Lebensmittel und Wasser**
- **Hygieneartikel**
- **Erste-Hilfe-Sets**

## Vollständige Transparenz

### Was wir veröffentlichen
- Jeden einzelnen Kauf
- Alle Spendentransaktionen
- Detaillierte Projektberichte
- Finanzielle Aufstellungen

### Wo Sie es finden
- Auf unserer Transparenz-Seite
- In regelmäßigen Instagram-Updates
- In unserem monatlichen Newsletter

## Machen Sie mit!

Jeder Kauf bei mytrueKarma ist ein Schritt in Richtung einer besseren Welt. Sie kaufen nicht nur ein Produkt – Sie investieren in positive Veränderungen.

**Bereit, den Unterschied zu machen?**`,
    author: "Gründer-Team",
    date: "2024-01-20",
    readTime: "6 min",
    image: "/home-garden-social.jpg",
    tags: ["Spendenmodell", "Transparenz", "Soziale Projekte", "Impact"],
    category: "Unternehmen",
  },
  {
    slug: "community-building-soziale-unternehmen",
    title:
      "Community Building: Wie soziale Unternehmen echte Gemeinschaften aufbauen",
    excerpt:
      "Eine starke Community ist das Herzstück jeden sozialen Unternehmens. Erfahren Sie unsere Strategien für authentisches Community Building und nachhaltiges Engagement.",
    content: `Eine echte Community zu aufzubauen ist mehr als nur Follower zu sammeln. Es geht darum, Menschen zu verbinden, die gemeinsame Werte teilen.

## Was macht eine echte Community aus?

### Gemeinsame Werte
Unsere Community teilt die Überzeugung, dass Geschäfte einen positiven Einfluss haben sollten.

### Authentische Verbindungen
Es geht nicht um Verkaufen, sondern um echte Beziehungen und gegenseitige Unterstützung.

### Transparenz und Offenheit
Wir teilen nicht nur Erfolge, sondern auch Herausforderungen und Lernprozesse.

## Unsere Community-Building Strategien

### 1. Regelmäßige Updates
- **Transparenz-Posts** auf Instagram
- **Projekt-Updates** per Newsletter
- **Behind-the-Scenes** Einblicke

### 2. Direkter Dialog
- **Kommentare beantworten** auf allen Kanälen
- **Community-Fragen** in Entscheidungen einbeziehen
- **Feedback aktiv einholen** und umsetzen

### 3. Wertschätzung zeigen
- **Kunden-Features** in unseren Posts
- **Dankessprüche** für Unterstützung
- **Exklusive Einblicke** für treue Community-Mitglieder

## Die Herausforderungen

### Authentizität bewahren
Bei wachsender Community ist es wichtig, persönlich und authentisch zu bleiben.

### Konsistenz halten
Regelmäßige Kommunikation erfordert Zeit und Ressourcen.

### Verschiedene Bedürfnisse
Eine diverse Community hat unterschiedliche Erwartungen und Interessen.

## Community Impact messen

### Qualitative Metriken
- **Engagement-Qualität** statt nur Quantität
- **Wiederkehrende Interaktionen**
- **User-Generated Content**

### Quantitative Metriken
- **Community-Wachstum**
- **Engagement-Raten**
- **Conversion von Community zu Kunden**

## Tipps für andere soziale Unternehmen

### Startet klein
Eine kleine, engagierte Community ist wertvoller als viele passive Follower.

### Seid geduldig
Community Building ist ein Marathon, kein Sprint.

### Hört zu
Eure Community sagt euch, was sie braucht – ihr müsst nur zuhören.

### Bleibt authentisch
Fake it till you make it funktioniert nicht bei Community Building.

Unsere Community ist unser größter Schatz. Ohne sie wäre mytrueKarma nur ein weiterer Online-Shop. Mit ihr sind wir eine Bewegung für positive Veränderungen!`,
    author: "Community-Team",
    date: "2023-12-18",
    readTime: "8 min",
    image: "/travel-accessories-social.jpg",
    tags: ["Community", "Social Media", "Engagement", "Authentizität"],
    category: "Community",
  },
  {
    slug: "zukunft-social-commerce-2024",
    title: "Die Zukunft des Social Commerce: Trends und Perspektiven für 2024",
    excerpt:
      "Social Commerce revolutioniert die Art, wie wir einkaufen. Entdecken Sie die wichtigsten Trends und was sie für Verbraucher und Unternehmen bedeuten.",
    content: `Social Commerce ist mehr als nur ein Trend – es ist die Zukunft des Einzelhandels. Hier sind die wichtigsten Entwicklungen für 2024.

## Was ist Social Commerce?

Social Commerce verbindet soziale Medien mit E-Commerce und ermöglicht es Nutzern, direkt in ihren Lieblings-Apps einzukaufen.

### Die Evolution
- **Phase 1**: Werbung in sozialen Medien
- **Phase 2**: Shoppable Posts
- **Phase 3**: Vollständige In-App-Shopping-Erlebnisse
- **Phase 4**: KI-gestützte, personalisierte Shopping-Assistenten

## Die wichtigsten Trends 2024

### 1. Live-Shopping Events
- **Interaktive Produktpräsentationen**
- **Echtzeitfragen** und Antworten
- **Exclusive Deals** nur für Live-Zuschauer

### 2. KI-Personalisierung
- **Individuelle Produktempfehlungen**
- **Virtuelle Shopping-Assistenten**
- **Predictive Shopping** basierend auf Verhalten

### 3. Nachhaltigkeit im Fokus
- **Transparente Lieferketten**
- **CO2-Fußabdruck-Tracking**
- **Soziale Impact-Messung**

### 4. Creator Economy Integration
- **Influencer als Verkäufer**
- **Affiliate-Programme** für Micro-Influencer
- **User-Generated Content** als Verkaufstool

## Auswirkungen auf Verbraucher

### Vorteile
- **Nahtloses Shopping-Erlebnis**
- **Authentische Produktbewertungen**
- **Personalisierte Empfehlungen**
- **Soziale Validation** durch Community

### Herausforderungen
- **Impulskäufe** durch vereinfachten Checkout
- **Datenschutz-Bedenken**
- **Überflutung** mit Shopping-Content

## Auswirkungen auf Unternehmen

### Chancen
- **Direkter Kundenkontakt**
- **Niedrigere Akquisitionskosten**
- **Bessere Dateneinblicke**
- **Community Building**

### Herausforderungen
- **Plattform-Abhängigkeit**
- **Sich ändernde Algorithmen**
- **Erhöhter Content-Bedarf**

## mytrueKarma's Ansatz

### Unsere Vision
Wir nutzen Social Commerce nicht nur zum Verkaufen, sondern um:
- **Bewusstsein** für soziale Themen zu schaffen
- **Transparenz** in unseren Prozessen zu zeigen
- **Community** rund um nachhaltige Werte aufzubauen

### Konkrete Maßnahmen
- **Instagram Shopping** mit Impact-Tracking
- **Live Q&A Sessions** über unsere Projekte
- **User-Generated Content** von unserer Community
- **Influencer-Partnerschaften** mit gleichgesinnten Creatorn

## Tipps für Unternehmen

### 1. Authentizität first
Nutzt Social Commerce nicht nur als Verkaufskanal, sondern als Kommunikationsplattform.

### 2. Community über Sales
Baut erst eine Community auf, der Verkauf folgt automatisch.

### 3. Transparenz zeigen
Teilt nicht nur Produkte, sondern auch eure Werte und Prozesse.

### 4. Auf Veränderungen vorbereitet sein
Social Commerce entwickelt sich schnell – bleibt flexibel!

## Die Zukunft ist social

Social Commerce wird den Einzelhandel fundamental verändern. Unternehmen, die jetzt anfangen, echte Communities aufzubauen, werden die Gewinner von morgen sein.

Bei mytrueKarma sehen wir Social Commerce als Chance, nicht nur Produkte zu verkaufen, sondern positive Veränderungen in der Welt zu bewirken. Seid ihr bereit für die Zukunft des Shoppens?`,
    author: "Digital-Team",
    date: "2023-11-05",
    readTime: "9 min",
    image: "/accessories-bags-social.jpg",
    tags: ["Social Commerce", "E-Commerce", "Trends", "Zukunft"],
    category: "Technologie",
  },
  {
    slug: "mykarma-goes-mytruekarma",
    title: "myKarma goes mytrueKarma",
    excerpt:
      "Hello People! Im Verlaufe der Zeit ist mir aufgefallen, dass es auch noch andere Menschen gibt, die den Namen 'myKarma' für sich beanspruchen. Zeit für eine Veränderung!",
    content: `Hello People! 

Im Verlaufe der Zeit ist mir aufgefallen, dass es auch noch andere Menschen gibt, die den Namen "myKarma" für sich beanspruchen. Um Verwechslungen zu vermeiden und unsere einzigartige Mission noch klarer zu kommunizieren, haben wir uns entschieden: **myKarma goes mytrueKarma!**

## Der Grund für die Umbenennung

### Eindeutigkeit schaffen
Der Name "myKarma" wurde von verschiedenen Projekten und Unternehmen verwendet. Um Klarheit zu schaffen und unsere Identität zu stärken, war eine Umbenennung notwendig.

### Unsere Mission verdeutlichen
"mytrueKarma" spiegelt noch besser wider, worum es uns geht: **echtes, wahres Karma** durch nachhaltiges Handeln und transparente soziale Projekte.

## Was ändert sich?

### Neuer Name, gleiche Mission
Auch wenn sich unser Name ändert, bleibt unsere Mission dieselbe:
- Nachhaltigen Handel fördern
- Transparenz in sozialen Projekten schaffen
- Positive Veränderungen in der Welt bewirken

### Alle Links und Profile
Wir werden nach und nach alle unsere Profile und Links aktualisieren. Bitte habt Geduld mit uns während dieses Übergangs!

## Die Reise geht weiter

Diese Umbenennung markiert nicht das Ende, sondern einen neuen Anfang. Mit **mytrueKarma** setzen wir unsere Reise fort, die Welt ein bisschen besser zu machen - einen Kauf, eine Spende und ein Projekt nach dem anderen.

Vielen Dank für eure Unterstützung auf diesem Weg!

Das mytrueKarma Team ❤️`,
    author: "Gründer-Team",
    date: "2022-10-14",
    readTime: "3 min",
    image: "/mockup3.jpg",
    tags: ["Rebranding", "Geschichte", "Mission", "mytrueKarma"],
    category: "Unternehmen",
  },
];

const categories = [
  "Alle",
  "Transparenz",
  "Unternehmen",
  "Nachhaltigkeit",
  "Projekte",
  "Community",
  "Technologie",
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "Alle" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                mytrueKarma Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Einblicke in unsere transparente Arbeit, soziale Projekte und
              nachhaltige Initiativen
            </p>
            <p className="text-lg opacity-80">
              Erfahre mehr über unsere Mission, Fortschritte und die Projekte,
              die uns am Herzen liegen
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Blog durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Neuester Artikel</h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <span className="text-sm text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tags className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Artikel lesen
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Alle Artikel</h2>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Lesen
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  Keine Artikel gefunden
                </h3>
                <p className="text-muted-foreground mb-6">
                  Versuche einen anderen Suchbegriff oder wähle eine andere
                  Kategorie.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Alle");
                  }}
                >
                  Filter zurücksetzen
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-4">Bleib auf dem Laufenden</h2>
            <p className="text-muted-foreground mb-6">
              Erfahre als Erste*r von neuen Artikeln, Projekten und
              Transparenz-Updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Deine E-Mail Adresse" className="flex-1" />
              <Button>Newsletter abonnieren</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
