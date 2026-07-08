import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaSave, FaChartBar, FaBullseye, FaEye } from 'react-icons/fa';

export default function AboutSetting() {
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  
  // Stats state (array of 5 objects)
  const [stats, setStats] = useState([
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getSiteSettings('about');
        if (fetched) {
          setDescription(fetched.description || '');
          setMission(fetched.mission || '');
          setVision(fetched.vision || '');
          if (fetched.stats && fetched.stats.length > 0) {
            const filledStats = Array(5).fill(null).map((_, idx) => fetched.stats[idx] || { value: '', label: '' });
            setStats(filledStats);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load About settings.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatChange = (index, field, val) => {
    const updatedStats = [...stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: val
    };
    setStats(updatedStats);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !mission || !vision) {
      toast.error("All settings fields are required.");
      return;
    }

    setSaving(true);
    try {
      await updateSiteSettings('about', {
        description,
        mission,
        vision,
        stats
      });
      toast.success("About settings updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update About settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 bg-white rounded-2xl border border-slate-200">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm text-left">
      
      {/* Description */}
      <div className="space-y-1">
        <label className={labelClass}>Company Description Summary</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Brief explanation of corporate history and capabilities..."
          className={inputClass + " resize-none"}
          required
        ></textarea>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            <FaBullseye className="text-blue-500 text-xs" />
            <span>Corporate Mission Statement</span>
          </label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows="3"
            placeholder="Empower clients through robust engineering..."
            className={inputClass + " resize-none"}
            required
          ></textarea>
        </div>

        <div className="space-y-1">
          <label className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            <FaEye className="text-blue-500 text-xs" />
            <span>Corporate Vision Statement</span>
          </label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows="3"
            placeholder="To be the global benchmark of IT engineering..."
            className={inputClass + " resize-none"}
            required
          ></textarea>
        </div>
      </div>

      {/* Key Metrics / Stats */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <FaChartBar className="text-blue-500 text-xs" />
          <span>Dynamic Stats Panel (5 stats required)</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3">
              <span className="text-[10px] uppercase font-bold text-blue-600 block">Stat #{i + 1}</span>
              <div>
                <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Value (e.g. 100+)</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                  placeholder="300+"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Label (e.g. Projects)</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                  placeholder="Cloud Installs"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold rounded-lg transition flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
        >
          <FaSave className="text-xs" />
          <span>{saving ? "Saving..." : "Update Settings"}</span>
        </button>
      </div>

    </form>
  );
}