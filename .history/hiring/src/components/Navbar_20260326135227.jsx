"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaUserTie,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname(); // ✅ current route

  const navLinks = [
    { id: "home", name: "Home", path: "/", icon: FaHome },
    { id: "about", name: "About", path: "/about", icon: FaInfoCircle },
    { id: "services", name: "Services", path: "/services", icon: FaBriefcase },
    { id: "career", name: "Career", path: "/career", icon: FaUserTie },
    { id: "contact", name: "Contact Us", path: "/contact", icon: FaEnvelope },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-2"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <img src="/images/logo5.png" className="h-12 w-auto" alt="logo" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.id}
                  href={link.path}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition ${
                    isActive
                      ? "text-[#18403C] bg-[#18403C]/10"
                      : "text-gray-600 hover:text-[#18403C]"
                  }`}
                >
                  <Icon />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white p-4 rounded-xl shadow">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.id}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isActive
                      ? "bg-[#18403C]/10 text-[#18403C]"
                      : "text-gray-600"
                  }`}
                >
                  <Icon />
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;