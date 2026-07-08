import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FaLock, FaEnvelope, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const { currentUser, userData, login, logout } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If authenticated as admin, go to dashboard
    if (currentUser && userData?.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [currentUser, userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in email and password.");
      return;
    }

    setLoading(true);
    // Login
    try {
      await login(email, password);
      toast.success("Successfully logged in.");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // If logged in but NOT an admin
  if (currentUser && userData?.role !== 'admin') {
    return (
      <div className="bg-slate-50 min-h-screen py-24 px-4 flex items-center justify-center">
        <ToastContainer position="top-right" autoClose={4000} theme="colored" />
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mx-auto text-xl">
            ⚠️
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-xl text-slate-800">Access Denied</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The account <span className="text-slate-700 font-bold">{currentUser.email}</span> does not have Administrative access privileges.
            </p>
          </div>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 border border-slate-200 hover:border-slate-350 bg-white text-slate-700 rounded-full font-bold transition text-xs"
            >
              Go to Homepage
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold transition text-xs flex items-center justify-center space-x-1.5"
            >
              <span>Sign Out of Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4 flex items-center justify-center relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

      {/* Decorative subtle background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 max-w-md w-full relative z-10 space-y-6">
        
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto shadow-md">
            <FaUserShield className="text-white text-lg" />
          </div>
          <h2 className="font-extrabold text-xl text-slate-800">
            Portal Authentication
          </h2>
          <p className="text-[11px] text-slate-400">
            Access administrative settings dashboard.
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <FaEnvelope className="text-xs" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@itsolution.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <FaLock className="text-xs" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-black hover:bg-slate-850 text-white font-bold rounded-full transition duration-200 text-center text-xs mt-4 flex items-center justify-center space-x-2 shadow-md shadow-black/10"
          >
            <FaSignInAlt className="text-xs" />
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
