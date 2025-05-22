
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Home,
  Menu,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  LogOut,
  X,
  FileText as FileInvoice,
  Link as LinkIcon,
  ArrowLeftRight,
  Users,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { toast } from "sonner";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  children?: { title: string; href: string }[];
};

const mainNavItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    title: "Applications",
    icon: <Layers className="h-5 w-5" />,
    href: "/dashboard/applications",
  },
  {
    title: "My Business",
    icon: <Settings className="h-5 w-5" />,
    href: "/dashboard/business",
  },
  {
    title: "Reports",
    icon: <FileText className="h-5 w-5" />,
    href: "/dashboard/reports",
  },
  {
    title: "Payments",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/dashboard/payments",
    children: [
      { title: "Transactions", href: "/dashboard/payments/transactions" },
      { title: "Invoices", href: "/dashboard/payments/invoices" },
      { title: "Payment Links", href: "/dashboard/payments/links" },
      { title: "Payouts", href: "/dashboard/payments/payouts" },
      { title: "Transaction Fees", href: "/dashboard/payments/fees" },
    ],
  },
  {
    title: "User Manager",
    icon: <Users className="h-5 w-5" />,
    href: "/dashboard/users",
  },
  {
    title: "Sandbox",
    icon: <Layers className="h-5 w-5" />,
    href: "/dashboard/sandbox",
    children: [
      { title: "Test Payments", href: "/dashboard/sandbox/payments" },
      { title: "Test Transactions", href: "/dashboard/sandbox/transactions" },
    ],
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-brand-navy bg-gray-50 transition-colors duration-200">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b dark:border-gray-800 border-gray-200 px-4 h-16 dark:bg-secondary bg-white">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="ml-2">
            <span className="text-xl font-bold dark:text-white text-gray-900">
              paid<span className="text-brand-orange">.co.zw</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </header>
      
      {/* Sidebar for all screens */}
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex flex-col border-r dark:border-gray-800 border-gray-200 bg-white dark:bg-secondary w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar Header with Close Button for Mobile */}
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-800 border-gray-200">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold dark:text-white text-gray-900">
                paid<span className="text-brand-orange">.co.zw</span>
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {mainNavItems.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className={cn(
                          "flex items-center w-full px-2 py-2 rounded-md transition-colors",
                          location.pathname.startsWith(item.href)
                            ? "bg-brand-orange/10 text-brand-orange"
                            : "hover:bg-brand-orange/5 hover:text-brand-orange dark:hover:bg-brand-orange/10"
                        )}
                      >
                        {item.icon}
                        <span className="ml-3 flex-1 text-left">{item.title}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems[item.title] && "rotate-180"
                          )}
                        />
                      </button>
                      {expandedItems[item.title] && (
                        <ul className="pl-6 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                to={child.href}
                                className={cn(
                                  "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                                  location.pathname === child.href
                                    ? "bg-brand-orange/10 text-brand-orange"
                                    : "hover:bg-brand-orange/5 hover:text-brand-orange dark:hover:bg-brand-orange/10"
                                )}
                                onClick={() => setIsSidebarOpen(false)}
                              >
                                <div className="w-1 h-1 rounded-full bg-current mr-2" />
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-2 py-2 rounded-md transition-colors",
                        location.pathname === item.href
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "hover:bg-brand-orange/5 hover:text-brand-orange dark:hover:bg-brand-orange/10"
                      )}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t dark:border-gray-800 border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
                  ZP
                </div>
                <div className="ml-2">
                  <div className="font-medium dark:text-white text-gray-900">Zimbabwe Payments</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
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
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Desktop Header */}
          <header className="hidden lg:flex h-16 items-center justify-between border-b dark:border-gray-800 border-gray-200 px-4 dark:bg-secondary bg-white">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
              <ThemeToggle />
              <Button variant="outline" size="sm">Upgrade</Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
