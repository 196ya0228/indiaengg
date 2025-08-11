import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";
import ContactModal from "@/components/ContactModal";
import { MechanicalGear, CogWheel, IndustrialPattern } from "@/components/MechanicalElements";
import { useTranslation } from "@/hooks/useLanguage";
import cementPlant from "@/assets/cement-plant.jpg";
import modernHeroBg from "@/assets/modern-hero-bg.jpg";

const HeroSection = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { t } = useTranslation();

  const handleGetQuote = () => {
    trackWhatsAppClick('hero-get-quote');
    sendWhatsAppInquiry('Quote Request from Hero', 
      `Hello India Engineering Works!

I'm interested in getting a quote for your sugar plant machinery.

Please provide:
- Product specifications and pricing
- Delivery timeline
- Installation support
- Payment terms

I'm looking forward to hearing from you soon!`
    );
  };

  const handleViewProducts = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        className="relative py-12 md:py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
        }}
      >
        {/* Mechanical Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Industrial Pattern Background */}
          <IndustrialPattern className="text-white" />

          {/* Mechanical Gears */}
          <div className="absolute top-20 right-20">
            <MechanicalGear size={120} color="rgba(255,255,255,0.15)" animate />
          </div>
          <div className="absolute bottom-32 left-16">
            <CogWheel size={80} color="rgba(255,255,255,0.1)" className="gear-rotate-reverse" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <MechanicalGear size={60} color="rgba(255,255,255,0.12)" animate />
          </div>
          <div className="absolute top-1/4 left-1/3">
            <CogWheel size={40} color="rgba(255,255,255,0.08)" className="gear-rotate" />
          </div>

          {/* Industrial Grid Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="industrial-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.2)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#industrial-grid)" />
            </svg>
          </div>

          {/* Mechanical Pipes */}
          <div className="absolute top-16 left-0 opacity-20">
            <svg width="300" height="20">
              <rect x="0" y="0" width="300" height="20" fill="rgba(255,255,255,0.3)" rx="10" />
              <rect x="0" y="5" width="300" height="10" fill="rgba(255,255,255,0.2)" rx="5" />
            </svg>
          </div>
          <div className="absolute bottom-24 right-0 opacity-15">
            <svg width="250" height="16">
              <rect x="0" y="0" width="250" height="16" fill="rgba(255,255,255,0.25)" rx="8" />
            </svg>
          </div>
        </div>
            
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="space-y-6">
                <div className="inline-block">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {t('hero.sugarPlantBadge')}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">{t('hero.sugarPlantTitle')}</span>
                  <span className="block text-black font-extrabold text-4xl md:text-5xl lg:text-7xl">{t('hero.spareParts')}</span>
                </h1>

                <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-white mt-4">
                  {t('hero.weDeliver')}
                </h2>

                <p className="text-base md:text-lg lg:text-xl opacity-90 leading-relaxed max-w-lg">
                  {t('hero.description')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={handleGetQuote}
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-xl industrial-glow relative overflow-hidden group w-full sm:w-auto"
                  >
                    <MechanicalGear size={16} color="currentColor" className="mr-2 group-hover:gear-rotate" />
                    {t('hero.getQuoteNow')}
                  </Button>
                  <Button
                    onClick={handleViewProducts}
                    size="lg"
                    className="btn-mechanical border-white text-white hover:bg-white hover:text-slate-800 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold backdrop-blur-sm relative group w-full sm:w-auto"
                  >
                    <CogWheel size={16} color="currentColor" className="mr-2 group-hover:gear-rotate-reverse" />
                    {t('hero.viewProducts')}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Featured Image - Mechanical Frame */}
            <div className="relative flex justify-center mt-8 lg:mt-0">
              <div className="relative">
                {/* Mechanical Gear Frame - Hidden on small screens */}
                <div className="hidden md:block absolute -top-8 -left-8 z-10">
                  <MechanicalGear size={60} color="#374151" animate />
                </div>
                <div className="hidden md:block absolute -bottom-8 -right-8 z-10">
                  <CogWheel size={50} color="#4b5563" className="gear-rotate-reverse" />
                </div>
                <div className="hidden lg:block absolute top-1/2 -left-12 z-10">
                  <CogWheel size={40} color="#6b7280" className="gear-rotate" />
                </div>

                {/* Industrial product image frame */}
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-slate-300 shadow-2xl flex items-center justify-center overflow-hidden relative card-mechanical">
                  {/* Industrial border design */}
                  <div className="absolute inset-2 border-2 border-dashed border-slate-400 rounded-xl"></div>

                  <img
                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt={t('hero.imageAlt')}
                    className="w-11/12 h-11/12 object-cover rounded-xl"
                  />

                  {/* Industrial corner details */}
                  <div className="absolute top-2 left-2 w-4 h-4 bg-slate-600 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-slate-600 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-slate-600 rounded-full"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-slate-600 rounded-full"></div>
                </div>

                {/* Company branding */}
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black/80 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold">
                  <span className="hidden sm:inline">INDIA ENGINEERING WORKS</span>
                  <span className="sm:hidden">IEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
};

export default HeroSection;
