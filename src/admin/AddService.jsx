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
    { label: 'Code / Laptop (FaLaptopCode)', value: 'FaLaptopCode' },
    { label: 'Code (FaCode)', value: 'FaCode' },
    { label: 'Android (FaAndroid)', value: 'FaAndroid' },
    { label: 'Apple (FaApple)', value: 'FaApple' },
    { label: 'Brain / AI (FaBrain)', value: 'FaBrain' },
    { label: 'Robot / ML (FaRobot)', value: 'FaRobot' },
    { label: 'Cloud (FaCloud)', value: 'FaCloud' },
    { label: 'Shield / Security (FaShieldAlt)', value: 'FaShieldAlt' },
    { label: 'Database / Analytics (FaDatabase)', value: 'FaDatabase' },
    { label: 'Network (FaNetworkWired)', value: 'FaNetworkWired' },
    { label: 'Mobile (FaMobileAlt)', value: 'FaMobileAlt' },
    { label: 'Tools (FaTools)', value: 'FaTools' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !details) {
      toast.error('Please fill in the title, description and details.');
      return;
    }
    setSubmitting(true);
    try {
      const defaultImage = image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop';
      await addService({ title, description, details, icon, image: defaultImage });
      toast.success('Service added successfully!');
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add service.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition';
  const labelClass = 'block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Service Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cloud Cost Optimization" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Icon Symbol</label>
          <select value={icon} onChange={(e) => setIcon(e.target.value)} className={inputClass + ' cursor-pointer'}>
            {iconsList.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Cover Image URL (optional)</label>
        <input type="url" value={image} onChange={(e) => setImage(e.target.value)}
          placeholder="Leave blank for default image..." className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Brief Description *</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Short summary shown on the service card..." className={inputClass} required />
      </div>

      <div>
        <label className={labelClass}>Detailed Specifications *</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)}
          rows="5" placeholder="Comprehensive details, SLAs, setup info..."
          className={inputClass + ' resize-none'} required />
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={submitting}
          className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold rounded-lg transition flex items-center gap-2 shadow-md shadow-blue-500/20 w-full sm:w-auto justify-center">
          <FaPlusCircle className="text-xs flex-shrink-0" />
          {submitting ? 'Publishing...' : 'Publish Service'}
        </button>
      </div>
    </form>
  );
}