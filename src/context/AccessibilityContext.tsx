import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(() => {
    // Check for user's system preference for reduced motion
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const toggleReduceMotion = () => {
    setReduceMotion(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider value={{ reduceMotion, toggleReduceMotion }}>
      {children}
    </AccessibilityContext.Provider>
  );
};