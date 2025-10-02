"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Search,
  Eye,
  MessageSquare,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package2,
  FileText,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Anna Schmidt",
    customerEmail: "anna.schmidt@email.com",
    customerPhone: "+49 30 12345678",
    products: [
      {
        id: 1,
        name: "Handmade Ceramic Vase",
        image: "/ceramic-vase.png",
        quantity: 1,
        price: 45.99,
        sku: "VAZ-001-CER",
        description: "Handgefertigte Keramikvase aus nachhaltigen Materialien",
      },
    ],
    total: 45.99,
    subtotal: 45.99,
    shipping: 4.99,
    tax: 8.74,
    status: "pending",
    orderDate: "2024-01-20",
    shippingAddress: {
      name: "Anna Schmidt",
      street: "Musterstraße 123",
      city: "10115 Berlin",
      country: "Deutschland",
    },
    billingAddress: {
      name: "Anna Schmidt",
      street: "Musterstraße 123",
      city: "10115 Berlin",
      country: "Deutschland",
    },
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    trackingNumber: null,
    notes: "Bitte vorsichtig handhaben - zerbrechlich",
    statusHistory: [
      {
        status: "pending",
        date: "2024-01-20T10:00:00Z",
        note: "Bestellung erhalten",
      },
    ],
  },
  {
    id: "ORD-002",
    customerName: "Max Müller",
    customerEmail: "max.mueller@email.com",
    customerPhone: "+49 40 98765432",
    products: [
      {
        id: 2,
        name: "Organic Cotton T-Shirt",
        image: "/organic-cotton-shirt.jpg",
        quantity: 2,
        price: 29.99,
        sku: "TSH-002-ORG",
        description: "Bio-Baumwolle T-Shirt in verschiedenen Größen",
      },
    ],
    total: 64.97,
    subtotal: 59.98,
    shipping: 4.99,
    tax: 11.4,
    status: "shipped",
    orderDate: "2024-01-18",
    shippingAddress: {
      name: "Max Müller",
      street: "Hauptstraße 456",
      city: "20095 Hamburg",
      country: "Deutschland",
    },
    billingAddress: {
      name: "Max Müller",
      street: "Hauptstraße 456",
      city: "20095 Hamburg",
      country: "Deutschland",
    },
    paymentMethod: "Kreditkarte",
    paymentStatus: "paid",
    trackingNumber: "DHL123456789",
    notes: "Größe L gewünscht",
    statusHistory: [
      {
        status: "pending",
        date: "2024-01-18T10:00:00Z",
        note: "Bestellung erhalten",
      },
      {
        status: "processing",
        date: "2024-01-18T14:30:00Z",
        note: "Bestellung wird bearbeitet",
      },
      {
        status: "shipped",
        date: "2024-01-19T09:15:00Z",
        note: "Paket versendet mit DHL",
      },
    ],
  },
  {
    id: "ORD-003",
    customerName: "Lisa Weber",
    customerEmail: "lisa.weber@email.com",
    customerPhone: "+49 89 11223344",
    products: [
      {
        id: 3,
        name: "Wooden Phone Stand",
        image: "/wooden-phone-stand.jpg",
        quantity: 1,
        price: 19.99,
        sku: "WPS-003-OAK",
        description: "Handgefertigter Handy-Ständer aus Eichenholz",
      },
    ],
    total: 24.98,
    subtotal: 19.99,
    shipping: 4.99,
    tax: 3.8,
    status: "delivered",
    orderDate: "2024-01-15",
    shippingAddress: {
      name: "Lisa Weber",
      street: "Gartenstraße 789",
      city: "80331 München",
      country: "Deutschland",
    },
    billingAddress: {
      name: "Lisa Weber",
      street: "Gartenstraße 789",
      city: "80331 München",
      country: "Deutschland",
    },
    paymentMethod: "Überweisung",
    paymentStatus: "paid",
    trackingNumber: "DHL987654321",
    notes: "",
    statusHistory: [
      {
        status: "pending",
        date: "2024-01-15T10:00:00Z",
        note: "Bestellung erhalten",
      },
      {
        status: "processing",
        date: "2024-01-15T16:45:00Z",
        note: "Bestellung wird bearbeitet",
      },
      {
        status: "shipped",
        date: "2024-01-16T08:20:00Z",
        note: "Paket versendet",
      },
      {
        status: "delivered",
        date: "2024-01-17T11:30:00Z",
        note: "Erfolgreich zugestellt",
      },
    ],
  },
];

const statusConfig = {
  pending: { label: "Ausstehend", color: "bg-yellow-600", icon: Clock },
  processing: { label: "In Bearbeitung", color: "bg-blue-600", icon: Package },
  shipped: { label: "Versendet", color: "bg-purple-600", icon: Truck },
  delivered: { label: "Zugestellt", color: "bg-green-600", icon: CheckCircle },
  cancelled: { label: "Storniert", color: "bg-red-600", icon: AlertCircle },
};

