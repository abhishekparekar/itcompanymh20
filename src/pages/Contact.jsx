import React, { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import { getSiteSettings } from "../services/serviceAPI";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaShieldAlt, FaBolt, FaHandshake } from "react-icons/fa";
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
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-transparent">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] z-0" />
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-4">
              <span className="w-5 h-px bg-blue-400 inline-block" />
              Contact Us
              <span className="w-5 h-px bg-blue-400 inline-block" />
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              {"Let's Build Something"}
              <span className="block text-sky-400">Great Together</span>
            </h1>
            <p className="max-w-xl mx-auto text-blue-100/80 text-sm leading-relaxed">
              Have questions about our Managed IT services, corporate training, or staffing solutions? Our expert team is ready to help.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-5 mt-10"
          >
            {[
              { num: "185+", label: "Projects Delivered" },
              { num: "103+", label: "Happy Clients" },
              { num: "24h", label: "Response Time" },
              { num: "7+", label: "Global Cities" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center">
                <p className="text-2xl font-black text-sky-400">{s.num}</p>
                <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative -mt-8 pb-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 space-y-5">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Contact Channels</h2>
                  <p className="text-slate-400 text-xs mt-1">Reach our team directly via phone, email or visit our office.</p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { icon: <FaPhone className="text-blue-600 text-sm" />, bg: "bg-blue-50", label: "Phone Hotline", value: phone, href: `tel:${phone}`, clickable: true },
                      { icon: <FaEnvelope className="text-sky-600 text-sm" />, bg: "bg-sky-50", label: "Email Address", value: email, href: `mailto:${email}`, clickable: true },
                      { icon: <FaClock className="text-indigo-600 text-sm" />, bg: "bg-indigo-50", label: "Operating Hours", value: workingHours, clickable: false },
                      { icon: <FaMapMarkerAlt className="text-rose-500 text-sm" />, bg: "bg-rose-50", label: "Office Address", value: address, clickable: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-4 p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all duration-200">
                        <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>{item.icon}</div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                          {item.clickable ? (
                            <a href={item.href} className="text-slate-800 font-extrabold text-xs hover:text-blue-600 transition break-all">{item.value}</a>
                          ) : (
                            <p className="text-slate-700 font-semibold text-xs leading-relaxed">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={`https://wa.me/${phone?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="text-base" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg aspect-[16/10] bg-white">
                <iframe
                  title="Company Location Map"
                  src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d3782.3804868205213!2d73.84478427514336!3d18.55683938254429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf36676aa90f%3A0x7d6f51be02f4d6d6!2sPune%20University%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
                  className="w-full h-full border-none"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 md:p-10">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
                    <span className="w-4 h-px bg-blue-400 inline-block" />
                    Send a Message
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-800">Submit Your Inquiry</h2>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                    Our managed services and workforce teams respond within 24 business hours.
                  </p>
                </div>

                <ContactForm />

                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-3 gap-3">
                  {[
                    { icon: <FaShieldAlt className="text-blue-500" />, label: "100% Secure" },
                    { icon: <FaBolt className="text-yellow-500" />, label: "Fast Response" },
                    { icon: <FaHandshake className="text-emerald-500" />, label: "100+ Trusted Clients" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-slate-50">
                      <span className="text-base">{b.icon}</span>
                      <p className="text-[10px] font-semibold text-slate-500">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}