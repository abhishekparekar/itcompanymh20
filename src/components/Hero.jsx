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
      opacity: 1,
      y: 0,
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
    <section className="relative bg-transparent grid-pattern flex items-center pt-20 pb-8 overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-light/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-light/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

          {/* ── LEFT: Text Content ── */}
          <motion.div
            className="flex-1 space-y-4 text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-accent" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-accent uppercase tracking-widest">
                UF Global Solutions Pvt Ltd
              </span>
              <span className="h-px w-6 bg-accent" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Building Smart Digital{' '}
              Solutions{' '}
              <span className="gradient-text-blue font-black">for Modern Businesses</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-lg"
            >
              UF Global Solutions is a professional software company providing website development,
              mobile app development, CRM, ERP, business automation, and digital solutions for growing businesses.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaRocket className="text-xs text-accent-light" />
                Get Free Consultation
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaWrench className="text-xs text-slate-500" />
                View Our Services
              </Link>
            </motion.div>

            {/* Mobile-only stat pills */}
            <motion.div variants={item} className="flex flex-wrap gap-2 lg:hidden pt-1">
              {[
                { icon: <FaStar className="text-amber-400" />, label: 'Top Rated Agency' },
                { icon: <FaShieldAlt className="text-emerald-500" />, label: '100% On-Time' },
                { icon: <FaChartLine className="text-accent" />, label: '+150% ROI' }
              ].map((pill, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[11px] font-bold text-slate-700">
                  {pill.icon} {pill.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Image + Floating Cards (desktop only) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center relative select-none">

            {/* Concentric rings */}
            <div className="absolute w-[460px] h-[460px] rounded-full bg-blue-300/20 blur-[90px] pointer-events-none z-0" />
            <div className="absolute w-[420px] h-[420px] border border-blue-200/50 rounded-full pointer-events-none" />
            <div className="absolute w-[320px] h-[320px] border border-blue-200/40 rounded-full pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] border border-blue-200/30 rounded-full pointer-events-none" />

            {/* Glowing dots */}
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full absolute bottom-[25%] left-[18%] animate-pulse shadow-lg shadow-emerald-500/50" />
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full absolute top-[55%] left-10 animate-pulse shadow-lg shadow-blue-500/50" />
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full absolute top-[40%] right-8 animate-pulse shadow-lg shadow-amber-400/50" />

            {/* Developer image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-80 sm:w-96 max-w-full aspect-square flex items-center justify-center"
            >
              <img src={developerImg} alt="UFGS Developer" className="w-full h-full object-contain drop-shadow-2xl z-10" />
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              variants={floatAnim(0)} animate="animate"
              className="absolute top-10 -left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-xl z-20 flex items-start gap-3 w-[210px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-md">
                <FaStar className="text-amber-400 text-sm" />
              </div>
              <div className="space-y-0.5">
                <div className="flex gap-0.5 text-[9px] text-amber-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <h4 className="text-[11px] font-black text-slate-800 uppercase">Top Rated Agency</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Clutch 2025</p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              variants={floatAnim(1.5)} animate="animate"
              className="absolute top-36 -right-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-xl z-20 flex items-center gap-3 w-[190px]"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500 border border-emerald-100">
                <FaShieldAlt className="text-sm" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">100% On-Time</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Delivery Promise</p>
              </div>
            </motion.div>

            {/* Floating Card 3 */}
            <motion.div
              variants={floatAnim(0.8)} animate="animate"
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-xl z-20 flex items-start gap-3 w-[170px]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FFF6F3] flex items-center justify-center flex-shrink-0 text-accent border border-accent/10">
                <FaChartLine className="text-sm" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Growth</p>
                <h4 className="text-base font-black text-slate-900 leading-none">+150%</h4>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">ROI Target</p>
              </div>
            </motion.div>
          </div>

          {/* ── Mobile: small developer image ── */}
          <motion.div
            className="lg:hidden flex justify-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <img
              src={developerImg}
              alt="UFGS Developer"
              className="w-52 sm:w-64 object-contain drop-shadow-xl"
            />
          </motion.div>

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
