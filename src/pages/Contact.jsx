import React, { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import { getSiteSettings } from "../services/serviceAPI";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";
import { COMPANY } from "../constants";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

export default function Contact() {
  const [email, setEmail]               = useState(COMPANY.email);
  const [phone, setPhone]               = useState(COMPANY.phone);
  const [address, setAddress]           = useState(COMPANY.address);
  const [workingHours, setWorkingHours] = useState("Mon – Sat: 9:00 AM – 6:00 PM");
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const fetched = await getSiteSettings("contact");
        if (fetched) {
          if (fetched.email)        setEmail(fetched.email);
          if (fetched.phone)        setPhone(fetched.phone);
          if (fetched.address)      setAddress(fetched.address);
          if (fetched.workingHours) setWorkingHours(fetched.workingHours);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const contactItems = [
    { icon: <FaPhone className="text-blue-600" />,       bg: "bg-blue-50",   label: "Phone",         value: phone,        href: `tel:${phone}`,        clickable: true },
    { icon: <FaEnvelope className="text-sky-600" />,     bg: "bg-sky-50",    label: "Email",         value: email,        href: `mailto:${email}`,     clickable: true },
    { icon: <FaClock className="text-indigo-600" />,     bg: "bg-indigo-50", label: "Hours",         value: workingHours, clickable: false },
    { icon: <FaMapMarkerAlt className="text-rose-500" />,bg: "bg-rose-50",   label: "Address",       value: address,      clickable: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* ── Compact Page Header ── */}
      <div className="relative pt-20 pb-6 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">
              <span className="w-4 h-px bg-blue-400" /> Contact Us <span className="w-4 h-px bg-blue-400" />
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Let's Build Something <span className="text-sky-400">Great Together</span>
            </h1>
            <p className="text-blue-100/70 text-xs mt-2 max-w-sm mx-auto">
              Our team responds within 24 business hours.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* LEFT — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4 h-full">
              <div>
                <h2 className="text-base font-extrabold text-slate-800">Contact Channels</h2>
                <p className="text-slate-400 text-[11px] mt-0.5">Reach our team directly.</p>
              </div>

              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-2">
                  {contactItems.map((item) => (
                    <div key={item.label}
                      className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-xl transition-colors duration-150">
                      <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xs">{item.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        {item.clickable
                          ? <a href={item.href} className="text-slate-800 font-bold text-[11px] hover:text-blue-600 transition break-all">{item.value}</a>
                          : <p className="text-slate-700 font-semibold text-[11px] leading-snug">{item.value}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <FaWhatsapp className="text-sm" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="mb-4 pb-4 border-b border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
                  <span className="w-3 h-px bg-blue-400" /> Send a Message
                </span>
                <h2 className="text-base font-extrabold text-slate-800">Submit Your Inquiry</h2>
              </div>
              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}