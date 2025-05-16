
import React from "react";
import { ArrowUpFromLine, CreditCard, Clock } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Payouts = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Payouts</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Transfer funds from your account to external accounts
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
        >
          <ArrowUpFromLine className="h-4 w-4" />
          Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,240.50</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$750.25</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Paid Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,490.00</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg space-y-4 text-center">
        <Clock className="h-16 w-16 text-gray-400" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">No pending payouts</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          You don't have any pending payouts at the moment
        </p>
        <Button 
          className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          Manage Bank Accounts
        </Button>
      </div>
    </div>
  );
};

export default Payouts;
