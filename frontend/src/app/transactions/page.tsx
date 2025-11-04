"use client";
import { useState, useEffect } from "react";
import TransactionForm from "@/components/transactionform";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface Transaction {
  id?: number;
  date: string;
  description: string;
  category: string;
  merchant: string;
  amount: number;
  type: string;
  paymentMethod: string;
  notes: string;
}

const Transactions: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("All Types");

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/transactions");

      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const data = await res.json();
      // Accept both an array response or an object like { transactions: [...] }
      const list = Array.isArray(data) ? data : data?.transactions ?? [];
      // Sort by date in descending order (most recent first)
      const sortedList = list.sort((a: any, b: any) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
      setTransactions(sortedList);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const parseAmount = (amt: any) => {
    if (typeof amt === "number") return amt;
    if (!amt) return 0;
    const s = String(amt).replace(/[^0-9.-]+/g, "");
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  // Filter transactions based on selected type
  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedType === "All Types") return true;
    if (selectedType === "Expenses") return transaction.type === "Expense";
    if (selectedType === "Income") return transaction.type === "Income";
    return true;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => {
    const amount = parseAmount(t.amount);
    if (t.type === "Income") {
      return sum + amount;
    } else if (t.type === "Expense") {
      return sum - amount;
    }
    return sum;
  }, 0);
  const formattedTotal = totalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    //Main content
    <div className="flex-1 flex-col p-6 bg-gray-100 min-h-screen">
      {/* <div className="flex items-start justify-left min-h-screen bg-gray-100"> */}
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-2xl font-semibold">All Transactions</h1>
        <TransactionForm onSuccess={fetchTransactions} />
      </div>
      <p className="text-md text-gray-600 mb-6">
        Manage and categorize your financial activity
      </p>
      <div className="flex gap-2 items-center w-full">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {selectedType} <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedType("All Types")}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Expenses")}>
              Expenses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Income")}>
              Income
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            Categories <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Shopping</DropdownMenuItem>
            <DropdownMenuItem>Food & Dining</DropdownMenuItem>
            <DropdownMenuItem>Entertainment</DropdownMenuItem>
            <DropdownMenuItem>Transportation</DropdownMenuItem>
            <DropdownMenuItem>Education</DropdownMenuItem>
            <DropdownMenuItem>Healthcare</DropdownMenuItem>
            <DropdownMenuItem>Bills & Utilities</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="table-auto">
        <TableCaption>Transaction History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto whitespace-nowrap">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.merchant}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{formattedTotal}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {/* </div> */}
    </div>
  );
};

export default Transactions;
