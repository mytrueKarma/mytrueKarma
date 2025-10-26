import { NextResponse } from "next/server";

export async function GET() {
  // Dummy transactions
  const transactions = [
    {
      id: "tx_10001",
      year: 2024,
      productName: "Good Vibes Only T-Shirt by myKarma",
      productId: "1",
      image: "/mytruekarma-men-s-t-shirt-detail-view.jpg",
      revenue: 1.9,
      donation: { amount: 0.5, organization: "Clean Water Foundation" },
      customerId: "anon_23",
      consentToDisplay: true,
    },
    {
      id: "tx_10002",
      year: 2024,
      productName: "Planet Whale Crossbody Bag",
      productId: "3",
      image: "/wooden-phone-stand.jpg",
      revenue: 2.5,
      donation: { amount: 1.0, organization: "Ocean Protection Alliance" },
      customerId: "anon_42",
      consentToDisplay: false,
    },
    {
      id: "tx_10003",
      year: 2023,
      productName: "Hamza Hand Hoodie",
      productId: "5",
      image: "/mytruekarma-women-s-t-shirt-detail-view.jpg",
      revenue: 3.2,
      donation: { amount: 1.6, organization: "Children's Education Fund" },
      customerId: "user_17",
      consentToDisplay: true,
    },
    {
      id: "tx_10004",
      year: 2022,
      productName: "Exclusive Design Mug",
      productId: "7",
      image: "/premium-coffee-mug-mytruekarma.jpg",
      revenue: 1.2,
      donation: { amount: 0.6, organization: "Local Animal Shelter" },
      customerId: "anon_99",
      consentToDisplay: false,
    },
    {
      id: "tx_10005",
      year: 2021,
      productName: "mytrueKarma Starter Pack",
      productId: "9",
      image: "/placeholder-logo.png",
      revenue: 5.0,
      donation: { amount: 2.5, organization: "Global Health Initiative" },
      customerId: "user_01",
      consentToDisplay: true,
    },
  ];
  return NextResponse.json(transactions);
}