export default function SellerOrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    setIsVisible(true);
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    processing: mockOrders.filter((o) => o.status === "processing").length,
    shipped: mockOrders.filter((o) => o.status === "shipped").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // Mock status update - replace with actual API call
    console.log(`Updating order ${orderId} to status ${newStatus}`);
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setTrackingNumber(order.trackingNumber || "");
    setInternalNotes(order.notes || "");
    setIsDetailModalOpen(true);
  };

  const updateTrackingNumber = () => {
    if (selectedOrder) {
      // Mock update - replace with actual API call
      console.log(
        `Updating tracking number for order ${selectedOrder.id}: ${trackingNumber}`
      );
      // Update the order in the mock data
      selectedOrder.trackingNumber = trackingNumber;
    }
  };

  const saveNotes = () => {
    if (selectedOrder) {
      // Mock update - replace with actual API call
      console.log(
        `Saving notes for order ${selectedOrder.id}: ${internalNotes}`
      );
      selectedOrder.notes = internalNotes;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div
        className={`transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bestellungen</h1>
            <p className="text-muted-foreground">
              Verwalten Sie Ihre Kundenbestellungen
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{ordersByStatus.all}</div>
              <div className="text-sm text-muted-foreground">Gesamt</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {ordersByStatus.pending}
              </div>
              <div className="text-sm text-muted-foreground">Ausstehend</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {ordersByStatus.processing}
              </div>
              <div className="text-sm text-muted-foreground">Bearbeitung</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {ordersByStatus.shipped}
              </div>
              <div className="text-sm text-muted-foreground">Versendet</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {ordersByStatus.delivered}
              </div>
              <div className="text-sm text-muted-foreground">Zugestellt</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {ordersByStatus.cancelled}
              </div>
              <div className="text-sm text-muted-foreground">Storniert</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Bestellungen suchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="pending">Ausstehend</SelectItem>
                  <SelectItem value="processing">In Bearbeitung</SelectItem>
                  <SelectItem value="shipped">Versendet</SelectItem>
                  <SelectItem value="delivered">Zugestellt</SelectItem>
                  <SelectItem value="cancelled">Storniert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order, index) => {
          const StatusIcon =
            statusConfig[order.status as keyof typeof statusConfig].icon;
          return (
            <Card
              key={order.id}
              className={`hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Bestellung {order.id}
                      <Badge
                        className={
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].color
                        }
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].label
                        }
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {order.customerName} •{" "}
                      {new Date(order.orderDate).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      €{order.total.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.paymentMethod}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Menge: {product.quantity} • €
                          {product.price.toFixed(2)} pro Stück
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          €{(product.quantity * product.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Lieferadresse</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}
                    <br />
                    {order.shippingAddress.country}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm text-blue-600 mt-2">
                      Sendungsnummer: {order.trackingNumber}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openOrderDetails(order)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Kunde kontaktieren
                  </Button>

                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStatusUpdate(order.id, "processing")}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Bearbeiten
                    </Button>
                  )}

                  {order.status === "processing" && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleStatusUpdate(order.id, "shipped")}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Als versendet markieren
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Keine Bestellungen gefunden
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Versuchen Sie, Ihre Filter zu ändern."
                : "Sie haben noch keine Bestellungen erhalten."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Order Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Bestelldetails - {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Kundeninformationen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Bestellinformationen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">
                        Bestelldatum
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedOrder.orderDate).toLocaleDateString(
                          "de-DE",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <Badge
                          className={
                            statusConfig[
                              selectedOrder.status as keyof typeof statusConfig
                            ].color
                          }
                        >
                          {
                            statusConfig[
                              selectedOrder.status as keyof typeof statusConfig
                            ].label
                          }
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Zahlungsstatus
                      </Label>
                      <p className="text-sm text-green-600 font-medium capitalize">
                        {selectedOrder.paymentStatus}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Bestellte Produkte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.products.map((product: any) => (
                      <div
                        key={product.id}
                        className="flex items-start gap-4 p-4 border rounded-lg"
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                          <div className="flex gap-4 text-sm">
                            <span>
                              SKU:{" "}
                              <span className="font-mono">{product.sku}</span>
                            </span>
                            <span>Menge: {product.quantity}</span>
                            <span>Preis: €{product.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            €{(product.quantity * product.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zwischensumme:</span>
                      <span>€{selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Versand:</span>
                      <span>€{selectedOrder.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MwSt. (19%):</span>
                      <span>€{selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Gesamtsumme:</span>
                      <span>€{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Lieferadresse
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {selectedOrder.shippingAddress.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.shippingAddress.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.shippingAddress.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.shippingAddress.country}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Rechnungsadresse
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {selectedOrder.billingAddress.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.billingAddress.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.billingAddress.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.billingAddress.country}
                      </p>
                    </div>
                    <Separator className="my-3" />
                    <div>
                      <Label className="text-sm font-medium">
                        Zahlungsmethode
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tracking & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Sendungsverfolgung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tracking">Sendungsnummer</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="tracking"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="DHL123456789"
                        />
                        <Button onClick={updateTrackingNumber} size="sm">
                          Speichern
                        </Button>
                      </div>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm">
                          Aktuelle Sendungsnummer:
                          <span className="font-mono ml-2 font-semibold">
                            {selectedOrder.trackingNumber}
                          </span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Notizen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="notes">Interne Notizen</Label>
                      <Textarea
                        id="notes"
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        placeholder="Notizen zur Bestellung..."
                        className="mt-1"
                        rows={3}
                      />
                      <Button onClick={saveNotes} size="sm" className="mt-2">
                        Notizen speichern
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Status-Verlauf
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.statusHistory.map(
                      (entry: any, index: number) => {
                        const StatusIcon =
                          statusConfig[
                            entry.status as keyof typeof statusConfig
                          ]?.icon || Clock;
                        return (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                              <StatusIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {statusConfig[
                                    entry.status as keyof typeof statusConfig
                                  ]?.label || entry.status}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(entry.date).toLocaleDateString(
                                    "de-DE",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </div>
                              {entry.note && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {entry.note}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Kunde kontaktieren
                </Button>

                {selectedOrder.status === "pending" && (
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      handleStatusUpdate(selectedOrder.id, "processing");
                      setIsDetailModalOpen(false);
                    }}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Bearbeitung starten
                  </Button>
                )}

                {selectedOrder.status === "processing" && (
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      handleStatusUpdate(selectedOrder.id, "shipped");
                      setIsDetailModalOpen(false);
                    }}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Als versendet markieren
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
