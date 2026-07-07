import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';

export default function ServiceCard({ service, index }) {
  // Select matching Lucide/FontAwesome icon
  const IconComp = FaIcons[service.icon] || FaIcons.FaLaptopCode;
  
  // Default fallback images for services if none specified
  const defaultImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80', // Web Development
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', // POS Software
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', // Manufacturing
    'https://images.unsplash.com/photo-1504813702643-15c724c9cb2a?w=400&q=80', // Hospital Management
  ];
  
  const coverImage = service.image || defaultImages[index % defaultImages.length];

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#82b443]/30 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 flex flex-col h-full text-left">
      {/* Top Card Image */}
      <div className="h-48 overflow-hidden relative bg-slate-100 flex-shrink-0">
        <img
          src={coverImage}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Floating icon badge in matching brand color */}
        <div className="absolute bottom-4 left-4 w-9 h-9 rounded-lg bg-gradient-to-br from-[#0b4a8f] to-[#1e6ebf] flex items-center justify-center shadow-lg z-10">
          <IconComp className="text-white text-sm" />
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0b4a8f] transition-colors duration-200">
            {service.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {service.description || service.desc}
          </p>
        </div>

        {/* Dynamic Detail link */}
        <div className="pt-4 mt-auto">
          <Link
            to={`/services`}
            className="inline-flex items-center gap-1.5 text-[#0b4a8f] group-hover:text-[#82b443] text-xs font-bold transition-all duration-200"
          >
            Learn More <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
