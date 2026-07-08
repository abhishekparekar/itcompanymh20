import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaRocket, FaWrench, FaStar, FaShieldAlt, FaChartLine,
  FaWhatsapp
} from 'react-icons/fa';
import developerImg from '../assets/images/developer_hero.png';
import { COMPANY } from '../constants';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 16 }
    }
  };

  const floatAnim = (delay = 0) => ({
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay }
    }
  });

  return (
    <section className="relative bg-transparent grid-pattern pt-20 pb-6 overflow-x-hidden">

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-light/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-light/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">

        {/* ── MOBILE LAYOUT (< sm) ── */}
        <div className="block sm:hidden">
          <motion.div
            className="space-y-4 text-left"
            variants={container} initial="hidden" animate="visible"
          >
            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2">
              <span className="h-px w-5 bg-accent" />
              <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest">UF Global Solutions Pvt Ltd</span>
              <span className="h-px w-5 bg-accent" />
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={item} className="text-[28px] font-black text-slate-900 tracking-tight leading-[1.15]">
              Building Smart Digital Solutions{' '}
              <span className="gradient-text-red">for Modern Businesses</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={item} className="text-slate-500 text-xs leading-relaxed">
              Professional software company providing website development, mobile apps, CRM, ERP, business automation, and digital solutions.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={item} className="flex flex-col gap-2.5">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-black uppercase tracking-wider shadow-lg">
                <FaRocket className="text-xs text-accent-light" /> Get Free Consultation
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-slate-700 text-xs font-black uppercase tracking-wider border border-slate-200 shadow-sm">
                <FaWrench className="text-xs text-slate-500" /> View Our Services
              </Link>
            </motion.div>

            {/* Mobile image */}
            <motion.div variants={item} className="flex justify-center pt-2">
              <div className="relative inline-block">
                <img src={developerImg} alt="UFGS Developer" className="w-52 object-contain drop-shadow-xl" />
              </div>
            </motion.div>

            {/* Mobile stat badges — below image */}
            <motion.div variants={item} className="grid grid-cols-3 gap-2 pt-1">
              <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-2.5 text-center">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center mb-1.5">
                  <FaStar className="text-amber-400 text-xs" />
                </div>
                <p className="text-[9px] font-black text-slate-800 uppercase leading-tight">Top Rated</p>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Clutch 2025</p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-2.5 text-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-1.5 border border-emerald-100">
                  <FaShieldAlt className="text-emerald-500 text-xs" />
                </div>
                <p className="text-[9px] font-black text-slate-800 uppercase leading-tight">100% On-Time</p>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Delivery</p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-2.5 text-center">
                <div className="w-7 h-7 rounded-lg bg-[#FFF6F3] flex items-center justify-center mb-1.5 border border-accent/10">
                  <FaChartLine className="text-accent text-xs" />
                </div>
                <p className="text-[11px] font-black text-slate-900 leading-none">+150%</p>
                <p className="text-[7px] text-emerald-600 font-bold uppercase tracking-wide mt-0.5">ROI Target</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ── TABLET + DESKTOP LAYOUT (sm+) ── */}
        <div className="hidden sm:flex flex-col lg:flex-row lg:items-center lg:gap-12">

          {/* LEFT: Text */}
          <motion.div
            className="flex-1 space-y-5 text-left"
            variants={container} initial="hidden" animate="visible"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-accent" />
              <span className="text-[11px] font-extrabold text-accent uppercase tracking-widest">UF Global Solutions Pvt Ltd</span>
              <span className="h-px w-6 bg-accent" />
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Building Smart Digital Solutions{' '}
              <span className="gradient-text-red font-black">for Modern Businesses</span>
            </motion.h1>

            <motion.p variants={item} className="text-slate-500 text-sm leading-relaxed max-w-lg">
              UF Global Solutions is a professional software company providing website development,
              mobile app development, CRM, ERP, business automation, and digital solutions for growing businesses.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                <FaRocket className="text-xs text-accent-light" /> Get Free Consultation
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5">
                <FaWrench className="text-xs text-slate-500" /> View Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image + Floating Cards */}
          <div className="flex-1 flex items-center justify-center relative select-none mt-10 lg:mt-0">

            {/* Glow */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-300/20 blur-[80px] pointer-events-none z-0" />
            <div className="absolute w-[380px] h-[380px] border border-blue-200/40 rounded-full pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] border border-blue-200/30 rounded-full pointer-events-none" />

            {/* Glowing dots */}
            <div className="w-3 h-3 bg-emerald-500 rounded-full absolute bottom-[25%] left-[14%] animate-pulse shadow-lg shadow-emerald-500/50" />
            <div className="w-3 h-3 bg-blue-500 rounded-full absolute top-[55%] left-[8%] animate-pulse shadow-lg shadow-blue-500/50" />
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full absolute top-[38%] right-[8%] animate-pulse shadow-lg shadow-amber-400/50" />

            {/* Developer image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-[280px] md:w-[340px] lg:w-[380px] aspect-square flex items-center justify-center"
            >
              <img src={developerImg} alt="UFGS Developer" className="w-full h-full object-contain drop-shadow-2xl z-10" />

              {/* Card 1 — Top Rated */}
              <motion.div variants={floatAnim(0)} animate="animate"
                className="absolute -top-3 -left-16 md:-left-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-xl z-20 flex items-center gap-2.5 w-[180px] md:w-[200px]"
              >
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaStar className="text-amber-400 text-sm" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex gap-0.5 text-[9px] text-amber-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <h4 className="text-[11px] font-black text-slate-800 uppercase">Top Rated Agency</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Clutch 2025</p>
                </div>
              </motion.div>

              {/* Card 2 — On-Time */}
              <motion.div variants={floatAnim(1.5)} animate="animate"
                className="absolute top-[30%] -right-16 md:-right-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-xl z-20 flex items-center gap-2.5 w-[165px] md:w-[180px]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500 border border-emerald-100">
                  <FaShieldAlt className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">100% On-Time</h4>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Delivery Promise</p>
                </div>
              </motion.div>

              {/* Card 3 — Growth */}
              <motion.div variants={floatAnim(0.8)} animate="animate"
                className="absolute -bottom-3 left-2 md:left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-xl z-20 flex items-center gap-2.5 w-[150px] md:w-[165px]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF6F3] flex items-center justify-center flex-shrink-0 text-accent border border-accent/10">
                  <FaChartLine className="text-sm" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Growth</p>
                  <h4 className="text-base font-black text-slate-900 leading-none">+150%</h4>
                  <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest">ROI Target</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>

      </div>

      {/* WhatsApp float button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-emerald-500 flex items-center justify-center rounded-full text-white shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform"
        >
          <FaWhatsapp className="text-xl" />
        </a>
      </div>

    </section>
  );
}
