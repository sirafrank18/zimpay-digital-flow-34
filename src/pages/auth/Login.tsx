
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call your authentication API
      console.log("Login data:", data);
      
      // For demo purposes, simulate a successful login
      setTimeout(() => {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsNewUser(!isNewUser);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Section - Form */}
      <div 
        className={cn(
          "w-full md:w-1/2 flex items-center justify-center p-8 relative", 
          "bg-white dark:bg-brand-navy transition-all duration-300"
        )}
        style={{
          borderRadius: "30px",
          boxShadow: "0 0 30px rgba(0, 0, 0, .2)",
        }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-navy dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-600 dark:text-white/80">
              Log in to your account to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-brand-navy dark:text-white">Email address</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          className="h-12 pl-10"
                        />
                      </FormControl>
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-brand-navy dark:text-white">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          className="h-12 pl-10"
                        />
                      </FormControl>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <FormMessage />
                    <div className="flex justify-end mt-1">
                      <Link to="/auth/forgot-password" className="text-sm text-brand-orange hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-brand-navy px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-12 h-12 p-0 rounded-lg border-2"
                  onClick={() => toast.info("Google authentication would be triggered here")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-12 h-12 p-0 rounded-lg border-2"
                  onClick={() => toast.info("Facebook authentication would be triggered here")}
                >
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.03 21.5v-8.5h-3v-3.5h3v-2.5c0-3.19 1.81-5 5-5 1.34 0 2.5.13 2.84.19v3.31h-1.95c-1.53 0-1.83.73-1.83 1.8v2.2h3.68l-.48 3.5h-3.2v8.5h-4.06z" />
                  </svg>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-12 h-12 p-0 rounded-lg border-2"
                  onClick={() => toast.info("Github authentication would be triggered here")}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-12 h-12 p-0 rounded-lg border-2"
                  onClick={() => toast.info("LinkedIn authentication would be triggered here")}
                >
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452z" />
                  </svg>
                </Button>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/auth/signup"
                  className="text-sm text-brand-navy dark:text-white hover:underline flex items-center justify-center w-full"
                >
                  Don't have an account? <span className="text-brand-orange ml-1">Sign up</span>
                  <ArrowRight className="ml-1 h-4 w-4 text-brand-orange" />
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Section - Branding/Image */}
      <div 
        className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-12 bg-brand-navy relative overflow-hidden"
      >
        <div className="absolute w-[250%] h-[100%] bg-brand-orange rounded-[150px] -left-[150%] transition-all duration-500"></div>
        
        <div className="max-w-md text-center z-10">
          <h2 className="text-3xl font-bold mb-6 text-white relative z-10">
            Don't have an account?
          </h2>
          <p className="mb-8 text-white/80 relative z-10">
            Sign up to get started with paid.co.zw
          </p>
          
          <Button 
            onClick={() => navigate("/auth/signup")}
            className="w-40 h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white relative z-10"
          >
            Register
          </Button>
          
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

export default Login;
