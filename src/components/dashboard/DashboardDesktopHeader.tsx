
import React from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import ProfileSection from "./ProfileSection";

interface DashboardDesktopHeaderProps {
  isDisintegrating: boolean;
  handleLogout: () => void;
  completeLogout: () => void;
}

const DashboardDesktopHeader: React.FC<DashboardDesktopHeaderProps> = ({ 
  isDisintegrating,
  handleLogout
}) => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search functionality here
  };

  return (
    <header className="hidden lg:flex h-16 items-center justify-between border-b border-border px-6 bg-background">
      {/* Left section - Logo/Brand */}
      <div className="flex items-center min-w-0">
        <h1 className="text-xl font-bold text-foreground">
          PAID<span className="text-primary">.co.zw</span>
        </h1>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-xl mx-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <Button 
          variant="outline" 
          size="sm" 
          className="gradient-bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90"
        >
          Upgrade
        </Button>
        <ProfileSection 
          isDisintegrating={isDisintegrating}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default DashboardDesktopHeader;
