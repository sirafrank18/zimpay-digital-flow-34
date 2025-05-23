
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SimpleThanosEffect from "@/components/effects/SimpleThanosEffect";
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
  handleLogout,
  completeLogout
}) => {
  const location = useLocation();

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r dark:border-gray-800 border-gray-200 bg-white dark:bg-secondary w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header with Close Button for Mobile */}
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-800 border-gray-200">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold dark:text-white text-gray-900">
              paid<span className="text-brand-orange">.co.zw</span>
            </span>
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
                        "flex items-center w-full px-2 py-2 rounded-md transition-colors",
                        location.pathname.startsWith(item.href)
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "hover:bg-brand-orange/5 hover:text-brand-orange dark:hover:bg-brand-orange/10"
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
                                "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                                location.pathname === child.href
                                  ? "bg-brand-orange/10 text-brand-orange"
                                  : "hover:bg-brand-orange/5 hover:text-brand-orange dark:hover:bg-brand-orange/10"
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
                      "flex items-center px-2 py-2 rounded-md transition-colors",
                      location.pathname === item.href
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "hover:bg-brand-orange/5 hover:text-brand-orange dark:hover:bg-brand-orange/10"
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

        <div className="p-4 border-t dark:border-gray-800 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
                ZP
              </div>
              <div className="ml-2">
                <div className="font-medium dark:text-white text-gray-900">Zimbabwe Payments</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
              </div>
            </div>
            <SimpleThanosEffect active={isDisintegrating} onComplete={completeLogout}>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </SimpleThanosEffect>
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
