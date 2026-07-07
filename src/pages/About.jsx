import React, { useEffect, useState } from 'react';
import { getSiteSettings } from '../services/serviceAPI';

export default function About() {
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAboutSettings() {
      try {
        const fetched = await getSiteSettings('about');
        if (fetched) {
          setDescription(fetched.description || '');
          setMission(fetched.mission || '');
          setVision(fetched.vision || '');
          if (fetched.stats) {
            setStats(fetched.stats);
          }
        }
      } catch (err) {
        console.error('Error fetching about setting page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAboutSettings();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* About Hero Header */}
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-[#0F172A] to-[#07356b] overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-xs font-bold text-[#82b443] uppercase tracking-widest block mb-2">
            Corporate Profile
          </span>
          <h1 className="text-3xl font-black mb-3">
            About <span className="text-[#82b443]">iCoded</span>
          </h1>
          <p className="text-slate-300 text-xs max-w-xl mx-auto leading-relaxed">
            Delivering robust system assets, custom automation solutions, and enterprise engineering workflows.
          </p>
        </div>
      </section>

      {/* Main Core Content */}
      <section className="container max-w-5xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-[#0b4a8f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12 text-left">
            
            {/* Description Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50">
              <h2 className="text-xl font-black text-[#0b4a8f] mb-2">Who We Are</h2>
              <div className="w-12 h-1 bg-[#82b443] mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {description || "iCoded Automation Pvt. Ltd. builds robust business automation pipelines, custom web products, mobile applications, and enterprise system architectures that empower digital scaling."}
              </p>
            </div>

            {/* Mission & Vision Row */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Mission */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-[#0b4a8f] mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#82b443]" /> Our Mission
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {mission || "To streamline complex workflows through cutting-edge IT infrastructure development and customer-centric software tools."}
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-[#0b4a8f] mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#82b443]" /> Our Vision
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {vision || "To be the leading system design and business automation partner for enterprises seeking secure, zero-friction scaling frameworks."}
                </p>
              </div>

            </div>

            {/* Stats Row */}
            {stats && stats.length > 0 && (
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl font-black text-[#0b4a8f]">
                      {item.value || "0"}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {item.label || "Metric"}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </section>

    </div>
  );
}
