
import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SandboxTransactions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white text-gray-900">Test Transactions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          View test transaction records in sandbox environment
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg space-y-4 text-center">
        <ArrowLeftRight className="h-16 w-16 text-gray-400" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sandbox Transactions</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          This page will be implemented soon to allow you to view test transactions
        </p>
        <Button 
          className="bg-brand-orange hover:bg-brand-orange/90 text-white"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default SandboxTransactions;
