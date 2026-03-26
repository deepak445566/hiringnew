"use client";

import React from "react";
import Link from "next/link";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaUserTie,
  FaEnvelope as FaEnvelopeIcon,
  FaShieldAlt,
  FaHandshake,
  FaAward,
  FaGlobe,
  FaHeart,
  FaRocket
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "About Us", path: "/about", icon: FaInfoCircle },
    { name: "Services", path: "/services", icon: FaBriefcase },
    { name: "Career", path: "/career", icon: FaUserTie },
    { name: "Contact Us", path: "/contact", icon: FaEnvelopeIcon },
  ];

  const services = [
    { name: "Infrastructure", path: "/services#infrastructure" },
    { name: "Mining & Metals", path: "/services#mining" },
    { name: "Power & Energy", path: "/services#power" },
    { name: "Telecommunication", path: "/services#telecom" },
    { name: "Manufacturing & Processes", path: "/services#manufacturing" },
    { name: "Aviation & Aerospace", path: "/services#aviation" },
    { name: "Information Technology", path: "/services#it" },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "B-45, Sector 62, Noida, Uttar Pradesh - 201301, India", link: null },
    { icon: FaPhoneAlt, text: "+91 98765 43210", link: "tel:+919876543210" },
    { icon: FaEnvelope, text: "info@zenonhiring.com", link: "mailto:info@zenonhiring.com" },
    { icon: FaClock, text: "Mon - Fri: 9:00 AM - 6:00 PM", link: null },
  ];

  const socialLinks = [
    { icon: FaFacebookF, link: "https://facebook.com", color: "#1877f2" },
    { icon: FaTwitter, link: "https://twitter.com", color: "#1da1f2" },
    { icon: FaLinkedinIn, link: "https://linkedin.com", color: "#0a66c2" },
    { icon: FaInstagram, link: "https://instagram.com", color: "#e4405f" },
    { icon: FaYoutube, link: "https://youtube.com", color: "#ff0000" },
  ];

  return (
    <footer className="relative text-white park">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=800&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2a27]/95 to-[#0a2a27]/50"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/images/logo1.png" className="h-25 w-35" alt="Company Logo"/>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted recruitment partner in Noida, dedicated to connecting exceptional talent with leading organizations across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <FaHeart className="text-red-400" />
                <span>Making careers happen since 2018</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#2c6b64] rounded-full mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={index}>
                    <Link 
                      href={link.path} 
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group"
                    >
                      <IconComponent className="text-sm group-hover:translate-x-1 transition-transform" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Our Services Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Our Sectors
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#2c6b64] rounded-full mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.path} 
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group"
                  >
                    <img src="/images/ok2.svg" className="text-xs group-hover:translate-x-1 transition-transform" alt="arrow"/>
                    <span className="text-sm">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Contact Info
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#2c6b64] rounded-full mt-2"></div>
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent className="text-[#2c6b64] text-lg mt-1 flex-shrink-0" />
                    {info.link ? (
                      <a href={info.link} className="text-white/70 hover:text-white transition-colors text-sm">
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-white/70 text-sm">{info.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white/80">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                      style={{ hover: { backgroundColor: social.color } }}
                    >
                      <IconComponent className="text-white group-hover:text-[#18403C] transition-colors text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/70 text-sm">Get the latest job updates and career tips directly in your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#2c6b64] transition-all"
              />
              <button className="group bg-[#2c6b64] hover:bg-[#18403C] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                Subscribe
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Zenon Hiring Solution. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-white/60 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
            <FaRocket className="text-[#2c6b64] animate-pulse" />
            <span className="text-white text-sm font-medium">Trusted by 200+ Companies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;