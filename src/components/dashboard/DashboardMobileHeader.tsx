
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface DashboardMobileHeaderProps {
  toggleSidebar: () => void;
}

const DashboardMobileHeader: React.FC<DashboardMobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b dark:border-gray-800 border-gray-200 px-4 h-16 dark:bg-secondary bg-white">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/dashboard" className="ml-2">
          <span className="text-xl font-bold dark:text-white text-gray-900">
            paid<span className="text-brand-orange">.co.zw</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default DashboardMobileHeader;
