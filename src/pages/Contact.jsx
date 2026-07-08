import React, { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import { getSiteSettings } from "../services/serviceAPI";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";
import { COMPANY } from "../constants";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

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
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] z-0" />
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 sm:w-[400px] h-64 sm:h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-3">
              <span className="w-5 h-px bg-blue-400 inline-block" />
              Contact Us
              <span className="w-5 h-px bg-blue-400 inline-block" />
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              Let's Build Something
              <span className="block text-sky-400">Great Together</span>
            </h1>
            <p className="max-w-md mx-auto text-blue-100/80 text-xs sm:text-sm leading-relaxed">
              Questions about our IT services, training, or staffing? Our expert team is ready to help.
            </p>
          </motion.div>

          {/* Quick stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {[
              { num: "185+", label: "Projects" },
              { num: "103+", label: "Clients" },
              { num: "24h", label: "Response" },
              { num: "7+", label: "Cities" },
            ].map((s) => (
              <div key={s.label} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-2.5 text-center min-w-[72px]">
                <p className="text-lg sm:text-2xl font-black text-sky-400">{s.num}</p>
                <p className="text-[9px] text-blue-200 font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="relative pb-8 sm:pb-10 -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

            {/* LEFT: Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 sm:p-6 space-y-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Contact Channels</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Reach our team directly.</p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-6">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {contactItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all duration-200"
                      >
                        <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                          {item.clickable ? (
                            <a href={item.href} className="text-slate-800 font-extrabold text-xs hover:text-blue-600 transition break-all">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-slate-700 font-semibold text-xs leading-relaxed">{item.value}</p>
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
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="text-base" />
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
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-4 sm:p-6">
                <div className="mb-4 pb-4 border-b border-slate-100">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
                    <span className="w-4 h-px bg-blue-400 inline-block" />
                    Send a Message
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-800">Submit Your Inquiry</h2>
                  <p className="text-slate-400 text-xs mt-0.5">We respond within 24 business hours.</p>
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