import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';
import EquipmentCanvas from '../three/EquipmentCanvas';

interface Equipment {
  id: string;
  name: string;
  description: string;
  model: string;
  image: string;
  features: string[];
}

const equipmentList: Equipment[] = [
  {
    id: 'treadmill',
    name: 'Performance Treadmill X9',
    description: 'State-of-the-art treadmill with advanced speed and incline controls, 15" touchscreen, and heart rate monitoring.',
    model: 'treadmill',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['0-15 mph speed range', '0-15% incline', 'Built-in workout programs', 'Heart rate monitoring', 'Bluetooth connectivity']
  },
  {
    id: 'smith-machine',
    name: 'Smith Machine Pro',
    description: 'All-in-one strength training station featuring a Smith machine, cable pulleys, and multiple attachments.',
    model: 'smith',
    image: 'https://images.pexels.com/photos/4164759/pexels-photo-4164759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['Olympic bar compatibility', 'Safety catches', 'Multiple cable stations', 'Adjustable bench', 'Weight storage']
  },
  {
    id: 'bike',
    name: 'Air Assault Bike',
    description: 'High-intensity cardio machine that engages both upper and lower body for a full-body workout.',
    model: 'bike',
    image: 'https://images.pexels.com/photos/4162583/pexels-photo-4162583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: ['Air resistance system', 'Digital console', 'Adjustable seat', 'Built-in HIIT programs', 'Transport wheels']
  }
];

const EquipmentShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section id="equipment" ref={ref} className="py-20 md:py-28 bg-neutral-950 relative overflow-hidden">
      {/* Background decorative elements */}
      {!reduceMotion && (
        <>
          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 bg-red-600/20 rounded-full blur-3xl -z-10"
            style={{ y: translateY }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"
            style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          />
        </>
      )}
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Equipment</h2>
          <p className="text-neutral-400 text-lg">
            Train with the best equipment in the industry, designed for performance and durability.
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {equipmentList.map((equipment, index) => (
            <div 
              key={equipment.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              <motion.div 
                className="w-full lg:w-1/2 aspect-video bg-neutral-900 rounded-xl overflow-hidden shadow-xl relative group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <EquipmentCanvas modelType={equipment.model} reduceMotion={reduceMotion} />
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.7, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold mb-3">{equipment.name}</h3>
                <p className="text-neutral-400 mb-6">{equipment.description}</p>
                
                <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-6">
                  {equipment.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.a 
                  href="#free-trial" 
                  className="inline-block bg-red-600 hover:bg-red-700 transition-all text-white px-8 py-4 rounded-full font-bold relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Try It Free</span>
                  <motion.div
                    className="absolute inset-0 bg-red-500"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentShowcase;