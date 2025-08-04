
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SignupForm } from "@/components/auth/SignupForm";
import { LoginPrompt } from "@/components/auth/LoginPrompt";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const navigate = useNavigate();
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Add animation class after component mounts
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  const toggleView = () => {
    setIsExistingUser(!isExistingUser);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Section - Form */}
      <div 
        className={cn(
          "w-full md:w-1/2 flex items-center justify-center p-8 relative bg-white dark:bg-brand-navy transition-all duration-500",
          isAnimated ? "translate-x-0" : "translate-x-[-50px] opacity-0"
        )}
        style={{
          borderRadius: "30px",
          boxShadow: "0 0 30px rgba(0, 0, 0, .2)",
        }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-navy dark:text-white">
              Create an account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-white/80">
              Sign up to get started with paid.co.zw
            </p>
          </div>

          {!isExistingUser ? (
            <SignupForm textColor="text-brand-navy dark:text-white" />
          ) : (
            <LoginPrompt 
              toggleView={toggleView}
              textColor="text-brand-navy dark:text-white"
            />
          )}
        </div>
      </div>

      {/* Right Section - Branding/Image */}
      <div 
        className={cn(
          "hidden md:flex md:w-1/2 flex-col items-center justify-center p-12 bg-brand-navy relative overflow-hidden",
          isAnimated ? "translate-x-0" : "translate-x-[50px] opacity-0"
        )}
      >
        <div className="absolute w-[250%] h-[100%] bg-brand-orange rounded-[150px] -right-[150%] transition-transform duration-1000 ease-in-out"
             style={{
               transform: isAnimated ? 'translateX(-60%)' : 'translateX(0%)'
             }}></div>
        
        <div className="max-w-md text-center z-10">
          <h2 className="text-3xl font-bold mb-6 text-white relative z-10">
            Already have an account?
          </h2>
          <p className="mb-8 text-white/80 relative z-10">
            Log in to continue using paid.co.zw
          </p>
          
          <Button 
            onClick={() => navigate("/auth/login")}
            className="w-40 h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white relative z-10 transition-all duration-300"
          >
            Log In
          </Button>
          
          <div className="w-full max-w-sm mx-auto mt-12">
            <div className="rounded-lg p-6 bg-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-2">
                  <img src="/lovable-uploads/32326559-0165-4383-8b0f-97c75ca798dc.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <p className="font-medium text-white">
                "paid.co.zw has transformed our payment processing, making it simple and reliable for our customers."
              </p>
              <p className="mt-2 text-white/80">
                - Zimbabwe Payments Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
