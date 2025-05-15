
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SignupForm } from "@/components/auth/SignupForm";
import { LoginPrompt } from "@/components/auth/LoginPrompt";
import { BrandingSection } from "@/components/auth/BrandingSection";

const Signup = () => {
  const [isExistingUser, setIsExistingUser] = useState(false);

  const toggleView = () => {
    setIsExistingUser(!isExistingUser);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Section - Form */}
      <div 
        className={cn(
          "w-full md:w-1/2 flex items-center justify-center p-8 relative", 
          isExistingUser ? "bg-white dark:bg-brand-navy" : "bg-brand-navy"
        )}
        style={{
          borderTopRightRadius: "30% 50%",
          borderBottomRightRadius: "30% 50%",
          clipPath: "polygon(0 0, 100% 0%, 85% 100%, 0% 100%)",
        }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className={cn(
              "text-3xl font-bold",
              isExistingUser ? "text-brand-navy dark:text-white" : "text-white"
            )}>
              {isExistingUser ? "Already have an account?" : "Create an account"}
            </h1>
            <p className={cn(
              "mt-2",
              isExistingUser ? "text-gray-600 dark:text-white/80" : "text-white/80"
            )}>
              {isExistingUser 
                ? "Log in to continue using paid.co.zw" 
                : "Sign up to get started with paid.co.zw"
              }
            </p>
          </div>

          {!isExistingUser ? (
            <SignupForm textColor="text-white" />
          ) : (
            <LoginPrompt 
              toggleView={toggleView}
              textColor={cn("text-brand-navy dark:text-white")}
            />
          )}
        </div>
      </div>

      {/* Right Section - Branding/Image */}
      <BrandingSection isExistingUser={isExistingUser} />
    </div>
  );
};

export default Signup;
