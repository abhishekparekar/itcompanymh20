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
  FaUserTie
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
    <div className="bg-slate-50 min-h-screen flex flex-col md:flex-row text-slate-700 pt-20 admin-console-wrapper">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Mobile Menu Toggle Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-20 z-20 shadow-sm">
        <div className="flex items-center space-x-2 text-left">
          <FaUserShield className="text-[#0b4a8f] text-sm" />
          <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
            Admin: {activeTab.replace('-', ' ')}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-750 rounded-lg text-xs font-bold transition border border-slate-200"
        >
          {mobileMenuOpen ? 'Hide Menu' : 'Show Menu'}
        </button>
      </div>

      {/* Sidebar navigation */}
      <aside className={`w-full md:w-64 bg-white border-r border-slate-200 flex-col justify-between py-6 flex-shrink-0 shadow-sm ${mobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
        <div className="space-y-6">
          
          {/* Dashboard Header */}
          <div className="px-6 flex items-center space-x-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#0b4a8f] flex items-center justify-center shadow-md">
              <FaUserShield className="text-white text-sm" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-800 tracking-wide block">
                ADMIN CONSOLE
              </span>
              <span className="text-[9px] text-[#82b443] font-bold block uppercase leading-none mt-0.5">
                Dynamic Editor
              </span>
            </div>
          </div>

          <hr className="border-slate-100 mx-4" />

          {/* Nav links */}
          <nav className="px-3 space-y-1">
            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'services' || activeTab === 'add-service' || activeTab === 'edit-service'
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaBriefcase className="text-sm" />
              <span>Manage Services</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'about' 
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaInfoCircle className="text-sm" />
              <span>About Us Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'contact' 
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaEnvelopeOpenText className="text-sm" />
              <span>Contact Channels & Inbox</span>
            </button>

            <button
              onClick={() => setActiveTab('footer')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'footer' 
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaGlobe className="text-sm" />
              <span>Footer Configuration</span>
            </button>

            <button
              onClick={() => setActiveTab('brands')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'brands' 
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaBuilding className="text-sm" />
              <span>Manage Brands</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'testimonials' 
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaCommentAlt className="text-sm" />
              <span>Manage Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition ${
                activeTab === 'careers' 
                  ? 'bg-black text-white shadow-md shadow-black/10' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              <FaUserTie className="text-sm" />
              <span>Manage Careers</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer options */}
        <div className="px-3 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[11px] font-semibold text-gray-400 hover:bg-gray-900 hover:text-white transition"
          >
            <FaHome className="text-xs" />
            <span>Go to Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[11px] font-semibold text-rose-455 hover:bg-rose-500/10 hover:text-rose-400 transition"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Log Out Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-5xl overflow-y-auto">
        
        {/* Top header status */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8 gap-4 text-left">
          <div>
            <h1 className="font-extrabold text-2xl text-slate-800">
              {activeTab === 'services' && "IT Capabilities & Solutions Catalog"}
              {activeTab === 'add-service' && "Add New Service Architecture"}
              {activeTab === 'edit-service' && "Edit Service Configuration"}
              {activeTab === 'about' && "About Us Dynamic Settings"}
              {activeTab === 'contact' && "Contact Channels & Message Inbox"}
              {activeTab === 'footer' && "Site Footer Configuration"}
              {activeTab === 'brands' && "Manage Client Brand Logos"}
              {activeTab === 'testimonials' && "Manage Client Testimonial Cards"}
              {activeTab === 'careers' && "Manage Careers & Job Openings"}
            </h1>
            <p className="text-xs text-slate-450 mt-1">
              Currently logged in as: <span className="text-slate-700 font-bold">{currentUser?.email}</span> (Admin privileges active)
            </p>
          </div>

           {activeTab === 'services' && (
            <button
              onClick={() => setActiveTab('add-service')}
              className="py-2.5 px-5 bg-black hover:bg-slate-850 text-white text-xs font-bold rounded-full transition shadow"
            >
              + Create Service Profile
            </button>
          )}

          {(activeTab === 'add-service' || activeTab === 'edit-service') && (
            <button
              onClick={() => setActiveTab('services')}
              className="py-2.5 px-5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs font-bold rounded-full transition flex items-center space-x-2"
            >
              <FaArrowLeft className="text-[10px]" />
              <span>Back to Catalog</span>
            </button>
          )}
        </header>

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
            <div className="space-y-8 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
              <h3 className="font-display font-extrabold text-lg text-white border-b border-gray-900 pb-3">
                Dynamic Brand Logos Catalog
              </h3>
              
              {/* Form to add brand */}
              <form onSubmit={handleAddBrand} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-950/60 p-4 rounded-2xl border border-gray-900">
                <div className="space-y-1 text-left">
                  <label className="block text-[10px] font-bold text-gray-405 uppercase tracking-wider">
                    Brand name
                  </label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. SONY"
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                    required
                  />
                </div>
                
                <div className="space-y-1 text-left">
                  <label className="block text-[10px] font-bold text-gray-405 uppercase tracking-wider">
                    Logo Image URL
                  </label>
                  <input
                    type="url"
                    value={newBrandUrl}
                    onChange={(e) => setNewBrandUrl(e.target.value)}
                    placeholder="e.g. https://logo.clearbit.com/sony.com"
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={addingBrand}
                  className="py-2.5 px-4 bg-[#82b443] hover:bg-[#689433] text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5"
                >
                  {addingBrand ? "Uploading..." : "Add Brand"}
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
            <div className="space-y-8 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
              <h3 className="font-display font-extrabold text-lg text-white border-b border-gray-900 pb-3">
                Dynamic Client Testimonials Editor
              </h3>
              
              {/* Form to add testimonial */}
              <form onSubmit={handleAddTestimonial} className="space-y-4 bg-gray-950/60 p-4 rounded-2xl border border-gray-900 text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                      Client name
                    </label>
                    <input
                      type="text"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-455 uppercase tracking-wider">
                      Client role / designation
                    </label>
                    <input
                      type="text"
                      value={newClientRole}
                      onChange={(e) => setNewClientRole(e.target.value)}
                      placeholder="e.g. CEO, TechCorp Solutions"
                      className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                      Star rating (1 - 5)
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white cursor-pointer transition"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                    Feedback / testimonial content
                  </label>
                  <textarea
                    value={newTestimonialContent}
                    onChange={(e) => setNewTestimonialContent(e.target.value)}
                    rows="3"
                    placeholder="Enter what the client said about your custom development services..."
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={addingTestimonial}
                    className="py-2 px-5 bg-[#82b443] hover:bg-[#689433] text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5"
                  >
                    {addingTestimonial ? "Saving..." : editTestimonialId ? "Update Testimonial" : "Add Testimonial"}
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
            <div className="space-y-8 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-900">
              <h3 className="font-display font-extrabold text-lg text-white border-b border-gray-900 pb-3">
                Dynamic Job Postings Editor
              </h3>
              
              {/* Form to add job */}
              <form onSubmit={handleAddJob} className="space-y-4 bg-gray-950/60 p-4 rounded-2xl border border-gray-900 text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                      Job Position Title
                    </label>
                    <input
                      type="text"
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                      Employment Category
                    </label>
                    <select
                      value={newJobCategory}
                      onChange={(e) => setNewJobCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white cursor-pointer transition"
                    >
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
                      <option value="Custom">Custom (Write Below)...</option>
                    </select>

                    {newJobCategory === 'Custom' && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter dynamic category name"
                        className="w-full mt-2 px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                        required
                      />
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                      Employment Type
                    </label>
                    <select
                      value={newJobType}
                      onChange={(e) => setNewJobType(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white cursor-pointer transition"
                    >
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                      Job Location
                    </label>
                    <input
                      type="text"
                      value={newJobLocation}
                      onChange={(e) => setNewJobLocation(e.target.value)}
                      placeholder="e.g. Pune / Remote"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-455 uppercase tracking-wider">
                      Experience Requirement
                    </label>
                    <input
                      type="text"
                      value={newJobExperience}
                      onChange={(e) => setNewJobExperience(e.target.value)}
                      placeholder="e.g. 2-4 Years"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-wider">
                    Role Description & Requirements
                  </label>
                  <textarea
                    value={newJobDescription}
                    onChange={(e) => setNewJobDescription(e.target.value)}
                    rows="3"
                    placeholder="Enter what the job role entails, keys skills required, daily tasks..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-[#82b443] focus:outline-none text-xs text-white placeholder-gray-600 transition resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={addingJob}
                    className="py-2 px-5 bg-[#82b443] hover:bg-[#689433] text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5"
                  >
                    {addingJob ? "Saving..." : editJobId ? "Update Job" : "Add Job Posting"}
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
  );
}

