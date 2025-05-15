
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const onboardingSlides = [
  {
    id: 1,
    title: "Welcome to paid.co.zw",
    description: "Zimbabwe's complete payment platform for businesses. Let's get you started with accepting payments."
  },
  {
    id: 2,
    title: "Accept Payments",
    description: "Process payments through mobile money, cards, and bank transfers all in one place."
  },
  {
    id: 3,
    title: "Create Payment Links",
    description: "Generate shareable payment links for your customers without writing any code."
  },
  {
    id: 4,
    title: "Invoicing Made Simple",
    description: "Create and manage professional invoices directly from your dashboard."
  },
  {
    id: 5,
    title: "Real-time Analytics",
    description: "Monitor your payment activity and business performance through comprehensive reports."
  },
  {
    id: 6,
    title: "You're All Set!",
    description: "You're ready to start using paid.co.zw. Let's explore your dashboard."
  }
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Last slide, navigate to dashboard
      navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const progress = ((currentSlide + 1) / onboardingSlides.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white">
      {/* Progress bar */}
      <div className="w-full px-4 pt-4">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            {currentSlide === 0 && (
              <div className="h-32 w-32 rounded-full bg-brand-orange flex items-center justify-center text-4xl font-bold mx-auto mb-6">
                PZ
              </div>
            )}
            
            {currentSlide === 1 && (
              <div className="h-32 w-32 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 15H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
            
            {currentSlide === 2 && (
              <div className="h-32 w-32 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C11.1046 13 12 12.1046 12 11C12 9.89543 11.1046 9 10 9C8.89543 9 8 9.89543 8 11C8 12.1046 8.89543 13 10 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11L14 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            
            {currentSlide === 3 && (
              <div className="h-32 w-32 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            
            {currentSlide === 4 && (
              <div className="h-32 w-32 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            
            {currentSlide === 5 && (
              <div className="h-32 w-32 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-16 w-16" />
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">{onboardingSlides[currentSlide].title}</h1>
          <p className="text-lg text-white/80 mb-8">{onboardingSlides[currentSlide].description}</p>

          <div className="flex justify-between items-center">
            {currentSlide > 0 ? (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Skip
              </Button>
            )}

            <div className="flex space-x-1">
              {onboardingSlides.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-brand-orange" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <Button 
              onClick={handleNext} 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              {currentSlide === onboardingSlides.length - 1 ? (
                <>Get Started</>
              ) : (
                <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
