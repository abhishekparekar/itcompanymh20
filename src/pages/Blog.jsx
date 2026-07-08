import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogs, seedBlogs, submitContactForm } from '../services/serviceAPI';
import { toast, ToastContainer } from 'react-toastify';
import videoBg from '../assets/video/animation3.mp4';

const CATEGORIES = [
  "ALL",
  "BUSINESS AUTOMATION",
  "WEB DEVELOPMENT",
  "SALES & CRM",
  "ENTERPRISE TECH",
  "MOBILE APPS"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Inquiry form states
  const [blogName, setBlogName] = useState('');
  const [blogEmail, setBlogEmail] = useState('');
  const [blogPhone, setBlogPhone] = useState('');
  const [blogMessage, setBlogMessage] = useState('');
  const [submittingBlog, setSubmittingBlog] = useState(false);

  useEffect(() => {
    async function loadBlogsData() {
      try {
        await seedBlogs();
        const data = await getBlogs();
        setBlogsList(data);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogsData();
  }, []);

  const handleBlogInquirySubmit = async (e) => {
    e.preventDefault();
    if (!blogName || !blogEmail || !blogMessage) {
      toast.error("Please fill in Name, Email and Message.");
      return;
    }
    setSubmittingBlog(true);
    try {
      await submitContactForm({
        name: blogName,
        email: blogEmail,
        phone: blogPhone,
        subject: `Blog Inquiry: ${selectedBlog.title}`,
        message: blogMessage
      });
      toast.success("Inquiry submitted successfully!");
      setBlogName('');
      setBlogEmail('');
      setBlogPhone('');
      setBlogMessage('');
      setSelectedBlog(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry.");
    } finally {
      setSubmittingBlog(false);
    }
  };

  const filteredPosts = blogsList.filter(post => 
    selectedCategory === "ALL" || post.category === selectedCategory
  );

  return (
    <div className="pb-24 bg-transparent min-h-screen">
      
      {/* Blog Page Hero Header */}
      <section className="bg-slate-950 text-white relative overflow-hidden min-h-[60vh] flex items-center pt-24 pb-14 sm:pt-32 sm:pb-20 text-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        {/* Transparent dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/30 z-0" />
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        
        {/* Animated ambient glowing circles */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 space-y-6">
          
          {/* Insights & Articles Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-[10px] font-bold text-sky-300 uppercase tracking-widest bg-sky-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)] mx-auto select-none"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
            Insights & Articles
          </motion.div>

          {/* Heading Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-sm filter"
          >
            Latest SEO & <span className="gradient-text-red font-black">Technology Blogs</span>
          </motion.h1>

          {/* Subtext description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xs md:text-sm text-slate-200 leading-relaxed font-medium"
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
                className={`px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 border cursor-pointer backdrop-blur-sm ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 border-transparent text-white shadow-lg shadow-blue-500/25 active:scale-95'
                    : 'bg-slate-950/40 border-white/10 text-slate-300 hover:text-white hover:bg-slate-900/60 hover:border-white/20 active:scale-95'
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
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-12">No blogs found in this category.</p>
        ) : (
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
                  onClick={() => setSelectedBlog(post)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl shadow-slate-100/50 hover:border-primary/20 transition-all duration-300 flex flex-col text-left cursor-pointer"
                >
                  
                  {/* Top card image and absolute floating category tag */}
                  <div className="h-48 overflow-hidden relative bg-slate-50 flex-shrink-0">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Category overlay */}
                    <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-indigo-600/90 backdrop-blur-sm text-white shadow-sm">
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
        )}
      </section>

      {/* Selected Blog Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 text-left relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            {/* Close button */}
            <button 
              onClick={() => setSelectedBlog(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-black text-sm"
            >
              ✕
            </button>

            <div>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 inline-block mb-3">
                {selectedBlog.category}
              </span>
              <h3 className="font-black text-slate-850 text-xl md:text-2xl leading-tight">
                {selectedBlog.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Cover & Content */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img 
                    src={selectedBlog.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"} 
                    alt={selectedBlog.title} 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Article Content</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium whitespace-pre-line">
                    {selectedBlog.content || "No details provided for this article."}
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Ask a Question</h4>
                  <p className="text-[10px] text-slate-450 mt-0.5">Want to implement these strategies? Ask our engineers.</p>
                </div>

                <form onSubmit={handleBlogInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={blogName} 
                      onChange={(e) => setBlogName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={blogEmail} 
                      onChange={(e) => setBlogEmail(e.target.value)}
                      placeholder="john@example.com" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={blogPhone} 
                      onChange={(e) => setBlogPhone(e.target.value)}
                      placeholder="+91 98765 43210" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Message</label>
                    <textarea 
                      value={blogMessage} 
                      onChange={(e) => setBlogMessage(e.target.value)}
                      rows="3"
                      placeholder="What would you like to ask or configure?..." 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition resize-none"
                      required 
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingBlog}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-[11px] font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 active:scale-98 disabled:opacity-70"
                  >
                    {submittingBlog ? 'Sending...' : '🚀 Submit Question'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}
