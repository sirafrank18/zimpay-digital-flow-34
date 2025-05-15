
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User, Lock, Mail, Phone } from "lucide-react";
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

export type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  textColor: string;
}

export const SignupForm = ({ textColor }: SignupFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className={textColor}>First name</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="John" {...field} className="h-12 pl-10" />
                  </FormControl>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className={textColor}>Last name</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="h-12 pl-10" />
                  </FormControl>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className={textColor}>Email address</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    {...field} 
                    className="h-12 pl-10"
                  />
                </FormControl>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className={textColor}>Phone number</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    placeholder="+263 71 234 5678" 
                    {...field} 
                    className="h-12 pl-10"
                  />
                </FormControl>
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
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
              <FormLabel className={textColor}>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Create a password" 
                    {...field} 
                    className="h-12 pl-10"
                  />
                </FormControl>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className={textColor}>Confirm password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Confirm your password" 
                    {...field} 
                    className="h-12 pl-10"
                  />
                </FormControl>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-brand-navy px-2 text-gray-500 dark:text-gray-400">Or sign up with</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-12 h-12 p-0 rounded-lg border-2"
            onClick={() => toast.info("Google signup would be triggered here")}
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
            onClick={() => toast.info("Facebook signup would be triggered here")}
          >
            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.03 21.5v-8.5h-3v-3.5h3v-2.5c0-3.19 1.81-5 5-5 1.34 0 2.5.13 2.84.19v3.31h-1.95c-1.53 0-1.83.73-1.83 1.8v2.2h3.68l-.48 3.5h-3.2v8.5h-4.06z" />
            </svg>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-12 h-12 p-0 rounded-lg border-2"
            onClick={() => toast.info("Github signup would be triggered here")}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-12 h-12 p-0 rounded-lg border-2"
            onClick={() => toast.info("LinkedIn signup would be triggered here")}
          >
            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452z" />
            </svg>
          </Button>
        </div>

        <div className="text-center mt-6">
          <Button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="text-sm bg-transparent hover:bg-transparent p-0 flex items-center justify-center w-full"
          >
            <span className={textColor}>Already have an account?</span> 
            <span className="text-brand-orange ml-1">Log in</span>
            <ArrowRight className="ml-1 h-4 w-4 text-brand-orange" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
