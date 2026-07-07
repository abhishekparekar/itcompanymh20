import React, { useState } from 'react';
import { submitContactForm } from '../services/serviceAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all required fields (*).");
      return;
    }

    setSubmitting(true);
    try {
      await submitContactForm({
        name,
        email,
        phone,
        subject,
        message
      });
      toast.success("Thank you! Your message has been sent successfully.");
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200 text-left">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <h3 className="text-xl font-bold text-[#0b4a8f] mb-2">Send Us a Message</h3>
      <p className="text-xs text-slate-500 mb-6">We will get back to you within 24 hours.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0b4a8f] focus:ring-1 focus:ring-[#0b4a8f] focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0b4a8f] focus:ring-1 focus:ring-[#0b4a8f] focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0b4a8f] focus:ring-1 focus:ring-[#0b4a8f] focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Project Inquiry"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0b4a8f] focus:ring-1 focus:ring-[#0b4a8f] focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Detailed Message *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            placeholder="Type details about your requirements, project scope, timelines..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0b4a8f] focus:ring-1 focus:ring-[#0b4a8f] focus:outline-none text-xs text-slate-700 placeholder-slate-400 transition resize-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-primary justify-center py-3 text-xs font-bold rounded-xl"
        >
          {submitting ? "Sending message..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
