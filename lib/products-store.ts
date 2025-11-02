// Zentrale Produkt-Verwaltung mit localStorage
// Diese Lösung funktioniert clientseitig und kann später auf eine Datenbank migriert werden

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  type: "product" | "event" | "immobilie" | "service";

  // Event-spezifische Felder
  date?: string;
  time?: string;
  location?: string;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
  organizer?: string;
  tags?: string[];
  socialImpact?: string;

  // Immobilien-spezifische Felder
  size?: number;
  rooms?: number;
  bathrooms?: number;
  propertyType?: string;
  purpose?: string;
  priceType?: string;
  features?: string[];
  energyClass?: string;
  yearBuilt?: number;

  // Service-spezifische Felder
  provider?: string;
  hourlyRate?: boolean;
  availability?: string;
  verified?: boolean;

  // Travel-spezifische Felder
  destination?: string;
  hotel?: string;
  nights?: number;
  included?: string[];
  discount?: number;
  travelType?: string;
}

// Default Produkte (aus der aktuellen shop/page.tsx)
const defaultProducts: Product[] = [
  {
    id: 1,
    name: "mytrueKarma Herren T-Shirt",
    price: 39.0,
    originalPrice: 49.0,
    rating: 4.8,
    reviews: 156,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T812A2PA5886PT17X8Y12D341218728W32899H42315/views/1,width=650,height=650,appearanceId=2,backgroundColor=ffffff,crop=detail,modelId=85/ein-modernes-design-der-duesseldorfer-skyline-kombiniert-mit-dem-logo-von-x-perfekt-fuer-fans-und-liebhaber-der-stadt-am-rhein.jpg",
    category: "Herrenmode",
    inStock: true,
    type: "product",
  },
  {
    id: 2,
    name: "mytrueKarma Damen T-Shirt",
    price: 24.99,
    originalPrice: 37.99,
    rating: 4.7,
    reviews: 203,
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T813A803PA5870PT17X0Y3D303055792W27793H33352/views/1,width=650,height=650,appearanceId=803,backgroundColor=ffffff,crop=detail,modelId=5468/exklusives-design-schnappen-sie-sich-dieses-schoene-design-als-geschenk-fuer-einen-freund-in-ihrer-naehe-fuer-jeden-unterstuetzer-der-sozialen-bewegung-u.jpg",
    category: "Damenmode",
    inStock: true,
    type: "product",
  },
  {
    id: 3,
    name: "Crossbody Tasche 'Planet Whale'",
    price: 27.0,
    originalPrice: 35.0,
    rating: 4.6,
    reviews: 89,
    image:
      "https://i0.wp.com/mytruekarma.com/wp-content/uploads/2024/04/all-over-print-utility-crossbody-bag-white-front-661532e26a196.jpg",
    category: "Accessoires",
    inStock: true,
    type: "product",
  },
  {
    id: 4,
    name: "Exklusive Design Kollektion",
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviews: 127,
    image: "/exclusive-social-design-merchandise.jpg",
    category: "Exklusiv",
    inStock: false,
    type: "product",
  },
  {
    id: 5,
    name: "Premium Kaffeetasse",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.2,
    reviews: 67,
    image: "/premium-coffee-mug-mytruekarma.jpg",
    category: "Haushalt",
    inStock: true,
    type: "product",
  },
  {
    id: 6,
    name: "Ergonomischer Bürostuhl",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 45,
    image: "/ergonomic-office-chair.png",
    category: "Möbel",
    inStock: true,
    type: "product",
  },
  // Immobilien
  {
    id: 101,
    name: "Moderne Penthouse-Wohnung mit Dachterrasse",
    price: 685000,
    originalPrice: 685000,
    rating: 4.9,
    reviews: 12,
    image: "/placeholder.jpg",
    category: "Immobilien",
    inStock: true,
    type: "immobilie",
    location: "Düsseldorf, Oberkassel",
    size: 145,
    rooms: 4,
    bathrooms: 2,
    propertyType: "Wohnung",
    purpose: "Verkauf",
    features: [
      "Dachterrasse",
      "Aufzug",
      "Tiefgarage",
      "Einbauküche",
      "Fußbodenheizung",
    ],
    description:
      "Exklusive Penthouse-Wohnung in begehrter Lage mit herrlichem Rheinblick.",
    socialImpact:
      "2% der Provision fließen in lokale Wohnprojekte für Bedürftige",
  },
  {
    id: 102,
    name: "Charmantes Einfamilienhaus mit Garten",
    price: 895000,
    originalPrice: 895000,
    rating: 4.8,
    reviews: 8,
    image: "/placeholder.jpg",
    category: "Immobilien",
    inStock: true,
    type: "immobilie",
    location: "Düsseldorf, Niederkassel",
    size: 180,
    rooms: 5,
    bathrooms: 3,
    propertyType: "Haus",
    purpose: "Verkauf",
    features: ["Garten", "Garage", "Kamin", "Smart Home", "Solarpanels"],
    description:
      "Familienfreundliches Einfamilienhaus mit großzügigem Garten und moderner Ausstattung.",
    socialImpact:
      "3% der Provision unterstützen Umweltschutzprojekte in der Region",
  },
  {
    id: 103,
    name: "Zentrale 3-Zimmer Wohnung",
    price: 1450,
    originalPrice: 1450,
    rating: 4.6,
    reviews: 15,
    image: "/placeholder.jpg",
    category: "Immobilien",
    inStock: true,
    type: "immobilie",
    location: "Düsseldorf, Stadtmitte",
    size: 85,
    rooms: 3,
    bathrooms: 1,
    propertyType: "Wohnung",
    purpose: "Vermietung",
    priceType: "Monat",
    features: ["Balkon", "Einbauküche", "Kellerabteil", "Stellplatz"],
    description:
      "Perfekt für Berufstätige: Helle Wohnung in Top-Lage mit exzellenter Verkehrsanbindung.",
    socialImpact:
      "5% der Mieteinnahmen im ersten Jahr gehen an Bildungsprojekte",
  },
  {
    id: 104,
    name: "Luxuriöse Villa mit Pool",
    price: 1890000,
    originalPrice: 1890000,
    rating: 5.0,
    reviews: 5,
    image: "/placeholder.jpg",
    category: "Immobilien",
    inStock: true,
    type: "immobilie",
    location: "Düsseldorf, Golzheim",
    size: 320,
    rooms: 7,
    bathrooms: 4,
    propertyType: "Haus",
    purpose: "Verkauf",
    features: ["Pool", "Sauna", "Weinkeller", "Heimkino", "Doppelgarage"],
    description:
      "Repräsentative Villa in exklusiver Wohnlage mit höchstem Komfort.",
    socialImpact: "1% der Provision fließt in soziale Wohnbauprojekte",
  },
  {
    id: 105,
    name: "Moderne 2-Zimmer Wohnung",
    price: 980,
    originalPrice: 980,
    rating: 4.5,
    reviews: 18,
    image: "/placeholder.jpg",
    category: "Immobilien",
    inStock: true,
    type: "immobilie",
    location: "Düsseldorf, Bilk",
    size: 62,
    rooms: 2,
    bathrooms: 1,
    propertyType: "Wohnung",
    purpose: "Vermietung",
    priceType: "Monat",
    features: ["Balkon", "Einbauküche", "Parkett", "Kellerabteil"],
    description:
      "Kompakte Wohnung ideal für Singles oder Paare in beliebtem Stadtteil.",
    socialImpact: "4% der Mieteinnahmen unterstützen lokale Jugendarbeit",
  },
  {
    id: 106,
    name: "Geräumige Maisonette-Wohnung",
    price: 1850,
    originalPrice: 1850,
    rating: 4.7,
    reviews: 10,
    image: "/placeholder.jpg",
    category: "Immobilien",
    inStock: true,
    type: "immobilie",
    location: "Düsseldorf, Pempelfort",
    size: 120,
    rooms: 4,
    bathrooms: 2,
    propertyType: "Wohnung",
    purpose: "Vermietung",
    priceType: "Monat",
    features: ["2 Ebenen", "Gäste-WC", "Einbauküche", "Tiefgarage", "Balkon"],
    description:
      "Besondere Wohnung über zwei Etagen mit viel Platz und hochwertiger Ausstattung.",
    socialImpact: "3% der Jahresmiete fließen in Familienhilfsprojekte",
  },
  // Events
  {
    id: 201,
    name: "Summer Music Festival 2025",
    price: 45,
    originalPrice: 45,
    rating: 4.9,
    reviews: 2500,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-07-15",
    time: "18:00",
    location: "Rheinpark Düsseldorf",
    attendees: 2500,
    maxAttendees: 3000,
    description:
      "Das größte Open-Air Festival des Sommers mit internationalen Künstlern und lokalen Bands.",
    organizer: "mytrueKarma Events",
    tags: ["Open Air", "Live Music", "Festival"],
    socialImpact: "10% der Ticketeinnahmen gehen an lokale Musikschulen",
  },
  {
    id: 202,
    name: "Street Art Workshop",
    price: 25,
    originalPrice: 25,
    rating: 4.7,
    reviews: 15,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-06-20",
    time: "14:00",
    location: "Kunsthalle Düsseldorf",
    attendees: 15,
    maxAttendees: 20,
    description:
      "Lerne von professionellen Street-Art-Künstlern die Grundlagen der urbanen Kunst.",
    organizer: "Art Collective Düsseldorf",
    tags: ["Workshop", "Kunst", "Kreativität"],
    socialImpact: "15% für Kunstförderung benachteiligter Jugendlicher",
  },
  {
    id: 203,
    name: "Veganes Food Festival",
    price: 0,
    originalPrice: 0,
    rating: 4.8,
    reviews: 800,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-06-10",
    time: "11:00",
    location: "Marktplatz Düsseldorf",
    attendees: 800,
    maxAttendees: 1500,
    description:
      "Entdecke die Vielfalt der veganen Küche mit über 40 Food-Ständen und Live-Cooking.",
    organizer: "Green Food Movement",
    tags: ["Vegan", "Food", "Kostenlos"],
    socialImpact: "Spenden gehen an Projekte für nachhaltige Landwirtschaft",
  },
  {
    id: 204,
    name: "Charity Marathon",
    price: 30,
    originalPrice: 30,
    rating: 4.9,
    reviews: 450,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-09-05",
    time: "08:00",
    location: "Rheinufer Start/Ziel",
    attendees: 450,
    maxAttendees: 500,
    description:
      "Laufe für den guten Zweck! Marathon, Halbmarathon und 5km-Lauf für alle Fitnesslevel.",
    organizer: "Düsseldorf Runners Club",
    tags: ["Sport", "Charity", "Gesundheit"],
    socialImpact: "100% der Startgebühren gehen an Kinderhospize",
  },
  {
    id: 205,
    name: "Digital Marketing Masterclass",
    price: 89,
    originalPrice: 89,
    rating: 4.6,
    reviews: 35,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-06-25",
    time: "10:00",
    location: "Tech Hub Düsseldorf",
    attendees: 35,
    maxAttendees: 50,
    description:
      "Intensive Ganztages-Schulung zu Social Media Marketing und Content Creation.",
    organizer: "Digital Academy",
    tags: ["Workshop", "Marketing", "Business"],
    socialImpact: "5% für digitale Bildung in Entwicklungsländern",
  },
  {
    id: 206,
    name: "Open-Air Kino Nacht",
    price: 12,
    originalPrice: 12,
    rating: 4.5,
    reviews: 200,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-07-22",
    time: "21:00",
    location: "Hofgarten Düsseldorf",
    attendees: 200,
    maxAttendees: 300,
    description:
      "Klassische Filme unter freiem Himmel mit Food-Trucks und Bar.",
    organizer: "Cinema Paradiso",
    tags: ["Film", "Open Air", "Sommer"],
    socialImpact: "20% für Filmförderung junger Regisseure",
  },
  {
    id: 207,
    name: "Electronic Night: DJ Battle",
    price: 15,
    originalPrice: 15,
    rating: 4.8,
    reviews: 280,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-06-30",
    time: "22:00",
    location: "Club Unique Düsseldorf",
    attendees: 280,
    maxAttendees: 400,
    description:
      "Die besten DJs der Stadt battlen um den Titel 'Best Mixer 2025'.",
    organizer: "Nightlife Collective",
    tags: ["Party", "Electronic", "DJ"],
    socialImpact: "10% für Musik-Therapie-Programme",
  },
  {
    id: 208,
    name: "Yoga im Park",
    price: 10,
    originalPrice: 10,
    rating: 4.7,
    reviews: 45,
    image: "/placeholder.jpg",
    category: "Events",
    inStock: true,
    type: "event",
    date: "2025-06-08",
    time: "09:00",
    location: "Nordpark Düsseldorf",
    attendees: 45,
    maxAttendees: 60,
    description: "Entspannende Yoga-Session in der Natur für alle Level.",
    organizer: "Mindful Movement",
    tags: ["Yoga", "Wellness", "Natur"],
    socialImpact: "25% für mentale Gesundheitsprojekte",
  },
  // Services
  {
    id: 301,
    name: "Professionelles Webdesign & Entwicklung",
    price: 89,
    originalPrice: 89,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder-user.jpg",
    category: "IT & Tech",
    inStock: true,
    type: "service",
    provider: "Sarah Weber",
    hourlyRate: true,
    location: "München",
    description: "Moderne, responsive Websites mit React und Next.js",
    tags: ["React", "Next.js", "UI/UX"],
    verified: true,
    socialImpact: "5% für Bildungsprojekte",
  },
  {
    id: 302,
    name: "Nachhaltiges Grafikdesign",
    price: 65,
    originalPrice: 65,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder-user.jpg",
    category: "Design",
    inStock: true,
    type: "service",
    provider: "Marcus Green",
    hourlyRate: true,
    location: "Berlin",
    description: "Umweltbewusstes Design für soziale Unternehmen",
    tags: ["Eco-Design", "Branding", "Print"],
    verified: true,
    socialImpact: "10% für Umweltschutz",
  },
  {
    id: 303,
    name: "Soziale Medien Management",
    price: 45,
    originalPrice: 45,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder-user.jpg",
    category: "Marketing",
    inStock: true,
    type: "service",
    provider: "Lisa Chang",
    hourlyRate: true,
    location: "Hamburg",
    description: "Authentisches Social Media für nachhaltige Brands",
    tags: ["Instagram", "LinkedIn", "Content"],
    verified: true,
    socialImpact: "3% für Bildung",
  },
  {
    id: 304,
    name: "Nachhaltigkeitsberatung",
    price: 120,
    originalPrice: 120,
    rating: 5.0,
    reviews: 67,
    image: "/placeholder-user.jpg",
    category: "Beratung",
    inStock: true,
    type: "service",
    provider: "Dr. Thomas Müller",
    hourlyRate: true,
    location: "Frankfurt",
    description: "CSR-Strategien für Unternehmen jeder Größe",
    tags: ["CSR", "Nachhaltigkeit", "Strategie"],
    verified: true,
    socialImpact: "15% für Klimaschutz",
  },
  // Travel Deals
  {
    id: 401,
    name: "Santorini, Griechenland - 5★ Luxury Resort",
    price: 649,
    originalPrice: 899,
    rating: 4.9,
    reviews: 342,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Santorini, Griechenland",
    hotel: "5★ Luxury Resort & Spa",
    nights: 7,
    included: ["Flug", "Hotel", "Frühstück", "Transfer"],
    discount: 28,
    travelType: "Strandurlaub",
    description:
      "Erleben Sie die atemberaubende Schönheit Santorinis in unserem exklusiven 5-Sterne Resort mit privatem Strand, Infinity-Pool und weltklasse Spa. Genießen Sie spektakuläre Sonnenuntergänge, erkunden Sie malerische Dörfer und tauchen Sie ein in die griechische Kultur.",
    location: "Santorini, Griechenland",
    socialImpact:
      "15% der Buchungsgebühr unterstützen lokale Umweltschutzprojekte und nachhaltige Tourismusinitiativen auf den griechischen Inseln.",
  },
  {
    id: 402,
    name: "Marrakesch, Marokko - 4★ Boutique Riad",
    price: 449,
    originalPrice: 699,
    rating: 4.7,
    reviews: 256,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Marrakesch, Marokko",
    hotel: "4★ Boutique Riad",
    nights: 5,
    included: ["Flug", "Hotel", "Halbpension"],
    discount: 36,
    travelType: "Städtereise",
    description:
      "Tauchen Sie ein in die exotische Welt Marrakeschs! Übernachten Sie in einem traditionellen Riad mitten in der Medina, erkunden Sie bunte Souks, besuchen Sie historische Paläste und genießen Sie die marokkanische Küche.",
    location: "Marrakesch, Marokko",
    socialImpact:
      "20% fließen in Bildungsprojekte für benachteiligte Kinder in Marrakesch und fördern lokales Kunsthandwerk.",
  },
  {
    id: 403,
    name: "Phuket, Thailand - 5★ Beach Resort",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 418,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Phuket, Thailand",
    hotel: "5★ Beach Resort",
    nights: 10,
    included: ["Flug", "Hotel", "All Inclusive", "Transfer"],
    discount: 31,
    travelType: "Strandurlaub",
    description:
      "Paradiesischer Strandurlaub in Phuket! Genießen Sie weißen Sand, türkisfarbenes Wasser und exzellenten Service. All Inclusive Paket mit internationaler und thailändischer Küche, Wassersport und Wellness-Angeboten.",
    location: "Phuket, Thailand",
    socialImpact:
      "10% unterstützen Meeresschutzprojekte und nachhaltige Fischerei-Initiativen in Thailand.",
  },
  {
    id: 404,
    name: "Island - Abenteuer & Nordlichter",
    price: 1199,
    originalPrice: 1599,
    rating: 5.0,
    reviews: 189,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Reykjavik, Island",
    hotel: "4★ Boutique Hotel",
    nights: 6,
    included: ["Flug", "Hotel", "Frühstück", "Nordlichter-Tour", "Mietwagen"],
    discount: 25,
    travelType: "Abenteuer",
    description:
      "Erleben Sie die raue Schönheit Islands! Bestaunen Sie Nordlichter, entspannen Sie in heißen Quellen, erkunden Sie Wasserfälle und Gletscher. Inklusive geführter Nordlichter-Tour und Mietwagen für individuelle Entdeckungen.",
    location: "Reykjavik, Island",
    socialImpact:
      "12% für Klimaschutzprojekte und Erhaltung der einzigartigen isländischen Natur.",
  },
  {
    id: 405,
    name: "New York City - Metropolen-Erlebnis",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 523,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "New York City, USA",
    hotel: "4★ Manhattan Hotel",
    nights: 5,
    included: ["Flug", "Hotel", "City Pass", "Transfer"],
    discount: 25,
    travelType: "Städtereise",
    description:
      "Die Stadt, die niemals schläft! Erleben Sie NYC mit allen Highlights: Freiheitsstatue, Times Square, Central Park, Broadway Shows. Inklusive City Pass für über 100 Attraktionen.",
    location: "New York City, USA",
    socialImpact:
      "8% unterstützen soziale Programme für obdachlose Menschen in New York.",
  },
  {
    id: 406,
    name: "Bali, Indonesien - Wellness & Yoga Retreat",
    price: 799,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 267,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Ubud, Bali",
    hotel: "5★ Yoga Resort",
    nights: 8,
    included: [
      "Flug",
      "Hotel",
      "Vollpension",
      "Yoga-Kurse",
      "Spa-Behandlungen",
    ],
    discount: 27,
    travelType: "Wellness",
    description:
      "Finden Sie innere Ruhe in Bali! Tägliche Yoga-Sessions, gesunde balinesische Küche, Spa-Behandlungen und Meditation inmitten tropischer Natur. Perfekt für Körper, Geist und Seele.",
    location: "Ubud, Bali",
    socialImpact:
      "18% fördern lokale Gemeinden und nachhaltige Landwirtschaft auf Bali.",
  },
  {
    id: 407,
    name: "Kreuzfahrt Mittelmeer - 8 Länder",
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 412,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Mittelmeer Kreuzfahrt",
    hotel: "5★ Kreuzfahrtschiff",
    nights: 12,
    included: ["Vollpension", "Entertainment", "Landausflüge", "All Inclusive"],
    discount: 28,
    travelType: "Kreuzfahrt",
    description:
      "Entdecken Sie 8 Länder in 12 Tagen! Barcelona, Rom, Athen, Istanbul und mehr. Luxuriöses Kreuzfahrtschiff mit Pool, Shows, Restaurants und Wellness-Bereich. Landausflüge inklusive.",
    location: "Verschiedene Häfen",
    socialImpact:
      "5% unterstützen Meeresschutzorganisationen und nachhaltige Tourismusprojekte.",
  },
  {
    id: 408,
    name: "Dubai - Luxus & Wüstenabenteuer",
    price: 999,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 345,
    image: "/placeholder.svg",
    category: "Travel",
    inStock: true,
    type: "product",
    destination: "Dubai, VAE",
    hotel: "5★ Luxushotel am Burj Khalifa",
    nights: 6,
    included: [
      "Flug",
      "Hotel",
      "Frühstück",
      "Wüsten-Safari",
      "Burj Khalifa Ticket",
    ],
    discount: 29,
    travelType: "Luxus",
    description:
      "Erleben Sie Dubai's Luxus und Tradition! Übernachten Sie in einem 5-Sterne Hotel mit Blick auf den Burj Khalifa, genießen Sie Shopping-Paradiese und erleben Sie eine authentische Wüsten-Safari mit Kamelritt.",
    location: "Dubai, VAE",
    socialImpact:
      "10% für Bildungsprojekte und Integration von Gastarbeitern in Dubai.",
  },
];

