"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Download,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-15",
    status: "delivered",
    total: 67.98,
    items: [
      {
        id: 1,
        name: "mytrueKarma Men's T-Shirt",
        price: 39.0,
        quantity: 1,
        image: "/mytruekarma-men-s-t-shirt-lifestyle.jpg",
      },
      {
        id: 2,
        name: "Premium Coffee Mug",
        price: 19.99,
        quantity: 1,
        image: "/premium-coffee-mug-mytruekarma.jpg",
      },
    ],
    tracking: "DHL123456789",
    deliveryAddress: "Musterstraße 123, 12345 Berlin",
    socialImpact: "33.99€ für Eden Reforestation Projects gespendet",
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-12",
    status: "shipped",
    total: 45.99,
    items: [
      {
        id: 3,
        name: "mytrueKarma Women's T-Shirt",
        price: 27.99,
        quantity: 1,
        image: "/mytruekarma-women-s-t-shirt-lifestyle.jpg",
      },
      {
        id: 4,
        name: "Wooden Phone Stand",
        price: 18.0,
        quantity: 1,
        image: "/wooden-phone-stand.jpg",
      },
    ],
    tracking: "DHL987654321",
    deliveryAddress: "Hauptstraße 456, 10115 Berlin",
    socialImpact: "22.99€ für Ukraine-Hilfe gespendet",
  },
  {
    id: "ORD-2024-003",
    date: "2024-03-10",
    status: "processing",
    total: 32.99,
    items: [
      {
        id: 5,
        name: "Handmade Ceramic Vase",
        price: 32.99,
        quantity: 1,
        image: "/ceramic-vase.png",
      },
    ],
    tracking: null,
    deliveryAddress: "Berliner Straße 789, 50667 Köln",
    socialImpact: "16.49€ wird für soziale Projekte gespendet",
  },
  {
    id: "ORD-2024-004",
    date: "2024-03-08",
    status: "cancelled",
    total: 24.99,
    items: [
      {
        id: 6,
        name: "Ergonomic Office Chair",
        price: 24.99,
        quantity: 1,
        image: "/ergonomic-office-chair.png",
      },
    ],
    tracking: null,
    deliveryAddress: "Kölner Weg 321, 80331 München",
    socialImpact: "Spende aufgrund Stornierung nicht erfolgt",
  },
];

const statusConfig = {
  processing: {
    label: "In Bearbeitung",
    color: "bg-blue-100 text-blue-800",
    icon: Clock,
  },
  shipped: {
    label: "Versandt",
    color: "bg-orange-100 text-orange-800",
    icon: Truck,
  },
  delivered: {
    label: "Zugestellt",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Storniert",
    color: "bg-red-100 text-red-800",
    icon: RefreshCw,
  },
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    const IconComponent =
      statusConfig[status as keyof typeof statusConfig]?.icon || Package;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meine Bestellungen</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Bestellungen und verfolgen Sie den Status
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Bestellung oder Produkt suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="processing">In Bearbeitung</SelectItem>
              <SelectItem value="shipped">Versandt</SelectItem>
              <SelectItem value="delivered">Zugestellt</SelectItem>
              <SelectItem value="cancelled">Storniert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Bestellung {order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Bestellt am{" "}
                        {new Date(order.date).toLocaleDateString("de-DE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ]?.color
                        }
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {
                            statusConfig[
                              order.status as keyof typeof statusConfig
                            ]?.label
                          }
                        </span>
                      </Badge>
                      <div className="text-right">
                        <div className="font-semibold">
                          €{order.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} Artikel
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Items Preview */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity}x €{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        +{order.items.length - 3} weitere Artikel
                      </div>
                    )}
                  </div>

                  {/* Social Impact */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Sozialer Impact
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      {order.socialImpact}
                    </p>
                  </div>

                  {/* Tracking */}
                  {order.tracking && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Sendungsverfolgung
                          </p>
                          <p className="text-sm text-blue-700">
                            Tracking-Nummer: {order.tracking}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Truck className="h-4 w-4 mr-2" />
                          Verfolgen
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {expandedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-3">Lieferadresse</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {order.deliveryAddress}
                      </p>

                      <h4 className="font-semibold mb-3">Alle Artikel</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Menge: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">€{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.id ? null : order.id
                      )
                    }
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {expandedOrder === order.id ? "Weniger" : "Details"}
                  </Button>

                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Rechnung
                  </Button>

                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Erneut bestellen
                    </Button>
                  )}

                  {order.status === "processing" && (
                    <Button variant="destructive" size="sm">
                      Stornieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">
              Keine Bestellungen gefunden
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Versuchen Sie andere Suchkriterien oder Filter."
                : "Sie haben noch keine Bestellungen aufgegeben."}
            </p>
            <Button asChild>
              <Link href="/shop">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Jetzt einkaufen
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
