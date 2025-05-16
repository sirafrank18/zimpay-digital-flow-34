
import React, { useState } from "react";
import { 
  Link, 
  QrCode, 
  Plus, 
  Copy, 
  MoreHorizontal, 
  Edit2, 
  Trash2,
  Download,
  Share2,
  BarChart2,
  ChevronDown,
  Clock,
  CheckCircle2,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const paymentLinks = [
  {
    id: "link-1",
    name: "Monthly Subscription",
    description: "Regular monthly payment for premium services",
    amount: 25.00,
    currency: "USD",
    url: "https://paid.co.zw/pay/monthly-sub",
    createdAt: "2023-05-10T14:30:00Z",
    status: "active",
    paymentsMade: 45,
    totalCollected: 1125.00,
    expiresAt: "2024-05-10T14:30:00Z"
  },
  {
    id: "link-2",
    name: "One-time Donation",
    description: "Support our community projects with a donation",
    amount: null,
    currency: "USD",
    url: "https://paid.co.zw/pay/donate",
    createdAt: "2023-04-15T09:45:00Z",
    status: "active",
    paymentsMade: 67,
    totalCollected: 2380.50,
    expiresAt: null
  },
  {
    id: "link-3",
    name: "Event Registration Fee",
    description: "Registration for the annual conference",
    amount: 150.00,
    currency: "USD",
    url: "https://paid.co.zw/pay/conference",
    createdAt: "2023-05-02T11:20:00Z",
    status: "expired",
    paymentsMade: 89,
    totalCollected: 13350.00,
    expiresAt: "2023-06-30T23:59:59Z"
  },
  {
    id: "link-4",
    name: "Product Purchase: Basic Package",
    description: "One-time payment for the basic software package",
    amount: 49.99,
    currency: "USD",
    url: "https://paid.co.zw/pay/basic-package",
    createdAt: "2023-05-08T16:15:00Z",
    status: "active",
    paymentsMade: 23,
    totalCollected: 1149.77,
    expiresAt: null
  },
  {
    id: "link-5",
    name: "Consultation Fee",
    description: "Payment for 1-hour consultation session",
    amount: 75.00,
    currency: "USD",
    url: "https://paid.co.zw/pay/consult",
    createdAt: "2023-05-12T10:30:00Z",
    status: "inactive",
    paymentsMade: 8,
    totalCollected: 600.00,
    expiresAt: null
  }
];

const PaymentLinks = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [showUSSDDialog, setShowUSSDDialog] = useState(false);

  const filteredLinks = paymentLinks.filter(link => {
    if (activeTab === "active" && link.status !== "active") return false;
    if (activeTab === "inactive" && link.status !== "inactive") return false;
    if (activeTab === "expired" && link.status !== "expired") return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        link.name.toLowerCase().includes(searchLower) ||
        link.description.toLowerCase().includes(searchLower) ||
        link.url.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  
  const handleStatusChange = (id: string, newStatus: boolean) => {
    toast.success(`Payment link status ${newStatus ? 'activated' : 'deactivated'}`);
  };

  const showQRCode = (link: any) => {
    setSelectedLink(link);
    setShowQRDialog(true);
  };

  const showUSSDCode = (link: any) => {
    setSelectedLink(link);
    setShowUSSDDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Payment Links</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and manage payment links, QR codes and USSD codes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Payment Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Payment Link</DialogTitle>
              <DialogDescription>
                Create a custom link for collecting payments from your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Link Name</Label>
                <Input id="name" placeholder="e.g. Monthly Subscription" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Describe what this payment is for" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input id="amount" type="number" className="pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="ZWL">ZWL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="expiry">Set Expiry Date</Label>
                  <Switch id="has-expiry" />
                </div>
                <Input id="expiry" type="date" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-url">Custom Link Path (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">paid.co.zw/pay/</span>
                  <Input id="custom-url" placeholder="my-payment" className="flex-1" />
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="ghost"
                onClick={() => toast.info("Create payment link dialog closed")}
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Payment link would be saved as draft")}
                >
                  Save as Draft
                </Button>
                <Button 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                  onClick={() => {
                    toast.success("Payment link created successfully!");
                  }}
                >
                  Create Link
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Links</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="w-full md:w-auto">
              <Input
                placeholder="Search payment links..."
                className="max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <TableRow key={link.id} className="group">
                    <TableCell>
                      <div>
                        <div className="font-medium">{link.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">
                          {link.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {link.amount ? (
                        <div className="font-medium">
                          {link.currency} {link.amount.toFixed(2)}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">Custom amount</div>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm text-gray-500">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <div className="font-medium">{link.paymentsMade} payments</div>
                        <div className="text-sm text-gray-500">
                          {link.currency} {link.totalCollected.toFixed(2)} total
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {link.status === "active" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </Badge>
                      ) : link.status === "expired" ? (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expired
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(link.url)}
                          title="Copy Link"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => showQRCode(link)}
                          title="Show QR Code"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => showUSSDCode(link)}
                          title="Show USSD Code"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.info("Edit payment link dialog would open")}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info("Payment link statistics would be shown")}>
                              <BarChart2 className="h-4 w-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(link.url)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info("Sharing options would be shown")}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {link.status !== "expired" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(link.id, link.status !== "active")}>
                                <div className="flex items-center">
                                  {link.status === "active" ? (
                                    <>
                                      <Clock className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </div>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => toast.info("Payment link would be deleted after confirmation")}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No payment links found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment QR Code</DialogTitle>
            <DialogDescription>
              {selectedLink?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="bg-white p-4 rounded-lg mb-4">
              {/* Simulated QR Code */}
              <div className="w-64 h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTTEgMWgxMHYxMEgxVjF6TTIxIDFoMTB2MTBIMjFWMXpNMSAyMWgxMHYxMEgxVjIxek0xMyA1aDJ2MmgtMlY1ek0xNCA3aDR2NGgtNFY3ek0xOSA3aDF2MWgtMVY3ek0xNCA5aDJ2MmgtMlY5ek0xNyAxMWgxdjFoLTFWMTF6TTAgMTNoMnYyaC0yVjEzek0zIDE0aDF2MUgzVjE0ek01IDEzaDJ2MUg1VjEzek0xMCAxM2gxdjFoLTFWMTN6TTIyIDE0aDJ2MmgtMlYxNHpNMjUgMTNoMXYxaC0xVjEzek0yOSAxM2gxdjFoLTFWMTN6TTMxIDE0aDF2MWgtMVYxNHpNMTMgMTRoMnYyaC0yVjE0ek0xNiAxNWgxdjFoLTE2VjE1ek0xOCAxNXYyaDJWMTV6TTIwIDE2djFoMXYtMXpNMjMgMTd2LTFoMXYxek0xNCAxN2gydjJoLTJWMTd6TTE3IDE4aDF2MWgtMVYxOHpNMTkgMTl2LTFoMXYxek0yMSAxOXYtMWgxdjF6TTEzIDE5aDF2MWgtMVYxOXpNMTUgMTloMXYxaC0xVjE5ek0xMyAyMWgxdjFoLTFWMjF6TTE1IDIydjFoMnYtMXpNMTggMjJoMXYxaC0xVjIyek0yMSAyMmgxdjNoLTFWMjJ6TTE4IDIzaDF2MmgtMVYyM3pNMTQgMjRoMXYxaC0xVjI0ek0yMyAyNGgydjJoLTJWMjR6TTI3IDI0aDF2MWgtMVYyNHpNMjkgMjVoMXYxaC0xVjI1ek0yNCAyNnYxaDF2LTF6TTI2IDI2aDJ2MWgtMlYyNnpNMjEgMjZ2MWgxdjFoMXYxaC0ydi0xaC0xdi0xaDFWMjZ6TTI5IDI5di0xaDF2LTFoMXYyaC0xek0yOCAyOWgxdjJoLTF2LTF6TTI2IDMwdjFoMXYtMXpNMyA0aDR2NEgzVjR6TTI1IDRoNHY0aC00VjR6TTMgMjRoNHY0SDNWMjR6Ii8+PC9zdmc+')] bg-no-repeat bg-center"></div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Scan this QR code to make payment</p>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => toast.info("QR code would be downloaded")}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => toast.info("QR code would be shared")}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* USSD Dialog */}
      <Dialog open={showUSSDDialog} onOpenChange={setShowUSSDDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>USSD Payment Code</DialogTitle>
            <DialogDescription>
              {selectedLink?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="mb-6 text-center">
              <h3 className="text-lg font-bold mb-2">EcoCash</h3>
              <div className="text-2xl font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                *151*200*5# <span className="text-brand-orange">REF: ZW{selectedLink?.id}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Dial this code to pay via EcoCash</p>
            </div>
            
            <div className="mb-6 text-center">
              <h3 className="text-lg font-bold mb-2">OneMoney</h3>
              <div className="text-2xl font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                *210*95# <span className="text-brand-orange">REF: ZW{selectedLink?.id}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Dial this code to pay via OneMoney</p>
            </div>
            
            <div className="mb-6 text-center">
              <h3 className="text-lg font-bold mb-2">InnBucks</h3>
              <div className="text-2xl font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                *483*44# <span className="text-brand-orange">REF: ZW{selectedLink?.id}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Dial this code to pay via InnBucks</p>
            </div>
            
            <Button 
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
              onClick={() => {
                setShowUSSDDialog(false);
                toast.success("Instructions copied and ready to share");
              }}
            >
              Copy Instructions
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentLinks;
