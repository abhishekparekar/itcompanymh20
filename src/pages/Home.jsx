import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';
import { getServices, getSiteSettings, getClientLogos, seedBrandLogos, getTestimonials, seedTestimonials, seedDatabase } from '../services/serviceAPI';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import { FaBriefcase, FaThumbsUp, FaUsers, FaBuilding, FaUserGraduate, FaQuoteLeft, FaStar, FaCreditCard, FaMicrochip, FaShoppingBag, FaHospital, FaRocket } from 'react-icons/fa';

export default function Home() {
  const [services, setServices] = useState([]);
  const [logos, setLogos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [aboutDesc, setAboutDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        await seedDatabase();
        const servicesData = await getServices();
        setServices(servicesData.slice(0, 4)); // Show top 4 services on Home
        
        const aboutData = await getSiteSettings('about');
        if (aboutData && aboutData.description) {
          setAboutDesc(aboutData.description);
        }

        // Seed and fetch client logos dynamically
        await seedBrandLogos();
        const brandLogos = await getClientLogos();
        setLogos(brandLogos);

        // Seed and fetch testimonials dynamically
        await seedTestimonials();
        const testList = await getTestimonials();
        setTestimonials(testList);
      } catch (err) {
        console.error('Error loading Home page data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  // Section Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="pb-16 bg-transparent space-y-20">
      {/* Hero Header */}
      <Hero />

      {/* Statistics Section */}
      <section className="bg-dark py-12 relative overflow-hidden border-y border-slate-950">
        <div className="absolute inset-0 opacity-5 bg-grid-pattern" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center items-center justify-center"
          >
            
            {/* Stat 1 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-accent mb-0.5">
                <FaBriefcase className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">
                <CountUp end={25} enableScrollSpy scrollSpyOnce />+
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Years of Expertise</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-accent mb-0.5">
                <FaThumbsUp className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">
                <CountUp end={300} enableScrollSpy scrollSpyOnce />+
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Corporate Clientele</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-accent mb-0.5">
                <FaUsers className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">
                <CountUp end={5000} enableScrollSpy scrollSpyOnce separator="," />+
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Onboardings</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-accent mb-0.5">
                <FaBuilding className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">
                <CountUp end={2500} enableScrollSpy scrollSpyOnce separator="," />+
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SMEs</p>
            </motion.div>

            {/* Stat 5 */}
            <motion.div variants={fadeUp} className="flex flex-col items-center space-y-1.5 col-span-2 md:col-span-1">
              <div className="text-3xl text-accent mb-0.5">
                <FaUserGraduate className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">
                <CountUp end={450} enableScrollSpy scrollSpyOnce />K+
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Professionals Trained</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="container max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            What We Do
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Managed IT Service Portfolios
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4" />
          <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
            We provide bespoke development and engineering workflows designed around your business needs.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <ServiceCard key={svc.id || i} service={svc} index={i} />
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-outline border-slate-300 text-slate-700 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all">
            View All Services
          </Link>
        </motion.div>
      </section>

      {/* Screenshot 5: Industries We Power & Scale Section */}
      <section className="container max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-wider mb-3">
            Targeted Verticals
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Industries We <span className="gradient-text-blue font-black">Power & Scale</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4" />
          <p className="text-slate-505 text-xs leading-relaxed max-w-md mx-auto">
            We adapt our custom-coded microservices to target exact operational constraints across high-value business fields.
          </p>
        </motion.div>

        {/* Grid layout of 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          
          {/* Card 1: FinTech & Finance */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-sm">
                <FaCreditCard className="text-lg" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">FinTech & Finance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Secure payment gateways, blockchain ledgers, automated trading algorithms, and real-time financial dashboards.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore Configuration</span>
              <span className="text-xs text-slate-450">&rarr;</span>
            </div>
          </motion.div>

          {/* Card 2: AI & Automations */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <FaMicrochip className="text-lg" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">AI & Automations</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Machine learning models, predictive analytics, intelligent chatbots, and enterprise-grade workflow automation systems.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore Configuration</span>
              <span className="text-xs text-slate-455">&rarr;</span>
            </div>
          </motion.div>

          {/* Card 3: Retail & E-Commerce */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                <FaShoppingBag className="text-lg" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Retail & E-Commerce</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fast checkout pipelines, automated abandoned-cart alerts, instant payment syncs, and multi-tenant seller boards.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore Configuration</span>
              <span className="text-xs text-slate-460">&rarr;</span>
            </div>
          </motion.div>

          {/* Card 4: Healthcare & MedTech */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm">
                <FaHospital className="text-lg" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Healthcare & MedTech</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clinic scheduling calendars, HIPAA-secure patient record tables, biometric check-ins, and direct automated invoice logs.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore Configuration</span>
              <span className="text-xs text-slate-465">&rarr;</span>
            </div>
          </motion.div>

          {/* Card 5: Startups & SaaS Tech */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shadow-sm">
                <FaRocket className="text-lg" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Startups & SaaS Tech</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Agile codebases equipped with secure Firebase authentications, real-time subscription meters, and fast API nodes.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore Configuration</span>
              <span className="text-xs text-slate-470">&rarr;</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Brands We Work With Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern pointer-events-none" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Partnership Network
            </span>
            <h2 className="text-2xl font-black text-accent tracking-tight">
              Brands We Work With
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-3" />
          </motion.div>

          {logos.length === 0 ? (
            <p className="text-center text-xs text-slate-400">No brand logos uploaded yet.</p>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center"
            >
              {logos.map((logo, idx) => (
                <motion.div 
                  variants={fadeUp}
                  key={logo.id || idx} 
                  className="flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-accent/30 transition group h-20"
                >
                  <img
                    src={logo.url}
                    alt={logo.name || 'Brand Logo'}
                    className="max-h-10 max-w-[80%] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            Client Reviews
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Trusted Testimonials
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4" />
          <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
            Discover what our enterprise clients say about our bespoke software operations and custom automation pipelines.
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <p className="text-center text-xs text-slate-400">No testimonials published yet.</p>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, idx) => (
              <motion.div 
                variants={fadeUp}
                key={t.id || idx} 
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 flex flex-col justify-between h-full space-y-6 text-left"
              >
                <div className="space-y-4">
                  <div className="text-accent text-2xl flex items-center justify-between">
                    <FaQuoteLeft className="opacity-40" />
                    <div className="flex gap-0.5 text-amber-500 text-[10px]">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3.5 border-t border-slate-100 pt-4 mt-auto">
                  {/* Avatar circle with name initials */}
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-[11px] flex items-center justify-center flex-shrink-0 uppercase">
                    {t.name?.slice(0, 2) || "CL"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs leading-tight">{t.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Talent Shortage Banner Section */}
      <section className="bg-dark py-16 relative overflow-hidden border-y border-slate-950">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
        
        {/* Background Decorative Rings */}
        <div className="absolute -top-24 -left-24 w-72 h-72 border border-slate-800/40 rounded-full z-0" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 border border-slate-800/40 rounded-full z-0" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Percentage Indicator */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
          >
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Employers in India are facing a talent shortage
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <span className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">
                80%
              </span>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  can't find the <br className="hidden md:inline" /> talent they need
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Description & Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 text-left space-y-6"
          >
            <p className="text-slate-300 text-xs leading-relaxed">
              With deep expertise in the Indian market, our specialized IT workforce deployment, staff augmentation, and Hire-Train-Deploy systems bridge talent gaps at scale, linking millions of individuals with meaningful careers and supporting hundreds of organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/careers" 
                className="py-3 px-6 bg-accent hover:bg-accent-dark text-white text-[11px] font-bold uppercase rounded-full shadow-lg shadow-red-500/10 transition duration-200 text-center tracking-wider"
              >
                Hire Skilled Talent &rarr;
              </Link>
              <Link 
                to="/careers" 
                className="py-3 px-6 bg-primary hover:bg-primary-dark text-white text-[11px] font-bold uppercase rounded-full shadow-lg shadow-blue-500/10 transition duration-200 text-center tracking-wider border border-primary-light/20"
              >
                Find Work &rarr;
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* About Teaser Section */}
      <section className="container max-w-7xl mx-auto px-6 py-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:col-span-5 text-left space-y-4"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">
              About Our Operations
            </span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              Transforming Ideas Into <br />
              Digital Assets
            </h2>
            <div className="w-12 h-1 bg-accent mb-4" />
            <p className="text-slate-600 text-xs leading-relaxed">
              {aboutDesc || "UF Global Solutions Pvt Ltd is a dedicated IT solution agency specializing in software integration, website designs, workflow automation, and custom product architectures."}
            </p>
            <div className="pt-2">
              <Link to="/about" className="btn-primary hover:-translate-y-0.5">
                Read Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[16/9] border border-slate-200 group">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop" 
                alt="UFGS enterprise dashboard development and collaboration" 
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Premium Contact Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f42] via-[#002A54] to-[#003d7a] z-0" />
        <div className="absolute inset-0 opacity-10 z-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white space-y-8"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-3">
                  <span className="w-5 h-px bg-blue-400 inline-block" />
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                  Let's Build Something
                  <span className="block text-sky-400">Great Together</span>
                </h2>
                <p className="text-blue-100/80 text-sm leading-relaxed max-w-md">
                  Have a project in mind? Fill out the form and our team of expert engineers will reach out within 24 hours to discuss your requirements.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-3">
                {[
                  { icon: '📧', label: 'Email Us', value: 'info@ufglobalsolutions.com' },
                  { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
                  { icon: '📍', label: 'Office', value: 'Pune, Maharashtra, India' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition rounded-2xl px-5 py-3.5 border border-white/10">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-white text-sm font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { num: '185+', label: 'Projects' },
                  { num: '103+', label: 'Clients' },
                  { num: '24h', label: 'Response' },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-white/5 rounded-2xl py-4 border border-white/10">
                    <p className="text-2xl font-black text-sky-400">{s.num}</p>
                    <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="bg-white rounded-3xl p-7 md:p-9 shadow-2xl shadow-black/30">
                <h3 className="text-xl font-extrabold text-slate-800 mb-1">Send Us a Message</h3>
                <p className="text-xs text-slate-400 mb-6">We'll get back to you within 24 hours.</p>

                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}