
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import SearchBar from "./SearchBar";

interface DashboardMobileHeaderProps {
  toggleSidebar: () => void;
}

const DashboardMobileHeader: React.FC<DashboardMobileHeaderProps> = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = React.useState(false);

  const handleSearch = (query: string) => {
    console.log("Mobile search:", query);
    // Implement search functionality here
  };

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-border px-4 h-16 bg-background">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="ml-2">
            <span className="text-xl font-bold text-foreground">
              paid<span className="text-primary">.co.zw</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </header>
      
      {showSearch && (
        <div className="lg:hidden border-b border-border px-4 py-3 bg-background">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
    </>
  );
};

export default DashboardMobileHeader;
