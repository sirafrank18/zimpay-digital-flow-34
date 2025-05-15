
import React from "react";
import {
  BarChart,
  Users,
  Building,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for charts
const transactionsData = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 52000 },
  { name: "Mar", value: 49000 },
  { name: "Apr", value: 63000 },
  { name: "May", value: 58000 },
  { name: "Jun", value: 71000 },
  { name: "Jul", value: 75000 }
];

const paymentMethodData = [
  { name: "EcoCash", value: 45 },
  { name: "OneMoney", value: 15 },
  { name: "Cards", value: 25 },
  { name: "Bank Transfer", value: 15 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const merchantStatusData = [
  { name: "Jan", active: 23, pending: 12, suspended: 4 },
  { name: "Feb", active: 28, pending: 10, suspended: 3 },
  { name: "Mar", active: 32, pending: 8, suspended: 2 },
  { name: "Apr", active: 38, pending: 9, suspended: 5 },
  { name: "May", active: 42, pending: 7, suspended: 4 },
  { name: "Jun", active: 48, pending: 5, suspended: 3 },
  { name: "Jul", active: 52, pending: 6, suspended: 2 }
];

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            Last 30 days
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$123,456</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Merchants</CardTitle>
            <Building className="h-4 w-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">
              +8 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              +32.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Total revenue across all payment methods over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={transactionsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7300" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF7300" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{fill: '#888'}} />
                  <YAxis tick={{fill: '#888'}} />
                  <Tooltip contentStyle={{background: '#222', border: 'none'}} />
                  <Area type="monotone" dataKey="value" stroke="#FF7300" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>System alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">New merchant approval required</p>
                    <p className="text-xs text-muted-foreground">Zimbabwe Tech Ltd. awaiting verification</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Payment method integration successful</p>
                    <p className="text-xs text-muted-foreground">OneMoney API connected successfully</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Failed login attempts detected</p>
                    <p className="text-xs text-muted-foreground">Multiple attempts from IP 192.168.1.45</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-brand-orange mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Transaction volume spike detected</p>
                    <p className="text-xs text-muted-foreground">30% increase in last hour</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View all activity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="merchants">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Status Overview</CardTitle>
              <CardDescription>Active, pending, and suspended merchants</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={merchantStatusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{fill: '#888'}} />
                  <YAxis tick={{fill: '#888'}} />
                  <Tooltip contentStyle={{background: '#222', border: 'none'}} />
                  <Legend />
                  <Bar dataKey="active" stackId="a" fill="#4CAF50" />
                  <Bar dataKey="pending" stackId="a" fill="#FFC107" />
                  <Bar dataKey="suspended" stackId="a" fill="#F44336" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Daily transaction volume over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={transactionsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2196F3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{fill: '#888'}} />
                  <YAxis tick={{fill: '#888'}} />
                  <Tooltip contentStyle={{background: '#222', border: 'none'}} />
                  <Area type="monotone" dataKey="value" stroke="#2196F3" fillOpacity={1} fill="url(#colorTransactions)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Recent Registrations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Merchant Registrations</CardTitle>
          <CardDescription>New businesses onboarded to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Harare Tech Solutions', date: '2023-05-12', status: 'Approved' },
              { name: 'Bulawayo Retail Group', date: '2023-05-11', status: 'Pending' },
              { name: 'Victoria Falls Tours', date: '2023-05-09', status: 'Approved' },
              { name: 'Mutare Digital Services', date: '2023-05-07', status: 'Pending' },
            ].map((merchant) => (
              <div key={merchant.name} className="flex items-center justify-between border-b border-muted pb-4">
                <div>
                  <p className="font-medium">{merchant.name}</p>
                  <p className="text-sm text-muted-foreground">Registered on {merchant.date}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    merchant.status === 'Approved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                  }`}>
                    {merchant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <Button variant="ghost">Export List</Button>
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
