
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { cn } from "@/lib/utils";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  
  const [isAnimated, setIsAnimated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState<"login" | "signup">(
    isLoginPage ? "login" : "signup"
  );

  useEffect(() => {
    // Add animation class after component mounts
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  useEffect(() => {
    // Update current view based on URL changes
    setCurrentView(isLoginPage ? "login" : "signup");
  }, [isLoginPage]);

  const switchView = (view: "login" | "signup") => {
    if (currentView === view) return;
    
    setIsTransitioning(true);
    
    // Update URL without full page reload
    const newPath = view === "login" ? "/auth/login" : "/auth/signup";
    navigate(newPath, { replace: true });
    
    // Allow time for animation before switching views
    setTimeout(() => {
      setCurrentView(view);
      setIsTransitioning(false);
    }, 600); // Match this with CSS transition duration
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Section - Form */}
      <div 
        className={cn(
          "w-full md:w-1/2 flex items-center justify-center p-8 relative",
          "bg-white dark:bg-brand-navy transition-all duration-500",
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
              {currentView === "login" ? "Welcome Back" : "Create an account"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-white/80">
              {currentView === "login" 
                ? "Log in to your account to continue" 
                : "Sign up to get started with paid.co.zw"}
            </p>
          </div>

          <div className={cn(
            "transition-opacity duration-500",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}>
            {currentView === "login" ? (
              <LoginForm onToggleView={() => switchView("signup")} />
            ) : (
              <SignupForm textColor="text-brand-navy dark:text-white" onToggleView={() => switchView("login")} />
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Branding/Image */}
      <div 
        className={cn(
          "hidden md:flex md:w-1/2 flex-col items-center justify-center p-12 bg-brand-navy relative overflow-hidden",
          isAnimated ? "translate-x-0" : "translate-x-[50px] opacity-0"
        )}
      >
        <div 
          className="absolute w-[250%] h-[100%] rounded-[150px] -right-[150%] transition-all duration-1000 ease-in-out"
          style={{
            background: '#1DBFC7',
            transform: isAnimated 
              ? (currentView === "login" ? 'translateX(-60%)' : 'translateX(-40%)') 
              : 'translateX(0%)',
            boxShadow: isAnimated ? '0 0 50px rgba(29, 191, 199, 0.3)' : 'none'
          }}
        />
        
        <div className="max-w-md text-center z-10">
          <h2 className="text-3xl font-bold mb-6 text-white relative z-10">
            {currentView === "login" ? "Don't have an account?" : "Already have an account?"}
          </h2>
          <p className="mb-8 text-white/80 relative z-10">
            {currentView === "login" 
              ? "Sign up to get started with paid.co.zw" 
              : "Log in to continue using paid.co.zw"}
          </p>
          
          <button 
            onClick={() => switchView(currentView === "login" ? "signup" : "login")}
            className="w-40 h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white relative z-10 transition-all duration-300"
          >
            {currentView === "login" ? "Register" : "Log In"}
          </button>
          
          <div className="w-full max-w-sm mx-auto mt-12">
            <div className="rounded-lg p-6 bg-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-brand-orange text-white flex items-center justify-center text-2xl font-bold">
                  PZ
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

export default AuthPage;
