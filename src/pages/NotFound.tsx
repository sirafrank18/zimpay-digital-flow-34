
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          4<span className="text-brand-orange">0</span>4
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="bg-brand-orange hover:bg-brand-orange/90 text-white"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
