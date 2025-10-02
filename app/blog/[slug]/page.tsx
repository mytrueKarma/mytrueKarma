"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
  MessageCircle,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

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

Transparenz ist nicht nur ein Nice-to-have, sondern eine Notwendigkeit für nachhaltige soziale Wirkung. Sie ermöglicht es Spendern, informierte Entscheidungen zu treffen, und hilft Organisationen dabei, das Vertrauen zu verdienen, das sie für ihre wichtige Arbeit benötigen.

---

**Fazit**: Transparenz in sozialen Projekten ist mehr als nur eine gute Praxis – sie ist ein ethisches Gebot, das das Vertrauen stärkt und die Wirkung maximiert.`,
    author: "mytrueKarma Team",
    date: "2024-02-09",
    readTime: "5 min",
    image: "/blog-transparency-social-projects.jpg",
    tags: ["Transparenz", "Soziale Projekte", "Vertrauen", "NGO"],
    category: "Transparenz",
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

Das mytrueKarma Team ❤️

---

**PS**: Alle bestehenden Links und Bookmarks werden automatisch weitergeleitet. Ihr verpasst nichts!`,
    author: "Gründer-Team",
    date: "2022-10-14",
    readTime: "3 min",
    image: "/blog-mykarma-to-mytruekarma.jpg",
    tags: ["Rebranding", "Geschichte", "Mission", "mytrueKarma"],
    category: "Unternehmen",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isLiked, setIsLiked] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Artikel nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">
            Der gesuchte Blog-Artikel konnte nicht gefunden werden.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back to Blog */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-600 border-red-600" : ""}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {isLiked ? "Gefällt mir" : "Gefällt mir"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Teilen
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Kommentieren
            </Button>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <article className="flex-1">
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.substring(3)}
                      </h2>
                    );
                  } else if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="text-xl font-semibold mt-6 mb-3"
                      >
                        {paragraph.substring(4)}
                      </h3>
                    );
                  } else if (paragraph.startsWith("- **")) {
                    return (
                      <li key={index} className="mb-2">
                        <strong>
                          {paragraph.substring(4, paragraph.indexOf("**", 4))}:
                        </strong>
                        {paragraph.substring(paragraph.indexOf("**:", 4) + 3)}
                      </li>
                    );
                  } else if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="mb-2">
                        {paragraph.substring(2)}
                      </li>
                    );
                  } else if (
                    paragraph.startsWith("**") &&
                    paragraph.endsWith("**")
                  ) {
                    return (
                      <p key={index} className="font-bold text-lg mb-4">
                        {paragraph.substring(2, paragraph.length - 2)}
                      </p>
                    );
                  } else if (paragraph.trim() === "---") {
                    return <hr key={index} className="my-8" />;
                  } else if (paragraph.trim() === "") {
                    return <br key={index} />;
                  } else {
                    return (
                      <p
                        key={index}
                        className="mb-4 text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    );
                  }
                })}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-sm">
                        <Tags className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Autor</h4>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.author}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Veröffentlicht</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(post.date).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Lesezeit</h4>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t bg-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {previousPost ? (
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <ArrowLeft className="h-4 w-4" />
                    Vorheriger Artikel
                  </div>
                  <Link href={`/blog/${previousPost.slug}`} className="block">
                    <h3 className="font-semibold hover:text-blue-600 transition-colors line-clamp-2">
                      {previousPost.title}
                    </h3>
                  </Link>
                </Card>
              ) : (
                <div></div>
              )}

              {nextPost && (
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                    Nächster Artikel
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="block text-right"
                  >
                    <h3 className="font-semibold hover:text-blue-600 transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h2 className="text-2xl font-bold mb-4">
            Unterstütze unsere Mission
          </h2>
          <p className="text-muted-foreground mb-6">
            Jeder Kauf in unserem Shop trägt zu transparenten sozialen Projekten
            bei
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              Jetzt stöbern
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
