
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: "TXN001234",
      merchant: "TechCorp Solutions",
      amount: "$1,250.00",
      fee: "$43.75",
      method: "EcoCash",
      status: "completed",
      date: "2024-06-02 14:30",
      customer: "customer@email.com"
    },
    {
      id: "TXN001235",
      merchant: "Fashion Hub",
      amount: "$89.99",
      fee: "$3.15",
      method: "Visa",
      status: "completed",
      date: "2024-06-02 14:25",
      customer: "john.doe@email.com"
    },
    {
      id: "TXN001236",
      merchant: "Food Express",
      amount: "$45.50",
      fee: "$1.14",
      method: "OneMoney",
      status: "failed",
      date: "2024-06-02 14:20",
      customer: "user@example.com"
    },
    {
      id: "TXN001237",
      merchant: "Auto Parts Ltd",
      amount: "$320.00",
      fee: "$11.20",
      method: "Mastercard",
      status: "pending",
      date: "2024-06-02 14:15",
      customer: "buyer@domain.com"
    },
    {
      id: "TXN001238",
      merchant: "Health Plus",
      amount: "$156.75",
      fee: "$3.92",
      method: "EcoCash",
      status: "completed",
      date: "2024-06-02 14:10",
      customer: "patient@clinic.com"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      "EcoCash": "bg-green-100 text-green-800",
      "OneMoney": "bg-red-100 text-red-800",
      "Visa": "bg-blue-100 text-blue-800",
      "Mastercard": "bg-orange-100 text-orange-800"
    };
    return <Badge className={colors[method] || "bg-gray-100 text-gray-800"}>{method}</Badge>;
  };

  const filteredTransactions = transactions.filter(tx =>
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVolume = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount.replace('$', '')), 0);
  const totalFees = transactions.reduce((sum, tx) => sum + parseFloat(tx.fee.replace('$', '')), 0);
  const completedCount = transactions.filter(tx => tx.status === "completed").length;
  const failedCount = transactions.filter(tx => tx.status === "failed").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaction Management</h1>
          <p className="text-muted-foreground">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Platform revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((completedCount / transactions.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">{completedCount} of {transactions.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedCount}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history across all merchants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.merchant}</div>
                          <div className="text-sm text-muted-foreground">{transaction.customer}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.amount}</TableCell>
                      <TableCell className="text-green-600">{transaction.fee}</TableCell>
                      <TableCell>{getMethodBadge(transaction.method)}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell className="text-sm">{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Transactions</CardTitle>
              <CardDescription>Successfully processed transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Completed transactions content would be filtered here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Transactions</CardTitle>
              <CardDescription>Transactions awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pending transactions content would be filtered here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardHeader>
              <CardTitle>Failed Transactions</CardTitle>
              <CardDescription>Transactions that failed processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Failed transactions content would be filtered here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
