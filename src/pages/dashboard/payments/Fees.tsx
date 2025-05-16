
import React from "react";
import { DollarSign, Percent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Fees = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white text-gray-900">Transaction Fees</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of your transaction fee structure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Month Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124.50</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Fee Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              2.4% <Percent className="h-4 w-4 ml-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Fees (Year)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,290.75</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
          <CardDescription>Current rates by payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead>Percentage Fee</TableHead>
                <TableHead>Fixed Fee</TableHead>
                <TableHead>Total Fee (Example)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">EcoCash</TableCell>
                <TableCell>2.5% + </TableCell>
                <TableCell>$0.20</TableCell>
                <TableCell>$2.70 per $100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OneMoney</TableCell>
                <TableCell>2.2% + </TableCell>
                <TableCell>$0.15</TableCell>
                <TableCell>$2.35 per $100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">InnBucks</TableCell>
                <TableCell>2.3% + </TableCell>
                <TableCell>$0.18</TableCell>
                <TableCell>$2.48 per $100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ZimSwitch</TableCell>
                <TableCell>1.9% + </TableCell>
                <TableCell>$0.25</TableCell>
                <TableCell>$2.15 per $100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Visa/MasterCard</TableCell>
                <TableCell>2.9% + </TableCell>
                <TableCell>$0.30</TableCell>
                <TableCell>$3.20 per $100</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fees;
