import React, { useEffect, useState } from 'react';
import { getSiteSettings } from '../services/serviceAPI';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { FaFolderOpen, FaUserCheck, FaMapMarkerAlt } from 'react-icons/fa';
import devImg from '../assets/images/about_hero_dev.png';

export default function About() {
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAboutSettings() {
      try {
        const fetched = await getSiteSettings('about');
        if (fetched) {
          setDescription(fetched.description || '');
          setMission(fetched.mission || '');
          setVision(fetched.vision || '');
          if (fetched.stats) {
            setStats(fetched.stats);
          }
        }
      } catch (err) {
        console.error('Error fetching about setting page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAboutSettings();
  }, []);

  // Frame Float variant
  const cardFloatVariants = (delay = 0) => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5.2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay
      }
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15 }
    }
  };

  return (
    <div className="space-y-16 pb-16 bg-transparent">
      
      {/* Screenshot 1: About Hero Section */}
      <section className="relative min-h-[85vh] bg-transparent grid-pattern flex items-center pt-28 pb-16 overflow-hidden">
        
        {/* Background Glowing Blur Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-light/5 rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/5 rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading copy */}
            <motion.div 
              className="lg:col-span-6 space-y-8 text-left z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Profile Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[11px] font-extrabold text-accent uppercase tracking-widest">
                  About Our Operations
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
              >
                Transforming Ideas <br />
                Into <span className="gradient-text-red font-black">Digital Reality</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                variants={itemVariants}
                className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg"
              >
                Based in Chhatrapati Sambhajinagar, UF Global Solutions is a premium technology partner delivering complete digital solutions. We specialize in App Development, Web Development, Custom Software, Digital Marketing, Social Media Handling, and Corporate Branding to elevate your business.
              </motion.p>

              {/* Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <a 
                  href="#who-we-are" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Discover More</span>
                </a>
                
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-350 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Get Consultation</span>
                </Link>
              </motion.div>

            </motion.div>

            {/* Right Column: Visual Developer sitting with Laptop & overlay cards */}
            <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0 z-10 select-none">
              
              {/* Background ripple lines & hex graphics */}
              <div className="absolute w-[440px] h-[440px] border border-slate-100 rounded-full z-0 pointer-events-none" />
              <div className="absolute w-[340px] h-[340px] border border-slate-100 rounded-full z-0 pointer-events-none" />
              
              {/* Light blue hexagonal mesh shape behind */}
              <div className="absolute w-72 h-80 bg-primary/5 rounded-[40px] rotate-12 z-0 pointer-events-none" />

              {/* Dev Sitting Laptop portrait */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-80 sm:w-96 max-w-full aspect-square flex items-center justify-center"
              >
                <img 
                  src={devImg} 
                  alt="UFGS Technical Partner" 
                  className="w-full h-full object-contain pointer-events-none drop-shadow-2xl z-10"
                />
              </motion.div>

              {/* Floating Card 1: Projects (Top-Left) */}
              <motion.div 
                variants={cardFloatVariants(0)}
                animate="animate"
                className="absolute top-10 left-0 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-center gap-3 w-[190px]"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0 text-sky-500">
                  <FaFolderOpen className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 leading-none">{stats[0]?.value || "185+"}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 truncate">{stats[0]?.label || "Projects Delivered"}</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Clients (Right-Middle) */}
              <motion.div 
                variants={cardFloatVariants(1.4)}
                animate="animate"
                className="absolute top-40 right-0 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-center gap-3 w-[170px]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500">
                  <FaUserCheck className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 leading-none">{stats[1]?.value || "103+"}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 truncate">{stats[1]?.label || "Happy Clients"}</p>
                </div>
              </motion.div>

              {/* Floating Card 3: Cities (Bottom-Left) */}
              <motion.div 
                variants={cardFloatVariants(0.7)}
                animate="animate"
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-150 shadow-xl shadow-slate-200/40 z-20 text-left flex items-center gap-3 w-[150px]"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0 text-pink-550">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 leading-none">{stats[2]?.value || "7+"}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 truncate">{stats[2]?.label || "Global Cities"}</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Main Core Description Content */}
      <section id="who-we-are" className="container max-w-5xl mx-auto px-6 pt-10">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12 text-left">
            
            {/* Description Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50"
            >
              <h2 className="text-xl font-black text-primary mb-2">Who We Are</h2>
              <div className="w-12 h-1 bg-accent mb-4" />
              <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">
                {description || "UF Global Solutions Pvt Ltd builds robust business automation pipelines, custom web products, mobile applications, and enterprise system architectures that empower digital scaling."}
              </p>
            </motion.div>

            {/* Mission & Vision Row */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Mission */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg text-left"
              >
                <h3 className="text-lg font-bold text-primary mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Our Mission
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {mission || "To streamline complex workflows through cutting-edge IT infrastructure development and customer-centric software tools."}
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg text-left"
              >
                <h3 className="text-lg font-bold text-primary mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Our Vision
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {vision || "To be the leading system design and business automation partner for enterprises seeking secure, zero-friction scaling frameworks."}
                </p>
              </motion.div>

            </div>

            {/* Stats Row */}
            {stats && stats.length > 0 && (
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl font-black text-primary">
                      {item.value || "0"}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {item.label || "Metric"}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </section>

    </div>
  );
}
