
import React from "react";
import { 
  CreditCard, 
  Smartphone, 
  Check, 
  CircleCheck, 
  Shield 
} from "lucide-react";

const PaymentMethods = () => {
  return (
    <section id="payments" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
              className="bg-secondary rounded-xl p-6 card-hover border border-gray-800"
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

        <div className="mt-16 bg-brand-navy/50 border border-gray-800 rounded-xl p-6 md:p-8">
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
    name: "Mobile Money",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Integrate with Zimbabwe's most popular mobile payment methods",
    features: ["EcoCash", "OneMoney", "Telecash", "Instant Settlement"]
  },
  {
    name: "Card Payments",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Accept both local and international card payments securely",
    features: ["ZimSwitch", "Visa", "Mastercard", "USD & ZWL"]
  },
  {
    name: "Bank Transfers",
    icon: <CircleDollarSign className="w-6 h-6" />,
    description: "Connect directly with Zimbabwean banks for seamless transfers",
    features: ["RTGS", "FCA Accounts", "Batch Transfers"]
  },
  {
    name: "QR Payments",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Enable simple scan-to-pay functionality for your customers",
    features: ["Static QR", "Dynamic QR", "Mobile App"]
  },
  {
    name: "USSD Payments",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Reach customers without smartphones through USSD payments",
    features: ["All Networks", "No Internet Required", "SMS Receipts"]
  },
  {
    name: "International",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Accept payments from anywhere in the world with ease",
    features: ["USD Settlement", "PayPal", "Crypto", "Remittances"]
  },
];

export default PaymentMethods;
