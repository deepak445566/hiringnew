"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(null); // Track which resume is downloading
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Function to download resume
  const downloadResume = async (resumeUrl, fileName) => {
    if (!resumeUrl) return;
    
    setDownloading(fileName);
    try {
      // Fetch the file
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create temporary link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'resume.pdf'; // Set download filename
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download resume. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("https://hiringnewok.onrender.com/api/form/all", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        
        if (data.success) {
          setForms(data.forms);
        } else {
          setError(data.message || "Failed to fetch forms");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Filter forms based on search
  const filteredForms = forms.filter(form => 
    form.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.phone?.includes(searchTerm) ||
    form.jobPreference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentForms = filteredForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#18403C] to-[#2c6b64] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="mt-4 text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#18403C] to-[#2c6b64] flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-6 py-4 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 text-sm underline hover:text-white transition"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#18403C] to-[#2c6b64] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 mt-20">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/80 mt-1">Manage job applications</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-white/80 text-sm font-medium">Total Applications</h3>
            <p className="text-3xl font-bold text-white mt-2">{forms.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-white/80 text-sm font-medium">This Month</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {forms.filter(f => new Date(f.createdAt).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-white/80 text-sm font-medium">With Resume</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {forms.filter(f => f.resumeUrl).length}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-white/80 text-sm font-medium">Total Downloads</h3>
            <p className="text-3xl font-bold text-white mt-2">0</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, phone, or job position..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 pl-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20">
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white">All Applications</h2>
            <p className="text-white/60 text-sm mt-1">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredForms.length)} of {filteredForms.length} applications
            </p>
          </div>
          
          {filteredForms.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-white/60">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      Resume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {currentForms.map((item) => (
                    <tr key={item._id} className="hover:bg-white/5 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {item.fullName || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/80">{item.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/80">{item.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.jobPreference === 'frontend' ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30' :
                          item.jobPreference === 'backend' ? 'bg-green-500/20 text-green-200 border border-green-500/30' :
                          'bg-gray-500/20 text-gray-200 border border-gray-500/30'
                        }`}>
                          {item.jobPreference || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.resumeUrl ? (
                          <div className="flex gap-2">
                            {/* View Button */}
                            <a
                              href={item.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-100 text-sm transition flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </a>
                            
                            {/* Download Button */}
                            <button
                              onClick={() => downloadResume(item.resumeUrl, `${item.fullName}_resume.pdf`)}
                              disabled={downloading === `${item.fullName}_resume.pdf`}
                              className="text-green-300 hover:text-green-100 text-sm transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloading === `${item.fullName}_resume.pdf` ? (
                                <>
                                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  Download
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-white/40 text-sm">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filteredForms.length > 0 && (
            <div className="px-6 py-4 border-t border-white/20 flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-white/60">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-white text-[#18403C] font-semibold"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                    currentPage === totalPages
                      ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-white/50 text-sm">
          Showing {currentForms.length} entries per page • Total {filteredForms.length} applications
        </div>
      </div>
    </div>
  );
}