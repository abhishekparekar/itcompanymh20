import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  "ALL",
  "BUSINESS AUTOMATION",
  "WEB DEVELOPMENT",
  "SALES & CRM",
  "ENTERPRISE TECH",
  "MOBILE APPS"
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Business Automation for Small Business: The Ultimate 2026 Guide",
    category: "BUSINESS AUTOMATION",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Best Software Company in Sambhajinagar for Business Automation",
    category: "BUSINESS AUTOMATION",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Why Your Business Needs a Website in 2026",
    category: "WEB DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Maximizing Leads: How to Configure Sales CRM Systems",
    category: "SALES & CRM",
    image: "https://images.unsplash.com/photo-1552581230-c01528652279?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "The Shift to Enterprise Cloud: Security & Migration Challenges",
    category: "ENTERPRISE TECH",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Native vs Hybrid: Choosing the Right Mobile Architecture",
    category: "MOBILE APPS",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredPosts = BLOG_POSTS.filter(post => 
    selectedCategory === "ALL" || post.category === selectedCategory
  );

  return (
    <div className="pb-24 bg-transparent min-h-[90vh]">
      
      {/* Blog Page Hero Header */}
      <section className="relative pt-32 pb-14 bg-transparent grid-pattern text-center overflow-hidden">
        
        {/* Glow spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 space-y-6">
          
          {/* Insights & Articles Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-wider mx-auto select-none"
          >
            <span>💡</span> Insights & Articles
          </motion.div>

          {/* Heading Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            Latest SEO & <span className="gradient-text-blue font-black">Technology Blogs</span>
          </motion.h1>

          {/* Subtext description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xs md:text-sm text-slate-500 leading-relaxed font-medium"
          >
            Expert strategies, software guides, website templates, and technological automation reviews for small and large-scale enterprises.
          </motion.p>

          {/* Category Filter Pills (staggered flex wraps) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto pt-6"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-350'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="container max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl shadow-slate-100/50 hover:border-primary/20 transition-all duration-300 flex flex-col text-left"
              >
                
                {/* Top card image and absolute floating category tag */}
                <div className="h-48 overflow-hidden relative bg-slate-50 flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-indigo-650/90 backdrop-blur-sm text-white shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Card Body content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-slate-50/20 border-t border-slate-100">
                  <h3 className="font-extrabold text-slate-800 group-hover:text-primary text-sm sm:text-base leading-snug transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
