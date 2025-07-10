import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import SimpleThanosEffect from "@/components/effects/SimpleThanosEffect";

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDisintegrating, setIsDisintegrating] = useState(false);

  const handleLogout = () => {
    setIsDisintegrating(true);
  };

  const completeLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const sidebarLinks = [
    { name: "Dashboard", path: "/super-admin" },
    { name: "Merchants", path: "/super-admin/merchants" },
    { name: "Pending Merchants", path: "/super-admin/merchants/pending" },
    { name: "Users Management", path: "/super-admin/users" },
    { name: "Admin Users", path: "/super-admin/users/admins" },
    { name: "Payment Methods", path: "/super-admin/payments/methods" },
    { name: "Fee Structure", path: "/super-admin/payments/fees" },
    { name: "Transactions", path: "/super-admin/payments/transactions" },
    { name: "Financial Reports", path: "/super-admin/reports/financial" },
    { name: "Transaction Reports", path: "/super-admin/reports/transaction" },
    { name: "Analytics", path: "/super-admin/analytics" },
    { name: "Activity Logs", path: "/super-admin/security/logs" },
    { name: "Permissions", path: "/super-admin/security/permissions" },
    { name: "System Settings", path: "/super-admin/settings" },
  ];

  return (
    <SimpleThanosEffect active={isDisintegrating} onComplete={completeLogout} duration={2000}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white ml-2">
                paid<span className="text-orange-500">.co.zw</span> <span className="text-sm font-normal text-slate-500">Admin</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                paid<span className="text-orange-500">.co.zw</span> <span className="text-sm font-normal text-slate-500">Admin</span>
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Sidebar Content */}
            <div className="overflow-y-auto h-full py-4">
              <ul className="space-y-1 px-2">
                {sidebarLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sidebar Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </aside>
          
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Desktop Header */}
            <header className="hidden lg:flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                paid<span className="text-orange-500">.co.zw</span> <span className="text-sm font-normal text-slate-500">Admin</span>
              </h1>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SimpleThanosEffect>
  );
};

export default SuperAdminLayout;
