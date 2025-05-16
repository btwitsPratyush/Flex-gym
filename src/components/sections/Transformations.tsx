import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Transformation {
  id: string;
  name: string;
  age: number;
  duration: string;
  beforeImg: string;
  afterImg: string;
  testimonial: string;
  achievement: string;
}

const transformations: Transformation[] = [
  {
    id: 'rahul',
    name: 'Rahul M.',
    age: 28,
    duration: '6 months',
    beforeImg: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImg: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    testimonial: "FLEX GYM transformed my approach to fitness. The trainers pushed me beyond what I thought was possible, and the results speak for themselves.",
    achievement: "Lost 20 kgs and reduced body fat from 28% to 12%"
  },
  {
    id: 'priya',
    name: 'Priya S.',
    age: 25,
    duration: '4 months',
    beforeImg: 'https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImg: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    testimonial: "After my pregnancy, I struggled to get back in shape. The personalized training and supportive community at FLEX GYM helped me regain my confidence.",
    achievement: "Regained core strength and improved overall fitness"
  },
  {
    id: 'amit',
    name: 'Amit K.',
    age: 32,
    duration: '8 months',
    beforeImg: 'https://images.pexels.com/photos/53404/scale-diet-fat-health-53404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImg: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    testimonial: "Being a busy IT professional, I thought getting in shape was impossible. The trainers at FLEX GYM developed a program specifically for my schedule and helped me achieve what I never thought possible.",
    achievement: "Increased muscle mass by 8 kgs and improved mobility"
  }
];

const TransformationCard: React.FC<{ item: Transformation; index: number }> = ({ item, index }) => {
  const [showAfter, setShowAfter] = useState(false);
  const { reduceMotion } = useAccessibility();
  
  const handleMouseEnter = () => {
    if (!reduceMotion) {
      setShowAfter(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!reduceMotion) {
      setShowAfter(false);
    }
  };
  
  const handleClick = () => {
    setShowAfter(!showAfter);
  };
  
  return (
    <motion.div
      className="bg-neutral-800 rounded-xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: reduceMotion ? 0.1 : 0.5, 
        delay: reduceMotion ? 0 : index * 0.2 
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div 
        className="relative aspect-[4/3] cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img 
          src={item.beforeImg} 
          alt={`${item.name} before transformation`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
        />
        <img 
          src={item.afterImg} 
          alt={`${item.name} after transformation`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold">{item.name}, {item.age}</h3>
              <p className="text-neutral-300">{item.duration} transformation</p>
            </div>
            <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
              {showAfter ? 'AFTER' : 'BEFORE'}
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
            {reduceMotion ? 'Tap' : 'Hover'} to see {showAfter ? 'before' : 'after'}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        
        <p className="text-neutral-300 mb-4">"{item.testimonial}"</p>
        
        <div className="bg-neutral-700/50 p-3 rounded-lg mb-4">
          <p className="text-sm font-semibold text-red-500">Achievement:</p>
          <p className="text-neutral-200">{item.achievement}</p>
        </div>
        
        <a 
          href="#start-journey" 
          className="block w-full text-center py-3 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-full font-semibold"
        >
          Start Your Journey
        </a>
      </div>
    </motion.div>
  );
};

const Transformations: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  
  return (
    <section id="transformations" className="py-20 md:py-28 bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Transformations</h2>
          <p className="text-neutral-400 text-lg">
            See the incredible results our members have achieved with dedication and our expert guidance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((item, index) => (
            <TransformationCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-neutral-800 rounded-xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="md:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Body?</h3>
              <p className="text-neutral-300 mb-6">
                Join our community today and start your transformation journey. 
                Our expert trainers will create a personalized plan to help you achieve your fitness goals.
              </p>
              <a 
                href="#join-now" 
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-4 rounded-full font-bold text-lg group"
              >
                START TODAY
                <ArrowRight size={20} className={`${reduceMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
              </a>
            </div>
            
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500">100%</div>
                <p className="text-neutral-400">Satisfaction</p>
              </div>
              <div className="h-12 w-px bg-neutral-700"></div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500">30-Day</div>
                <p className="text-neutral-400">Money Back</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Transformations;