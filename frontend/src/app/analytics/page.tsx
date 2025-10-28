"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

type Transaction = {
  id: number;
  date: string; // ISO yyyy-mm-dd
  description: string;
  category: string;
  merchant: string;
  amount: number;
  type: string; // "Income" | "Expense"
  paymentMethod?: string;
  notes?: string;
};

export default function AnalyticsPage() {
  const [incomeExpensesData, setIncomeExpensesData] = useState<Array<any>>([]);
  const [spendingByCategory, setSpendingByCategory] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/api/transactions");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: Transaction[] = await res.json();

        // Aggregate monthly income/expenses (group by YYYY-MM)
        const monthMap = new Map<string, { month: string; income: number; expenses: number }>();

        const categoryMap = new Map<string, number>();

        data.forEach((tx) => {
          const month = tx.date?.slice(0, 7) ?? "unknown"; // YYYY-MM

          if (!monthMap.has(month)) {
            monthMap.set(month, { month, income: 0, expenses: 0 });
          }
          const entry = monthMap.get(month)!;

          const amt = Number(tx.amount) || 0;
          if (tx.type && tx.type.toLowerCase() === "income") {
            entry.income += amt;
          } else {
            entry.expenses += amt;

            // aggregate by category for expenses
            const cat = tx.category || "Uncategorized";
            categoryMap.set(cat, (categoryMap.get(cat) || 0) + amt);
          }
        });

        // Sort months ascending
        const months = Array.from(monthMap.values()).sort((a, b) => (a.month > b.month ? 1 : -1));

        // Convert category map to array and sort by value desc
        const categories = Array.from(categoryMap.entries())
          .map(([category, value]) => ({ category, value }))
          .sort((a, b) => b.value - a.value);

        setIncomeExpensesData(months);
        setSpendingByCategory(categories);
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Financial Analytics</h1>
        <p className="text-gray-500 text-sm">Deep insights into your spending patterns</p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading analytics…</div>
      ) : error ? (
        <div className="text-sm text-red-600">Error loading data: {error}</div>
      ) : (
        <>
          {/* Monthly Income vs Expenses */}
          <Card className="shadow-md border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-700">
                Monthly Income vs Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeExpensesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#00b894" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#d63031" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card className="shadow-md border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-700">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="category" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
/* will study these later, don't worry💀*/
