
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
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
          isNewUser ? "bg-brand-navy" : "bg-white dark:bg-brand-navy"
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
              isNewUser ? "text-white" : "text-brand-navy dark:text-white"
            )}>
              {isNewUser ? "Don't have an account?" : "Welcome back"}
            </h1>
            <p className={cn(
              "mt-2",
              isNewUser ? "text-white/80" : "text-gray-600 dark:text-white/80"
            )}>
              {isNewUser 
                ? "Sign up to get started with paid.co.zw" 
                : "Log in to your account to continue"
              }
            </p>
          </div>

          {!isNewUser ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-navy dark:text-white">Email address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-navy dark:text-white">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="text-right">
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

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
                  Continue with Google
                </Button>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/auth/signup")}
                    className="text-sm text-brand-navy dark:text-white hover:underline flex items-center justify-center w-full"
                  >
                    Don't have an account? <span className="text-brand-orange ml-1">Sign up</span>
                    <ArrowRight className="ml-1 h-4 w-4 text-brand-orange" />
                  </button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-white">Create a new account to get started with paid.co.zw</p>
              <Button 
                onClick={() => navigate("/auth/signup")}
                className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={toggleView}
                  className="text-sm text-white hover:underline flex items-center justify-center w-full"
                >
                  Already have an account? <span className="text-brand-orange ml-1">Log in</span>
                  <ArrowRight className="ml-1 h-4 w-4 text-brand-orange" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Branding/Image */}
      <div 
        className={cn(
          "hidden md:flex md:w-1/2 flex-col items-center justify-center p-12", 
          isNewUser ? "bg-white" : "bg-brand-navy"
        )}
      >
        <div className="max-w-md text-center">
          <h2 className={cn(
            "text-3xl font-bold mb-6",
            isNewUser ? "text-brand-navy" : "text-white"
          )}>
            {isNewUser ? "Join the future of payments in Zimbabwe" : "Zimbabwe's Complete Payment Platform"}
          </h2>
          <p className={cn(
            "mb-8",
            isNewUser ? "text-gray-600" : "text-white/80"
          )}>
            Accept mobile money, cards, and bank transfers easily with paid.co.zw
          </p>
          
          <div className="w-full max-w-sm mx-auto">
            <div className={cn(
              "rounded-lg p-6", 
              isNewUser ? "bg-gray-100" : "bg-white/10"
            )}>
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-brand-orange text-white flex items-center justify-center text-2xl font-bold">
                  PZ
                </div>
              </div>
              <p className={cn(
                "font-medium",
                isNewUser ? "text-brand-navy" : "text-white"
              )}>
                "paid.co.zw has transformed our payment processing, making it simple and reliable for our customers."
              </p>
              <p className={cn(
                "mt-2",
                isNewUser ? "text-gray-600" : "text-white/80"
              )}>
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
