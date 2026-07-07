import React, { useEffect, useState } from 'react';
import { getServices } from '../services/serviceAPI';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    async function fetchAllServices() {
      try {
        const data = await getServices();
        setServices(data);
        if (data.length > 0) {
          setSelectedService(data[0]); // Default to first service for detailed view
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllServices();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Services Hero Header */}
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-[#0F172A] to-[#07356b] overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-xs font-bold text-[#82b443] uppercase tracking-widest block mb-2">
            Dynamic Capabilities
          </span>
          <h1 className="text-3xl font-black mb-3">
            Our Enterprise <span className="text-[#82b443]">Services</span>
          </h1>
          <p className="text-slate-300 text-xs max-w-xl mx-auto leading-relaxed">
            We deliver state-of-the-art software systems, web engineering workflows, and system architectures built to scale.
          </p>
        </div>
      </section>

      {/* Grid of Dynamic Services */}
      <section className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Service Catalog</h2>
          <div className="w-12 h-1 bg-[#82b443] mx-auto mb-3" />
          <p className="text-slate-500 text-xs">
            Browse our list of dynamic solutions designed to automate workflows and optimize outputs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-[#0b4a8f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border rounded-2xl">
            <p className="text-sm text-slate-400">No services found. Add some services in the admin dashboard catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div 
                key={service.id || idx} 
                onClick={() => setSelectedService(service)}
                className="cursor-pointer"
              >
                <ServiceCard service={service} index={idx} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detailed view block for selected service */}
      {selectedService && (
        <section className="bg-slate-50 py-12 border-y border-slate-200/50">
          <div className="container max-w-5xl mx-auto px-6">
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-100/50 text-left space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#82b443] uppercase tracking-wider block mb-1">
                    Detailed Architecture Specification
                  </span>
                  <h3 className="text-2xl font-black text-[#0b4a8f]">{selectedService.title}</h3>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-lg text-slate-500 text-xs font-semibold w-fit">
                  Profile ID: {selectedService.id?.slice(0, 8)}...
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{selectedService.description || selectedService.desc}</p>
                  </div>
                  
                  {selectedService.details && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operational Workflows & Specs</h4>
                      <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">{selectedService.details}</p>
                    </div>
                  )}
                </div>

                {selectedService.image && (
                  <div className="md:col-span-4 rounded-xl overflow-hidden shadow-md border border-slate-200">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title} 
                      className="w-full h-full object-cover aspect-[4/3]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
