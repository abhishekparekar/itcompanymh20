import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { getSiteSettings } from '../services/serviceAPI';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { COMPANY } from '../constants';
import { ToastContainer } from 'react-toastify';

export default function Contact() {
  const [email, setEmail] = useState(COMPANY.email);
  const [phone, setPhone] = useState(COMPANY.phone);
  const [address, setAddress] = useState(COMPANY.address);
  const [workingHours, setWorkingHours] = useState('Monday - Saturday: 9:00 AM - 6:00 PM');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContactSettings() {
      try {
        const fetched = await getSiteSettings('contact');
        if (fetched) {
          if (fetched.email) setEmail(fetched.email);
          if (fetched.phone) setPhone(fetched.phone);
          if (fetched.address) setAddress(fetched.address);
          if (fetched.workingHours) setWorkingHours(fetched.workingHours);
        }
      } catch (err) {
        console.error('Error fetching contact settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadContactSettings();
  }, []);

  return (
    <div className="pt-28 pb-12 bg-slate-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      {/* Dynamic Header Banner */}
      <div className="bg-[#0b4a8f] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
        <div className="container max-w-7xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold text-[#82b443] uppercase tracking-widest block">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Contact Support & Sales
          </h1>
          <div className="w-16 h-1 bg-[#82b443] mx-auto" />
          <p className="max-w-xl mx-auto text-xs md:text-sm text-slate-200">
            Have questions about our Managed IT services, customized training bootcamps, or open job requirements? Get in touch with us.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Channels Cards & Map */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Corporate Channels
              </h2>
              <p className="text-slate-400 text-xs">
                Reach our corporate headquarters or system engineers directly via phone or email during operations.
              </p>
              
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-6 h-6 border-2 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {/* Phone channel */}
                  <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#82b443]/40 transition">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-[#0b4a8f] text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Phone Hotline</h4>
                      <a href={`tel:${phone}`} className="text-slate-800 font-extrabold text-xs block mt-1 hover:text-[#0b4a8f] transition">{phone}</a>
                    </div>
                  </div>

                  {/* Email channel */}
                  <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#82b443]/40 transition">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-[#0b4a8f] text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Email Address</h4>
                      <a href={`mailto:${email}`} className="text-slate-800 font-extrabold text-xs block mt-1 hover:text-[#0b4a8f] transition">{email}</a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#82b443]/40 transition">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-[#0b4a8f] text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Operating Hours</h4>
                      <span className="text-slate-700 font-extrabold text-xs block mt-1">{workingHours}</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-[#0b4a8f] text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Office Address</h4>
                      <p className="text-slate-600 text-xs leading-relaxed mt-1 font-semibold">{address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Google Map location placeholder */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/10] bg-white relative">
              <iframe
                title="Company Corporate HQ Location Map"
                src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d3782.3804868205213!2d73.84478427514336!3d18.55683938254429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf36676aa90f%3A0x7d6f51be02f4d6d6!2sPune%20University%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm text-left space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Submit Inquiry Form
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Drop your details and inquiry messages below. Our workforce development and managed service teams will coordinate and respond within 24 business hours.
              </p>
            </div>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
