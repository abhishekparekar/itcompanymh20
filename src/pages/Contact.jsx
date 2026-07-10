import React, { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import { getSiteSettings } from "../services/serviceAPI";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";
import { COMPANY } from "../constants";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import videoBg2 from "../assets/video/animation4.mp4";

export default function Contact() {
  const [email, setEmail] = useState(COMPANY.email);
  const [phone, setPhone] = useState(COMPANY.phone);
  const [address, setAddress] = useState(COMPANY.address);
  const [workingHours, setWorkingHours] = useState("Monday - Saturday: 9:00 AM - 6:00 PM");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContactSettings() {
      try {
        const fetched = await getSiteSettings("contact");
        if (fetched) {
          if (fetched.email) setEmail(fetched.email);
          if (fetched.phone) setPhone(fetched.phone);
          if (fetched.address) setAddress(fetched.address);
          if (fetched.workingHours) setWorkingHours(fetched.workingHours);
        }
      } catch (err) {
        console.error("Error fetching contact settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContactSettings();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contactItems = [
    {
      icon: <FaPhone className="text-blue-600 text-sm" />,
      bg: "bg-blue-50",
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      clickable: true,
    },
    {
      icon: <FaEnvelope className="text-sky-600 text-sm" />,
      bg: "bg-sky-50",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      clickable: true,
    },
    {
      icon: <FaClock className="text-indigo-600 text-sm" />,
      bg: "bg-indigo-50",
      label: "Working Hours",
      value: workingHours,
      clickable: false,
    },
    {
      icon: <FaMapMarkerAlt className="text-rose-500 text-sm" />,
      bg: "bg-rose-50",
      label: "Address",
      value: address,
      clickable: false,
    },
  ];



  return (
    <div className="min-h-screen bg-transparent">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* ── Hero Banner ── */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 overflow-hidden min-h-[60vh] flex items-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoBg2} type="video/mp4" />
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

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col items-center gap-5"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[11px] font-bold text-sky-300 uppercase tracking-widest bg-sky-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
              Contact Us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight"
              style={{ textShadow: "0 0 60px rgba(169,29,34,0.3), 0 2px 20px rgba(0,0,0,0.6)" }}
            >
              Let's Build Something{" "}
              <span className="gradient-text-red font-black">
                Great Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-slate-200 text-sm sm:text-base leading-relaxed font-medium"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Questions about our IT services, training, or staffing? Our expert team is ready to help.
            </motion.p>

            {/* Quick stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-2"
            >
              {[
                { num: "185+", label: "Projects" },
                { num: "103+", label: "Clients" },
                { num: "24h", label: "Response" },
                { num: "7+", label: "Cities" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-3 text-center min-w-[80px] hover:bg-white/15 transition-all duration-300"
                >
                  <p className="text-xl sm:text-2xl font-black text-accent" style={{ textShadow: "0 0 20px rgba(169,29,34,0.5)" }}>{s.num}</p>
                  <p className="text-[9px] text-blue-200 font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="relative pb-16 sm:pb-20 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* LEFT: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100/80 p-6 sm:p-7 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Direct Contact
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-800">Contact Channels</h2>
                  <p className="text-slate-400 text-xs mt-1">Reach our team directly.</p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-6">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contactItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3.5 p-4 bg-slate-50/80 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200/70 rounded-2xl transition-all duration-300 group"
                      >
                        <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                          {item.clickable ? (
                            <a href={item.href} className="text-slate-800 font-extrabold text-sm hover:text-blue-600 transition-colors duration-200 break-all">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-slate-700 font-semibold text-sm leading-relaxed">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:scale-95"
                >
                  <FaWhatsapp className="text-lg" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* RIGHT: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100/80 p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-600" />
                <div className="mb-6 pb-5 border-b border-slate-100">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    Send a Message
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-800">Submit Your Inquiry</h2>
                  <p className="text-slate-400 text-xs mt-1">We respond within 24 business hours.</p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}