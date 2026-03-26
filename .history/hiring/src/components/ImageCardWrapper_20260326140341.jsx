"use client";

import React from "react";
import Image from "next/image";

const SplitPage = () => {
  return (
    <div className="min-h-screen bg-[#1F514C]">
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* Left Section - 35% Width */}
        <div className="w-full md:w-[35%] bg-[#1F514C] text-white p-4 flex flex-col justify-center">
          <h1 className="mb-3 text-md bg-[#35625D] w-fit rounded-4xl px-4 py-2 font-medium">Our Services</h1>
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Platform that matches with<span className="text-[#AEDA94]"> top-tier talent.</span>
          </h1>
          
          {/* Paragraph */}
          <p className="text-sm md:text-md text-indigo-100 mb-8 leading-relaxed">
            Our tailored approach integrates seamlessly with your existing systems, ensuring a smooth experience from start to finish.
          </p>
          
          {/* Button */}
          <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#1F514C] font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg w-fit group">
            <span>Our Services</span>
            <img src="/images/ok2.svg" alt="Arrow icon" />
          </button>
        </div>

        {/* Right Section - 65% Width */}
        <div className="w-full md:w-[65%] flex flex-col">
          
          {/* Top Section - 10% Height */}
          <div className="h-[10%] bg-[#1F514C] border-b border-[#1F514C] px-6 md:px-8 lg:px-12 flex items-center">
            <div className="flex flex-wrap gap-2 mt-3">
              {/* Tag 1 */}
              <span className="px-2 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-200 transition cursor-pointer">
                Custom Recruitment Strategies
              </span>
              {/* Tag 2 */}
              <span className="px-2 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold hover:bg-green-200 transition cursor-pointer">
                Advanced Candidate Matching
              </span>
              {/* Tag 3 */}
              <span className="px-2 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold hover:bg-purple-200 transition cursor-pointer">
                Seamless HR Integration
              </span>
            </div>
          </div>

          {/* Bottom Section - 90% Height */}
          <div className="h-[90%] bg-[#1F514C] p-6 md:p-8 lg:p-12 overflow-auto">
            <div className="bg-[#35625D] border border-white rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="flex flex-col lg:flex-row h-full">
                
                {/* Left side of bottom section - Content */}
                <div className="w-full lg:w-[60%] p-6 md:p-8">
                  {/* Heading */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    We know every business has unique hiring needs.
                  </h2>
                  
                  {/* Paragraph */}
                  <p className="text-white mb-6 leading-relaxed">
                    We learn about your specific workforce demands and design a recruitment process that attracts the right candidates, enhancing the quality of your hires
                  </p>
                  
                  {/* Bullet Points */}
                  <div className="space-y-3 lg:mb-20">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white">Better Talent Fit</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white">Enhanced Hiring Quality</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white">Reduced Turnover</span>
                    </div>
                  </div>
                </div>
                
                {/* Right side of bottom section - Image */}
                <div className="w-full lg:w-[40%] bg-indigo-50 flex items-center justify-center">
                  <Image
                    src="/images/women.jpeg"
                    alt="Team collaboration"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitPage;