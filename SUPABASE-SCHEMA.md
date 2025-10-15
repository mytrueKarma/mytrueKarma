# Supabase Datenbank Schema

Dieses Dokument beschreibt das komplette Datenbank-Schema für MyTrueKarma mit Supabase PostgreSQL.

## 📋 Übersicht

Das Schema unterstützt:

- **User Management** (Authentication, Profile, Roles)
- **Product System** (Products, Events, Immobilien, Services)
- **E-Commerce** (Orders, Cart, Wishlist)
- **Social Features** (Reviews, Comments, Following)
- **Transparency** (Impact Tracking, Certifications)

---

## 🗄️ Tabellen

### 1. users

Haupttabelle für User Authentication und Profile.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT, -- NULL für OAuth Users
  name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'seller', 'admin')),
  bio TEXT,
  location TEXT,
  phone TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- Social Impact
  karma_points INTEGER DEFAULT 0,
  impact_score DECIMAL(10,2) DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,

  -- Indexes
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone"
  ON users FOR SELECT
  USING (is_active = true);
```

---

### 2. products

Zentrale Produkttabelle für alle 4 Typen: product, event, immobilie, service.

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Basic Info
  type TEXT NOT NULL CHECK (type IN ('product', 'event', 'immobilie', 'service')),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,

  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),

  -- Inventory
  stock INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,

  -- Media
  images JSONB DEFAULT '[]', -- Array of image URLs
  video_url TEXT,

  -- Location (für Events, Immobilien, Services)
  location TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),

  -- Event-specific
  event_date TIMESTAMPTZ,
  event_end_date TIMESTAMPTZ,
  event_capacity INTEGER,
  event_tickets_sold INTEGER DEFAULT 0,

  -- Immobilie-specific
  property_type TEXT, -- 'wohnung', 'haus', 'grundstück', 'gewerbe'
  property_size DECIMAL(10,2), -- in m²
  rooms INTEGER,
  bathrooms INTEGER,
  year_built INTEGER,
  is_furnished BOOLEAN,

  -- Service-specific
  service_provider TEXT, -- Name des Anbieters
  hourly_rate DECIMAL(10,2),
  is_verified BOOLEAN DEFAULT false,
  skills JSONB DEFAULT '[]', -- Array of skills

  -- Social Impact
  social_impact TEXT,
  impact_category TEXT, -- 'umwelt', 'sozial', 'bildung', etc.
  co2_offset DECIMAL(10,2),
  certifications JSONB DEFAULT '[]',

  -- SEO & Tags
  tags JSONB DEFAULT '[]',
  slug TEXT UNIQUE,

  -- Metadata
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT valid_stock CHECK (stock >= 0),
  CONSTRAINT valid_price CHECK (price >= 0),
  CONSTRAINT valid_event_dates CHECK (event_end_date IS NULL OR event_end_date >= event_date)
);

-- Indexes
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_location ON products(location);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_slug ON products(slug);

-- Full-text Search
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('german', title || ' ' || description));

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (is_available = true AND published_at IS NOT NULL);

CREATE POLICY "Sellers can manage their own products"
  ON products FOR ALL
  USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
```

---

### 3. orders

Bestellungen und Transaktionen.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Order Info
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
  )),

  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',

  -- Payment
  payment_method TEXT, -- 'credit_card', 'paypal', 'stripe', etc.
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'paid', 'failed', 'refunded'
  )),
  payment_intent_id TEXT, -- Stripe/PayPal Transaction ID
  paid_at TIMESTAMPTZ,

  -- Shipping
  shipping_address JSONB, -- {street, city, postal_code, country, etc.}
  tracking_number TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_total CHECK (total >= 0)
);

-- Indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_number ON orders(order_number);

-- RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
```

---

### 4. order_items

Line Items für Bestellungen.

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,

  -- Product Snapshot (für historische Daten)
  product_title TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_image TEXT,

  -- Pricing
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- RLS Policies
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items inherit order permissions"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );
```

---

### 5. cart

Warenkorb (persistiert über Sessions hinweg).

