import { Donation } from "./types";
import { HeartHandshake } from "lucide-react";

export function DonationBadge({ donation }: { donation: Donation }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 font-medium text-xs shadow">
      <HeartHandshake className="h-4 w-4 text-green-500" />€
      {donation.amount.toFixed(2)} gespendet an {donation.organization}
    </span>
  );
}
