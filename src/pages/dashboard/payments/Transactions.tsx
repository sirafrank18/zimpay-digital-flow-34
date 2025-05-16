
import React, { useState } from "react";
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Filter, 
  Search, 
  Download,
  MoreHorizontal,
  ChevronDown,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { EcoCashIcon, InnBucksIcon, OneMoneyIcon, ZimSwitchIcon, VisaIcon, MasterCardIcon } from "@/components/icons/PaymentIcons";

const transactions = [
  {
    id: "TX123456789",
    date: "2023-05-15T14:30:00Z",
    customer: "Jane Smith",
    amount: 250.00,
    currency: "USD",
    paymentMethod: "ecocash",
    status: "successful",
    type: "payment"
  },
  {
    id: "TX987654321",
    date: "2023-05-15T10:45:00Z",
    customer: "John Doe",
    amount: 120.50,
    currency: "USD",
    paymentMethod: "onemoney",
    status: "successful",
    type: "payment"
  },
  {
    id: "TX567890123",
    date: "2023-05-14T16:20:00Z",
    customer: "Alice Brown",
    amount: 300.75,
    currency: "USD",
    paymentMethod: "innbucks",
    status: "pending",
    type: "payment"
  },
  {
    id: "TX345678901",
    date: "2023-05-14T09:15:00Z",
    customer: "Bob Johnson",
    amount: 75.25,
    currency: "USD",
    paymentMethod: "visa",
    status: "failed",
    type: "payment"
  },
  {
    id: "TX234567890",
    date: "2023-05-13T13:50:00Z",
    customer: "Emma Wilson",
    amount: 450.00,
    currency: "USD",
    paymentMethod: "zimswitch",
    status: "successful",
    type: "payment"
  },
  {
    id: "TX789012345",
    date: "2023-05-13T15:25:00Z",
    customer: "Mike Anderson",
    amount: 200.00,
    currency: "USD",
    paymentMethod: "mastercard",
    status: "successful",
    type: "payment"
  },
  {
    id: "TX890123456",
    date: "2023-05-12T11:40:00Z",
    customer: "Sarah Davis",
    amount: 85.50,
    currency: "USD",
    paymentMethod: "ecocash",
    status: "successful",
    type: "payment"
  },
  {
    id: "TX456789012",
    date: "2023-05-12T08:30:00Z",
    customer: "James Miller",
    amount: 310.25,
    currency: "USD",
    paymentMethod: "onemoney",
    status: "refunded",
    type: "refund"
  },
  {
    id: "TX678901234",
    date: "2023-05-11T17:20:00Z",
    customer: "Patricia Moore",
    amount: 95.75,
    currency: "USD",
    paymentMethod: "innbucks",
    status: "successful",
    type: "payment"
  },
  {
    id: "TX901234567",
    date: "2023-05-11T14:10:00Z",
    customer: "Robert Taylor",
    amount: 150.00,
    currency: "USD",
    paymentMethod: "zimswitch",
    status: "successful",
    type: "payment"
  }
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = status === "all" || transaction.status === status;
    const matchesPaymentMethod = paymentMethod === "all" || transaction.paymentMethod === paymentMethod;
    // In a real app, we'd filter by date range as well
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredTransactions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTransactions.map(t => t.id));
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "ecocash":
        return <EcoCashIcon />;
      case "onemoney":
        return <OneMoneyIcon />;
      case "innbucks":
        return <InnBucksIcon />;
      case "zimswitch":
        return <ZimSwitchIcon />;
      case "visa":
        return <VisaIcon />;
      case "mastercard":
        return <MasterCardIcon />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "successful":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Successful
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 flex items-center gap-1">
            <RefreshCcw className="h-3 w-3" />
            Refunded
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and manage all your payment transactions
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.info("Export functionality would be triggered here")}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
            onClick={() => toast.info("New Transaction form would open here")}
          >
            <ArrowDownToLine className="h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 pb-0">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by transaction ID or customer"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="ecocash">EcoCash</SelectItem>
                  <SelectItem value="onemoney">OneMoney</SelectItem>
                  <SelectItem value="innbucks">InnBucks</SelectItem>
                  <SelectItem value="zimswitch">ZimSwitch</SelectItem>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">MasterCard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-medium">Advanced Filters</h3>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Transaction Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {["Payment", "Refund", "Payout", "Adjustment"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox id={`type-${type.toLowerCase()}`} />
                            <Label htmlFor={`type-${type.toLowerCase()}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Amount Range</h4>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Min" type="number" className="w-full" />
                        <span>to</span>
                        <Input placeholder="Max" type="number" className="w-full" />
                      </div>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm">Reset</Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">
                    <Checkbox 
                      checked={selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0} 
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[120px]">Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="group hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedRows.includes(transaction.id)}
                          onCheckedChange={() => handleRowSelect(transaction.id)} 
                        />
                      </TableCell>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getPaymentMethodIcon(transaction.paymentMethod)}
                        </div>
                      </TableCell>
                      <TableCell className={cn(
                        "font-medium",
                        transaction.type === "refund" ? "text-red-600 dark:text-red-400" : ""
                      )}>
                        {transaction.type === "refund" ? "-" : ""}{transaction.currency} {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${transaction.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info(`Receipt for ${transaction.id} would be downloaded`)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </DropdownMenuItem>
                            {transaction.status === "pending" && (
                              <DropdownMenuItem onClick={() => toast.info(`Payment ${transaction.id} would be retried`)}>
                                <RefreshCcw className="h-4 w-4 mr-2" />
                                Retry Payment
                              </DropdownMenuItem>
                            )}
                            {transaction.status === "successful" && transaction.type !== "refund" && (
                              <DropdownMenuItem 
                                className="text-red-600 hover:text-red-700 focus:text-red-700"
                                onClick={() => toast.info(`Refund process for ${transaction.id} would be initiated`)}
                              >
                                <ArrowUpFromLine className="h-4 w-4 mr-2" />
                                Process Refund
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="px-4 bg-brand-orange/10 text-brand-orange border-brand-orange/20">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Transactions;
