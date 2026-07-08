import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getServices, seedDatabase, submitContactForm } from "../services/serviceAPI";
import ServiceCard from "../components/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle, FaLaptopCode, FaAndroid, FaApple, FaTools, FaBrain, FaCloud } from "react-icons/fa";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const detailSectionRef = useRef(null);

  useEffect(() => {
    async function fetchAllServices() {
      try {
        await seedDatabase();
        const data = await getServices();
        
        // Custom sort to match exactly: Website, Android, iOS, Custom Software, AI/ML, Cloud AI
        const orderedTitles = [
          "Website Development",
          "Android Application Development",
          "iOS Application",
          "Custom Software",
          "AI/ML",
          "Cloud AI"
        ];
        
        const sortedData = [...data].sort((a, b) => {
          const indexA = orderedTitles.indexOf(a.title);
          const indexB = orderedTitles.indexOf(b.title);
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return 0;
        });

        setServices(sortedData);
        
        // Auto select by query param id
        const serviceId = searchParams.get("id");
        const matching = sortedData.find((s) => s.id === serviceId);
        if (matching) {
          setSelectedService(matching);
        } else if (sortedData.length > 0) {
          setSelectedService(sortedData[0]); // Default fallback
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllServices();
  }, []);

  // Sync state if URL query param changes dynamically
  useEffect(() => {
    const serviceId = searchParams.get("id");
    if (serviceId && services.length > 0) {
      const matching = services.find((s) => s.id === serviceId);
      if (matching) {
        setSelectedService(matching);
        // Scroll to details section smoothly
        setTimeout(() => {
          detailSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [searchParams, services]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields (*).");
      return;
    }

    setSubmitting(true);
    try {
      await submitContactForm({
        name,
        email,
        phone,
        subject: `Service Inquiry: ${selectedService.title}`,
        message,
      });

      toast.success("Thank you! Your inquiry has been sent successfully.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition bg-slate-50 hover:bg-white";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <div className="space-y-8 pb-16">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Services Hero Header */}
      <section className="relative pt-28 pb-12 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full blur-[70px] pointer-events-none z-0" />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-2"
          >
            <span className="w-4 h-px bg-blue-400 inline-block" />
            Capabilities & Portfolios
            <span className="w-4 h-px bg-blue-400 inline-block" />
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-3"
          >
            Our Enterprise <span className="text-sky-400">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100/80 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed"
          >
            We deliver state-of-the-art software systems, web engineering workflows, and intelligent integrations built to scale.
          </motion.p>
        </div>
      </section>

      {/* Dynamic Services Catalog Grid */}
      <section className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-md mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-1.5">Capabilities Catalog</h2>
          <div className="w-10 h-1 bg-accent mx-auto mb-2" />
          <p className="text-slate-500 text-xs">
            Browse our list of dynamic solutions designed to automate workflows and scale your business.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <div 
                key={service.id || idx} 
                onClick={() => {
                  setSelectedService(service);
                  setSearchParams({ id: service.id });
                }}
                className="cursor-pointer"
              >
                <ServiceCard service={service} index={idx} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detailed view block + Contact Form */}
      <div ref={detailSectionRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {selectedService && (
            <motion.section 
              key={selectedService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 py-10 border-y border-slate-200/50 text-left"
            >
              <div className="container max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT: Details Block */}
                  <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                        Service Profile
                      </span>
                      <h3 className="text-2xl font-black text-slate-800 leading-tight">
                        {selectedService.title}
                      </h3>
                    </div>

                    {/* Image */}
                    {selectedService.image && (
                      <div className="rounded-2xl overflow-hidden border border-slate-150 shadow-sm max-h-64">
                        <img 
                          src={selectedService.image} 
                          alt={selectedService.title} 
                          className="w-full h-full object-cover aspect-[16/9]"
                        />
                      </div>
                    )}

                    {/* Overview */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overview</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                        {selectedService.description || selectedService.desc}
                      </p>
                    </div>
                    
                    {/* Specifications */}
                    {selectedService.details && (
                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Features & Architecture</h4>
                        <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line font-normal">
                          {selectedService.details}
                        </p>
                      </div>
                    )}

                    {/* Core Promises List */}
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 text-xs">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                        <span>Responsive for all screen sizes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                        <span>SEO optimized code structure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                        <span>Secure database integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                        <span>24/7 dedicated support SLA</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Direct Inquiry Form */}
                  <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">
                        Inquire Now
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-800">
                        Start Your {selectedService.title} Project
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Tell us about your requirements and our developers will contact you.
                      </p>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe" 
                          className={inputClass} 
                          required 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. john@example.com" 
                            className={inputClass} 
                            required 
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Phone Number</label>
                          <input 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +91 98765 43210" 
                            className={inputClass} 
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Project Details & Requirements *</label>
                        <textarea 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)}
                          rows="4" 
                          placeholder="Please describe what you are looking to build, expected timelines, or feature requests..."
                          className={inputClass + " resize-none"} 
                          required 
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-75"
                      >
                        <FaPaperPlane className="text-xs" />
                        {submitting ? "Sending Inquiry..." : "Submit Project Request"}
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}