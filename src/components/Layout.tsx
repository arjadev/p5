import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import ParticleBackground from './sketches/ParticleBackground';
import { Github, Linkedin, Mail } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-950 to-indigo-950 text-white">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <Navigation />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 min-h-[calc(100vh-64px-80px)]"
        >
          <Outlet />
        </motion.main>
        
        <footer className="relative z-10 border-t border-blue-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-blue-300">&copy; 2025 P5.js Arjay</p>
              </div>
              <div className="flex space-x-4">
                <a href="https://github.com" className="text-blue-300 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" className="text-blue-300 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:contact@example.com" className="text-blue-300 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;