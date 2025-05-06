
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [currency, setCurrency] = useState("usd");

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-brand-orange/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-brand-orange/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Simple, transparent pricing with no hidden fees. Pay only for what you use.
          </p>
          
          <div className="flex justify-center mt-8">
            <Tabs defaultValue="monthly" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="monthly" 
                  onClick={() => setBillingPeriod("monthly")}
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  onClick={() => setBillingPeriod("yearly")}
                >
                  Yearly (15% off)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="bg-secondary rounded-full p-1 inline-flex">
              <button
                className={`px-4 py-1 rounded-full text-sm ${
                  currency === "usd" 
                    ? "bg-brand-orange text-white" 
                    : "text-gray-300"
                }`}
                onClick={() => setCurrency("usd")}
              >
                USD
              </button>
              <button
                className={`px-4 py-1 rounded-full text-sm ${
                  currency === "zwl" 
                    ? "bg-brand-orange text-white" 
                    : "text-gray-300"
                }`}
                onClick={() => setCurrency("zwl")}
              >
                ZWL
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const monthlyPrice = currency === "usd" ? plan.priceUSD : plan.priceZWL;
            const yearlyPrice = currency === "usd" 
              ? Math.round(plan.priceUSD * 0.85 * 12) 
              : Math.round(plan.priceZWL * 0.85 * 12);
            
            const price = billingPeriod === "monthly" ? monthlyPrice : yearlyPrice;
            const period = billingPeriod === "monthly" ? "/month" : "/year";
            
            return (
              <div 
                key={index}
                className={`rounded-xl overflow-hidden border ${
                  plan.popular 
                    ? "border-brand-orange relative" 
                    : "border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="bg-brand-orange text-white text-xs font-semibold text-center py-1">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      {currency === "usd" ? "$" : "ZWL "}
                      {price.toLocaleString()}
                    </span>
                    <span className="text-gray-400">{period}</span>
                  </div>
                  
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? "bg-brand-orange hover:bg-brand-orange/90" 
                        : "bg-secondary hover:bg-secondary/90"
                    } text-white`}
                  >
                    Get Started
                  </Button>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-brand-orange mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-secondary rounded-xl p-6 md:p-8 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Transaction Fees</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 text-left text-sm font-semibold text-gray-300">Payment Method</th>
                    <th className="py-3 text-center text-sm font-semibold text-gray-300">Basic</th>
                    <th className="py-3 text-center text-sm font-semibold text-gray-300">Business</th>
                    <th className="py-3 text-center text-sm font-semibold text-gray-300">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 text-sm text-gray-300">Mobile Money (EcoCash, OneMoney)</td>
                    <td className="py-3 text-center text-sm text-gray-300">2.5%</td>
                    <td className="py-3 text-center text-sm text-gray-300">2.0%</td>
                    <td className="py-3 text-center text-sm text-gray-300">Custom</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 text-sm text-gray-300">Local Cards (ZimSwitch)</td>
                    <td className="py-3 text-center text-sm text-gray-300">2.9%</td>
                    <td className="py-3 text-center text-sm text-gray-300">2.5%</td>
                    <td className="py-3 text-center text-sm text-gray-300">Custom</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 text-sm text-gray-300">International Cards</td>
                    <td className="py-3 text-center text-sm text-gray-300">3.9% + $0.30</td>
                    <td className="py-3 text-center text-sm text-gray-300">3.5% + $0.30</td>
                    <td className="py-3 text-center text-sm text-gray-300">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-300">Bank Transfers</td>
                    <td className="py-3 text-center text-sm text-gray-300">1.5%</td>
                    <td className="py-3 text-center text-sm text-gray-300">1.0%</td>
                    <td className="py-3 text-center text-sm text-gray-300">Custom</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>All prices in USD are settled in USD. All prices in ZWL are subject to daily exchange rate fluctuations. Settlement time for all transactions is within 24 hours on Basic plan, same-day on Business plan, and instant on Enterprise plan.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for small businesses just getting started.",
    priceUSD: 29,
    priceZWL: 6000,
    popular: false,
    features: [
      "Accept all payment methods",
      "2.5-3.9% transaction fees",
      "Next-day settlements",
      "Basic fraud protection",
      "Email support",
      "Simple checkout integration"
    ]
  },
  {
    name: "Business",
    description: "For growing businesses with higher volume needs.",
    priceUSD: 99,
    priceZWL: 18000,
    popular: true,
    features: [
      "Everything in Basic",
      "2.0-3.5% transaction fees",
      "Same-day settlements",
      "Advanced fraud detection",
      "Priority email & phone support",
      "Customizable checkout",
      "Subscription billing"
    ]
  },
  {
    name: "Enterprise",
    description: "For large businesses with custom requirements.",
    priceUSD: 299,
    priceZWL: 50000,
    popular: false,
    features: [
      "Everything in Business",
      "Custom transaction fees",
      "Instant settlements",
      "AI-powered fraud prevention",
      "Dedicated account manager",
      "Full API access",
      "Custom integrations",
      "Multi-user accounts"
    ]
  }
];

export default PricingSection;
