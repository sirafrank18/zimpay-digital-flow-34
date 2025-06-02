
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, DollarSign, Settings, Save, Edit, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const FeeStructure = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fees, setFees] = useState([
    { 
      id: 1, 
      paymentMethod: "EcoCash", 
      type: "Mobile Money", 
      merchantFee: 2.5, 
      customerFee: 0, 
      flatFee: 0.50,
      volume: "$2.4M"
    },
    { 
      id: 2, 
      paymentMethod: "OneMoney", 
      type: "Mobile Money", 
      merchantFee: 2.0, 
      customerFee: 0, 
      flatFee: 0.30,
      volume: "$1.8M"
    },
    { 
      id: 3, 
      paymentMethod: "Visa Cards", 
      type: "Credit/Debit Card", 
      merchantFee: 3.5, 
      customerFee: 0, 
      flatFee: 1.00,
      volume: "$3.2M"
    },
    { 
      id: 4, 
      paymentMethod: "Mastercard", 
      type: "Credit/Debit Card", 
      merchantFee: 3.5, 
      customerFee: 0, 
      flatFee: 1.00,
      volume: "$2.9M"
    },
    { 
      id: 5, 
      paymentMethod: "Bank Transfer", 
      type: "Bank Transfer", 
      merchantFee: 1.0, 
      customerFee: 0, 
      flatFee: 2.00,
      volume: "$890K"
    },
  ]);

  const handleSaveFees = () => {
    setIsEditing(false);
    toast.success("Fee structure updated successfully");
  };

  const calculateRevenue = () => {
    return fees.reduce((total, fee) => {
      const volume = parseFloat(fee.volume.replace(/[$MK]/g, ''));
      return total + (volume * fee.merchantFee / 100);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Fee Structure</h1>
          <p className="text-muted-foreground">Configure payment processing fees and pricing</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleSaveFees}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Fees
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateRevenue().toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">From transaction fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Fee</CardTitle>
            <Percent className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(fees.reduce((sum, fee) => sum + fee.merchantFee, 0) / fees.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all methods</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Highest Fee</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...fees.map(fee => fee.merchantFee))}%
            </div>
            <p className="text-xs text-muted-foreground">Card payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lowest Fee</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(...fees.map(fee => fee.merchantFee))}%
            </div>
            <p className="text-xs text-muted-foreground">Bank transfers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method Fees</CardTitle>
          <CardDescription>Configure fees for each payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Merchant Fee (%)</TableHead>
                <TableHead>Customer Fee (%)</TableHead>
                <TableHead>Flat Fee ($)</TableHead>
                <TableHead>Volume (30d)</TableHead>
                <TableHead>Revenue Est.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.paymentMethod}</TableCell>
                  <TableCell>{fee.type}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={fee.merchantFee}
                        onChange={(e) => {
                          const newFees = fees.map(f => 
                            f.id === fee.id 
                              ? { ...f, merchantFee: parseFloat(e.target.value) || 0 }
                              : f
                          );
                          setFees(newFees);
                        }}
                        className="w-20"
                        step="0.1"
                      />
                    ) : (
                      <span>{fee.merchantFee}%</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={fee.customerFee}
                        onChange={(e) => {
                          const newFees = fees.map(f => 
                            f.id === fee.id 
                              ? { ...f, customerFee: parseFloat(e.target.value) || 0 }
                              : f
                          );
                          setFees(newFees);
                        }}
                        className="w-20"
                        step="0.1"
                      />
                    ) : (
                      <span>{fee.customerFee}%</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={fee.flatFee}
                        onChange={(e) => {
                          const newFees = fees.map(f => 
                            f.id === fee.id 
                              ? { ...f, flatFee: parseFloat(e.target.value) || 0 }
                              : f
                          );
                          setFees(newFees);
                        }}
                        className="w-20"
                        step="0.01"
                      />
                    ) : (
                      <span>${fee.flatFee}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{fee.volume}</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ${((parseFloat(fee.volume.replace(/[$MK]/g, '')) * fee.merchantFee) / 100).toFixed(0)}K
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fee Configuration Guidelines</CardTitle>
            <CardDescription>Best practices for setting payment fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Mobile Money (EcoCash, OneMoney)</h4>
              <p className="text-sm text-muted-foreground">
                Recommended range: 1.5% - 3.0%. Consider network operator charges and local market rates.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Credit/Debit Cards</h4>
              <p className="text-sm text-muted-foreground">
                Recommended range: 2.5% - 4.0%. Factor in international processing fees and currency conversion.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Bank Transfers</h4>
              <p className="text-sm text-muted-foreground">
                Recommended range: 0.5% - 2.0%. Lower percentage but higher flat fees are common.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Impact Analysis</CardTitle>
            <CardDescription>How fee changes affect platform revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Current Monthly Revenue</span>
              <span className="font-medium">${calculateRevenue().toFixed(0)}K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Projected Annual Revenue</span>
              <span className="font-medium">${(calculateRevenue() * 12).toFixed(0)}K</span>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                Adjust fees carefully to balance competitiveness with profitability. 
                Consider merchant feedback and market conditions.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeeStructure;
