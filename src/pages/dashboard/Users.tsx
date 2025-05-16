
import React from "react";
import { UserPlus, MoreHorizontal, User, UserCog, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const usersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    lastActive: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Finance",
    lastActive: "1 day ago",
    status: "active"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Support",
    lastActive: "Just now",
    status: "active"
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    role: "Read Only",
    lastActive: "3 days ago",
    status: "pending"
  }
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">User Manager</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage user access to your account
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
          onClick={() => toast.info("Add user dialog would open here")}
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="max-w-md mb-6">
        <Input
          placeholder="Search users..."
          className="w-full"
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usersData.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={user.status === "active" ? "default" : "outline"} className={user.status === "active" ? "bg-green-600" : ""}>
                    {user.status === "active" ? "Active" : "Pending"}
                  </Badge>
                  <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">{user.role}</div>
                  <div className="text-xs text-gray-400 hidden md:block">{user.lastActive}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toast.info(`You would edit ${user.name}'s profile here`)}>
                        <UserCog className="h-4 w-4 mr-2" />
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info(`You would reset ${user.name}'s password here`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={() => toast.info(`You would remove ${user.name} here`)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
