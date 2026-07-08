import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaSave, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function FooterSetting() {
  const [copyright, setCopyright] = useState('');
  const [tagline, setTagline] = useState('');
  
  // Social link parameters
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getSiteSettings('footer');
        if (fetched) {
          setCopyright(fetched.copyright || '');
          setTagline(fetched.tagline || '');
          if (fetched.socials) {
            setFacebook(fetched.socials.facebook || '');
            setTwitter(fetched.socials.twitter || '');
            setLinkedin(fetched.socials.linkedin || '');
            setGithub(fetched.socials.github || '');
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load footer settings.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!copyright || !tagline) {
      toast.error("Copyright and Tagline description are required.");
      return;
    }

    setSaving(true);
    try {
      await updateSiteSettings('footer', {
        copyright,
        tagline,
        socials: {
          facebook,
          twitter,
          linkedin,
          github
        }
      });
      toast.success("Footer settings updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save footer configurations.");
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
      <h3 className="font-extrabold text-base text-slate-800 border-b border-slate-100 pb-3">Footer Configuration</h3>

      <div className="space-y-1">
        <label className={labelClass}>Copyright Text Label</label>
        <input
          type="text"
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          placeholder="© 2026 IT Solution Inc. All rights reserved."
          className={inputClass}
          required
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Footer Corporate Tagline</label>
        <textarea
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          rows="2"
          placeholder="Dynamic tagline summary printed under brand logo..."
          className={inputClass + " resize-none"}
          required
        ></textarea>
      </div>

      {/* Social URLs */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Social Handles Profiles</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FaFacebook className="text-blue-600 text-xs" />
              <span>Facebook Profile URL</span>
            </label>
            <input
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/company"
              className={inputClass}
            />
          </div>

          <div>
            <label className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FaTwitter className="text-sky-500 text-xs" />
              <span>Twitter Profile URL</span>
            </label>
            <input
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/company"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FaLinkedin className="text-blue-700 text-xs" />
              <span>LinkedIn Company URL</span>
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/itsolutions"
              className={inputClass}
            />
          </div>

          <div>
            <label className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FaGithub className="text-slate-800 text-xs" />
              <span>GitHub Repository URL</span>
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/company"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold rounded-lg transition flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
        >
          <FaSave className="text-xs" />
          <span>{saving ? "Saving..." : "Update Footer Settings"}</span>
        </button>
      </div>

    </form>
  );
}