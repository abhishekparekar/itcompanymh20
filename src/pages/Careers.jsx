import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobs, seedJobs } from '../services/serviceAPI';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaEnvelope, FaLocationArrow, FaFileUpload, FaTimes, FaThLarge, FaList } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import videoBg from '../assets/video/animation1.mp4';

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
  const [viewMode, setViewMode] = useState('grid');

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
    <div className="min-h-screen bg-transparent">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      
      {/* Banner */}
      <section className="bg-slate-950 text-white relative overflow-hidden min-h-[60vh] flex items-center pt-24 pb-14 sm:pt-32 sm:pb-20">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        {/* Transparent dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/30 z-0" />
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        
        {/* Animated ambient glowing circles */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="space-y-4 flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[11px] font-bold text-sky-300 uppercase tracking-widest bg-sky-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
              Careers & Work opportunities
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl drop-shadow-sm filter"
              style={{ textShadow: "0 0 60px rgba(169,29,34,0.3), 0 0 30px rgba(0,42,84,0.6)" }}
            >
              Partner For <span className="gradient-text-red font-black">Talent</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-200 text-sm md:text-base max-w-2xl font-medium leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Join our dynamic team and build next-generation software solutions. Discover rewarding roles where you can grow, innovate, and make an impact.
            </motion.p>
          </div>

          {/* Search Box Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-[#071324]/90 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl relative"
          >
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
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-300"
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
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-300"
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
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-300"
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
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-bold rounded-xl transition duration-300 shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>search {filteredJobs.length} jobs</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-6 mt-12 pb-16 space-y-8">
        
        {/* Top Horizontal Filters */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
          
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 flex-grow">
            {/* Category Filter */}
            <div className="flex flex-col gap-1.5 min-w-[200px] flex-grow sm:flex-grow-0">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex flex-col gap-1.5 min-w-[200px] flex-grow sm:flex-grow-0">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
              >
                <option value="">All Types</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Reset Filters, Count & View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end self-stretch md:self-center">
            {(selectedCategory || selectedType || searchQuery) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedType('');
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs border border-rose-200/50 transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95"
              >
                Reset Filters
              </motion.button>
            )}
            
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block bg-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200/50">
                {filteredJobs.length} Openings
              </span>

              {/* Grid/Row Toggle Controls */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Grid View"
                >
                  <FaThLarge size={14} />
                </button>
                <button
                  onClick={() => setViewMode('row')}
                  className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    viewMode === 'row' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Row List View"
                >
                  <FaList size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid or Row List layout */}
        <main className="space-y-6 text-left">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4"
            >
              <span className="text-4xl block animate-bounce">🔍</span>
              <h3 className="font-extrabold text-slate-800 text-base">No Matching Openings Found</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                No active openings match your specific filters. Try updating your filters or search terms.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              layout 
              className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    key={job.id} 
                    className={
                      viewMode === 'grid'
                        ? "bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-6 group relative overflow-hidden"
                        : "bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-6 group relative overflow-hidden"
                    }
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[9px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
                            {job.category}
                          </span>
                          <span className="text-[9px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 shadow-sm">
                            {job.type}
                          </span>
                        </div>

                        <h3 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors duration-300 leading-snug">{job.title}</h3>
                        <p className={`text-slate-500 text-xs leading-relaxed max-w-2xl font-medium ${viewMode === 'grid' ? 'line-clamp-3' : ''}`}>{job.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-[11px] text-slate-400 font-bold pt-2">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                          <FaMapMarkerAlt className="text-blue-500" /> {job.location || 'Remote'}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                          <FaBriefcase className="text-sky-500" /> {job.experience || 'Entry level'}
                        </span>
                      </div>
                    </div>

                    <div className={`flex-shrink-0 ${viewMode === 'grid' ? 'w-full pt-2' : 'self-start md:self-center'}`}>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-xs font-extrabold rounded-xl transition duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 cursor-pointer text-center block"
                      >
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      {/* Application Dialog Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl max-w-lg w-full p-6 space-y-5 text-left relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-lg">Apply for Position</h3>
                  <button 
                    onClick={() => setSelectedJob(null)} 
                    className="text-slate-400 hover:text-slate-600 transition-colors w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 items-center mt-3">
                  <span className="text-blue-600 font-extrabold text-xs">
                    {selectedJob.title}
                  </span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-slate-500 font-semibold text-xs">
                    {selectedJob.category}
                  </span>
                </div>
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
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
                    <div className="w-full px-4 py-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 text-xs text-slate-500 font-bold cursor-pointer">
                      <FaFileUpload className="text-blue-500 text-sm animate-bounce" />
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs transition duration-300 active:scale-95 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingApp}
                    className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-extrabold rounded-xl text-xs transition duration-300 shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {submittingApp ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}