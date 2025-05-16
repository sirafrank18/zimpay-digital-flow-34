
import React from "react";
import { Beaker, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Sandbox = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white text-gray-900">Sandbox Environment</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Test your integrations in a safe environment
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 flex gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <div className="text-yellow-800 dark:text-yellow-200">
          <h3 className="font-medium">Sandbox Mode Active</h3>
          <p className="text-sm">
            You are in the sandbox environment. No real transactions will be processed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Test Payments</CardTitle>
            <CardDescription>Simulate payment flows and test integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 dark:text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Test payment links and checkout pages
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 dark:text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Simulate successful and failed payments
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 dark:text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Test webhook deliveries
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/dashboard/sandbox/payments")}
              className="w-full justify-between bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              Test Payments <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Test Transactions</CardTitle>
            <CardDescription>View and manage test transaction records</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 dark:text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Review test transaction details
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 dark:text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Test refund flows
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600 dark:text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Practice reconciliation
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/dashboard/sandbox/transactions")}
              className="w-full justify-between bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              View Test Transactions <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Testing</CardTitle>
          <CardDescription>Test your API integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h3 className="font-mono text-sm mb-1">API Base URL (Sandbox)</h3>
              <div className="flex items-center">
                <code className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 p-2 rounded flex-1 overflow-x-auto font-mono">
                  https://api.sandbox.paid.co.zw/v1/
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText("https://api.sandbox.paid.co.zw/v1/");
                    toast.success("API URL copied to clipboard");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h3 className="font-mono text-sm mb-1">Sandbox Secret Key</h3>
              <div className="flex items-center">
                <code className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 p-2 rounded flex-1 overflow-x-auto font-mono">
                  sk_sandbox_b3VyIHNlY3JldCBrZXk=
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText("sk_sandbox_b3VyIHNlY3JldCBrZXk=");
                    toast.success("Secret key copied to clipboard");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open("https://developers.paid.co.zw", "_blank")}
          >
            View API Documentation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Sandbox;
