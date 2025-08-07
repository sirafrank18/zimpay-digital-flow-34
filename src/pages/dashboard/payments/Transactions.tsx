import React, { useState, useMemo } from "react";
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
  RefreshCcw,
  FileText,
  Calendar,
  TrendingUp,
  DollarSign,
  Activity,
  CalendarIcon
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isWithinInterval, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

// Enhanced sample data with more realistic transaction patterns
const generateTransactions = () => {
  const paymentMethods = ["ecocash", "onemoney", "innbucks", "zimswitch", "visa", "mastercard"];
  const statuses = ["successful", "pending", "failed", "refunded"];
  const types = ["payment", "refund", "payout"];
  const customers = [
    "Alice Johnson", "Bob Smith", "Emma Wilson", "James Brown", "Sarah Davis",
    "Michael Jones", "Lisa Garcia", "David Miller", "Jennifer Wilson", "Christopher Lee",
    "Amanda Taylor", "Mark Anderson", "Rachel White", "Kevin Martin", "Jessica Clark"
  ];

  const transactions = [];
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    transactions.push({
      id: `TX${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
      date: date.toISOString(),
      customer: customers[Math.floor(Math.random() * customers.length)],
      amount: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
      currency: "USD",
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      reference: `REF${Math.floor(Math.random() * 100000)}`,
      fee: parseFloat((Math.random() * 10 + 1).toFixed(2)),
      merchantId: `MERCHANT_${Math.floor(Math.random() * 100)}`
    });
  }
  return transactions;
};

const transactions = generateTransactions();

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [customDateFrom, setCustomDateFrom] = useState<Date>();
  const [customDateTo, setCustomDateTo] = useState<Date>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [transactionType, setTransactionType] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Enhanced filtering logic with date ranges
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      
      // Search filter
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = status === "all" || transaction.status === status;
      
      // Payment method filter
      const matchesPaymentMethod = paymentMethod === "all" || transaction.paymentMethod === paymentMethod;
      
      // Transaction type filter
      const matchesType = transactionType === "all" || transaction.type === transactionType;
      
      // Amount range filter
      const matchesAmount = 
        (minAmount === "" || transaction.amount >= parseFloat(minAmount)) &&
        (maxAmount === "" || transaction.amount <= parseFloat(maxAmount));
      
      // Date range filter
      let matchesDateRange = true;
      const today = new Date();
      
      switch (dateRange) {
        case "today":
          matchesDateRange = isWithinInterval(transactionDate, {
            start: startOfDay(today),
            end: endOfDay(today)
          });
          break;
        case "yesterday":
          const yesterday = subDays(today, 1);
          matchesDateRange = isWithinInterval(transactionDate, {
            start: startOfDay(yesterday),
            end: endOfDay(yesterday)
          });
          break;
        case "thisWeek":
          matchesDateRange = isWithinInterval(transactionDate, {
            start: startOfWeek(today),
            end: endOfWeek(today)
          });
          break;
        case "thisMonth":
          matchesDateRange = isWithinInterval(transactionDate, {
            start: startOfMonth(today),
            end: endOfMonth(today)
          });
          break;
        case "custom":
          if (customDateFrom && customDateTo) {
            matchesDateRange = isWithinInterval(transactionDate, {
              start: startOfDay(customDateFrom),
              end: endOfDay(customDateTo)
            });
          }
          break;
        default:
          matchesDateRange = true;
      }
      
      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesType && matchesAmount && matchesDateRange;
    });
  }, [searchTerm, status, paymentMethod, dateRange, customDateFrom, customDateTo, transactionType, minAmount, maxAmount]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const successful = filteredTransactions.filter(t => t.status === "successful");
    const pending = filteredTransactions.filter(t => t.status === "pending");
    const failed = filteredTransactions.filter(t => t.status === "failed");
    const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0);
    
    return {
      total,
      count: filteredTransactions.length,
      successfulCount: successful.length,
      pendingCount: pending.length,
      failedCount: failed.length,
      successfulAmount: successful.reduce((sum, t) => sum + t.amount, 0),
      totalFees,
      averageAmount: filteredTransactions.length > 0 ? total / filteredTransactions.length : 0
    };
  }, [filteredTransactions]);

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

  // Export functions
  const exportToCSV = () => {
    const csvData = filteredTransactions.map(transaction => ({
      'Transaction ID': transaction.id,
      'Date': formatDate(transaction.date),
      'Customer': transaction.customer,
      'Amount': `${transaction.currency} ${transaction.amount.toFixed(2)}`,
      'Payment Method': transaction.paymentMethod.toUpperCase(),
      'Status': transaction.status.toUpperCase(),
      'Type': transaction.type.toUpperCase(),
      'Reference': transaction.reference,
      'Fee': `${transaction.currency} ${transaction.fee.toFixed(2)}`
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Transactions exported to CSV successfully!");
  };

  const exportToPDF = async () => {
    try {
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Transaction Report', 20, 20);
      
      // Add summary
      doc.setFontSize(12);
      doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 35);
      doc.text(`Total Transactions: ${analytics.count}`, 20, 45);
      doc.text(`Total Amount: USD ${analytics.total.toFixed(2)}`, 20, 55);
      doc.text(`Total Fees: USD ${analytics.totalFees.toFixed(2)}`, 20, 65);
      
      // Add table
      const tableData = filteredTransactions.map(transaction => [
        transaction.id,
        formatDate(transaction.date),
        transaction.customer,
        `${transaction.currency} ${transaction.amount.toFixed(2)}`,
        transaction.paymentMethod.toUpperCase(),
        transaction.status.toUpperCase(),
        transaction.type.toUpperCase()
      ]);

      autoTable(doc, {
        head: [['ID', 'Date', 'Customer', 'Amount', 'Method', 'Status', 'Type']],
        body: tableData,
        startY: 80,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [249, 115, 22] }, // Orange color
      });
      
      doc.save(`transactions_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      toast.success("Transactions exported to PDF successfully!");
    } catch (error) {
      toast.error("Failed to export PDF. Please try again.");
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

  const clearFilters = () => {
    setSearchTerm("");
    setStatus("all");
    setPaymentMethod("all");
    setDateRange("all");
    setTransactionType("all");
    setMinAmount("");
    setMaxAmount("");
    setCustomDateFrom(undefined);
    setCustomDateTo(undefined);
    setSelectedRows([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transaction Center</h1>
          <p className="text-muted-foreground">
            Track, audit, and manage all system transactions with advanced filtering and reporting
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={exportToCSV}>
                <FileText className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            className="flex items-center gap-2"
            onClick={() => toast.info("New Transaction form would open here")}
          >
            <ArrowDownToLine className="h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">USD {analytics.total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Average: USD {analytics.averageAmount.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.count}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.successfulCount} successful
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.count > 0 ? ((analytics.successfulCount / analytics.count) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.failedCount} failed, {analytics.pendingCount} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">USD {analytics.totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {((analytics.totalFees / analytics.total) * 100 || 0).toFixed(2)}% of total volume
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Transaction Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4">
            {/* Search and basic filters row */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction ID, customer, or reference"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[140px]">
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
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Method" />
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
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Period" />
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
              </div>
            </div>

            {/* Custom date range picker */}
            {dateRange === "custom" && (
              <div className="flex items-center gap-2 p-4 border rounded-lg bg-muted/20">
                <Label className="text-sm font-medium">Date Range:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customDateFrom ? format(customDateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={customDateFrom}
                      onSelect={setCustomDateFrom}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <span>to</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customDateTo ? format(customDateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={customDateTo}
                      onSelect={setCustomDateTo}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Advanced filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Advanced Filters</h3>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Transaction Type</Label>
                        <Select value={transactionType} onValueChange={setTransactionType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="payment">Payment</SelectItem>
                            <SelectItem value="refund">Refund</SelectItem>
                            <SelectItem value="payout">Payout</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Amount Range (USD)</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="Min" 
                            type="number" 
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                          />
                          <span>to</span>
                          <Input 
                            placeholder="Max" 
                            type="number"
                            value={maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-between">
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Clear All
                        </Button>
                        <div className="text-sm text-muted-foreground">
                          {filteredTransactions.length} results
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {selectedRows.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedRows.length} selected
                    </span>
                    <Button variant="outline" size="sm">
                      Bulk Actions
                    </Button>
                  </div>
                )}
              </div>
              
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0} 
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[140px]">Transaction ID</TableHead>
                  <TableHead className="min-w-[160px]">Date & Time</TableHead>
                  <TableHead className="min-w-[140px]">Customer</TableHead>
                  <TableHead className="min-w-[120px]">Method</TableHead>
                  <TableHead className="min-w-[100px]">Amount</TableHead>
                  <TableHead className="min-w-[80px]">Fee</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="text-right w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="group hover:bg-muted/50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedRows.includes(transaction.id)}
                          onCheckedChange={() => handleRowSelect(transaction.id)} 
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                      <TableCell className="text-sm">{formatDate(transaction.date)}</TableCell>
                      <TableCell className="font-medium">{transaction.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(transaction.paymentMethod)}
                          <span className="text-xs capitalize">{transaction.paymentMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell className={cn(
                        "font-medium",
                        transaction.type === "refund" ? "text-red-600 dark:text-red-400" : ""
                      )}>
                        {transaction.type === "refund" ? "-" : ""}{transaction.currency} {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {transaction.currency} {transaction.fee.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                className="text-destructive hover:text-destructive focus:text-destructive"
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
                    <TableCell colSpan={10} className="h-24 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Activity className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No transactions found matching your criteria.</p>
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Clear Filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Showing {filteredTransactions.length} of {transactions.length} transactions</span>
            {filteredTransactions.length !== transactions.length && (
              <Button variant="link" size="sm" onClick={clearFilters} className="h-auto p-0">
                Show all
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
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