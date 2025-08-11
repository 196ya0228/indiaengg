import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  LanguageCode, 
  getCurrentLanguage, 
  saveLanguage, 
  getTranslation, 
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE 
} from '@/lib/i18n';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
  getSupportedLanguages: () => typeof SUPPORTED_LANGUAGES;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Initialize language from localStorage
    const savedLanguage = getCurrentLanguage();
    setCurrentLanguage(savedLanguage);
  }, []);

  const setLanguage = (language: LanguageCode) => {
    setCurrentLanguage(language);
    saveLanguage(language);
    
    // Update document attributes for proper styling
    document.documentElement.lang = language;
    
    // Add/remove RTL class if needed (though none of our supported languages are RTL currently)
    const isRTL = false; // None of our languages (en, hi, mr, gu, pa) are RTL
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Trigger a custom event for other parts of the app to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language, isRTL } 
    }));
  };

  const t = (key: string): string => {
    return getTranslation(key, currentLanguage);
  };

  const getSupportedLanguages = () => {
    return SUPPORTED_LANGUAGES;
  };

  const isRTL = false; // None of our supported languages are RTL

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    getSupportedLanguages,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook for components that need to re-render when language changes
export const useTranslation = () => {
  const { t, currentLanguage } = useLanguage();
  
  return { 
    t, 
    language: currentLanguage,
    // Helper function for getting translations with fallback
    translate: (key: string, fallback?: string) => {
      const translation = t(key);
      return translation === key && fallback ? fallback : translation;
    }
  };
};

// Component wrapper that forces re-render on language change
export const withLanguage = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithLanguageComponent = (props: P) => {
    const { currentLanguage } = useLanguage();
    
    // This ensures the component re-renders when language changes
    return <WrappedComponent key={currentLanguage} {...props} />;
  };
  
  WithLanguageComponent.displayName = `withLanguage(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithLanguageComponent;
};
