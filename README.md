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
- **Warenkorb-System** mit lokaler Speicherung
- **Wishlist-Funktionalität**
- **Bestellverfolgung** und Status-Management

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
│   ├── api/                    # API Routes
│   │   └── auth/              # Authentifizierung
│   ├── auth/                   # Login & Registration
│   ├── blog/                   # Blog System
│   ├── cart/                   # Warenkorb
│   ├── dashboard/              # User Dashboard
│   ├── products/               # Produktkatalog
│   ├── search/                 # Suchfunktion
│   ├── seller/                 # Seller Dashboard
│   │   ├── dashboard/         # Verkäufer Übersicht
│   │   ├── orders/            # Bestellmanagement
│   │   ├── products/          # Produktverwaltung
│   │   ├── profile/           # Verkäufer Profil
│   │   └── register/          # Verkäufer Registrierung
│   ├── services/               # Service & Job Marketplace
│   ├── shop/                   # Online Shop
│   ├── talent/                 # Künstlerförderung
│   ├── transparency/           # Transparenz & Projekte
│   ├── wishlist/              # Wunschliste
│   ├── globals.css            # Globale Styles
│   ├── layout.tsx             # Root Layout
│   └── page.tsx               # Homepage
├── components/                 # React Components
│   ├── ui/                    # shadcn/ui Components
│   ├── app-sidebar.tsx        # Navigation Sidebar
│   ├── auth-provider.tsx      # Authentication Context
│   ├── footer.tsx             # Footer Component
│   ├── header.tsx             # Header & Navigation
│   └── theme-provider.tsx     # Theme Management
├── contexts/                   # React Contexts
│   └── cart-context.tsx       # Warenkorb State
├── hooks/                      # Custom React Hooks
│   ├── use-mobile.tsx         # Mobile Detection
│   └── use-toast.ts           # Toast Notifications
├── lib/                        # Utility Functions
│   └── utils.ts               # Helper Functions
├── public/                     # Statische Assets
│   ├── images/                # Bild-Assets
│   ├── *.jpg                  # Produkt & Künstler Bilder
│   └── myk-logo.png           # Logo
├── styles/                     # Zusätzliche Styles
│   └── globals.css            # CSS Imports
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
- **Service Marketplace**
- **Job Postings**
- **Dual Creation System**
- **Kategorie-Navigation**

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

### Phase 1 - Foundation ✅
- [x] Grundlegende E-Commerce Funktionalität
- [x] Responsive Design Implementation
- [x] Seller Dashboard
- [x] Künstlerförderung Features
- [x] WhatsApp Integration

### Phase 2 - Enhancement (Geplant)
- [ ] **Database Integration** (PostgreSQL/Supabase)
- [ ] **User Authentication** (NextAuth.js)
- [ ] **Payment Integration** (Stripe/PayPal)
- [ ] **Real-time Chat** Features
- [ ] **Email Notifications**

### Phase 3 - Advanced Features (Zukunft)
- [ ] **AI-powered Recommendations**
- [ ] **Advanced Analytics Dashboard**
- [ ] **Multi-language Support**
- [ ] **Mobile App** (React Native)
- [ ] **API für Third-party Integration**

### Phase 4 - Scale (Vision)
- [ ] **Marketplace für digitale Kunst**
- [ ] **NFT Integration**
- [ ] **Augmented Reality** Product Views
- [ ] **Blockchain-based Transparency**

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
