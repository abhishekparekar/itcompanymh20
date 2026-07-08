import React from 'react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <div className="pb-16 bg-transparent min-h-[70vh]">
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-dark to-primary overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            Case Studies
          </span>
          <h1 className="text-3xl font-black mb-3">
            Our <span className="text-accent">Portfolio</span>
          </h1>
          <p className="text-slate-300 text-xs max-w-xl mx-auto leading-relaxed">
            Discover how we scale enterprise systems, optimize workflows, and engineer custom assets.
          </p>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <span className="text-4xl block">💼</span>
          <h3 className="text-lg font-bold text-slate-800">Portfolio Under Construction</h3>
          <p className="text-xs text-slate-400">
            We are curating a detailed overview of our recent client success stories, cloud migrations, and ERP engineering solutions.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
