export interface Donation {
  amount: number;
  organization: string;
}

export interface Transaction {
  id: string;
  year: number;
  productName: string;
  productId: string;
  image: string;
  revenue: number;
  donation: Donation;
  customerId?: string;
  consentToDisplay?: boolean;
}
