import React, { useState } from 'react';
import { addService } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';

export default function AddService({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [icon, setIcon] = useState('FaLaptopCode');
  const [image, setImage] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !details) {
      toast.error("Please fill in the title, description and specification details.");
      return;
    }

    setSubmitting(true);
    try {
      const defaultImage = image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop";
      await addService({
        title,
        description,
        details,
        icon,
        image: defaultImage
      });
      toast.success("Service added successfully!");
      onSuccess(); // Switch tab back to catalog
    } catch (err) {
      console.error(err);
      toast.error("Failed to add new service profile.");
    } finally {
      setSubmitting(false);
    }
  };

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
          placeholder="Leave blank for automatic futuristic blueprint cover..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
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
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition"
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
          placeholder="Comprehensive engineering details, SLAs, setup methods..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-700 transition resize-none"
          required
        ></textarea>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="py-3.5 px-6 bg-[#82b443] hover:bg-[#689433] disabled:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2 shadow"
        >
          <FaPlusCircle className="text-xs" />
          <span>{submitting ? "Uploading Profile..." : "Publish Service Profile"}</span>
        </button>
      </div>

    </form>
  );
}

