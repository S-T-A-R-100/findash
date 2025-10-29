"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface TransactionFormProps {
  trigger?: React.ReactNode;
  transaction?: Transaction;
  onSuccess?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  trigger,
  transaction,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Transaction>({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "",
    merchant: "",
    amount: 0,
    type: "Expense",
    paymentMethod: "Cash",
    notes: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = transaction?.id
        ? `http://localhost:8080/api/transactions/${transaction.id}`
        : "http://localhost:8080/api/transactions";

      const method = transaction?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${transaction?.id ? "update" : "create"} transaction`);
      }

      // Reset form if creating new transaction
      if (!transaction?.id) {
        setFormData({
          date: new Date().toISOString().split("T")[0],
          description: "",
          category: "",
          merchant: "",
          amount: 0,
          type: "Expense",
          paymentMethod: "Cash",
          notes: "",
        });
      }

      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Failed to save transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {transaction?.id ? "Edit Transaction" : "Add New Transaction"}
          </DialogTitle>
          <DialogDescription>
            {transaction?.id
              ? "Update the transaction details below."
              : "Fill in the details to add a new transaction."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., Grocery shopping"
                required
              />
            </div>

            {/* Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Bills & Utilities">Bills & Utilities</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Merchant */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="merchant" className="text-right">
                Merchant
              </Label>
              <Input
                id="merchant"
                name="merchant"
                value={formData.merchant}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., Whole Foods"
                required
              />
            </div>

            {/* Amount */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="0.00"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Payment Method
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleSelectChange("paymentMethod", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Optional notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : transaction?.id
                ? "Update Transaction"
                : "Add Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;