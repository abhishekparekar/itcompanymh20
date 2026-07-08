import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ServiceCard({ service, index }) {
  // Get matching FontAwesome icon
  const IconComp = FaIcons[service.icon] || FaIcons.FaLaptopCode;
  
  // Tag selector based on service title
  const getServiceTag = (title = '') => {
    const t = title.toLowerCase();
    if (t.includes('web') || t.includes('website')) return 'WEB SYSTEMS';
    if (t.includes('ai') || t.includes('ml') || t.includes('machine') || t.includes('intelligence')) return 'AI / ML SYSTEMS';
    if (t.includes('cloud')) return 'CLOUD AI & ARCHITECTURE';
    if (t.includes('app') || t.includes('android') || t.includes('ios') || t.includes('mobile')) return 'MOBILE APPS';
    if (t.includes('software') || t.includes('erp') || t.includes('crm')) return 'SOFTWARE ENGINEERING';
    if (t.includes('marketing') || t.includes('seo') || t.includes('branding')) return 'DIGITAL GROWTH';
    return 'ENTERPRISE SERVICES';
  };

  // Mockup/Unsplash images corresponding to the layout in Screenshot 4
  const defaultImages = [
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=450&q=80', // software mockup
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=450&q=80', // web dev mockup
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=450&q=80', // mobile app mockup
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=450&q=80', // crm dashboard mockup
  ];

  const coverImage = service.image || defaultImages[index % defaultImages.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl shadow-slate-100/50 hover:border-primary/20 transition-all duration-300 flex flex-col h-full text-left"
    >
      
      {/* Top portion mockup illustration */}
      <div className="h-44 overflow-hidden relative bg-slate-50 flex-shrink-0 border-b border-slate-100">
        <img
          src={coverImage}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Rounded float badge (white circle with icon) */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md z-10 border border-slate-100">
          <IconComp className="text-primary text-xs" />
        </div>
      </div>

      {/* Card Info body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          
          {/* Accent color category badge */}
          <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
            {getServiceTag(service.title)}
          </span>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {service.description || service.desc}
          </p>
        </div>

        {/* Bottom link: LEARN MORE → */}
        <div className="pt-2 border-t border-slate-100/50">
          <Link
            to={`/services?id=${service.id}`}
            className="inline-flex items-center gap-1.5 text-primary group-hover:text-accent text-[10px] font-black uppercase tracking-wider transition-all duration-200"
          >
            <span>LEARN MORE</span>
            <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </motion.div>
  );
}
