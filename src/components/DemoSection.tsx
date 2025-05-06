
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

const DemoSection = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("ZWL");
  const [selectedMethod, setSelectedMethod] = useState("ecocash");

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Reset after some time
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  // Exchange rate simulation
  const exchangeRate = 17.5;
  const amountInUSD = selectedCurrency === "ZWL" 
    ? (selectedAmount / exchangeRate).toFixed(2) 
    : selectedAmount;
  const amountInZWL = selectedCurrency === "USD" 
    ? (selectedAmount * exchangeRate).toFixed(2) 
    : selectedAmount;

  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our <span className="gradient-text">Interactive Demo</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience our payment flow firsthand with our interactive sandbox.
            No real money is involved.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10">
          <div className="w-full lg:w-1/2">
            <div className="bg-secondary rounded-xl p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold mb-6">Sandbox Payment Demo</h3>
              
              <div className="mb-6">
                <label className="block text-sm mb-2">Payment Amount</label>
                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                  {[50, 100, 500].map(amount => (
                    <button
                      key={amount}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        selectedAmount === amount 
                          ? "bg-brand-orange text-white border-brand-orange" 
                          : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedAmount(amount)}
                    >
                      {selectedCurrency === "ZWL" ? "ZWL $" : "USD $"}{amount}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                  <span>
                    {selectedCurrency === "ZWL" 
                      ? `≈ USD $${amountInUSD}` 
                      : `≈ ZWL $${amountInZWL}`}
                  </span>
                  <div className="flex items-center">
                    <button 
                      className={`px-2 py-1 rounded-l-md ${selectedCurrency === "ZWL" 
                        ? "bg-brand-orange text-white" 
                        : "bg-gray-800 text-gray-300"}`}
                      onClick={() => setSelectedCurrency("ZWL")}
                    >
                      ZWL
                    </button>
                    <button 
                      className={`px-2 py-1 rounded-r-md ${selectedCurrency === "USD" 
                        ? "bg-brand-orange text-white" 
                        : "bg-gray-800 text-gray-300"}`}
                      onClick={() => setSelectedCurrency("USD")}
                    >
                      USD
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2">Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "ecocash", name: "EcoCash" },
                    { id: "onemoney", name: "OneMoney" },
                    { id: "zimswitch", name: "ZimSwitch" },
                    { id: "card", name: "Credit Card" }
                  ].map(method => (
                    <button
                      key={method.id}
                      className={`py-3 px-4 rounded-lg border flex items-center transition-all ${
                        selectedMethod === method.id 
                          ? "bg-brand-orange/10 border-brand-orange text-white" 
                          : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className={`w-full ${
                  isProcessing || isSuccess 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-brand-orange hover:bg-brand-orange/90"
                } text-white`}
                onClick={handlePaymentSubmit}
                disabled={isProcessing || isSuccess}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Payment Successful
                  </span>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-secondary rounded-xl p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold mb-6">Currency Converter</h3>
              
              <div className="p-4 bg-brand-navy rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="block text-sm text-gray-400">Current Exchange Rate</span>
                    <span className="text-lg font-semibold">USD 1 = ZWL {exchangeRate}</span>
                  </div>
                  <div className="bg-brand-orange/20 text-brand-orange text-xs py-1 px-2 rounded">
                    Live Rate
                  </div>
                </div>
                <div className="h-24 relative">
                  {/* This would be a chart in a real implementation */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 bg-gray-700 w-full relative">
                      <div className="absolute h-2 w-2 bg-brand-orange rounded-full" style={{ left: '70%', top: '-4px' }}></div>
                      <div className="absolute h-2 w-2 bg-brand-orange rounded-full" style={{ left: '20%', top: '-4px' }}></div>
                      <div className="absolute h-2 w-2 bg-brand-orange rounded-full" style={{ left: '50%', top: '-4px' }}></div>
                      <div className="absolute h-2 w-2 bg-brand-orange rounded-full" style={{ left: '85%', top: '-4px' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Convert USD to ZWL</label>
                  <div className="flex items-center">
                    <span className="bg-gray-800 px-3 py-2 rounded-l-md text-gray-300">USD $</span>
                    <input 
                      type="number"
                      value={selectedCurrency === "USD" ? selectedAmount : amountInUSD} 
                      onChange={(e) => {
                        setSelectedCurrency("USD");
                        setSelectedAmount(Number(e.target.value));
                      }}
                      className="bg-gray-800 px-3 py-2 w-full focus:outline-none rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Convert ZWL to USD</label>
                  <div className="flex items-center">
                    <span className="bg-gray-800 px-3 py-2 rounded-l-md text-gray-300">ZWL $</span>
                    <input 
                      type="number" 
                      value={selectedCurrency === "ZWL" ? selectedAmount : amountInZWL}
                      onChange={(e) => {
                        setSelectedCurrency("ZWL");
                        setSelectedAmount(Number(e.target.value));
                      }}
                      className="bg-gray-800 px-3 py-2 w-full focus:outline-none rounded-r-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-400">
                <p>All conversions use the latest RBZ exchange rates. Rates are updated hourly during business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
