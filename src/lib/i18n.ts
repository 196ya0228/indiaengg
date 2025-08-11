// i18n (Internationalization) system for India Engineering Works
// Supporting English, Hindi, Marathi, Gujarati, and Punjabi

export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationFile {
  [key: string]: Translation;
}

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  hi: { name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  mr: { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

// Translation data
export const translations: Record<LanguageCode, TranslationFile> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      viewAll: 'View All',
      showMore: 'Show More',
      showLess: 'Show Less',
      getQuote: 'Get Quote',
      contactUs: 'Contact Us',
      readMore: 'Read More',
      learnMore: 'Learn More'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      services: 'Services',
      videos: 'Videos',
      contact: 'Contact',
      admin: 'Admin',
      homePage: 'Home Page',
      companyProfile: 'Company Profile',
      ourProducts: 'Our Products',
      contactUs: 'Contact Us',
      callDirect: 'Call Direct',
      instantResponse: 'Instant Response'
    },
    header: {
      companyName: 'INDIA ENGINEERING WORKS',
      tagline: 'Manufacturing Excellence Since 1988',
      callUs: 'Call Us',
      whatsapp: 'WhatsApp',
      businessHours: 'Business Hours: Mon-Sun 8:00 AM - 8:00 PM IST',
      businessHoursShort: '8AM-8PM',
      manufacturingUnit: 'Manufacturing Unit: Muzaffarnagar, Uttar Pradesh, India',
      locationShort: 'Muzaffarnagar, UP, India',
      locationMobile: 'Muzaffarnagar UP',
      viewOnMaps: 'View on Maps',
      gstReg: 'GST REG',
      verifiedManufacturer: 'VERIFIED MANUFACTURER',
      verified: 'VERIFIED',
      call: 'Call',
      call1: 'Call 1',
      call2: 'Call 2',
      whatsappInquiry: 'WhatsApp Inquiry',
      trustedSeller: 'TRUSTED SELLER',
      isoStandards: 'ISO Standards',
      msmeCertified: 'MSME Certified'
    },
    hero: {
      title: 'Premium Sugar Plant & Jaggery Making Machinery',
      subtitle: 'Trusted manufacturer of high-quality sugar processing equipment and jaggery making machines since 1988',
      getStarted: 'Get Started',
      watchVideo: 'Watch Video',
      trustedBy: 'Trusted by 500+ customers across India',
      sugarPlantBadge: 'SUGAR PLANT & SPARE PARTS',
      sugarPlantTitle: 'SUGAR PLANT &',
      spareParts: 'SPARE PARTS',
      weDeliver: 'WE DELIVER WHAT WE PROMISE',
      description: 'Specialized in Mini Sugar Plants, Jaggery Making Machines, Sugar Cane Crushers, Sugar Mill Gears, Gur Production Equipment, Khandsari Plant, Sugar Refinery Machinery, Jaggery Plant Setup',
      getQuoteNow: 'Get Quote Now',
      viewProducts: 'View Products',
      imageAlt: 'Industrial Sugar Plant Machinery'
    },
    about: {
      title: 'About Us',
      subtitle: 'Leading manufacturer of sugar processing machinery',
      experience: 'Years of Experience',
      customers: 'Happy Customers',
      products: 'Products',
      description: 'India Engineering Works has been at the forefront of sugar and jaggery processing technology for over three decades. We specialize in manufacturing high-quality machinery that ensures efficiency, durability, and cost-effectiveness.'
    },
    products: {
      title: 'Our Products',
      subtitle: 'Premium machinery for sugar and jaggery production',
      ourProducts: 'OUR PRODUCTS',
      premiumIndustrial: 'Premium Industrial',
      machinery: 'Machinery',
      description: 'Specialized manufacturer of Mini Sugar Plants, Jaggery Making Machines, Gur Production Equipment, Sugar Cane Crushers, Khandsari Plants, Sugar Mill Gearboxes, Jaggery Plant Setup, Sugar Refinery Machinery, and Complete Sugar Processing Solutions.',
      categories: 'Categories',
      allProducts: 'All Products',
      featured: 'Featured',
      new: 'New',
      popular: 'Popular',
      specifications: 'Specifications',
      features: 'Features',
      applications: 'Applications',
      jaggeryPlant: 'Jaggery & Gur Production Plant',
      sugarCrushers: 'Sugar Cane Crushing & Processing',
      miniSugarPlant: 'Mini Sugar Plant & Refinery',
      khandsariEquipment: 'Khandsari Sugar Equipment',
      spareParts: 'Sugar Mill Spare Parts'
    },
    videos: {
      title: 'Product Videos',
      subtitle: 'Watch our machinery in action and see the quality craftsmanship that goes into every product',
      followUs: 'Follow Us for More Videos',
      followUsDescription: 'Stay updated with our latest machinery videos and industry insights',
      productVideos: 'Product Videos',
      description: 'Watch our machinery in action and see the quality craftsmanship that goes into every product.',
      allVideos: 'All Videos',
      jaggeryMachines: 'Jaggery Machines',
      sugarPlants: 'Sugar Plants',
      crushers: 'Crushers',
      spareParts: 'Spare Parts',
      installation: 'Installation',
      maintenance: 'Maintenance',
      testimonials: 'Customer Testimonials',
      noVideosFound: 'No videos found',
      noVideosDescription: 'No videos available for the selected category.',
      duration: 'Duration',
      category: 'Category',
      share: 'Share',
      watch: 'Watch'
    },
    company: {
      aboutCompany: 'ABOUT COMPANY',
      natureOfBusiness: 'Nature of Business',
      manufacturer: 'Manufacturer',
      establishedYear: 'Established Year',
      annualTurnover: 'Annual Turnover',
      legalStatus: 'Legal Status of Firm',
      gstNumber: 'GST No.',
      location: 'Location',
      contactInfo: 'Contact Information',
      address: 'Address',
      yearsExperience: 'Years Experience',
      happyClients: 'Happy Clients',
      premiumQuality: 'Premium Quality Products',
      perfectFinishing: 'Perfect Finishing',
      transparentPolicies: 'Transparent and Ethical Policies',
      customerSatisfaction: 'Customer Satisfaction',
      verifiedExporter: 'Verified Exporter & Trust Seal',
      verifiedSupplier: 'Verified Supplier & Trust Seal',
      defaultDescription: 'Machines form an essential part of all industries. Various industries require different types of machines for carrying out production, packaging, and many other processes. Therefore, we, India Engineering Works, started manufacturing a variety of heavy machines.'
    },
    cta: {
      title: 'Ready to Get Started?',
      subtitle: 'Contact us today for a personalized quote and consultation',
      instantQuote: 'Get Instant Quote',
      detailedInquiry: 'Detailed Inquiry Form',
      whatsappContact: 'WhatsApp Contact',
      callDirect: 'Call Direct',
      sendPrice: 'We Send You the Price Immediately'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      workingHours: 'Working Hours',
      sendMessage: 'Send Message',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      yourPhone: 'Your Phone',
      subject: 'Subject',
      message: 'Message',
      messagePlaceholder: 'Tell us about your requirements...'
    },
    footer: {
      description: 'Leading manufacturer of sugar processing and jaggery making machinery since 1988',
      quickLinks: 'Quick Links',
      products: 'Products',
      services: 'Services',
      followUs: 'Follow Us',
      contact: 'Contact Info',
      copyright: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    },
    admin: {
      dashboard: 'Admin Dashboard',
      login: 'Login',
      logout: 'Logout',
      products: 'Products',
      categories: 'Categories',
      videos: 'Videos',
      socialMedia: 'Social Media',
      settings: 'Settings',
      security: 'Security',
      companyInfo: 'Company Info'
    }
  },
  hi: {
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      save: 'सेव ���रें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      search: 'खोजें',
      filter: 'फिल्टर',
      viewAll: 'सभी देखें',
      showMore: 'और दिखाएं',
      showLess: 'कम दिखाएं',
      getQuote: 'कोटेशन पाएं',
      contactUs: 'संपर्क करें',
      readMore: 'और पढ़ें',
      learnMore: 'और जानें'
    },
    navigation: {
      home: 'होम',
      about: 'हमारे बारे में',
      products: 'उत्पाद',
      services: 'सेवाएं',
      videos: 'वीडियो',
      contact: 'संपर्क',
      admin: '���डमिन',
      homePage: 'मुख्य पृष्ठ',
      companyProfile: 'कंपनी ���्रोफाइल',
      ourProducts: 'हमारे उत्पाद',
      contactUs: 'संपर्क करें',
      callDirect: 'सीधे कॉल करें',
      instantResponse: 'तुरंत जवाब'
    },
    header: {
      companyName: 'इंडिया इंजीनियरिंग वर्क्स',
      tagline: '1988 से निर्माण उत्कृष्टता',
      callUs: 'हमें कॉल करें',
      whatsapp: 'व्हाट्सएप',
      businessHours: 'व्यावसायिक समय: सोम-रवि सुबह 8:00 - रात 8:00 IST',
      businessHoursShort: '8AM-8PM',
      manufacturingUnit: 'निर्माण इकाई: मुजफ्फरनगर, उत्तर प्रदेश, भारत',
      locationShort: 'मुजफ्फरनगर, UP, भारत',
      locationMobile: 'मुजफ्फरनगर UP',
      viewOnMaps: 'मानचित्र पर देखें',
      gstReg: 'GST रेग',
      verifiedManufacturer: 'सत्यापित निर्माता',
      verified: 'सत्यापित',
      call: 'कॉल',
      call1: 'कॉल 1',
      call2: 'कॉल 2',
      whatsappInquiry: 'व्ह�����्सएप पूछताछ',
      trustedSeller: 'विश्वसनीय विक्रेता',
      isoStandards: 'ISO मानक',
      msmeCertified: 'MSME प्रमाणित'
    },
    hero: {
      title: 'प्रीमियम शुगर प्लांट और गुड़ बनाने की मशीनरी',
      subtitle: '1988 से उच्च गुणवत्ता वाले शुगर प्रोसेसिंग उपकरण और गुड़ बनाने की मशीनों के विश्वसनीय निर्माता',
      getStarted: 'शुरू करें',
      watchVideo: 'वीडियो देखें',
      trustedBy: 'भारत भर के 500+ ग्रा���कों द्वारा विश्वसनीय',
      sugarPlantBadge: 'शुगर प्लांट और स्पेयर पार्ट्स',
      sugarPlantTitle: 'शुगर प्लांट और',
      spareParts: 'स्पेयर पार्ट्स',
      weDeliver: 'हम ���ही देते हैं जो हम वादा करते हैं',
      description: 'मिनी शुगर प्लांट्स, गुड़ बनाने की मशीनें, शुगर केन क्रशर्स, शुगर मिल गियर्स, गुड़ उत्पादन उपकरण, खांडसारी प्लांट, शुगर रिफाइ���री मशीनरी, गुड़ प्लांट सेटअप में विशेषज्ञ',
      getQuoteNow: 'अभी कोटेशन पाएं',
      viewProducts: 'उत्पाद देखें',
      imageAlt: 'औद्योगिक शुगर प्लांट मशीनरी'
    },
    about: {
      title: 'हमारे बारे में',
      subtitle: 'शुगर प्रोसेसिंग मशीनरी के अग्रणी निर्माता',
      experience: 'वर्षो�� का अनुभव',
      customers: 'खुश ग्राहक',
      products: 'उत्पाद',
      description: 'इंडिया इंजीनियरिंग वर्क्स तीन दशकों से शुगर और गुड़ प्रोसेसिंग तकनीक मे�� अग्रणी रहा है। हम उच्च गुणवत्ता वाली मशीनरी के निर्माण में विशेषज्ञ हैं जो दक्षता, स्थायित्व और लागत-प्रभावशीलता सुनिश्चित करती है।'
    },
    products: {
      title: 'हमारे उत्पाद',
      subtitle: 'शुगर और गुड़ उत्पादन के लिए प्रीमियम मशीनरी',
      categories: 'श्रेणियां',
      allProducts: 'सभी उत्पाद',
      featured: 'फीचर्ड',
      new: 'नया',
      popular: 'लोकप्रिय',
      specifications: 'विशेषताएं',
      features: 'फीचर्स',
      applications: 'अनुप्रयोग',
      jaggeryPlant: 'गुड़ और गूल उत���पादन प्लांट',
      sugarCrushers: 'शुगर केन क्रशिंग और प्रोसेसिंग',
      miniSugarPlant: 'मिनी शुगर प्लांट और रिफ���इनरी',
      khandsariEquipment: 'खांडसारी शुगर उपकरण',
      spareParts: 'शुगर मिल स्पेयर पार्ट्स'
    },
    videos: {
      title: 'उत्पाद वीडियो',
      subtitle: 'हमारी मशीनरी को काम में देखें और हर उत्पाद में जाने वाली गुणवत्ता शिल्पकारिता को देखें',
      followUs: 'अधिक वीडियो के लिए हमें फॉलो करें',
      stayUpdated: 'हमारे नवीनतम मशीनरी वीडियो और उद्योग अंतर्दृष्टि के साथ अपडेट रहें',
      duration: 'अवधि',
      category: 'श्रेणी',
      share: 'साझा करें',
      watch: 'देखें'
    },
    cta: {
      title: 'शुरू करने के ��िए तैयार हैं?',
      subtitle: 'व्यक्तिगत कोटेशन और परामर्श के लिए आज ही हमसे संपर्क करें',
      instantQuote: 'तुरंत कोटेशन पाएं',
      detailedInquiry: 'विस्तृत पूछताछ फॉर्म',
      whatsappContact: 'व्हाट्सएप संपर्क',
      callDirect: 'सीधे कॉल करें',
      sendPrice: 'हम आपको तुरंत कीमत भेजते हैं'
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'हमारी टी��� से संपर्क करें',
      address: 'पता',
      phone: 'फोन',
      email: 'ईमेल',
      workingHours: 'कार्य समय',
      sendMessage: 'सं���ेश भेजे���',
      yourName: 'आपका नाम',
      yourEmail: 'आपका ईमेल',
      yourPhone: 'आपका फोन',
      subject: 'विषय',
      message: 'संदेश',
      messagePlaceholder: 'हमें अपनी आवश्यकताओं के बारे में बताएं...'
    },
    footer: {
      description: '1988 से श���गर प्रोसेसिंग और गुड़ बनाने की मशीनरी के अग्रणी निर्माता',
      quickLinks: 'त्वरित लिंक',
      products: 'उत्पाद',
      services: '���ेवाएं',
      followUs: 'हमें फॉलो करें',
      contact: 'संपर्क जानकार��',
      copyright: 'सभी अधिकार सुरक्षित।',
      privacyPolicy: 'गोपनीयता नीति',
      termsOfService: 'सेवा की शर्तें'
    },
    admin: {
      dashboard: 'एडमिन डैशबोर��ड',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      products: 'उत्पाद',
      categories: 'श्रेणियां',
      videos: 'वीडियो',
      socialMedia: 'सोशल मीडिया',
      settings: 'सेटिंग्स',
      security: 'सुरक्षा',
      companyInfo: 'कंपनी जानकारी'
    }
  },
  mr: {
    common: {
      loading: 'लोड होत आहे...',
      error: 'त्रुटी',
      success: 'यश',
      save: 'सेव्ह करा',
      cancel: 'रद्द करा',
      edit: 'स��पादित करा',
      delete: 'हटवा',
      search: 'शोधा',
      filter: 'फिल्टर',
      viewAll: 'सर्व पहा',
      showMore: 'अधिक दाखवा',
      showLess: 'कमी दाखव��',
      getQuote: 'कोटेशन मिळवा',
      contactUs: 'संपर्क साधा',
      readMore: 'अधिक वाचा',
      learnMore: 'अधिक जाणून घ्या'
    },
    navigation: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      products: 'उत्पादने',
      services: 'सेवा',
      videos: 'व्हिडिओ',
      contact: 'संपर्क',
      admin: 'प्रशासक',
      homePage: 'मुख्यपृष्ठ',
      companyProfile: 'कंपनी प्रोफाईल',
      ourProducts: 'आमची उत्पादने',
      contactUs: 'संपर्क साधा',
      callDirect: 'थेट कॉल करा',
      instantResponse: 'तत्काळ प्रतिसाद'
    },
    header: {
      companyName: 'इंडिया इंजिनीअरिंग वर्क्स',
      tagline: '1988 पासून उत्पादन उत्कृष्टता',
      callUs: 'आम्हाला कॉल करा',
      whatsapp: 'व्हाट्सअॅप',
      businessHours: 'व्यावसायिक वेळ: सोम-रवि सकाळी 8:00 - रात्री 8:00 IST',
      businessHoursShort: '8AM-8PM',
      manufacturingUnit: 'निर्माण इकाई: मुजफ्फरनगर, उत्तर प्रदेश, भारत',
      locationShort: 'मुजफ्फरनगर, UP, भारत',
      locationMobile: 'मुजफ्फरनगर UP',
      viewOnMaps: 'मानचित्रावर पहा',
      gstReg: 'GST रेग',
      verifiedManufacturer: 'सत्यापित निर्माता',
      verified: 'सत्यापित',
      call: 'कॉल',
      call1: 'कॉल 1',
      call2: 'कॉल 2',
      whatsappInquiry: 'व्हाट्सअॅप चौकशी',
      trustedSeller: 'भरवसायोग्य विक्रेता',
      isoStandards: 'ISO मानके',
      msmeCertified: 'MSME प्रमाणित'
    },
    hero: {
      title: 'प्रीमियम साखर प्लांट आणि गूळ बनविण्याची यंत्रे',
      subtitle: '1988 पासून उच्च दर��जाच्या साखर प्रक्रिया उपकरणे आणि गूळ बनविण्याच्या यंत्रांचे विश्वासार्ह निर्माते',
      getStarted: '��ुरुवात करा',
      watchVideo: 'व्हिडिओ पहा',
      trustedBy: 'भारतातील 500+ ग्राहकांचा विश्वास',
      sugarPlantBadge: 'साखर प्लांट आणि स्पेअर पार्ट्स',
      sugarPlantTitle: 'साखर प्लांट आणि',
      spareParts: 'स्प��अर पार्ट्स',
      weDeliver: 'आम्ही जे वचन देतो ते पुरवतो',
      description: 'मिनी साखर प्लांट्स, गूळ बनविण्याची यंत्रे, ऊस गाळणी यंत्रे, साखर मिल गियर्स, गूळ उत्पादन उपकरणे, खांडसारी प��लांट, साखर शुद्धीकरण यंत्रसामग्री, गूळ प्लांट सेटअप मध्ये तज्ञ',
      getQuoteNow: 'आता कोटेशन मिळवा',
      viewProducts: 'उत्��ादने पहा',
      imageAlt: 'औद्योगिक साखर प्लांट यंत्रसामग्री'
    },
    about: {
      title: 'आमच्याबद्दल',
      subtitle: 'साखर प्रक्रिया यंत्रांचे अग्रणी निर्माते',
      experience: 'वर्षांचा अनुभव',
      customers: 'समाधानी ग्राहक',
      products: 'उत्पादने',
      description: 'इंडिया इंजिनीअरिंग वर्क्स तीन दशकांपासून साखर आणि गूळ प्रक्रिया तंत्रज्ञानात आघाडीवर आहे। आम्ही उच्च दर्जाच्या यंत्रसामग्रीच्या निर्मितीमध्ये तज्ञ आहोत जे कार्यक्षमता, टिकाऊपणा आणि किफायतशीरता सु���िश्चित करते.'
    },
    products: {
      title: 'आमची उत्पादने',
      subtitle: 'साखर आणि गूळ उत्पादनासाठी प्रीमियम यंत्रसामग्री',
      categories: 'श्रेणी',
      allProducts: 'सर्व उत्पादने',
      featured: 'वैशिष्ट्यीकृत',
      new: 'नवीन',
      popular: 'लोकप्��िय',
      specifications: 'तपशील',
      features: 'वैशिष्ट्ये',
      applications: 'अनुप्रयोग'
    },
    videos: {
      title: 'उत्पादन व्हिडिओ',
      subtitle: 'आमची यंत्रे कार्यात पहा आणि प्रत्येक उत्पादनात जाणाऱ्या दर���जेदार कारागिरी पहा',
      followUs: 'अधिक व्हिडिओसाठी आम्हाला फॉलो करा',
      stayUpdated: 'आमच्या नवीनतम यंत्रसामग्री व्हिडिओ आणि उद्योग अंतर्दृष्टीसह अपडेट रहा',
      duration: 'कालावधी',
      category: 'श्रेणी',
      share: 'शेअर करा',
      watch: 'पहा'
    },
    cta: {
      title: 'सुरुवात करायला तयार आहात?',
      subtitle: 'वैयक्तिक कोटेशन आणि सल���लामसलतीसाठी आज आमच्याशी संपर्क साधा',
      instantQuote: 'तत्काळ कोटेशन मिळवा',
      detailedInquiry: 'तप���ील���ार चौकशी फॉर्म',
      whatsappContact: 'व्हाट्सअॅप संपर्क',
      callDirect: 'थेट कॉल करा',
      sendPrice: 'आम्ही तुम्हाला लगेच किंमत पाठवतो'
    },
    contact: {
      title: 'संपर्क साधा',
      subtitle: 'आमच्या टीमशी संपर्क साधा',
      address: 'पत्ता',
      phone: 'फोन',
      email: 'ईमेल',
      workingHours: 'कामाचे तास',
      sendMessage: 'संदेश पाठवा',
      yourName: 'तुमचे नाव',
      yourEmail: 'तुमचा ईमेल',
      yourPhone: 'तुमचा फोन',
      subject: 'विषय',
      message: 'संदेश',
      messagePlaceholder: 'आमच्या गरजांबद्दल सांगा...'
    },
    footer: {
      description: '1988 पासून साखर प्रक्रिया आणि गूळ बनविण्याच्या यंत्���ांचे अग्रणी निर्माते',
      quickLinks: 'द्रुत दुवे',
      products: 'उत्पादने',
      services: 'सेवा',
      followUs: 'आम���हाला फॉलो करा',
      contact: 'संपर्क माहिती',
      copyright: 'सर्व हक्क राखून ठेवलेले.',
      privacyPolicy: 'गोपनीयता धोरण',
      termsOfService: 'सेवा अटी'
    },
    admin: {
      dashboard: 'प्रशासक डॅशबोर्ड',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      products: 'उत्पादने',
      categories: 'श्रेणी',
      videos: 'व्हिडिओ',
      socialMedia: 'सामाजिक माध्यम',
      settings: 'सेटिंग्ज',
      security: 'सुरक्षा',
      companyInfo: 'कंपनी माहिती'
    }
  },
  gu: {
    common: {
      loading: 'લોડ થઈ રહ્યું છે...',
      error: 'ભૂલ',
      success: 'સફળતા',
      save: 'સેવ કરો',
      cancel: 'રદ કરો',
      edit: 'સંપાદિત કરો',
      delete: 'કાઢી નાખો',
      search: 'શોધો',
      filter: 'ફિલ્ટર',
      viewAll: 'બધું જુઓ',
      showMore: 'વધુ બતાવો',
      showLess: 'ઓછું બતાવો',
      getQuote: 'ભા�� મેળવો',
      contactUs: 'અમારો સંપર્ક કરો',
      readMore: 'વધુ વાંચો',
      learnMore: 'વધુ જાણો'
    },
    navigation: {
      home: 'મુખ્ય',
      about: 'અમારા વિશે',
      products: 'ઉત્પાદનો',
      services: 'સેવાઓ',
      videos: 'વી��િયો',
      contact: 'સંપર્ક',
      admin: 'એડમિન'
    },
    header: {
      companyName: 'ઇન્ડિયા એન્જિનીયરિંગ વર્ક્સ',
      tagline: '1988 થી ઉત્પાદન ઉત્કૃષ્ટતા',
      callUs: 'અમને કૉલ કરો',
      whatsapp: 'વ્હોટ્સએપ',
      businessHours: 'વ્યવસાયિક સમય: સો��-રવિ સવારે 8:00 - રાત્રે 8:00 IST',
      businessHoursShort: '8AM-8PM',
      manufacturingUnit: 'ઉત્પાદન એકમ: મુજફ્ફરનગર, ઉત્તર પ્રદેશ, ભારત',
      locationShort: 'મુજફ્ફરનગર, UP, ભારત',
      locationMobile: 'મુજફ્ફરનગર UP',
      viewOnMaps: 'નકશા પર જુઓ',
      gstReg: 'GST રેજ',
      verifiedManufacturer: 'સ���્યાપિત ઉત્પાદક',
      verified: 'સત્યાપિત',
      call: 'કૉલ',
      call1: 'કૉલ 1',
      call2: 'કૉલ 2',
      whatsappInquiry: 'વ્હોટ્સએપ પૂછપરછ',
      trustedSeller: 'ભરોસાપાત્ર વેચાણકર્તા',
      isoStandards: 'ISO માનદંડો',
      msmeCertified: 'MSME પ્રમાણિત'
    },
    hero: {
      title: 'પ્રીમિયમ સુગર પ્લાન્ટ અને ગોળ બનાવવાની મશીનરી',
      subtitle: '1988 થી ઉચ્ચ ��ુણવત્તાવાળા સુગર પ્રોસેસિંગ સાધનો અને ગોળ બનાવવાની મશી���ોના વિશ્વસનીય ઉત્પાદક',
      getStarted: 'શરૂઆત કરો',
      watchVideo: 'વીડિયો જુઓ',
      trustedBy: 'ભારતમાં 500+ ગ્રાહકોનો ભરોસો',
      sugarPlantBadge: 'સુગર પ્લાન્ટ અને સ્પેર પાર્ટ્સ',
      sugarPlantTitle: 'સુગર પ્લાન્ટ અને',
      spareParts: 'સ્પેર પાર્ટ્સ',
      weDeliver: 'અમે જે ��ચન આપીએ છીએ તે પૂરું પાડીએ છીએ',
      description: 'મિની સુગર પ્લાન્ટ્સ, ગોળ બનાવવાની મશીનો, શેરડી કચરવાની મશીનો, ��ુગર મિલ ગિયર્સ, ગોળ ઉત્પાદન સાધનો, ખાંડસારી પ્લાન્ટ, સુગર રિફાઈનરી મશીનરી, ગોળ પ્લાન્ટ સેટઅપમાં નિષ્ણાત',
      getQuoteNow: 'હવે ભાવ મેળવો',
      viewProducts: 'ઉત્પાદનો જુઓ',
      imageAlt: 'ઔદ્યોગિક સુગર પ્લાન્ટ મશીનરી'
    },
    about: {
      title: 'અમાર�� વિશે',
      subtitle: 'સુ��ર પ્રોસેસિંગ મશીનરીના અગ્રણી ઉત્પાદક',
      experience: 'વર્ષોનો અનુભવ',
      customers: 'ખુશ ગ્રાહકો',
      products: 'ઉત્પાદનો',
      description: '��ન્ડિયા એન્જિનીયરિંગ વર્ક્સ ત્રણ દાયકાથી સુગર અને ગોળ પ્રોસેસિંગ ટેકનોલો��ીમાં અગ્રેસર છે. અમે ઉચ્ચ ગુણવત્તાવાળી મશીનરીના ઉત્પાદનમાં નિષ્ણાત છીએ જે કાર્યક્ષમતા, ટકાઉપણું અ���� લાગત-અસરકારકતા સુનિશ્ચિત કરે છે.'
    },
    products: {
      title: 'અમારા ઉત્પાદનો',
      subtitle: 'સુગર અને ગોળ ઉત્પાદન માટે પ્રીમિયમ મશીનરી',
      categories: 'શ્રેણીઓ',
      allProducts: 'બધા ઉત્પાદનો',
      featured: 'ફીચર્ડ',
      new: 'નવું',
      popular: 'લોકપ્રિય',
      specifications: 'વિશેષતાઓ',
      features: 'લક્ષણો',
      applications: 'એપ્લિકેશન'
    },
    videos: {
      title: 'ઉત્પાદન વીડિયો',
      subtitle: 'અમારી મશીનરીને કામમાં જુઓ અને દરેક ઉત્પાદનમાં જતી ગુણવત્તાવાળી કારીગરી જુઓ',
      followUs: 'વધુ વીડિયો માટે અમને ફોલો કરો',
      stayUpdated: 'અમારા નવીનતમ મશીનરી વીડિયો અને ઉદ્યોગ અંતર્દૃષ્ટિ સાથે અપડેટ રહો',
      duration: 'અવધિ',
      category: 'શ્રેણી',
      share: 'શેર કરો',
      watch: 'જુઓ'
    },
    cta: {
      title: 'શરૂ કરવા તૈયાર છો?',
      subtitle: 'વ્યક્તિગત ભાવ અને સલાહ માટે આજે અમારો સંપર્ક કરો',
      instantQuote: 'તાત્કાલિક ભાવ મેળવો',
      detailedInquiry: 'વિગતવાર પૂછપરછ ફોર્મ',
      whatsappContact: 'વ્હોટ્સએપ સંપર્ક',
      callDirect: 'સીધો કૉલ કરો',
      sendPrice: 'અમે તમને તાત્કાલિક ભાવ મોકલીએ છીએ'
    },
    contact: {
      title: 'સંપર્ક કરો',
      subtitle: 'અમારી ટીમ સાથે સ��પર્કમાં રહો',
      address: 'સરનામું',
      phone: 'ફોન',
      email: 'ઇમેઇલ',
      workingHours: 'કામના કલાકો',
      sendMessage: 'સંદેશ મોકલો',
      yourName: 'તમારું નામ',
      yourEmail: 'તમારો ઇમેઇલ',
      yourPhone: 'તમારો ફોન',
      subject: 'વિષય',
      message: 'સંદેશ',
      messagePlaceholder: 'તમારી આવશ્ય�����તાઓ વિશે અમને કહો...'
    },
    footer: {
      description: '1988 થી સુગર પ્રોસેસિંગ અને ગોળ બનાવવાની મશીનરીના અગ્રણી ઉત્પાદક',
      quickLinks: 'ઝડપી લિંક્સ',
      products: 'ઉત્પાદનો',
      services: 'સેવાઓ',
      followUs: 'અમને ફોલો કરો',
      contact: 'સંપર્ક માહિતી',
      copyright: 'બધા અધિકારો સુરક્ષિત.',
      privacyPolicy: 'ગોપનીયતા નીતિ',
      termsOfService: 'સેવાની શરતો'
    },
    admin: {
      dashboard: 'એડમિન ડેશબોર્ડ',
      login: 'લોગિન',
      logout: 'લોગઆઉટ',
      products: 'ઉત્પાદનો',
      categories: 'શ્રેણીઓ',
      videos: 'વીડિયો',
      socialMedia: 'સોશિયલ મીડિયા',
      settings: 'સેટિંગ્સ',
      security: 'સુરક્ષા',
      companyInfo: 'કંપની માહિતી'
    }
  },
  pa: {
    common: {
      loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      error: 'ਗਲਤੀ',
      success: 'ਸਫਲਤਾ',
      save: 'ਸੇਵ ਕਰੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      edit: 'ਸੋਧੋ',
      delete: 'ਮਿਟਾਓ',
      search: 'ਖੋਜੋ',
      filter: 'ਫਿਲਟਰ',
      viewAll: 'ਸਭ ਦੇਖੋ',
      showMore: 'ਹੋਰ ਦਿਖਾਓ',
      showLess: 'ਘੱਟ ਦਿਖਾਓ',
      getQuote: 'ਕੋਟੇਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ',
      contactUs: 'ਸਾਨੂੰ ਸੰਪਰਕ ਕਰੋ',
      readMore: 'ਹੋਰ ਪੜ੍ਹੋ',
      learnMore: 'ਹੋਰ ਜਾਣੋ'
    },
    navigation: {
      home: 'ਮੁੱਖ ਪੰਨਾ',
      about: 'ਸਾਡੇ ਬਾਰੇ',
      products: 'ਉਤਪਾਦ',
      services: 'ਸੇਵਾਵਾਂ',
      videos: 'ਵੀਡੀਓ',
      contact: 'ਸੰਪਰ��',
      admin: 'ਐਡਮਿਨ'
    },
    header: {
      companyName: 'ਇੰਡੀਆ ਇੰਜੀਨੀਅਰਿੰਗ ਵਰਕਸ',
      tagline: '1988 ਤੋਂ ਨਿਰਮਾਣ ਉਤਕਿਰਸ਼ਟਤਾ',
      callUs: 'ਸਾਨੂੰ ਕਾਲ ਕਰੋ',
      whatsapp: 'ਵਟਸਐਪ',
      businessHours: 'ਕੰਮ ਦੇ ਘੰਟੇ: ਸੋਮ-ਰਵੀ ਸਵੇਰੇ 8:00 - ਰਾਤ 8:00 IST',
      businessHoursShort: '8AM-8PM',
      manufacturingUnit: 'ਨਿਰਮਾਣ ਇਕਾਈ: ਮੁਜ਼ੱਫਰਨਗਰ, ਉੱਤਰ ਪ੍ਰਦੇਸ਼, ਭਾਰਤ',
      locationShort: 'ਮੁਜ਼ੱਫਰਨਗਰ, UP, ਭਾਰਤ',
      locationMobile: 'ਮੁਜ਼ੱਫਰਨਗਰ UP',
      viewOnMaps: 'ਨਕਸ਼ੇ ਤੇ ਵੇਖੋ',
      gstReg: 'GST ਰੇਜ',
      verifiedManufacturer: 'ਪ੍ਰਮਾਣਿਤ ਨਿਰਮਾਤਾ',
      verified: 'ਪ੍ਰਮਾਣਿਤ',
      call: 'ਕਾਲ',
      call1: 'ਕਾਲ 1',
      call2: 'ਕਾਲ 2',
      whatsappInquiry: 'ਵਟਸਐਪ ਪੁੱਛਗਿੱਛ',
      trustedSeller: 'ਭਰੋਸੇਮੰਦ ਵੇਚਾਰ',
      isoStandards: 'ISO ਮਾਨਕ',
      msmeCertified: 'MSME ਪ੍ਰਮਾਣਿਤ'
    },
    hero: {
      title: 'ਪ੍ਰੀਮੀਅਮ ਸ਼ੂਗਰ ਪਲਾਂਟ ਅਤ�� ਗੁੜ ਬਣਾਉਣ ਦੀ ਮਸ਼ੀਨਰੀ',
      subtitle: '1988 ਤੋਂ ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੇ ਸ਼ੂਗਰ ਪ੍ਰੋਸੈਸਿੰਗ ਉਪਕਰਣ ਅਤੇ ਗੁੜ ਬਣਾਉਣ ਦੀਆਂ ਮਸ਼ੀਨਾਂ ਦੇ ਭਰੋਸੇਮੰਦ ਨਿਰਮਾਤਾ',
      getStarted: 'ਸ਼ੁਰੂਆਤ ਕਰੋ',
      watchVideo: 'ਵੀਡੀਓ ਦੇਖੋ',
      trustedBy: 'ਭਾਰਤ ਭਰ ਦੇ 500+ ਗਾਹਕਾਂ ਦਾ ਭਰੋਸਾ',
      sugarPlantBadge: 'ਸ਼ੂਗਰ ਪਲਾਂਟ ਅਤੇ ਸਪੇਅਰ ਪਾਰਟਸ',
      sugarPlantTitle: 'ਸ਼ੂਗਰ ਪਲਾਂਟ ਅਤੇ',
      spareParts: 'ਸਪੇਅਰ ਪਾਰਟਸ',
      weDeliver: 'ਅਸੀਂ ਜੋ ਵਾਅਦਾ ਕਰਦੇ ਹਾਂ ਉਹ ਪੂ��ਾ ਕਰਦੇ ਹਾਂ',
      description: 'ਮਿੰਨੀ ਸ਼ੂਗਰ ਪਲਾਂਟਸ, ਗੁੜ ਬਣਾਉਣ ਦੀਆਂ ਮਸ਼ੀਨਾਂ, ਗੰਨਾ ਕੁਚਲਣ ਵਾਲੀਆਂ ਮਸ਼ੀਨਾਂ, ਸ਼ੂਗਰ ਮਿਲ ਗਿਅਰਸ, ਗੁੜ ਉਤਪਾਦਨ ਉਪਕਰਣ, ਖੰਡਸਾਰੀ ਪਲਾਂਟ, ਸ਼ੂਗਰ ਰਿਫਾਇਨਰੀ ਮਸ਼ੀਨਰੀ, ਗੁੜ ਪਲਾਂਟ ਸੈਟਅਪ ਵਿੱਚ ਮਾਹਰ',
      getQuoteNow: 'ਹੁਣ ਕੋਟੇਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ',
      viewProducts: 'ਉਤਪਾਦ ਦੇਖੋ',
      imageAlt: 'ਉਦਯੋਗਿਕ ਸ਼ੂਗਰ ਪਲਾਂਟ ਮਸ਼ੀਨਰੀ'
    },
    about: {
      title: 'ਸਾਡੇ ਬਾਰੇ',
      subtitle: 'ਸ਼ੂਗਰ ਪ੍ਰੋਸੈਸਿੰਗ ਮਸ਼ੀਨਰੀ ਦੇ ਮੋਹਰੀ ਨਿਰਮਾਤਾ',
      experience: '���ਾਲਾਂ ਦਾ ���ਜ���ਬਾ',
      customers: 'ਖੁਸ਼ ਗਾਹਕ',
      products: 'ਉਤਪਾਦ',
      description: 'ਇੰਡੀਆ ਇੰਜੀਨੀਅਰਿੰਗ ਵਰਕਸ ਤਿੰਨ ਦਹਾਕਿਆਂ ਤੋਂ ਸ਼ੂਗਰ ਅਤੇ ਗੁੜ ਪ੍ਰੋਸੈਸਿੰਗ ਤਕਨਾਲੋਜੀ ਵਿੱਚ ਅਗਵਾਈ ਕ�� ਰਿਹਾ ਹੈ। ਅਸੀਂ ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੀ ਮਸ਼ੀਨਰੀ ਦੇ ਨਿਰਮਾਣ ਵਿੱਚ ਮਾਹਰ ਹਾਂ ਜੋ ਕੁਸ਼ਲਤਾ, ਟਿਕਾਊਪਣ ਅਤੇ ਲਾਗਤ-ਪ੍ਰਭਾਵਸ਼ੀਲਤਾ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ।'
    },
    products: {
      title: 'ਸਾਡੇ ਉਤਪਾਦ',
      subtitle: 'ਸ਼ੂਗਰ ਅਤੇ ਗੁੜ ਉਤਪਾਦਨ ਲਈ ਪ੍ਰੀਮੀਅਮ ਮਸ਼ੀਨਰੀ',
      categories: 'ਸ਼੍ਰੇਣੀਆਂ',
      allProducts: 'ਸਾਰੇ ਉਤਪਾਦ',
      featured: 'ਫੀਚਰਡ',
      new: 'ਨਵਾਂ',
      popular: 'ਪ੍ਰਸਿੱਧ',
      specifications: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
      features: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
      applications: 'ਐਪਲੀਕੇਸ਼ਨ'
    },
    videos: {
      title: 'ਉਤਪਾਦ ਵੀਡੀਓ',
      subtitle: 'ਸਾਡੀ ਮਸ਼ੀਨਰੀ ਨੂੰ ਕੰਮ ਵਿੱਚ ਦੇਖੋ ਅਤੇ ਹਰ ਉਤਪਾਦ ਵਿੱਚ ਜਾਣ ਵਾਲੀ ਗੁਣਵੱਤਾ ਦੀ ਕਾਰੀਗਰੀ ਦੇਖੋ',
      followUs: 'ਹੋਰ ਵੀਡੀਓ ਲਈ ਸਾਨੂੰ ਫਾਲੋ ਕਰੋ',
      stayUpdated: 'ਸਾਡ�� ਨਵੀਨਤਮ ਮਸ਼ੀਨਰੀ ਵੀਡੀਓ ਅਤੇ ਉਦਯੋਗ ਸੂਝ ਨਾਲ ਅਪਡੇਟ ਰਹੋ',
      duration: 'ਅਵਧੀ',
      category: 'ਸ਼੍ਰੇਣੀ',
      share: 'ਸਾਂਝਾ ਕਰੋ',
      watch: 'ਦੇਖੋ'
    },
    cta: {
      title: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?',
      subtitle: 'ਵਿਅਕਤੀਗਤ ਕੋਟੇਸ਼ਨ ਅਤੇ ਸਲਾਹ ਲਈ ਅੱਜ ਹੀ ਸਾਨੂੰ ਸੰਪਰਕ ਕਰੋ',
      instantQuote: 'ਤੁਰੰਤ ਕੋਟੇਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ',
      detailedInquiry: 'ਵਿਸਤ੍ਰਿਤ ਪੁੱਛਗਿੱਛ ਫਾਰਮ',
      whatsappContact: 'ਵਟਸਐਪ ਸੰਪਰਕ',
      callDirect: 'ਸਿੱਧੇ ਕਾਲ ਕਰੋ',
      sendPrice: 'ਅਸੀਂ ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਕੀਮਤ ਭੇਜਦੇ ਹਾਂ'
    },
    contact: {
      title: 'ਸੰਪ��ਕ ਕਰ���',
      subtitle: 'ਸਾਡੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      address: 'ਪਤਾ',
      phone: 'ਫੋਨ',
      email: 'ਈਮੇਲ',
      workingHours: 'ਕੰਮ ਦੇ ਘੰਟੇ',
      sendMessage: 'ਸੰਦੇਸ਼ ਭੇਜੋ',
      yourName: 'ਤੁਹਾਡਾ ਨਾਮ',
      yourEmail: 'ਤੁਹਾਡਾ ਈਮੇਲ',
      yourPhone: 'ਤੁਹਾਡਾ ਫੋਨ',
      subject: 'ਵਿਸ਼ਾ',
      message: 'ਸੰਦੇਸ਼',
      messagePlaceholder: 'ਸਾਨੂੰ ਆਪਣੀਆਂ ਲੋੜਾਂ ਬਾਰੇ ਦੱਸੋ...'
    },
    footer: {
      description: '1988 ਤੋਂ ਸ਼ੂਗਰ ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਗੁੜ ਬਣਾਉਣ ਦੀ ਮਸ਼ੀਨਰੀ ਦੇ ਮੋਹਰੀ ਨਿਰਮਾਤਾ',
      quickLinks: 'ਤੇਜ਼ ਲਿੰਕ',
      products: 'ਉਤਪਾਦ',
      services: 'ਸੇਵਾਵਾਂ',
      followUs: 'ਸਾਨੂੰ ਫਾਲੋ ਕਰੋ',
      contact: 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ',
      copyright: 'ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ।',
      privacyPolicy: 'ਪ੍ਰਾਈਵੇਸੀ ਨੀਤੀ',
      termsOfService: 'ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ'
    },
    admin: {
      dashboard: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
      login: 'ਲਾਗਇਨ',
      logout: 'ਲਾਗਆਉਟ',
      products: 'ਉਤਪਾਦ',
      categories: 'ਸ਼੍ਰੇਣੀਆਂ',
      videos: 'ਵੀਡੀਓ',
      socialMedia: 'ਸੋਸ਼ਲ ਮੀਡੀਆ',
      settings: 'ਸੈਟਿੰਗਾਂ',
      security: 'ਸ���ਰੱਖਿਆ',
      companyInfo: 'ਕੰਪਨੀ ਜਾਣਕਾਰੀ'
    }
  }
};

// Utility function to get nested translation
export const getNestedTranslation = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};

// Default language
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

// Language storage key
export const LANGUAGE_STORAGE_KEY = 'iew_selected_language';

// Get current language from localStorage
export const getCurrentLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved && saved in SUPPORTED_LANGUAGES) {
    return saved as LanguageCode;
  }
  return DEFAULT_LANGUAGE;
};

// Save language to localStorage
export const saveLanguage = (language: LanguageCode): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Get translation for current language
export const getTranslation = (key: string, language?: LanguageCode): string => {
  const currentLang = language || getCurrentLanguage();
  const translation = getNestedTranslation(translations[currentLang], key);
  
  // Fallback to English if translation not found
  if (translation === key && currentLang !== 'en') {
    return getNestedTranslation(translations.en, key);
  }
  
  return translation;
};
