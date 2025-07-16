
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
          ? "bg-secondary/90 dark:bg-secondary/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              paid<span className="text-primary">.co.zw</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-white hover:text-primary transition-colors font-medium story-link"
            >
              Features
            </a>
            <a
              href="#payments"
              className="text-white hover:text-primary transition-colors font-medium story-link"
            >
              Payments
            </a>
            <a
              href="#demo"
              className="text-white hover:text-primary transition-colors font-medium story-link"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-white hover:text-primary transition-colors font-medium story-link"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-white hover:text-primary transition-colors font-medium story-link"
            >
              Testimonials
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle className="border-gray-600 hover:bg-gray-800" />
            <Button 
              variant="outline" 
              className="border-primary text-white"
              onClick={handleLogin}
            >
              Log in
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
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
        <div className="md:hidden bg-secondary/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-white hover:text-primary py-2 font-medium story-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#payments"
              className="block text-white hover:text-primary py-2 font-medium story-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Payments
            </a>
            <a
              href="#demo"
              className="block text-white hover:text-primary py-2 font-medium story-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="block text-white hover:text-primary py-2 font-medium story-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-white hover:text-primary py-2 font-medium story-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button
                variant="outline"
                className="border-primary text-white w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth/login");
                }}
              >
                Log in
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-white w-full"
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
