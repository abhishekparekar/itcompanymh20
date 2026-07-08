import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
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
  FaTimes,
  FaUserGraduate,
  FaDownload,
  FaEye,
  FaTrash,
  FaBookOpen,
  FaBoxOpen
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
  getProducts, addProduct, updateProduct, deleteProduct,
  getBlogs, addBlog, updateBlog, deleteBlog,
  bulkDeleteDocuments
} from '../services/serviceAPI';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Tab states: 'services' | 'add-service' | 'edit-service' | 'about' | 'contact' | 'footer' | 'brands' | 'applications'
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
  const [brandInputMode, setBrandInputMode] = useState('url');

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

  // Products states
  const [productsList, setProductsList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductTagline, setNewProductTagline] = useState('');
  const [newProductFeatures, setNewProductFeatures] = useState('');
  const [newProductGradient, setNewProductGradient] = useState('from-blue-600 to-cyan-500');
  const [addingProduct, setAddingProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Blogs states
  const [blogsList, setBlogsList] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('BUSINESS AUTOMATION');
  const [newBlogImage, setNewBlogImage] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [addingBlog, setAddingBlog] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  // Job Applications list state
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [selectedAppCover, setSelectedAppCover] = useState(null); // Modal for Cover Letter

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

  // Fetch job applications helper
  const fetchApplicationsData = async () => {
    setLoadingApps(true);
    try {
      const appRef = collection(db, 'jobApplications');
      const q = query(appRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applications list.");
    } finally {
      setLoadingApps(false);
    }
  };

  // Fetch products helper
  const fetchProductsData = async () => {
    setLoadingProducts(true);
    try {
      const data = await getProducts();
      setProductsList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products list.");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch blogs helper
  const fetchBlogsData = async () => {
    setLoadingBlogs(true);
    try {
      const data = await getBlogs();
      setBlogsList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs list.");
    } finally {
      setLoadingBlogs(false);
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
    } else if (activeTab === 'applications') {
      fetchApplicationsData();
    } else if (activeTab === 'products') {
      fetchProductsData();
    } else if (activeTab === 'blogs') {
      fetchBlogsData();
    }
  }, [activeTab]);

  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application record?")) return;
    try {
      const docRef = doc(db, 'jobApplications', id);
      await deleteDoc(docRef);
      toast.success("Application record deleted successfully.");
      fetchApplicationsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete application record.");
    }
  };

  const handleDownloadCV = (base64Data, filename) => {
    try {
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = filename || 'resume_attachment.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CV download initiated.");
    } catch (err) {
      console.error(err);
      toast.error("Could not download CV attachment.");
    }
  };

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

  const handleBrandFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo file size must be under 2MB.");
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewBrandUrl(reader.result);
    };
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

  // ---------------- PRODUCTS HANDLERS ----------------
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductName || !newProductTagline || !newProductFeatures) {
      toast.error("Please fill in Name, Tagline and Features.");
      return;
    }
    setAddingProduct(true);
    try {
      const featuresArray = typeof newProductFeatures === 'string'
        ? newProductFeatures.split(',').map(f => f.trim()).filter(Boolean)
        : newProductFeatures;

      const data = {
        name: newProductName,
        tagline: newProductTagline,
        features: featuresArray,
        gradient: newProductGradient
      };

      if (editProductId) {
        await updateProduct(editProductId, data);
        toast.success("Product updated successfully.");
        setEditProductId(null);
      } else {
        await addProduct(data);
        toast.success("Product added successfully.");
      }
      setNewProductName('');
      setNewProductTagline('');
      setNewProductFeatures('');
      setNewProductGradient('from-blue-600 to-cyan-500');
      fetchProductsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product.");
    } finally {
      setAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully.");
      fetchProductsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  // ---------------- BLOGS HANDLERS ----------------
  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogCategory || !newBlogContent) {
      toast.error("Please fill in Title, Category and Content.");
      return;
    }
    setAddingBlog(true);
    try {
      const data = {
        title: newBlogTitle,
        category: newBlogCategory,
        image: newBlogImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
        content: newBlogContent
      };

      if (editBlogId) {
        await updateBlog(editBlogId, data);
        toast.success("Blog post updated successfully.");
        setEditBlogId(null);
      } else {
        await addBlog(data);
        toast.success("Blog post added successfully.");
      }
      setNewBlogTitle('');
      setNewBlogCategory('BUSINESS AUTOMATION');
      setNewBlogImage('');
      setNewBlogContent('');
      fetchBlogsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blog post.");
    } finally {
      setAddingBlog(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog post deleted successfully.");
      fetchBlogsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog post.");
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
              { id: 'products', icon: FaBoxOpen, label: 'Manage Products', match: ['products'] },
              { id: 'blogs', icon: FaBookOpen, label: 'Manage Blogs', match: ['blogs'] },
              { id: 'about', icon: FaInfoCircle, label: 'About Us Settings', match: ['about'] },
              { id: 'contact', icon: FaEnvelopeOpenText, label: 'Contact & Inbox', match: ['contact'] },
              { id: 'footer', icon: FaGlobe, label: 'Footer Config', match: ['footer'] },
              { id: 'brands', icon: FaBuilding, label: 'Manage Brands', match: ['brands'] },
              { id: 'testimonials', icon: FaCommentAlt, label: 'Testimonials', match: ['testimonials'] },
              { id: 'careers', icon: FaUserTie, label: 'Manage Careers', match: ['careers'] },
              { id: 'applications', icon: FaUserGraduate, label: 'Job Applications', match: ['applications'] },
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
                {activeTab === 'applications' && 'Job Applications'}
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
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm text-left">
              <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3">
                {editBrandId ? '✍️ Edit Brand Details' : '🏷️ Add Brand Logo'}
              </h3>
              
              {/* Form to add/edit brand */}
              <form onSubmit={handleAddBrand} className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logo Input Mode</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setBrandInputMode('url'); setNewBrandUrl(''); }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                          brandInputMode === 'url' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'bg-white border border-slate-250 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Paste URL
                      </button>
                      <button
                        type="button"
                        onClick={() => { setBrandInputMode('upload'); setNewBrandUrl(''); }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                          brandInputMode === 'upload' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'bg-white border border-slate-250 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Upload File
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {brandInputMode === 'url' ? (
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
                  ) : (
                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Upload Logo File (under 2MB)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBrandFileChange}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:outline-none text-xs text-slate-800 transition cursor-pointer"
                        required={!newBrandUrl}
                      />
                    </div>
                  )}
                </div>

                {newBrandUrl && (
                  <div className="space-y-1 text-left">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logo Preview</label>
                    <div className="inline-block bg-slate-200/50 p-3 rounded-xl border border-slate-300/40">
                      <img src={newBrandUrl} alt="Preview" className="h-10 w-auto object-contain max-w-[200px]" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  {editBrandId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditBrandId(null);
                        setNewBrandName('');
                        setNewBrandUrl('');
                      }}
                      className="py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={addingBrand}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-500/20"
                  >
                    {addingBrand ? 'Saving...' : editBrandId ? 'Update Brand' : 'Add Brand'}
                  </button>
                </div>
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

          {activeTab === 'products' && (
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm text-left animate-fadeIn">
              <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3">
                {editProductId ? '✍️ Edit Software Product' : '🚀 Add Software Product'}
              </h3>
              
              <form onSubmit={handleAddProduct} className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                    <input 
                      type="text" 
                      value={newProductName} 
                      onChange={(e) => setNewProductName(e.target.value)}
                      placeholder="e.g. HRMS Pro" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tagline</label>
                    <input 
                      type="text" 
                      value={newProductTagline} 
                      onChange={(e) => setNewProductTagline(e.target.value)}
                      placeholder="e.g. Complete HR management" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Features (comma-separated)</label>
                    <input 
                      type="text" 
                      value={newProductFeatures} 
                      onChange={(e) => setNewProductFeatures(e.target.value)}
                      placeholder="e.g. Payroll, Attendance, Analytics" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Accent Color / Gradient</label>
                    <select 
                      value={newProductGradient} 
                      onChange={(e) => setNewProductGradient(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 cursor-pointer transition"
                    >
                      <option value="from-blue-600 to-cyan-500">Blue to Sky</option>
                      <option value="from-purple-600 to-pink-500">Purple to Pink</option>
                      <option value="from-green-600 to-emerald-400">Green to Emerald</option>
                      <option value="from-amber-500 to-orange-400">Amber to Orange</option>
                      <option value="from-indigo-600 to-violet-500">Indigo to Violet</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editProductId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditProductId(null);
                        setNewProductName('');
                        setNewProductTagline('');
                        setNewProductFeatures('');
                        setNewProductGradient('from-blue-600 to-cyan-500');
                      }}
                      className="py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={addingProduct}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-500/20"
                  >
                    {addingProduct ? 'Saving...' : editProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>

              <DataTable 
                loading={loadingProducts}
                data={productsList}
                columns={[
                  { 
                    key: 'gradient', 
                    label: 'Accent', 
                    render: (p) => (
                      <div className={`w-8 h-3.5 rounded-md bg-gradient-to-r ${p.gradient || 'from-blue-600 to-cyan-500'}`} />
                    )
                  },
                  { key: 'name', label: 'Name', render: (p) => <span className="font-bold text-slate-800">{p.name}</span> },
                  { key: 'tagline', label: 'Tagline', render: (p) => <span className="text-slate-500">{p.tagline}</span> },
                  { 
                    key: 'features', 
                    label: 'Features', 
                    render: (p) => (
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {Array.isArray(p.features) ? p.features.length : 0} Features
                      </span>
                    ) 
                  }
                ]}
                onEdit={(p) => {
                  setEditProductId(p.id);
                  setNewProductName(p.name);
                  setNewProductTagline(p.tagline);
                  setNewProductFeatures(Array.isArray(p.features) ? p.features.join(', ') : '');
                  setNewProductGradient(p.gradient || 'from-blue-600 to-cyan-500');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDeleteProduct}
                onBulkDelete={async (ids) => {
                  try {
                    await bulkDeleteDocuments('products', ids);
                    toast.success(`${ids.length} products deleted.`);
                    fetchProductsData();
                  } catch (e) {
                    toast.error("Failed to delete selected products.");
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm text-left animate-fadeIn">
              <h3 className="font-extrabold text-lg text-slate-800 border-b border-slate-100 pb-3">
                {editBlogId ? '✍️ Edit Blog Post' : '📝 Add Blog Post'}
              </h3>
              
              <form onSubmit={handleAddBlog} className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Blog Title</label>
                    <input 
                      type="text" 
                      value={newBlogTitle} 
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                      placeholder="e.g. Why Your Business Needs a Website" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                    <select 
                      value={newBlogCategory} 
                      onChange={(e) => setNewBlogCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 cursor-pointer transition"
                    >
                      <option value="BUSINESS AUTOMATION">BUSINESS AUTOMATION</option>
                      <option value="WEB DEVELOPMENT">WEB DEVELOPMENT</option>
                      <option value="SALES & CRM">SALES & CRM</option>
                      <option value="ENTERPRISE TECH">ENTERPRISE TECH</option>
                      <option value="MOBILE APPS">MOBILE APPS</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={newBlogImage} 
                    onChange={(e) => setNewBlogImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..." 
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Blog Content</label>
                  <textarea 
                    value={newBlogContent} 
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    rows="6" 
                    placeholder="Write the full details and strategies of this article..." 
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editBlogId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditBlogId(null);
                        setNewBlogTitle('');
                        setNewBlogCategory('BUSINESS AUTOMATION');
                        setNewBlogImage('');
                        setNewBlogContent('');
                      }}
                      className="py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={addingBlog}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-500/20"
                  >
                    {addingBlog ? 'Saving...' : editBlogId ? 'Update Blog Post' : 'Publish Blog Post'}
                  </button>
                </div>
              </form>

              <DataTable 
                loading={loadingBlogs}
                data={blogsList}
                columns={[
                  { 
                    key: 'image', 
                    label: 'Cover', 
                    render: (b) => (
                      <div className="w-12 h-8 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={b.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )
                  },
                  { key: 'title', label: 'Title', render: (b) => <span className="font-bold text-slate-800 block leading-tight">{b.title}</span> },
                  { 
                    key: 'category', 
                    label: 'Category', 
                    render: (b) => (
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md uppercase">
                        {b.category}
                      </span>
                    ) 
                  },
                  { key: 'content', label: 'Content Snippet', render: (b) => <span className="text-slate-500 line-clamp-1">{b.content}</span> }
                ]}
                onEdit={(b) => {
                  setEditBlogId(b.id);
                  setNewBlogTitle(b.title);
                  setNewBlogCategory(b.category);
                  setNewBlogImage(b.image || '');
                  setNewBlogContent(b.content || '');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDeleteBlog}
                onBulkDelete={async (ids) => {
                  try {
                    await bulkDeleteDocuments('blogs', ids);
                    toast.success(`${ids.length} blogs deleted.`);
                    fetchBlogsData();
                  } catch (e) {
                    toast.error("Failed to delete selected blogs.");
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm text-left animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-slate-800">Received Job Applications</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                  {applications.length} submissions
                </span>
              </div>

              <DataTable
                loading={loadingApps}
                data={applications}
                columns={[
                  {
                    key: 'applicantName',
                    label: 'Applicant info',
                    render: (a) => (
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 block text-xs">{a.applicantName}</span>
                        <span className="text-[10px] text-slate-400 block">{a.applicantEmail}</span>
                        {a.applicantPhone && <span className="text-[9px] text-slate-400 block font-medium">{a.applicantPhone}</span>}
                      </div>
                    )
                  },
                  {
                    key: 'jobTitle',
                    label: 'Applied Position',
                    render: (a) => (
                      <div className="space-y-0.5">
                        <span className="font-bold text-blue-600 block text-xs">{a.jobTitle}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">{a.jobCategory || "General"}</span>
                      </div>
                    )
                  },
                  {
                    key: 'createdAt',
                    label: 'Submitted Date',
                    render: (a) => (
                      <span className="text-slate-450 font-medium text-[10px]">
                        {a.createdAt ? new Date(a.createdAt).toLocaleString() : 'N/A'}
                      </span>
                    )
                  },
                  {
                    key: 'resume',
                    label: 'CV / Resume Attachment',
                    render: (a) => (
                      <button
                        onClick={() => handleDownloadCV(a.applicantResume, a.applicantResumeName)}
                        className="py-1.5 px-3 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <FaDownload className="text-[9px]" /> Download CV
                      </button>
                    )
                  },
                  {
                    key: 'coverLetter',
                    label: 'Cover Letter',
                    render: (a) => (
                      a.applicantCover ? (
                        <button
                          onClick={() => setSelectedAppCover(a)}
                          className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition flex items-center gap-1"
                        >
                          <FaEye className="text-[9px]" /> View Letter
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">None Provided</span>
                      )
                    )
                  }
                ]}
                onDelete={(a) => handleDeleteApplication(a.id)}
                onBulkDelete={async (ids) => {
                  try {
                    for (const id of ids) {
                      const docRef = doc(db, 'jobApplications', id);
                      await deleteDoc(docRef);
                    }
                    toast.success(`${ids.length} applications deleted.`);
                    fetchApplicationsData();
                  } catch (e) {
                    toast.error("Failed to delete selected applications.");
                  }
                }}
              />
            </div>
          )}
          </section>

        </main>
      </div>

      {/* Cover Letter Modal Dialog */}
      {selectedAppCover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 text-left animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Applicant Cover Letter</h3>
              <button 
                onClick={() => setSelectedAppCover(null)} 
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span className="font-bold text-slate-700">From: {selectedAppCover.applicantName}</span>
                <span>For: {selectedAppCover.jobTitle}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-xl whitespace-pre-wrap font-medium">
                {selectedAppCover.applicantCover}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAppCover(null)}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

