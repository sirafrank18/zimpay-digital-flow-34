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
  CalendarIcon,
  Settings,
  Shield
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

// Enhanced sample data with more realistic super admin transaction patterns
const generateSuperAdminTransactions = () => {
  const paymentMethods = ["ecocash", "onemoney", "innbucks", "zimswitch", "visa", "mastercard"];
  const statuses = ["successful", "pending", "failed", "refunded", "disputed", "flagged"];
  const types = ["payment", "refund", "payout", "settlement", "adjustment"];
  const merchants = [
    "Global Retail Ltd", "TechCorp Solutions", "FastFood Chain", "Online Marketplace", "Digital Services Inc",
    "LocalMart", "E-commerce Plus", "ServicePro", "RetailGiant", "StartupXYZ",
    "Enterprise Solutions", "Quick Services", "Premium Store", "Budget Mart", "Tech Innovations"
  ];

  const transactions = [];
  for (let i = 0; i < 75; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Last 90 days
    
    transactions.push({
      id: `SAT${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
      date: date.toISOString(),
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      customer: `Customer_${Math.floor(Math.random() * 10000)}`,
      amount: parseFloat((Math.random() * 5000 + 50).toFixed(2)),
      currency: "USD",
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      reference: `SAREF${Math.floor(Math.random() * 1000000)}`,
      fee: parseFloat((Math.random() * 25 + 2).toFixed(2)),
      merchantId: `MERCH_${Math.floor(Math.random() * 1000)}`,
      riskScore: Math.floor(Math.random() * 100),
      ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      country: ["US", "ZW", "ZA", "UK", "CA"][Math.floor(Math.random() * 5)]
    });
  }
  return transactions;
};

const transactions = generateSuperAdminTransactions();

const TransactionReports = () => {
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
  const [merchantFilter, setMerchantFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  // Enhanced filtering logic with super admin specific filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      
      // Search filter
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchantId.toLowerCase().includes(searchTerm.toLowerCase());
      
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
      
      // Risk filter
      const matchesRisk = riskFilter === "all" || 
        (riskFilter === "low" && transaction.riskScore < 30) ||
        (riskFilter === "medium" && transaction.riskScore >= 30 && transaction.riskScore < 70) ||
        (riskFilter === "high" && transaction.riskScore >= 70);
      
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
      
      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesType && matchesAmount && matchesDateRange && matchesRisk;
    });
  }, [searchTerm, status, paymentMethod, dateRange, customDateFrom, customDateTo, transactionType, minAmount, maxAmount, riskFilter]);

  // Analytics calculations for super admin
  const analytics = useMemo(() => {
    const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const successful = filteredTransactions.filter(t => t.status === "successful");
    const pending = filteredTransactions.filter(t => t.status === "pending");
    const failed = filteredTransactions.filter(t => t.status === "failed");
    const flagged = filteredTransactions.filter(t => t.status === "flagged");
    const disputed = filteredTransactions.filter(t => t.status === "disputed");
    const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0);
    const highRisk = filteredTransactions.filter(t => t.riskScore >= 70);
    
    return {
      total,
      count: filteredTransactions.length,
      successfulCount: successful.length,
      pendingCount: pending.length,
      failedCount: failed.length,
      flaggedCount: flagged.length,
      disputedCount: disputed.length,
      successfulAmount: successful.reduce((sum, t) => sum + t.amount, 0),
      totalFees,
      averageAmount: filteredTransactions.length > 0 ? total / filteredTransactions.length : 0,
      highRiskCount: highRisk.length,
      uniqueMerchants: new Set(filteredTransactions.map(t => t.merchantId)).size
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
      'Merchant': transaction.merchant,
      'Customer': transaction.customer,
      'Amount': `${transaction.currency} ${transaction.amount.toFixed(2)}`,
      'Payment Method': transaction.paymentMethod.toUpperCase(),
      'Status': transaction.status.toUpperCase(),
      'Type': transaction.type.toUpperCase(),
      'Reference': transaction.reference,
      'Fee': `${transaction.currency} ${transaction.fee.toFixed(2)}`,
      'Risk Score': transaction.riskScore,
      'Country': transaction.country,
      'IP Address': transaction.ipAddress
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `super_admin_transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Super Admin transaction data exported to CSV successfully!");
  };

  const exportToPDF = async () => {
    try {
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Super Admin Transaction Report', 20, 20);
      
      // Add summary
      doc.setFontSize(12);
      doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 35);
      doc.text(`Total Transactions: ${analytics.count}`, 20, 45);
      doc.text(`Total Amount: USD ${analytics.total.toFixed(2)}`, 20, 55);
      doc.text(`Total Fees: USD ${analytics.totalFees.toFixed(2)}`, 20, 65);
      doc.text(`High Risk Transactions: ${analytics.highRiskCount}`, 20, 75);
      doc.text(`Active Merchants: ${analytics.uniqueMerchants}`, 20, 85);
      
      // Add table
      const tableData = filteredTransactions.map(transaction => [
        transaction.id,
        formatDate(transaction.date),
        transaction.merchant,
        `${transaction.currency} ${transaction.amount.toFixed(2)}`,
        transaction.paymentMethod.toUpperCase(),
        transaction.status.toUpperCase(),
        transaction.riskScore.toString()
      ]);

      autoTable(doc, {
        head: [['ID', 'Date', 'Merchant', 'Amount', 'Method', 'Status', 'Risk']],
        body: tableData,
        startY: 100,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [249, 115, 22] }, // Orange color
      });
      
      doc.save(`super_admin_transactions_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      toast.success("Super Admin transaction report exported to PDF successfully!");
    } catch (error) {
      toast.error("Failed to export PDF. Please try again.");
    }
  };

  const generateCustomReport = () => {
    toast.info("Custom report generator would open here - allowing selection of specific fields, date ranges, and export options");
  };

  const flagTransaction = (id: string) => {
    toast.warning(`Transaction ${id} has been flagged for review`);
  };

  const unflagTransaction = (id: string) => {
    toast.success(`Transaction ${id} flag has been removed`);
  };

  const blockMerchant = (merchantId: string) => {
    toast.error(`Merchant ${merchantId} has been temporarily blocked pending investigation`);
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
      case "flagged":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Flagged
          </Badge>
        );
      case "disputed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Disputed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRiskBadge = (score: number) => {
    if (score < 30) {
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Low</Badge>;
    } else if (score < 70) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">High</Badge>;
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
    setRiskFilter("all");
    setCustomDateFrom(undefined);
    setCustomDateTo(undefined);
    setSelectedRows([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Transaction Center</h1>
          <p className="text-muted-foreground">
            Monitor, analyze, and manage all platform transactions with advanced controls and reporting
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
            onClick={generateCustomReport}
          >
            <FileText className="h-4 w-4" />
            Generate Custom Report
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
              {analytics.successfulCount} successful, {analytics.flaggedCount} flagged
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Analysis</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.highRiskCount}</div>
            <p className="text-xs text-muted-foreground">
              High risk transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">USD {analytics.totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.uniqueMerchants} active merchants
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
                  placeholder="Search by transaction ID, merchant, customer, or reference"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="successful">Successful</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="ecocash">EcoCash</SelectItem>
                    <SelectItem value="onemoney">OneMoney</SelectItem>
                    <SelectItem value="innbucks">InnBucks</SelectItem>
                    <SelectItem value="zimswitch">ZimSwitch</SelectItem>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced filters row */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex gap-2 flex-wrap">
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="refund">Refund</SelectItem>
                    <SelectItem value="payout">Payout</SelectItem>
                    <SelectItem value="settlement">Settlement</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[140px]">
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

                {dateRange === "custom" && (
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[120px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {customDateFrom ? format(customDateFrom, "MMM dd") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={customDateFrom}
                          onSelect={setCustomDateFrom}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[120px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {customDateTo ? format(customDateTo, "MMM dd") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={customDateTo}
                          onSelect={setCustomDateTo}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Min amount"
                  type="number"
                  className="w-[120px]"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
                <Input
                  placeholder="Max amount"
                  type="number"
                  className="w-[120px]"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
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
                  <TableHead className="min-w-[140px]">Merchant</TableHead>
                  <TableHead className="min-w-[120px]">Customer</TableHead>
                  <TableHead className="min-w-[120px]">Method</TableHead>
                  <TableHead className="min-w-[100px]">Amount</TableHead>
                  <TableHead className="min-w-[100px]">Fee</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">Risk</TableHead>
                  <TableHead className="min-w-[100px]">Type</TableHead>
                  <TableHead className="min-w-[100px]">Country</TableHead>
                  <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    className={selectedRows.includes(transaction.id) ? "bg-muted/50" : ""}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedRows.includes(transaction.id)}
                        onCheckedChange={() => handleRowSelect(transaction.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDate(transaction.date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{transaction.merchant}</span>
                        <span className="text-xs text-muted-foreground">{transaction.merchantId}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{transaction.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className="text-sm capitalize">{transaction.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {transaction.currency} {transaction.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground">
                        {transaction.currency} {transaction.fee.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getRiskBadge(transaction.riskScore)}
                        <span className="text-xs text-muted-foreground">{transaction.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{transaction.country}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
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
                          {transaction.status !== "flagged" ? (
                            <DropdownMenuItem onClick={() => flagTransaction(transaction.id)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Flag Transaction
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => unflagTransaction(transaction.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Remove Flag
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => blockMerchant(transaction.merchantId)} className="text-red-600">
                            <Settings className="h-4 w-4 mr-2" />
                            Block Merchant
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {transactions.length} transactions
            {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransactionReports;