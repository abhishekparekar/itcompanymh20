import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings, getContactSubmissions, deleteContactSubmission } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaSave, FaEnvelope, FaTrash, FaUser, FaClock } from 'react-icons/fa';

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

  return (
    <div className="space-y-12">
      
      {/* Edit channels form */}
      <form onSubmit={handleUpdateDetails} className="space-y-6 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
        <h3 className="font-display font-extrabold text-lg text-white border-b border-gray-900 pb-3">Corporate Contact Channels</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@itsolution.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (888) 123-4567"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Mailing Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Tech Blvd, Suite A"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Corporate Working Hours
            </label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              placeholder="Mon - Fri: 8:00 AM - 6:00 PM EST"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={savingDetails}
            className="py-3 px-6 bg-[#82b443] hover:bg-[#689433] disabled:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2"
          >
            <FaSave className="text-xs" />
            <span>{savingDetails ? "Updating Channels..." : "Save Channels"}</span>
          </button>
        </div>
      </form>

      {/* Inbox Log Viewer */}
      <div className="bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-900 pb-3">
          <h3 className="font-display font-extrabold text-lg text-white">Inquiries Mailbox Inbox</h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-400">
            {submissions.length} messages
          </span>
        </div>

        {loadingSubmissions ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-gray-500 space-y-2 text-xs">
            <FaEnvelope className="text-2xl block mx-auto text-gray-750 mb-2" />
            <span>No contact inquiries received in the mailbox database yet.</span>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((msg) => (
              <div 
                key={msg.id} 
                className="bg-gray-950 border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="text-sm font-bold text-white flex items-center space-x-1">
                        <FaUser className="text-[10px] text-indigo-400" />
                        <span>{msg.name}</span>
                      </span>
                      <span className="text-xs text-gray-500">({msg.email})</span>
                    </div>
                    <span className="block text-xs font-semibold text-indigo-400 pt-0.5">Subject: {msg.subject}</span>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-start flex-shrink-0">
                    <span className="text-[10px] text-gray-600 flex items-center space-x-1">
                      <FaClock />
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </span>
                    <button
                      onClick={() => handleDeleteSubmission(msg.id)}
                      className="text-gray-500 hover:text-rose-400 p-1.5 rounded bg-gray-900/60 border border-gray-850 hover:bg-gray-900 transition"
                      title="Delete Record"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 bg-gray-900/40 p-4 border border-gray-900 rounded-xl leading-relaxed whitespace-pre-wrap">
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

