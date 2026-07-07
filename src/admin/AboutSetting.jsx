import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaSave, FaChartBar, FaBullseye, FaEye } from 'react-icons/fa';

export default function AboutSetting() {
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  
  // Stats state (array of 4 objects)
  const [stats, setStats] = useState([
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
          if (fetched.stats && fetched.stats.length === 4) {
            setStats(fetched.stats);
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
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
      
      {/* Description */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Company Description Summary
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Brief explanation of corporate history and capabilities..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-600 transition resize-none"
          required
        ></textarea>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
            <FaBullseye className="text-indigo-400 text-xs" />
            <span>Corporate Mission Statement</span>
          </label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows="3"
            placeholder="Empower clients through robust engineering..."
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-600 transition resize-none"
            required
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
            <FaEye className="text-indigo-400 text-xs" />
            <span>Corporate Vision Statement</span>
          </label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows="3"
            placeholder="To be the global benchmark of IT engineering..."
            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-600 transition resize-none"
            required
          ></textarea>
        </div>
      </div>

      {/* Key Metrics / Stats */}
      <div className="space-y-4 pt-4 border-t border-gray-900">
        <h3 className="flex items-center space-x-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
          <FaChartBar className="text-indigo-400 text-xs" />
          <span>Dynamic Stats Panel (4 stats required)</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 bg-gray-950 border border-gray-900 rounded-xl space-y-3">
              <span className="text-[10px] uppercase font-bold text-gray-550 block">Stat #{i + 1}</span>
              <div>
                <label className="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Value (e.g. 100+)</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                  placeholder="300+"
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-700 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Label (e.g. Projects)</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                  placeholder="Cloud Installs"
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-700 transition"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-6 border-t border-gray-900 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="py-3 px-6 bg-[#82b443] hover:bg-[#689433] disabled:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2 shadow"
        >
          <FaSave className="text-xs" />
          <span>{saving ? "Saving Changes..." : "Update Settings"}</span>
        </button>
      </div>

    </form>
  );
}

