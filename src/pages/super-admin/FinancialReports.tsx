
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  FileText
} from "lucide-react";

const FinancialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const financialMetrics = [
    { title: "Total Revenue", value: "$124,580", change: "+18.2%", trend: "up", period: "This month" },
    { title: "Transaction Fees", value: "$45,230", change: "+12.5%", trend: "up", period: "This month" },
    { title: "Active Merchants", value: "5,274", change: "+8.1%", trend: "up", period: "This month" },
    { title: "Avg. Transaction", value: "$187.50", change: "-2.3%", trend: "down", period: "This month" },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 89500, fees: 31200, transactions: 2890 },
    { month: "Feb", revenue: 95200, fees: 33800, transactions: 3120 },
    { month: "Mar", revenue: 102300, fees: 36100, transactions: 3450 },
    { month: "Apr", revenue: 108900, fees: 38200, transactions: 3680 },
    { month: "May", revenue: 118700, fees: 41500, transactions: 3920 },
    { month: "Jun", revenue: 124580, fees: 45230, transactions: 4150 },
  ];

  const paymentMethodBreakdown = [
    { method: "EcoCash", revenue: "$52,400", percentage: 42.1, color: "bg-green-500" },
    { method: "Visa Cards", revenue: "$34,800", percentage: 27.9, color: "bg-blue-500" },
    { method: "Mastercard", revenue: "$22,400", percentage: 18.0, color: "bg-orange-500" },
    { method: "OneMoney", revenue: "$14,980", percentage: 12.0, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">Comprehensive financial analytics and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {financialMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-sm ${
                metric.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                <span>{metric.change}</span>
                <span className="ml-1 text-muted-foreground">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="merchants">Merchant Performance</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and fee collection over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-80 w-full">
                  <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
                    <BarChart3 className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted font-medium">Revenue Chart</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethodBreakdown.map((method, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{method.method}</span>
                        <span className="font-medium">{method.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${method.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${method.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">{method.revenue}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>Current month performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Gross Revenue</span>
                  <span className="font-medium">$124,580</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Platform Fees</span>
                  <span className="font-medium">$45,230</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Merchant Payouts</span>
                  <span className="font-medium">$79,350</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Net Platform Revenue</span>
                  <span className="font-bold text-green-600">$45,230</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Metrics</CardTitle>
                <CardDescription>Volume and success rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Transactions</span>
                  <span className="font-medium">4,150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Successful</span>
                  <span className="font-medium text-green-600">4,089 (98.5%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Failed</span>
                  <span className="font-medium text-red-600">61 (1.5%)</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Avg. Transaction Value</span>
                  <span className="font-bold">$187.50</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Indicators</CardTitle>
                <CardDescription>Month-over-month changes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Revenue Growth</span>
                  <Badge className="bg-green-100 text-green-800">+18.2%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Transaction Volume</span>
                  <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">New Merchants</span>
                  <Badge className="bg-blue-100 text-blue-800">+8.1%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Value</span>
                  <Badge className="bg-red-100 text-red-800">-2.3%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Revenue analysis content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Performance</CardTitle>
              <CardDescription>Top performing merchants and revenue contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Merchant performance content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method Analysis</CardTitle>
              <CardDescription>Performance comparison across payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment method analysis content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReports;
