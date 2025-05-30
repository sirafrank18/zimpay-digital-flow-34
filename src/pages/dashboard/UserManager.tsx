
import React, { useState } from "react";
import { UserPlus, Users, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const UserManager = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Users",
      value: "4",
      description: "Active team members",
      icon: Users
    },
    {
      title: "User Groups",
      value: "3",
      description: "Permission groups",
      icon: Shield
    },
    {
      title: "Pending Invitations",
      value: "1",
      description: "Awaiting response",
      icon: UserPlus
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">User Manager</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage users and groups for your organization
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Management Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/dashboard/users">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-orange" />
                Manage Users
              </CardTitle>
              <CardDescription>
                Add, edit, and manage individual user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Pending Invites</span>
                  <span className="font-medium">1</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/dashboard/user-groups">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-orange" />
                Manage Groups
              </CardTitle>
              <CardDescription>
                Create and manage user groups with specific permissions and access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">User Groups</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Custom Roles</span>
                  <span className="font-medium">2</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Manage Groups
                </Button>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common user management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
              <UserPlus className="h-6 w-6" />
              <span className="text-sm">Add New User</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
              <Shield className="h-6 w-6" />
              <span className="text-sm">Create Group</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Permissions</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span className="text-sm">Bulk Actions</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager;
