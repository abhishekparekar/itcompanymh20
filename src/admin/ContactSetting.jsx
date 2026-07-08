import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings, getContactSubmissions, deleteContactSubmission } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaSave, FaEnvelope, FaTrash, FaUser, FaClock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactSetting() {
  // Contact details fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [savingDetails, setSavingDetails] = useState(false);

  // Submissions state
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  // Load contact data
  const loadContactDetails = async () => {
    try {
      const fetched = await getSiteSettings('contact');
      if (fetched) {
        setEmail(fetched.email || '');
        setPhone(fetched.phone || '');
        setAddress(fetched.address || '');
        setWorkingHours(fetched.workingHours || '');
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Contact channels.");
    }
  };

  // Load submissions data
  const loadInboundSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user inquiries inbox.");
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    loadContactDetails();
    loadInboundSubmissions();
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    if (!email || !phone || !address || !workingHours) {
      toast.error("All contact fields are required.");
      return;
    }

    setSavingDetails(true);
    try {
      await updateSiteSettings('contact', {
        email,
        phone,
        address,
        workingHours
      });
      toast.success("Contact channels updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update contact settings.");
    } finally {
      setSavingDetails(false);
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!window.confirm("Delete this submission record?")) return;
    try {
      await deleteContactSubmission(id);
      toast.success("Submission deleted.");
      loadInboundSubmissions();
    } catch (err) {
      console.error(err);
      toast.error("Could not delete message.");
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <div className="space-y-8 text-left">
      
      {/* Edit channels form */}
      <form onSubmit={handleUpdateDetails} className="space-y-5 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-800 border-b border-slate-100 pb-3">Corporate Contact Channels</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@itsolution.com"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (888) 123-4567"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Mailing Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Tech Blvd, Suite A"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Corporate Working Hours</label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              placeholder="Mon - Fri: 8:00 AM - 6:00 PM EST"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={savingDetails}
            className="w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold rounded-lg transition flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
          >
            <FaSave className="text-xs" />
            <span>{savingDetails ? "Saving..." : "Save Channels"}</span>
          </button>
        </div>
      </form>

      {/* Inbox Log Viewer */}
      <div className="bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-800">Inquiries Mailbox Inbox</h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            {submissions.length} messages
          </span>
        </div>

        {loadingSubmissions ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2 text-xs">
            <FaEnvelope className="text-2xl block mx-auto text-slate-300 mb-2" />
            <span>No contact inquiries received in the mailbox database yet.</span>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((msg) => (
              <div 
                key={msg.id} 
                className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 hover:border-blue-200 hover:bg-white transition-all duration-200 space-y-3 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                        <FaUser className="text-[10px] text-blue-500" />
                        <span>{msg.name}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">({msg.email})</span>
                      {msg.phone && <span className="text-[10px] text-slate-400">&middot; {msg.phone}</span>}
                    </div>
                    <span className="block text-xs font-bold text-blue-600">Subject: {msg.subject}</span>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-start flex-shrink-0">
                    <span className="text-[10px] text-slate-400 flex items-center space-x-1 font-medium">
                      <FaClock />
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </span>
                    <button
                      onClick={() => handleDeleteSubmission(msg.id)}
                      className="text-slate-400 hover:text-rose-600 p-2 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition"
                      title="Delete Record"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-white p-4 border border-slate-100 rounded-xl leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}