
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Smartphone, Banknote, Settings, Plus, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { 
      id: 1, 
      name: "EcoCash", 
      type: "Mobile Money", 
      provider: "Econet", 
      enabled: true, 
      transactionFee: "2.5%", 
      volume: "$2.4M",
      icon: <Smartphone className="h-8 w-8 text-green-600" />
    },
    { 
      id: 2, 
      name: "OneMoney", 
      type: "Mobile Money", 
      provider: "NetOne", 
      enabled: true, 
      transactionFee: "2.0%", 
      volume: "$1.8M",
      icon: <Smartphone className="h-8 w-8 text-red-600" />
    },
    { 
      id: 3, 
      name: "Visa Cards", 
      type: "Credit/Debit Card", 
      provider: "Visa", 
      enabled: true, 
      transactionFee: "3.5%", 
      volume: "$3.2M",
      icon: <CreditCard className="h-8 w-8 text-blue-600" />
    },
    { 
      id: 4, 
      name: "Mastercard", 
      type: "Credit/Debit Card", 
      provider: "Mastercard", 
      enabled: true, 
      transactionFee: "3.5%", 
      volume: "$2.9M",
      icon: <CreditCard className="h-8 w-8 text-orange-600" />
    },
    { 
      id: 5, 
      name: "Bank Transfer", 
      type: "Bank Transfer", 
      provider: "Various Banks", 
      enabled: false, 
      transactionFee: "1.0%", 
      volume: "$890K",
      icon: <Banknote className="h-8 w-8 text-gray-600" />
    },
  ]);

  const handleToggleMethod = (id: number, enabled: boolean) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id ? { ...method, enabled } : method
      )
    );
    const method = paymentMethods.find(m => m.id === id);
    toast.success(`${method?.name} has been ${enabled ? 'enabled' : 'disabled'}`);
  };

  const totalVolume = paymentMethods.reduce((sum, method) => {
    const volume = parseFloat(method.volume.replace(/[$MK]/g, ''));
    return sum + volume;
  }, 0);

  const enabledMethods = paymentMethods.filter(method => method.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <p className="text-muted-foreground">Configure and manage available payment options</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume.toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Methods</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledMethods}</div>
            <p className="text-xs text-muted-foreground">Out of {paymentMethods.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mobile Money</CardTitle>
            <Smartphone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.2M</div>
            <p className="text-xs text-muted-foreground">39% of total volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Card Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6.1M</div>
            <p className="text-xs text-muted-foreground">57% of total volume</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Configuration</CardTitle>
          <CardDescription>Enable or disable payment methods and configure their settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Transaction Fee</TableHead>
                <TableHead>Volume (30d)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <div className="font-medium">{method.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{method.type}</TableCell>
                  <TableCell>{method.provider}</TableCell>
                  <TableCell className="font-medium">{method.transactionFee}</TableCell>
                  <TableCell className="font-medium">{method.volume}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={method.enabled}
                        onCheckedChange={(enabled) => handleToggleMethod(method.id, enabled)}
                      />
                      <Badge variant={method.enabled ? "default" : "secondary"}>
                        {method.enabled ? "Active" : "Disabled"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Money Integration</CardTitle>
            <CardDescription>Configure mobile money payment gateways</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">EcoCash API</p>
                <p className="text-sm text-muted-foreground">Live environment connected</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">OneMoney API</p>
                <p className="text-sm text-muted-foreground">Live environment connected</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Configure Mobile Money Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Processing</CardTitle>
            <CardDescription>Configure card payment processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Visa Gateway</p>
                <p className="text-sm text-muted-foreground">Production environment</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Mastercard Gateway</p>
                <p className="text-sm text-muted-foreground">Production environment</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Configure Card Processing
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethods;
