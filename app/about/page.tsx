"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Heart,
  ScanSearch as Transparency,
  Target,
  Calendar,
  ExternalLink,
  Palette,
  Globe,
  HandHeart,
  TreePine,
} from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Michael Medvidov",
    role: "Gründer",
    description:
      "Der kreative Kopf hinter mytrueKarma. Modemacher mit 'nem Twist – meine Mission? Style, der nicht nur gut aussieht, sondern auch die Welt ein bisschen besser macht.",
    image: "/Michi.jpg",
  },
  {
    name: "Sara Jane Gupton",
    role: "Designerin",
    description:
      "Sara ist die erste Designerin, die für uns das Design der 'Hamza Hand' entworfen hat. Vielen Dank für diese großartige erste Zusammenarbeit.",
    image: "/sari.jpg",
  },
  {
    name: "Lyubow Landa",
    role: "Künstlerin",
    description:
      "Lubi ist die erste Künstlerin, die ich durch Sara kennengelernt habe, und sie ist eine fantastische Designerin, die das Design 'Whale' für uns entworfen hat.",
    image: "/lubi.jpg",
  },
];

const timeline = [
  {
    date: "Juli 2021",
    location: "Düsseldorf",
    title: "Idee von mytrueKarma.com",
    description:
      "Die Idee zu mytrueKarma war kein Geistesblitz, sondern ein lang gehegter Traum, der endlich Realität wurde.",
    details:
      "Vor einigen Jahren kam die Inspiration, doch der Zeitpunkt war nie ganz perfekt. Zwischen Alltagschaos und dem Jonglieren verschiedener Verpflichtungen fand ich endlich den Raum, diesen Traum Wirklichkeit werden zu lassen. mytrueKarma ist das Ergebnis von Leidenschaft, harter Arbeit und dem festen Glauben, dass der richtige Zeitpunkt nicht auf einen wartet – man muss ihn schaffen.",
    icon: "💡",
    color: "from-yellow-400 to-orange-500",
  },
  {
    date: "Januar 2022",
    location: "Wuppertal",
    title: "Neue Designer",
    description:
      "Wir haben den ersten Designer gefunden und ein Design für unsere Kooperation erhalten.",
    details:
      "Es ist großartig, den ersten Schritt zu machen, und wir freuen uns auf eine erfolgreiche Zusammenarbeit!",
    icon: "🎨",
    color: "from-blue-400 to-purple-500",
  },
  {
    date: "Sept 2023",
    location: "Düsseldorf",
    title: "Überarbeitung der Website",
    description:
      "Wir haben die Website für euch ansprechend gemacht und dabei sowohl das Design als auch die Benutzerfreundlichkeit optimiert.",
    details:
      "Zudem haben wir die Qualität unserer Produktbilder verbessert und ansprechende Beschreibungen für unsere Produkte erstellt.",
    icon: "🌐",
    color: "from-green-400 to-teal-500",
  },
  {
    date: "Januar 2024",
    location: "Aktuell",
    title: "Business-Coaching",
    description:
      "Wir haben von Andreas Idelmann ein Business-Coaching erhalten, das sich besonders auf die Feinheiten unseres Businessplans konzentrierte.",
    details:
      "Als erfahrener und unterstützender Experte für Finanzierung und Fördermittel hat er uns wertvolle Einblicke gegeben und uns dabei geholfen, unseren Zahlenbereich perfekt anzupassen. Seine Expertise und Engagement haben uns sehr beeindruckt. Wir haben außerdem ein weiteres Business-Coaching von selbständigkeit.de in Anspruch genommen. Dabei erhielten wir wertvolle Unterstützung nicht nur bei der Optimierung unserer SEO-Strategie, sondern auch bei anderen wichtigen Aspekten des Geschäftsbetriebs. Die Coaches haben uns umfassend beraten und wertvolle Tipps gegeben, insbesondere auch im Bereich Marketing. Nochmals vielen Dank für die wertvollen Informationen und die professionelle Begleitung durch euer Team!",
    icon: "🚀",
    color: "from-purple-400 to-pink-500",
  },
];

