
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardMobileHeader from "./DashboardMobileHeader";
import DashboardDesktopHeader from "./DashboardDesktopHeader";
import DashboardSidebar from "./DashboardSidebar";
import SimpleThanosEffect from "@/components/effects/SimpleThanosEffect";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isDisintegrating, setIsDisintegrating] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  
  const handleLogout = () => {
    setIsDisintegrating(true);
  };

  const completeLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <SimpleThanosEffect active={isDisintegrating} onComplete={completeLogout} duration={2000}>
      <div className="min-h-screen flex flex-col dark:bg-brand-navy bg-gray-50 transition-colors duration-200">
        {/* Mobile Header */}
        <DashboardMobileHeader toggleSidebar={toggleSidebar} />
        
        {/* Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar for all screens */}
          <DashboardSidebar
            isSidebarOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            isDisintegrating={isDisintegrating}
            handleLogout={handleLogout}
            completeLogout={completeLogout}
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Desktop Header */}
            <DashboardDesktopHeader 
              isDisintegrating={isDisintegrating}
              handleLogout={handleLogout}
              completeLogout={completeLogout}
            />

            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SimpleThanosEffect>
  );
};

export default DashboardLayout;
