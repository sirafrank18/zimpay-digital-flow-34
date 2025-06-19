
import React, { useState } from "react";
import { PlusCircle, Layout, Globe, Settings, Copy, MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "My E-commerce Store",
      description: "Online store integration for payment processing",
      type: "Web Application",
      status: "Active",
      apiKey: "pk_live_...",
      webhookUrl: "https://mystore.com/webhook",
      createdAt: "2023-05-15"
    },
    {
      id: 2,
      name: "Mobile App Integration",
      description: "React Native app for mobile payments",
      type: "Mobile Application",
      status: "Development",
      apiKey: "pk_test_...",
      webhookUrl: "https://api.myapp.com/payments",
      createdAt: "2023-05-20"
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newApp, setNewApp] = useState({
    name: "",
    description: "",
    type: "Web Application",
    webhookUrl: ""
  });

  const handleCreateApp = () => {
    const app = {
      id: applications.length + 1,
      ...newApp,
      status: "Development",
      apiKey: `pk_test_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setApplications([...applications, app]);
    setNewApp({ name: "", description: "", type: "Web Application", webhookUrl: "" });
    setShowCreateDialog(false);
    toast.success("Application created successfully!");
  };

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard!");
  };

  const deleteApp = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
    toast.success("Application deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Applications</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your applications and integrations
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create App
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input
                  id="app-name"
                  value={newApp.name}
                  onChange={(e) => setNewApp({...newApp, name: e.target.value})}
                  placeholder="e.g. My E-commerce Store"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-description">Description</Label>
                <Textarea
                  id="app-description"
                  value={newApp.description}
                  onChange={(e) => setNewApp({...newApp, description: e.target.value})}
                  placeholder="Describe what this application will be used for"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-type">Application Type</Label>
                <Select value={newApp.type} onValueChange={(value) => setNewApp({...newApp, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Application">Web Application</SelectItem>
                    <SelectItem value="Mobile Application">Mobile Application</SelectItem>
                    <SelectItem value="Desktop Application">Desktop Application</SelectItem>
                    <SelectItem value="API Integration">API Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
                <Input
                  id="webhook-url"
                  value={newApp.webhookUrl}
                  onChange={(e) => setNewApp({...newApp, webhookUrl: e.target.value})}
                  placeholder="https://yourapp.com/webhook"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateApp} disabled={!newApp.name}>
                Create Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg space-y-4 text-center">
          <Globe className="h-16 w-16 text-gray-400" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">No applications yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Create your first application to integrate with your website or mobile app
          </p>
          <Button 
            className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
            onClick={() => setShowCreateDialog(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Create First App
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-brand-orange/10 rounded-lg">
                        <Layout className="h-5 w-5 text-brand-orange" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label className="text-xs text-gray-500">Type</Label>
                        <p className="text-sm font-medium">{app.type}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Status</Label>
                        <div className="mt-1">
                          <Badge variant={app.status === 'Active' ? 'default' : 'secondary'}>
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Created</Label>
                        <p className="text-sm font-medium">{app.createdAt}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div>
                        <Label className="text-xs text-gray-500">API Key</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-1">
                            {app.apiKey}...
                          </code>
                          <Button size="sm" variant="outline" onClick={() => copyApiKey(app.apiKey)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {app.webhookUrl && (
                        <div>
                          <Label className="text-xs text-gray-500">Webhook URL</Label>
                          <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1">
                            {app.webhookUrl}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info("App details would open")}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Edit dialog would open")}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyApiKey(app.apiKey)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy API Key
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => deleteApp(app.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {applications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Integration Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Getting Started</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Copy your API key from the application above</li>
                  <li>Install our SDK or use our REST API</li>
                  <li>Configure your webhook endpoint (optional)</li>
                  <li>Test your integration in development mode</li>
                  <li>Switch to live mode when ready</li>
                </ol>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.info("Documentation would open")}>
                  View Documentation
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.info("SDK downloads would be available")}>
                  Download SDK
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Applications;