const roadmapPhases = [
  {
    period: "2021 - 2024",
    phase: "Phase 1",
    title: "Konzeptentwicklung und Marktforschung",
    description:
      "Ausarbeitung des Geschäftskonzepts und der Markenidentität. Durchführung von Marktanalysen und Entwicklung des Businessplans.",
    details:
      "In dieser Grundlagenphase haben wir die Vision von mytrueKarma konkretisiert und ein solides Fundament für nachhaltigen Handel geschaffen.",
    icon: "🔍",
    color: "from-blue-400 to-cyan-500",
    status: "completed",
  },
  {
    period: "2024 - 2027",
    phase: "Phase 2",
    title: "Aufbau der Plattform und Produkteinführung",
    description:
      "Entwicklung der mytrueKarma-Plattform, einschließlich Website und mobiler App. Produktion der ersten Produktlinien.",
    details:
      "Der technische Aufbau unserer Plattform steht im Fokus, während wir gleichzeitig unsere ersten nachhaltigen Produktlinien lancieren.",
    icon: "🏗️",
    color: "from-green-400 to-emerald-500",
    status: "current",
  },
  {
    period: "2028",
    phase: "Phase 3",
    title: "Markteinführung und Kundenakquise",
    description:
      "Start einer Marketingkampagne zur Einführung von mytrueKarma und Aufbau von Partnerschaften.",
    details:
      "Gezielte Markterschließung mit fokussierten Kampagnen und strategischen Partnerschaften für maximale Reichweite.",
    icon: "📈",
    color: "from-yellow-400 to-orange-500",
    status: "planned",
  },
  {
    period: "2025 - 2030",
    phase: "Phase 4",
    title: "Wachstum und Skalierung",
    description:
      "Skalierung der Produktions- und Logistikprozesse. Expansion in neue Märkte und Erschließung neuer Vertriebskanäle.",
    details:
      "Systematische Expansion in neue Märkte mit optimierten Prozessen und innovativen Vertriebskanälen.",
    icon: "🚀",
    color: "from-purple-400 to-violet-500",
    status: "planned",
  },
  {
    period: "2040 - Finale Phase",
    phase: "Finale Phase",
    title: "Diversifikation und Nachhaltigkeit",
    description:
      "Diversifikation des Produktangebots und Integration von Nachhaltigkeitsinitiativen. Planung eines Mehrgenerationenhauses.",
    details:
      "Vollständige Integration von Nachhaltigkeitsprinzipien in alle Geschäftsbereiche und Aufbau einer Community-zentrierten Infrastruktur.",
    icon: "🌱",
    color: "from-teal-400 to-green-500",
    status: "vision",
  },
];

