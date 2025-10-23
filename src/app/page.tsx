"use client";

import { useState } from "react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    //Main content
    <div className="flex-1 md:ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="box-border w-100% h-20% p-4 border-3 border-purple-500 rounded-xl bg-gradient-to-br from-purple-300 to cyan-500 shadow-md">
        <h1 className="text-3xl font-bold">Welcome Back👋</h1>
        <p className="mt-4 text-gray-700">
          Here's your financial overview for today.
        </p>
        <button className="float-right bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">+ Add Transaction</button>
      </div>
    </div>
  );
};

export default Sidebar;
