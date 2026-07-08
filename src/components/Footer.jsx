import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLinkedinIn, FaTwitter, FaFacebookF, FaGithub,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp
} from 'react-icons/fa';
import { getSiteSettings } from '../services/serviceAPI';
import { COMPANY } from '../constants';
import ufgsLogo from '../assets/images/ufgslogo.jpeg';

export default function Footer() {
  const [tagline, setTagline] = useState(COMPANY.tagline);
  const [copyright, setCopyright] = useState(`© ${new Date().getFullYear()} UF Global Solutions Pvt Ltd. All rights reserved.`);
  const [socials, setSocials] = useState({
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  });

  useEffect(() => {
    async function loadFooterSettings() {
      try {
        const fetched = await getSiteSettings('footer');
        if (fetched) {
          if (fetched.tagline) setTagline(fetched.tagline);
          if (fetched.copyright) setCopyright(fetched.copyright);
          if (fetched.socials) {
            setSocials({
              facebook: fetched.socials.facebook || 'https://facebook.com',
              twitter: fetched.socials.twitter || 'https://twitter.com',
              linkedin: fetched.socials.linkedin || 'https://linkedin.com',
              github: fetched.socials.github || 'https://github.com'
            });
          }
        }
      } catch (err) {
        console.error('Error loading footer configurations:', err);
      }
    }
    loadFooterSettings();
  }, []);

  const capabilities = [
    { label: 'Software Engineering', path: '/services' },
    { label: 'Mobile Applications', path: '/services' },
    { label: 'Business Automation', path: '/services' },
    { label: 'Cloud Infrastructure', path: '/services' }
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Career', path: '/careers' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-[#0b132a] text-slate-400 border-t border-slate-900 z-10 relative">
      
      {/* Dynamic CTA Strip */}
      <div className="border-b border-slate-900 bg-[#080e21]/75 py-12 relative overflow-hidden">
        
        {/* Glow lights */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-left space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              Ready to Accelerate Your Enterprise Operations?
            </h3>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Let's discuss managed IT services, software product deployments, or custom automation architecture.
            </p>
          </div>
          <Link 
            to="/contact" 
            className="px-6 py-3.5 rounded-full bg-accent hover:bg-accent-dark text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/20 hover:-translate-y-0.5"
          >
            Start A Conversation
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container max-w-7xl mx-auto px-6 py-16 z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Logo & Company Description */}
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-auto bg-white p-1.5 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 shadow-md">
                <img src={ufgsLogo} alt="UFGS Logo" className="h-7 object-contain" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              {tagline || "Providing premier Managed IT operations, customizable corporate training bootcamps, and top-tier staffing workflows globally."}
            </p>
            <div className="flex gap-2.5">
              {socials.linkedin && (
                <motion.a 
                  whileHover={{ y: -3 }}
                  href={socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-accent hover:text-accent text-slate-400 transition-colors"
                >
                  <FaLinkedinIn className="text-xs" />
                </motion.a>
              )}
              {socials.facebook && (
                <motion.a 
                  whileHover={{ y: -3 }}
                  href={socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-accent hover:text-accent text-slate-400 transition-colors"
                >
                  <FaFacebookF className="text-xs" />
                </motion.a>
              )}
              {socials.twitter && (
                <motion.a 
                  whileHover={{ y: -3 }}
                  href={socials.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-accent hover:text-accent text-slate-400 transition-colors"
                >
                  <FaTwitter className="text-xs" />
                </motion.a>
              )}
              {socials.github && (
                <motion.a 
                  whileHover={{ y: -3 }}
                  href={socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-accent hover:text-accent text-slate-400 transition-colors"
                >
                  <FaGithub className="text-xs" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="text-left">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-6 border-l-2 border-accent pl-2.5">
              Core Capabilities
            </h4>
            <ul className="space-y-3.5">
              {capabilities.map((cap, idx) => (
                <li key={idx}>
                  <Link to={cap.path} className="text-xs text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {cap.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-6 border-l-2 border-accent pl-2.5">
              Quick Navigation
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="text-left space-y-6">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-6 border-l-2 border-accent pl-2.5">
              Contact Channels
            </h4>
            <ul className="space-y-3.5 text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <FaPhone className="text-accent mt-0.5 text-xs flex-shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">{COMPANY.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaEnvelope className="text-accent mt-0.5 text-xs flex-shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-accent mt-0.5 text-xs flex-shrink-0" />
                <span className="text-slate-400 leading-normal">{COMPANY.address}</span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-200 shadow-sm"
            >
              <FaWhatsapp className="text-sm" /> Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* Copyright Footer Strip */}
      <div className="border-t border-slate-900/60 bg-[#080e21] py-6 z-10 relative">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <p>{copyright}</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-accent transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
