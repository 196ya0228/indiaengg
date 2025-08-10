import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageCircle, MapPin, Building, User, Send } from "lucide-react";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productCategory: "",
    quantity: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppSubmit = () => {
    const message = `Hello India Engineering Works!

I'm interested in your products. Here are my details:

👤 Name: ${formData.name}
🏢 Company: ${formData.company}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
🏭 Product Category: ${formData.productCategory}
📦 Quantity: ${formData.quantity}

💬 Message: ${formData.message}

Please get back to me with product details and pricing.

Thank you!`;

    trackWhatsAppClick('contact-form');
    sendWhatsAppInquiry('', message);
    onClose();
  };

  const handleEmailSubmit = () => {
    // In a real application, this would submit to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    onClose();
  };

  const productCategories = [
    "Jaggery & Gur Production Plant",
    "Sugar Cane Crushing & Processing",
    "Mini Sugar Plant & Refinery",
    "Khandsari Sugar Equipment",
    "Sugar Mill Spare Parts",
    "Complete Sugar Processing Solutions"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <Building className="h-6 w-6" />
            Contact India Engineering Works
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Get instant quote for industrial machinery and equipment. Fill the form below and we'll respond quickly.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-lg mb-4 text-blue-800">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+919897601094</p>
                    <p className="text-sm text-gray-600">+919837200396</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-gray-600">Instant Response</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:india_enggworks@yahoo.in" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      india_enggworks@yahoo.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">Muzaffarnagar UP IN</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-600 text-white">✓ Verified Supplier</Badge>
                  <Badge className="bg-blue-600 text-white">GST Registered</Badge>
                  <Badge className="bg-orange-600 text-white">35+ Years Experience</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Quick Response Guarantee</h4>
              <p className="text-sm text-green-700">
                We respond to all inquiries within 2 hours during business hours (Mon-Sat, 9AM-7PM IST).
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Product Category *</Label>
              <Select value={formData.productCategory} onValueChange={(value) => handleInputChange('productCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity/Requirement</Label>
              <Input
                id="quantity"
                placeholder="e.g., 1 unit, 5 sets, bulk order"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your requirements in detail..."
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <div className="space-y-3 pt-4">
              <Button
                onClick={handleWhatsAppSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 py-3"
                disabled={!formData.name || !formData.phone || !formData.productCategory}
              >
                <MessageCircle className="h-5 w-5" />
                Send via WhatsApp (Recommended)
              </Button>
              
              <Button
                onClick={handleEmailSubmit}
                variant="outline"
                className="w-full border-blue-200 hover:border-blue-400 hover:bg-blue-50 flex items-center gap-2 py-3"
                disabled={!formData.name || !formData.phone || !formData.productCategory}
              >
                <Send className="h-5 w-5" />
                Send Inquiry via Email
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our terms and privacy policy.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
