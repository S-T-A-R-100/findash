"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryBudget {
  category: string;
  limit: number;
}

export default function BudgetGoals() {
  const [monthlyIncome, setMonthlyIncome] = useState("3500");
  const [savingsGoal, setSavingsGoal] = useState("700");
  const [targetDate, setTargetDate] = useState("2025-12-31");
  const [savingPurpose, setSavingPurpose] = useState("Building emergency fund");
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([
    { category: "Shopping", limit: 0 },
    { category: "Food & Dining", limit: 0 },
    { category: "Entertainment", limit: 0 },
    { category: "Transportation", limit: 0 },
    { category: "Education", limit: 0 },
    { category: "Healthcare", limit: 0 },
    { category: "Bills & Utilities", limit: 0 },
  ]);

  const handleCategoryLimitChange = (index: number, value: string) => {
    const updated = [...categoryBudgets];
    updated[index].limit = Number(value);
    setCategoryBudgets(updated);
  };

  const handleUpdateBudget = () => {
    const budgetData = {
      monthlyIncome,
      savingsGoal,
      targetDate,
      savingPurpose,
      categoryBudgets: categoryBudgets
    };
    // For development: log budget data to console. Replace with user feedback in production.
    console.log("Budget updated:", budgetData);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Budget & Goals</h1>
            <p className="text-gray-600">Set your financial targets and track your progress</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Budget Card */}
            <Card className="bg-green-50 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <span className="text-2xl">$</span>
                  Monthly Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome" className="text-gray-700 font-medium">
                    Monthly Income ($)
                  </Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savingsGoal" className="text-gray-700 font-medium">
                    Monthly Savings Goal ($)
                  </Label>
                  <Input
                    id="savingsGoal"
                    type="number"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetDate" className="text-gray-700 font-medium">
                    Target Date (optional)
                  </Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savingPurpose" className="text-gray-700 font-medium">
                    What are you saving for?
                  </Label>
                  <Textarea
                    id="savingPurpose"
                    value={savingPurpose}
                    onChange={(e) => setSavingPurpose(e.target.value)}
                    className="bg-white border-gray-200 min-h-[100px]"
                    placeholder="e.g., Building emergency fund"
                  />
                </div>

                <Button
                  onClick={handleUpdateBudget}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-medium"
                >
                  <span className="mr-2">💾</span>
                  Update Budget
                </Button>
              </CardContent>
            </Card>

            {/* Category Budgets */}
            <Card className="bg-purple-50 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <span className="text-2xl">🎯</span>
                  Category Budgets
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Set spending limits for each category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryBudgets.map((category, index) => (
                  <div
                    key={category.category}
                    className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg border border-gray-200"
                  >
                    <Label
                      htmlFor={`category-${index}`}
                      className="text-gray-700 font-medium min-w-[150px]"
                    >
                      {category.category}
                    </Label>
                    <Input
                      id={`category-${index}`}
                      type="number"
                      placeholder="Limit"
                      value={category.limit}
                      onChange={(e) => handleCategoryLimitChange(index, e.target.value)}
                      className="max-w-[150px] border-gray-200"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
