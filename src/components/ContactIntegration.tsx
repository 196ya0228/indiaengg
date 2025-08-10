import { Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sendWhatsAppInquiry, trackWhatsAppClick } from "@/lib/whatsapp";

const ContactIntegration = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('contact-integration');
    sendWhatsAppInquiry();
  };

  const handleCallClick = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:india_enggworks@yahoo.in?subject=Product Inquiry&body=Hello India Engineering Works, I am interested in your products. Please send me more information.';
  };

  const handleMapsClick = () => {
    window.open('https://maps.google.com/maps?q=India+Engineering+Works,+Muzaffarnagar,+Uttar+Pradesh,+India', '_blank');
  };

  const handleDirectionsClick = () => {
    window.open('https://maps.google.com/maps/dir//Muzaffarnagar,+Uttar+Pradesh,+India', '_blank');
  };

  return (
    <section id="contact-section" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discuss your sugar plant machinery needs? Contact us through any of these convenient methods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone Contact */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">Call Direct</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <div className="space-y-2">
                <button
                  onClick={() => handleCallClick('+919897601094')}
                  className="block w-full text-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
                >
                  +91 98976 01094
                </button>
                <button
                  onClick={() => handleCallClick('+919837200396')}
                  className="block w-full text-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
                >
                  +91 98372 00396
                </button>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <Clock className="h-3 w-3 mr-1" />
                Mon-Sun 8AM-8PM
              </Badge>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">WhatsApp Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-gray-600">Instant response guaranteed</p>
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start WhatsApp Chat
              </Button>
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                <MessageCircle className="h-3 w-3 mr-1" />
                +91 98372 00396
              </Badge>
            </CardContent>
          </Card>

          {/* Email Contact */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">Email Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-gray-600">Send detailed requirements</p>
              <Button 
                onClick={handleEmailClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                <Mail className="h-3 w-3 mr-1" />
                india_enggworks@yahoo.in
              </Badge>
            </CardContent>
          </Card>

          {/* Location & Maps */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-gray-600 text-sm">Manufacturing Unit</p>
              <p className="font-semibold text-gray-800">Muzaffarnagar, Uttar Pradesh, India</p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleMapsClick}
                  size="sm"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  View Map
                </Button>
                <Button 
                  onClick={handleDirectionsClick}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Embedded Google Map */}
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Location</CardTitle>
            <p className="text-gray-600">Find us on the map - Manufacturing Unit in Muzaffarnagar, UP</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.23456789!2d77.63!3d29.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390be354b52b7c29%3A0xcddf6103c0b4b6c!2sMuzaffarnagar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="India Engineering Works Location"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Sunday</p>
              <p className="text-blue-600 font-semibold">8:00 AM - 8:00 PM IST</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Response</h3>
              <p className="text-gray-600">WhatsApp inquiries</p>
              <p className="text-green-600 font-semibold">Usually within minutes</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">GST Registered</h3>
              <p className="text-gray-600">Verified Manufacturer</p>
              <p className="text-orange-600 font-semibold">09AABPI0229C1ZD</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6">Contact us today for a personalized quote and consultation</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Now
            </Button>
            <Button 
              onClick={() => handleCallClick('+919897601094')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Direct
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactIntegration;
