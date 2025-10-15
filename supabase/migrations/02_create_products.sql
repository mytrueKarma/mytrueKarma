-- ============================================
-- SCHRITT 2: Products Tabelle
-- ============================================
-- Zentrale Tabelle für alle 4 Produkttypen: product, event, immobilie, service

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
  images JSONB DEFAULT '[]',
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
  property_type TEXT,
  property_size DECIMAL(10,2),
  rooms INTEGER,
  bathrooms INTEGER,
  year_built INTEGER,
  is_furnished BOOLEAN,
  
  -- Service-specific
  service_provider TEXT,
  hourly_rate DECIMAL(10,2),
  is_verified BOOLEAN DEFAULT false,
  skills JSONB DEFAULT '[]',
  
  -- Social Impact
  social_impact TEXT,
  impact_category TEXT,
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

-- Full-text Search Index
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('german', title || ' ' || COALESCE(description, '')));

-- Row Level Security
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
