import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';
import { getServices, getSiteSettings, getClientLogos, seedBrandLogos, getTestimonials, seedTestimonials, seedDatabase } from '../services/serviceAPI';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import { FaBriefcase, FaThumbsUp, FaUsers, FaBuilding, FaUserGraduate, FaQuoteLeft, FaStar, FaCreditCard, FaMicrochip, FaShoppingBag, FaHospital, FaRocket, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
  const [services, setServices] = useState([]);
  const [logos, setLogos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [aboutDesc, setAboutDesc] = useState('');
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const industryScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  // Industry inquiry state
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [industryName, setIndustryName] = useState('');
  const [industryEmail, setIndustryEmail] = useState('');
  const [industryPhone, setIndustryPhone] = useState('');
  const [industryMessage, setIndustryMessage] = useState('');
  const [submittingIndustry, setSubmittingIndustry] = useState(false);

  useEffect(() => {
    async function loadHomeData() {
      try {
        await seedDatabase();
        const servicesData = await getServices();
        setServices(servicesData); // Show all services in the scrolling carousel
        
        const aboutData = await getSiteSettings('about');
        if (aboutData) {
          if (aboutData.description) {
            setAboutDesc(aboutData.description);
          }
          if (aboutData.stats) {
            setStats(aboutData.stats);
          }
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

  // Auto-scroll effect for Services Showcase
  useEffect(() => {
    if (loading || services.length === 0) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [loading, services]);

  // Auto-scroll effect for Industries We Power & Scale
  useEffect(() => {
    const interval = setInterval(() => {
      if (industryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = industryScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          industryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          industryScrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);



  // Auto-scroll effect for Testimonials
  useEffect(() => {
    if (loading || testimonials.length === 0) return;
    const interval = setInterval(() => {
      if (testimonialsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = testimonialsScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          testimonialsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialsScrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [loading, testimonials]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const scrollIndustryLeft = () => {
    if (industryScrollRef.current) {
      industryScrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollIndustryRight = () => {
    if (industryScrollRef.current) {
      industryScrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleIndustrySubmit = async (e) => {
    e.preventDefault();
    if (!industryName || !industryEmail || !industryMessage) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    setSubmittingIndustry(true);
    try {
      const { submitContactForm } = await import('../services/serviceAPI');
      await submitContactForm({
        name: industryName,
        email: industryEmail,
        phone: industryPhone,
        subject: `Inquiry: ${selectedIndustry.title}`,
        message: industryMessage
      });
      toast.success("Thank you! Your inquiry has been sent successfully.");
      setIndustryName('');
      setIndustryEmail('');
      setIndustryPhone('');
      setIndustryMessage('');
      setSelectedIndustry(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmittingIndustry(false);
    }
  };

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
    <div className="pb-8 bg-transparent">
      {/* Hero Header */}
      <Hero />

      {/* Statistics Section — Infinite Ticker */}
      <section className="bg-dark py-5 sm:py-8 relative overflow-hidden border-y border-slate-800">
        <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#040916] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#040916] to-transparent z-10 pointer-events-none" />

        {/* Ticker track */}
        <div className="overflow-hidden relative z-0">
          <div className="flex w-max animate-ticker hover:[animation-play-state:paused] gap-0">
            {[
              ...(stats && stats.length === 5 && stats.every(s => s.value && s.label)
                ? stats
                : [
                    { value: '25+', label: 'Years of Expertise' },
                    { value: '300+', label: 'Corporate Clientele' },
                    { value: '5,000+', label: 'Onboardings' },
                    { value: '2,500+', label: 'SMEs' },
                    { value: '450K+', label: 'Professionals Trained' }
                  ]),
              ...(stats && stats.length === 5 && stats.every(s => s.value && s.label)
                ? stats
                : [
                    { value: '25+', label: 'Years of Expertise' },
                    { value: '300+', label: 'Corporate Clientele' },
                    { value: '5,000+', label: 'Onboardings' },
                    { value: '2,500+', label: 'SMEs' },
                    { value: '450K+', label: 'Professionals Trained' }
                  ]),
              ...(stats && stats.length === 5 && stats.every(s => s.value && s.label)
                ? stats
                : [
                    { value: '25+', label: 'Years of Expertise' },
                    { value: '300+', label: 'Corporate Clientele' },
                    { value: '5,000+', label: 'Onboardings' },
                    { value: '2,500+', label: 'SMEs' },
                    { value: '450K+', label: 'Professionals Trained' }
                  ])
            ].map((item, idx) => {
              const icons = [
                <FaBriefcase />, <FaThumbsUp />, <FaUsers />, <FaBuilding />, <FaUserGraduate />
              ];
              const icon = icons[idx % 5];
              return (
                <div
                  key={idx}
                  className="flex items-center"
                >
                  {/* Stat card */}
                  <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-2 min-w-[100px] sm:min-w-[140px] md:min-w-[180px] text-center group">
                    <div className="text-sm sm:text-lg md:text-xl text-accent mb-0.5 group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </div>
                    <div className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                      {item.value}
                    </div>
                    <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">
                      {item.label}
                    </p>
                  </div>
                  {/* Divider dot */}
                  <span className="text-slate-700 text-lg select-none">✦</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="container max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-left"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              What We Do
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Managed IT Service Portfolios
            </h2>
            <div className="w-12 h-1 bg-accent mb-3" />
            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              We provide bespoke development and engineering workflows designed around your business needs.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 select-none scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((svc, i) => (
              <div key={svc.id || i} className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start">
                <ServiceCard service={svc} index={i} />
              </div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link to="/services" className="btn-outline border-slate-300 text-slate-700 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all">
            View All Services
          </Link>
        </motion.div>
      </section>

      {/* Industries We Power & Scale Section */}
      <section className="container max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-left"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Targeted Verticals
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Industries We <span className="gradient-text-red font-black">Power & Scale</span>
            </h2>
            <div className="w-12 h-1 bg-accent mb-3" />
            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              We adapt our custom-coded microservices to target exact operational constraints across high-value business fields.
            </p>
          </motion.div>
        </div>

        {/* Scrollable Track */}
        <div 
          ref={industryScrollRef}
          className="flex overflow-x-auto gap-6 pb-6 select-none scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[
            {
              id: 'fintech',
              icon: <FaCreditCard className="text-lg" />,
              color: 'sky',
              title: 'FinTech & Finance',
              subtitle: 'Financial Technology & Transaction Systems',
              desc: 'Secure payment gateways, blockchain ledgers, automated trading algorithms, and real-time financial dashboards.',
              details: 'We design and deploy military-grade financial architectures. Our services cover multi-currency support, ledger integrations, real-time transaction pipelines, automated risk analysis, compliance-aligned audit logs, and fraud prevention engines.',
              image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop'
            },
            {
              id: 'ai',
              icon: <FaMicrochip className="text-lg" />,
              color: 'indigo',
              title: 'AI & Automations',
              subtitle: 'Machine Learning & Robotic Process Automations',
              desc: 'Machine learning models, predictive analytics, intelligent chatbots, and enterprise-grade workflow automation systems.',
              details: 'Integrate predictive intelligence directly into your operational flows. We build customized generative models, vector databases, semantic search modules, robotic process schedulers, and cognitive agent workflows.',
              image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop'
            },
            {
              id: 'retail',
              icon: <FaShoppingBag className="text-lg" />,
              color: 'orange',
              title: 'Retail & E-Commerce',
              subtitle: 'High-Volume Digital Commerce & Marketplaces',
              desc: 'Fast checkout pipelines, automated abandoned-cart alerts, instant payment syncs, and multi-tenant seller boards.',
              details: 'Scale your inventory throughput and customer reach with optimized pipelines. We develop secure checkouts, automated cart recovery triggers, multi-tenant merchant portals, and analytics metrics dashboards.',
              image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop'
            },
            {
              id: 'health',
              icon: <FaHospital className="text-lg" />,
              color: 'teal',
              title: 'Healthcare & MedTech',
              subtitle: 'Patient Care and Secure Medical Registries',
              desc: 'Clinic scheduling calendars, HIPAA-secure patient record tables, biometric check-ins, and direct automated invoice logs.',
              details: 'We build HIPAA-compliant clinic registers, biometric authentication logs, smart appointment calendars, real-time billing processors, and medical inventory management nodes.',
              image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop'
            },
            {
              id: 'saas',
              icon: <FaRocket className="text-lg" />,
              color: 'pink',
              title: 'Startups & SaaS Tech',
              subtitle: 'SaaS Platforms & Agile Software Architectures',
              desc: 'Agile codebases equipped with secure Firebase authentications, real-time subscription meters, and fast API nodes.',
              details: 'Launch and iterate quickly with clean, future-proof microservices. We build customizable billing frameworks, multi-tenant sub-merchant routes, real-time server monitors, and high-performance serverless configurations.',
              image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop'
            }
          ].map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedIndustry(item)}
              className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 space-y-6 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 border border-${item.color}-100 flex items-center justify-center text-${item.color}-600 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-slate-800 text-base">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore Configuration</span>
                <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </motion.div>
          ))}
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
            <div className="overflow-hidden w-full relative">
              {/* Fade masks on the edges for premium look */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

              <div className="flex w-max animate-ticker-reverse hover:[animation-play-state:paused] gap-6 md:gap-8 py-3">
                {logos.concat(logos).concat(logos).concat(logos).concat(logos).map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="w-[180px] sm:w-[200px] md:w-[220px] shrink-0 flex items-center justify-center h-24 sm:h-26 md:h-28 px-4 select-none"
                  >
                    <img
                      src={logo.url}
                      alt={logo.name || 'Brand Logo'}
                      className="max-h-16 sm:max-h-18 md:max-h-20 max-w-full object-contain transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
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
            <div 
              ref={testimonialsScrollRef}
              className="flex overflow-x-auto gap-6 pb-6 select-none scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((t, idx) => (
                <div 
                  key={t.id || idx} 
                  className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 flex flex-col justify-between h-full space-y-6 text-left"
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
                </div>
              ))}
            </div>
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
                  <span className="block gradient-text-red">Great Together</span>
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
                {(stats && stats.length >= 3 
                  ? stats.slice(0, 3).map(s => ({ num: s.value, label: s.label }))
                  : [
                      { num: '185+', label: 'Projects' },
                      { num: '103+', label: 'Clients' },
                      { num: '24h', label: 'Response' }
                    ]
                ).map((s) => (
                  <div key={s.label} className="text-center bg-white/5 rounded-2xl py-4 border border-white/10">
                    <p className="text-2xl font-black text-sky-400">{s.num}</p>
                    <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wide mt-0.5 truncate">{s.label}</p>
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

      {/* Selected Industry Modal with Contact Form */}
      {selectedIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 text-left animate-scaleUp relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={() => setSelectedIndustry(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-650 font-black text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                {selectedIndustry.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">
                  Industry Configuration Specs
                </span>
                <h3 className="font-black text-slate-800 text-lg sm:text-xl leading-tight">
                  {selectedIndustry.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Specs */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img 
                    src={selectedIndustry.image} 
                    alt={selectedIndustry.title} 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Architecture Details</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    {selectedIndustry.details}
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Submit Specs Inquiry</h4>
                  <p className="text-[10px] text-slate-450 mt-0.5">Let's configure solutions for your business operations.</p>
                </div>

                <form onSubmit={handleIndustrySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={industryName} 
                      onChange={(e) => setIndustryName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={industryEmail} 
                      onChange={(e) => setIndustryEmail(e.target.value)}
                      placeholder="john@example.com" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={industryPhone} 
                      onChange={(e) => setIndustryPhone(e.target.value)}
                      placeholder="+91 98765 43210" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Project Message</label>
                    <textarea 
                      value={industryMessage} 
                      onChange={(e) => setIndustryMessage(e.target.value)}
                      rows="3"
                      placeholder="Tell us about your technical specifications or operational needs..." 
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-xs text-slate-800 transition resize-none"
                      required 
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingIndustry}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-blue-500/10 active:scale-98 disabled:opacity-70"
                  >
                    {submittingIndustry ? 'Sending Inquiry...' : '🚀 Submit Specifications'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}