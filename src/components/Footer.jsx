import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLinkedinIn, FaTwitter, FaFacebookF, FaGithub,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowRight
} from 'react-icons/fa';
import { getSiteSettings } from '../services/serviceAPI';
import { COMPANY } from '../constants';
import ufgsLogo from '../assets/images/ufgslogo.jpeg';

export default function Footer() {
  const [tagline, setTagline] = useState(COMPANY.tagline);
  const [copyright, setCopyright] = useState(
    `© ${new Date().getFullYear()} UF Global Solutions Pvt Ltd. All rights reserved.`
  );
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
    { label: 'Career', path: '/careers' },
    { label: 'Contact', path: '/contact' }
  ];

  const socialList = [
    { key: 'linkedin', icon: FaLinkedinIn, label: 'LinkedIn' },
    { key: 'facebook', icon: FaFacebookF, label: 'Facebook' },
    { key: 'twitter', icon: FaTwitter, label: 'Twitter' },
    { key: 'github', icon: FaGithub, label: 'GitHub' }
  ];

  return (
    <footer className="bg-[#0b132a] text-slate-400 border-t border-slate-800 relative z-10">
      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Brand row — always full width on top */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 pb-8 border-b border-slate-800 mb-8">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3.5">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="h-14 w-14 bg-white rounded-2xl p-1.5 flex items-center justify-center shadow-xl flex-shrink-0 border border-white/10">
                <img
                  src={ufgsLogo}
                  alt="UFGS Logo"
                  className="h-full w-full object-contain rounded-xl"
                />
              </div>
            </Link>
            <div className="leading-tight">
              <p className="text-white font-black text-base sm:text-lg tracking-tight">UF Global Solutions</p>
              <p className="text-[10px] text-accent uppercase tracking-widest font-black">PVT. LTD.</p>
              <p className="text-[11px] text-slate-400 mt-1.5 max-w-[220px] sm:max-w-xs leading-relaxed">
                {tagline || 'Smart digital solutions for modern businesses.'}
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-2">
            {socialList.map(({ key, icon: Icon, label }) =>
              socials[key] ? (
                <motion.a
                  key={key}
                  href={socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors duration-200"
                >
                  <Icon className="text-xs" />
                </motion.a>
              ) : null
            )}
          </div>
        </div>

        {/* Links grid — 2 cols on mobile, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {/* Core Capabilities */}
          <div>
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Capabilities
            </h4>
            <ul className="space-y-2.5">
              {capabilities.map((cap, idx) => (
                <li key={idx}>
                  <Link to={cap.path}
                    className="text-[12px] text-slate-400 hover:text-blue-400 hover:translate-x-1 inline-block transition-all duration-200">
                    {cap.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[12px] text-slate-400 hover:text-blue-400 hover:translate-x-1 inline-block transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — spans full row on mobile (col-span-2), normal on md+ */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Contact Us
            </h4>

            {/* Contact items — 2-column on mobile for compactness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-[12px] mb-4">
              <a href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-blue-400 text-[10px]" />
                </span>
                <span className="group-hover:text-blue-400 transition-colors">{COMPANY.phone}</span>
              </a>

              <a href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-blue-400 text-[10px]" />
                </span>
                <span className="group-hover:text-blue-400 transition-colors break-all">{COMPANY.email}</span>
              </a>

              <div className="flex items-start gap-2.5 sm:col-span-2 lg:col-span-1">
                <span className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-blue-400 text-[10px]" />
                </span>
                <span className="leading-relaxed">{COMPANY.address}</span>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wide hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
            >
              <FaWhatsapp className="text-sm" /> Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-slate-800 bg-[#080e21] py-4">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-500 text-center">
          <p>{copyright}</p>
          <p className="text-slate-600">Made with ❤️ in India</p>
        </div>
      </div>

    </footer>
  );
}
