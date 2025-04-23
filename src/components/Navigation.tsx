import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Menu, X } from 'lucide-react';
import { NavigationItem } from '../types';

const navigationItems: NavigationItem[] = [
  { id: 'home', title: 'Home', href: '/' },
  { id: 'portfolio', title: 'Portfolio', href: '/portfolio' },
  { id: 'about', title: 'About', href: '/about' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-blue-950/80 border-b border-blue-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Code size={28} className="text-blue-300" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              P5.Motion
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-blue-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.title}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-0.5 bg-blue-400 bottom-0"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-blue-300 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <motion.div
        className="fixed inset-y-0 right-0 w-64 bg-blue-950 shadow-lg md:hidden z-50"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4 mt-16">
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-300 hover:bg-blue-900 hover:text-white'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Navigation;