"use client";
import { useState, useEffect } from "react";
import TransactionForm from "@/components/transactionform";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpRightIcon, ChevronDownIcon, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

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

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete?.id) return;
    
    try {
      const res = await fetch(`http://localhost:8080/api/transactions/${transactionToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);

      // Refresh the transactions list after successful deletion
      await fetchTransactions();
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete transaction");
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const parseAmount = (amt: any) => {
    if (typeof amt === "number") return amt;
    if (!amt) return 0;
    const s = String(amt).replace(/[^0-9.-]+/g, "");
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  // Filter transactions based on selected type, category, and search query
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by type
    const typeMatch =
      selectedType === "All Types" ||
      (selectedType === "Expenses" && transaction.type === "Expense") ||
      (selectedType === "Income" && transaction.type === "Income");

    // Filter by category
    const categoryMatch =
      selectedCategory === "All Categories" ||
      transaction.category === selectedCategory;

    // Filter by search query (search across multiple fields)
    const searchMatch = searchQuery.trim() === "" ||
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date?.includes(searchQuery) ||
      transaction.amount?.toString().includes(searchQuery);

    return typeMatch && categoryMatch && searchMatch;
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
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            {selectedCategory} <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory("All Categories")}>
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Shopping")}>
              Shopping
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Food & Dining")}>
              Food & Dining
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Entertainment")}>
              Entertainment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Transportation")}>
              Transportation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Education")}>
              Education
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Healthcare")}>
              Healthcare
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("Bills & Utilities")}>
              Bills & Utilities
            </DropdownMenuItem>
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
            <TableHead className="w-[50px]"></TableHead>
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
              <TableCell>
                <button
                  onClick={() => handleDeleteClick(transaction)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  aria-label="Delete transaction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </TableCell>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {transactionToDelete && (
            <div className="py-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Description:</span> {transactionToDelete.description}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Amount:</span> ${transactionToDelete.amount}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Date:</span> {transactionToDelete.date}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* </div> */}
    </div>
  );
};

export default Transactions;
