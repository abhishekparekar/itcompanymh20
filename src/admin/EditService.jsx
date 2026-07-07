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
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Service Title Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cloud Cost Optimization Audit"
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Choose Graphic Icon Symbol
          </label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white transition cursor-pointer"
          >
            {iconsList.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Service Cover Image URL (Unsplash or direct image link)
        </label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="e.g. https://images.unsplash.com/photo..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-750 transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Brief Teaser Description (Max 150 characters)
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short summary displayed on catalog cards grid..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-705 transition"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Detailed Solution Specifications (markdown or long text)
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows="6"
          placeholder="Detailed explanation, setup methods, specs..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-705 transition resize-none"
          required
        ></textarea>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="py-3.5 px-6 bg-[#82b443] hover:bg-[#689433] disabled:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2 shadow"
        >
          <FaEdit className="text-xs" />
          <span>{submitting ? "Saving Config..." : "Save Config Details"}</span>
        </button>
      </div>

    </form>
  );
}

