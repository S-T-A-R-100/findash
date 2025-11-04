"use client";

import React from "react";
import { BadgeDollarSignIcon, ChartNoAxesCombinedIcon, GoalIcon, LayoutDashboardIcon } from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`text-white top-0 left-0 bg-gray-900 w-64 p-4 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <h2 className="text-2xl font-semibold mb-6">FinDash</h2>
      <ul className="space-y-4">
        <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <LayoutDashboardIcon size={20} /> <a href="/">Dashboard</a>
        </li>
        <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <BadgeDollarSignIcon size={20} /> <a href="/transactions">Transactions</a>
        </li>
        <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <GoalIcon size={20} /> <a href="/budgetgoals">Budget Goals</a>
        </li>
        <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <ChartNoAxesCombinedIcon size={20} /> <a href="/analytics">Analytics</a>
        </li>
      </ul>
    </div>
  );
}
