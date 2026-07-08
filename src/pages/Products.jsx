import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaWrench, FaStar, FaCheck, FaCheckCircle, FaTools } from 'react-icons/fa';
import { PRODUCTS } from '../constants';
import girlImg from '../assets/images/products_hero_girl.png';

export default function Products() {
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
      y: [0, -10, 0],
      transition: {
        duration: 5.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay
      }
    }
  });

  return (
    <div className="pb-20 bg-transparent space-y-16">
      
      {/* Products Hero Section */}
      <section className="relative min-h-[85vh] bg-transparent grid-pattern flex items-center pt-28 pb-16 overflow-hidden">
        
        {/* Background Glowing Mesh Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-light/5 rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/5 rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy Details */}
            <motion.div 
              className="lg:col-span-6 space-y-8 text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Product Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[11px] font-extrabold text-accent uppercase tracking-widest">
                  Software Products Suite
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
              >
                Complete Business Solutions <br />
                <span className="gradient-text-blue font-black">For Modern Companies</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                variants={itemVariants}
                className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg"
              >
                Empower your enterprise with our suite of next-generation software products. We deliver intelligent, scalable systems engineered to automate complex operations, drive unprecedented growth, and secure your digital infrastructure.
              </motion.p>

              {/* Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <FaRocket className="text-sm text-accent-light" />
                  <span>Get Free Consultation</span>
                </Link>
                
                <a 
                  href="#catalog" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-350 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <FaWrench className="text-sm text-slate-500" />
                  <span>View Our Products</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Visual Portrait & Float Overlays */}
            <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0 z-10 select-none">
              
              {/* Blue Circular Backdrop shape */}
              <div className="absolute w-[360px] h-[360px] bg-gradient-to-br from-primary-light to-primary opacity-90 rounded-full z-0 pointer-events-none" />
              <div className="absolute w-[420px] h-[420px] border border-slate-100 rounded-full z-0 pointer-events-none" />

              {/* Thumbs Up Portrait */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-80 sm:w-96 max-w-full aspect-square flex items-center justify-center"
              >
                <img 
                  src={girlImg} 
                  alt="UFGS Products Visual" 
                  className="w-full h-full object-contain pointer-events-none drop-shadow-2xl z-10"
                />
              </motion.div>

              {/* Floating Star Badge (Top-Left of Portrait) */}
              <motion.div 
                variants={cardFloatVariants(0)}
                animate="animate"
                className="absolute top-12 left-0 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-center gap-3 w-[160px]"
              >
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 text-white">
                  <FaStar className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">Top Tier</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Products</p>
                </div>
              </motion.div>

              {/* Floating Fast Setup Progress Bar Card (Bottom-Right of Portrait) */}
              <motion.div 
                variants={cardFloatVariants(1.2)}
                animate="animate"
                className="absolute bottom-6 right-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left w-[210px] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <FaCheckCircle className="text-emerald-500 text-xs" /> Fast Setup
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-600">Active</span>
                </div>
                
                {/* Horizontal Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Product Catalog Grid List */}
      <section id="catalog" className="container max-w-7xl mx-auto px-6 pt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            Enterprise Catalog
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Ready-to-Deploy Product Assets
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4" />
          <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
            Scale operations with our modular software configurations built around modern frameworks.
          </p>
        </motion.div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.name || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:border-primary/20 overflow-hidden text-left flex flex-col justify-between h-full transition-all duration-300"
            >
              {/* Product Card Top Accent Header */}
              <div className={`h-3 bg-gradient-to-r ${prod.gradient || 'from-primary to-primary-light'}`} />
              
              <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Header Icon & Title */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                      <FaTools className="text-base text-primary" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                      Dynamic Product
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                      {prod.tagline}
                    </p>
                  </div>
                </div>

                {/* Features List checklist */}
                <div className="pt-4 border-t border-slate-100 flex-1">
                  <h4 className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {prod.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-650 font-medium">
                        <FaCheck className="text-emerald-500 text-[10px] mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Discover product action */}
                <div className="pt-6">
                  <Link 
                    to="/contact" 
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary text-slate-700 text-xs font-bold text-center block transition-all duration-200"
                  >
                    Request Live Demo &rarr;
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
