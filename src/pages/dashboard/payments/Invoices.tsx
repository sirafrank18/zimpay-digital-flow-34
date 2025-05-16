
import React from "react";
import { FileText, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Invoices = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Invoices</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and manage customer invoices
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg space-y-4 text-center">
        <FileText className="h-16 w-16 text-gray-400" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">No invoices yet</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Create your first invoice to start billing your customers professionally
        </p>
        <Button 
          className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create First Invoice
        </Button>
      </div>
    </div>
  );
};

export default Invoices;
