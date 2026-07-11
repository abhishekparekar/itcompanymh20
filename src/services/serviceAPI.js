import { 
  db 
} from '../firebase/firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query, 
  orderBy 
} from 'firebase/firestore';

// ---------------- SERVICES CRUD ----------------

// Fetch all services
export async function getServices() {
  try {
    const servicesCol = collection(db, 'services');
    const q = query(servicesCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const servicesList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return servicesList;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

// Add a service
export async function addService(serviceData) {
  try {
    const servicesCol = collection(db, 'services');
    const docRef = await addDoc(servicesCol, {
      ...serviceData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
}

// Update a service
export async function updateService(id, serviceData) {
  try {
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, {
      ...serviceData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

// Delete a service
export async function deleteService(id) {
  try {
    const docRef = doc(db, 'services', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}


// ---------------- SITE SETTINGS CRUD ----------------

// Get site settings by document id (e.g. 'about', 'contact', 'footer')
export async function getSiteSettings(docId) {
  try {
    const docRef = doc(db, 'siteSettings', docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.error(`Error fetching settings for ${docId}:`, error);
    throw error;
  }
}

// Update site settings
export async function updateSiteSettings(docId, settingsData) {
  try {
    const docRef = doc(db, 'siteSettings', docId);
    await setDoc(docRef, settingsData, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error updating settings for ${docId}:`, error);
    throw error;
  }
}


// ---------------- CONTACT SUBMISSIONS CRUD ----------------

// Submit contact form
export async function submitContactForm(formData) {
  try {
    const submissionsCol = collection(db, 'contactSubmissions');
    const docRef = await addDoc(submissionsCol, {
      ...formData,
      status: 'unread',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

// Fetch all submissions
export async function getContactSubmissions() {
  try {
    const submissionsCol = collection(db, 'contactSubmissions');
    const q = query(submissionsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const submissionsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return submissionsList;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
}

// Delete submission
export async function deleteContactSubmission(id) {
  try {
    const docRef = doc(db, 'contactSubmissions', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
}


// ---------------- DATABASE SEEDING ----------------

let databaseHasBeenSeeded = null;

// Helper to check if seeding was already performed
export async function isSeeded() {
  if (databaseHasBeenSeeded !== null) {
    return databaseHasBeenSeeded;
  }
  try {
    const docRef = doc(db, 'siteSettings', 'seedingStatus');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      databaseHasBeenSeeded = snapshot.data().seeded === true;
      return databaseHasBeenSeeded;
    }
    return false;
  } catch (error) {
    console.error("Error checking seeding status:", error);
    return false;
  }
}

// Helper to set seeding status
export async function setSeededStatus(status = true) {
  try {
    const docRef = doc(db, 'siteSettings', 'seedingStatus');
    await setDoc(docRef, { seeded: status }, { merge: true });
    databaseHasBeenSeeded = status;
    return true;
  } catch (error) {
    console.error("Error setting seeding status:", error);
    return false;
  }
}

// Seed database with default data if empty
export async function seedDatabase(force = false) {
  // Check if we need to migrate/update old contact/footer settings even if already seeded
  try {
    const contactSettings = await getSiteSettings('contact');
    const isOldContact = contactSettings && (contactSettings.address && contactSettings.address.includes("Silicon Forest"));
    if (isOldContact) {
      console.log("Migrating old contact settings to UF Global Solutions...");
      await updateSiteSettings('contact', {
        email: "Info@ufglobalsolutions.com",
        phone: "+91 95952 06797",
        address: "2nd Floor, H202, Near Paremama Hotel, Chishtiya Police Chowki Signal, MGM College Road, Chhatrapati Sambhajinagar (Aurangabad) - 431001",
        workingHours: "Monday - Saturday: 9:30 AM - 6:30 PM"
      });
    }

    const footerSettings = await getSiteSettings('footer');
    const isOldFooter = footerSettings && (footerSettings.copyright && footerSettings.copyright.includes("IT Solution Inc."));
    if (isOldFooter) {
      console.log("Migrating old footer settings to UF Global Solutions...");
      await updateSiteSettings('footer', {
        copyright: "© 2026 UF Global Solutions Pvt Ltd. All rights reserved.",
        tagline: "UF Global Solutions is a professional software company providing website development, mobile app development, CRM, ERP, business automation, managed staffing solutions, corporate training, and digital solutions for growing businesses.",
        socials: {
          facebook: "https://facebook.com/ufglobalsolutions",
          twitter: "https://twitter.com/ufglobalsolutions",
          linkedin: "https://linkedin.com/company/ufglobalsolutions",
          github: "https://github.com/ufglobalsolutions"
        }
      });
    }

    // Automatically migrate existing services to have a category if missing
    const servicesCol = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesCol);
    if (!servicesSnapshot.empty) {
      for (const docSnap of servicesSnapshot.docs) {
        const data = docSnap.data();
        if (!data.category) {
          const t = (data.title || '').toLowerCase();
          let cat = 'ENTERPRISE SERVICES';
          if (t.includes('web') || t.includes('website')) cat = 'WEB SYSTEMS';
          else if (t.includes('ai') || t.includes('ml') || t.includes('machine') || t.includes('intelligence')) cat = 'AI / ML SYSTEMS';
          else if (t.includes('cloud')) cat = 'CLOUD AI & ARCHITECTURE';
          else if (t.includes('app') || t.includes('android') || t.includes('ios') || t.includes('mobile')) cat = 'MOBILE APPS';
          else if (t.includes('software') || t.includes('erp') || t.includes('crm')) cat = 'SOFTWARE ENGINEERING';
          else if (t.includes('marketing') || t.includes('seo') || t.includes('branding')) cat = 'DIGITAL GROWTH';
          
          console.log(`Migrating service "${data.title}" to category "${cat}"...`);
          await updateDoc(docSnap.ref, { category: cat });
        }
      }
    }

    // Automatically migrate existing team members to have a sequence number if missing
    const teamCol = collection(db, 'team');
    const teamSnapshot = await getDocs(teamCol);
    if (!teamSnapshot.empty) {
      for (const docSnap of teamSnapshot.docs) {
        const data = docSnap.data();
        const updates = {};
        if (data.sequence === undefined) {
          console.log(`Migrating team member "${data.name}" to have sequence 99...`);
          updates.sequence = 99;
        }
        if (data.description === undefined) {
          console.log(`Migrating team member "${data.name}" to have a default description...`);
          updates.description = "Dedicated professional specializing in engineering scalable digital solutions.";
        }
        if (Object.keys(updates).length > 0) {
          await updateDoc(docSnap.ref, updates);
        }
      }
    }
  } catch (err) {
    console.error("Migration check failed:", err);
  }

  if (!force && await isSeeded()) {
    return true;
  }
  try {
    // NOTE: Services are NOT auto-seeded. Only admin-added services from the dashboard are shown.
    // If you need to clear old seeded services, delete them from the Firebase console or Admin Dashboard.

    // Check if site settings are empty
    const aboutSettings = await getSiteSettings('about');
    if (!aboutSettings || force) {
      console.log("Seeding about settings...");
      await updateSiteSettings('about', {
        description: "We are an elite IT services agency providing robust engineering, modern design systems, cloud migrations, and ironclad cybersecurity assessments. Our mission is to accelerate the digital potential of enterprise systems globally.",
        mission: "To engineer scalable, resilient, and cutting-edge digital experiences that empower companies to lead their industries with absolute operational confidence.",
        vision: "To be the ultimate technology transformation partner globally, recognized for high-performance software engineering, security compliance, and robust technical architectures.",
        stats: [
          { value: "5+", label: "Years of Expertise" },
          { value: "100+", label: "Corporate Clientele" },
          { value: "1,000+", label: "Onboardings" },
          { value: "500+", label: "SMEs" },
          { value: "50K+", label: "Professionals Trained" }
        ]
      });
    }

    const contactSettings = await getSiteSettings('contact');
    if (!contactSettings || force) {
      console.log("Seeding contact settings...");
      await updateSiteSettings('contact', {
        email: "Info@ufglobalsolutions.com",
        phone: "+91 95952 06797",
        address: "2nd Floor, H202, Near Paremama Hotel, Chishtiya Police Chowki Signal, MGM College Road, Chhatrapati Sambhajinagar (Aurangabad) - 431001",
        workingHours: "Monday - Saturday: 9:30 AM - 6:30 PM"
      });
    }

    const footerSettings = await getSiteSettings('footer');
    if (!footerSettings || force) {
      console.log("Seeding footer settings...");
      await updateSiteSettings('footer', {
        copyright: "© 2026 UF Global Solutions Pvt Ltd. All rights reserved.",
        tagline: "UF Global Solutions is a professional software company providing website development, mobile app development, CRM, ERP, business automation, managed staffing solutions, corporate training, and digital solutions for growing businesses.",
        socials: {
          facebook: "https://facebook.com/ufglobalsolutions",
          twitter: "https://twitter.com/ufglobalsolutions",
          linkedin: "https://linkedin.com/company/ufglobalsolutions",
          github: "https://github.com/ufglobalsolutions"
        }
      });
    }

    // Seed products, blogs, brand logos, testimonials, and jobs
    await seedProducts(force);
    await seedBlogs(force);
    await seedBrandLogos(force);
    await seedTestimonials(force);
    await seedJobs(force);
    await seedTeamMembers(force);

    // Mark database as seeded
    await setSeededStatus(true);

    console.log("Database seeded successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
}

// ---------------- CLIENT LOGOS CRUD ----------------

// Fetch all client logos
export async function getClientLogos() {
  try {
    const logosCol = collection(db, 'clientLogos');
    const q = query(logosCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const logosList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return logosList;
  } catch (error) {
    console.error("Error fetching client logos:", error);
    throw error;
  }
}

// Add a client logo
export async function addClientLogo(logoData) {
  try {
    const logosCol = collection(db, 'clientLogos');
    const docRef = await addDoc(logosCol, {
      ...logoData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding client logo:", error);
    throw error;
  }
}

// Delete a client logo
export async function deleteClientLogo(id) {
  try {
    const docRef = doc(db, 'clientLogos', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting client logo:", error);
    throw error;
  }
}

// Seed brand logos if empty helper
export async function seedBrandLogos(force = false) {
  if (!force && await isSeeded()) {
    return;
  }
  try {
    const logosCol = collection(db, 'clientLogos');
    const snapshot = await getDocs(logosCol);
    if (snapshot.empty || force) {
      if (force && !snapshot.empty) {
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, 'clientLogos', d.id));
        }
      }
      const defaultLogos = [
        { name: 'EY', url: 'https://logo.clearbit.com/ey.com' },
        { name: 'Deloitte', url: 'https://logo.clearbit.com/deloitte.com' },
        { name: 'Sony', url: 'https://logo.clearbit.com/sony.com' },
        { name: 'Infosys', url: 'https://logo.clearbit.com/infosys.com' },
        { name: 'Capgemini', url: 'https://logo.clearbit.com/capgemini.com' },
        { name: 'PwC', url: 'https://logo.clearbit.com/pwc.com' },
        { name: 'Bosch', url: 'https://logo.clearbit.com/bosch.com' },
        { name: 'Ford', url: 'https://logo.clearbit.com/ford.com' },
        { name: 'Cognizant', url: 'https://logo.clearbit.com/cognizant.com' },
        { name: 'Virtusa', url: 'https://logo.clearbit.com/virtusa.com' }
      ];
      for (const logo of defaultLogos) {
        await addClientLogo(logo);
      }
      console.log("Brand logos seeded!");
    }
  } catch (err) {
    console.error("Failed to seed brand logos:", err);
  }
}

// ---------------- TESTIMONIALS CRUD ----------------

// Fetch all testimonials
export async function getTestimonials() {
  try {
    const testimonialsCol = collection(db, 'testimonials');
    const q = query(testimonialsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const testimonialsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return testimonialsList;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}

// Add a testimonial
export async function addTestimonial(testimonialData) {
  try {
    const testimonialsCol = collection(db, 'testimonials');
    const docRef = await addDoc(testimonialsCol, {
      ...testimonialData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
}

// Delete a testimonial
export async function deleteTestimonial(id) {
  try {
    const docRef = doc(db, 'testimonials', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}

// Seed testimonials if empty
export async function seedTestimonials(force = false) {
  if (!force && await isSeeded()) {
    return;
  }
  try {
    const testimonialsCol = collection(db, 'testimonials');
    const snapshot = await getDocs(testimonialsCol);
    if (snapshot.empty || force) {
      if (force && !snapshot.empty) {
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, 'testimonials', d.id));
        }
      }
      const defaultTestimonials = [
        {
          name: 'Rajesh Kumar',
          role: 'CEO, RetailNexus Pvt. Ltd.',
          content: 'UFGS built our entire ERP from scratch. The quality, speed, and post-launch support have been exceptional. Our operations are 3× more efficient now.',
          rating: 5
        },
        {
          name: 'Priya Shankar',
          role: 'CTO, EduVerse Technologies',
          content: 'Our LMS platform built by UFGS handles 50,000+ students without a single hiccup. The UI is beautiful and teachers love it.',
          rating: 5
        },
        {
          name: 'Mohammed Faiz',
          role: 'Founder, QuickDeliver Logistics',
          content: 'From concept to launch in 6 weeks. UFGS\'s team is incredibly fast and professional. Our delivery tracking app is now our biggest competitive advantage.',
          rating: 5
        }
      ];
      for (const t of defaultTestimonials) {
        await addTestimonial(t);
      }
      console.log("Testimonials seeded!");
    }
  } catch (err) {
    console.error("Failed to seed testimonials:", err);
  }
}

// ---------------- JOBS / CAREERS CRUD ----------------

// Fetch all job listings
export async function getJobs() {
  try {
    const jobsCol = collection(db, 'jobs');
    const q = query(jobsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const jobsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return jobsList;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

// Add a job listing
export async function addJob(jobData) {
  try {
    const jobsCol = collection(db, 'jobs');
    const docRef = await addDoc(jobsCol, {
      ...jobData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
}

// Delete a job listing
export async function deleteJob(id) {
  try {
    const docRef = doc(db, 'jobs', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}

// Seed default job listings if empty
export async function seedJobs(force = false) {
  if (!force && await isSeeded()) {
    return;
  }
  try {
    const jobsCol = collection(db, 'jobs');
    const snapshot = await getDocs(jobsCol);
    if (snapshot.empty || force) {
      if (force && !snapshot.empty) {
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, 'jobs', d.id));
        }
      }
      const defaultJobs = [
        {
          title: 'Senior React Developer',
          category: 'Engineering',
          type: 'Permanent',
          location: 'Pune / Remote',
          description: 'Responsible for building high-performance automation dashboards and responsive UI features using React.js and modern styling systems.',
          experience: '4-6 Years'
        },
        {
          title: 'Financial Analyst',
          category: 'Finance & Accounting',
          type: 'Permanent',
          location: 'Mumbai Office',
          description: 'Manage corporate audits, client invoicing, tax filings, and budgeting metrics for enterprise IT consulting projects.',
          experience: '2-4 Years'
        },
        {
          title: 'Supply Chain Operations Manager',
          category: 'Supply Chain & Logistics',
          type: 'Contract',
          location: 'Bangalore Office',
          description: 'Supervise logistics coordination, inventory audits, hardware deployments, and vendor communication.',
          experience: '3-5 Years'
        },
        {
          title: 'Direct Sales Executive',
          category: 'Banking Sales',
          type: 'Permanent',
          location: 'Chennai Office',
          description: 'Drive sales of enterprise SaaS subscription products to banks, retail chains, and SMEs.',
          experience: '1-3 Years'
        }
      ];
      for (const j of defaultJobs) {
        await addJob(j);
      }
      console.log("Job openings seeded successfully!");
    }
  } catch (err) {
    console.error("Failed to seed jobs:", err);
  }
}


// ---------------- UPDATE & BULK ACTIONS ----------------

// Update a Job
export async function updateJob(id, jobData) {
  try {
    const docRef = doc(db, 'jobs', id);
    await updateDoc(docRef, {
      ...jobData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
}

// Update a Testimonial
export async function updateTestimonial(id, testimonialData) {
  try {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      ...testimonialData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
}

// Update a Brand Logo
export async function updateClientLogo(id, logoData) {
  try {
    const docRef = doc(db, 'clientLogos', id);
    await updateDoc(docRef, {
      ...logoData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
}

// Generic Bulk Delete function (helper for any collection)
export async function bulkDeleteDocuments(collectionName, idsArray) {
  try {
    const promises = idsArray.map(id => deleteDoc(doc(db, collectionName, id)));
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error(`Error bulk deleting from ${collectionName}:`, error);
    throw error;
  }
}

// ---------------- PRODUCTS CRUD ----------------
export async function getProducts() {
  try {
    const colRef = collection(db, 'products');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function addProduct(prodData) {
  try {
    const colRef = collection(db, 'products');
    const docRef = await addDoc(colRef, {
      ...prodData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export async function updateProduct(id, prodData) {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...prodData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function seedProducts(force = false) {
  if (!force && await isSeeded()) {
    return;
  }
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty || force) {
      if (force && !snapshot.empty) {
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, 'products', d.id));
        }
      }
      const defaultProducts = [
        {
          name: 'HRMS Pro',
          tagline: 'Complete Human Resource Management',
          features: ['Employee Profiles', 'Payroll & TDS', 'Attendance & Leave', 'Performance Reviews'],
          gradient: 'from-blue-600 to-cyan-500',
        },
        {
          name: 'EduLearn LMS',
          tagline: 'Powerful Learning Management System',
          features: ['Live & Recorded Classes', 'Assessments', 'Certificates', 'Analytics Dashboard'],
          gradient: 'from-purple-600 to-pink-500',
        },
        {
          name: 'SalesCRM',
          tagline: 'Smart CRM for Growing Businesses',
          features: ['Lead Management', 'Pipeline Tracking', 'Email Automation', 'Reports & KPIs'],
          gradient: 'from-green-600 to-emerald-400',
        },
        {
          name: 'EnterprisERP',
          tagline: 'Unified Enterprise Resource Planning',
          features: ['Finance & Accounting', 'Supply Chain', 'Production Planning', 'Multi-Branch'],
          gradient: 'from-amber-500 to-orange-400',
        }
      ];
      for (const p of defaultProducts) {
        await addProduct(p);
      }
      console.log("Products seeded successfully!");
    }
  } catch (err) {
    console.error("Failed to seed products:", err);
  }
}

// ---------------- BLOGS CRUD ----------------
export async function getBlogs() {
  try {
    const colRef = collection(db, 'blogs');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function addBlog(blogData) {
  try {
    const colRef = collection(db, 'blogs');
    const docRef = await addDoc(colRef, {
      ...blogData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
}

export async function updateBlog(id, blogData) {
  try {
    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, {
      ...blogData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

export async function deleteBlog(id) {
  try {
    const docRef = doc(db, 'blogs', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}

export async function seedBlogs(force = false) {
  if (!force && await isSeeded()) {
    return;
  }
  try {
    const colRef = collection(db, 'blogs');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty || force) {
      if (force && !snapshot.empty) {
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, 'blogs', d.id));
        }
      }
      const defaultBlogs = [
        {
          title: "Business Automation for Small Business: The Ultimate 2026 Guide",
          category: "BUSINESS AUTOMATION",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
          content: "Automating your business in 2026 is no longer optional. This guide walks you through the initial steps of identifying bottleneck workflows, setting up basic CRM pipelines, integrating payment links, and configuring automated client messaging loops to save up to 20 hours per week."
        },
        {
          title: "Best Software Company in Sambhajinagar for Business Automation",
          category: "BUSINESS AUTOMATION",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
          content: "Enterprise scaling requires top-tier development partners. Discover why UF Global Solutions stands out in Sambhajinagar (Aurangabad) for enterprise-grade microservices deployment, custom software development, and modern cloud database configuration."
        },
        {
          title: "Why Your Business Needs a Website in 2026",
          category: "WEB DEVELOPMENT",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
          content: "A premium online presence is the first point of contact for your potential customers. We explore why modern design languages, fast page load speeds, and dynamic contact gateways are critical factors for search engine rankings and lead generation."
        }
      ];
      for (const b of defaultBlogs) {
        await addBlog(b);
      }
      console.log("Blogs seeded successfully!");
    }
  } catch (err) {
    console.error("Failed to seed blogs:", err);
  }
}

// ---------------- TEAM MEMBERS CRUD ----------------
export async function getTeamMembers() {
  try {
    const colRef = collection(db, 'team');
    const snapshot = await getDocs(colRef);
    const list = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        sequence: data.sequence !== undefined ? Number(data.sequence) : 99,
        ...data
      };
    });
    // Sort in-memory by sequence ascending, then by createdAt descending
    list.sort((a, b) => {
      if (a.sequence !== b.sequence) {
        return a.sequence - b.sequence;
      }
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    return list;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
}

export async function addTeamMember(memberData) {
  try {
    const colRef = collection(db, 'team');
    const docRef = await addDoc(colRef, {
      ...memberData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding team member:", error);
    throw error;
  }
}

export async function updateTeamMember(id, memberData) {
  try {
    const docRef = doc(db, 'team', id);
    await updateDoc(docRef, {
      ...memberData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating team member:", error);
    throw error;
  }
}

export async function deleteTeamMember(id) {
  try {
    const docRef = doc(db, 'team', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
}

export async function seedTeamMembers(force = false) {
  if (!force && await isSeeded()) {
    return;
  }
  try {
    const colRef = collection(db, 'team');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty || force) {
      if (force && !snapshot.empty) {
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, 'team', d.id));
        }
      }
      const defaultTeam = [
        {
          name: 'Abhishek Parekar',
          designation: 'Founder & CEO',
          photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
          sequence: 1,
          description: 'Technology strategist with expertise in managing complex IT solutions and operations.'
        },
        {
          name: 'Neha Patil',
          designation: 'Co-Founder & COO',
          photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
          sequence: 2,
          description: 'Expert in operations management, client communication, and digital scale strategies.'
        },
        {
          name: 'Rohan Joshi',
          designation: 'Senior Software Engineer',
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
          sequence: 3,
          description: 'Building strong client applications, database layers, and automation systems.'
        }
      ];
      for (const m of defaultTeam) {
        await addTeamMember(m);
      }
      console.log("Team members seeded successfully!");
    }
  } catch (err) {
    console.error("Failed to seed team members:", err);
  }
}

// ---------------- SERVICE CATEGORIES CRUD ----------------

// Fetch all service categories, seeding if empty
export async function getServiceCategories() {
  try {
    const colRef = collection(db, 'serviceCategories');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      // Seed default categories
      const defaults = [
        'WEB SYSTEMS',
        'AI / ML SYSTEMS',
        'CLOUD AI & ARCHITECTURE',
        'MOBILE APPS',
        'SOFTWARE ENGINEERING',
        'DIGITAL GROWTH',
        'ENTERPRISE SERVICES'
      ];
      const seededList = [];
      for (const cat of defaults) {
        const docRef = await addDoc(colRef, {
          name: cat,
          createdAt: new Date().toISOString()
        });
        seededList.push({ id: docRef.id, name: cat });
      }
      return seededList;
    }
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Sort alphabetically by name
    list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    return list;
  } catch (error) {
    console.error("Error fetching service categories:", error);
    throw error;
  }
}

// Add a service category
export async function addServiceCategory(name) {
  try {
    const colRef = collection(db, 'serviceCategories');
    // Check if category already exists to avoid duplicates
    const snapshot = await getDocs(colRef);
    const trimmedUpper = name.trim().toUpperCase();
    const existing = snapshot.docs.find(doc => (doc.data().name || '').trim().toUpperCase() === trimmedUpper);
    if (existing) {
      return { id: existing.id, name: existing.data().name };
    }
    
    const docRef = await addDoc(colRef, {
      name: trimmedUpper,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, name: trimmedUpper };
  } catch (error) {
    console.error("Error adding service category:", error);
    throw error;
  }
}


