import React, { useState } from "react";
import { submitContactForm } from "../services/serviceAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all required fields (*).");
      return;
    }
    setSubmitting(true);
    try {
      await submitContactForm({ name, email, phone, subject, message });
      toast.success("Thank you! Your message has been sent successfully.");
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition bg-slate-50 hover:bg-white";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <div className="text-left">
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com" className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Subject *</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Project Inquiry" className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Your Message *</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            rows="4" placeholder="Tell us about your project, requirements, timelines..."
            className={inputClass + " resize-none"} required />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
