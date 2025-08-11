import { useState, useEffect } from 'react';

// Types for CMS data
export interface CMSProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  features: string[];
  specifications: string;
  availability: 'in-stock' | 'out-of-stock' | 'made-to-order';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CMSVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSCategory {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  order: number;
}

export interface CMSCompanyInfo {
  name: string;
  location: string;
  phoneNumbers: string[];
  whatsappNumber: string;
  email?: string;
  address?: string;
  description?: string;
  gstNumber?: string;
  establishedYear?: string;
  annualTurnover?: string;
  legalStatus?: string;
}

export interface CMSSocialMediaHandle {
  platform: string;
  platformName: string;
  url: string;
  username: string;
  displayName: string;
  description: string;
  enabled: boolean;
  primaryColor: string;
  followers?: string;
}

export interface CMSSocialMediaConfig {
  handles: CMSSocialMediaHandle[];
  displaySettings: {
    showInHeader: boolean;
    showInFooter: boolean;
    showInVideoSection: boolean;
    showFollowerCount: boolean;
  };
  lastUpdated: Date;
}

// Default data for initialization
export const defaultCMSProducts: CMSProduct[] = [
  {
    id: '1',
    title: 'Commercial Jaggery Making Machine',
    description: 'High-efficiency jaggery making machine for commercial production with automated temperature control.',
    price: '₹2,50,000',
    category: 'Jaggery Making Machine',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Automated Temperature Control', 'High Efficiency Motor', 'Food Grade Materials', '24/7 Support'],
    specifications: 'Capacity: 500kg/hour, Power: 15HP, Material: Stainless Steel, Warranty: 2 years',
    availability: 'in-stock',
    tags: ['commercial', 'automated', 'high-capacity'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Mini Sugar Plant Complete Setup',
    description: 'Complete mini sugar plant setup for small to medium scale sugar production.',
    price: '₹15,00,000',
    category: 'Mini Sugar Plant',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Complete Setup', 'Installation Included', 'Training Provided', 'Quality Assurance'],
    specifications: 'Capacity: 2 tons/day, Power: 50HP, Area Required: 1000 sq ft, Setup Time: 30 days',
    availability: 'made-to-order',
    tags: ['complete-setup', 'industrial', 'high-capacity'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Sugar Cane Crusher Heavy Duty',
    description: 'Heavy-duty sugar cane crusher designed for continuous operation and maximum juice extraction.',
    price: '₹3,75,000',
    category: 'Sugar Cane Crusher',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Heavy Duty Construction', 'Maximum Juice Extraction', 'Low Maintenance', 'High Capacity'],
    specifications: 'Capacity: 1000kg/hour, Power: 25HP, Material: Cast Iron, Warranty: 3 years',
    availability: 'in-stock',
    tags: ['heavy-duty', 'high-extraction', 'durable'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const defaultCMSCategories: CMSCategory[] = [
  {
    id: '1',
    title: 'Jaggery Making Machine',
    badge: 'BESTSELLER',
    badgeColor: 'bg-green-600',
    description: 'Commercial jaggery production equipment',
    order: 1
  },
  {
    id: '2',
    title: 'Mini Sugar Plant',
    badge: 'COMPLETE SETUP',
    badgeColor: 'bg-blue-600',
    description: 'Complete sugar production plants',
    order: 2
  },
  {
    id: '3',
    title: 'Sugar Cane Crusher',
    badge: 'HIGH CAPACITY',
    badgeColor: 'bg-orange-600',
    description: 'Sugar cane crushing equipment',
    order: 3
  },
  {
    id: '4',
    title: 'Sugar Mill Gears',
    badge: 'PRECISION',
    badgeColor: 'bg-purple-600',
    description: 'Precision gears for sugar mills',
    order: 4
  },
  {
    id: '5',
    title: 'Spare Parts',
    badge: 'SUPPORT',
    badgeColor: 'bg-red-600',
    description: 'Machine spare parts and accessories',
    order: 5
  }
];

export const defaultCMSCompanyInfo: CMSCompanyInfo = {
  name: 'India Engineering Works',
  location: 'Uttar Pradesh, India',
  phoneNumbers: ['+91-9897601094', '+91-9837200396'],
  whatsappNumber: '+91-9897601094',
  email: 'india_enggworks@yahoo.in',
  address: 'Industrial Area, Muzaffarnagar, Uttar Pradesh, India',
  description: 'Specialized manufacturer of sugar processing machinery and equipment. Machines form an essential part of all industries. Various industries require different types of machines for carrying out production, packaging, and many other processes. Therefore, we, India Engineering Works, started manufacturing a variety of heavy machines.',
  gstNumber: '09AABPI0229C1ZD',
  establishedYear: '1988',
  annualTurnover: 'Rs. 5 - 50 Cr',
  legalStatus: 'Propertiership'
};

// CMS Data Service
export class CMSDataService {
  private static instance: CMSDataService;
  private listeners: Map<string, Set<() => void>> = new Map();

  private constructor() {}

  static getInstance(): CMSDataService {
    if (!CMSDataService.instance) {
      CMSDataService.instance = new CMSDataService();
    }
    return CMSDataService.instance;
  }

  // Event system for real-time updates
  subscribe(dataType: string, callback: () => void) {
    if (!this.listeners.has(dataType)) {
      this.listeners.set(dataType, new Set());
    }
    this.listeners.get(dataType)!.add(callback);

    return () => {
      this.listeners.get(dataType)?.delete(callback);
    };
  }

  private notify(dataType: string) {
    this.listeners.get(dataType)?.forEach(callback => callback());
  }

  // Products
  getProducts(): CMSProduct[] {
    const stored = localStorage.getItem('cms_products');
    if (stored) {
      return JSON.parse(stored);
    }
    this.setProducts(defaultCMSProducts);
    return defaultCMSProducts;
  }

  setProducts(products: CMSProduct[]) {
    localStorage.setItem('cms_products', JSON.stringify(products));
    this.notify('products');
  }

  // Categories
  getCategories(): CMSCategory[] {
    const stored = localStorage.getItem('cms_categories');
    if (stored) {
      return JSON.parse(stored);
    }
    this.setCategories(defaultCMSCategories);
    return defaultCMSCategories;
  }

  setCategories(categories: CMSCategory[]) {
    localStorage.setItem('cms_categories', JSON.stringify(categories));
    this.notify('categories');
  }

  // Videos
  getVideos(): CMSVideo[] {
    const stored = localStorage.getItem('iew_videos');
    if (stored) {
      return JSON.parse(stored).filter((video: CMSVideo) => video.isActive);
    }
    return [];
  }

  // Company Info
  getCompanyInfo(): CMSCompanyInfo {
    const stored = localStorage.getItem('cms_company_info');
    if (stored) {
      return JSON.parse(stored);
    }
    this.setCompanyInfo(defaultCMSCompanyInfo);
    return defaultCMSCompanyInfo;
  }

  setCompanyInfo(info: CMSCompanyInfo) {
    localStorage.setItem('cms_company_info', JSON.stringify(info));
    this.notify('company_info');
  }

  // Social Media
  getSocialMediaConfig(): CMSSocialMediaConfig | null {
    const stored = localStorage.getItem('iew_social_media_config');
    if (stored) {
      const config = JSON.parse(stored);
      // Restore icons (they're stored as null)
      config.handles = config.handles.map((handle: any) => ({
        ...handle,
        icon: null // Icons are handled by components
      }));
      return config;
    }
    return null;
  }

  getSocialMediaLinks() {
    const stored = localStorage.getItem('iew_social_media_links');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      youtube: 'https://youtube.com/@indiaengineeringworks',
      instagram: 'https://instagram.com/indiaengineeringworks',
      facebook: 'https://facebook.com/indiaengineeringworks',
      twitter: 'https://twitter.com/iew_machines',
      linkedin: 'https://linkedin.com/company/india-engineering-works'
    };
  }
}

// React hooks for CMS data
export const useCMSProducts = () => {
  const [products, setProducts] = useState<CMSProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cms = CMSDataService.getInstance();

    const loadProducts = () => {
      setProducts(cms.getProducts());
      setLoading(false);
    };

    loadProducts();

    // Listen for both CMS changes and localStorage changes
    const unsubscribe = cms.subscribe('products', loadProducts);

    // Listen for localStorage changes from other tabs/components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cms_products') {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { products, loading };
};

export const useCMSCategories = () => {
  const [categories, setCategories] = useState<CMSCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cms = CMSDataService.getInstance();

    const loadCategories = () => {
      setCategories(cms.getCategories());
      setLoading(false);
    };

    loadCategories();

    // Listen for both CMS changes and localStorage changes
    const unsubscribe = cms.subscribe('categories', loadCategories);

    // Listen for localStorage changes from other tabs/components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cms_categories') {
        loadCategories();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { categories, loading };
};

export const useCMSVideos = () => {
  const [videos, setVideos] = useState<CMSVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cms = CMSDataService.getInstance();
    
    const loadVideos = () => {
      setVideos(cms.getVideos());
      setLoading(false);
    };

    loadVideos();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'iew_videos') {
        loadVideos();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { videos, loading };
};

export const useCMSCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CMSCompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cms = CMSDataService.getInstance();
    
    const loadCompanyInfo = () => {
      setCompanyInfo(cms.getCompanyInfo());
      setLoading(false);
    };

    loadCompanyInfo();
    
    const unsubscribe = cms.subscribe('company_info', loadCompanyInfo);
    return unsubscribe;
  }, []);

  return { companyInfo, loading };
};

export const useCMSSocialMedia = () => {
  const [socialConfig, setSocialConfig] = useState<CMSSocialMediaConfig | null>(null);
  const [socialLinks, setSocialLinks] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cms = CMSDataService.getInstance();
    
    const loadSocialMedia = () => {
      setSocialConfig(cms.getSocialMediaConfig());
      setSocialLinks(cms.getSocialMediaLinks());
      setLoading(false);
    };

    loadSocialMedia();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'iew_social_media_config' || e.key === 'iew_social_media_links') {
        loadSocialMedia();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { socialConfig, socialLinks, loading };
};
