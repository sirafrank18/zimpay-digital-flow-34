
import React from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  isDarkBackground: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ isDarkBackground }) => {
  return (
    <div className={cn(
      "rounded-lg p-6", 
      isDarkBackground ? "bg-white/10" : "bg-gray-100"
    )}>
      <div className="flex items-center justify-center mb-4">
        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center p-3">
          <img src="/lovable-uploads/32326559-0165-4383-8b0f-97c75ca798dc.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>
      <p className={cn(
        "font-medium",
        isDarkBackground ? "text-white" : "text-brand-navy"
      )}>
        "Our business has grown 40% since we integrated with paid.co.zw's payment solutions."
      </p>
      <p className={cn(
        "mt-2",
        isDarkBackground ? "text-white/80" : "text-gray-600"
      )}>
        - Tech Innovation Hub
      </p>
    </div>
  );
};
