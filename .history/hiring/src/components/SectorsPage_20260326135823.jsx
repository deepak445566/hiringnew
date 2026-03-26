"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaLaptopCode,
  FaHeadset,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaBullhorn,
  FaFlask,
  FaPalette,
  FaCar,
  FaBuilding,
  FaBolt,
  FaIndustry,
  FaGlobe,
} from "react-icons/fa";

const SectorsPage = () => {
  const router = useRouter();

  const gocareer = () => {
    router.push("/career");
    window.scrollTo(0, 0);
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleElements, setVisibleElements] = useState({});

  const sectors = [
    { title: "Information Technology", icon: FaLaptopCode, desc: "IT hiring solutions" },
    { title: "Customer Service", icon: FaHeadset, desc: "Customer support hiring" },
    { title: "Human Resource", icon: FaUsers, desc: "HR professionals" },
    { title: "BFSI", icon: FaChartLine, desc: "Banking & finance hiring" },
    { title: "Business Development", icon: FaRocket, desc: "Growth experts" },
    { title: "Sales & Marketing", icon: FaBullhorn, desc: "Sales professionals" },
    { title: "Pharma & FMCG", icon: FaFlask, desc: "Industry experts" },
    { title: "Design & Creative", icon: FaPalette, desc: "Creative talent" },
    { title: "Automobile", icon: FaCar, desc: "Auto industry hiring" },
    { title: "Infrastructure", icon: FaBuilding, desc: "Infra workforce" },
    { title: "Power & Energy", icon: FaBolt, desc: "Energy experts" },
    { title: "Manufacturing", icon: FaIndustry, desc: "Manufacturing hiring" },
  ];

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-16 px-4 bg-gray-50">

      {/* Header */}
      <div className="text-center mb-12 fade-up" id="header">
        <div className="inline-flex gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <FaGlobe className="text-blue-600" />
          <span className="text-blue-600">Industries</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-3">
          Industries We Serve
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Explore hiring opportunities across multiple industries
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sectors.map((sector, index) => {
          const Icon = sector.icon;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="text-center fade-up"
              id={`card-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                opacity: visibleElements[`card-${index}`] ? 1 : 0,
                transform: visibleElements[`card-${index}`]
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "0.5s",
              }}
            >
              <div
                className="w-28 h-28 mx-auto rounded-full flex items-center justify-center bg-blue-500 text-white transition"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              >
                <Icon size={40} />
              </div>

              <h3 className="mt-4 font-bold text-lg text-blue-600">
                {sector.title}
              </h3>

              <p className="text-sm text-gray-500 px-2">
                {sector.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <div className="bg-blue-600 text-white p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-3">
            Don’t See Your Dream Job?
          </h3>
          <p className="mb-6">
            Upload your resume and we’ll connect you with the right opportunity
          </p>
          <button
            onClick={gocareer}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold"
          >
            Upload Resume
          </button>
        </div>
      </div>

    </div>
  );
};

export default SectorsPage;