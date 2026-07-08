import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { 
  FaBriefcase, 
  FaInfoCircle, 
  FaEnvelopeOpenText, 
  FaGlobe, 
  FaArrowLeft, 
  FaSignOutAlt, 
  FaUserShield,
  FaHome,
  FaBuilding,
  FaCommentAlt,
  FaUserTie,
  FaBars,
  FaTimes
} from 'react-icons/fa';

import AboutSetting from './AboutSetting';
import ContactSetting from './ContactSetting';
import FooterSetting from './FooterSetting';
import AddService from './AddService';
import EditService from './EditService';
import DataTable from './DataTable';
import { 
  getServices, deleteService, 
  getClientLogos, addClientLogo, deleteClientLogo, updateClientLogo,
  getTestimonials, addTestimonial, deleteTestimonial, updateTestimonial,
  getJobs, addJob, deleteJob, updateJob,
  bulkDeleteDocuments
} from '../services/serviceAPI';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Tab states: 'services' | 'add-service' | 'edit-service' | 'about' | 'contact' | 'footer' | 'brands'
  const [activeTab, setActiveTab] = useState('services');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Services local caching state
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  // Brands local state
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandUrl, setNewBrandUrl] = useState('');
  const [addingBrand, setAddingBrand] = useState(false);
  const [editBrandId, setEditBrandId] = useState(null);

  // Testimonials local state
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientRole, setNewClientRole] = useState('');
  const [newTestimonialContent, setNewTestimonialContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [addingTestimonial, setAddingTestimonial] = useState(false);
  const [editTestimonialId, setEditTestimonialId] = useState(null);

  // Careers / Jobs local state
  const [jobsList, setJobsList] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCategory, setNewJobCategory] = useState('Engineering');
  const [customCategory, setCustomCategory] = useState('');
  const [newJobType, setNewJobType] = useState('Permanent');
  const [newJobLocation, setNewJobLocation] = useState('');
  const [newJobExperience, setNewJobExperience] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');
  const [addingJob, setAddingJob] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  // Fetch services helper
  const fetchServicesData = async () => {
    setLoadingServices(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load services list.");
    } finally {
      setLoadingServices(false);
    }
  };

  // Fetch brands helper
  const fetchBrandsData = async () => {
    setLoadingBrands(true);
    try {
      const data = await getClientLogos();
      setBrands(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load brand logos list.");
    } finally {
      setLoadingBrands(false);
    }
  };

  // Fetch testimonials helper
  const fetchTestimonialsData = async () => {
    setLoadingTestimonials(true);
    try {
      const data = await getTestimonials();
      setTestimonialsList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load testimonials list.");
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // Fetch jobs helper
  const fetchJobsData = async () => {
    setLoadingJobs(true);
    try {
      const data = await getJobs();
      setJobsList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs list.");
    } finally {
      setLoadingJobs(false);
    }
  };

  // Run initial fetch if tab switches
  React.useEffect(() => {
    setMobileMenuOpen(false);
    if (activeTab === 'services') {
      fetchServicesData();
    } else if (activeTab === 'brands') {
      fetchBrandsData();
    } else if (activeTab === 'testimonials') {
      fetchTestimonialsData();
    } else if (activeTab === 'careers') {
      fetchJobsData();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (err) {
      console.error(err);
      toast.error("Logout failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted successfully.");
      fetchServicesData();
    } catch (err) {
      console.error(err);
      toast.error("Could not delete service.");
    }
  };

  const handleEditSelect = (id) => {
    setSelectedServiceId(id);
    setActiveTab('edit-service');
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrandName || !newBrandUrl) {
      toast.error("Please fill in both brand name and logo image URL.");
      return;
    }
    setAddingBrand(true);
    try {
      if (editBrandId) {
        await updateClientLogo(editBrandId, { name: newBrandName, url: newBrandUrl });
        toast.success("Brand logo updated successfully.");
        setEditBrandId(null);
      } else {
        await addClientLogo({ name: newBrandName, url: newBrandUrl });
        toast.success("Brand logo added successfully.");
      }
      setNewBrandName('');
      setNewBrandUrl('');
      fetchBrandsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save brand logo.");
    } finally {
      setAddingBrand(false);
    }
  };

  const handleDeleteBrand = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand logo?")) return;
    try {
      await deleteClientLogo(id);
      toast.success("Brand logo deleted successfully.");
      fetchBrandsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete brand logo.");
    }
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newClientName || !newClientRole || !newTestimonialContent) {
      toast.error("Please fill in all testimonial fields.");
      return;
    }
    setAddingTestimonial(true);
    try {
      const data = {
        name: newClientName,
        role: newClientRole,
        content: newTestimonialContent,
        rating: Number(newRating)
      };
      if (editTestimonialId) {
        await updateTestimonial(editTestimonialId, data);
        toast.success("Testimonial updated successfully.");
        setEditTestimonialId(null);
      } else {
        await addTestimonial(data);
        toast.success("Testimonial added successfully.");
      }
      setNewClientName('');
      setNewClientRole('');
      setNewTestimonialContent('');
      setNewRating(5);
      fetchTestimonialsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save testimonial.");
    } finally {
      setAddingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted successfully.");
      fetchTestimonialsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete testimonial.");
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const finalCategory = newJobCategory === 'Custom' ? customCategory : newJobCategory;
    if (!newJobTitle || !finalCategory || !newJobLocation || !newJobDescription) {
      toast.error("Please fill in all required job fields, including custom category name.");
      return;
    }
    setAddingJob(true);
    try {
      const data = {
        title: newJobTitle,
        category: finalCategory,
        type: newJobType,
        location: newJobLocation,
        experience: newJobExperience || "Entry level",
        description: newJobDescription
      };
      if (editJobId) {
        await updateJob(editJobId, data);
        toast.success("Job updated successfully.");
        setEditJobId(null);
      } else {
        await addJob(data);
        toast.success("Job posting added successfully.");
      }
      setNewJobTitle('');
      setCustomCategory('');
      setNewJobLocation('');
      setNewJobExperience('');
      setNewJobDescription('');
      fetchJobsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save job opening.");
    } finally {
      setAddingJob(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await deleteJob(id);
      toast.success("Job posting deleted successfully.");
      fetchJobsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job posting.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Mobile overlay backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 flex flex-col justify-between bg-[#002A54] text-white flex-shrink-0 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Sidebar Header */}
          <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <FaUserShield className="text-white text-base" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-white tracking-wide block">ADMIN CONSOLE</span>
                <span className="text-[9px] text-blue-300 font-semibold block uppercase leading-none mt-0.5">UF Global Solutions</span>
              </div>
            </div>
            {/* Close button - mobile only */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-2 rounded-lg text-blue-300 hover:bg-white/10 hover:text-white transition flex-shrink-0"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {[
              { id: 'services', icon: FaBriefcase, label: 'Manage Services', match: ['services','add-service','edit-service'] },
              { id: 'about', icon: FaInfoCircle, label: 'About Us Settings', match: ['about'] },
              { id: 'contact', icon: FaEnvelopeOpenText, label: 'Contact & Inbox', match: ['contact'] },
              { id: 'footer', icon: FaGlobe, label: 'Footer Config', match: ['footer'] },
              { id: 'brands', icon: FaBuilding, label: 'Manage Brands', match: ['brands'] },
              { id: 'testimonials', icon: FaCommentAlt, label: 'Testimonials', match: ['testimonials'] },
              { id: 'careers', icon: FaUserTie, label: 'Manage Careers', match: ['careers'] },
            ].map(({ id, icon: Icon, label, match }) => {
              const isActive = match.includes(activeTab);
              return (
                <button
                  key={id}
                  onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="text-sm flex-shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <div className="px-4 py-2 mb-2">
            <p className="text-[10px] text-blue-300 font-medium truncate">{currentUser?.email}</p>
            <p className="text-[9px] text-blue-400/70">Administrator</p>
          </div>
          <Link
            to="/"
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[11px] font-semibold text-blue-200 hover:bg-white/10 hover:text-white transition"
          >
            <FaHome className="text-xs" />
            <span>View Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[11px] font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
            >
              <FaBars className="text-base" />
            </button>
            <div className="min-w-0">
              <h1 className="font-extrabold text-base md:text-lg text-slate-800 leading-tight truncate">
                {activeTab === 'services' && 'Services Catalog'}
                {activeTab === 'add-service' && 'Add Service'}
                {activeTab === 'edit-service' && 'Edit Service'}
                {activeTab === 'about' && 'About Settings'}
                {activeTab === 'contact' && 'Contact & Inbox'}
                {activeTab === 'footer' && 'Footer Config'}
                {activeTab === 'brands' && 'Brand Logos'}
                {activeTab === 'testimonials' && 'Testimonials'}
                {activeTab === 'careers' && 'Careers & Jobs'}
              </h1>
              <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">UF Global Solutions Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'services' && (
              <button
                onClick={() => setActiveTab('add-service')}
                className="py-1.5 px-3 md:py-2 md:px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition shadow-md shadow-blue-500/20 whitespace-nowrap"
              >
                + Add
              </button>
            )}
            {(activeTab === 'add-service' || activeTab === 'edit-service') && (
              <button
                onClick={() => setActiveTab('services')}
                className="py-1.5 px-3 md:py-2 md:px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-full transition flex items-center gap-1.5"
              >
                <FaArrowLeft className="text-[10px]" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
          </div>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">

          {/* Tab Render Switchboard */}
          <section className="animate-fadeIn">
          {activeTab === 'services' && (
            <div className="space-y-6">
              <DataTable 
                loading={loadingServices}
                data={services}
                columns={[
                  { key: 'icon', label: 'Icon', render: (s) => <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#82b443]/10 border border-[#82b443]/20 text-[#82b443]">{s.icon || "FaLaptop"}</span> },
                  { key: 'title', label: 'Service Title', render: (s) => <span className="font-extrabold text-slate-800">{s.title}</span> },
                  { key: 'description', label: 'Description', render: (s) => <span className="text-slate-500 line-clamp-1">{s.description}</span> },
                  { key: 'createdAt', label: 'Created', render: (s) => new Date(s.createdAt).toLocaleDateString() }
                ]}
                onEdit={(service) => handleEditSelect(service.id)}
                onDelete={handleDelete}
                onBulkDelete={async (ids) => {
                  try {
                    await bulkDeleteDocuments('services', ids);
                    toast.success(`${ids.length} services deleted.`);
                    fetchServicesData();
                  } catch (e) {
                    toast.error("Failed to delete selected services.");
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'add-service' && (
            <AddService onSuccess={() => setActiveTab('services')} />
          )}

          {activeTab === 'edit-service' && (
            <EditService serviceId={selectedServiceId} onSuccess={() => setActiveTab('services')} />
          )}

          {activeTab === 'about' && (
            <AboutSetting />
          )}

          {activeTab === 'contact' && (
            <ContactSetting />
          )}

          {activeTab === 'footer' && (
            <FooterSetting />
          )}

          {activeTab === 'brands' && (
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3">
                Brand Logos Manager
              </h3>
              
              {/* Form to add brand */}
              <form onSubmit={handleAddBrand} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="space-y-1 text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Brand Name</label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. SONY"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                    required
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logo Image URL</label>
                  <input
                    type="url"
                    value={newBrandUrl}
                    onChange={(e) => setNewBrandUrl(e.target.value)}
                    placeholder="https://logo.clearbit.com/sony.com"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={addingBrand}
                  className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-500/20"
                >
                  {addingBrand ? 'Uploading...' : 'Add Brand'}
                </button>
              </form>

              {/* List of brand logos using DataTable */}
              <DataTable 
                loading={loadingBrands}
                data={brands}
                columns={[
                  { key: 'logo', label: 'Logo', render: (b) => <div className="bg-white/10 p-2 rounded-lg inline-block"><img src={b.url} alt={b.name} className="h-6 w-auto object-contain" /></div> },
                  { key: 'name', label: 'Brand Name', render: (b) => <span className="font-bold text-slate-700">{b.name}</span> }
                ]}
                onEdit={(brand) => {
                  setEditBrandId(brand.id);
                  setNewBrandName(brand.name);
                  setNewBrandUrl(brand.url);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDeleteBrand}
                onBulkDelete={async (ids) => {
                  try {
                    await bulkDeleteDocuments('clientLogos', ids);
                    toast.success(`${ids.length} brands deleted.`);
                    fetchBrandsData();
                  } catch (e) {
                    toast.error("Failed to delete selected brands.");
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3">
                Client Testimonials Manager
              </h3>
              {/* Form to add testimonial */}
              <form onSubmit={handleAddTestimonial} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                    <input type="text" value={newClientName} onChange={(e) => setNewClientName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role / Designation</label>
                    <input type="text" value={newClientRole} onChange={(e) => setNewClientRole(e.target.value)}
                      placeholder="e.g. CEO, TechCorp Solutions"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Star Rating</label>
                    <select value={newRating} onChange={(e) => setNewRating(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 cursor-pointer transition">
                      <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
                      <option value="4">4 Stars ⭐⭐⭐⭐</option>
                      <option value="3">3 Stars ⭐⭐⭐</option>
                      <option value="2">2 Stars ⭐⭐</option>
                      <option value="1">1 Star ⭐</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Testimonial Content</label>
                  <textarea value={newTestimonialContent} onChange={(e) => setNewTestimonialContent(e.target.value)}
                    rows="3" placeholder="What the client said about your services..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition resize-none"
                    required></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={addingTestimonial}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-500/20">
                    {addingTestimonial ? 'Saving...' : editTestimonialId ? 'Update' : 'Add Testimonial'}
                  </button>
                </div>
              </form>

              {/* List of testimonials using DataTable */}
              <DataTable 
                loading={loadingTestimonials}
                data={testimonialsList}
                columns={[
                  { key: 'name', label: 'Client', render: (t) => <div><span className="font-bold text-slate-800 block">{t.name}</span><span className="text-[10px] text-slate-500">{t.role}</span></div> },
                  { key: 'rating', label: 'Rating', render: (t) => <span className="font-bold text-yellow-500">{t.rating} Stars</span> },
                  { key: 'content', label: 'Feedback', render: (t) => <span className="text-slate-600 italic line-clamp-2">"{t.content}"</span> }
                ]}
                onEdit={(t) => {
                  setEditTestimonialId(t.id);
                  setNewClientName(t.name);
                  setNewClientRole(t.role);
                  setNewTestimonialContent(t.content);
                  setNewRating(t.rating);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDeleteTestimonial}
                onBulkDelete={async (ids) => {
                  try {
                    await bulkDeleteDocuments('testimonials', ids);
                    toast.success(`${ids.length} testimonials deleted.`);
                    fetchTestimonialsData();
                  } catch (e) {
                    toast.error("Failed to delete selected testimonials.");
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3">
                Job Openings Manager
              </h3>
              {/* Form to add job */}
              <form onSubmit={handleAddJob} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Job Title</label>
                    <input type="text" value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                    <select value={newJobCategory} onChange={(e) => setNewJobCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 cursor-pointer transition">
                      <option value="Engineering">Engineering</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
                      <option value="Banking Sales">Banking Sales</option>
                      <option value="Education">Education</option>
                      <option value="Finance & Accounting">Finance & Accounting</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="HR & Admin Support">HR & Admin Support</option>
                      <option value="ITES/GCC">ITES/GCC</option>
                      <option value="Legal & Compliance">Legal & Compliance</option>
                      <option value="Sales & Marketing">Sales & Marketing</option>
                      <option value="CXO">CXO</option>
                      <option value="Custom">Custom...</option>
                    </select>
                    {newJobCategory === 'Custom' && (
                      <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom category" required
                        className="w-full mt-2 px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employment Type</label>
                    <select value={newJobType} onChange={(e) => setNewJobType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 cursor-pointer transition">
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location</label>
                    <input type="text" value={newJobLocation} onChange={(e) => setNewJobLocation(e.target.value)}
                      placeholder="e.g. Pune / Remote"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Experience</label>
                    <input type="text" value={newJobExperience} onChange={(e) => setNewJobExperience(e.target.value)}
                      placeholder="e.g. 2-4 Years"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role Description</label>
                  <textarea value={newJobDescription} onChange={(e) => setNewJobDescription(e.target.value)}
                    rows="3" placeholder="Describe the job role, key skills, and daily tasks..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition resize-none"
                    required></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={addingJob}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-500/20">
                    {addingJob ? 'Saving...' : editJobId ? 'Update Job' : 'Add Job Posting'}
                  </button>
                </div>
              </form>

              {/* List of jobs using DataTable */}
              <DataTable 
                loading={loadingJobs}
                data={jobsList}
                columns={[
                  { key: 'title', label: 'Role', render: (j) => <div><span className="font-bold text-slate-800 block">{j.title}</span><span className="text-[10px] text-slate-500">{j.location}</span></div> },
                  { key: 'category', label: 'Category & Type', render: (j) => <div><span className="text-[10px] font-bold text-[#82b443] bg-[#82b443]/10 px-2 py-0.5 rounded-full block w-max">{j.category}</span><span className="text-[9px] text-slate-500 block mt-1">{j.type} &middot; {j.experience}</span></div> },
                  { key: 'description', label: 'Description', render: (j) => <span className="text-slate-600 line-clamp-2">{j.description}</span> }
                ]}
                onEdit={(j) => {
                  setEditJobId(j.id);
                  setNewJobTitle(j.title);
                  setNewJobCategory(j.category);
                  setNewJobType(j.type);
                  setNewJobLocation(j.location);
                  setNewJobExperience(j.experience);
                  setNewJobDescription(j.description);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDeleteJob}
                onBulkDelete={async (ids) => {
                  try {
                    await bulkDeleteDocuments('jobs', ids);
                    toast.success(`${ids.length} jobs deleted.`);
                    fetchJobsData();
                  } catch (e) {
                    toast.error("Failed to delete selected jobs.");
                  }
                }}
              />
            </div>
          )}
          </section>

        </main>
      </div>
    </div>
  );
}

