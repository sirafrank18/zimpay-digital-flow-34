
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CreditCard, 
  BarChart3,
  PieChart,
  Download,
  Calendar
} from "lucide-react";

const Analytics = () => {
  const performanceMetrics = [
    { title: "Total Revenue", value: "$2.4M", change: "+18.2%", trend: "up", period: "vs last month" },
    { title: "Transaction Volume", value: "45,231", change: "+12.5%", trend: "up", period: "vs last month" },
    { title: "Active Merchants", value: "5,274", change: "+8.1%", trend: "up", period: "vs last month" },
    { title: "Success Rate", value: "98.7%", change: "+0.3%", trend: "up", period: "vs last month" },
  ];

  const topMerchants = [
    { name: "TechCorp Solutions", revenue: "$245,680", transactions: 2156, growth: "+15%" },
    { name: "Fashion Hub", revenue: "$189,420", transactions: 1834, growth: "+22%" },
    { name: "Food Express", revenue: "$167,350", transactions: 2890, growth: "+8%" },
    { name: "Auto Parts Ltd", revenue: "$134,200", transactions: 892, growth: "-3%" },
    { name: "Health Plus", revenue: "$123,890", transactions: 1245, growth: "+19%" },
  ];

  const paymentMethodStats = [
    { method: "EcoCash", percentage: 42, volume: "$1.01M", color: "bg-green-500" },
    { method: "Visa Cards", percentage: 28, volume: "$672K", color: "bg-blue-500" },
    { method: "Mastercard", percentage: 18, volume: "$432K", color: "bg-orange-500" },
    { method: "OneMoney", percentage: 12, volume: "$288K", color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive platform performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
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
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the past 12 months</CardDescription>
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
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethodStats.map((method, index) => (
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
                      <div className="text-xs text-muted-foreground">{method.volume}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Metrics</CardTitle>
              <CardDescription>Live platform statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$12,450</div>
                  <div className="text-sm text-muted-foreground">Today's Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">234</div>
                  <div className="text-sm text-muted-foreground">Active Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">456</div>
                  <div className="text-sm text-muted-foreground">Today's Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">98.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Merchants</CardTitle>
              <CardDescription>Merchants ranked by revenue and transaction volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMerchants.map((merchant, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{merchant.name}</div>
                        <div className="text-sm text-muted-foreground">{merchant.transactions} transactions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{merchant.revenue}</div>
                      <Badge variant={merchant.growth.startsWith('+') ? 'default' : 'destructive'}>
                        {merchant.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Analytics</CardTitle>
              <CardDescription>Detailed payment method performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment analytics content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Transaction volume by location</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Geographic analytics content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
