export const WHATSAPP_CONFIG = {
  // India Engineering Works WhatsApp number
  phoneNumber: '+919837200396',
  businessName: 'India Engineering Works',
  additionalNumbers: ['+919897601094', '+919837200396'],
};

export const generateWhatsAppURL = (message: string, phone?: string) => {
  const phoneNumber = phone || WHATSAPP_CONFIG.phoneNumber;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
};

export const getInquiryMessage = (productName?: string) => {
  const baseMessage = `Hello ${WHATSAPP_CONFIG.businessName}! 

I'm interested in your industrial machinery and would like to get more information.`;
  
  if (productName) {
    return `${baseMessage}

Specifically interested in: ${productName}

Please share:
- Product specifications
- Pricing details
- Delivery timeline
- Installation support

Thank you!`;
  }
  
  return `${baseMessage}

Please share your product catalog and pricing details.

Thank you!`;
};

export const sendWhatsAppInquiry = (productName?: string, customMessage?: string) => {
  const message = customMessage || getInquiryMessage(productName);
  const url = generateWhatsAppURL(message);
  window.open(url, '_blank');
};

// Track WhatsApp clicks for analytics
export const trackWhatsAppClick = (source: string, productName?: string) => {
  // Analytics tracking can be added here
  console.log('WhatsApp inquiry initiated', { source, productName });
};
