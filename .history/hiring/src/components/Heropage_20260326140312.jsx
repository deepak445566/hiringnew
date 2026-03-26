"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroPage = () => {
  const router = useRouter();

  const goservice = () => {
    router.push("/services");
  };

  const gocareer = () => {
    router.push("/career");
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { url: "/images/main1.jpg", alt: "Recruitment background 1" },
    { url: "/images/ne7.jpg", alt: "Recruitment background 2" },
    { url: "/images/ne3.jpg", alt: "Recruitment background 3" },
    { url: "/images/ne5.jpg", alt: "Recruitment background 4" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 w-3"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-2xl">

            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              <span className="font-semibold">Recruitment</span> process <br />
              with smart solutions.
            </h1>

            <p className="text-gray-200 mb-8">
              Your trusted partner in recruitment, connecting top talent with opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={gocareer}
                className="px-8 py-3 bg-white text-[#1F514C] rounded-full font-semibold"
              >
                Free Consultation
              </button>

              <button
                onClick={goservice}
                className="px-8 py-3 border-2 border-white text-white rounded-full"
              >
                Explore Our Services
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;