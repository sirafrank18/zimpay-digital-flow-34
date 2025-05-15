
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoginPromptProps {
  toggleView: () => void;
  textColor: string;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ toggleView, textColor }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center space-y-4">
      <p className={textColor}>Log in to your existing account</p>
      <Button 
        onClick={() => navigate("/auth/login")}
        className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white"
      >
        Log In
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={toggleView}
          className={`text-sm ${textColor} hover:underline flex items-center justify-center w-full`}
        >
          Don't have an account? <span className="text-brand-orange ml-1">Sign up</span>
          <ArrowRight className="ml-1 h-4 w-4 text-brand-orange" />
        </button>
      </div>
    </div>
  );
};
