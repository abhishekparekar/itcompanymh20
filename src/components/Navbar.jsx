import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import ufgsLogo from '../assets/images/ufgslogo.jpeg';
import { getServices } from '../services/serviceAPI';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [dbServices, setDbServices] = useState([]);

  useEffect(() => {
    async function loadNavServices() {
      try {
        const data = await getServices();
        setDbServices(data.slice(0, 6)); // Top 6 services in dropdown
      } catch (err) {
        console.error('Failed to load nav services:', err);
      }
    }
    loadNavServices();
  }, []);

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

  const navLinkClass = ({ isActive }) =>
    `text-[11px] font-bold uppercase tracking-wide transition-all duration-200 px-3.5 py-1.5 rounded-full whitespace-nowrap ${
      isActive
        ? 'bg-accent text-white shadow-sm shadow-accent/25'
        : 'text-slate-700 hover:text-white hover:bg-accent'
    }`;

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 max-w-7xl flex items-center justify-between ${
        scrolled
          ? 'top-2 w-[96%] md:w-[92%] bg-white shadow-xl border border-slate-200/90 py-2 px-5 rounded-full'
          : 'top-3 w-[94%] md:w-[88%] bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg py-2.5 px-5 rounded-full'
      }`}
    >
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2.5 select-none group flex-shrink-0"
      >
        {/* Logo image */}
        <div className="h-11 sm:h-12 md:h-13 w-auto overflow-hidden flex items-center flex-shrink-0">
          <img
            src={ufgsLogo}
            alt="UF Global Solutions Logo"
            className="h-full w-auto object-contain rounded-lg"
            style={{ maxWidth: '140px' }}
          />
        </div>
        {/* Company name — branding text */}
        <div className="flex flex-col leading-none">
          <span className="text-[12px] sm:text-[13px] md:text-[14px] font-black text-primary tracking-tight whitespace-nowrap">
            UF Global Solutions
          </span>
          <span className="text-[8px] sm:text-[9px] font-black text-accent uppercase tracking-widest mt-0.5">
            PVT. LTD.
          </span>
        </div>
      </Link>

      <div className="hidden md:flex items-center bg-slate-100/80 py-1 px-1.5 rounded-full space-x-0.5 border border-slate-200/40">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/products" className={navLinkClass}>Products</NavLink>

        <div
          className="relative"
          onMouseEnter={() => setShowServicesMenu(true)}
          onMouseLeave={() => setShowServicesMenu(false)}
        >
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-[11px] font-bold uppercase tracking-wide transition-all duration-200 flex items-center gap-1 px-3.5 py-1.5 rounded-full whitespace-nowrap ${
                isActive || showServicesMenu
                  ? 'bg-accent text-white shadow-sm shadow-accent/25'
                  : 'text-slate-700 hover:text-white hover:bg-accent'
              }`
            }
          >
            <span>Services</span>
            <FaChevronDown className={`text-[8px] transition-transform duration-200 ${showServicesMenu ? 'rotate-180' : ''}`} />
          </NavLink>

          {showServicesMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2.5 z-50 animate-fadeIn">
              {dbServices.length === 0 ? (
                <span className="text-[10px] text-slate-400 p-2.5 block">Loading services...</span>
              ) : (
                dbServices.map((item) => {
                  const IconComp = FaIcons[item.icon] || FaIcons.FaLaptopCode;
                  return (
                    <Link
                      key={item.id}
                      to={`/services?id=${item.id}`}
                      onClick={() => setShowServicesMenu(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/10 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                        <IconComp />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-slate-800 text-[11px] leading-tight group-hover:text-accent">{item.title}</h5>
                        <p className="text-[9px] text-slate-400 mt-0.5 font-medium line-clamp-1">{item.description}</p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>

        <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
        <NavLink to="/careers" className={navLinkClass}>Career</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <Link
          to="/contact"
          className="px-5 py-2 text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white rounded-full transition-all duration-300 shadow-md shadow-accent/20 hover:-translate-y-0.5"
        >
          Let's Talk
        </Link>
      </div>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 rounded-lg text-slate-600 hover:text-white hover:bg-accent focus:outline-none transition"
      >
        {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
      </button>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-3xl py-5 px-5 animate-fadeIn space-y-1">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/products', label: 'Products' },
            { to: '/services', label: 'Services' },
            { to: '/blog', label: 'Blog' },
            { to: '/careers', label: 'Career' },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition ${
                  isActive ? 'bg-accent text-white' : 'text-slate-700 hover:bg-accent hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="border-t border-slate-100 pt-3 mt-3 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-bold shadow shadow-accent/15"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
