
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
import Reports from "./pages/dashboard/Reports";
import Transactions from "./pages/dashboard/payments/Transactions";
import PaymentLinks from "./pages/dashboard/payments/PaymentLinks";
import Invoices from "./pages/dashboard/payments/Invoices";
import Payouts from "./pages/dashboard/payments/Payouts";
import Fees from "./pages/dashboard/payments/Fees";
import Applications from "./pages/dashboard/Applications";
import Business from "./pages/dashboard/Business";
import Users from "./pages/dashboard/Users";
import AccountSettings from "./pages/dashboard/AccountSettings";
import UserManager from "./pages/dashboard/UserManager";
import UserGroups from "./pages/dashboard/UserGroups";
import Sandbox from "./pages/dashboard/sandbox/Sandbox";
import SandboxPayments from "./pages/dashboard/sandbox/SandboxPayments";
import SandboxTransactions from "./pages/dashboard/sandbox/SandboxTransactions";

// Creator Pages
import CreatorDashboard from "./pages/dashboard/creators/CreatorDashboard";
import CreatorProfile from "./pages/dashboard/creators/CreatorProfile";

// Auth Pages
import AuthLayout from "./pages/auth/AuthLayout";
import AuthPage from "./pages/auth/AuthPage"; 
import ForgotPassword from "./pages/auth/ForgotPassword";
import Onboarding from "./pages/onboarding/Onboarding";

// Super Admin Pages
import SuperAdminLayout from "./pages/super-admin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import Merchants from "./pages/super-admin/Merchants";
import PendingMerchants from "./pages/super-admin/PendingMerchants";
import UsersManagement from "./pages/super-admin/UsersManagement";
import AdminUsers from "./pages/super-admin/AdminUsers";
import PaymentMethods from "./pages/super-admin/PaymentMethods";
import FeeStructure from "./pages/super-admin/FeeStructure";
import SuperAdminTransactions from "./pages/super-admin/Transactions";
import FinancialReports from "./pages/super-admin/FinancialReports";
import TransactionReports from "./pages/super-admin/TransactionReports";
import Analytics from "./pages/super-admin/Analytics";
import ActivityLogs from "./pages/super-admin/ActivityLogs";
import Permissions from "./pages/super-admin/Permissions";
import SystemSettings from "./pages/super-admin/SystemSettings";

import CreatorPayment from "./pages/creators/CreatorPayment";

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
            
            {/* Public Creator Payment Routes */}
            <Route path="/creator/:creatorId/pay/:linkId" element={<CreatorPayment />} />
            <Route path="/pay/:linkId" element={<CreatorPayment />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<AuthPage />} />
              <Route path="signup" element={<AuthPage />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* Onboarding Route */}
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardRoot />}>
              <Route index element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              
              {/* Creator Routes */}
              <Route path="creator">
                <Route index element={<CreatorDashboard />} />
                <Route path="profile" element={<CreatorProfile />} />
              </Route>
              
              {/* Payments Routes */}
              <Route path="payments">
                <Route index element={<Navigate to="/dashboard/payments/transactions" replace />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="links" element={<PaymentLinks />} />
                <Route path="payouts" element={<Payouts />} />
                <Route path="fees" element={<Fees />} />
              </Route>
              
              {/* Other Dashboard Routes */}
              <Route path="applications" element={<Applications />} />
              <Route path="business" element={<Business />} />
              <Route path="users" element={<Users />} />
              <Route path="user-manager" element={<UserManager />} />
              <Route path="user-groups" element={<UserGroups />} />
              
              {/* Sandbox Routes */}
              <Route path="sandbox">
                <Route index element={<Sandbox />} />
                <Route path="payments" element={<SandboxPayments />} />
                <Route path="transactions" element={<SandboxTransactions />} />
              </Route>
            </Route>
            
            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<SuperAdminDashboard />} />
              <Route path="merchants" element={<Merchants />} />
              <Route path="merchants/pending" element={<PendingMerchants />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="users/admins" element={<AdminUsers />} />
              <Route path="payments/methods" element={<PaymentMethods />} />
              <Route path="payments/fees" element={<FeeStructure />} />
              <Route path="payments/transactions" element={<SuperAdminTransactions />} />
              <Route path="reports/financial" element={<FinancialReports />} />
              <Route path="reports/transaction" element={<TransactionReports />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="security/logs" element={<ActivityLogs />} />
              <Route path="security/permissions" element={<Permissions />} />
              <Route path="settings" element={<SystemSettings />} />
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
