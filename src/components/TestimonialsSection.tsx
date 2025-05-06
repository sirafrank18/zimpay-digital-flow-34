
import React from "react";
import { Card } from "@/components/ui/card";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Zimbabwean Businesses</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear what our customers have to say about their experience with paid.co.zw.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-secondary border-gray-800 p-6 card-hover"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="#FF5F00" 
                      stroke="#FF5F00" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-grow">
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                </blockquote>
                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-center p-6 md:p-8 bg-secondary rounded-xl border border-gray-800">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-2xl font-bold mb-2">Join Zimbabwe's fastest growing payment platform</h3>
            <p className="text-gray-300">Start accepting payments from your customers today.</p>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <div className="grid grid-cols-2 md:flex gap-4 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">500+</span>
                <span className="text-sm text-gray-400">Merchants</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">$10M+</span>
                <span className="text-sm text-gray-400">Processed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">99.9%</span>
                <span className="text-sm text-gray-400">Uptime</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">24/7</span>
                <span className="text-sm text-gray-400">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    quote: "paid.co.zw has revolutionized how we accept payments online. Their integration with EcoCash and OneMoney was seamless, and our checkout conversion has increased by 35%.",
    name: "Tatenda Moyo",
    role: "CEO",
    company: "TechZim Store"
  },
  {
    quote: "The ability to accept both USD and ZWL payments has been a game-changer for our business. Their currency conversion rates are always fair and transparent.",
    name: "Chiedza Ncube",
    role: "Finance Director",
    company: "Harare Fresh Foods"
  },
  {
    quote: "As a smaller business, we were worried about integration complexity, but their team walked us through everything. Now we can process mobile payments, cards, and bank transfers all in one place.",
    name: "Farai Mutasa",
    role: "Founder",
    company: "ZimCrafts"
  },
  {
    quote: "The real-time settlement feature has completely transformed our cash flow. We no longer have to wait days for payments to clear - we see the money instantly.",
    name: "Nyasha Makoni",
    role: "Operations Manager",
    company: "QuickServe Logistics"
  },
  {
    quote: "Their fraud detection system has saved us countless times from potentially fraudulent transactions. It's clearly built with Zimbabwean businesses in mind.",
    name: "Tendai Dube",
    role: "Head of Online Sales",
    company: "ZimMart"
  },
  {
    quote: "We've tried other payment processors, but none understand the unique challenges of the Zimbabwean market like paid.co.zw. Their customer service is unmatched.",
    name: "Rumbidzai Mhaka",
    role: "E-commerce Director",
    company: "Fashion Connect Zim"
  }
];

export default TestimonialsSection;
