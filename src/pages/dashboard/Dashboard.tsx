
import React from "react";
import {
  ArrowUp,
  ArrowDown,
  CreditCard,
  Users,
  ArrowLeftRight,
  MoreHorizontal,
  FileInvoice,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, Zimbabwe Payments
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline">Export</Button>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            New Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400 text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white text-gray-900">$45,231.89</div>
            <div className="flex items-center pt-1 space-x-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+20.1%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400 text-gray-500">
              Transactions
            </CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white text-gray-900">+2,350</div>
            <div className="flex items-center pt-1 space-x-1">
              <ArrowDown className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-500">-3.2%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400 text-gray-500">
              Active Customers
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white text-gray-900">+573</div>
            <div className="flex items-center pt-1 space-x-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+12.4%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400 text-gray-500">
              Active Payment Links
            </CardTitle>
            <LinkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white text-gray-900">29</div>
            <div className="flex items-center pt-1 space-x-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+7.8%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    transaction.type === "credit" 
                      ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
                      : "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  }`}>
                    {transaction.type === "credit" ? (
                      <ArrowDown className="h-4 w-4" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium dark:text-white text-gray-900">{transaction.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</div>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === "credit" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View all transactions <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment Methods</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium dark:text-white text-gray-900">{method.name}</div>
                    <div className="flex items-center">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full">
                        <div 
                          className="h-full bg-brand-orange rounded-full" 
                          style={{ width: `${method.percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{method.percentage}%</span>
                    </div>
                  </div>
                  <div className="font-medium dark:text-white text-gray-900">
                    ${method.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const recentTransactions = [
  {
    name: "EcoCash Payment",
    date: "2 minutes ago",
    amount: "250.00",
    type: "credit"
  },
  {
    name: "OneMoney Transfer",
    date: "2 hours ago",
    amount: "100.00",
    type: "credit"
  },
  {
    name: "Payout to Bank",
    date: "3 hours ago",
    amount: "340.00",
    type: "debit"
  },
  {
    name: "InnBucks Payment",
    date: "5 hours ago",
    amount: "125.00",
    type: "credit"
  },
];

const paymentMethods = [
  {
    name: "EcoCash",
    percentage: 45,
    amount: "20,429.50",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: "ZimSwitch",
    percentage: 30,
    amount: "13,550.25",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: "Visa/MasterCard",
    percentage: 15,
    amount: "6,775.10",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: "Other Methods",
    percentage: 10,
    amount: "4,517.04",
    icon: <CreditCard className="h-4 w-4" />,
  },
];

export default Dashboard;
