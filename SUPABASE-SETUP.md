# 🚀 Supabase & NextAuth.js Setup Guide

Diese Anleitung führt dich durch die vollständige Einrichtung von Supabase (Backend) und NextAuth.js (Authentication) für MyTrueKarma.

---

## ✅ Was wurde bereits installiert

```bash
✅ @supabase/supabase-js    # Supabase JavaScript Client
✅ @supabase/ssr            # Server-Side Rendering Support
✅ next-auth                # Authentication für Next.js
✅ @auth/core               # Auth Core Library
✅ bcryptjs                 # Password Hashing
```

---

## 📋 Schritt-für-Schritt Setup

### 1️⃣ Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf **"New Project"**
3. Wähle:
   - **Organization**: Erstelle eine neue oder wähle existierende
   - **Project Name**: `mytruekarma` (oder eigener Name)
   - **Database Password**: Starkes Passwort generieren (speichern!)
   - **Region**: `Central EU (Frankfurt)` (am nächsten zu Deutschland)
4. Klicke **"Create new project"** (dauert ~2 Minuten)

---

### 2️⃣ Supabase Credentials holen

1. In deinem Supabase Dashboard → **Settings** → **API**
2. Kopiere folgende Werte:

```
Project URL:           https://xxxxx.supabase.co
anon/public key:       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key:      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 3️⃣ Environment Variables konfigurieren

Öffne `.env.local` und füge deine Supabase Credentials ein:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dein-generiertes-secret

# Development
NODE_ENV=development
```

**NextAuth Secret generieren:**

```bash
# PowerShell (Windows)
$bytes = New-Object byte[] 32; (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)

# Oder Online Generator nutzen: https://generate-secret.vercel.app/32
```

---

### 4️⃣ Datenbank Schema erstellen

1. Öffne Supabase Dashboard → **SQL Editor**
2. Erstelle neues Query: **"New query"**
3. Öffne `SUPABASE-SCHEMA.md` in diesem Projekt
4. Kopiere die SQL Statements **Schritt für Schritt**:

#### a) Users Tabelle

```sql
-- Kopiere die CREATE TABLE users ... aus SUPABASE-SCHEMA.md
-- Führe aus (Play Button oder Ctrl+Enter)
```

#### b) Products Tabelle

```sql
-- Kopiere die CREATE TABLE products ... aus SUPABASE-SCHEMA.md
-- Führe aus
```

#### c) Alle anderen Tabellen (Orders, Cart, Wishlist, Reviews, etc.)

```sql
-- Kopiere nacheinander alle CREATE TABLE Statements
-- Führe jede einzeln aus
```

**Wichtig**: Führe jede Tabelle einzeln aus, um Fehler zu erkennen!

---

### 5️⃣ Row Level Security (RLS) aktivieren

Nach dem Erstellen aller Tabellen:

1. Im SQL Editor, kopiere alle **RLS Policies** aus `SUPABASE-SCHEMA.md`
2. Führe sie aus:

```sql
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view their own profile" ...
-- etc.
```

---

### 6️⃣ Test-Daten einfügen (Optional)

Um die App sofort testen zu können:

```sql
-- Test User erstellen
INSERT INTO users (email, name, role, password_hash, is_verified)
VALUES (
  'test@mytruekarma.com',
  'Test User',
  'user',
  '$2a$10$YourHashedPasswordHere', -- Verwende bcrypt Hash
  true
);

-- Test Produkt erstellen
INSERT INTO products (
  seller_id,
  type,
  title,
  description,
  price,
  category,
  stock,
  images
) VALUES (
  (SELECT id FROM users WHERE email = 'test@mytruekarma.com' LIMIT 1),
  'product',
  'Bio-Baumwolle T-Shirt',
  'Nachhaltiges T-Shirt aus 100% Bio-Baumwolle',
  29.99,
  'Mode',
  50,
  '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"]'::jsonb
);
```

**Passwort Hash generieren:**

```javascript
// In Browser Console oder Node.js
const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("test123", 10);
console.log(hash); // Kopiere diesen Hash
```

---

### 7️⃣ Google OAuth (Optional)

Wenn du Google Login willst:

#### a) Google Cloud Console Setup

