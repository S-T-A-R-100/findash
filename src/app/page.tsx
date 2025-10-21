"use client";
import { useState } from "react";
import { Menu, X, Home, User, Settings, LayoutDashboard, BadgeDollarSign, Goal, ChartNoAxesCombined } from "lucide-react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <h2 className="text-2xl font-semibold mb-6">FinDash</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <BadgeDollarSign size={20} /> Transactions
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <Goal size={20} /> Budget Goals
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <ChartNoAxesCombined size={20} /> Analytics
          </li>
        </ul>
      </div>
    

      {/* Hamburger Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-gray-900"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-6 bg-gray-100 min-h-screen">
        <div className="box-border w-100% h-20% p-4 border-3 border-purple-500 rounded-xl bg-gradient-to-br from-purple-300 to cyan-500 shadow-md">
          <h1 className="text-3xl font-bold">Welcome Back👋</h1>
          <p className="mt-4 text-gray-700">
            Here's your financial overview for today.
          </p>
          <button className="float-right bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">+ Add Transaction</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
