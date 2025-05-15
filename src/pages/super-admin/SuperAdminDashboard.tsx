
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import {
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Download,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and key performance indicators</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button size="sm">
            View All Analytics
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,274</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +12% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center text-sm text-yellow-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +8 from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$853,128.40</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,341.50</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              -5.2% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
            <CardDescription>
              Transaction volume over the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-80 w-full">
              {/* We would typically use an actual chart library here like Recharts */}
              <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
                <BarChartIcon className="h-16 w-16 text-muted" />
                <span className="ml-2 text-muted font-medium">Transaction Volume Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Distribution by payment type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              {/* We would typically use an actual chart library here like Recharts */}
              <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
                <PieChartIcon className="h-16 w-16 text-muted" />
                <span className="ml-2 text-muted font-medium">Payment Methods Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest system and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Activity list would go here */}
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">Merchant Onboarding {i + 1}</p>
                      <p className="text-sm text-muted-foreground">Approved by Admin</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Items waiting for your review
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Approval items would go here */}
              <p>Pending approval content</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Important system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Alerts would go here */}
              <p>System alerts content</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
