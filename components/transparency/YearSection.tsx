import { TransactionItem } from "./TransactionItem";
import { Transaction } from "./types";

export function YearSection({
  year,
  transactions,
}: {
  year: number;
  transactions: Transaction[];
}) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-lg font-semibold text-gray-700 shadow">
          {year}
        </span>
      </h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </section>
  );
}
