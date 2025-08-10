import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, Eye } from "lucide-react";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";
import ContactModal from "@/components/ContactModal";
import { MechanicalGear, CogWheel } from "@/components/MechanicalElements";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description?: string;
}

const ProductCard = ({ image, title, price, description }: ProductCardProps) => {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleWhatsAppInquiry = () => {
    trackWhatsAppClick('product-card', title);
    sendWhatsAppInquiry(title);
  };

  const handleGetQuote = () => {
    setShowContactModal(true);
  };

  // Get real machinery image based on title
  const getMachineryImage = (title: string) => {
    if (title.toLowerCase().includes('jaggery') || title.toLowerCase().includes('gur')) {
      return "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    } else if (title.toLowerCase().includes('crusher')) {
      return "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    } else if (title.toLowerCase().includes('sugar') && title.toLowerCase().includes('plant')) {
      return "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    } else if (title.toLowerCase().includes('gearbox') || title.toLowerCase().includes('gear')) {
      return "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    } else {
      return "https://images.unsplash.com/photo-1565007516736-5b5a7c5ad4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }
  };

  return (
    <>
      <Card className="group card-mechanical hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-blue-400 bg-white transform hover:-translate-y-3 relative overflow-hidden">
        {/* Mechanical corner gears */}
        <div className="absolute top-2 right-2 z-10 opacity-20 group-hover:opacity-40 transition-opacity">
          <CogWheel size={24} color="#374151" className="group-hover:gear-rotate" />
        </div>

        <CardContent className="p-6">
          <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4 relative border-2 border-slate-300">
            {/* Industrial frame corners */}
            <div className="absolute top-1 left-1 w-3 h-3 bg-slate-600 rounded-full z-10"></div>
            <div className="absolute top-1 right-1 w-3 h-3 bg-slate-600 rounded-full z-10"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 bg-slate-600 rounded-full z-10"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-slate-600 rounded-full z-10"></div>

            <img
              src={getMachineryImage(title)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Industrial overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div>
              {price === "Get Quote" ? (
                <span className="text-lg font-bold text-orange-600">{price}</span>
              ) : (
                <>
                  <span className="text-sm text-muted-foreground">Price: </span>
                  <span className="text-xl font-bold text-blue-600">{price}</span>
                  <span className="text-sm text-muted-foreground"> / Piece</span>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppInquiry}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transition-all duration-300 flex items-center gap-2 shadow-lg industrial-glow group"
            >
              <MessageCircle className="h-4 w-4 group-hover:mechanical-pulse" />
              WhatsApp Inquiry
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleGetQuote}
                className="btn-mechanical text-sm flex items-center gap-1 group"
                size="sm"
              >
                <MechanicalGear size={14} color="currentColor" className="group-hover:gear-rotate" />
                Quote
              </Button>
              <Button
                onClick={() => setShowContactModal(true)}
                className="btn-mechanical text-sm flex items-center gap-1 group"
                size="sm"
              >
                <Eye className="h-3 w-3 group-hover:mechanical-pulse" />
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
};

export default ProductCard;
