import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';
import { getServices, getSiteSettings, getClientLogos, seedBrandLogos, getTestimonials, seedTestimonials } from '../services/serviceAPI';
import { Link } from 'react-router-dom';

import { FaBriefcase, FaThumbsUp, FaUsers, FaBuilding, FaUserGraduate, FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Home() {
  const [services, setServices] = useState([]);
  const [logos, setLogos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [aboutDesc, setAboutDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
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

  return (
    <div className="pb-16 bg-white space-y-12">
      {/* Hero Header */}
      <Hero />

      {/* Statistics Section */}
      <section className="bg-[#0b132a] py-10 relative overflow-hidden border-y border-slate-900">
        <div className="absolute inset-0 opacity-5 bg-grid-pattern" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center items-center justify-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-[#82b443] mb-0.5">
                <FaBriefcase className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">25+</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Years of Expertise</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-[#82b443] mb-0.5">
                <FaThumbsUp className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">300+</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Corporate Clientele</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-[#82b443] mb-0.5">
                <FaUsers className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">5,000+</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Onboardings</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="text-3xl text-[#82b443] mb-0.5">
                <FaBuilding className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">2,500+</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SMEs</p>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center space-y-1.5 col-span-2 md:col-span-1">
              <div className="text-3xl text-[#82b443] mb-0.5">
                <FaUserGraduate className="inline" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-none">4.5 L</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Professionals Trained</p>
            </div>

          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0b4a8f] uppercase tracking-widest block mb-2">
            What We Do
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Managed IT Service Portfolios
          </h2>
          <div className="w-12 h-1 bg-[#82b443] mx-auto mb-4" />
          <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
            We provide bespoke development and engineering workflows designed around your business needs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-[#0b4a8f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <ServiceCard key={svc.id || i} service={svc} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline">
            View All Services
          </Link>
        </div>
      </section>

      {/* Brands We Work With Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#0b4a8f] uppercase tracking-widest block mb-2">
              Partnership Network
            </span>
            <h2 className="text-2xl font-black text-[#82b443] tracking-tight">
              Brands We Work With
            </h2>
            <div className="w-12 h-1 bg-[#0b4a8f] mx-auto mt-3" />
          </div>

          {logos.length === 0 ? (
            <p className="text-center text-xs text-slate-400">No brand logos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
              {logos.map((logo, idx) => (
                <div 
                  key={logo.id || idx} 
                  className="flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#82b443]/30 transition group h-20"
                >
                  <img
                    src={logo.url}
                    alt={logo.name || 'Brand Logo'}
                    className="max-h-10 max-w-[80%] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0b4a8f] uppercase tracking-widest block mb-2">
            Client Reviews
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Testimonials
          </h2>
          <div className="w-12 h-1 bg-[#82b443] mx-auto mb-4" />
          <p className="text-slate-500 text-xs leading-relaxed">
            What our corporate clients say about their custom engineering and workforce automation solutions.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-xs text-slate-400">No testimonials published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={t.id || idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/40 text-left flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:border-[#82b443]/20 border-t-4 border-t-[#0b4a8f] transition duration-300"
              >
                <div className="space-y-3">
                  <div className="text-[#82b443] text-xl">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-slate-650 text-xs leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 gap-2">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs leading-tight">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-amber-500 text-xs">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Talent Shortage Banner Section */}
      <section className="bg-[#0b132a] py-16 relative overflow-hidden border-y border-slate-900">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
        <div className="container max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Percentage Indicator */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
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
          </div>

          {/* Right Column: Description & Buttons */}
          <div className="md:col-span-6 text-left space-y-6">
            <p className="text-slate-350 text-xs leading-relaxed">
              With deep expertise in the Indian market, our specialized IT workforce deployment, staff augmentation, and Hire-Train-Deploy systems bridge talent gaps at scale, linking millions of individuals with meaningful careers and supporting hundreds of organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/careers" 
                className="py-3 px-6 bg-[#82b443] hover:bg-[#689433] text-white text-[11px] font-bold uppercase rounded-full shadow-lg shadow-green-500/10 transition duration-200 text-center tracking-wider"
              >
                Hire Skilled Talent &rarr;
              </Link>
              <Link 
                to="/careers" 
                className="py-3 px-6 bg-[#0b4a8f] hover:bg-[#083566] text-white text-[11px] font-bold uppercase rounded-full shadow-lg shadow-blue-500/10 transition duration-200 text-center tracking-wider"
              >
                Find Work &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* About Teaser Section */}
      <section className="container max-w-7xl mx-auto px-6 py-4">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-5 text-left space-y-4">
            <span className="text-xs font-bold text-[#0b4a8f] uppercase tracking-widest block">
              About Our Operations
            </span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              Transforming Ideas Into <br />
              Digital Assets
            </h2>
            <div className="w-12 h-1 bg-[#82b443] mb-4" />
            <p className="text-slate-550 text-xs leading-relaxed">
              {aboutDesc || "iCoded Automation Pvt. Ltd. is a dedicated IT solution agency specializing in software integration, website designs, workflow automation, and custom product architectures."}
            </p>
            <div className="pt-2">
              <Link to="/about" className="btn-primary">
                Read Our Story
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[16/9] border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop" 
                alt="iCoded enterprise dashboard development and collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic contact submission block */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0b4a8f] uppercase tracking-widest block mb-2">
              Connect With Us
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Start The Conversation
            </h2>
            <div className="w-12 h-1 bg-[#82b443] mx-auto mb-4" />
            <p className="text-slate-500 text-xs">
              Start the journey to scaling your automation. Fill in details and get in touch with our system engineers.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}