import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-700 font-sans">
      <Navbar />
      
      {/* Main page content area */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
