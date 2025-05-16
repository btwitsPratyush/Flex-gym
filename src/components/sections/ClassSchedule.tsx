import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Calendar, Clock, Users } from 'lucide-react';

interface ClassType {
  id: string;
  name: string;
  description: string;
  intensity: 1 | 2 | 3;
  imageUrl: string;
}

interface ClassSession {
  id: string;
  classTypeId: string;
  day: string;
  time: string;
  duration: number;
  trainer: string;
  maxAttendees: number;
}

const classTypes: ClassType[] = [
  {
    id: 'hiit',
    name: 'HIIT',
    description: 'High-Intensity Interval Training to maximize calorie burn and improve cardiovascular fitness.',
    intensity: 3,
    imageUrl: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Improve flexibility, balance, and mental clarity through sequenced poses and breathing techniques.',
    intensity: 1,
    imageUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'spinning',
    name: 'Spinning',
    description: 'High-energy indoor cycling workout that builds strength and endurance.',
    intensity: 2,
    imageUrl: 'https://images.pexels.com/photos/4162502/pexels-photo-4162502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'strength',
    name: 'Strength',
    description: 'Build muscle mass, increase strength, and boost metabolism with resistance training.',
    intensity: 3,
    imageUrl: 'https://images.pexels.com/photos/38630/bodybuilder-weight-training-stress-38630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pilates',
    name: 'Pilates',
    description: 'Strengthen your core, improve posture, and increase body awareness through controlled movements.',
    intensity: 2,
    imageUrl: 'https://images.pexels.com/photos/4057686/pexels-photo-4057686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const classSessions: ClassSession[] = [
  { id: '1', classTypeId: 'hiit', day: 'Monday', time: '6:00 AM', duration: 45, trainer: 'Alex M.', maxAttendees: 15 },
  { id: '2', classTypeId: 'yoga', day: 'Monday', time: '9:00 AM', duration: 60, trainer: 'Sarah J.', maxAttendees: 20 },
  { id: '3', classTypeId: 'spinning', day: 'Monday', time: '5:30 PM', duration: 45, trainer: 'Mike P.', maxAttendees: 18 },
  { id: '4', classTypeId: 'strength', day: 'Monday', time: '7:00 PM', duration: 60, trainer: 'James K.', maxAttendees: 12 },
  
  { id: '5', classTypeId: 'pilates', day: 'Tuesday', time: '7:00 AM', duration: 60, trainer: 'Lily R.', maxAttendees: 15 },
  { id: '6', classTypeId: 'strength', day: 'Tuesday', time: '12:00 PM', duration: 45, trainer: 'James K.', maxAttendees: 12 },
  { id: '7', classTypeId: 'yoga', day: 'Tuesday', time: '5:00 PM', duration: 60, trainer: 'Sarah J.', maxAttendees: 20 },
  { id: '8', classTypeId: 'hiit', day: 'Tuesday', time: '6:30 PM', duration: 30, trainer: 'Alex M.', maxAttendees: 15 },
  
  { id: '9', classTypeId: 'spinning', day: 'Wednesday', time: '6:00 AM', duration: 45, trainer: 'Mike P.', maxAttendees: 18 },
  { id: '10', classTypeId: 'hiit', day: 'Wednesday', time: '12:15 PM', duration: 30, trainer: 'Alex M.', maxAttendees: 15 },
  { id: '11', classTypeId: 'pilates', day: 'Wednesday', time: '5:30 PM', duration: 60, trainer: 'Lily R.', maxAttendees: 15 },
  { id: '12', classTypeId: 'strength', day: 'Wednesday', time: '7:00 PM', duration: 60, trainer: 'James K.', maxAttendees: 12 },
  
  { id: '13', classTypeId: 'yoga', day: 'Thursday', time: '7:00 AM', duration: 60, trainer: 'Sarah J.', maxAttendees: 20 },
  { id: '14', classTypeId: 'hiit', day: 'Thursday', time: '12:00 PM', duration: 45, trainer: 'Alex M.', maxAttendees: 15 },
  { id: '15', classTypeId: 'spinning', day: 'Thursday', time: '5:30 PM', duration: 45, trainer: 'Mike P.', maxAttendees: 18 },
  { id: '16', classTypeId: 'pilates', day: 'Thursday', time: '7:00 PM', duration: 60, trainer: 'Lily R.', maxAttendees: 15 },
  
  { id: '17', classTypeId: 'strength', day: 'Friday', time: '6:00 AM', duration: 60, trainer: 'James K.', maxAttendees: 12 },
  { id: '18', classTypeId: 'yoga', day: 'Friday', time: '9:00 AM', duration: 60, trainer: 'Sarah J.', maxAttendees: 20 },
  { id: '19', classTypeId: 'hiit', day: 'Friday', time: '5:30 PM', duration: 45, trainer: 'Alex M.', maxAttendees: 15 },
  { id: '20', classTypeId: 'spinning', day: 'Friday', time: '6:30 PM', duration: 45, trainer: 'Mike P.', maxAttendees: 18 },
  
  { id: '21', classTypeId: 'hiit', day: 'Saturday', time: '8:00 AM', duration: 45, trainer: 'Alex M.', maxAttendees: 20 },
  { id: '22', classTypeId: 'yoga', day: 'Saturday', time: '9:30 AM', duration: 75, trainer: 'Sarah J.', maxAttendees: 25 },
  { id: '23', classTypeId: 'spinning', day: 'Saturday', time: '11:00 AM', duration: 60, trainer: 'Mike P.', maxAttendees: 20 },
  { id: '24', classTypeId: 'strength', day: 'Saturday', time: '12:30 PM', duration: 60, trainer: 'James K.', maxAttendees: 15 },
  
  { id: '25', classTypeId: 'yoga', day: 'Sunday', time: '9:00 AM', duration: 90, trainer: 'Sarah J.', maxAttendees: 25 },
  { id: '26', classTypeId: 'pilates', day: 'Sunday', time: '11:00 AM', duration: 60, trainer: 'Lily R.', maxAttendees: 20 },
  { id: '27', classTypeId: 'hiit', day: 'Sunday', time: '4:00 PM', duration: 45, trainer: 'Alex M.', maxAttendees: 15 }
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ClassSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const { reduceMotion } = useAccessibility();
  
  const filteredSessions = classSessions.filter(session => session.day === selectedDay);
  
  const getClassDetails = (classTypeId: string): ClassType => {
    return classTypes.find(ct => ct.id === classTypeId) || classTypes[0];
  };
  
  const renderIntensityLevel = (level: 1 | 2 | 3) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${i < level ? 'bg-red-500' : 'bg-neutral-600'}`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <section id="classes" className="py-20 md:py-28 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Class Schedule</h2>
          <p className="text-neutral-400 text-lg">
            Choose from our diverse range of classes designed to challenge and motivate you, 
            no matter your fitness level.
          </p>
        </motion.div>

        {/* Class Types Showcase */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {classTypes.map((classType, index) => (
            <motion.div
              key={classType.id}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                selectedClass?.id === classType.id ? 'ring-2 ring-red-500' : ''
              }`}
              onClick={() => setSelectedClass(selectedClass?.id === classType.id ? null : classType)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: reduceMotion ? 0.1 : 0.4, 
                delay: reduceMotion ? 0 : index * 0.1 
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={classType.imageUrl} 
                  alt={classType.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold">{classType.name}</h3>
                  {renderIntensityLevel(classType.intensity)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Class Details Modal */}
        {selectedClass && (
          <motion.div 
            className="mb-12 bg-neutral-800 rounded-xl p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.3 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedClass.name}</h3>
                <p className="text-neutral-400 mb-4">{selectedClass.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">Intensity:</span>
                  {renderIntensityLevel(selectedClass.intensity)}
                </div>
              </div>
              <button 
                onClick={() => setSelectedClass(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Day Selector */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 min-w-max">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedDay === day 
                    ? 'bg-red-600 text-white' 
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        
        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSessions.map((session, index) => {
            const classDetails = getClassDetails(session.classTypeId);
            return (
              <motion.div
                key={session.id}
                className="bg-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-750 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: reduceMotion ? 0.1 : 0.4, 
                  delay: reduceMotion ? 0 : index * 0.1 
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold">{classDetails.name}</h4>
                    {renderIntensityLevel(classDetails.intensity)}
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-red-500" />
                      <span className="text-neutral-300">{session.time} ({session.duration} mins)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-red-500" />
                      <span className="text-neutral-300">{session.day}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-red-500" />
                      <span className="text-neutral-300">Max {session.maxAttendees} people</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <span className="text-neutral-400">Instructor: </span>
                      {session.trainer}
                    </div>
                    
                    <a 
                      href="#book-class" 
                      className="text-sm px-4 py-2 bg-neutral-700 hover:bg-red-600 rounded-full font-medium transition-colors"
                    >
                      Book Class
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;