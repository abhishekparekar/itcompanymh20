import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaLinkedinIn, FaTwitter, FaFacebookF, FaGithub,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp
} from 'react-icons/fa';
import { getSiteSettings } from '../services/serviceAPI';
import { COMPANY } from '../constants';

export default function Footer() {
  const [tagline, setTagline] = useState(COMPANY.tagline);
  const [copyright, setCopyright] = useState(`© ${new Date().getFullYear()} iCoded Automation Pvt. Ltd. All rights reserved.`);
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
    { label: 'Managed IT Services', path: '/services' },
    { label: 'Corporate Training Programs', path: '/services' },
    { label: 'Talent & Workforce Solutions', path: '/careers' },
    { label: 'Software Integration', path: '/services' }
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Find a Job', path: '/careers' },
    { label: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="bg-[#0b132a] text-slate-400 border-t border-slate-900">
      
      {/* Dynamic CTA Strip */}
      <div className="border-b border-slate-900 bg-[#080e21]/70 py-10">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Enterprise Operations?
            </h3>
            <p className="text-xs text-slate-400">Let's discuss managed IT services, staff augmentation, or corporate training setups.</p>
          </div>
          <Link 
            to="/contact" 
            className="px-6 py-3 rounded-full bg-[#82b443] hover:bg-[#689433] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-green-500/10"
          >
            Start A Conversation
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Logo & Company Description */}
          <div className="space-y-5 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0b4a8f] to-[#1e6ebf] flex items-center justify-center">
                <span className="text-white font-black text-sm">iC</span>
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                iCoded
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tagline || "Providing premier Managed IT operations, customizable corporate training bootcamps, and top-tier staffing workflows globally."}
            </p>
            <div className="flex gap-2">
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#82b443] hover:text-[#82b443] transition">
                  <FaLinkedinIn className="text-xs" />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#82b443] hover:text-[#82b443] transition">
                  <FaFacebookF className="text-xs" />
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#82b443] hover:text-[#82b443] transition">
                  <FaTwitter className="text-xs" />
                </a>
              )}
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#82b443] hover:text-[#82b443] transition">
                  <FaGithub className="text-xs" />
                </a>
              )}
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="text-left">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 border-l-2 border-[#82b443] pl-2">
              Core Capabilities
            </h4>
            <ul className="space-y-3">
              {capabilities.map((cap, idx) => (
                <li key={idx}>
                  <Link to={cap.path} className="text-xs text-slate-400 hover:text-white transition">
                    {cap.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 border-l-2 border-[#82b443] pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs text-slate-400 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="text-left space-y-5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 border-l-2 border-[#82b443] pl-2">
              Contact Channels
            </h4>
            <ul className="space-y-3 text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <FaPhone className="text-[#82b443] mt-0.5 text-xs flex-shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition">{COMPANY.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaEnvelope className="text-[#82b443] mt-0.5 text-xs flex-shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition">{COMPANY.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-[#82b443] mt-0.5 text-xs flex-shrink-0" />
                <span className="text-slate-400">{COMPANY.address}</span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#82b443]/10 border border-[#82b443]/20 text-[#82b443] text-xs font-bold hover:bg-[#82b443]/20 transition shadow-sm"
            >
              <FaWhatsapp className="text-sm" /> Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* Copyright Footer Strip */}
      <div className="border-t border-slate-900 bg-[#080e21] py-5">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>{copyright}</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-[#82b443] transition">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
