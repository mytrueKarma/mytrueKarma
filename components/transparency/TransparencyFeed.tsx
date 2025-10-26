import useSWR from "swr";
import { YearSection } from "./YearSection";
import { Transaction } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TransparencyFeed() {
  const { data, error, isLoading } = useSWR<Transaction[]>(
    "/api/transactions",
    fetcher,
    { refreshInterval: 10000 }
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }
  if (error)
    return (
      <div className="text-red-500">Fehler beim Laden der Transaktionen.</div>
    );
  if (!data || data.length === 0)
    return (
      <div className="text-gray-500">Noch keine Transaktionen vorhanden.</div>
    );

  // Group by year
  const grouped = data.reduce<Record<number, Transaction[]>>((acc, tx) => {
    acc[tx.year] = acc[tx.year] || [];
    acc[tx.year].push(tx);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <YearSection
          key={year}
          year={Number(year)}
          transactions={grouped[Number(year)]}
        />
      ))}
    </div>
  );
}
