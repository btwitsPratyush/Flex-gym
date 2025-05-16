import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface PlanProps {
  title: string;
  price: number;
  period: string;
  features: string[];
  highlight?: boolean;
  delay: number;
}

const MembershipPlan: React.FC<PlanProps> = ({ title, price, period, features, highlight = false, delay }) => {
  const { reduceMotion } = useAccessibility();
  
  return (
    <motion.div 
      className={`relative rounded-2xl overflow-hidden shadow-xl ${
        highlight 
          ? 'bg-gradient-to-br from-red-600 to-red-900 border-2 border-red-400' 
          : 'bg-neutral-800 hover:bg-neutral-700'
      } transition-colors duration-300`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: reduceMotion ? 0.1 : 0.5, 
        delay: reduceMotion ? 0 : delay 
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {highlight && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-6 md:p-8">
        <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-white' : 'text-neutral-200'}`}>
          {title}
        </h3>
        
        <div className="mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className={`${highlight ? 'text-neutral-200' : 'text-neutral-400'}`}>/{period}</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check size={18} className={`mt-1 ${highlight ? 'text-white' : 'text-red-500'}`} />
              <span className={highlight ? 'text-neutral-100' : 'text-neutral-300'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        
        <a 
          href="#join-now" 
          className={`block w-full text-center py-3 rounded-full font-semibold transition-colors duration-300 ${
            highlight 
              ? 'bg-white text-red-600 hover:bg-neutral-200' 
              : 'bg-red-600 text-white hover:bg-red-700'
          } flex items-center justify-center gap-2`}
        >
          Choose Plan 
          <ArrowRight size={16} className={`${reduceMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
        </a>
      </div>
    </motion.div>
  );
};

const MembershipSection: React.FC = () => {
  const { reduceMotion } = useAccessibility();
  
  return (
    <section id="membership" className="py-20 md:py-28 bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Plans</h2>
          <p className="text-neutral-400 text-lg">
            Choose the perfect plan that fits your fitness journey and budget. All memberships include access to our state-of-the-art facilities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <MembershipPlan 
            title="Basic"
            price={29.99}
            period="month"
            features={[
              "Full gym access",
              "Locker room access",
              "2 group classes per week",
              "Fitness assessment",
              "Standard equipment usage"
            ]}
            delay={0.1}
          />
          
          <MembershipPlan 
            title="Premium"
            price={49.99}
            period="month"
            features={[
              "Full gym access 24/7",
              "Unlimited group classes",
              "1 personal training session/month",
              "Nutrition consultation",
              "Advanced equipment usage",
              "Exclusive member events"
            ]}
            highlight={true}
            delay={0.2}
          />
          
          <MembershipPlan 
            title="Elite"
            price={79.99}
            period="month"
            features={[
              "VIP 24/7 access",
              "Unlimited premium classes",
              "4 personal training sessions/month",
              "Monthly nutrition planning",
              "Recovery room access",
              "Guest passes (2/month)",
              "Free protein shakes"
            ]}
            delay={0.3}
          />
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5, delay: reduceMotion ? 0 : 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-neutral-400 mb-4">
            Not sure which plan is right for you? Try our 7-day free trial with no commitment.
          </p>
          <a 
            href="#join-now" 
            className="inline-block bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Start Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;