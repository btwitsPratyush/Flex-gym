import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import MembershipSection from './components/sections/MembershipSection';
import ClassSchedule from './components/sections/ClassSchedule';
import TrainerProfiles from './components/sections/TrainerProfiles';
import EquipmentShowcase from './components/sections/EquipmentShowcase';
import Transformations from './components/sections/Transformations';
import { AccessibilityProvider } from './context/AccessibilityContext';

function App() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-neutral-900 text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <MembershipSection />
          <ClassSchedule />
          <TrainerProfiles />
          <EquipmentShowcase />
          <Transformations />
        </main>
        <Footer />
      </div>
    </AccessibilityProvider>
  );
}

export default App;