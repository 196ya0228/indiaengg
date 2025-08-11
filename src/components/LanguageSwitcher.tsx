import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageCode } from '@/lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
  showFlag?: boolean;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'outline',
  size = 'sm',
  showLabel = true,
  showFlag = true,
  className = ''
}) => {
  const { currentLanguage, setLanguage, getSupportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const supportedLanguages = getSupportedLanguages();
  const currentLangData = supportedLanguages[currentLanguage];

  const handleLanguageChange = (language: LanguageCode) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={`flex items-center gap-2 ${className}`}
        >
          <Globe className="h-4 w-4" />
          {showFlag && <span className="text-base">{currentLangData.flag}</span>}
          {showLabel && (
            <span className="hidden sm:inline">
              {currentLangData.nativeName}
            </span>
          )}
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[200px]">
        {Object.entries(supportedLanguages).map(([code, langData]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as LanguageCode)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{langData.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{langData.nativeName}</span>
                <span className="text-xs text-gray-500">{langData.name}</span>
              </div>
            </div>
            {currentLanguage === code && (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

// Compact version for mobile or tight spaces
export const CompactLanguageSwitcher: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  return (
    <LanguageSwitcher
      variant="ghost"
      size="sm"
      showLabel={false}
      showFlag={true}
      className={className}
    />
  );
};

// Header version with native language name
export const HeaderLanguageSwitcher: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  return (
    <LanguageSwitcher
      variant="outline"
      size="sm"
      showLabel={true}
      showFlag={true}
      className={className}
    />
  );
};

// Footer version - simple text links
export const FooterLanguageSwitcher: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  const { currentLanguage, setLanguage, getSupportedLanguages } = useLanguage();
  const supportedLanguages = getSupportedLanguages();

  return (
    <div className={`flex flex-wrap gap-2 text-sm ${className}`}>
      {Object.entries(supportedLanguages).map(([code, langData], index) => (
        <React.Fragment key={code}>
          <button
            onClick={() => setLanguage(code as LanguageCode)}
            className={`hover:underline transition-colors ${
              currentLanguage === code 
                ? 'font-semibold text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {langData.flag} {langData.nativeName}
          </button>
          {index < Object.keys(supportedLanguages).length - 1 && (
            <span className="text-gray-400">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
