import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  FaRocket, FaWrench, FaStar, FaShieldAlt, FaChartLine,
  FaRobot, FaBolt, FaWhatsapp
} from 'react-icons/fa';
import developerImg from '../assets/images/developer_hero.png';
import { COMPANY } from '../constants';

export default function Hero() {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  const cardFloatVariants = (delay = 0) => ({
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay
      }
    }
  });

  return (
    <section className="relative min-h-[90vh] bg-transparent grid-pattern flex items-center pt-20 pb-12 overflow-hidden">

      {/* Background Glowing Mesh Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-light/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Heading, buttons, and stats */}
          <motion.div
            className="lg:col-span-6 space-y-8 text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline / Subtitle */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              <span className="text-[11px] font-extrabold text-accent uppercase tracking-widest">
                UF Global Solutions Pvt Ltd
              </span>
              <span className="h-px w-8 bg-accent" />
            </motion.div>

            {/* Title Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Building Smart Digital <br />
              Solutions <br />
              <span className="gradient-text-blue font-black">for Modern Businesses</span>
            </motion.h1>

            {/* Subtext description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-655 text-sm sm:text-base leading-relaxed max-w-lg"
            >
              UF Global Solutions is a professional software company providing website development, mobile app development, CRM, ERP, business automation, and digital solutions for growing businesses.
            </motion.p>

            {/* Buttons Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Rocket Gradient CTA */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaRocket className="text-sm text-accent-light" />
                <span>GET FREE CONSULTATION</span>
              </Link>

              {/* Wrench Services Button */}
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-black uppercase tracking-wider border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaWrench className="text-sm text-slate-505" />
                <span>VIEW OUR SERVICES</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating developer photo & stats cards */}
          <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0 z-10 select-none">

            {/* Background Ripple Concentric Rings */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[90px] pointer-events-none z-0" />
            <div className="absolute w-[450px] h-[450px] border border-blue-200/50 rounded-full pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] border border-blue-200/40 rounded-full pointer-events-none" />
            <div className="absolute w-[250px] h-[250px] border border-blue-200/30 rounded-full pointer-events-none" />

            {/* Glowing Color Spots */}
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full absolute bottom-[25%] left-[20%] sm:left-[25%] animate-pulse shadow-lg shadow-emerald-500/50 z-0" />
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full absolute top-[55%] left-8 sm:left-14 animate-pulse shadow-lg shadow-blue-500/50 z-0" />
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full absolute top-[40%] right-6 sm:right-10 animate-pulse shadow-lg shadow-amber-400/50 z-0" />

            {/* Main Developer Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-80 sm:w-96 max-w-full aspect-square flex items-center justify-center"
            >
              <img
                src={developerImg}
                alt="UFGS Developer"
                className="w-full h-full object-contain pointer-events-none drop-shadow-2xl z-10"
              />
            </motion.div>

            {/* Floating Card 1: Top Rated Clutch */}
            <motion.div
              variants={cardFloatVariants(0)}
              animate="animate"
              className="absolute top-10 left-0 sm:-left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-start gap-3 w-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-primary/20">
                <FaStar className="text-amber-400 text-sm" />
              </div>
              <div className="space-y-0.5">
                <div className="flex gap-0.5 text-[10px] text-amber-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Top Rated Agency</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Clutch 2025</p>
              </div>
            </motion.div>

            {/* Floating Card 2: On-Time Delivery */}
            <motion.div
              variants={cardFloatVariants(1.5)}
              animate="animate"
              className="absolute top-36 right-0 sm:-right-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-center gap-3 w-[200px]"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500 border border-emerald-100">
                <FaShieldAlt className="text-base" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">100% On-Time</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Delivery Promise</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Growth Target */}
            <motion.div
              variants={cardFloatVariants(0.8)}
              animate="animate"
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-start gap-3 w-[180px]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF6F3] flex items-center justify-center flex-shrink-0 text-accent border border-accent/10">
                <FaChartLine className="text-base" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Growth</p>
                <h4 className="text-base font-black text-slate-900 leading-none">+150%</h4>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">ROI Target</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom Right Floating Links */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 select-none">
         {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-emerald-500 flex items-center justify-center rounded-full text-white cursor-pointer shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform"
        >
          <FaWhatsapp className="text-xl" />
        </a>
      </div>

    </section>
  );
}
