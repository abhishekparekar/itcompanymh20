import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getServices, seedDatabase } from "../services/serviceAPI";
import ServiceCard from "../components/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import { FaFileUpload, FaArrowLeft } from "react-icons/fa";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  // Application / Inquiry form state
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeBase64, setResumeBase64] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchAllServices() {
      try {
        await seedDatabase();
        const data = await getServices();
        setServices(data);
        
        // Auto select by query param id
        const serviceId = searchParams.get("id");
        const matching = data.find((s) => s.id === serviceId);
        if (matching) {
          setSelectedService(matching);
        } else if (data.length > 0) {
          setSelectedService(data[0]); // Default fallback
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
        setShowApplyForm(false); // Reset form state when changing tab
      }
    }
  }, [searchParams, services]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be under 2MB.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeBase64(event.target.result);
        setResumeFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !resumeBase64) {
      toast.error("Please fill in all required fields and upload your CV.");
      return;
    }

    setSubmitting(true);
    try {
      const appRef = collection(db, "jobApplications");
      await addDoc(appRef, {
        jobTitle: selectedService.title,
        jobCategory: "Services Inquiry / Recruitment",
        applicantName: name,
        applicantEmail: email,
        applicantPhone: phone,
        applicantResume: resumeBase64,
        applicantResumeName: resumeFileName,
        applicantCover: coverLetter,
        createdAt: new Date().toISOString(),
      });

      toast.success("Application/Inquiry submitted successfully!");
      // Reset form states
      setName("");
      setEmail("");
      setPhone("");
      setResumeBase64("");
      setResumeFileName("");
      setCoverLetter("");
      setShowApplyForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition bg-slate-50 hover:bg-white";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <div className="space-y-12 pb-16">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Services Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-3"
          >
            <span className="w-4 h-px bg-blue-400 inline-block" />
            Capabilities & Portfolios
            <span className="w-4 h-px bg-blue-400 inline-block" />
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Our Enterprise <span className="text-sky-400">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-blue-100/80 text-sm max-w-xl mx-auto leading-relaxed"
          >
            We deliver state-of-the-art software systems, web engineering workflows, and recruitment solutions built to scale.
          </motion.p>
        </div>
      </section>

      {/* Grid of Dynamic Services */}
      <section className="container max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Service Catalog</h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-3" />
          <p className="text-slate-500 text-xs">
            Browse our list of dynamic solutions designed to automate workflows and optimize outputs.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border rounded-2xl">
            <p className="text-sm text-slate-400">No services found. Add some services in the admin dashboard catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Detailed view block for selected service */}
      <AnimatePresence mode="wait">
        {selectedService && (
          <motion.section 
            key={selectedService.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-50 py-12 border-y border-slate-200/50 text-left"
          >
            <div className="container max-w-5xl mx-auto px-6">
              <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 space-y-6">
                
                {/* Upper block header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      Detailed Specifications & Application
                    </span>
                    <h3 className="text-2xl font-black text-slate-800">{selectedService.title}</h3>
                  </div>
                  <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-bold w-fit">
                    Service ID: {selectedService.id?.slice(0, 8)}...
                  </div>
                </div>

                {!showApplyForm ? (
                  // Detail Information
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-8 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overview</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedService.description || selectedService.desc}</p>
                      </div>
                      
                      {selectedService.details && (
                        <div className="space-y-2 pt-4 border-t border-slate-100">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operational Workflows & Specs</h4>
                          <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line font-medium">{selectedService.details}</p>
                        </div>
                      )}

                      <div className="pt-4">
                        <button
                          onClick={() => setShowApplyForm(true)}
                          className="py-3 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                        >
                          Apply / Inquire Now
                        </button>
                      </div>
                    </div>

                    {selectedService.image && (
                      <div className="md:col-span-4 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                        <img 
                          src={selectedService.image} 
                          alt={selectedService.title} 
                          className="w-full h-full object-cover aspect-[4/3]"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  // Application Form
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setShowApplyForm(false)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition flex items-center gap-1"
                      >
                        <FaArrowLeft className="text-[10px]" /> Back
                      </button>
                      <span className="text-xs font-bold text-slate-500">Submit Application for {selectedService.title}</span>
                    </div>

                    <form onSubmit={handleApplySubmit} className="space-y-4 max-w-2xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Full Name *</label>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe" className={inputClass} required />
                        </div>
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com" className={inputClass} required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Phone Number *</label>
                          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210" className={inputClass} required />
                        </div>
                        <div>
                          <label className={labelClass}>Upload CV/Resume * (PDF, Doc, Images under 2MB)</label>
                          <div className="relative">
                            <input 
                              type="file" 
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              required={!resumeBase64}
                            />
                            <div className="w-full px-4 py-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                              <FaFileUpload className="text-blue-500 text-base" />
                              <span>{resumeFileName || "Choose resume file..."}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Brief Statement / Message</label>
                        <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}
                          rows="4" placeholder="Briefly describe your requirements or career objective..."
                          className={inputClass + " resize-none"} />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="py-3 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-500/20 disabled:opacity-75"
                        >
                          {submitting ? "Submitting..." : "Submit Inquiry"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
}