
import React, { useState } from "react";
import {
  FileText,
  Filter,
  Download,
  Calendar,
  ArrowDownToLine,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [reportType, setReportType] = useState("transactions");
  const [fileFormat, setFileFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("last30days");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const generateReport = () => {
    toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated in ${fileFormat.toUpperCase()} format`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Generate and download transaction reports
          </p>
        </div>
        <Button
          onClick={generateReport}
          className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex gap-2"
        >
          <Download className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="standard">Standard Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Choose report type and format to generate standard reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select
                    value={reportType}
                    onValueChange={setReportType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transactions">Transactions</SelectItem>
                      <SelectItem value="payments">Payments</SelectItem>
                      <SelectItem value="settlements">Settlements</SelectItem>
                      <SelectItem value="fees">Transaction Fees</SelectItem>
                      <SelectItem value="customers">Customer Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>File Format</Label>
                  <Select
                    value={fileFormat}
                    onValueChange={setFileFormat}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select file format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select
                    value={dateRange}
                    onValueChange={setDateRange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                      <SelectItem value="lastMonth">Last Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {dateRange === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <div className="flex items-center">
                      <Input type="date" className="w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="flex items-center">
                      <Input type="date" className="w-full" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>
                Apply filters to refine your report data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Status</h3>
                  <div className="space-y-2">
                    {["Successful", "Failed", "Pending", "Refunded"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${status.toLowerCase()}`} 
                          checked={selectedFilters.includes(`status-${status.toLowerCase()}`)}
                          onCheckedChange={() => handleFilterToggle(`status-${status.toLowerCase()}`)}
                        />
                        <Label htmlFor={`status-${status.toLowerCase()}`}>{status}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="space-y-2">
                    {["EcoCash", "OneMoney", "InnBucks", "ZimSwitch", "Card", "Bank Transfer"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`method-${method.toLowerCase().replace(/\s/g, '-')}`}
                          checked={selectedFilters.includes(`method-${method.toLowerCase().replace(/\s/g, '-')}`)}
                          onCheckedChange={() => handleFilterToggle(`method-${method.toLowerCase().replace(/\s/g, '-')}`)}
                        />
                        <Label htmlFor={`method-${method.toLowerCase().replace(/\s/g, '-')}`}>{method}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Transaction Type</h3>
                  <div className="space-y-2">
                    {["Payment", "Payout", "Refund", "Fee Deduction", "Adjustment"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${type.toLowerCase().replace(/\s/g, '-')}`}
                          checked={selectedFilters.includes(`type-${type.toLowerCase().replace(/\s/g, '-')}`)}
                          onCheckedChange={() => handleFilterToggle(`type-${type.toLowerCase().replace(/\s/g, '-')}`)}
                        />
                        <Label htmlFor={`type-${type.toLowerCase().replace(/\s/g, '-')}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setSelectedFilters([])}>
                Reset Filters
              </Button>
              <Button 
                onClick={generateReport}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>
                Design your own custom report with specific fields and filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label>Report Name</Label>
                <Input placeholder="Enter report name" className="mt-1" />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Select Fields to Include</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Transaction ID", "Date & Time", "Customer Name", "Customer Email",
                    "Amount", "Currency", "Status", "Payment Method", "Reference Number",
                    "Description", "Fees", "Settlement Date"
                  ].map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox id={`field-${field.toLowerCase().replace(/\s|&/g, '-')}`} defaultChecked />
                      <Label htmlFor={`field-${field.toLowerCase().replace(/\s|&/g, '-')}`}>{field}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                onClick={() => toast.success("Custom report template saved")}
              >
                Save Report Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Set up automated report generation on a schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Template</Label>
                    <Select defaultValue="daily-transactions">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily-transactions">Daily Transactions Summary</SelectItem>
                        <SelectItem value="weekly-revenue">Weekly Revenue Report</SelectItem>
                        <SelectItem value="monthly-settlements">Monthly Settlements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Email Recipients</Label>
                  <Input placeholder="Enter email addresses (separated by commas)" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-attachment" defaultChecked />
                  <Label htmlFor="include-attachment">Include report as attachment</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                onClick={() => toast.success("Scheduled report has been set up")}
              >
                Schedule Report
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={cn("border-l-4 border-green-500")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Daily Transactions Summary</CardTitle>
                <CardDescription>Runs at 23:59 every day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1">
                  <FileText className="h-3 w-3" />
                  <span>PDF format</span>
                  <span className="mx-1">•</span>
                  <Calendar className="h-3 w-3" />
                  <span>Last run: Today</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
                  Delete
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={cn("border-l-4 border-blue-500")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weekly Revenue Report</CardTitle>
                <CardDescription>Runs every Monday at 06:00</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1">
                  <FileText className="h-3 w-3" />
                  <span>Excel format</span>
                  <span className="mx-1">•</span>
                  <Calendar className="h-3 w-3" />
                  <span>Last run: 3 days ago</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
