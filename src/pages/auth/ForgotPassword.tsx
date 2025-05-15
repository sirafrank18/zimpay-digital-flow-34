
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call your password reset API
      console.log("Reset password for:", data.email);
      
      // For demo purposes, simulate a successful request
      setTimeout(() => {
        setIsSubmitted(true);
        toast.success("Password reset instructions sent to your email!");
      }, 1000);
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-navy p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-secondary p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Reset your password</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {!isSubmitted 
              ? "Enter your email address and we'll send you instructions to reset your password." 
              : "Check your email for instructions to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
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

              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Sending instructions..." : "Reset password"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              If an account exists for <span className="font-medium">{form.getValues().email}</span>, 
              you'll receive an email with instructions to reset your password.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            to="/auth/login" 
            className="text-sm text-brand-orange hover:text-brand-orange/80 flex items-center justify-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
