import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobs, seedJobs } from '../services/serviceAPI';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaEnvelope, FaLocationArrow, FaFileUpload, FaTimes } from 'react-icons/fa';

export default function Careers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [rangeQuery, setRangeQuery] = useState('10 km');
  
  // Active Filter state
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResume, setApplicantResume] = useState('');
  const [applicantResumeName, setApplicantResumeName] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [submittingApp, setSubmittingApp] = useState(false);

  useEffect(() => {
    // Sync filters if URL search params change
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedType(searchParams.get('type') || '');
  }, [searchParams]);

  useEffect(() => {
    async function loadJobsData() {
      try {
        await seedJobs();
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error("Error loading jobs list:", err);
      } finally {
        setLoading(false);
      }
    }
    loadJobsData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be under 2MB.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setApplicantResume(event.target.result);
        setApplicantResumeName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantResume) {
      toast.error("Please fill in name, email, and upload your CV.");
      return;
    }
    setSubmittingApp(true);
    try {
      const appRef = collection(db, 'jobApplications');
      await addDoc(appRef, {
        jobTitle: selectedJob.title,
        jobCategory: selectedJob.category,
        applicantName,
        applicantEmail,
        applicantResume,
        applicantResumeName,
        applicantCover,
        createdAt: new Date().toISOString()
      });
      toast.success(`Application for ${selectedJob.title} submitted successfully!`);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantResume('');
      setApplicantResumeName('');
      setApplicantCover('');
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit job application.");
    } finally {
      setSubmittingApp(false);
    }
  };

  // Filter jobs logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationQuery
      ? job.location?.toLowerCase().includes(locationQuery.toLowerCase())
      : true;

    // Category match helper
    const matchesCategory = selectedCategory 
      ? job.category?.toLowerCase() === selectedCategory.toLowerCase() 
      : true;
      
    // Type match helper
    const matchesType = selectedType 
      ? job.type?.toLowerCase() === selectedType.toLowerCase() 
      : true;

    return matchesSearch && matchesLocation && matchesCategory && matchesType;
  });

  const categories = Array.from(new Set(jobs.map(job => job.category))).filter(Boolean);

  return (
    <div className="pt-28 pb-12 min-h-screen bg-transparent">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      
      {/* Banner */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] z-0" />
        <div className="absolute inset-0 opacity-10 bg-grid-pattern z-0" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10 text-left space-y-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-300 uppercase tracking-widest">
            <span className="w-4 h-px bg-blue-400 inline-block" />
            Careers & Work opportunities
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Partner For <span className="text-sky-400">Talent</span>
          </h1>

          {/* Search Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-[#071324]/80 p-5 rounded-2xl border border-slate-800">
            {/* Search For */}
            <div className="md:col-span-4 space-y-1.5 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                search for
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="job title or keyword"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Where */}
            <div className="md:col-span-4 space-y-1.5 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                where?
              </label>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="location or postcode"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Range */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                range
              </label>
              <select
                value={rangeQuery}
                onChange={(e) => setRangeQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="10 km">10 km</option>
                <option value="25 km">25 km</option>
                <option value="50 km">50 km</option>
                <option value="100 km">100 km</option>
              </select>
            </div>

            {/* Search Action */}
            <div className="md:col-span-2">
              <button
                type="button"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5"
              >
                <span>search {filteredJobs.length} jobs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-left">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 uppercase tracking-wider">
              Filter Openings
            </h3>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSearchParams(prev => {
                    if (e.target.value) prev.set('category', e.target.value);
                    else prev.delete('category');
                    return prev;
                  });
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider">
                Employment Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSearchParams(prev => {
                    if (e.target.value) prev.set('type', e.target.value);
                    else prev.delete('type');
                    return prev;
                  });
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Reset Button */}
            {(selectedCategory || selectedType || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedType('');
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Reset Filters
              </button>
            )}
          </div>
        </aside>

        {/* Jobs List Grid */}
        <main className="lg:col-span-9 space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredJobs.length} Active Positions
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4">
              <span className="text-4xl block">🔍</span>
              <h3 className="font-bold text-slate-800 text-base">No Matching Openings Found</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                No active openings match your specific filters. Try updating your filters or search terms.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                  <div className="space-y-3 flex-grow">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
                        {job.category}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base">{job.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-2xl">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {job.location || 'Remote'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBriefcase /> {job.experience || 'Entry level'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Application Dialog Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 text-left">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">Apply for Position</h3>
                <button 
                  onClick={() => setSelectedJob(null)} 
                  className="text-slate-400 hover:text-slate-600 font-black text-sm"
                >
                  ✕
                </button>
              </div>
              <p className="text-blue-600 font-bold text-xs mt-2">
                {selectedJob.title} &middot; <span className="text-slate-500 font-normal">{selectedJob.category}</span>
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-slate-800 transition"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-slate-800 transition"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Upload CV/Resume * (PDF, Doc, Images under 2MB)
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="w-full px-4 py-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                    <FaFileUpload className="text-blue-500 text-base" />
                    <span>{applicantResumeName || "Choose resume file..."}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Brief Cover Letter (Optional)
                </label>
                <textarea
                  value={applicantCover}
                  onChange={(e) => setApplicantCover(e.target.value)}
                  rows="3"
                  placeholder="Why do you want to join our engineering and deployment team?"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-slate-800 transition resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingApp}
                  className="py-2 px-5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl text-xs transition shadow-md shadow-blue-500/20"
                >
                  {submittingApp ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}