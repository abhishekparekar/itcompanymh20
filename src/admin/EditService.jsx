import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateService, getServiceCategories, addServiceCategory } from '../services/serviceAPI';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';

export default function EditService({ serviceId, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [icon, setIcon] = useState('FaLaptopCode');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('ENTERPRISE SERVICES');
  const [features, setFeatures] = useState(['']);
  
  const [categoriesList, setCategoriesList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatureField = () => {
    setFeatures([...features, '']);
  };

  const removeFeatureField = (index) => {
    const newFeatures = features.filter((_, idx) => idx !== index);
    setFeatures(newFeatures.length > 0 ? newFeatures : ['']);
  };

  const handleAddCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name.');
      return;
    }
    setAddingCategory(true);
    try {
      const added = await addServiceCategory(newCategoryName);
      setCategoriesList((prev) => {
        if (prev.some(c => c.name === added.name)) {
          return prev;
        }
        return [...prev, added].sort((a, b) => a.name.localeCompare(b.name));
      });
      setCategory(added.name);
      toast.success('Category added successfully!');
      setNewCategoryName('');
      setShowAddCategoryModal(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add category.');
    } finally {
      setAddingCategory(false);
    }
  };
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const iconsList = [
    { label: "Code / Laptop (FaLaptopCode)", value: "FaLaptopCode" },
    { label: "Code (FaCode)", value: "FaCode" },
    { label: "Android (FaAndroid)", value: "FaAndroid" },
    { label: "Apple (FaApple)", value: "FaApple" },
    { label: "Brain / AI (FaBrain)", value: "FaBrain" },
    { label: "Robot / ML (FaRobot)", value: "FaRobot" },
    { label: "Cloud (FaCloud)", value: "FaCloud" },
    { label: "Shield / Security (FaShieldAlt)", value: "FaShieldAlt" },
    { label: "Database / Analytics (FaDatabase)", value: "FaDatabase" },
    { label: "Network (FaNetworkWired)", value: "FaNetworkWired" },
    { label: "Mobile (FaMobileAlt)", value: "FaMobileAlt" },
    { label: "Tools (FaTools)", value: "FaTools" }
  ];

  useEffect(() => {
    async function loadData() {
      // Load categories
      try {
        const list = await getServiceCategories();
        setCategoriesList(list);
      } catch (err) {
        console.error("Error loading categories", err);
      } finally {
        setLoadingCategories(false);
      }

      // Load service
      if (!serviceId) return;
      try {
        const docRef = doc(db, 'services', serviceId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setTitle(data.title || '');
          setDescription(data.description || '');
          setDetails(data.details || '');
          setIcon(data.icon || 'FaLaptopCode');
          setImage(data.image || '');
          setCategory(data.category || 'ENTERPRISE SERVICES');
          setFeatures(data.features && data.features.length > 0 ? data.features : ['']);
        } else {
          toast.error("Service profile not found.");
          onSuccess();
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [serviceId, onSuccess]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !details) {
      toast.error("Please fill in title, description and specs.");
      return;
    }

    setSubmitting(true);
    try {
      const featuresArray = features.map(f => f.trim()).filter(Boolean);
      await updateService(serviceId, {
        title,
        description,
        details,
        icon,
        category,
        features: featuresArray,
        image
      });
      toast.success("Service profile updated!");
      onSuccess(); // Back to list view
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const selectClass = "w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition cursor-pointer";
  const inputClass = "w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 placeholder-slate-400 transition";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-4 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Service Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cloud Cost Optimization"
              className={inputClass}
              required />
          </div>
          <div>
            <label className={labelClass}>Icon Symbol</label>
            <select value={icon} onChange={(e) => setIcon(e.target.value)}
              className={selectClass}>
              {iconsList.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={labelClass}>Service Category *</label>
              <button
                type="button"
                onClick={() => setShowAddCategoryModal(true)}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1"
              >
                <FaPlusCircle className="text-[9px]" />
                <span>Add Category</span>
              </button>
            </div>
            {loadingCategories ? (
              <div className="h-9 flex items-center text-[11px] text-slate-400">Loading categories...</div>
            ) : (
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className={selectClass}>
                {categoriesList.map((cat) => (
                  <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>Cover Image URL (optional)</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)}
            placeholder="Leave blank to keep existing image..."
            className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Brief Description *</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary shown on service cards..."
            className={inputClass}
            required />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Key Features & Core Promises</label>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature/Promise #${index + 1} (e.g. 24/7 dedicated support SLA)`}
                  className={inputClass}
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="p-3 bg-red-50 hover:bg-red-150 text-red-650 hover:text-red-700 border border-red-200/50 rounded-xl transition flex-shrink-0"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addFeatureField}
            className="mt-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1.5 w-max"
          >
            <FaPlusCircle className="text-[10px]" />
            <span>Add Feature / Promise</span>
          </button>
        </div>

        <div>
          <label className={labelClass}>Detailed Specifications *</label>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)}
            rows="5" placeholder="Comprehensive engineering details, SLAs, setup methods..."
            className={inputClass + ' resize-none'}
            required />
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={submitting}
            className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold rounded-lg transition flex items-center gap-2 shadow-md shadow-blue-500/20 w-full sm:w-auto justify-center">
            <FaEdit className="text-xs flex-shrink-0" />
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 text-left animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Add New Service Category</h3>
              <button 
                type="button"
                onClick={() => { setShowAddCategoryModal(false); setNewCategoryName(''); }} 
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category Name *</label>
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. CYBERSECURITY SYSTEMS" 
                  className={inputClass} 
                  required 
                  autoFocus
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddCategoryModal(false); setNewCategoryName(''); }}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingCategory}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5"
                >
                  {addingCategory ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


