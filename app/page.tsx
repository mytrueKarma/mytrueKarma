"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import "@/styles/hero-buttons.css";
import "@/styles/category-rotation.css";
import { Header } from "@/components/header"; // falls Header.tsx dort liegt



// Kategorien-Daten
const categories = [
  { name: "Accessories", image: "/accessories-bags-social.jpg", link: "/categories/accessories" },
  { name: "Exclusive Designs", image: "/exclusive-designs-social.jpg", link: "/categories/exclusive-designs" },
  { name: "Home & Garden", image: "/home-garden-social.jpg", link: "/categories/home-garden" },
  { name: "Mens Fashion", image: "/mens-fashion-social.jpg", link: "/categories/mens-fashion" },
  { name: "Travel", image: "/travel-accessories-social.jpg", link: "/categories/travel" },
  { name: "Womens Fashion", image: "/womens-fashion-social.jpg", link: "/categories/womens-fashion" },
];

<Header />

// Hero
// Hero inklusive rotierende Kategorien
const Hero = () => (
  <section className="relative w-full text-white overflow-hidden">

    {/* Hintergrundbild */}
    <div className="w-full relative">
      <Image
        src="/KarmaMockup.png"
        alt="mytrueKarma Social Commerce Platform Background"
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Text & Buttons – absolut darüber gelegt */}
    <div className="absolute inset-0 z-10 flex flex-col justify-start items-start px-4 pt-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-5 text-yellow-300 drop-shadow-xl">
        MyTrueKarma klingt zwar Englisch …
      </h1>
      <p className="text-lg md:text-xl text-white drop-shadow-lg mb-2">
        … aber wir sind ein stolzes deutsches Unternehmen,<br />
        das sich für positive Veränderungen einsetzt.
      </p>
      <br />
      <p className="text-lg md:text-xl text-white drop-shadow-lg mb-2">
        Wir <strong>veröffentlichen</strong> jede Transaktion auf unserer Website & spenden
        <strong> 50%</strong><br />
        aller Einnahmen transparent an soziale Organisationen.
      </p>
      <br />
      <p className="text-lg md:text-xl text-white drop-shadow-lg mb-6">
        Schauen Sie sich also unsere Produkte an & kaufen Sie sozial ein <br />
        oder schauen Sie sich unsere Projekte an!
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          marginLeft: "20%",
          marginTop: "8%",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link href="">
          <Button className="button">Wir, unsere Vision<br />Die Site</Button>
        </Link>
        <Link href="">
          <Button className="button">Physical Good<br />Produkte, Mode und mehr</Button>
        </Link>
        <Link href="">
          <Button className="button">Experience Good<br />Aktivitäten, Beratungen und mehr</Button>
        </Link>
      </div>
    </div>

    {/* Kategorien am unteren Ende des Hero-Bildes */}
    <div className="absolute bottom-0 w-full z-20">
      <section className="wrapper" style={{ position: "relative", height: "300px" }}>
        <div className="inner">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="card"
              style={{ "--index": index, "--quantity": categories.length } as React.CSSProperties}
            >
              <div className="card-inner">
                <div className="card-name">{cat.name}</div>
                <img src={cat.image} alt={cat.name} className="img" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

  </section>
);


// Footer
const Footer = () => (
  <footer className="bg-gray-200 py-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 px-4">
      <p>© 2025 mytrueKarma. Alle Rechte vorbehalten.</p>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/agb">AGB</Link>
      </div>
    </div>
  </footer>
);

// Page Export
export default function Page() {
  return (
    <div className="relative w-full h-full overflow-x-hidden">
      <Header />
      <main className="mt-20">
        <Hero />
     
      </main>
      <Footer />
    </div>
  );
}
