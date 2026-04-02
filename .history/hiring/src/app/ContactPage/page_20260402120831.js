"use client";

import Image from "next/image";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaFacebook
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#18403C] to-[#2c6b64] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Get in touch with us for any inquiries or support
          </p>
        </div>
      </section>

      {/* Contact Information & Map Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="fade-up-element" id="location">
            <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mb-6 rounded-full"></div>
            <p className="text-gray-600 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-[#18403C]/10 p-3 rounded-lg group-hover:bg-[#18403C] transition-colors duration-300">
                  <FaMapMarkerAlt className="text-[#18403C] text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Address</h4>
                  <p className="text-gray-600">Dehradun, Uttarakhand, India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-[#18403C]/10 p-3 rounded-lg group-hover:bg-[#18403C] transition-colors duration-300">
                  <FaPhoneAlt className="text-[#18403C] text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Phone</h4>
                  <p className="text-gray-600">+91 9650321947</p>
                  <p className="text-gray-500 text-sm">Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-[#18403C]/10 p-3 rounded-lg group-hover:bg-[#18403C] transition-colors duration-300">
                  <FaEnvelope className="text-[#18403C] text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Email</h4>
                  <p className="text-gray-600">info@zenonhiring.com</p>
                  <p className="text-gray-600">careers@zenonhiring.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-[#18403C]/10 p-3 rounded-lg group-hover:bg-[#18403C] transition-colors duration-300">
                  <FaClock className="text-[#18403C] text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Working Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-[#18403C] mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="bg-[#18403C]/10 p-3 rounded-full hover:bg-[#18403C] hover:text-white transition-all duration-300">
                  <FaLinkedin className="text-[#18403C] hover:text-white transition-colors" />
                </a>
                <a href="#" className="bg-[#18403C]/10 p-3 rounded-full hover:bg-[#18403C] hover:text-white transition-all duration-300">
                  <FaTwitter className="text-[#18403C] hover:text-white transition-colors" />
                </a>
                <a href="#" className="bg-[#18403C]/10 p-3 rounded-full hover:bg-[#18403C] hover:text-white transition-all duration-300">
                  <FaFacebook className="text-[#18403C] hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column - Map/Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl fade-up-element" id="map">
            <Image
              src="/images/contact1.jpg"
              alt="Zenon Hiring Office Location"
              width={600}
              height={400}
              loading="eager"
              className="w-full h-96 object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-[#18403C] font-semibold text-lg">Zenon Hiring Solutions</p>
                <p className="text-sm text-gray-600">Dehradun, Uttarakhand</p>
                <p className="text-xs text-gray-500 mt-1">📍 Main Office</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed (Optional) */}
      <section className="py-0">
        <div className="relative h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112196.53314168655!2d77.98121459999999!3d28.4089123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdaa67e7c3d7b%3A0x8d7b6c3e5d7f3a9f!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zenon Hiring Solutions Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}