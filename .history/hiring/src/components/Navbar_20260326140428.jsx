"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaInfoCircle, 
  FaBriefcase, 
  FaUserTie, 
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight
} from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Navigation links
  const navLinks = [
    { id: "home", name: "Home", path: "/", icon: FaHome },
    { id: "about", name: "About", path: "/about", icon: FaInfoCircle },
    { id: "services", name: "Services", path: "/services", icon: FaBriefcase },
    { id: "career", name: "Career", path: "/career", icon: FaUserTie },
    { id: "contact", name: "Contact Us", path: "/contact", icon: FaEnvelope },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active link based on current path
  useEffect(() => {
    const active = navLinks.find(link => link.path === pathname);
    if (active) {
      setActiveLink(active.id);
    }
  }, [pathname]);

  const handleNavClick = (id, path) => {
    setActiveLink(id);
    setIsOpen(false);
    router.push(path);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 park ${
      scrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-2"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNavClick("home", "/")}
          >
            <div className="relative">
              <img src="/images/logo5.png" className="h-17 w-26" alt="Logo"/>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = activeLink === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.path)}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 group ${
                    isActive
                      ? scrolled
                        ? "text-[#18403C] bg-[#18403C]/10"
                        : "text-white bg-white/20"
                      : scrolled
                      ? "text-gray-600 hover:text-[#18403C] hover:bg-gray-100"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <IconComponent className={`text-sm transition-all duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`} />
                  <span>{link.name}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full transition-all duration-300 ${
                      scrolled ? "bg-[#18403C]" : "bg-white"
                    }`}></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              scrolled ? "text-[#18403C] hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}>
          <div className={`rounded-2xl p-4 ${
            scrolled ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-lg"
          }`}>
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = activeLink === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    isActive
                      ? scrolled
                        ? "bg-[#18403C]/10 text-[#18403C]"
                        : "bg-white/20 text-white"
                      : scrolled
                      ? "text-gray-600 hover:bg-gray-100"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span className="font-medium">{link.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-[#18403C] rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;