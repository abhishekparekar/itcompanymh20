import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getServices, seedDatabase } from '../services/serviceAPI';
import ServiceCard from '../components/ServiceCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    async function fetchAllServices() {
      try {
        await seedDatabase();
        const data = await getServices();
        setServices(data);
        
        // Auto select by query param id
        const serviceId = searchParams.get('id');
        const matching = data.find(s => s.id === serviceId);
        if (matching) {
          setSelectedService(matching);
        } else if (data.length > 0) {
          setSelectedService(data[0]); // Default fallback
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllServices();
  }, []);

  // Sync state if URL query param changes dynamically
  useEffect(() => {
    const serviceId = searchParams.get('id');
    if (serviceId && services.length > 0) {
      const matching = services.find(s => s.id === serviceId);
      if (matching) {
        setSelectedService(matching);
      }
    }
  }, [searchParams, services]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Services Hero Header */}
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-dark to-primary overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-accent uppercase tracking-widest block mb-2"
          >
            Dynamic Capabilities
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black mb-3"
          >
            Our Enterprise <span className="text-accent">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-slate-350 text-xs max-w-xl mx-auto leading-relaxed"
          >
            We deliver state-of-the-art software systems, web engineering workflows, and system architectures built to scale.
          </motion.p>
        </div>
      </section>

      {/* Grid of Dynamic Services */}
      <section className="container max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Service Catalog</h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-3" />
          <p className="text-slate-500 text-xs">
            Browse our list of dynamic solutions designed to automate workflows and optimize outputs.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                onClick={() => {
                  setSelectedService(service);
                  setSearchParams({ id: service.id });
                }}
                className="cursor-pointer"
              >
                <ServiceCard service={service} index={idx} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detailed view block for selected service */}
      <AnimatePresence mode="wait">
        {selectedService && (
          <motion.section 
            key={selectedService.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-50 py-12 border-y border-slate-200/50"
          >
            <div className="container max-w-5xl mx-auto px-6">
              <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50 text-left space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
                      Detailed Architecture Specification
                    </span>
                    <h3 className="text-2xl font-black text-primary">{selectedService.title}</h3>
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
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
}
