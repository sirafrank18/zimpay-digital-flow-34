
import React from "react";
import {
  CreditCard,
  Home,
  FileText,
  Settings,
  Layers,
  Users,
  Shield,
  Heart,
  Star,
} from "lucide-react";

export type MenuItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  children?: { title: string; href: string }[];
};

export const mainNavItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    title: "Creator Hub",
    icon: <Star className="h-5 w-5" />,
    href: "/dashboard/creator",
    children: [
      { title: "Creator Dashboard", href: "/dashboard/creator" },
      { title: "Creator Profile", href: "/dashboard/creator/profile" },
    ],
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
      { title: "View All Transactions", href: "/dashboard/payments/transactions" },
      { title: "Invoices", href: "/dashboard/payments/invoices" },
      { title: "Payment Links", href: "/dashboard/payments/links" },
      { title: "Creator Payment Link", href: "/dashboard/creator-payment" },
      { title: "Payouts", href: "/dashboard/payments/payouts" },
      { title: "Transaction Fees", href: "/dashboard/payments/fees" },
    ],
  },
  {
    title: "User Manager",
    icon: <Users className="h-5 w-5" />,
    href: "/dashboard/user-manager",
    children: [
      { title: "Manage Users", href: "/dashboard/users" },
      { title: "User Groups", href: "/dashboard/user-groups" },
    ],
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
