
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Database, Shield, Bell, Globe, Save } from "lucide-react";

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure global system parameters</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Configuration
            </CardTitle>
            <CardDescription>Database connection and backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Database Host</label>
              <Input value="localhost:5432" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Connection Pool Size</label>
              <Input value="20" type="number" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Auto Backup</div>
                <div className="text-xs text-muted-foreground">Daily automated backups</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Status</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Authentication and security configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input value="30" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Login Attempts</label>
              <Input value="3" type="number" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground">Require 2FA for admin users</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">IP Whitelist</div>
                <div className="text-xs text-muted-foreground">Restrict admin access by IP</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>System alerts and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Transaction Alerts</div>
                <div className="text-xs text-muted-foreground">High-value transaction notifications</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Failed Payment Alerts</div>
                <div className="text-xs text-muted-foreground">Notify on payment failures</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">System Maintenance</div>
                <div className="text-xs text-muted-foreground">Scheduled maintenance notifications</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alert Email</label>
              <Input value="admin@paid.co.zw" type="email" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Platform Settings
            </CardTitle>
            <CardDescription>General platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Name</label>
              <Input value="paid.co.zw" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input value="support@paid.co.zw" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Currency</label>
              <Input value="USD" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Maintenance Mode</div>
                <div className="text-xs text-muted-foreground">Enable for system updates</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">v2.4.1</div>
              <div className="text-sm text-muted-foreground">Platform Version</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime (30 days)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2.1GB</div>
              <div className="text-sm text-muted-foreground">Database Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">245ms</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
