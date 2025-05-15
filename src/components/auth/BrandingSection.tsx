
import React from "react";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "./TestimonialCard";

interface BrandingSectionProps {
  isExistingUser: boolean;
}

export const BrandingSection: React.FC<BrandingSectionProps> = ({ isExistingUser }) => {
  return (
    <div 
      className={cn(
        "hidden md:flex md:w-1/2 flex-col items-center justify-center p-12", 
        isExistingUser ? "bg-brand-navy" : "bg-white"
      )}
    >
      <div className="max-w-md text-center">
        <h2 className={cn(
          "text-3xl font-bold mb-6",
          isExistingUser ? "text-white" : "text-brand-navy"
        )}>
          {isExistingUser ? "Zimbabwe's Complete Payment Platform" : "Join the future of payments in Zimbabwe"}
        </h2>
        <p className={cn(
          "mb-8",
          isExistingUser ? "text-white/80" : "text-gray-600"
        )}>
          Accept mobile money, cards, and bank transfers easily with paid.co.zw
        </p>
        
        <div className="w-full max-w-sm mx-auto">
          <TestimonialCard isDarkBackground={isExistingUser} />
        </div>
      </div>
    </div>
  );
};
