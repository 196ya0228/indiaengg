import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Search, Menu, MessageCircle, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";
import SearchModal from "@/components/SearchModal";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleWhatsAppInquiry = () => {
    trackWhatsAppClick('header');
    sendWhatsAppInquiry();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(true);
    } else {
      setShowSearchModal(true);
    }
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  return (
    <header className="bg-background shadow-lg relative">
      {/* Professional Industry-Standard Top Bar */}
      <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 text-white py-3 border-b border-blue-700/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Business Information */}
            <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 md:px-3 py-1 backdrop-blur-sm">
                <Clock className="h-3 w-3 text-green-400" />
                <span className="text-xs font-medium">
                  <span className="hidden sm:inline">Business Hours: Mon-Sun 8:00 AM - 8:00 PM IST</span>
                  <span className="sm:hidden">8AM-8PM</span>
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-full px-2 md:px-3 py-1 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-blue-400" />
                <span className="text-xs font-medium">
                  <span className="hidden lg:inline">Manufacturing Unit: Muzaffarnagar, Uttar Pradesh, India</span>
                  <span className="hidden md:inline lg:hidden">Muzaffarnagar, UP, India</span>
                  <span className="md:hidden">Muzaffarnagar UP</span>
                </span>
              </div>

              <div className="hidden xl:flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                <Mail className="h-3 w-3 text-orange-400" />
                <a href="mailto:india_enggworks@yahoo.in" className="text-xs font-medium hover:text-orange-300 transition-colors">
                  india_enggworks@yahoo.in
                </a>
              </div>

              <div className="hidden lg:flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-blue-400" />
                <button
                  onClick={() => window.open('https://maps.google.com/maps?q=Muzaffarnagar,+Uttar+Pradesh,+India', '_blank')}
                  className="text-xs font-medium hover:text-blue-300 transition-colors cursor-pointer"
                >
                  View on Maps
                </button>
              </div>
            </div>

            {/* Right Side - Certifications & Verifications */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* GST Registration */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg px-3 py-1 border border-green-500/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-300">
                  <span className="hidden md:inline">GST REG: </span>09AABPI0229C1ZD
                </span>
              </div>

              {/* Industry Certifications - Desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-1 font-semibold border border-blue-500/50 shadow-sm">
                  🏭 ISO Standards
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs px-2 py-1 font-semibold border border-purple-500/50 shadow-sm">
                  📋 MSME Certified
                </Badge>
              </div>

              {/* Verification Status */}
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-lg px-2 py-1 border border-orange-500/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-orange-300">
                  <span className="hidden sm:inline">VERIFIED MANUFACTURER</span>
                  <span className="sm:hidden">✓ VERIFIED</span>
                </span>
              </div>

              {/* Mobile Quick Contact */}
              <div className="md:hidden">
                <a href="tel:+919897601094" className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <Phone className="h-3 w-3 text-green-400" />
                  <span className="text-xs font-medium">Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-4 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="text-xl md:text-2xl font-bold tracking-wide">
                INDIA ENGINEERING WORKS
              </div>
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 animate-pulse">
                TRUSTED SELLER
              </Badge>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile: Separate Call Buttons */}
              <div className="md:hidden flex gap-1">
                <a
                  href="tel:+919897601094"
                  className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2 hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="h-3 w-3 text-green-400" />
                  <span className="text-xs font-semibold">Call 1</span>
                </a>
                <a
                  href="tel:+919837200396"
                  className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2 hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="h-3 w-3 text-green-400" />
                  <span className="text-xs font-semibold">Call 2</span>
                </a>
              </div>

              {/* Desktop: Combined Call Section */}
              <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Phone className="h-4 w-4 text-green-400" />
                <div className="flex flex-col text-xs">
                  <a href="tel:+919897601094" className="font-semibold hover:text-green-300 transition-colors">
                    +919897601094
                  </a>
                  <a href="tel:+919837200396" className="font-semibold hover:text-green-300 transition-colors">
                    +919837200396
                  </a>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppInquiry}
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700 font-semibold px-3 md:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden md:inline">WhatsApp Inquiry</span>
                <span className="md:hidden text-xs">WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b-2 border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-blue-200 hover:border-blue-500"
                onClick={() => {
                  const nav = document.getElementById('mobile-nav');
                  nav?.classList.toggle('hidden');
                }}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => window.location.href = '/'}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                Home Page
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('company-info');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                Company Profile
              </button>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50">
                  Our Products <span className="text-xs transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        const element = document.getElementById('products-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left block px-4 py-3 text-sm hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      Jaggery & Gur Production Plant
                    </button>
                    <button
                      onClick={() => {
                        const element = document.getElementById('products-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left block px-4 py-3 text-sm hover:bg-green-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Sugar Cane Crushing & Processing
                    </button>
                    <button
                      onClick={() => {
                        const element = document.getElementById('products-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left block px-4 py-3 text-sm hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Mini Sugar Plant & Refinery
                    </button>
                    <button
                      onClick={() => {
                        const element = document.getElementById('products-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left block px-4 py-3 text-sm hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Khandsari Sugar Equipment
                    </button>
                    <button
                      onClick={() => {
                        const element = document.getElementById('products-section');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left block px-4 py-3 text-sm hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      Sugar Mill Spare Parts
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const element = document.getElementById('contact-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Fallback: trigger contact modal
                    const contactButton = document.querySelector('[data-contact-modal]');
                    if (contactButton) {
                      (contactButton as HTMLElement).click();
                    }
                  }
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                Contact Us
              </button>
            </nav>

            {/* Enhanced Search */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative group">
                <div
                  onClick={handleSearchClick}
                  className="flex items-center border-2 border-gray-200 rounded-xl px-2 md:px-4 py-2 bg-gray-50 hover:border-blue-500 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Search className="h-4 w-4 text-gray-400 mr-2 md:mr-3 group-hover:text-blue-500 transition-colors" />
                  <span className="text-sm text-gray-400 w-32 md:w-64 text-left">
                    <span className="hidden md:inline">Search Products, Machinery...</span>
                    <span className="md:hidden">Search...</span>
                  </span>
                  <kbd className="hidden md:block ml-2 px-2 py-1 text-xs bg-gray-200 rounded text-gray-600">
                    Ctrl K
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-nav" className="md:hidden hidden bg-white border-t-2 border-blue-100 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => {
                window.location.href = '/';
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
              className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Home Page
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('company-info');
                element?.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
              className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Company Profile
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('products-section');
                element?.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
              className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Our Products
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  const contactButton = document.querySelector('[data-contact-modal]');
                  if (contactButton) {
                    (contactButton as HTMLElement).click();
                  }
                }
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
              className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Contact Us
            </button>

            {/* Mobile Contact Actions */}
            <div className="border-t pt-4 mt-2">
              <div className="flex gap-2 mb-3">
                <a
                  href="tel:+919897601094"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold">Call Direct</span>
                </a>
                <button
                  onClick={() => {
                    handleWhatsAppInquiry();
                    document.getElementById('mobile-nav')?.classList.add('hidden');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-semibold">WhatsApp</span>
                </button>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p className="font-semibold">Instant Response</p>
                <p>+919837200396</p>
                <p>Mon-Sun 8AM-8PM</p>
                <p className="mt-1">+919897601094 | +919837200396</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
