
import React, { useEffect } from "react";
import { 
  Shield, 
  Zap, 
  Globe, 
  Calendar, 
  CreditCard, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ActivityIcon from "@/components/icons/ActivityIcon";
import CircleDollarSign from "@/components/icons/CircleDollarSign";
import {
  EcoCashIcon,
  ZimSwitchIcon,
  OneMoneyIcon,
  InnBucksIcon,
  MasterCardIcon,
  VisaIcon,
  OmariIcon
} from "@/components/icons/PaymentIcons";

const FeaturesSection = () => {
  
  useEffect(() => {
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll('[data-animate="true"]');
      
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        if (elementTop < window.innerHeight - elementHeight / 2) {
          element.classList.remove('opacity-0', 'translate-y-10');
          element.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };
    
    // Initial check in case elements are already in viewport
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-40 h-40 rounded-full bg-brand-orange/10 blur-3xl"></div>
      <div className="absolute bottom-1/2 -left-20 w-60 h-60 rounded-full bg-brand-orange/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 transition-all duration-700 translate-y-10" data-animate="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built For <span className="gradient-text">Zimbabwean Businesses</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A complete suite of payment tools designed specifically for the Zimbabwean market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-secondary rounded-xl p-6 card-hover opacity-0 transition-all duration-700 translate-y-10"
              data-animate="true"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-orange/10 text-brand-orange">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 mb-16 opacity-0 transition-all duration-700 translate-y-10" data-animate="true">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Supported <span className="gradient-text">Payment Methods</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {paymentLogos.map((logo, index) => (
              <div 
                key={index}
                className="bg-brand-navy/50 p-4 rounded-xl border border-gray-800 flex items-center justify-center h-20
                opacity-0 transition-all duration-500 translate-y-10"
                data-animate="true"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {logo.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center opacity-0 transition-all duration-700 translate-y-10" data-animate="true">
          <Button
            className="bg-brand-orange hover:bg-brand-orange/90 text-white"
            size="lg"
          >
            Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Instant Settlements",
    description: "Get paid in real-time with instant settlements directly to your bank account in both ZWL and USD.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Dual Currency",
    description: "Seamlessly handle both Zimbabwe Dollar and USD transactions with automatic exchange rates.",
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    title: "Fraud Detection",
    description: "Advanced AI-powered fraud detection system tailored to recognize Zimbabwean fraud patterns.",
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "Local Integrations",
    description: "Pre-built integrations with popular Zimbabwean e-commerce platforms and accounting software.",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Recurring Billing",
    description: "Set up subscription payments with automatic handling of Zimbabwe's dynamic currency environment.",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: "Real-time Analytics",
    description: "Monitor your business performance with detailed analytics and financial reporting.",
    icon: <ActivityIcon className="w-6 h-6" />
  },
];

const paymentLogos = [
  {
    name: "EcoCash",
    icon: <EcoCashIcon />
  },
  {
    name: "OneMoney",
    icon: <OneMoneyIcon />
  },
  {
    name: "ZimSwitch",
    icon: <ZimSwitchIcon />
  },
  {
    name: "InnBucks",
    icon: <InnBucksIcon />
  },
  {
    name: "Visa",
    icon: <VisaIcon />
  },
  {
    name: "MasterCard",
    icon: <MasterCardIcon />
  },
  {
    name: "Omari",
    icon: <OmariIcon />
  }
];

export default FeaturesSection;
