
import React from "react";
import { 
  Mail, 
  Phone, 
  Shield, 
  Globe, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold text-white mb-4 block">
              paid<span className="text-brand-orange">.co.zw</span>
            </a>
            <p className="text-gray-400 mb-6">
              Zimbabwe's complete payment platform. Accept payments, send payouts, and manage your online business with ease.
            </p>
            <div className="flex flex-col space-y-2">
              <a href="mailto:info@paid.co.zw" className="flex items-center text-gray-300 hover:text-brand-orange transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@paid.co.zw
              </a>
              <a href="tel:+263242123456" className="flex items-center text-gray-300 hover:text-brand-orange transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +263 242 123 456
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Payment Processing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Checkout</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Subscriptions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Connect</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800 mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <a href="#" className="flex items-center bg-secondary px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-secondary/80 transition-colors">
              <Shield className="w-4 h-4 mr-2" />
              RBZ Compliant
            </a>
            <a href="#" className="flex items-center bg-secondary px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-secondary/80 transition-colors">
              <Shield className="w-4 h-4 mr-2" />
              PCI DSS Certified
            </a>
            <a href="#" className="flex items-center bg-secondary px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-secondary/80 transition-colors">
              <Globe className="w-4 h-4 mr-2" />
              API Docs
            </a>
          </div>
          
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Subscribe to newsletter..."
              className="px-4 py-2 bg-secondary rounded-l-lg border-r border-gray-700 focus:outline-none"
            />
            <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-l-none">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} paid.co.zw All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
