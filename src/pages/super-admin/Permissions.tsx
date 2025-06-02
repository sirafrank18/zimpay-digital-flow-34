
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Settings, CreditCard, FileText, Eye } from "lucide-react";

const Permissions = () => {
  const rolePermissions = [
    {
      role: "Super Admin",
      description: "Full system access and control",
      userCount: 1,
      permissions: {
        merchant_management: true,
        user_management: true,
        financial_reports: true,
        system_settings: true,
        security_logs: true,
        fee_configuration: true
      }
    },
    {
      role: "Admin",
      description: "Standard administrative access",
      userCount: 3,
      permissions: {
        merchant_management: true,
        user_management: false,
        financial_reports: true,
        system_settings: false,
        security_logs: true,
        fee_configuration: false
      }
    },
    {
      role: "Support Admin",
      description: "Customer and merchant support",
      userCount: 2,
      permissions: {
        merchant_management: true,
        user_management: false,
        financial_reports: false,
        system_settings: false,
        security_logs: false,
        fee_configuration: false
      }
    }
  ];

  const permissionCategories = [
    { name: "Merchant Management", icon: <Users className="h-4 w-4" />, description: "Approve, suspend, and manage merchants" },
    { name: "User Management", icon: <Shield className="h-4 w-4" />, description: "Manage admin users and permissions" },
    { name: "Financial Reports", icon: <FileText className="h-4 w-4" />, description: "Access financial data and reports" },
    { name: "System Settings", icon: <Settings className="h-4 w-4" />, description: "Configure system-wide settings" },
    { name: "Security Logs", icon: <Eye className="h-4 w-4" />, description: "View activity logs and security events" },
    { name: "Fee Configuration", icon: <CreditCard className="h-4 w-4" />, description: "Modify payment processing fees" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Permissions Management</h1>
          <p className="text-muted-foreground">Configure role-based access control</p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Create New Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Categories</CardTitle>
          <CardDescription>Available permissions and their descriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {permissionCategories.map((category, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">{category.icon}</div>
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Role Configuration</h2>
        {rolePermissions.map((role, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {role.role}
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                <Badge variant="secondary">{role.userCount} users</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Merchant Management</span>
                  </div>
                  <Switch checked={role.permissions.merchant_management} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">User Management</span>
                  </div>
                  <Switch checked={role.permissions.user_management} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Financial Reports</span>
                  </div>
                  <Switch checked={role.permissions.financial_reports} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">System Settings</span>
                  </div>
                  <Switch checked={role.permissions.system_settings} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Security Logs</span>
                  </div>
                  <Switch checked={role.permissions.security_logs} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Fee Configuration</span>
                  </div>
                  <Switch checked={role.permissions.fee_configuration} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button variant="outline" size="sm">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Permissions;
