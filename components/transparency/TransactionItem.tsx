import { DonationBadge } from "./DonationBadge";
import { Transaction } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100"
      >
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <Link
            href={`/shop/${transaction.productId}`}
            className="flex items-center gap-3 group"
          >
            <Image
              src={transaction.image || "/placeholder.svg"}
              alt={transaction.productName}
              width={48}
              height={48}
              className="rounded-lg object-cover border border-gray-200 group-hover:scale-105 transition-transform"
            />
            <span className="font-semibold text-lg text-blue-700 group-hover:underline group-hover:text-blue-900">
              {transaction.productName}
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="font-bold text-green-600">
              +€{transaction.revenue.toFixed(2)}
            </span>
            <DonationBadge donation={transaction.donation} />
          </div>
          {transaction.consentToDisplay && transaction.customerId && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <User className="h-4 w-4" />
              <span>Kunde: {transaction.customerId}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <span className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-500">
            Transaktion #{transaction.id}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
