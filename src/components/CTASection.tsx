import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Eye, ArrowRight } from "lucide-react";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";
import ContactModal from "@/components/ContactModal";

const CTASection = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleInstantQuote = () => {
    trackWhatsAppClick('cta-instant-quote');
    sendWhatsAppInquiry('Instant Quote Request', 
      `Hello India Engineering Works!

I'm interested in getting an instant quote for your machinery.

Please provide pricing and details for:
- Product specifications
- Delivery timeline  
- Installation support
- Payment terms

Looking forward to your quick response!`
    );
  };

  const handleViewProducts = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:india_enggworks@yahoo.in?subject=Inquiry about Industrial Machinery&body=Hello India Engineering Works,%0D%0A%0D%0AI am interested in your machinery products. Please send me more information.%0D%0A%0D%0AThank you.';
  };

  return (
    <>
      <section id="contact-section" className="py-12 md:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 md:w-72 h-32 md:h-72 rounded-full bg-white/5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 md:w-96 h-48 md:h-96 rounded-full bg-orange-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-white/10 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Main Heading */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              We Send You The Price{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text animate-shimmer">
                Immediately
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
              Contact us now for competitive pricing on our high-quality machinery. 
              Fast quotes, reliable equipment, trusted service since 1988.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {/* WhatsApp Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">WhatsApp</h3>
                  <p className="text-sm text-blue-200">Instant Response</p>
                </div>
              </div>
              <p className="text-sm text-blue-200">+919837200396</p>
            </div>

            {/* Phone Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">Call Direct</h3>
                  <p className="text-sm text-blue-200">Mon-Sun 8AM-8PM</p>
                </div>
              </div>
              <div className="text-sm text-blue-200">
                <div>+919897601094</div>
                <div>+919837200396</div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">Email Us</h3>
                  <p className="text-sm text-blue-200">24/7 Support</p>
                </div>
              </div>
              <button 
                onClick={handleEmailContact}
                className="text-sm text-blue-200 hover:text-white transition-colors underline"
              >
                india_enggworks@yahoo.in
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8">
            <Button 
              onClick={handleInstantQuote}
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 md:px-10 py-3 md:py-4 text-lg md:text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
            >
              <MessageCircle className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Get Instant Quote
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={handleViewProducts}
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-6 md:px-10 py-3 md:py-4 text-lg md:text-xl font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105 group"
            >
              <Eye className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              View All Products
            </Button>
          </div>

          {/* Additional CTA Button */}
          <div className="text-center">
            <Button
              onClick={() => setShowContactModal(true)}
              variant="ghost"
              className="text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              Or fill our detailed inquiry form
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>35+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>1000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>GST Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
};

export default CTASection;
