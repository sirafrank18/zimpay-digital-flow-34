
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuItem, mainNavItems } from "./DashboardNavItems";

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  expandedItems: Record<string, boolean>;
  toggleExpand: (title: string) => void;
  isDisintegrating: boolean;
  handleLogout: () => void;
  completeLogout: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isSidebarOpen,
  closeSidebar,
  expandedItems,
  toggleExpand,
  isDisintegrating,
  handleLogout
}) => {
  const location = useLocation();

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar-background w-64 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header with Close Button for Mobile */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center">
            <img src="/lovable-uploads/32326559-0165-4383-8b0f-97c75ca798dc.png" alt="Logo" className="h-16 w-auto" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {mainNavItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={cn(
                        "flex items-center w-full px-2 py-2 rounded-md transition-colors text-sidebar-foreground",
                        location.pathname.startsWith(item.href)
                          ? "bg-sidebar-primary/20 text-sidebar-primary"
                          : "hover:bg-sidebar-accent/20 hover:text-sidebar-accent"
                      )}
                    >
                      {item.icon}
                      <span className="ml-3 flex-1 text-left">{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedItems[item.title] && "rotate-180"
                        )}
                      />
                    </button>
                    {expandedItems[item.title] && (
                      <ul className="pl-6 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              to={child.href}
                              className={cn(
                                "flex items-center px-2 py-2 text-sm rounded-md transition-colors text-sidebar-foreground",
                                location.pathname === child.href
                                  ? "bg-sidebar-primary/20 text-sidebar-primary"
                                  : "hover:bg-sidebar-accent/20 hover:text-sidebar-accent"
                              )}
                              onClick={closeSidebar}
                            >
                              <div className="w-1 h-1 rounded-full bg-current mr-2" />
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 rounded-md transition-colors text-sidebar-foreground",
                      location.pathname === item.href
                        ? "bg-sidebar-primary/20 text-sidebar-primary"
                        : "hover:bg-sidebar-accent/20 hover:text-sidebar-accent"
                    )}
                    onClick={closeSidebar}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
                ZP
              </div>
              <div className="ml-2">
                <div className="font-medium text-sidebar-foreground">Zimbabwe Payments</div>
                <div className="text-xs text-sidebar-foreground/70">Admin</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/20"
              onClick={handleLogout}
              disabled={isDisintegrating}
              title={isDisintegrating ? "Logging out..." : "Logout"}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
