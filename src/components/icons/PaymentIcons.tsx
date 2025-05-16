
import React from "react";
import { CreditCard } from "lucide-react";

export const EcoCashIcon = () => (
  <div className="flex items-center justify-center p-2 rounded bg-white border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
    <img 
      src="/lovable-uploads/6a98e93c-92d5-44ff-994d-7ee13d50fe3f.png" 
      alt="EcoCash" 
      className="h-10 w-full object-contain"
    />
  </div>
);

export const ZimSwitchIcon = () => (
  <div className="flex items-center justify-center p-2 rounded bg-white border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
    <img 
      src="/lovable-uploads/8daa6e84-3023-441d-9515-3ff4b42f6261.png" 
      alt="ZimSwitch" 
      className="h-10 w-full object-contain"
    />
  </div>
);

export const OneMoneyIcon = () => (
  <div className="flex items-center justify-center p-2 rounded bg-white border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
    <img 
      src="/lovable-uploads/7ec557b7-e330-431f-b853-6a7d8b28a328.png" 
      alt="OneMoney" 
      className="h-10 w-full object-contain"
    />
  </div>
);

export const InnBucksIcon = () => (
  <div className="flex items-center justify-center p-2 rounded bg-white border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
    <img 
      src="/lovable-uploads/e4be8b19-19ec-4171-8ab2-03b502d3f813.png" 
      alt="InnBucks" 
      className="h-10 w-full object-contain"
    />
  </div>
);

export const MasterCardIcon = () => (
  <div className="flex items-center justify-center bg-white p-3 rounded border-2 border-gray-200 shadow-sm hover:shadow-md transition-all h-full w-full">
    <div className="flex items-center">
      <div className="w-6 h-6 rounded-full bg-red-500 opacity-90 mr-[2px]"></div>
      <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-90 ml-[-8px]"></div>
      <span className="ml-2 font-bold text-gray-800 text-sm">MasterCard</span>
    </div>
  </div>
);

export const VisaIcon = () => (
  <div className="flex items-center justify-center bg-[#1434CB] p-3 rounded text-white font-bold border-2 border-gray-200 shadow-sm hover:shadow-md transition-all h-full w-full">
    <div className="h-5 w-10 relative">
      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <div className="font-bold text-white text-2xl transform -translate-y-[1px]">VISA</div>
      </div>
    </div>
  </div>
);

export const OmariIcon = () => (
  <div className="flex items-center justify-center p-2 rounded bg-white border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
    <img 
      src="/lovable-uploads/c49e818b-0335-4113-825f-a8b0d5c214cc.png" 
      alt="Omari" 
      className="h-10 w-full object-contain"
    />
  </div>
);

// Combined icon for Visa and Mastercard sharing a container equally
export const CombinedCardIcon = () => (
  <div className="flex items-center justify-between p-2 rounded bg-white border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex-1 flex items-center justify-center p-2 border-r border-gray-200">
      <div className="h-5 relative">
        <div className="font-bold text-[#1434CB] text-xl">VISA</div>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center p-2">
      <div className="flex items-center">
        <div className="w-5 h-5 rounded-full bg-red-500 opacity-90 mr-[2px]"></div>
        <div className="w-5 h-5 rounded-full bg-yellow-500 opacity-90 ml-[-6px]"></div>
      </div>
    </div>
  </div>
);
