"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  Users,
  Heart,
  Target,
  Mail,
  Sparkles,
  Brain,
  Lightbulb,
  Award,
} from "lucide-react";

const questions = [
  {
    question: "Was ist das Ziel von Bildung?",
    options: ["Wissen vermitteln", "Geld verdienen", "Reisen", "Sport treiben"],
    answer: 0,
  },
  {
    question: "Welcher Bereich gehört zur Allgemeinbildung?",
    options: ["Mathematik", "Kochen", "Autofahren", "Schwimmen"],
    answer: 0,
  },
  {
    question: "Was fördert Bildung?",
    options: ["Kritisches Denken", "Faulheit", "Unwissenheit", "Langeweile"],
    answer: 0,
  },
];

export default function BildungPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleOptionClick(idx: number) {
    setSelected(idx);
  }

  function handleNext() {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  return (
    <>
      <style jsx global>{`
        .animated-bg {
          position: fixed;
          bottom: 0;
          left: -50%;
          opacity: 0.3;
          right: -50%;
          top: 0;
          z-index: -1;
          animation: slide 4s ease-in-out infinite alternate;
          background-image: linear-gradient(-60deg, #3b82f6 50%, #8b5cf6 50%);
        }

        .animated-bg2 {
          animation-direction: alternate-reverse;
          animation-duration: 5s;
        }

        .animated-bg3 {
          animation-duration: 6s;
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

      <div className="space-y-16">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Bildung & Lernen
                  </span>
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-8">
                  Entdecke die Welt des Wissens – von interaktivem Lernen bis zu
                  persönlichem Coaching. <br />
                  Gemeinsam für eine bessere Zukunft.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="https://testversion-sparte-mytrue-karma.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg cursor-pointer hover:bg-white/30 transition">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Wissensvermittlung
                    </Badge>
                  </a>
                  <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
                    <Users className="mr-2 h-5 w-5" />
                    Soziales Engagement
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Gemeinsam stark
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Column: Benefits & Services */}
            <div className="lg:col-span-1 space-y-8">
              {/* Why Education Matters */}
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 text-6xl opacity-20">
                  💡
                </div>
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 font-semibold"
                    >
                      Wichtig
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 text-white">
                    Warum Bildung wichtig ist
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <ul className="space-y-2 text-white/90">
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-yellow-300" />
                        Fördert Selbstständigkeit
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-yellow-300" />
                        Ermöglicht gesellschaftliche Teilhabe
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-300" />
                        Verbessert berufliche Chancen
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-yellow-300" />
                        Stärkt soziale Kompetenzen
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-300" />
                        Schafft Chancengleichheit
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Teaching Service */}
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 text-6xl opacity-20">
                  📚
                </div>
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 font-semibold"
                    >
                      Service
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 text-white">
                    Individueller Unterricht
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm mb-4">
                    <p className="text-white/90 leading-relaxed mb-4">
                      Professioneller Unterricht & Coaching von erfahrenen
                      Lehrkräften. Ein Teil der Einnahmen unterstützt soziale
                      Projekte.
                    </p>
                    <ul className="space-y-1 text-white/80 text-sm">
                      <li>• Einzel- und Gruppenunterricht</li>
                      <li>• Online & vor Ort möglich</li>
                      <li>• Transparente Preisgestaltung</li>
                      <li>• Förderung sozialer Einrichtungen</li>
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <a href="mailto:info@mytruekarma.com?subject=Unterricht%20Anfrage">
                      <Mail className="mr-2 h-4 w-4" />
                      Unterricht anfragen
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Center Column: Main Content & Quiz */}
            <div className="lg:col-span-1 space-y-8">
              {/* Introduction */}
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Bildung als Schlüssel
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Bildung ist der Schlüssel zu persönlichem Wachstum,
                    gesellschaftlichem Fortschritt und beruflichem Erfolg. Sie
                    fördert kritisches Denken, eröffnet neue Perspektiven und
                    hilft, die Welt besser zu verstehen. Ob Schule, Ausbildung,
                    Studium oder lebenslanges Lernen – Bildung begleitet uns ein
                    Leben lang und ist die Grundlage für eine gerechte und
                    innovative Gesellschaft.
                  </p>
                </CardContent>
              </Card>

              {/* Quiz Game */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 text-6xl opacity-20">
                  🧠
                </div>
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 font-semibold"
                    >
                      Lernspiel
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 text-white">
                    Teste dein Wissen
                  </CardTitle>
                  <p className="text-white/90">
                    Beantworte die folgenden Fragen und finde heraus, wie gut du
                    dich mit dem Thema Bildung auskennst!
                  </p>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    {!finished ? (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-center text-white">
                          {questions[current].question}
                        </h3>
                        <div className="space-y-3 mb-6">
                          {questions[current].options.map((opt, idx) => (
                            <button
                              key={idx}
                              className={`block w-full text-left p-3 rounded-lg border-2 transition-all duration-300 ${
                                selected === idx
                                  ? "bg-white text-green-600 border-white shadow-lg transform scale-105"
                                  : "bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50"
                              }`}
                              onClick={() => handleOptionClick(idx)}
                              disabled={selected !== null}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                          onClick={handleNext}
                          disabled={selected === null}
                        >
                          {current < questions.length - 1 ? "Weiter" : "Fertig"}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="h-10 w-10 text-yellow-300" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">
                          Spiel beendet!
                        </h3>
                        <p className="text-xl text-white/90 mb-2">
                          Du hast {score} von {questions.length} Fragen richtig
                          beantwortet.
                        </p>
                        <p className="text-white/80">
                          Weiter so! Bildung ist ein lebenslanger Prozess.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Social Impact & Contact */}
            <div className="lg:col-span-1 space-y-8">
              {/* Social Impact */}
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 text-6xl opacity-20">
                  ❤️
                </div>
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 font-semibold"
                    >
                      Sozial
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 text-white">
                    Soziale Förderung
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-white/90 leading-relaxed">
                      Mit jedem gebuchten Unterricht unterstützt du soziale
                      Einrichtungen und Projekte. Dein Beitrag hilft, Bildung
                      für alle zugänglich zu machen und stärkt die Gemeinschaft!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Kontakt
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Du hast Fragen oder möchtest mehr erfahren? Schreib uns
                      gerne eine E-Mail!
                    </p>
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                      asChild
                    >
                      <a href="mailto:info@mytruekarma.com?subject=Bildung%20Kontakt">
                        <Mail className="mr-2 h-4 w-4" />
                        Kontakt aufnehmen
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
