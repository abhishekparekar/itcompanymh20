import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaChevronUp } from 'react-icons/fa';

export default function MainLayout({ children }) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-700 font-sans">
      <Navbar />
      
      {/* Main page content area */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      {/* Floating Back to Top Button matching Mazenet theme */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[#82b443] hover:bg-[#689433] text-white flex items-center justify-center rounded-lg shadow-lg hover:-translate-y-1 transition duration-200"
          aria-label="Back to Top"
        >
          <FaChevronUp className="text-sm" />
        </button>
      )}
    </div>
  );
}
