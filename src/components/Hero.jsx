import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/images/dark_tech_bg.png';

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center bg-[#071324] overflow-hidden pt-28 pb-16 min-h-[55vh]">
      {/* Background Image Cover with subtle responsive overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={bgImage} 
          alt="IT Company background" 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-[#030e22]/50 backdrop-blur-[2px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 lg:px-12 text-left space-y-6 relative z-10">
        
        {/* Subtitle or Badge equivalent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-base md:text-lg font-semibold tracking-wide"
        >
          Talent Solutions & Managed IT Portal
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl"
        >
          Connecting top talent with <br className="hidden sm:inline" />
          <span className="text-blue-400">leading opportunities</span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl"
        >
          Find jobs that match your skills and career goals. Scale your business operations with our elite managed IT services, staffing networks, and customized corporate training models.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-start gap-4 pt-4"
        >
          <Link to="/services" className="btn-primary shadow-lg shadow-blue-900/20">
            <span>View Services</span>
            <span className="text-sm font-light">→</span>
          </Link>
          
          <Link to="/careers" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wide transition border border-white/20">
            <span>Find A Job</span>
            <span className="text-sm font-light ml-2">→</span>
          </Link>
        </motion.div>



      </div>
    </section>
  );
}
