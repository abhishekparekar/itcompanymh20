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
    
    if (servicesSnapshot.empty || force) {
      console.log("Seeding services...");
      
      const defaultServices = [
        {
          title: "Cloud Migration & Infrastructure",
          description: "Seamless cloud transformations, virtualization, scaling, and hybrid architecture designs.",
          details: "Our cloud engineering team handles seamless migration from on-premise infrastructure to industry-leading providers (AWS, Azure, Google Cloud). We build scalable microservices, manage security compliance, and implement CI/CD deployment pipelines that reduce infrastructure overhead up to 40%.",
          icon: "FaCloud",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "Cybersecurity & Pentesting",
          description: "Zero-trust architecture, threat vulnerability assessments, firewalls, and system auditing.",
          details: "Protect your proprietary assets with modern defense strategies. We provide white-box pentesting, continuous intrusion monitoring, endpoint security management, and comprehensive team safety audits to defend your workspace against ransomwares and modern phishing attacks.",
          icon: "FaShieldAlt",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "Enterprise Web Solutions",
          description: "High-performance websites, portals, E-commerce, and bespoke administrative software.",
          details: "We build customized, fast-loading, React-based dashboards, APIs, and client portals tailored for high user throughput. By using modern server-side hydration techniques and database caching layer designs, we optimize page render times and ensure 99.9% availability.",
          icon: "FaLaptopCode",
          image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop"
        },
        {
          title: "AI & Data Analytics",
          description: "Machine learning integration, automated reporting, data engineering, and ETL pipelines.",
          details: "Unlock data-driven growth. We construct automated ETL processing workflows that translate raw customer touchpoints into real-time visual charts. Integrate LLMs and custom AI agents directly within your support chat and business pipelines to scale efficiency.",
          icon: "FaDatabase",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
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
          { value: "12+", label: "Years Experience" },
          { value: "320+", label: "Projects Completed" },
          { value: "75+", label: "IT Professionals" },
          { value: "99.98%", label: "System Uptime" }
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
          content: 'iCoded built our entire ERP from scratch. The quality, speed, and post-launch support have been exceptional. Our operations are 3× more efficient now.',
          rating: 5
        },
        {
          name: 'Priya Shankar',
          role: 'CTO, EduVerse Technologies',
          content: 'Our LMS platform built by iCoded handles 50,000+ students without a single hiccup. The UI is beautiful and teachers love it.',
          rating: 5
        },
        {
          name: 'Mohammed Faiz',
          role: 'Founder, QuickDeliver Logistics',
          content: 'From concept to launch in 6 weeks. iCoded\'s team is incredibly fast and professional. Our delivery tracking app is now our biggest competitive advantage.',
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
