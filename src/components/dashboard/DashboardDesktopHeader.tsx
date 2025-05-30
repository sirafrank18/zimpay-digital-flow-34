
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface DashboardDesktopHeaderProps {
  isDisintegrating: boolean;
  handleLogout: () => void;
  completeLogout: () => void;
}

const DashboardDesktopHeader: React.FC<DashboardDesktopHeaderProps> = ({ 
  handleLogout
}) => {
  return (
    <header className="hidden lg:flex h-16 items-center justify-between border-b dark:border-gray-800 border-gray-200 px-4 dark:bg-secondary bg-white">
      <div className="flex items-center">
        {/* This space is intentionally left empty to match the original layout */}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
        <ThemeToggle />
        <Button variant="outline" size="sm">Upgrade</Button>
      </div>
    </header>
  );
};

export default DashboardDesktopHeader;
