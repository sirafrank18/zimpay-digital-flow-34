
import React from "react";
import { Shield, Users, Plus, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const userGroups = [
  {
    id: 1,
    name: "Administrators",
    description: "Full system access and management permissions",
    userCount: 2,
    permissions: ["Full Access", "User Management", "System Settings"],
    color: "bg-red-500"
  },
  {
    id: 2,
    name: "Finance Team",
    description: "Access to financial data and transaction management",
    userCount: 1,
    permissions: ["View Transactions", "Generate Reports", "Manage Payouts"],
    color: "bg-blue-500"
  },
  {
    id: 3,
    name: "Support Staff",
    description: "Customer support and basic transaction access",
    userCount: 1,
    permissions: ["View Transactions", "Customer Support", "Basic Reports"],
    color: "bg-green-500"
  }
];

const UserGroups = () => {
  const handleEditGroup = (groupName: string) => {
    toast.info(`Edit ${groupName} dialog would open here`);
  };

  const handleDeleteGroup = (groupName: string) => {
    toast.info(`Delete ${groupName} confirmation would appear here`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">User Groups</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage user groups and their permissions
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
          onClick={() => toast.info("Create new group dialog would open here")}
        >
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {userGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${group.color}`} />
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditGroup(group.name)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Group
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info(`View ${group.name} members`)}>
                      <Users className="h-4 w-4 mr-2" />
                      View Members
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600"
                      onClick={() => handleDeleteGroup(group.name)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Members</span>
                  <Badge variant="outline">{group.userCount} users</Badge>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Permissions</span>
                  <div className="flex flex-wrap gap-2">
                    {group.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="h-4 w-4 mr-1" />
                    View Members
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Group Card */}
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-orange transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-brand-orange" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Create New Group</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Add a new user group with custom permissions
            </p>
            <Button 
              variant="outline" 
              onClick={() => toast.info("Create new group dialog would open here")}
            >
              Create Group
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Group Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Group Templates</CardTitle>
          <CardDescription>
            Quick-start templates for common user group configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Manager Template</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full access to reports and user management
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Employee Template</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Basic access for daily operations
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <h4 className="font-medium">Auditor Template</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Read-only access to financial data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGroups;
