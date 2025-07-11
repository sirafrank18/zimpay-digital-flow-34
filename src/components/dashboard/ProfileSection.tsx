import React from "react";
import { Settings, User, LogOut, Bell, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ProfileSectionProps {
  isDisintegrating: boolean;
  handleLogout: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  isDisintegrating,
  handleLogout
}) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
        >
          3
        </Badge>
      </Button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 h-auto p-2 rounded-xl hover:bg-muted/50 transition-all duration-200">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm font-medium">
                ZP
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <div className="font-medium text-sm text-foreground">Zimbabwe Payments</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 backdrop-blur-sm bg-background/95 border-border/50">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Zimbabwe Payments</p>
              <p className="text-xs leading-none text-muted-foreground">
                admin@zimbabwepayments.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account-settings" className="flex items-center cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account-settings" className="flex items-center cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center cursor-pointer">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & Support
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="text-destructive focus:text-destructive cursor-pointer" 
            disabled={isDisintegrating}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isDisintegrating ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileSection;