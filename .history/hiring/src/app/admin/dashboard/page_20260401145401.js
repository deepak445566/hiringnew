"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/form/all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setForms(data.forms);
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job</th>
            <th>Resume</th>
          </tr>
        </thead>

        <tbody>
          {forms.map((item) => (
            <tr key={item._id} className="border">
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.jobPreference}</td>
              <td>
                <a href={item.resumeUrl} target="_blank" className="text-blue-500">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}