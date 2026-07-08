import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateService } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

export default function EditService({ serviceId, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [icon, setIcon] = useState('FaLaptopCode');
  const [image, setImage] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const iconsList = [
    { label: "Laptop / Code (FaLaptopCode)", value: "FaLaptopCode" },
    { label: "Cloud Computing (FaCloud)", value: "FaCloud" },
    { label: "Shield / Security (FaShieldAlt)", value: "FaShieldAlt" },
    { label: "Database / Analytics (FaDatabase)", value: "FaDatabase" },
    { label: "Network Architecture (FaNetworkWired)", value: "FaNetworkWired" },
    { label: "Mobile Engineering (FaMobileAlt)", value: "FaMobileAlt" },
    { label: "Settings / Tools (FaTools)", value: "FaTools" }
  ];

  useEffect(() => {
    async function loadService() {
      if (!serviceId) return;
      try {
        const docRef = doc(db, 'services', serviceId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setTitle(data.title || '');
          setDescription(data.description || '');
          setDetails(data.details || '');
          setIcon(data.icon || 'FaLaptopCode');
          setImage(data.image || '');
        } else {
          toast.error("Service profile not found.");
          onSuccess();
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [serviceId, onSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !details) {
      toast.error("Please fill in title, description and specs.");
      return;
    }

    setSubmitting(true);
    try {
      await updateService(serviceId, {
        title,
        description,
        details,
        icon,
        image
      });
      toast.success("Service profile updated!");
      onSuccess(); // Back to list view
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cloud Cost Optimization"
            className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
            required />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Icon Symbol</label>
          <select value={icon} onChange={(e) => setIcon(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition cursor-pointer">
            {iconsList.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cover Image URL (optional)</label>
        <input type="url" value={image} onChange={(e) => setImage(e.target.value)}
          placeholder="Leave blank to keep existing image..."
          className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition" />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Brief Description *</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Short summary shown on service cards..."
          className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
          required />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Detailed Specifications *</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)}
          rows="5" placeholder="Comprehensive engineering details, SLAs, setup methods..."
          className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition resize-none"
          required />
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={submitting}
          className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold rounded-lg transition flex items-center gap-2 shadow-md shadow-blue-500/20 w-full sm:w-auto justify-center">
          <FaEdit className="text-xs flex-shrink-0" />
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}


