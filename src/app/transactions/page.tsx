"use client";
import { useState } from "react";
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

const Transactions: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const transactions = [
    {
      date: "Oct 15, 2025",
      description: "Groceries",
      category: "Food & Dining",
      merchant: "Whole Foods",
      totalAmount: "$250.00",
      type: "Expense",
    },
    {
      date: "Jan 7, 2025",
      description: "Movie tickets",
      category: "Entertainment",
      merchant: "AMC Theatres",
      totalAmount: "$150.00",
      type: "Expense",
    },
    {
      date: "Jan 6, 2025",
      description: "New shoes",
      category: "Shopping",
      merchant: "Nike Store",
      totalAmount: "$350.00",
      type: "Expense",
    },
    {
      date: "Jan 5, 2025",
      description: "Coffee",
      category: "Food & Dining",
      merchant: "Starbucks",
      totalAmount: "$450.00",
      type: "Expense",
    },
    {
      date: "Jan 4, 2025",
      description: "Grocery",
      category: "Food & Dining",
      merchant: "Whole Foods",
      totalAmount: "$550.00",
      type: "Expense",
    },
    {
      date: "Jan 2, 2025",
      description: "Electric Bill",
      category: "Bills & Utilities",
      merchant: "Electric Company",
      totalAmount: "$200.00",
      type: "Expense",
    },
    {
      date: "Dec 31, 2024",
      description: "Monthly salary",
      category: "Income",
      merchant: "Employer",
      totalAmount: "$3500.00",
      type: "Income",
    },
  ]

  return (
    //Main content
    <div className="flex-1 flex-col md:ml-64 p-6 bg-gray-100 min-h-screen">
      {/* <div className="flex items-start justify-left min-h-screen bg-gray-100"> */}
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-2xl font-semibold">All Transactions</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Transaction
        </button>
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
            Transaction Types <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All Types</DropdownMenuItem>
            <DropdownMenuItem>Expenses</DropdownMenuItem>
            <DropdownMenuItem>Income</DropdownMenuItem>
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.date}>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.merchant}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">{transaction.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">$1,550.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {/* </div> */}
    </div>
  );
};

export default Transactions;
