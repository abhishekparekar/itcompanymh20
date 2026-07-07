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
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
      <h3 className="font-display font-extrabold text-lg text-white border-b border-gray-900 pb-3">Footer configuration</h3>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Copyright Text Label
        </label>
        <input
          type="text"
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          placeholder="© 2026 IT Solution Inc. All rights reserved."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-755 transition"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Footer Corporate Tagline
        </label>
        <textarea
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          rows="2"
          placeholder="Dynamic tagline summary printed under brand logo..."
          className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-755 transition resize-none"
          required
        ></textarea>
      </div>

      {/* Social URLs */}
      <div className="space-y-4 pt-4 border-t border-gray-900">
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Social Handles Profiles</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <FaFacebook className="text-indigo-400 text-xs" />
              <span>Facebook Profile URL</span>
            </label>
            <input
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/company"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-800 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <FaTwitter className="text-indigo-400 text-xs" />
              <span>Twitter Profile URL</span>
            </label>
            <input
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/company"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-800 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <FaLinkedin className="text-indigo-400 text-xs" />
              <span>LinkedIn Company URL</span>
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/itsolutions"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-800 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <FaGithub className="text-indigo-400 text-xs" />
              <span>GitHub Repository URL</span>
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/company"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-900 focus:border-[#82b443] focus:outline-none text-sm text-white placeholder-gray-800 transition"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="py-3 px-6 bg-[#82b443] hover:bg-[#689433] disabled:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2"
        >
          <FaSave className="text-xs" />
          <span>{saving ? "Saving Configurations..." : "Update Footer Settings"}</span>
        </button>
      </div>

    </form>
  );
}

