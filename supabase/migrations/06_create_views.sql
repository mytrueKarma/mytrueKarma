-- ============================================
-- SCHRITT 6: Helper View (Optional)
-- ============================================
-- Diese View zeigt Produkt-Statistiken

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