// LocalStorage Key
const STORAGE_KEY = "mytruekarma_products";

// Helper Funktionen
export const ProductStore = {
  // Initialisierung - lädt Produkte aus localStorage oder verwendet Defaults
  initialize(): void {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Erste Initialisierung - speichere Default-Produkte
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    } else {
      // Prüfe ob alle Default-Produkte vorhanden sind
      const existingProducts = JSON.parse(stored);
      const existingIds = existingProducts.map((p: Product) => p.id);

      // Füge fehlende Default-Produkte hinzu
      let updated = false;
      defaultProducts.forEach((defaultProduct) => {
        if (!existingIds.includes(defaultProduct.id)) {
          existingProducts.push(defaultProduct);
          updated = true;
        }
      });

      // Speichere aktualisierte Liste wenn Änderungen vorgenommen wurden
      if (updated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProducts));
      }
    }
  },

  // Alle Produkte abrufen
  getAll(): Product[] {
    if (typeof window === "undefined") return defaultProducts;

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProducts;
  },

  // Produkt nach ID abrufen
  getById(id: number): Product | undefined {
    const products = this.getAll();
    return products.find((p) => p.id === id);
  },

  // Nach Kategorie filtern
  getByCategory(category: string): Product[] {
    const products = this.getAll();
    return products.filter((p) => p.category === category);
  },

  // Nach Typ filtern
  getByType(type: "product" | "event" | "immobilie"): Product[] {
    const products = this.getAll();
    return products.filter((p) => p.type === type);
  },

  // Neues Produkt hinzufügen
  add(product: Omit<Product, "id">): Product {
    if (typeof window === "undefined")
      throw new Error("Not in browser environment");

    const products = this.getAll();
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };

    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

    return newProduct;
  },

  // Produkt aktualisieren
  update(id: number, updates: Partial<Product>): Product | null {
    if (typeof window === "undefined")
      throw new Error("Not in browser environment");

    const products = this.getAll();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

    return products[index];
  },

  // Produkt löschen
  delete(id: number): boolean {
    if (typeof window === "undefined")
      throw new Error("Not in browser environment");

    const products = this.getAll();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Alle Produkte zurücksetzen (auf Defaults)
  reset(): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  },

  // Alle Produkte löschen
  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
