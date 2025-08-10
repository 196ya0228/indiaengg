import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";

const MobileContactBar = () => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('WhatsApp clicked from mobile bar');
    trackWhatsAppClick('mobile-contact-bar');
    sendWhatsAppInquiry();
  };

  const handleCallClick = (phoneNumber: string) => {
    console.log('Call clicked:', phoneNumber);
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    console.log('Email clicked');
    window.location.href = 'mailto:india_enggworks@yahoo.in?subject=Product Inquiry&body=Hello India Engineering Works, I am interested in your products. Please send me more information.';
  };

  const handleMapsClick = () => {
    console.log('Maps clicked');
    // Google Maps link for Muzaffarnagar, Uttar Pradesh
    window.open('https://maps.google.com/maps?q=Muzaffarnagar,+Uttar+Pradesh,+India', '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 shadow-2xl z-50">
      <div className="grid grid-cols-5 gap-2 py-3 px-2">
        {/* Call Button 1 */}
        <button
          onClick={() => handleCallClick('+919897601094')}
          className="call-button flex flex-col items-center gap-1 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
        >
          <Phone className="h-4 w-4" />
          <span className="text-xs font-semibold">Call</span>
          <span className="text-xs opacity-80">Direct</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="call-button flex flex-col items-center gap-1 bg-green-600 text-white px-2 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs font-semibold">WhatsApp</span>
          <span className="text-xs opacity-80">Chat</span>
        </button>

        {/* Call Button 2 */}
        <button
          onClick={() => handleCallClick('+919837200396')}
          className="call-button flex flex-col items-center gap-1 bg-orange-600 text-white px-2 py-2 rounded-lg hover:bg-orange-700 transition-colors shadow-lg active:scale-95"
        >
          <Phone className="h-4 w-4" />
          <span className="text-xs font-semibold">Call</span>
          <span className="text-xs opacity-80">Mobile</span>
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmailClick}
          className="call-button flex flex-col items-center gap-1 bg-purple-600 text-white px-2 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-lg active:scale-95"
        >
          <Mail className="h-4 w-4" />
          <span className="text-xs font-semibold">Email</span>
          <span className="text-xs opacity-80">Inquiry</span>
        </button>

        {/* Google Maps Button */}
        <button
          onClick={handleMapsClick}
          className="call-button flex flex-col items-center gap-1 bg-red-600 text-white px-2 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg active:scale-95"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-xs font-semibold">Location</span>
          <span className="text-xs opacity-80">Maps</span>
        </button>
      </div>
      
      {/* Contact Info */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 px-2 py-2 text-center">
        <p className="text-xs text-gray-600 font-medium">
          <span className="text-green-600 font-bold">Mon-Sun 8AM-8PM</span> |
          <span className="text-blue-600 font-bold ml-1">📍 Muzaffarnagar, UP</span>
        </p>
      </div>
    </div>
  );
};

export default MobileContactBar;
