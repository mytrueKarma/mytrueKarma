import { useState, useEffect } from "react";
import { Product, ProductStore } from "@/lib/products-store";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Produkte beim Mount laden
  useEffect(() => {
    ProductStore.initialize();
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    const allProducts = ProductStore.getAll();
    setProducts(allProducts);
    setIsLoading(false);
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = ProductStore.add(product);
    loadProducts(); // Neu laden
    return newProduct;
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const updated = ProductStore.update(id, updates);
    if (updated) {
      loadProducts(); // Neu laden
    }
    return updated;
  };

  const deleteProduct = (id: number) => {
    const success = ProductStore.delete(id);
    if (success) {
      loadProducts(); // Neu laden
    }
    return success;
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  const getProductsByType = (type: "product" | "event" | "immobilie") => {
    return products.filter((p) => p.type === type);
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsByType,
    refresh: loadProducts,
  };
}
