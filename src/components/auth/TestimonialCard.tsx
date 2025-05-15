
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
        <div className="h-16 w-16 rounded-full bg-brand-orange text-white flex items-center justify-center text-2xl font-bold">
          PZ
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
