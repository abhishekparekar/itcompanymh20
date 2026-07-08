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

// Seed database with default data if empty
export async function seedDatabase(force = false) {
  try {
    // Check if services are empty
    const servicesCol = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesCol);
    
    let hasOldDefaults = false;
    if (!servicesSnapshot.empty) {
      const hasCustomSoftware = servicesSnapshot.docs.some(docSnap => docSnap.data().title === "Custom Software");
      hasOldDefaults = !hasCustomSoftware || servicesSnapshot.docs.some(docSnap => 
        ["Managed IT Solutions", "Corporate Training", "Staffing Solutions", "Cloud Migration & Infrastructure", "Enterprise Web Solutions", "Cybersecurity & Pentesting"].includes(docSnap.data().title)
      );
    }

    if (servicesSnapshot.empty || force || hasOldDefaults) {
      console.log("Seeding new services...");
      
      if (!servicesSnapshot.empty) {
        for (const docSnap of servicesSnapshot.docs) {
          await deleteDoc(doc(db, 'services', docSnap.id));
        }
      }
      
      const defaultServices = [
        {
          title: "Website Development",
          description: "Build modern, fast, and SEO-friendly corporate websites and e-commerce platforms.",
          details: "We specialize in developing premium web applications using React, Next.js, and modern CSS frameworks. Our sites are designed for fast page speeds, custom micro-interactions, responsive mobile layouts, and high search engine rankings.",
          icon: "FaLaptopCode",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "Android Application Development",
          description: "High-performance native and cross-platform Android mobile applications.",
          details: "Our mobile team engineers feature-rich Android apps using Kotlin and Flutter. We configure background sync services, real-time push notifications, custom user onboarding screens, secure storage solutions, and optimal battery management protocols.",
          icon: "FaAndroid",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "iOS Application",
          description: "Premium iOS apps optimized for the Apple ecosystem and App Store compliance.",
          details: "We design and develop premium iOS mobile apps using Swift and Flutter. We focus on strict adherence to the Apple Human Interface guidelines, butter-smooth animations, local face/touch ID authentication, and optimal memory management.",
          icon: "FaApple",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "Custom Software",
          description: "Enterprise ERP systems, custom CRM pipelines, and bespoke workflow automation engines.",
          details: "We design and build bespoke software solutions to automate complex business workflows. From multi-branch ERP software to custom CRM integrations, database migrations, security audits, and dedicated dashboard consoles, we deliver scalable products tailored to your operational structure.",
          icon: "FaTools",
          image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "AI/ML",
          description: "Custom neural networks, natural language processing, predictive intelligence, and computer vision.",
          details: "Unlock actionable insights with custom PyTorch/TensorFlow models, predictive customer behavior algorithms, NLP engines, OCR automation, and automated recommendation engines tailored to your database models.",
          icon: "FaBrain",
          image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "Cloud AI",
          description: "Deploy scalable cloud-native AI infrastructures, cognitive microservices, and serverless pipelines.",
          details: "We help integrate scalable AI/ML pipelines on AWS, Google Cloud, and Azure. We configure automated vision APIs, speech-to-text gateways, elastic container deployments (Kubernetes), and serverless machine learning APIs for real-time inference.",
          icon: "FaCloud",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
        }
      ];

      for (const service of defaultServices) {
        await addDoc(servicesCol, {
          ...service,
          createdAt: new Date().toISOString()
        });
      }
    }

    // Check if site settings are empty
    const aboutSettings = await getSiteSettings('about');
    if (!aboutSettings || force) {
      console.log("Seeding about settings...");
      await updateSiteSettings('about', {
        description: "We are an elite IT services agency providing robust engineering, modern design systems, cloud migrations, and ironclad cybersecurity assessments. Our mission is to accelerate the digital potential of enterprise systems globally.",
        mission: "To engineer scalable, resilient, and cutting-edge digital experiences that empower companies to lead their industries with absolute operational confidence.",
        vision: "To be the ultimate technology transformation partner globally, recognized for high-performance software engineering, security compliance, and robust technical architectures.",
        stats: [
          { value: "25+", label: "Years of Expertise" },
          { value: "300+", label: "Corporate Clientele" },
          { value: "5,000+", label: "Onboardings" },
          { value: "2,500+", label: "SMEs" },
          { value: "450K+", label: "Professionals Trained" }
        ]
      });
    }

    const contactSettings = await getSiteSettings('contact');
    if (!contactSettings || force) {
      console.log("Seeding contact settings...");
      await updateSiteSettings('contact', {
        email: "contact@itsolutions.com",
        phone: "+1 (888) 293-9481",
        address: "500 Innovation Parkway, Suite 100, Silicon Forest, CA 94016",
        workingHours: "Monday - Friday: 8:00 AM - 7:00 PM PST"
      });
    }

    const footerSettings = await getSiteSettings('footer');
    if (!footerSettings || force) {
      console.log("Seeding footer settings...");
      await updateSiteSettings('footer', {
        copyright: "© 2026 IT Solution Inc. All rights reserved.",
        tagline: "Innovative digital systems engineered for security, reliability, and scale.",
        socials: {
          facebook: "https://facebook.com/itsolutions",
          twitter: "https://twitter.com/itsolutions",
          linkedin: "https://linkedin.com/company/itsolutions",
          github: "https://github.com/itsolutions"
        }
      });
    }

    // Seed products and blogs
    await seedProducts(force);
    await seedBlogs(force);

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
export async function seedBrandLogos() {
  try {
    const logosCol = collection(db, 'clientLogos');
    const snapshot = await getDocs(logosCol);
    if (snapshot.empty) {
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
export async function seedTestimonials() {
  try {
    const testimonialsCol = collection(db, 'testimonials');
    const snapshot = await getDocs(testimonialsCol);
    if (snapshot.empty) {
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
export async function seedJobs() {
  try {
    const jobsCol = collection(db, 'jobs');
    const snapshot = await getDocs(jobsCol);
    if (snapshot.empty) {
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
