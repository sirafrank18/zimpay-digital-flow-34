
import React from "react";
import { useParams } from "react-router-dom";
import CreatorPaymentPage from "@/components/creators/CreatorPaymentPage";

const CreatorPayment = () => {
  const { creatorId, linkId } = useParams();

  // In a real app, this would fetch creator and payment data based on the IDs
  const mockCreatorData = {
    displayName: "Creative Artist",
    bio: "Digital artist creating amazing content for my amazing supporters!",
    website: "https://myart.com",
    instagram: "@myartist",
    twitter: "@myartist", 
    youtube: "@myartist",
    categories: ["Art", "Digital Content", "Tutorials"]
  };

  const mockPaymentData = {
    name: "Support My Creative Work",
    description: "Help me continue creating amazing content!",
    amount: 25,
    currency: "USD",
    customAmountAllowed: true
  };

  return (
    <CreatorPaymentPage 
      creatorData={mockCreatorData}
      paymentData={mockPaymentData}
    />
  );
};

export default CreatorPayment;
