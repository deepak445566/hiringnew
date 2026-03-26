"use client";

import React from "react";

const FeaturesPage = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          className="w-12 h-12 text-[#1F514C]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Tailored Solutions",
      description: "Custom recruitment strategies designed for your unique business needs."
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-12 h-12 text-[#1F514C]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Faster Hiring",
      description: "Streamlined processes that cut hiring time by 30%."
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-12 h-12 text-[#1F514C]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Access to Top Talent",
      description: "Connect with highly qualified candidates across industries."
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-12 h-12 text-[#1F514C]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Effortless Integration",
      description: "Seamlessly integrate our platform with your existing HR tools for a hiring experience."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
       
        {/* Centered Heading and Paragraph */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-xl font-medium text-[#1F514C] mb-4">
            Our Benefits
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#1F514C] mb-4">
            Platform designed to simplify and enhance the hiring process.
          </h2>
          
          <p className="text-sm md:text-md text-gray-600 leading-relaxed">
            With personalized solutions tailored to your business needs, we connect you with the best talent quickly and efficiently, helping you build stronger, more effective teams.
          </p>
        </div>

        {/* 4 Horizontal Boxes - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group text-center p-6"
            >
              {/* Icon Container */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#1F514C] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-md leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;