"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductStore } from "@/lib/products-store";
import { useProducts } from "@/hooks/use-products";
import { RefreshCw, Trash2, Database, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DebugProductsPage() {
  const { products, refresh } = useProducts();
  const { toast } = useToast();
  const [storageSize, setStorageSize] = useState("0");

  useEffect(() => {
    updateStorageInfo();
  }, [products]);

  const updateStorageInfo = () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("mytruekarma_products");
      const size = data ? (new Blob([data]).size / 1024).toFixed(2) : "0";
      setStorageSize(size);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Alle Produkte zurücksetzen? Dies löscht auch alle neu hinzugefügten Produkte!"
      )
    ) {
      ProductStore.reset();
      refresh();
      toast({
        title: "Zurückgesetzt!",
        description:
          "Alle Produkte wurden auf die Standard-Werte zurückgesetzt.",
      });
      updateStorageInfo();
    }
  };

  const handleClear = () => {
    if (
      confirm(
        "Alle Produkte löschen? Dies kann nicht rückgängig gemacht werden!"
      )
    ) {
      ProductStore.clear();
      refresh();
      toast({
        title: "Gelöscht!",
        description: "Alle Produkte wurden gelöscht.",
        variant: "destructive",
      });
      updateStorageInfo();
    }
  };

  const handleReinitialize = () => {
    ProductStore.initialize();
    refresh();
    toast({
      title: "Neu initialisiert!",
      description: "Fehlende Default-Produkte wurden hinzugefügt.",
    });
    updateStorageInfo();
  };

  const productsByType = {
    product: products.filter((p) => p.type === "product"),
    event: products.filter((p) => p.type === "event"),
    immobilie: products.filter((p) => p.type === "immobilie"),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Produkt-Verwaltung Debug</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Produkte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Normale Produkte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productsByType.product.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Standard: 6</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productsByType.event.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Standard: 8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Immobilien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productsByType.immobilie.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Standard: 6</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Storage Informationen</CardTitle>
          <CardDescription>Aktuelle localStorage Nutzung</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              Größe: <strong>{storageSize} KB</strong>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Aktionen</CardTitle>
          <CardDescription>Produkt-Datenbank verwalten</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleReinitialize}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Neu initialisieren
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Auf Standard zurücksetzen
            </Button>
            <Button
              onClick={handleClear}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Alle löschen
            </Button>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Neu initialisieren:</strong> Fügt fehlende
              Default-Produkte hinzu, ohne bestehende zu löschen
            </p>
            <p>
              <strong>Zurücksetzen:</strong> Löscht ALLE Produkte und stellt nur
              die 20 Standard-Produkte wieder her
            </p>
            <p>
              <strong>Alle löschen:</strong> Entfernt alle Produkte aus dem
              localStorage
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Produkt-Übersicht</CardTitle>
          <CardDescription>Alle aktuell gespeicherten Produkte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Normale Produkte */}
            {productsByType.product.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Normale Produkte
                  <Badge variant="secondary">
                    {productsByType.product.length}
                  </Badge>
                </h3>
                <div className="grid gap-2">
                  {productsByType.product.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">
                          #{product.id}
                        </span>
                        <span className="text-sm">{product.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold">
                        €{product.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {productsByType.event.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Events
                  <Badge variant="secondary">
                    {productsByType.event.length}
                  </Badge>
                </h3>
                <div className="grid gap-2">
                  {productsByType.event.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">
                          #{product.id}
                        </span>
                        <span className="text-sm">{product.name}</span>
                        <Badge
                          variant="outline"
                          className="text-xs bg-purple-50"
                        >
                          {product.date}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold">
                        {product.price === 0
                          ? "Kostenlos"
                          : `€${product.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Immobilien */}
            {productsByType.immobilie.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Immobilien
                  <Badge variant="secondary">
                    {productsByType.immobilie.length}
                  </Badge>
                </h3>
                <div className="grid gap-2">
                  {productsByType.immobilie.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">
                          #{product.id}
                        </span>
                        <span className="text-sm">{product.name}</span>
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          {product.location}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold">
                        €{product.price.toLocaleString()}
                        {product.priceType && `/${product.priceType}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
