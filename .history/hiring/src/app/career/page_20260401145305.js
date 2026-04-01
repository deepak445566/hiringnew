"use client";

import { useState } from "react";

export default function Carr() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobPreference: "",
    message: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/form/submit", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      alert(result.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        jobPreference: "",
        message: "",
        resume: null,
      });

    } catch (err) {
      alert("Error submitting form");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Job Application</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />

        <select name="jobPreference" onChange={handleChange} className="border p-2 w-full">
          <option value="">Select Job</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <textarea name="message" placeholder="Message" onChange={handleChange} className="border p-2 w-full" />

        <input type="file" name="resume" onChange={handleChange} className="border p-2 w-full" />

        <button className="bg-black text-white px-4 py-2 w-full">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}