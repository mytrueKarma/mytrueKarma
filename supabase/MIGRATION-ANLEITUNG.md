# 🎯 SQL Migration Anleitung - Schritt für Schritt

## 📍 Wo du bist

Du hast Supabase eingerichtet und die Environment Variables sind fertig. Jetzt erstellen wir die Datenbank-Tabellen.

## 🚀 So gehst du vor

### Vorbereitung

1. Öffne: **https://supabase.com/dashboard/project/vysagqppronihfnupevk/editor**
2. Klicke links auf **"SQL Editor"** (Icon: `</>`)
3. Halte dieses Fenster offen

### Schritt-für-Schritt Ausführung

---

## 📝 SCHRITT 1: Users Tabelle

1. Im SQL Editor: Klicke **"+ New query"**
2. Öffne die Datei: `supabase/migrations/01_create_users.sql`
3. **Kopiere den gesamten Inhalt** (Strg+A, Strg+C)
4. **Füge in SQL Editor ein** (Strg+V)
5. Klicke **"Run"** (oder Strg+Enter)
6. ✅ Du solltest sehen: **"Success. No rows returned"**

**Was wurde erstellt:**

- ✅ `users` Tabelle
- ✅ 3 Indexes (email, role, created_at)
- ✅ Row Level Security aktiviert
- ✅ 3 RLS Policies

---

## 📝 SCHRITT 2: Products Tabelle

1. Klicke erneut **"+ New query"** (neues Query-Fenster)
2. Öffne: `supabase/migrations/02_create_products.sql`
3. Kopiere den gesamten Inhalt
4. Füge in SQL Editor ein
5. Klicke **"Run"**
6. ✅ **"Success. No rows returned"**

**Was wurde erstellt:**

- ✅ `products` Tabelle (mit 4 Typen: product, event, immobilie, service)
- ✅ 8 Indexes (type, category, seller, location, etc.)
- ✅ Full-text Search Index für deutsche Texte
- ✅ Row Level Security + 3 Policies

---

## 📝 SCHRITT 3: Orders & Order Items

1. **"+ New query"**
2. Öffne: `supabase/migrations/03_create_orders.sql`
3. Kopiere & Einfügen
4. **"Run"**
5. ✅ **"Success. No rows returned"**

**Was wurde erstellt:**

- ✅ `orders` Tabelle (Bestellungen)
- ✅ `order_items` Tabelle (Line Items)
- ✅ Indexes für beide Tabellen
- ✅ RLS Policies (Users sehen nur eigene Orders)

---

## 📝 SCHRITT 4: Cart & Wishlist

1. **"+ New query"**
2. Öffne: `supabase/migrations/04_create_cart_wishlist.sql`
3. Kopiere & Einfügen
4. **"Run"**
5. ✅ **"Success. No rows returned"**

**Was wurde erstellt:**

- ✅ `cart` Tabelle (Warenkorb)
- ✅ `wishlist` Tabelle (Wunschliste)
- ✅ Indexes
- ✅ RLS Policies

---

## 📝 SCHRITT 5: Reviews & Notifications

1. **"+ New query"**
2. Öffne: `supabase/migrations/05_create_reviews_notifications.sql`
3. Kopiere & Einfügen
4. **"Run"**
5. ✅ **"Success. No rows returned"**

**Was wurde erstellt:**

- ✅ `reviews` Tabelle (Bewertungen)
- ✅ `notifications` Tabelle (Benachrichtigungen)
- ✅ Indexes
- ✅ RLS Policies

---

## 📝 SCHRITT 6: Helper View (Optional)

1. **"+ New query"**
2. Öffne: `supabase/migrations/06_create_views.sql`
3. Kopiere & Einfügen
4. **"Run"**
5. ✅ **"Success. No rows returned"**

**Was wurde erstellt:**

- ✅ `product_stats` View (Produkt-Statistiken)

---

## ✅ Überprüfung

### Prüfe ob alles funktioniert hat:

1. Gehe zu: **Table Editor** (links in Supabase)
2. Du solltest jetzt sehen:

   ```
   📊 Tables:
   - users
   - products
   - orders
   - order_items
   - cart
   - wishlist
   - reviews
   - notifications

   📈 Views:
   - product_stats
   ```

3. Klicke auf `users` → Du siehst die Spalten
4. Klicke auf `products` → Du siehst alle Felder

---

## 🐛 Fehlerbehandlung

### Fehler: "relation already exists"

**Ursache**: Tabelle wurde bereits erstellt  
**Lösung**: Überspringe diesen Schritt oder lösche die Tabelle zuerst:

```sql
DROP TABLE IF EXISTS tablename CASCADE;
```

### Fehler: "column does not exist"

**Ursache**: Tippfehler im SQL  
**Lösung**: Kopiere das SQL erneut aus der Datei

### Fehler: "permission denied"

**Ursache**: RLS blockiert Zugriff  
**Lösung**: Das ist normal! RLS schützt die Daten. Alles gut! ✅

---

## 🎉 Geschafft!

Wenn alle 6 Schritte durchlaufen sind:

✅ Datenbank ist komplett eingerichtet  
✅ 8 Tabellen + 1 View erstellt  
✅ Row Level Security aktiv  
✅ Alle Policies konfiguriert  
✅ Bereit für die App! 🚀

---

## 🔄 Nächster Schritt

Jetzt kannst du die App starten und testen:

```bash
npm run dev
```

Die Supabase Integration ist bereit! Zeit für die Migration von localStorage → Supabase! 💚
