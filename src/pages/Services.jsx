import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getServices, seedDatabase, submitContactForm } from "../services/serviceAPI";
import ServiceCard from "../components/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle, FaLaptopCode, FaAndroid, FaApple, FaTools, FaBrain, FaCloud } from "react-icons/fa";
import videoBg from "../assets/video/animation2.mp4";

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
    <div className="space-y-8 pb-16 min-h-screen bg-transparent">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Services Hero Header */}
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

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-sky-300 uppercase tracking-widest bg-sky-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)] mx-auto select-none mb-3 animate-pulse"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
            Capabilities & Portfolios
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-white leading-tight drop-shadow-sm filter"
          >
            Our Enterprise <span className="gradient-text-red font-black">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-medium"
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
                      <h4 className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">Overview</h4>
                      <p className="text-slate-900 text-sm sm:text-base leading-relaxed font-extrabold">
                        {selectedService.description || selectedService.desc}
                      </p>
                    </div>
                    
                    {/* Specifications */}
                    {selectedService.details && (
                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <h4 className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">Core Features & Architecture</h4>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                          {selectedService.details}
                        </p>
                      </div>
                    )}

                    {/* Core Promises List */}
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 text-xs sm:text-sm">
                      {(selectedService.features && selectedService.features.length > 0
                        ? selectedService.features
                        : [
                            "Responsive for all screen sizes",
                            "SEO optimized code structure",
                            "Secure database integration",
                            "24/7 dedicated support SLA"
                          ]
                      ).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 font-semibold text-slate-800">
                          <FaCheckCircle className="text-emerald-500 text-sm sm:text-base flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
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