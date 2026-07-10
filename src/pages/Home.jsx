import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';
import { getServices, getSiteSettings, getClientLogos, getTestimonials, getTeamMembers } from '../services/serviceAPI';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { COMPANY } from '../constants';

import { FaBriefcase, FaThumbsUp, FaUsers, FaBuilding, FaUserGraduate, FaQuoteLeft, FaStar, FaCreditCard, FaMicrochip, FaShoppingBag, FaHospital, FaRocket, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
  const [services, setServices] = useState([]);
  const [logos, setLogos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);
  const [aboutDesc, setAboutDesc] = useState('');
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const industryScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);
  const teamScrollRef = useRef(null);

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

        // Fetch client logos dynamically
        const brandLogos = await getClientLogos();
        setLogos(brandLogos);

        // Fetch testimonials dynamically
        const testList = await getTestimonials();
        setTestimonials(testList);

        // Fetch team members dynamically
        const teamData = await getTeamMembers();
        setTeam(teamData);
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

  // Auto-scroll effect for Team members
  useEffect(() => {
    if (loading || team.length === 0) return;
    const interval = setInterval(() => {
      if (teamScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          teamScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          teamScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [loading, team]);

  const scrollTeamLeft = () => {
    if (teamScrollRef.current) {
      teamScrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollTeamRight = () => {
    if (teamScrollRef.current) {
      teamScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

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

      {/* Statistics Section — Infinite Ticker (only shown when admin has configured stats) */}
      {stats && stats.length > 0 && stats.every(s => s.value && s.label) && (
      <section className="bg-dark py-5 sm:py-8 relative overflow-hidden border-y border-slate-800">
        <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#040916] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#040916] to-transparent z-10 pointer-events-none" />

        {/* Ticker track */}
        <div className="overflow-hidden relative z-0">
          <div className="flex w-max animate-ticker hover:[animation-play-state:paused] gap-0">
            {[...stats, ...stats, ...stats].map((item, idx) => {
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
      )}

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
            <p className="text-slate-950 font-semibold text-xs leading-relaxed max-w-md">
              We provide bespoke development and engineering workflows designed around your business needs.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
            <p className="text-slate-400 text-sm font-semibold">No services added yet. Add services from the admin dashboard.</p>
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
            <p className="text-slate-950 font-semibold text-xs leading-relaxed max-w-md">
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
                <h3 className="font-black text-slate-950 text-base">{item.title}</h3>
                <p className="text-xs text-slate-950 font-semibold leading-relaxed min-h-[48px]">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-950 uppercase tracking-widest">Explore Configuration</span>
                <span className="text-xs text-slate-950 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
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

              <div className="flex w-max animate-ticker-reverse hover:[animation-play-state:paused] gap-4 md:gap-6 py-6">
                {logos.concat(logos).concat(logos).concat(logos).concat(logos).map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 flex items-center justify-center bg-white border border-slate-200/50 rounded-full shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 select-none"
                  >
                    <img
                      src={logo.url}
                      alt={logo.name || 'Brand Logo'}
                      className="max-h-12 sm:max-h-16 md:max-h-20 max-w-[70%] object-contain transition-transform duration-300 hover:scale-105"
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
                    <p className="text-slate-950 font-semibold text-xs sm:text-sm leading-relaxed italic">
                      "{t.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3.5 border-t border-slate-100 pt-4 mt-auto">
                    {/* Avatar circle with name initials */}
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-[11px] flex items-center justify-center flex-shrink-0 uppercase">
                      {t.name?.slice(0, 2) || "CL"}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-950 text-xs sm:text-sm leading-tight">{t.name}</h4>
                      <p className="text-[9px] text-slate-700 font-extrabold uppercase tracking-wider mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}
      </section>

      {/* Our Expert Team Section */}
      <section className="container max-w-7xl mx-auto px-6 py-16 border-t border-slate-100/50">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          {/* Header Badge flanked by dots and oval shapes */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-1 h-1 rounded-full bg-blue-600 opacity-60" />
            <span className="w-2 h-1 rounded-full bg-blue-400 opacity-60" />
            <span className="px-5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest border border-blue-100/80 shadow-sm">
              OUR EXPERTS
            </span>
            <span className="w-2 h-1 rounded-full bg-blue-400 opacity-60" />
            <span className="w-1 h-1 rounded-full bg-blue-600 opacity-60" />
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
            Meet Our <span className="text-blue-600">Professional</span> Team
          </h2>
          {/* Underline Bar */}
          <div className="w-10 h-[3px] bg-red-500 mx-auto rounded-full" />

          <p className="text-slate-500 text-xs sm:text-sm mt-4 leading-relaxed">
            Our talented team of experts is dedicated to delivering innovative solutions and exceptional results for our clients.
          </p>
        </motion.div>

        {team.length === 0 ? (
          <p className="text-center text-xs text-slate-400">No team members added yet.</p>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            {/* Scroll Navigation Chevrons */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:block">
              <button 
                onClick={scrollTeamLeft}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 hover:text-blue-600 transition shadow-lg cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:block">
              <button 
                onClick={scrollTeamRight}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 hover:text-blue-600 transition shadow-lg cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>

            <div 
              ref={teamScrollRef}
              className="flex overflow-x-auto gap-6 pb-6 select-none scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {team.map((m, idx) => (
                <div key={m.id || idx} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-slate-200/80 rounded-[32px] p-8 text-center transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col justify-between"
                  >
                    {/* Soft gradient wave behind photo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-white pointer-events-none" />

                    {/* Photo with dynamic rotating accent ring and dot layout */}
                    <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center z-10">
                      {/* Decorative dashed/accent rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/80 animate-[spin_60s_linear_infinite]" />
                      <div className="absolute inset-1.5 rounded-full border border-blue-500/30" />
                      
                      {/* Decorative accent dots */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-600" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-red-600" />
                      
                      {/* Avatar Frame */}
                      <div className="w-[116px] h-[116px] rounded-full overflow-hidden border-4 border-white bg-slate-50 shadow-md">
                        <img 
                          src={m.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"} 
                          alt={m.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>

                    {/* Name & Dynamic Alternating Designation */}
                    <div className="relative z-10 space-y-1 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-black text-slate-950 text-base md:text-lg mb-0.5 leading-tight tracking-tight">
                          {m.name}
                        </h3>
                        <span className={`text-[10px] font-black uppercase tracking-wider block mb-4 ${idx % 2 === 0 ? 'text-red-600' : 'text-blue-600'}`}>
                          {m.designation}
                        </span>
                      </div>
                      
                      {/* Short Bio Description */}
                      <p className="text-slate-950 text-xs leading-relaxed max-w-[240px] mx-auto font-semibold">
                        {m.description || "Dedicated professional specializing in engineering scalable digital solutions."}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
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
      <section className="container max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/80 border border-slate-200/50 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-slate-100/30 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Text Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 text-left space-y-4 sm:space-y-5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                ABOUT US
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Transforming Ideas Into <br className="hidden sm:inline" />
                <span className="gradient-text-red font-black">Digital Assets</span>
              </h2>
              
              <p className="text-slate-950 font-semibold text-xs sm:text-sm leading-relaxed max-w-xl">
                {aboutDesc || "UF Global Solutions Pvt Ltd is a dedicated IT solution agency specializing in software integration, website designs, workflow automation, and custom product architectures."}
              </p>
              
              <div className="pt-2">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Read Our Story &rarr;
                </Link>
              </div>
            </motion.div>

            {/* Right Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[16/10] border border-slate-100 group relative">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" 
                  alt="UFGS enterprise dashboard development and collaboration" 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
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
                  { icon: '📧', label: 'Email Us', value: COMPANY.email },
                  { icon: '📞', label: 'Call Us', value: COMPANY.phone },
                  { icon: '📍', label: 'Office', value: COMPANY.address },
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
                  <h4 className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">Architecture Details</h4>
                  <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-semibold">
                    {selectedIndustry.details}
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Submit Specs Inquiry</h4>
                  <p className="text-[10px] text-slate-600 mt-0.5 font-semibold">Let's configure solutions for your business operations.</p>
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