export default function AboutPage() {
  const [selectedPhase, setSelectedPhase] = useState(roadmapPhases[1]); // Start with current phase
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style jsx global>{`
        .animated-bg {
          position: fixed;
          bottom: 0;
          left: -50%;
          opacity: 0.5;
          right: -50%;
          top: 0;
          z-index: -1;
          animation: slide 3s ease-in-out infinite alternate;
          background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
        }

        .animated-bg2 {
          animation-direction: alternate-reverse;
          animation-duration: 4s;
        }

        .animated-bg3 {
          animation-duration: 5s;
        }

        @keyframes slide {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(25%);
          }
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="animated-bg"></div>
      <div className="animated-bg animated-bg2"></div>
      <div className="animated-bg animated-bg3"></div>

      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Wer wir sind & unsere Mission
                  </span>
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-8">
                  Wir sind eine Modemarke mit einem einzigartigen Ansatz.  <br />Denn
                  wir sind mehr als nur ein Label – wir sind eine Bewegung,  <br />die
                  die Welt der Mode neu definiert.
                </p>
                <p className="text-lg opacity-80">
                  Gegründet 2021 in Düsseldorf, setzen wir auf stilvolle Designs
                  und eine innovative Vision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Unsere Grundpfeiler
            </h2>
            <p className="text-xl text-white">
              Wir glauben an Transparenz, Nachhaltigkeit und soziales Engagement
              als Grundpfeiler unseres Unternehmens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="mb-4">
                <Transparency className="h-16 w-16 mx-auto text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <h4 className="text-lg font-semibold mb-2">Transparenz</h4>
              <p className="text-muted-foreground">
                Einblick in unser Engagement
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="mb-4">
                <Users className="h-16 w-16 mx-auto text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <h4 className="text-lg font-semibold mb-2">Sozial</h4>
              <p className="text-muted-foreground">
                Gemeinsam für eine bessere Welt
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="mb-4">
                <Heart className="h-16 w-16 mx-auto text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50%</h3>
              <h4 className="text-lg font-semibold mb-2">Spenden</h4>
              <p className="text-muted-foreground">
                50% der Erlöse werden gespendet!
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="mb-4">
                <Target className="h-16 w-16 mx-auto text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50%</h3>
              <h4 className="text-lg font-semibold mb-2">
                Geringer Selbstgewinn
              </h4>
              <p className="text-muted-foreground">
                Nur 50% Ertrag beim Verkauf
              </p>
            </Card>
          </div>
        </section>

        {/* Mission Section - Enhanced Design */}
        <section className="relative py-20 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  Unsere Mission
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              {/* Main Mission Statement */}
              <div className="text-center mb-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl opacity-50 blur-xl"></div>
                  <Card className="relative p-8 md:p-12 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium">
                      mytrueKarma strebt danach, nicht nur modische Statements
                      zu setzen,  <br />sondern auch einen
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                        {" "}
                        positiven Einfluss auf die Welt{" "}
                      </span>
                      auszuüben. 
                       <br /> Unser Konzept geht über den bloßen Verkauf von
                      Produkten hinaus.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Mission Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Einzigartigkeit Card */}
                <div className="group">
                  <Card className="relative overflow-hidden border-0 shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-green-500 to-emerald-600 text-white h-full">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 text-6xl opacity-20">
                      💚
                    </div>
                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <HandHeart className="h-6 w-6 text-white" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-0 font-semibold"
                        >
                          50% Spenden
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold mb-3 text-white">
                        UNSERE EINZIGARTIGKEIT
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-white/90 leading-relaxed">
                          Was mytrueKarma besonders macht, ist unser{" "}
                          <span className="font-bold text-white">
                            50%-Spendenmodell
                          </span>
                          . Die Hälfte unserer Erlöse fließt in wohltätige
                          Projekte, und jeder Kauf wird zu einer guten Tat.  <br />Wir
                          sind stolz darauf eine Kraft für positive
                          Veränderungen in der Welt zu sein.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bewegung Card */}
                <div className="group">
                  <Card className="relative overflow-hidden border-0 shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 text-6xl opacity-20">
                      🚀
                    </div>
                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-0 font-semibold"
                        >
                          Zukunft
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold mb-3 text-white">
                        DER WEG ZU EINER BEWEGUNG
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-white/90 leading-relaxed">
                          Nach einer erfolgreichen Einführungsphase planen wir,
                          mytrueKarma von einer Modemarke zu einer
                          <span className="font-bold text-white">
                            {" "}
                            Handelsplattform
                          </span>{" "}
                          zu entwickeln.  <br />Dabei sollen nicht nur Produkte
                          verkauft, sondern auch transparente Mechanismen für
                          soziales Engagement etabliert werden.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl opacity-50 blur-xl"></div>
                  <Card className="relative p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Users className="h-8 w-8 text-green-600" />
                      <Heart className="h-8 w-8 text-red-500 animate-pulse" />
                      <TreePine className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Begleite uns auf unserer Reise, denn bei mytrueKarma geht
                      es nicht nur um Mode,  <br />sondern um einen nachhaltigen und
                      positiven Einfluss, <br />den wir gemeinsam gestalten können.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Meet the Minds: Das Team von mytrueKarma
            </h2>
            <p className="text-xl text-white">
              Die kreativen Köpfe hinter den Designs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 md:mb-4 mb-6">
                    <Image
                      src={
                        member.image ||
                        "/placeholder.svg?height=128&width=128&query=team member portrait"
                      }
                      alt={member.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {member.description}
                  </p>
                  {member.name !== "Michael Medvidov" && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={
                            member.name === "Lyubow Landa"
                              ? "https://bilderbilder-atelier.de/bilder-von-lubi/"
                              : member.name === "Sara Jane G."
                              ? "https://www.instagram.com/featherlightarts/"
                              : "https://www.instagram.com/featherlightarts/"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Palette className="h-4 w-4 mr-2" />
                          Artworks ansehen
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] pointer-events-none"></div>
          <div className="container mx-auto px-4 py-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Unsere Timeline
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Eine Reise voller Leidenschaft, Kreativität und dem Streben nach
                positiver Veränderung
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 hidden md:block"></div>

                <div className="space-y-12">
                  {timeline.map((event, index) => (
                    <div key={index} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute left-6 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-white border-4 border-blue-400 shadow-lg z-10 group-hover:scale-125 transition-transform duration-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>

                      <div className="md:ml-20">
                        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                          <div className="relative">
                            <div
                              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color}`}
                            ></div>

                            <CardHeader className="pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                                  >
                                    {event.icon}
                                  </div>
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                      <Badge
                                        variant="outline"
                                        className="text-sm font-semibold border-blue-300 text-blue-700"
                                      >
                                        {event.date}
                                      </Badge>
                                      <Badge
                                        variant="secondary"
                                        className="text-sm bg-slate-100 text-slate-700"
                                      >
                                        📍 {event.location}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                                {event.title}
                              </CardTitle>
                            </CardHeader>

                            <CardContent className="pt-0">
                              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                                {event.description}
                              </p>

                              {event.details && (
                                <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border-l-4 border-blue-400">
                                  <p className="text-slate-700 leading-relaxed text-sm">
                                    {event.details}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </section>

        {/* Roadmap - Interactive Horizontal Timeline */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Roadmap & Vision
            </h2>
            <p className="text-xl text-white">
              Unser interaktiver Weg in die Zukunft
            </p>
          </div>

          {/* Horizontal Timeline Navigation */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 rounded-full transform -translate-y-1/2 z-0"></div>

              {/* Timeline Nodes */}
              <div className="relative z-10 flex justify-between items-center">
                {roadmapPhases.map((phase, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhase(phase)}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      selectedPhase.phase === phase.phase
                        ? "scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    {/* Timeline Node */}
                    <div
                      className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 shadow-lg transition-all duration-300
                    ${
                      selectedPhase.phase === phase.phase
                        ? `bg-gradient-to-br ${phase.color} text-white shadow-xl ring-4 ring-white ring-opacity-50`
                        : "bg-white text-gray-600 group-hover:shadow-xl border-2 border-gray-200 group-hover:border-gray-300"
                    }
                  `}
                    >
                      {phase.icon}
                    </div>

                    {/* Phase Label */}
                    <div className="text-center">
                      <div
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          selectedPhase.phase === phase.phase
                            ? "text-gray-900"
                            : "text-gray-600 group-hover:text-gray-800"
                        }`}
                      >
                        {phase.phase}
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          selectedPhase.phase === phase.phase
                            ? "text-gray-700"
                            : "text-gray-500 group-hover:text-gray-600"
                        }`}
                      >
                        {phase.period}
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute -top-2 -right-2">
                      {phase.status === "completed" && (
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                      {phase.status === "current" && (
                        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                      )}
                      {phase.status === "planned" && (
                        <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
                      )}
                      {phase.status === "vision" && (
                        <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Phase Details */}
          <div className="max-w-4xl mx-auto">
            <Card
              className={`
            relative overflow-hidden border-0 shadow-2xl transition-all duration-500 
            bg-gradient-to-br ${selectedPhase.color} text-white
          `}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-0 font-semibold"
                  >
                    {selectedPhase.period}
                  </Badge>
                  <div className="text-6xl opacity-20">
                    {selectedPhase.icon}
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  {selectedPhase.title}
                </CardTitle>
                <p className="text-lg opacity-90 leading-relaxed">
                  {selectedPhase.description}
                </p>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2 text-white/90">Details:</h4>
                  <p className="text-white/80 leading-relaxed">
                    {selectedPhase.details}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Hint */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Klicken Sie auf die Phasen-Icons oben, um zwischen den
              verschiedenen Entwicklungsstufen zu navigieren
            </p>
          </div>
        </section>

        {/* Digital Gallery Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
              {/* Gallery Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <Image
                    src="/gallerieSpatial.webp"
                    alt="Digitale Kunstgalerie - Spatial.io Karmaland"
                    width={600}
                    height={400}
                    className="rounded-2xl transform hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">
                  Unsere "Digitale Kunstgalerie"
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Tauche ein und finde digital Inspiration in unseren Artworks!
                </p>
                <p className="mb-8 opacity-80">
                  Du kannst den Raum mit dem Handy aber auch mit einer VR-Brille
                  betreten.*
                </p>
                <p className="text-sm mb-8 opacity-70">
                  *Download der App Spatial notwendig. (Ohne App auf dem PC
                  möglich)
                </p>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <a
                    href="https://www.spatial.io/s/Karmaland-64df6866d583eb4cb2839e81?share=203332892411089258"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Hier reingucken
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
