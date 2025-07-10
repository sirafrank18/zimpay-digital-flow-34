
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleView: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

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
      // Save email for OTP verification
      setEmail(data.email);
      
      // Simulate sending OTP to email
      setTimeout(() => {
        toast.success(`OTP sent to ${data.email}`);
        setShowOTP(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleOTPVerification = (value: string) => {
    if (value.length === 6) {
      toast.success("OTP verified successfully!");
      // Simulate successful login
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  if (showOTP) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <p className="text-brand-navy dark:text-white/80">
            We've sent a verification code to <strong>{email}</strong>
          </p>
        </div>
        
        <div className="space-y-4">
          <label className="text-sm font-medium text-brand-navy dark:text-white">
            Enter verification code
          </label>
          
          <div className="flex justify-center">
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-full">
                  <InputOTP maxLength={6} onComplete={handleOTPVerification}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Button
              type="button"
              variant="link"
              className="text-brand-orange hover:underline story-link p-0"
              onClick={() => {
                toast.success(`Resending OTP to ${email}`);
              }}
            >
              Didn't receive code? Resend
            </Button>
          </div>
          
          <Button 
            type="button"
            className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white"
            onClick={() => setShowOTP(false)}
          >
            Back to login
          </Button>
        </div>
      </div>
    );
  }

  return (
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
                    className="h-12 pl-10 bg-gray-100 dark:bg-gray-800 border-none"
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
              <div className="flex justify-between items-center">
                <FormLabel className="text-brand-navy dark:text-white">Password</FormLabel>
                <Link to="/auth/forgot-password" className="text-sm text-brand-orange hover:underline story-link">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    {...field} 
                    className="h-12 pl-10 bg-gray-100 dark:bg-gray-800 border-none"
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
          className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white transition-all duration-300 transform hover:scale-[1.02]"
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

        <div className="flex justify-center">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12 p-0 rounded-lg border-2 flex items-center justify-center gap-2"
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
            Sign in with Google
          </Button>
        </div>

        <div className="text-center mt-6">
          <Button
            type="button"
            onClick={onToggleView}
            className="text-sm bg-transparent hover:bg-transparent p-0 flex items-center justify-center w-full"
          >
            Don't have an account? <span className="text-brand-orange ml-1">Create account</span>
            <ArrowRight className="ml-1 h-4 w-4 text-brand-orange" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
