
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  CreditCard,
  FileText,
  Settings,
  ChevronRight,
  LogOut,
  BarChart,
  ShieldAlert,
  Globe,
  Lock,
  Building,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";

const SuperAdminLayout = () => {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar variant="sidebar">
          <SidebarHeader>
            <Link to="/super-admin" className="flex items-center">
              <span className="text-2xl font-bold text-brand-orange">
                Super Admin
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/super-admin"}
                  tooltip="Dashboard"
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/merchants")}
                  tooltip="Merchants"
                >
                  <Building className="w-5 h-5" />
                  <span>Merchants</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/merchants"}
                      href="/super-admin/merchants"
                    >
                      All Merchants
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/merchants/pending"}
                      href="/super-admin/merchants/pending"
                    >
                      Pending Approvals
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/users")}
                  tooltip="Users"
                >
                  <Users className="w-5 h-5" />
                  <span>Users Management</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/users"}
                      href="/super-admin/users"
                    >
                      All Users
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/users/admins"}
                      href="/super-admin/users/admins"
                    >
                      Admin Users
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/payments")}
                  tooltip="Payments"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Payment System</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/payments/methods"}
                      href="/super-admin/payments/methods"
                    >
                      Payment Methods
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/payments/fees"}
                      href="/super-admin/payments/fees"
                    >
                      Fee Structure
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/payments/transactions"}
                      href="/super-admin/payments/transactions"
                    >
                      Transactions
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/reports")}
                  tooltip="Reports"
                >
                  <FileText className="w-5 h-5" />
                  <span>Reports</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/reports/financial"}
                      href="/super-admin/reports/financial"
                    >
                      Financial Reports
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/reports/transaction"}
                      href="/super-admin/reports/transaction"
                    >
                      Transaction Reports
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/analytics")}
                  tooltip="Analytics"
                >
                  <BarChart className="w-5 h-5" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/security")}
                  tooltip="Security"
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>Security</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/security/logs"}
                      href="/super-admin/security/logs"
                    >
                      Activity Logs
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      isActive={location.pathname === "/super-admin/security/permissions"}
                      href="/super-admin/security/permissions"
                    >
                      Permissions
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.startsWith("/super-admin/settings")}
                  tooltip="Settings"
                >
                  <Settings className="w-5 h-5" />
                  <span>System Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
                    SA
                  </div>
                  <div className="ml-2">
                    <div className="font-medium text-foreground">Super Admin</div>
                    <div className="text-xs text-muted-foreground">admin@paid.co.zw</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-muted/40">
          <div className="flex flex-col h-full">
            <header className="h-16 flex items-center justify-between border-b px-4 bg-background">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="ml-4 font-semibold text-lg">Super Admin Dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminLayout;
