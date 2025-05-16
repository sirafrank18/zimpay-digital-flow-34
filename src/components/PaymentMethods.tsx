
import React from "react";
import { 
  CreditCard, 
  Smartphone, 
  Check, 
  CircleCheck, 
  Shield 
} from "lucide-react";
import CircleDollarSign from "@/components/icons/CircleDollarSign";
import {
  EcoCashIcon,
  ZimSwitchIcon,
  OneMoneyIcon,
  InnBucksIcon,
  CombinedCardIcon,
  OmariIcon
} from "@/components/icons/PaymentIcons";

const PaymentMethods = () => {
  return (
    <section id="payments" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 transition-all duration-700 translate-y-10" data-animate="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Zimbabwe's <span className="gradient-text">Local Payment Methods</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Accept payments from all major Zimbabwean payment methods, 
            with full RBZ compliance and instant settlements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paymentMethods.map((method, index) => (
            <div 
              key={index}
              className="bg-secondary rounded-xl p-6 card-hover border border-gray-800 opacity-0 transition-all duration-700 translate-y-10"
              data-animate="true"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-orange/10 text-brand-orange">
                  {method.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{method.name}</h3>
              <p className="text-gray-400 mb-4">{method.description}</p>
              <div className="flex flex-wrap gap-2">
                {method.features.map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center text-xs bg-brand-navy px-2 py-1 rounded-full text-gray-300"
                  >
                    <CircleCheck className="w-3 h-3 mr-1 text-brand-orange" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-navy/50 border border-gray-800 rounded-xl p-6 md:p-8 opacity-0 transition-all duration-700 translate-y-10" data-animate="true">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:mr-8">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 mr-2 text-brand-orange" />
                <span className="text-sm text-brand-orange font-medium">RBZ Compliant</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Fully Compliant With Reserve Bank of Zimbabwe Regulations
              </h3>
              <p className="text-gray-300">
                Our payment infrastructure is built from the ground up to comply with all RBZ regulations 
                for domestic and international transactions, keeping your business protected.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="p-4 bg-secondary rounded-lg border border-gray-700">
                <div className="flex items-center justify-center space-x-3">
                  <Check className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-xs text-gray-400">RBZ Certification</div>
                    <div className="text-sm font-medium">Verified & Compliant</div>
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

const paymentMethods = [
  {
    name: "EcoCash",
    icon: <EcoCashIcon />,
    description: "Zimbabwe's leading mobile money platform with the widest reach",
    features: ["QR Pay", "USSD", "Push Payments", "Instant Settlement"]
  },
  {
    name: "OneMoney",
    icon: <OneMoneyIcon />,
    description: "NetOne's mobile money solution with competitive rates",
    features: ["USSD", "App Payments", "Cross Network"]
  },
  {
    name: "ZimSwitch",
    icon: <ZimSwitchIcon />,
    description: "Zimbabwe's national payment switch for bank-to-bank transfers",
    features: ["POS", "ATM", "Bank Transfers", "Real-time"]
  },
  {
    name: "InnBucks",
    icon: <InnBucksIcon />,
    description: "Fast-growing mobile wallet with competitive fees",
    features: ["P2P", "Merchant Payments", "Mobile App"]
  },
  {
    name: "International Cards",
    icon: <CombinedCardIcon />,
    description: "Accept major international cards for forex transactions",
    features: ["Visa", "Mastercard", "USD Settlement", "3D Secure"]
  },
  {
    name: "Omari & More",
    icon: <OmariIcon />,
    description: "Additional payment options for comprehensive coverage",
    features: ["Omari", "Bank Transfers", "Batch Payments"]
  },
];

export default PaymentMethods;
