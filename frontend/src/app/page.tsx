"use client";

import { useState } from "react";
import TransactionForm from "@/components/transactionform";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <p className="text-2xl font-bold text-gray-900 mt-1">$3,500</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-36">
        <div>
          <p className="text-sm font-medium text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$60</p>
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

      <div className="flex items-center justify-between py-4">
        <div>
          <p className="text-gray-900 font-medium">Food</p>
          <p className="text-sm text-gray-500">Oct 26 • Food & Dining</p>
        </div>
        <p className="text-red-500 font-semibold">- $60</p>
      </div>

        
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-gray-900 font-medium">Movie tickets</p>
            <p className="text-sm text-gray-500">Jan 7 • Entertainment</p>
          </div>
          <p className="text-red-500 font-semibold">- $25</p>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-gray-900 font-medium">New shoes</p>
            <p className="text-sm text-gray-500">Jan 6 • Shopping</p>
          </div>
          <p className="text-red-500 font-semibold">- $89.99</p>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-gray-900 font-medium">Coffee</p>
            <p className="text-sm text-gray-500">Jan 5 • Food & Dining</p>
          </div>
          <p className="text-red-500 font-semibold">- $12</p>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-gray-900 font-medium">Grocery shopping</p>
            <p className="text-sm text-gray-500">Jan 4 • Food & Dining</p>
          </div>
          <p className="text-red-500 font-semibold">- $45.50</p>
        </div>

      </div>
    </div>

</div>
  );
};

export default Dashboard;