1. Gehe zu [console.cloud.google.com](https://console.cloud.google.com)
2. Erstelle neues Projekt
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Kopiere **Client ID** und **Client Secret**

#### b) In .env.local einfügen

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

### 8️⃣ App neu starten

```bash
npm run dev
# oder
pnpm dev
```

---

## 🧪 Testing

### Authentication testen

1. Öffne [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Logge dich mit Test-User ein:
   - Email: `test@mytruekarma.com`
   - Passwort: `test123`
3. Du solltest zu `/dashboard` weitergeleitet werden

### Protected Routes testen

- ✅ `/dashboard` - Nur für eingeloggte User
- ✅ `/admin` - Nur für Admins
- ✅ `/seller/dashboard` - Nur für Sellers
- ❌ `/auth/login` - Nicht für eingeloggte User (redirect zu Dashboard)

### API Routes testen

```bash
# Login
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@mytruekarma.com","password":"test123"}'
```

---

## 📊 Datenbank verwalten

### Supabase Studio (empfohlen)

1. Supabase Dashboard → **Table Editor**
2. Zeige alle Tabellen an
3. Bearbeite Daten direkt im Browser
4. Filter, Sort, Search verfügbar

### SQL Queries ausführen

1. Supabase Dashboard → **SQL Editor**
2. Schreibe Custom Queries:

```sql
-- Alle Produkte anzeigen
SELECT * FROM products;

-- Alle Users mit ihren Produkten
SELECT u.name, COUNT(p.id) as product_count
FROM users u
LEFT JOIN products p ON p.seller_id = u.id
GROUP BY u.id, u.name;

-- Durchschnittliche Bewertung pro Produkt
SELECT p.title, AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN reviews r ON r.product_id = p.id
GROUP BY p.id, p.title;
```

---

## 🔄 Migration von localStorage zu Supabase

Aktuell nutzt die App noch `localStorage` für Produkte. Um auf Supabase umzustellen:

### Nächste Schritte

1. **ProductStore migrieren**:

   ```typescript
   // lib/products-store.ts → lib/products-supabase.ts
   // Ersetze localStorage Calls mit Supabase Queries
   ```

2. **useProducts Hook erweitern**:

   ```typescript
   // hooks/use-products.ts
   // Nutze createClient() statt localStorage
   const supabase = createClient();
   const { data: products } = await supabase
     .from("products")
     .select("*")
     .eq("type", "product");
   ```

3. **Admin Interface verbinden**:

   ```typescript
   // app/admin/products/new/page.tsx
   // INSERT INTO products statt localStorage
   ```

4. **Real-time Updates**:
   ```typescript
   // Supabase Real-time für Live-Updates
   supabase
     .channel("products")
     .on(
       "postgres_changes",
       {
         event: "*",
         schema: "public",
         table: "products",
       },
       handleChanges
     )
     .subscribe();
   ```

---

## 🐛 Troubleshooting

### Problem: "Project URL undefined"

**Lösung**: Environment Variables werden nicht geladen

```bash
# Prüfe ob .env.local existiert
dir .env.local

# Restart Dev Server
npm run dev
```

---

### Problem: "RLS Policy denied"

**Lösung**: Row Level Security blockiert Zugriff

```sql
-- Temporär RLS deaktivieren zum Testen
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Oder Policy anpassen
DROP POLICY "existing_policy" ON products;
CREATE POLICY "new_policy" ON products FOR SELECT USING (true);
```

---

### Problem: "Auth session not found"

**Lösung**: NextAuth Session abgelaufen

```bash
# Cookies löschen
# In Browser: DevTools → Application → Cookies → localhost → Delete all

# Neu einloggen
```

---

### Problem: "Google OAuth redirect_uri_mismatch"

**Lösung**: Redirect URI nicht korrekt konfiguriert

```
Google Cloud Console → Credentials → OAuth 2.0 Client
Authorized redirect URIs:
✅ http://localhost:3000/api/auth/callback/google
✅ https://yourdomain.com/api/auth/callback/google
```

---

## 📚 Weitere Ressourcen

- [Supabase Dokumentation](https://supabase.com/docs)
- [NextAuth.js Dokumentation](https://next-auth.js.org)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

---

## ✅ Checkliste

- [ ] Supabase Projekt erstellt
- [ ] Credentials in `.env.local` eingetragen
- [ ] `NEXTAUTH_SECRET` generiert
- [ ] Alle Tabellen erstellt (8 Haupt-Tabellen)
- [ ] RLS Policies aktiviert
- [ ] Test-Daten eingefügt
- [ ] App gestartet und Login getestet
- [ ] Google OAuth konfiguriert (optional)
- [ ] Protected Routes funktionieren
- [ ] Datenbank Zugriff funktioniert

**Status**: Grundsetup vollständig! Bereit für Migration von localStorage → Supabase.

---

Bei Fragen oder Problemen: Öffne ein Issue im Repository! 🚀
