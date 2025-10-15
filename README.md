# mytrueKarma - Social Commerce Platform

![mytrueKarma Logo](public/myk-logo.png)

**мүтʀueᴋaʀᴍa EST. 2021** - Eine innovative Social Commerce Platform für nachhaltigen und transparenten Handel mit Fokus auf soziale Projekte und Künstlerförderung.

🌐 **Live Demo:** [https://mytruekarma.vercel.app](https://mytruekarma.vercel.app) - [https://mytrue-karma.vercel.app]

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Installation](#installation)
- [Projektstruktur](#projektstruktur)
- [Seiten & Funktionalitäten](#seiten--funktionalitäten)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Mitwirken](#mitwirken)
- [Kontakt](#kontakt)
- [Lizenz](#lizenz)

## 🎯 Über das Projekt

mytrueKarma ist eine umfassende Social Commerce Platform, die nachhaltigen Handel, Transparenz und soziales Engagement miteinander verbindet. Die Plattform bietet:

- **E-Commerce Store** für nachhaltige Produkte
- **Künstler- und Talentförderung** mit Featured Artists
- **Service & Job Marketplace** für kreative Dienstleistungen
- **Seller Dashboard** für Verkäufer und Künstler
- **Transparenz-Features** für soziale Projekte
- **Community-Building** für nachhaltige Initiativen

### 🌱 Mission

Wir glauben an nachhaltigen Handel, der nicht nur Profit generiert, sondern auch positive soziale Auswirkungen schafft. Unsere Plattform verbindet Käufer, Verkäufer und Künstler in einer transparenten und ethischen Handelsumgebung.

## ✨ Features

### 🛍️ E-Commerce

- **Produktkatalog** mit detaillierten Produktseiten
- **Responsive Shop** mit Kategoriefilterung
- **Dynamisches Produktmanagement** mit localStorage
- **Events & Immobilien** Integration im Shop
- **Services Marketplace** mit vollständiger Integration
- **Warenkorb-System** mit lokaler Speicherung
- **Wishlist-Funktionalität**
- **Bestellverfolgung** und Status-Management

### 📦 Dynamisches Produktsystem

- **Zentrales ProductStore-System** für alle Produkttypen
- **4 Produkttypen**: Normale Produkte, Events, Immobilien, Services
- **localStorage-basiert** (Migration zu Datenbank geplant)
- **Admin-Interface** zum Erstellen/Bearbeiten/Löschen
- **Automatische Initialisierung** mit 24 Default-Produkten
  - 6 normale Produkte
  - 8 Events
  - 6 Immobilien
  - 4 Services
- **Debug-Tool** für Troubleshooting (`/admin/products/debug`)

### 🏢 Immobilien & Events

- **Immobilien-Verwaltung** mit Verkauf/Vermietung
- **Event-Management** mit Ticketverkauf
- **Detaillierte Dialoge** für Event/Immobilien-Informationen
- **Social Impact Tracking** bei allen Transaktionen
- **Preisfilter** bis 2.000.000€ für Immobilien
- **My Events/Immobilien Seiten** mit direktem Admin-Zugang

### 💼 Service Marketplace

- **Service-Verwaltung** mit Anbieter-Profilen
- **Stundensatz-Kalkulation**
- **Skill-Tags & Kategorien** (IT & Tech, Design, Marketing, etc.)
- **Verifizierte Anbieter** Badge-System
- **Bewertungssystem** mit Reviews
- **Vollständige Shop-Integration**

### 👨‍💼 Seller Dashboard

- **Umfassendes Verkäufer-Dashboard** mit Analytics
- **Produktverwaltung** (Hinzufügen, Bearbeiten, Löschen)
- **Bestellmanagement** mit detaillierten Order-Details
- **Tracking-System** für Sendungsverfolgung
- **Notizen-System** für interne Kommunikation

### 🎨 Künstlerförderung

- **Featured Artists Showcase** mit Portfolio-Links
- **Talent-Förderungsprogramm**
- **Künstler-Profile** mit Artwork-Verlinkungen
- **Bewerbungsformulare** für neue Talente
- **Community-Netzwerk** für Kreative

### 💼 Service Marketplace

- **Dual Service/Job System**
- **Interaktive Erstellungsformulare**
- **Kategorie-basierte Suche**
- **Dienstleistungs-Portfolio**

### 📱 Kommunikation

- **WhatsApp Integration** auf allen Kontaktpunkten
- **Social Media Links** (Instagram, Facebook, Pinterest)
- **Kontaktformulare** für verschiedene Anfragen
- **FAQ-Systeme** mit expandierbaren Antworten

### 🎨 Design & UX

- **Moderne UI/UX** mit Tailwind CSS
- **Responsive Design** für alle Geräte
- **Dark/Light Mode** Support
- **Animations & Transitions** für bessere UX
- **Accessibility-optimiert**

## 🛠️ Technologie-Stack

### Frontend

- **[Next.js 14.2.16](https://nextjs.org/)** - React Framework mit App Router
- **[React 18](https://reactjs.org/)** - UI Library
- **[TypeScript](https://www.typescriptlang.org/)** - Typsicherheit
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS Framework

### State Management & Storage

- **localStorage** - Client-seitige Datenpersistenz (temporär)
- **React Context API** - Cart & Wishlist State
- **Custom Hooks** - useProducts, useCart, useWishlist

### Geplante Backend-Integration

- **[Supabase](https://supabase.com/)** - PostgreSQL Database & Backend (geplant)
- **[NextAuth.js](https://next-auth.js.org/)** - Authentifizierung & Session Management (geplant)
- **[Prisma](https://www.prisma.io/)** - ORM für Datenbankzugriff (geplant)

### UI Components

- **[shadcn/ui](https://ui.shadcn.com/)** - Moderne React Components
- **[Lucide React](https://lucide.dev/)** - Icon Library
- **[Radix UI](https://www.radix-ui.com/)** - Primitive Components

### Styling & Animation

- **[Tailwind CSS](https://tailwindcss.com/)** - Responsive Styling
- **Custom CSS Animations** - Smooth Transitions
- **Gradient Backgrounds** - Moderne Farbverläufe

### Deployment & Hosting

- **[Vercel](https://vercel.com/)** - Hosting & Deployment
- **[GitHub](https://github.com/)** - Version Control
- **Automatische Deployments** bei Git Push

## 🚀 Installation

### Voraussetzungen

- Node.js 18+
- npm oder pnpm
- Git

### Lokale Installation

1. **Repository klonen**

```bash
git clone https://github.com/mytrueKarma/mytrueKarma.git
cd mytrueKarma
```

2. **Dependencies installieren**

```bash
npm install
# oder
pnpm install
```

3. **Development Server starten**

```bash
npm run dev
# oder
pnpm dev
```

4. **Im Browser öffnen**

```
http://localhost:3000
```

### Build für Produktion

```bash
npm run build
npm run start
```

## 📁 Projektstruktur

```
mytrueKarma/
├── app/                        # Next.js App Router
│   ├── about/                  # Über uns / Dienstleistungen
│   ├── admin/                  # Admin Dashboard
│   │   └── products/
│   │       ├── new/           # Neues Produkt/Event/Immobilie/Service
│   │       └── debug/         # Debug-Tool für ProductStore
│   ├── api/                    # API Routes
│   │   └── auth/              # Authentifizierung
│   ├── auth/                   # Login & Registration
│   ├── blog/                   # Blog System
│   ├── cart/                   # Warenkorb
│   ├── categories/             # Kategorie-Unterseiten
│   │   ├── mens-fashion/
│   │   ├── womens-fashion/
│   │   ├── accessories/
│   │   ├── home-garden/
│   │   ├── travel/
│   │   └── exclusive-designs/
│   ├── dashboard/              # User Dashboard
│   ├── events/                 # Event-Detailseiten
│   ├── immobilien/             # Immobilien-Detailseiten
│   ├── my/                     # User-spezifische Seiten
│   │   ├── events/            # Meine Events
│   │   └── immobilien/        # Meine Immobilien
│   ├── products/               # Produktkatalog
│   ├── search/                 # Suchfunktion
│   ├── seller/                 # Seller Dashboard
│   │   ├── dashboard/         # Verkäufer Übersicht
│   │   ├── orders/            # Bestellmanagement
│   │   ├── products/          # Produktverwaltung
│   │   ├── profile/           # Verkäufer Profil
│   │   └── register/          # Verkäufer Registrierung
│   ├── services/               # Service Marketplace
│   ├── shop/                   # Online Shop (mit Events, Immobilien, Services)
│   ├── talent/                 # Künstlerförderung
│   ├── transparency/           # Transparenz & Projekte
│   ├── wishlist/              # Wunschliste
│   ├── globals.css            # Globale Styles
│   ├── layout.tsx             # Root Layout
│   └── page.tsx               # Homepage
├── components/                 # React Components
│   ├── ui/                    # shadcn/ui Components
│   ├── animated-particles.tsx # Hintergrund-Animationen
│   ├── app-sidebar.tsx        # Navigation Sidebar
│   ├── auth-provider.tsx      # Authentication Context
│   ├── footer.tsx             # Footer Component
│   ├── header.tsx             # Header & Navigation
│   └── theme-provider.tsx     # Theme Management
├── contexts/                   # React Contexts
│   ├── cart-context.tsx       # Warenkorb State
│   └── wishlist-context.tsx   # Wunschliste State
├── hooks/                      # Custom React Hooks
│   ├── use-mobile.tsx         # Mobile Detection
│   ├── use-products.ts        # Product Management Hook
│   └── use-toast.ts           # Toast Notifications
├── lib/                        # Utility Functions
│   ├── products-store.ts      # Zentrales ProductStore-System
│   └── utils.ts               # Helper Functions
├── public/                     # Statische Assets
│   ├── images/                # Bild-Assets
│   ├── *.jpg                  # Produkt & Künstler Bilder
│   └── placeholder-*.jpg      # Placeholder Bilder
├── styles/                     # Zusätzliche Styles
│   └── globals.css            # CSS Imports
├── PRODUKT-MANAGEMENT.md      # Dokumentation ProductStore
├── PROBLEM-BEHEBEN.md         # Troubleshooting Guide
├── components.json             # shadcn/ui Konfiguration
├── next.config.mjs            # Next.js Konfiguration
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind Konfiguration
└── tsconfig.json              # TypeScript Konfiguration
```

## 📖 Seiten & Funktionalitäten

### 🏠 Homepage (`/`)

- **Hero Section** mit Call-to-Action
- **Featured Products** Showcase
- **Social Impact** Highlights
- **Community Features** Übersicht

### 🛒 Shop (`/shop`)

- **Produktkatalog** mit Kategorien
- **Produktdetailseiten** (`/shop/[id]`)
- **Filteroptionen** und Suche
- **Warenkorb-Integration**

### 👨‍💼 Seller Dashboard (`/seller/`)

- **Dashboard Overview** (`/seller/dashboard`)
- **Produktverwaltung** (`/seller/products`)
- **Bestellmanagement** (`/seller/orders`)
- **Profilverwaltung** (`/seller/profile`)
- **Seller Registrierung** (`/seller/register`)

### 🎨 Talent & Künstler (`/talent`)

- **Förderungsprogramm** Beschreibung
- **Featured Artists** Showcase
- **Bewerbungsformular**
- **FAQ Section**
- **WhatsApp Integration**

### 💼 Services (`/services`)

- **Service Marketplace** für Dienstleistungen
- **Kategorie-basierte Filterung** (IT & Tech, Design, Marketing, etc.)
- **Anbieter-Profile** mit Verifizierungs-Badge
- **Stundensatz-Kalkulation**
- **Skill-Tags & Bewertungen**
- **Dialog-Detailansicht**
- **Integration mit Shop** (`/shop` - Services Kategorie)

### 🏢 Events & Immobilien

- **Event-Verwaltung** (`/my/events`)
  - Event-Katalog mit Dialog-Details
  - Ticket-Buchungssystem
  - Teilnehmer-Tracking
  - Social Impact Anzeige
  - Direkter Link zu Admin für neue Events
- **Immobilien-Verwaltung** (`/my/immobilien`)
  - Verkauf und Vermietung
  - Detaillierte Objektinformationen
  - Energieklasse & Features
  - Preisfilter bis €2.000.000
  - Direkter Link zu Admin für neue Immobilien

### 🛠️ Admin-Bereich (`/admin/products`)

- **Zentrale Produktverwaltung** (`/admin/products/new`)
  - 4-Tab-Interface: Produkt, Event, Immobilie, Service
  - Type-spezifische Formularfelder
  - Kategorie-Verwaltung
  - Social Impact Tracking
- **Debug-Tool** (`/admin/products/debug`)
  - Produkt-Statistiken anzeigen
  - Storage-Größe überprüfen
  - Daten neu initialisieren
  - Auf Standard zurücksetzen
  - Alle Daten löschen

### ℹ️ Über uns (`/about`)

- **Unternehmensgeschichte**
- **Team Präsentation**
- **Mission & Vision**
- **Künstler Kooperationen**

### 🔍 Weitere Seiten

- **Warenkorb** (`/cart`)
- **Wunschliste** (`/wishlist`)
- **Suche** (`/search`)
- **Transparenz** (`/transparency`)
- **Blog** (`/blog`)
- **Authentication** (`/auth/login`, `/auth/register`)

## 🎨 Design System

### Farbpalette

- **Primary:** Purple Gradients (`from-purple-600 to-pink-600`)
- **Secondary:** Orange Accents (`from-orange-500 to-red-500`)
- **Neutral:** Gray Scale für Text und Backgrounds
- **Success:** Green für positive Aktionen
- **Warning:** Yellow/Orange für Warnungen

### Typography

- **Headings:** Bold, verschiedene Größen (text-4xl bis text-6xl)
- **Body Text:** text-base mit text-muted-foreground
- **Buttons:** font-semibold mit shadow-lg

### Components

- **Cards:** hover:shadow-lg mit transform hover:scale-105
- **Buttons:** Gradient backgrounds mit hover states
- **Forms:** shadcn/ui components mit validation
- **Icons:** Lucide React icons konsistent verwendet

### Responsive Design

- **Mobile First:** Tailwind responsive classes
- **Breakpoints:** sm, md, lg, xl für verschiedene Geräte
- **Grid Layouts:** Flexible grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## 🚀 Deployment

Die Anwendung ist automatisch über Vercel deployed:

### Automatische Deployments

- **Main Branch:** Jeder Push triggert automatisches Deployment
- **Pull Requests:** Preview Deployments für Reviews
- **SSL:** Automatische HTTPS-Zertifikate

### Environment Variables

Aktuell keine Environment Variables erforderlich (statische Daten).

### Performance Optimierungen

- **Next.js Image Optimization**
- **Automatic Code Splitting**
- **Static Generation** wo möglich
- **CDN Delivery** über Vercel

## 🗺️ Roadmap

### Phase 1 - Foundation ✅ (Abgeschlossen)

- [x] Grundlegende E-Commerce Funktionalität
- [x] Responsive Design Implementation
- [x] Seller Dashboard
- [x] Künstlerförderung Features
- [x] WhatsApp Integration
- [x] **Dynamisches Produktsystem** mit 4 Typen
- [x] **Events & Immobilien** vollständige Integration
- [x] **Services Marketplace** mit Anbieter-Profilen
- [x] **Admin-Interface** für CRUD-Operationen
- [x] **localStorage-basierte** Datenpersistenz
- [x] **Debug-Tools** für Troubleshooting

### Phase 2 - Backend & Authentication (In Arbeit) 🚀

- [ ] **Supabase Integration**
  - [ ] PostgreSQL Datenbank Setup
  - [ ] Tabellen für Users, Products, Orders, Events, Immobilien, Services
  - [ ] Row Level Security (RLS) Policies
  - [ ] Storage für Bilder
  - [ ] Real-time Subscriptions
- [ ] **NextAuth.js Implementation**
  - [ ] Email/Password Authentication
  - [ ] OAuth Provider (Google, Facebook)
  - [ ] Session Management
  - [ ] Protected Routes & Middleware
  - [ ] User Roles (Admin, Seller, User)
- [ ] **Migration von localStorage zu Supabase**
  - [ ] ProductStore → Supabase Tables
  - [ ] Cart → User-spezifische Carts
  - [ ] Wishlist → User Favorites
  - [ ] Order History Migration

### Phase 3 - Payment & Communication (Geplant)

- [ ] **Payment Integration** (Stripe/PayPal)
- [ ] **Real-time Chat** Features
- [ ] **Email Notifications** (Transaktional)
- [ ] **SMS Benachrichtigungen**
- [ ] **Bewertungssystem** mit Persistenz

### Phase 4 - Advanced Features (Zukunft)

- [ ] **AI-powered Recommendations**
- [ ] **Advanced Analytics Dashboard**
- [ ] **Multi-language Support** (i18n)
- [ ] **Mobile App** (React Native)
- [ ] **API für Third-party Integration**

### Phase 5 - Scale (Vision)

- [ ] **Marketplace für digitale Kunst**
- [ ] **NFT Integration**
- [ ] **Augmented Reality** Product Views
- [ ] **Blockchain-based Transparency**

---

## 📝 Aktuelle Entwicklung (Oktober 2025)

### ✅ Kürzlich abgeschlossen

1. **Dynamisches Produktsystem**

   - Zentrales ProductStore mit TypeScript Interfaces
   - 4 Produkttypen: product, event, immobilie, service
   - localStorage-Integration mit Auto-Initialisierung
   - 24 Default-Produkte (6+8+6+4)

2. **Admin-Interface Erweiterung**

   - 4-Tab-System für alle Produkttypen
   - Type-spezifische Formularfelder
   - Kategorie-Management pro Typ
   - Vollständige CRUD-Funktionalität

3. **Services Marketplace**

   - Neue Services-Seite mit Filterung
   - Anbieter-Profile und Verifizierung
   - Skill-Tags und Kategorien
   - Shop-Integration mit Services-Kategorie

4. **Events & Immobilien**

   - My Events/Immobilien Seiten
   - Dialog-basierte Detailansichten
   - Direkter Admin-Zugang für neue Einträge
   - Vollständige Shop-Integration

5. **Bug Fixes**
   - AnimatedParticles z-index Probleme behoben
   - Header-Links auf allen Seiten klickbar
   - Filterlogik für type-basierte Kategorien
   - Dialog-Imports korrigiert

### 🔄 Nächste Schritte

1. **Supabase Setup** (Priorität: Hoch)

   ```bash
   # Installation
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

   # Supabase Projekt erstellen auf supabase.com
   # Environment Variables konfigurieren
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. **NextAuth.js Integration** (Priorität: Hoch)

   ```bash
   # Installation
   npm install next-auth @auth/supabase-adapter

   # Setup
   # - Auth API Route erstellen
   # - Supabase Adapter konfigurieren
   # - Provider konfigurieren (Email, Google, etc.)
   # - Middleware für Protected Routes
   ```

3. **Datenbank Migration** (Priorität: Mittel)

   - Schema-Design für alle Entities
   - Migration Scripts erstellen
   - ProductStore auf Supabase API umstellen
   - localStorage als Fallback behalten

4. **Testing & QA** (Priorität: Mittel)
   - Unit Tests für ProductStore
   - Integration Tests für API Routes
   - E2E Tests mit Playwright
   - Performance Optimierung

## 🤝 Mitwirken

Wir freuen uns über Beiträge zur mytrueKarma Platform!

### Wie kann man beitragen?

1. **Fork** das Repository
2. **Feature Branch** erstellen (`git checkout -b feature/AmazingFeature`)
3. **Änderungen committen** (`git commit -m 'Add some AmazingFeature'`)
4. **Branch pushen** (`git push origin feature/AmazingFeature`)
5. **Pull Request** öffnen

### Contribution Guidelines

- Code sollte TypeScript-konform sein
- Neue Features sollten responsive sein
- UI Components sollten shadcn/ui Standards folgen
- Commits sollten beschreibende Nachrichten haben

### Bereiche für Contributions

- **Frontend Development** (React/Next.js)
- **UI/UX Design** (Figma/Design)
- **Content Creation** (Texte/Bilder)
- **Testing** (Unit/Integration Tests)
- **Documentation** (README/Code Comments)

## 📞 Kontakt

### mytrueKarma Team

- **WhatsApp:** [+49 15678443874](https://api.whatsapp.com/send?phone=4915678443874)
- **Adresse:** Aufm Hennekamp 96, 40225 Düsseldorf
- **Öffnungszeiten:** Mon – Fr : 9:30 – 18:00

### Social Media

- **Facebook:** [mytruekarma](https://www.facebook.com/mytruekarma)
- **Instagram:** [mytruekarma](https://www.instagram.com/mytruekarma)

### Development

- **GitHub:** [mytrueKarma Repository](https://github.com/mytrueKarma/mytrueKarma)
- **Website:** [mytruekarma.vercel.app](https://mytruekarma.vercel.app)

## 📄 Lizenz

Dieses Projekt ist unter der MIT Lizenz veröffentlicht. Siehe [LICENSE](LICENSE) für Details.

---

## 🙏 Danksagungen

### Verwendete Technologien

- **Next.js Team** für das großartige Framework
- **Tailwind CSS** für das utility-first CSS
- **shadcn** für die wunderbaren UI Components
- **Vercel** für das einfache Deployment

### Featured Artists

- **Sara Jane Gupton** - Erste Designerin für "Hamza Hand" Design
- **Lyubow Landa** - Künstlerin für "Whale" Design

### Community

Danke an alle, die zur Entwicklung und dem Wachstum der mytrueKarma Platform beitragen!

---

**Made with ❤️ in Düsseldorf** | **COPYRIGHT 2024 © mytrueKarma**

> Ein Projekt für nachhaltigen und transparenten Handel
