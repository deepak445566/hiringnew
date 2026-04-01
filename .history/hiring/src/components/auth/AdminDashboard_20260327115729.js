"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { 
  FaSignOutAlt, 
  FaEye, 
  FaTrash, 
  FaCheckCircle, 
  FaSpinner,
  FaUsers,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUserCircle
} from 'react-icons/fa';

const AdminDashboard = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0
  });
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async () => {
    const user = auth.currentUser;
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (!user || !isAdmin || user.email !== 'admin@gmail.com') {
      router.push('/admin/login');
      return;
    }
    
    fetchApplications();
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'job_applications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const apps = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });
      
      setApplications(apps);
      
      // Calculate stats
      const pending = apps.filter(app => app.status === 'pending').length;
      const reviewed = apps.filter(app => app.status === 'reviewed').length;
      
      setStats({
        total: apps.length,
        pending: pending,
        reviewed: reviewed
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAdmin');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const markAsReviewed = async (id) => {
    try {
      const appRef = doc(db, 'job_applications', id);
      await updateDoc(appRef, {
        status: 'reviewed',
        reviewedAt: new Date().toISOString()
      });
      fetchApplications();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const deleteApplication = async (id) => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        const appRef = doc(db, 'job_applications', id);
        await deleteDoc(appRef);
        fetchApplications();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mx-auto mb-4" />
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-3xl text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Job Applications Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <FaUsers className="text-4xl text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <FaBriefcase className="text-4xl text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Reviewed</p>
                <p className="text-3xl font-bold text-green-600">{stats.reviewed}</p>
              </div>
              <FaCheckCircle className="text-4xl text-green-500" />
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app, index) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{app.fullName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <FaEnvelope className="text-xs" /> {app.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <FaPhone className="text-xs" /> {app.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.jobLabel || app.jobPreference}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs" />
                        {formatDate(app.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        app.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {app.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {app.status !== 'reviewed' && (
                          <button
                            onClick={() => markAsReviewed(app.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as Reviewed"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Application Details</h3>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-600">Full Name</label>
                    <p className="text-gray-800">{selectedApp.fullName}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Phone</label>
                    <p className="text-gray-800">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Job Preference</label>
                    <p className="text-gray-800">{selectedApp.jobLabel || selectedApp.jobPreference}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="font-semibold text-gray-600">Message</label>
                    <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-lg">
                      {selectedApp.message || 'No message provided'}
                    </p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Applied On</label>
                    <p className="text-gray-800">{formatDate(selectedApp.createdAt)}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Status</label>
                    <p className="text-gray-800 capitalize">{selectedApp.status || 'pending'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                {selectedApp.status !== 'reviewed' && (
                  <button
                    onClick={() => {
                      markAsReviewed(selectedApp.id);
                      setSelectedApp(null);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Mark as Reviewed
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteApplication(selectedApp.id);
                    setSelectedApp(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;