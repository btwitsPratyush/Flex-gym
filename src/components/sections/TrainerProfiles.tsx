import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Trainer {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  image: string;
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

const trainers: Trainer[] = [
  {
    id: 'alex',
    name: 'Alex Mitchell',
    title: 'HIIT Specialist',
    specialties: ['HIIT', 'Functional Training', 'Weight Loss'],
    image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    social: {
      instagram: '#',
      facebook: '#',
      linkedin: '#'
    }
  },
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    title: 'Yoga Instructor',
    specialties: ['Vinyasa Yoga', 'Meditation', 'Flexibility'],
    image: 'https://images.pexels.com/photos/5120187/pexels-photo-5120187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    social: {
      instagram: '#',
      facebook: '#'
    }
  },
  {
    id: 'mike',
    name: 'Mike Patterson',
    title: 'Cycling Coach',
    specialties: ['Spinning', 'Endurance Training', 'Cardio'],
    image: 'https://images.pexels.com/photos/4498283/pexels-photo-4498283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    social: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 'james',
    name: 'James Kim',
    title: 'Strength Coach',
    specialties: ['Powerlifting', 'Bodybuilding', 'Sports Performance'],
    image: 'https://images.pexels.com/photos/927437/pexels-photo-927437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    social: {
      instagram: '#',
      facebook: '#',
      linkedin: '#'
    }
  }
];

const TrainerCard: React.FC<{ trainer: Trainer; index: number }> = ({ trainer, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  return (
    <motion.div
      ref={cardRef}
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: reduceMotion ? 0.1 : 0.5, 
        delay: reduceMotion ? 0 : index * 0.1 
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ 
        scale: reduceMotion ? 1 : scale,
        rotate: reduceMotion ? 0 : rotate 
      }}
    >
      <div className="bg-neutral-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={trainer.image} 
            alt={trainer.name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Social Media Icons */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-3 justify-end">
            {trainer.social.instagram && (
              <a 
                href={trainer.social.instagram} 
                className="bg-black/40 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                aria-label={`${trainer.name}'s Instagram`}
              >
                <Instagram size={16} />
              </a>
            )}
            {trainer.social.facebook && (
              <a 
                href={trainer.social.facebook} 
                className="bg-black/40 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                aria-label={`${trainer.name}'s Facebook`}
              >
                <Facebook size={16} />
              </a>
            )}
            {trainer.social.linkedin && (
              <a 
                href={trainer.social.linkedin} 
                className="bg-black/40 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                aria-label={`${trainer.name}'s LinkedIn`}
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
          <p className="text-red-500 font-medium mb-3">{trainer.title}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {trainer.specialties.map((specialty, i) => (
              <span 
                key={i} 
                className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <a 
            href="#book-session" 
            className="block w-full text-center py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white rounded-full transition-colors font-medium"
          >
            Book a Session
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const TrainerProfiles: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  
  return (
    <section id="trainers" className="py-20 md:py-28 bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expert Trainers</h2>
          <p className="text-neutral-400 text-lg">
            Meet our team of certified fitness professionals dedicated to helping you achieve your goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trainers.map((trainer, index) => (
            <TrainerCard key={trainer.id} trainer={trainer} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-xl font-semibold mb-4">Interested in joining our team?</p>
          <a 
            href="#careers" 
            className="inline-block bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            View Career Opportunities
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainerProfiles;