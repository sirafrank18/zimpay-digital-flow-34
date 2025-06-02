
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Shield, User, CreditCard, Settings } from "lucide-react";

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const activities = [
    { id: 1, user: "John Smith", action: "Approved merchant application", target: "TechCorp Solutions", timestamp: "2024-06-02 15:30:45", type: "approval", ip: "192.168.1.100" },
    { id: 2, user: "Sarah Johnson", action: "Updated fee structure", target: "EcoCash rates", timestamp: "2024-06-02 14:25:12", type: "configuration", ip: "192.168.1.101" },
    { id: 3, user: "System", action: "Failed transaction alert", target: "TXN001236", timestamp: "2024-06-02 14:20:33", type: "system", ip: "Internal" },
    { id: 4, user: "Mike Davis", action: "Reviewed merchant documents", target: "Fashion Hub", timestamp: "2024-06-02 13:45:22", type: "review", ip: "192.168.1.102" },
    { id: 5, user: "Lisa Brown", action: "Generated financial report", target: "Monthly Summary", timestamp: "2024-06-02 12:30:15", type: "report", ip: "192.168.1.103" },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "approval": return <Shield className="h-4 w-4 text-green-600" />;
      case "configuration": return <Settings className="h-4 w-4 text-blue-600" />;
      case "system": return <CreditCard className="h-4 w-4 text-red-600" />;
      case "review": return <User className="h-4 w-4 text-yellow-600" />;
      case "report": return <Settings className="h-4 w-4 text-purple-600" />;
      default: return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "approval": "bg-green-100 text-green-800",
      "configuration": "bg-blue-100 text-blue-800",
      "system": "bg-red-100 text-red-800",
      "review": "bg-yellow-100 text-yellow-800",
      "report": "bg-purple-100 text-purple-800"
    };
    return <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <p className="text-muted-foreground">Monitor system and user activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Events</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Automated actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Admin Actions</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Manual interventions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No alerts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>Recent system and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(activity.type)}
                      {activity.action}
                    </div>
                  </TableCell>
                  <TableCell>{activity.target}</TableCell>
                  <TableCell>{getTypeBadge(activity.type)}</TableCell>
                  <TableCell className="text-sm">{activity.timestamp}</TableCell>
                  <TableCell className="text-sm font-mono">{activity.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
