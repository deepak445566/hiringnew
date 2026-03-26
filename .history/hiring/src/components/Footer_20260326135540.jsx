"use client";

import Link from "next/link";
import Image from "next/image";
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

  return (
    <footer className="relative text-white">
      
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c"
          alt="office"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <Image src="/images/logo1.png" width={140} height={60} alt="logo" />
            <p className="text-white/70 mt-3 text-sm">
              Your trusted recruitment partner in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            {quickLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <Link
                  key={i}
                  href={link.path}
                  className="flex items-center gap-2 text-white/70 hover:text-white mb-2"
                >
                  <Icon /> {link.name}
                </Link>
              );
            })}
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="flex gap-2 text-white/70 text-sm">
              <FaMapMarkerAlt /> Noida, India
            </p>
            <a href="tel:+919876543210" className="flex gap-2 text-white/70 text-sm">
              <FaPhoneAlt /> +91 98765 43210
            </a>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-4 text-center text-sm text-white/60">
          © {currentYear} Zenon Hiring Solution
        </div>

      </div>
    </footer>
  );
};

export default Footer;