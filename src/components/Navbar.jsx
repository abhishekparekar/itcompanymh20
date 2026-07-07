import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Hover dropdown state indicators
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showTalentMenu, setShowTalentMenu] = useState(false);

  // Mobile navigation collapse toggles
  const [mobileJobsOpen, setMobileJobsOpen] = useState(false);
  const [mobileTalentOpen, setMobileTalentOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white shadow-md border-b border-slate-100 py-3'
        : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-4'
    }`}>
      <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 select-none group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0b4a8f] to-[#1e6ebf] flex items-center justify-center shadow-md">
            <span className="text-white font-black text-base">iC</span>
          </div>
          <div>
            <span className="font-bold text-slate-800 text-lg tracking-tight group-hover:text-[#0b4a8f] transition-colors">
              iCoded
            </span>
            <span className="text-[9px] text-[#82b443] font-bold block uppercase tracking-wider leading-none">
              Automation Pvt. Ltd.
            </span>
          </div>
        </Link>

        {/* Center Navigation Links inside light-grey pill container */}
        <div className="hidden md:flex items-center bg-slate-100/90 py-1.5 px-2 rounded-full space-x-1 border border-slate-200/30">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[10px] font-bold uppercase tracking-wider transition px-3 py-1.5 rounded-full ${
                isActive
                  ? 'bg-white text-[#0b4a8f] shadow-sm border border-slate-200/50'
                  : 'text-slate-650 hover:text-[#0b4a8f]'
              }`
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-[10px] font-bold uppercase tracking-wider transition px-3 py-1.5 rounded-full ${
                isActive
                  ? 'bg-white text-[#0b4a8f] shadow-sm border border-slate-200/50'
                  : 'text-slate-650 hover:text-[#0b4a8f]'
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-[10px] font-bold uppercase tracking-wider transition px-3 py-1.5 rounded-full ${
                isActive
                  ? 'bg-white text-[#0b4a8f] shadow-sm border border-slate-200/50'
                  : 'text-slate-650 hover:text-[#0b4a8f]'
              }`
            }
          >
            Services
          </NavLink>

          {/* Find a job Dropdown trigger */}
          <div 
            className="relative"
            onMouseEnter={() => { setShowMegaMenu(true); setShowTalentMenu(false); }}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <button 
              onClick={() => navigate('/careers')}
              className={`text-[10px] font-bold uppercase tracking-wider transition flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                showMegaMenu ? 'bg-white text-[#0b4a8f] shadow-sm' : 'text-slate-650 hover:text-[#0b4a8f]'
              }`}
            >
              <span>Find a Job</span>
              <span className="text-[7px]">{showMegaMenu ? '▲' : '▼'}</span>
            </button>

            {/* Simple Dynamic Dropdown */}
            {showMegaMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-2xl p-2.5 z-50 text-left animate-fadeIn">
                <div className="space-y-1">
                  <Link 
                    to="/careers" 
                    onClick={() => setShowMegaMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0b4a8f]/10 flex items-center justify-center text-[#0b4a8f]">
                      💼
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">All Openings</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Explore active job listings</p>
                    </div>
                  </Link>

                  <Link 
                    to="/careers?type=Contract" 
                    onClick={() => setShowMegaMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      📝
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">Contract Roles</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Project-based staffing terms</p>
                    </div>
                  </Link>

                  <Link 
                    to="/careers?type=Permanent" 
                    onClick={() => setShowMegaMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      🏢
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">Permanent Roles</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Full-time placement options</p>
                    </div>
                  </Link>

                  <Link 
                    to="/careers?category=CXO" 
                    onClick={() => setShowMegaMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                      💎
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">Executive Roles</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">CXO & enterprise management</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* For Talent Dropdown trigger */}
          <div 
            className="relative"
            onMouseEnter={() => { setShowTalentMenu(true); setShowMegaMenu(false); }}
            onMouseLeave={() => setShowTalentMenu(false)}
          >
            <button 
              onClick={() => navigate('/careers')}
              className={`text-[10px] font-bold uppercase tracking-wider transition flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                showTalentMenu ? 'bg-white text-[#0b4a8f] shadow-sm' : 'text-slate-650 hover:text-[#0b4a8f]'
              }`}
            >
              <span>For Talent</span>
              <span className="text-[7px]">{showTalentMenu ? '▲' : '▼'}</span>
            </button>

            {/* Simple Dynamic Dropdown */}
            {showTalentMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-2xl p-2.5 z-50 text-left animate-fadeIn">
                <div className="space-y-1">
                  <Link 
                    to="/contact?subject=Join+Talent+Pool" 
                    onClick={() => setShowTalentMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0b4a8f]/10 flex items-center justify-center text-[#0b4a8f]">
                      🎯
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">Join Talent Pool</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Submit professional data profiles</p>
                    </div>
                  </Link>

                  <Link 
                    to="/careers" 
                    onClick={() => setShowTalentMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                      🎓
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">Career Advice</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Review templates & career tests</p>
                    </div>
                  </Link>

                  <Link 
                    to="/contact?subject=Register+Institute" 
                    onClick={() => setShowTalentMenu(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#82b443]/10 flex items-center justify-center text-[#82b443]">
                      🌱
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight">Bridging Futures</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">University & college connections</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-[10px] font-bold uppercase tracking-wider transition px-3 py-1.5 rounded-full ${
                isActive
                  ? 'bg-white text-[#0b4a8f] shadow-sm border border-slate-200/50'
                  : 'text-slate-650 hover:text-[#0b4a8f]'
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Right CTA / Admin Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/contact" className="btn-primary">
            <span>Enquire Now</span>
            <span className="text-xs">→</span>
          </Link>
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <Link to="/admin/dashboard" className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">
                Console
              </Link>
              <button onClick={handleLogout} className="text-xs font-bold text-rose-600 hover:text-rose-500 transition px-2">
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/admin" className="px-4 py-2 rounded-full border border-slate-300 hover:border-[#0b4a8f] text-slate-600 hover:text-[#0b4a8f] text-xs font-bold transition">
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#0b4a8f] focus:outline-none"
        >
          {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-6 px-6 animate-fadeIn space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider transition ${
                  isActive ? 'text-[#0b4a8f]' : 'text-slate-600'
                }`
              }
            >
              Home
            </NavLink>
            
            <NavLink
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider transition ${
                  isActive ? 'text-[#0b4a8f]' : 'text-slate-600'
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider transition ${
                  isActive ? 'text-[#0b4a8f]' : 'text-slate-600'
                }`
              }
            >
              Services
            </NavLink>

            {/* Mobile jobs collapse */}
            <div className="space-y-2">
              <button 
                onClick={() => setMobileJobsOpen(!mobileJobsOpen)}
                className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-600 transition focus:outline-none"
              >
                <span>Find a Job</span>
                {mobileJobsOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
              </button>
              {mobileJobsOpen && (
                <div className="pl-4 flex flex-col space-y-2.5 pt-1 text-slate-500 text-xs font-semibold border-l border-slate-100">
                  <Link to="/careers" onClick={() => setMobileOpen(false)}>All Openings</Link>
                  <Link to="/careers?type=Contract" onClick={() => setMobileOpen(false)}>Contract Roles</Link>
                  <Link to="/careers?type=Permanent" onClick={() => setMobileOpen(false)}>Permanent Roles</Link>
                  <Link to="/careers?category=CXO" onClick={() => setMobileOpen(false)}>Executive Roles</Link>
                </div>
              )}
            </div>

            {/* Mobile talent collapse */}
            <div className="space-y-2">
              <button 
                onClick={() => setMobileTalentOpen(!mobileTalentOpen)}
                className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-600 transition focus:outline-none"
              >
                <span>For Talent</span>
                {mobileTalentOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
              </button>
              {mobileTalentOpen && (
                <div className="pl-4 flex flex-col space-y-2.5 pt-1 text-slate-500 text-xs font-semibold border-l border-slate-100">
                  <Link to="/contact?subject=Join+Talent+Pool" onClick={() => setMobileOpen(false)}>Join Talent Pool</Link>
                  <Link to="/careers" onClick={() => setMobileOpen(false)}>Career Advice</Link>
                  <Link to="/contact?subject=Register+Institute" onClick={() => setMobileOpen(false)}>Bridging Futures</Link>
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider transition ${
                  isActive ? 'text-[#0b4a8f]' : 'text-slate-650'
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          <hr className="border-slate-100" />

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold block"
            >
              Enquire Now
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold block"
                >
                  Admin Console
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full py-2.5 text-center text-rose-600 text-xs font-bold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold block"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
