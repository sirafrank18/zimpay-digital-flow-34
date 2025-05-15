
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardRoot from "./pages/dashboard/DashboardRoot";
import Dashboard from "./pages/dashboard/Dashboard";

// Auth Pages
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Onboarding from "./pages/onboarding/Onboarding";

// Super Admin Pages
import SuperAdminLayout from "./pages/super-admin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* Onboarding Route */}
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardRoot />}>
              <Route index element={<Dashboard />} />
              {/* Other dashboard routes will be added here */}
            </Route>
            
            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<SuperAdminDashboard />} />
              {/* Add other super admin routes here */}
              <Route path="merchants" element={<div>Merchants Page</div>} />
              <Route path="merchants/pending" element={<div>Pending Merchants</div>} />
              <Route path="users" element={<div>Users Management</div>} />
              <Route path="users/admins" element={<div>Admin Users</div>} />
              <Route path="payments/methods" element={<div>Payment Methods</div>} />
              <Route path="payments/fees" element={<div>Fee Structure</div>} />
              <Route path="payments/transactions" element={<div>Transactions</div>} />
              <Route path="reports/financial" element={<div>Financial Reports</div>} />
              <Route path="reports/transaction" element={<div>Transaction Reports</div>} />
              <Route path="analytics" element={<div>Analytics</div>} />
              <Route path="security/logs" element={<div>Activity Logs</div>} />
              <Route path="security/permissions" element={<div>Permissions</div>} />
              <Route path="settings" element={<div>System Settings</div>} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
