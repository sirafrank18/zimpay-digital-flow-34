
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

const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call your registration API
      console.log("Signup data:", data);
      
      // For demo purposes, simulate a successful registration
      setTimeout(() => {
        toast.success("Account created successfully! Starting onboarding...");
        navigate("/onboarding");
      }, 1000);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsExistingUser(!isExistingUser);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Section - Form */}
      <div 
        className={cn(
          "w-full md:w-1/2 flex items-center justify-center p-8", 
          isExistingUser ? "bg-white dark:bg-brand-navy" : "bg-brand-navy"
        )}
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john@example.com" 
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+263 71 234 5678" 
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
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Create a password" 
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Confirm password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm your password" 
                          {...field} 
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Register"}
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
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-brand-navy dark:text-white">Log in to your existing account</p>
              <Button 
                onClick={toggleView}
                className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Log In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={toggleView}
                  className="text-sm text-brand-navy dark:text-white hover:underline flex items-center justify-center w-full"
                >
                  Don't have an account? <span className="text-brand-orange ml-1">Sign up</span>
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
            <div className={cn(
              "rounded-lg p-6", 
              isExistingUser ? "bg-white/10" : "bg-gray-100"
            )}>
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-brand-orange text-white flex items-center justify-center text-2xl font-bold">
                  PZ
                </div>
              </div>
              <p className={cn(
                "font-medium",
                isExistingUser ? "text-white" : "text-brand-navy"
              )}>
                "Our business has grown 40% since we integrated with paid.co.zw's payment solutions."
              </p>
              <p className={cn(
                "mt-2",
                isExistingUser ? "text-white/80" : "text-gray-600"
              )}>
                - Tech Innovation Hub
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
