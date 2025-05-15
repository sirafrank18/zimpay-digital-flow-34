
import React from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  className?: string;
};

const AuthLayout = ({ className }: AuthLayoutProps) => {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
