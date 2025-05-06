
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 geo-pattern opacity-30 z-0"></div>
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-brand-orange/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-brand-orange/10 blur-3xl"></div>
      
      {/* Animated floating elements */}
      <div className="absolute top-20 right-10 w-6 h-6 bg-brand-orange/20 rounded-md animate-float"></div>
      <div className="absolute bottom-20 left-10 w-4 h-4 bg-brand-orange/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 border border-brand-orange/30 rounded-full animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powering <span className="gradient-text">Zimbabwe's</span> Digital Economy
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              The complete payment platform engineered for Zimbabwean businesses. Accept payments, send payouts, and manage your online business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium px-8"
              >
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Contact Sales
              </Button>
            </div>
            <div className="mt-8 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start">
              <p className="mb-2 sm:mb-0 sm:mr-4">Trusted by Zimbabwean businesses:</p>
              <div className="flex items-center space-x-6">
                <span className="text-white/80 font-semibold">ChikoroTech</span>
                <span className="text-white/80 font-semibold">ZimMarket</span>
                <span className="text-white/80 font-semibold">HarareFresh</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 animate-spin-slow flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-brand-navy flex items-center justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    {/* This would be your 3D globe component in a real implementation */}
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-900/60 to-blue-700/30 animate-pulse-slow flex items-center justify-center">
                      <div className="absolute w-4 h-4 bg-brand-orange rounded-full" style={{ top: '35%', right: '35%' }}>
                        <div className="absolute w-8 h-8 bg-brand-orange/30 rounded-full -top-2 -left-2 animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
