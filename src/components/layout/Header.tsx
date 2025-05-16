import React, { useState, useEffect } from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { reduceMotion, toggleReduceMotion } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
          <Dumbbell size={32} className="animate-pulse" />
          <span className="text-2xl font-bold">FLEX GYM</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#membership" className="hover:text-red-500 transition-colors font-medium">Membership</a>
          <a href="#classes" className="hover:text-red-500 transition-colors font-medium">Classes</a>
          <a href="#trainers" className="hover:text-red-500 transition-colors font-medium">Trainers</a>
          <a href="#equipment" className="hover:text-red-500 transition-colors font-medium">Equipment</a>
          <a href="#transformations" className="hover:text-red-500 transition-colors font-medium">Transformations</a>
          
          <button 
            onClick={toggleReduceMotion}
            className={`px-3 py-1 rounded-full text-sm ${
              reduceMotion ? 'bg-green-500 text-white' : 'bg-neutral-700 text-white'
            }`}
          >
            {reduceMotion ? 'Reduced Motion' : 'Full Motion'}
          </button>
          
          <a 
            href="#join-now" 
            className="ml-4 bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-2 rounded-full font-bold"
          >
            JOIN NOW
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <a 
            href="#membership" 
            className="py-2 hover:text-red-500 transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Membership
          </a>
          <a 
            href="#classes" 
            className="py-2 hover:text-red-500 transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Classes
          </a>
          <a 
            href="#trainers" 
            className="py-2 hover:text-red-500 transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Trainers
          </a>
          <a 
            href="#equipment" 
            className="py-2 hover:text-red-500 transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Equipment
          </a>
          <a 
            href="#transformations" 
            className="py-2 hover:text-red-500 transition-colors font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Transformations
          </a>
          
          <button 
            onClick={toggleReduceMotion}
            className={`py-2 px-4 rounded-full text-sm w-max ${
              reduceMotion ? 'bg-green-500 text-white' : 'bg-neutral-700 text-white'
            }`}
          >
            {reduceMotion ? 'Reduced Motion' : 'Full Motion'}
          </button>
          
          <a 
            href="#join-now" 
            className="mt-2 bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-3 rounded-full font-bold text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            JOIN NOW
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;