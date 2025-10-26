"use client";

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

const incomeExpensesData = [
  { month: "2025-01", income: 3600, expenses: 400 },
  { month: "2025-02", income: 3000, expenses: 380 },
  { month: "2025-03", income: 2500, expenses: 360 },
  { month: "2025-04", income: 2000, expenses: 340 },
  { month: "2025-10", income: 0, expenses: 320 },
];

const spendingByCategory = [
  { category: "Food & Dining", value: 110 },
  { category: "Entertainment", value: 40 },
  { category: "Shopping", value: 90 },
  { category: "Bills & Utilities", value: 150 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Financial Analytics</h1>
        <p className="text-gray-500 text-sm">
          Deep insights into your spending patterns
        </p>
      </div>

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
          <CardTitle className="text-sm font-semibold text-gray-700">
            Spending by Category
          </CardTitle>
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
    </div>
  );
}
/* will study these later, don't worry💀*/
