
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-navy/90 dark:bg-brand-navy/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              paid<span className="text-brand-orange">.co.zw</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-white hover:text-brand-orange transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#payments"
              className="text-white hover:text-brand-orange transition-colors font-medium"
            >
              Payments
            </a>
            <a
              href="#demo"
              className="text-white hover:text-brand-orange transition-colors font-medium"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-white hover:text-brand-orange transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-white hover:text-brand-orange transition-colors font-medium"
            >
              Testimonials
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle className="border-gray-600 hover:bg-gray-800" />
            <Button 
              variant="outline" 
              className="border-brand-orange text-white"
              onClick={handleLogin}
            >
              Log in
            </Button>
            <Button
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle className="border-gray-600 hover:bg-gray-800" />
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-navy/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-white hover:text-brand-orange py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#payments"
              className="block text-white hover:text-brand-orange py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Payments
            </a>
            <a
              href="#demo"
              className="block text-white hover:text-brand-orange py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="block text-white hover:text-brand-orange py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-white hover:text-brand-orange py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button
                variant="outline"
                className="border-brand-orange text-white w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth/login");
                }}
              >
                Log in
              </Button>
              <Button
                className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth/signup");
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
