
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, FileText, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";

const PendingMerchants = () => {
  const [pendingMerchants, setPendingMerchants] = useState([
    { 
      id: 1, 
      name: "Digital Solutions Ltd", 
      email: "admin@digitalsolutions.co.zw", 
      submittedDate: "2024-05-28", 
      businessType: "Technology", 
      documents: ["Business License", "Tax Certificate", "ID Copy"],
      priority: "high"
    },
    { 
      id: 2, 
      name: "Organic Foods Co", 
      email: "info@organicfoods.co.zw", 
      submittedDate: "2024-05-27", 
      businessType: "Food & Beverage", 
      documents: ["Business License", "Health Certificate"],
      priority: "medium"
    },
    { 
      id: 3, 
      name: "Mobile Repair Hub", 
      email: "support@mobilerepair.co.zw", 
      submittedDate: "2024-05-26", 
      businessType: "Electronics", 
      documents: ["Business License", "ID Copy"],
      priority: "low"
    },
    { 
      id: 4, 
      name: "Fashion Boutique", 
      email: "hello@fashionboutique.co.zw", 
      submittedDate: "2024-05-25", 
      businessType: "Retail", 
      documents: ["Business License", "Tax Certificate", "ID Copy", "Lease Agreement"],
      priority: "high"
    },
  ]);

  const handleApprove = (id: number, name: string) => {
    setPendingMerchants(prev => prev.filter(merchant => merchant.id !== id));
    toast.success(`${name} has been approved successfully`);
  };

  const handleReject = (id: number, name: string) => {
    setPendingMerchants(prev => prev.filter(merchant => merchant.id !== id));
    toast.error(`${name} application has been rejected`);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pending Merchant Approvals</h1>
          <p className="text-muted-foreground">Review and approve merchant applications</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800">
          <Clock className="w-4 h-4 mr-1" />
          {pendingMerchants.length} Pending
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingMerchants.filter(m => m.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Medium Priority</CardTitle>
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingMerchants.filter(m => m.priority === "medium").length}
            </div>
            <p className="text-xs text-muted-foreground">Review within 48 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Priority</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingMerchants.filter(m => m.priority === "low").length}
            </div>
            <p className="text-xs text-muted-foreground">Review within 1 week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Applications</CardTitle>
          <CardDescription>Review merchant applications and supporting documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant Details</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{merchant.name}</div>
                      <div className="text-sm text-muted-foreground">{merchant.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{merchant.businessType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{merchant.documents.length} documents</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(merchant.priority)}</TableCell>
                  <TableCell>{merchant.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(merchant.id, merchant.name)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(merchant.id, merchant.name)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingMerchants;
