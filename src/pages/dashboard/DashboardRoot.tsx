
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const DashboardRoot = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default DashboardRoot;
