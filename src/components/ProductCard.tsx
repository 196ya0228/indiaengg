import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Eye, Star, Package, Zap } from "lucide-react";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";
import ContactModal from "@/components/ContactModal";
import { MechanicalGear, CogWheel } from "@/components/MechanicalElements";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description?: string;
  features?: string[];
  specifications?: string;
  availability?: 'in-stock' | 'out-of-stock' | 'made-to-order';
  tags?: string[];
}

const ProductCard = ({ 
  image, 
  title, 
  price, 
  description, 
  features = [], 
  specifications, 
  availability = 'in-stock',
  tags = []
}: ProductCardProps) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const handleWhatsAppInquiry = () => {
    trackWhatsAppClick('product-card', title);
    sendWhatsAppInquiry(title);
  };

  const handleGetQuote = () => {
    setShowContactModal(true);
  };

  // Get availability badge color and text
  const getAvailabilityBadge = () => {
    switch (availability) {
      case 'in-stock':
        return { color: 'bg-green-500', text: 'In Stock', icon: <Package className="h-3 w-3" /> };
      case 'out-of-stock':
        return { color: 'bg-red-500', text: 'Out of Stock', icon: <Package className="h-3 w-3" /> };
      case 'made-to-order':
        return { color: 'bg-blue-500', text: 'Made to Order', icon: <Zap className="h-3 w-3" /> };
      default:
        return { color: 'bg-gray-500', text: 'Contact Us', icon: <Package className="h-3 w-3" /> };
    }
  };

  const availabilityBadge = getAvailabilityBadge();

  // Get real machinery image based on title (fallback if no image provided)
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

  const displayImage = image && image !== "/placeholder.svg" ? image : getMachineryImage(title);

  return (
    <>
      <Card className="group card-mechanical hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-blue-400 bg-white transform hover:-translate-y-3 relative overflow-hidden">
        {/* Availability Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className={`${availabilityBadge.color} text-white text-xs flex items-center gap-1`}>
            {availabilityBadge.icon}
            {availabilityBadge.text}
          </Badge>
        </div>

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
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Industrial overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Features (show first 2) */}
          {features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1 mb-2">
                {features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {features.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{features.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-blue-600">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div>
              {price === "Get Quote" || price.toLowerCase().includes('quote') || price.toLowerCase().includes('contact') ? (
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
              disabled={availability === 'out-of-stock'}
            >
              <MessageCircle className="h-4 w-4 group-hover:mechanical-pulse" />
              WhatsApp Inquiry
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleGetQuote}
                className="btn-mechanical text-sm flex items-center gap-1 group"
                size="sm"
                disabled={availability === 'out-of-stock'}
              >
                <MechanicalGear size={14} color="currentColor" className="group-hover:gear-rotate" />
                Quote
              </Button>
              <Button
                onClick={() => setShowFullDetails(true)}
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
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />

      {/* Detailed Product Modal */}
      {showFullDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowFullDetails(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFullDetails(false)}>×</Button>
              </div>
              
              <img src={displayImage} alt={title} className="w-full h-64 object-cover rounded-lg mb-4" />
              
              <div className="space-y-4">
                {description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                )}

                {features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Features</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {specifications && (
                  <div>
                    <h3 className="font-semibold mb-2">Specifications</h3>
                    <p className="text-gray-600">{specifications}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleWhatsAppInquiry} className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Inquiry
                  </Button>
                  <Button onClick={handleGetQuote} variant="outline" className="flex-1">
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
