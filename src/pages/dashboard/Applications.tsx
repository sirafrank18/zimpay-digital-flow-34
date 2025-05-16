
import React from "react";
import { PlusCircle, Layout, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Applications = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Applications</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your applications and integrations
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create App
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg space-y-4 text-center">
        <Globe className="h-16 w-16 text-gray-400" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">No applications yet</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Create your first application to integrate with your website or mobile app
        </p>
        <Button 
          className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create First App
        </Button>
      </div>
    </div>
  );
};

export default Applications;
