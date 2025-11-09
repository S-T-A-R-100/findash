"use client";

import { useState, useEffect } from "react";
import TransactionForm from "@/components/transactionform";
import dayjs from "dayjs";

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

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      // Use slice() before sort to avoid mutating the original array, then take first 5
      const sortedList = list
        .slice()
        .sort((a: any, b: any) => {
          const dateA = new Date(a?.date).getTime();
          const dateB = new Date(b?.date).getTime();
          return dateB - dateA;
        })
        .slice(0, 5);
      setTransactions(sortedList);
      
      // Calculate monthly income from the past 30 days
      const thirtyDaysAgo = dayjs().subtract(30, 'day');
      const monthlyTransactions = list.filter((transaction: any) => {
        const transactionDate = dayjs(transaction.date);
        return transactionDate.isAfter(thirtyDaysAgo);
      });
      const monthlyIncomeTransactions = monthlyTransactions.filter((transaction: Transaction) => {
        return transaction.type === "Income"
      });
      const monthlyExpenseTransactions = monthlyTransactions.filter((transaction: Transaction) => {
        return transaction.type === "Expense"
      });
      
      const totalMonthlyIncome = monthlyIncomeTransactions.reduce((sum: number, transaction: any) => {
        return sum + (parseFloat(transaction.amount) || 0);
      }, 0);
      setMonthlyIncome(totalMonthlyIncome);

      const totalMonthlyExpenses = monthlyExpenseTransactions.reduce((sum: number, transaction: any) => {
        return sum + (parseFloat(transaction.amount) || 0);
      }, 0);
      setMonthlyExpenses(totalMonthlyExpenses);

    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    //Main content
    <div className="flex-1 md:md-[-64] p-6 bg-gray-100 min-h-screen">
      <div className="box-border md:mt-0 w-full h-auto p-4 border-3 border-purple-500 rounded-xl bg-gradient-to-br from-purple-300 to cyan-500 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Welcome Back👋</h1>
          <p className="mt-4 text-gray-700">
            Here's your financial overview for today.
          </p>
        </div>
        <TransactionForm />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-36">
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Income</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">${monthlyIncome.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-36">
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Expenses</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{monthlyExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-36">
          <div>
            <p className="text-sm font-medium text-gray-500">Savings Balance</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">$3,440</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-36">
          <div>
            <p className="text-sm font-medium text-gray-500">Savings Goal Progress</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
          <p className="text-right text-sm text-gray-700 font-semibold mt-2">100%</p>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction: any, index: number) => {
            const formattedDate = dayjs(transaction.date).format('MMM DD');

            return (
              <div key={index} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-gray-900 font-medium">{transaction.category}</p>
                  <p className="text-sm text-gray-500">{formattedDate} • {transaction.category}</p>
                </div>
                {transaction.type == "Expense" ?
                  <p className="text-red-500 font-semibold">- {transaction.amount}</p> :
                  <p className="text-green-500 font-semibold">{transaction.amount}</p>
                }
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
