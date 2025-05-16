import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroCanvas from '../three/HeroCanvas';
import { useAccessibility } from '../../context/AccessibilityContext';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();

  return (
    <section className="relative h-screen flex items-center">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas reduceMotion={reduceMotion} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
      
      <div 
        ref={containerRef} 
        className="container mx-auto px-4 md:px-6 relative z-20"
      >
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: reduceMotion ? 0.1 : 0.8,
              delay: 0.2 
            }}
          >
            <span className="block">Transform Your Body.</span>
            <span className="block">Elevate Your Life.</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-neutral-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: reduceMotion ? 0.1 : 0.8,
              delay: 0.4 
            }}
          >
            State-of-the-art equipment, expert trainers, and a supportive community 
            to help you achieve your fitness goals faster than ever before.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: reduceMotion ? 0.1 : 0.8,
              delay: 0.6 
            }}
          >
            <a 
              href="#join-now" 
              className="bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 group"
            >
              START TODAY
              <ArrowRight size={20} className={`${reduceMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
            </a>
            <a 
              href="#membership" 
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white transition-colors px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center"
            >
              VIEW PLANS
            </a>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: reduceMotion ? 0.1 : 1,
              delay: 0.8 
            }}
          >
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-neutral-400">Fitness Classes</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-neutral-400">Expert Trainers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10k+</p>
              <p className="text-neutral-400">Happy Members</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;