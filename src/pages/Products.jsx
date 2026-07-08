import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaWrench, FaStar, FaCheck, FaCheckCircle, FaTools } from 'react-icons/fa';
import { getProducts, submitContactForm, seedProducts } from '../services/serviceAPI';
import girlImg from '../assets/images/products_hero_girl.png';
import { toast, ToastContainer } from 'react-toastify';

export default function Products() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Inquiry form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  useEffect(() => {
    async function loadProductsData() {
      try {
        await seedProducts();
        const data = await getProducts();
        setProductsList(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProductsData();
  }, []);
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

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) {
      toast.error("Please fill in Name, Email and Message.");
      return;
    }
    setSubmittingInquiry(true);
    try {
      await submitContactForm({
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        subject: `Product Demo Inquiry: ${selectedProduct.name}`,
        message: inquiryMessage
      });
      toast.success("Product demo request submitted successfully!");
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMessage('');
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit demo request.");
    } finally {
      setSubmittingInquiry(false);
    }
  };

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
                <span className="gradient-text-red font-black">For Modern Companies</span>
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
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : productsList.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-12">No products configured yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsList.map((prod, idx) => {
              // Handle features both as arrays and comma-separated strings
              const featuresArray = Array.isArray(prod.features) 
                ? prod.features 
                : (typeof prod.features === 'string' ? prod.features.split(',').map(f => f.trim()) : []);

              return (
                <motion.div
                  key={prod.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:border-primary/20 overflow-hidden text-left flex flex-col justify-between h-full transition-all duration-300"
                >
                  {/* Product Card Top Accent Header */}
                  <div className={`h-3 bg-gradient-to-r ${prod.gradient || 'from-blue-600 to-sky-500'}`} />
                  
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
                        {featuresArray.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-650 font-medium">
                            <FaCheck className="text-emerald-500 text-[10px] mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Discover product action */}
                    <div className="pt-6">
                      <button 
                        onClick={() => setSelectedProduct(prod)}
                        className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary text-slate-700 text-xs font-bold text-center block transition-all duration-200 cursor-pointer"
                      >
                        Select & Request Info &rarr;
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Selected Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 md:p-8 space-y-6 text-left relative animate-scaleUp">
            {/* Close button */}
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-black text-sm"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">
                Configure Product License
              </span>
              <h3 className="font-black text-slate-800 text-xl leading-tight">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{selectedProduct.tagline}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2">Capabilities Checklist</h4>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(selectedProduct.features) ? selectedProduct.features : (typeof selectedProduct.features === 'string' ? selectedProduct.features.split(',').map(f => f.trim()) : [])).map((feat, fIdx) => (
                    <span key={fIdx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-semibold">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3.5">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Request Demo / Pricing Spec</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Submit your details to request custom integrations or licensing terms.</p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={inquiryName} 
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Jane Doe" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={inquiryEmail} 
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="jane@example.com" 
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={inquiryPhone} 
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="+91 98765 43210" 
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Project / Use Case Description</label>
                    <textarea 
                      value={inquiryMessage} 
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      rows="3"
                      placeholder="Briefly describe your team size and operational use case..." 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition resize-none"
                      required 
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-[11px] font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 active:scale-98 disabled:opacity-70"
                  >
                    {submittingInquiry ? 'Submitting Request...' : '🚀 Submit Demo Request'}
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
