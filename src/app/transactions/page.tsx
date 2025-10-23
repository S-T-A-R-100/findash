"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react";

const Transactions: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    //Main content
    <div className="flex-1 flex-col md:ml-64 p-6 bg-gray-100 min-h-screen">
      {/* <div className="flex items-start justify-left min-h-screen bg-gray-100"> */}
      <h1>All Transactions</h1>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* </div> */}
    </div>
  );
};

export default Transactions;
