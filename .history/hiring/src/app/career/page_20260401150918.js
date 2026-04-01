"use client";

import { useState } from "react";

export default function Career() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobPreference: "",
    message: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.jobPreference) {
      newErrors.jobPreference = "Please select a job position";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    } else if (formData.resume.size > 5 * 1024 * 1024) {
      newErrors.resume = "File size must be less than 5MB";
    } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(formData.resume.type)) {
      newErrors.resume = "Only PDF or Word documents are allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files[0];
      setFormData({ ...formData, resume: file });
      setFileName(file ? file.name : "");
      // Clear resume error when file is selected
      if (errors.resume) {
        setErrors({ ...errors, resume: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      // Clear field error when user types
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/form/submit", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      
      if (res.ok) {
        alert("Application submitted successfully!");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          jobPreference: "",
          message: "",
          resume: null,
        });
        setFileName("");
        setErrors({});
      } else {
        alert(result.message || "Error submitting application");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#18403C] to-[#2c6b64] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-10">
          
          <h1 className="text-3xl font-bold text-gray-900">Career Form</h1>
         
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-black">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium  mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="John Doe"
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="john@example.com"
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="9876543210"
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Job Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Position <span className="text-red-500">*</span>
              </label>
              <select
                name="jobPreference"
                value={formData.jobPreference}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white ${
                  errors.jobPreference ? "border-red-500" : "border-gray-300"
                }`}
              >
              <option value="">-- Select Job Preference --</option>

  <option value="software-engineer">Software Engineer</option>
  <option value="senior-software-engineer">Senior Software Engineer</option>
  <option value="frontend-developer">Frontend Developer</option>
  <option value="backend-developer">Backend Developer</option>
  <option value="fullstack-developer">Full Stack Developer</option>
  <option value="web-developer">Web Developer</option>
  <option value="mobile-app-developer">Mobile App Developer</option>
  <option value="ui-ux-designer">UI/UX Designer</option>
  <option value="graphic-designer">Graphic Designer</option>
  <option value="product-manager">Product Manager</option>
  <option value="project-manager">Project Manager</option>
  <option value="data-analyst">Data Analyst</option>
  <option value="data-scientist">Data Scientist</option>
  <option value="devops-engineer">DevOps Engineer</option>
  <option value="qa-engineer">QA Engineer</option>
  <option value="technical-support">Technical Support</option>
  <option value="system-administrator">System Administrator</option>
  <option value="database-administrator">Database Administrator</option>
  <option value="network-engineer">Network Engineer</option>
  <option value="cybersecurity-analyst">Cybersecurity Analyst</option>
  <option value="cloud-engineer">Cloud Engineer</option>
  <option value="ai-ml-engineer">AI/ML Engineer</option>
  <option value="business-analyst">Business Analyst</option>
  <option value="marketing-manager">Marketing Manager</option>
  <option value="sales-manager">Sales Manager</option>
  <option value="hr-manager">HR Manager</option>
  <option value="content-writer">Content Writer</option>
  <option value="digital-marketer">Digital Marketer</option>
  <option value="seo-specialist">SEO Specialist</option>
  <option value="ppc-engineer">PPC Engineer</option>
  <option value="quality-engineer">Quality Engineer</option>
  <option value="production-engineer">Production Engineer</option>
  <option value="service-engineer">Service Engineer</option>
  <option value="maintenance-engineer">Maintenance Engineer</option>
  <option value="r-and-d-engineer">R&D Engineer</option>
  <option value="design-engineer">Design Engineer</option>
  <option value="graduate-engineer-trainee">Graduate Engineer Trainee</option>
  <option value="site-engineer">Site Engineer</option>

  <option value="other">Other</option>
              </select>
              {errors.jobPreference && (
                <p className="mt-1 text-sm text-red-600">{errors.jobPreference}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter / Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                rows="4"
                placeholder="Tell us why you'd be a great fit..."
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume/CV <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                errors.resume ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-400"
              }`}>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="cursor-pointer block"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    {fileName ? (
                      <span className="text-green-600 font-medium">{fileName}</span>
                    ) : (
                      <>
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF or Word (Max 5MB)
                  </p>
                </label>
              </div>
              {errors.resume && (
                <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            We'll review your application and get back to you within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}