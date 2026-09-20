import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getItem } from '../utils/asyncStorage';

interface OnboardingContextType {
  onboarded: boolean;
  setOnboarded: (status: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboarded, setOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await getItem('onboarded');
      setOnboarded(status === '1');
    };
    checkOnboardingStatus();
  }, []);

  return (
    <OnboardingContext.Provider value={{ onboarded, setOnboarded }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