```sql
CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT, -- Für nicht-eingeloggte User
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ein User kann ein Produkt nur einmal im Warenkorb haben
  UNIQUE(user_id, product_id),
  UNIQUE(session_id, product_id)
);

-- Indexes
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_cart_session ON cart(session_id);

-- RLS Policies
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own cart"
  ON cart FOR ALL
  USING (auth.uid() = user_id);
```

---

### 6. wishlist

Wunschliste.

```sql
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ein User kann ein Produkt nur einmal auf der Wunschliste haben
  UNIQUE(user_id, product_id)
);

-- Indexes
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_wishlist_product ON wishlist(product_id);

-- RLS Policies
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own wishlist"
  ON wishlist FOR ALL
  USING (auth.uid() = user_id);
```

---

### 7. reviews

Produktbewertungen.

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images JSONB DEFAULT '[]',

  -- Verification
  is_verified_purchase BOOLEAN DEFAULT false,

  -- Moderation
  is_approved BOOLEAN DEFAULT true,
  is_flagged BOOLEAN DEFAULT false,

  -- Helpful votes
  helpful_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ein User kann ein Produkt nur einmal bewerten
  UNIQUE(user_id, product_id)
);

-- Indexes
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- RLS Policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Users can create reviews for purchased products"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);
```

---

### 8. notifications

Benachrichtigungssystem.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  type TEXT NOT NULL CHECK (type IN (
    'order_confirmed', 'order_shipped', 'order_delivered',
    'new_message', 'new_review', 'price_drop', 'back_in_stock',
    'event_reminder', 'seller_update', 'admin_message'
  )),

  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}', -- Zusätzliche Daten (product_id, order_id, etc.)

  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 🔐 Row Level Security (RLS)

Alle Tabellen haben RLS aktiviert mit folgenden Prinzipien:

1. **Public Read**: Products, Reviews sind öffentlich lesbar
2. **Owner Write**: Users können nur ihre eigenen Daten bearbeiten
3. **Admin Override**: Admins haben vollen Zugriff
4. **Seller Access**: Sellers können ihre Produkte und Orders verwalten

---

## 📊 Views (Optional)

### Product Statistics View

```sql
CREATE VIEW product_stats AS
SELECT
  p.id,
  p.title,
  p.type,
  COUNT(DISTINCT r.id) as review_count,
  AVG(r.rating) as average_rating,
  COUNT(DISTINCT oi.id) as total_sales,
  SUM(oi.quantity) as units_sold,
  SUM(oi.total_price) as total_revenue
FROM products p
LEFT JOIN reviews r ON r.product_id = p.id
LEFT JOIN order_items oi ON oi.product_id = p.id
LEFT JOIN orders o ON o.id = oi.order_id AND o.status = 'delivered'
GROUP BY p.id, p.title, p.type;
```

---

## 🚀 Setup Instructions

### 1. Supabase Projekt erstellen

```bash
# Besuche https://supabase.com/dashboard
# Erstelle neues Projekt
# Kopiere Project URL und API Keys
```

### 2. Schema in Supabase ausführen

1. Öffne Supabase Dashboard → SQL Editor
2. Erstelle neues Query
3. Kopiere SQL von oben (Tabelle für Tabelle)
4. Führe aus

### 3. Environment Variables setzen

```bash
# In .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### 4. Test-Daten einfügen (Optional)

```sql
-- Test User erstellen
INSERT INTO users (email, name, role, password_hash)
VALUES ('test@mytruekarma.com', 'Test User', 'user', '$2a$10$...');

-- Test Produkte erstellen
INSERT INTO products (seller_id, type, title, description, price, category)
VALUES
  ((SELECT id FROM users LIMIT 1), 'product', 'Test Produkt', 'Beschreibung', 29.99, 'Mode'),
  ((SELECT id FROM users LIMIT 1), 'service', 'Webdesign', 'Professional Service', 89.00, 'IT & Tech');
```

---

## 📝 Nächste Schritte

1. ✅ Schema in Supabase ausführen
2. ⏳ Migration Script erstellen (`lib/migrate-to-supabase.ts`)
3. ⏳ ProductStore auf Supabase umstellen
4. ⏳ Auth Flow testen
5. ⏳ RLS Policies testen
6. ⏳ Performance optimieren (Indexes, Caching)

---

## 🔗 Ressourcen

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
