import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DynamicProductsSection from "@/components/DynamicProductsSection";
import CompanyInfo from "@/components/CompanyInfo";
import CTASection from "@/components/CTASection";
import VideoSection from "@/components/VideoSection";
import ProductListing from "@/components/ProductListing";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileContactBar from "@/components/MobileContactBar";
import ContactIntegration from "@/components/ContactIntegration";
import SearchModal from "@/components/SearchModal";

const Index = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductListing />
      <DynamicProductsSection />
      <CompanyInfo />
      <ContactIntegration />
      <CTASection />
      <VideoSection />

      {/* Mobile Contact Bar - Fixed at bottom on mobile */}
      <MobileContactBar />

      {/* Desktop Floating WhatsApp */}
      <div className="hidden md:block">
        <FloatingWhatsApp />
      </div>

      {/* Add bottom padding on mobile to prevent overlap with contact bar */}
      <div className="md:hidden h-32"></div>

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </div>
  );
};

export default Index;
