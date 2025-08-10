import { useState } from "react";
import { MessageCircle, X, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendWhatsAppInquiry, trackWhatsAppClick, WHATSAPP_CONFIG } from "@/lib/whatsapp";

const FloatingWhatsApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('floating-button');
    sendWhatsAppInquiry();
  };

  const handleQuickInquiry = (productType: string) => {
    trackWhatsAppClick('floating-button-quick', productType);
    sendWhatsAppInquiry(productType);
    setIsExpanded(false);
  };

  const quickInquiries = [
    "Jaggery Making Machine",
    "Mini Sugar Plant",
    "Sugar Cane Crusher",
    "General Inquiry"
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 md:w-80 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Quick Inquiry</h3>
                <p className="text-xs text-gray-500">Choose a category</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {quickInquiries.map((inquiry) => (
              <Button
                key={inquiry}
                variant="outline"
                size="sm"
                onClick={() => handleQuickInquiry(inquiry)}
                className="w-full justify-start text-left border-green-200 hover:border-green-400 hover:bg-green-50"
              >
                {inquiry}
              </Button>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <Button
              onClick={() => {
                window.location.href = 'mailto:india_enggworks@yahoo.in?subject=Product Inquiry&body=Hello India Engineering Works, I am interested in your products. Please send me more information.';
                setIsExpanded(false);
              }}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left border-orange-200 hover:border-orange-400 hover:bg-orange-50 mb-3"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Us: india_enggworks@yahoo.in
            </Button>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Clock className="h-3 w-3" />
              <span>Typically replies in minutes</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Phone className="h-3 w-3" />
              <span>{WHATSAPP_CONFIG.phoneNumber}</span>
            </div>

            {/* Direct Call Buttons */}
            <div className="flex gap-2">
              <a
                href="tel:+919897601094"
                className="flex-1 text-center bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                📞 Call Direct
              </a>
              <a
                href="tel:+919837200396"
                className="flex-1 text-center bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 py-2 text-xs font-semibold text-green-700 transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                📱 Call Mobile
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative">
        <Button
          onClick={isExpanded ? handleWhatsAppClick : () => setIsExpanded(true)}
          data-contact-modal="trigger"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 rounded-full"></div>
          <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-white relative z-10 group-hover:animate-bounce" />
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20"></div>
          
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        </Button>
        
        {/* Tooltip */}
        {!isExpanded && (
          <div className="hidden md:block absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
