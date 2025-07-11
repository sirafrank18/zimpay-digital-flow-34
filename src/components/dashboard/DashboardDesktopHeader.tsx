
import React from "react";
import { LogOut, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardDesktopHeaderProps {
  isDisintegrating: boolean;
  handleLogout: () => void;
  completeLogout: () => void;
}

const DashboardDesktopHeader: React.FC<DashboardDesktopHeaderProps> = ({ 
  isDisintegrating,
  handleLogout
}) => {
  return (
    <header className="hidden lg:flex h-16 items-center justify-between border-b dark:border-gray-800 border-gray-200 px-4 dark:bg-secondary bg-white">
      <div className="flex items-center">
        {/* This space is intentionally left empty to match the original layout */}
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant="outline" size="sm">Upgrade</Button>
        
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-brand-orange text-white text-sm">
                  ZP
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block font-medium">Zimbabwe Payments</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/account-settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600" disabled={isDisintegrating}>
              <LogOut className="h-4 w-4 mr-2" />
              {isDisintegrating ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardDesktopHeader;
