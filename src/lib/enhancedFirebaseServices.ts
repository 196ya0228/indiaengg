import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query,
  serverTimestamp,
  where,
  limit
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll
} from 'firebase/storage';
import { db, storage } from './firebase';

// Enhanced interfaces
export interface WebsiteContent {
  id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutContent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  updatedAt: Date;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productCategory: string;
  message: string;
  source: 'whatsapp' | 'form' | 'phone' | 'email';
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  id?: string;
  date: string;
  pageViews: number;
  whatsappClicks: number;
  phoneClicks: number;
  emailClicks: number;
  productViews: { [productId: string]: number };
  inquiries: number;
  topProducts: string[];
  updatedAt: Date;
}

export interface SiteSettings {
  id?: string;
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  seoSettings: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    metaPixelId?: string;
  };
  maintenanceMode: boolean;
  updatedAt: Date;
}

// Website Content Management
export const getWebsiteContent = async (): Promise<WebsiteContent | null> => {
  try {
    const docRef = doc(db, 'content', 'website');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as WebsiteContent;
    }
    return null;
  } catch (error) {
    console.error('Error getting website content:', error);
    return null;
  }
};

export const updateWebsiteContent = async (content: Partial<WebsiteContent>): Promise<void> => {
  try {
    const docRef = doc(db, 'content', 'website');
    await updateDoc(docRef, {
      ...content,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating website content:', error);
    throw error;
  }
};

// Contact Inquiries Management
export const addContactInquiry = async (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...inquiry,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding contact inquiry:', error);
    throw error;
  }
};

export const getContactInquiries = async (status?: string): Promise<ContactInquiry[]> => {
  try {
    let q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    
    if (status) {
      q = query(collection(db, 'inquiries'), where('status', '==', status), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContactInquiry[];
  } catch (error) {
    console.error('Error getting contact inquiries:', error);
    return [];
  }
};

export const updateInquiryStatus = async (id: string, status: ContactInquiry['status']): Promise<void> => {
  try {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    throw error;
  }
};

// Analytics Management
export const trackPageView = async (page: string): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const docRef = doc(db, 'analytics', today);
    
    // Get current data
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      await updateDoc(docRef, {
        pageViews: (data.pageViews || 0) + 1,
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(docRef, {
        date: today,
        pageViews: 1,
        whatsappClicks: 0,
        phoneClicks: 0,
        emailClicks: 0,
        productViews: {},
        inquiries: 0,
        topProducts: [],
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

export const trackClick = async (type: 'whatsapp' | 'phone' | 'email', productId?: string): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const docRef = doc(db, 'analytics', today);
    
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const updates: any = {
        updatedAt: serverTimestamp()
      };
      
      switch (type) {
        case 'whatsapp':
          updates.whatsappClicks = (data.whatsappClicks || 0) + 1;
          break;
        case 'phone':
          updates.phoneClicks = (data.phoneClicks || 0) + 1;
          break;
        case 'email':
          updates.emailClicks = (data.emailClicks || 0) + 1;
          break;
      }
      
      if (productId) {
        const productViews = data.productViews || {};
        productViews[productId] = (productViews[productId] || 0) + 1;
        updates.productViews = productViews;
      }
      
      await updateDoc(docRef, updates);
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};

export const getAnalytics = async (days: number = 30): Promise<Analytics[]> => {
  try {
    const q = query(collection(db, 'analytics'), orderBy('date', 'desc'), limit(days));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Analytics[];
  } catch (error) {
    console.error('Error getting analytics:', error);
    return [];
  }
};

// Site Settings Management
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error('Error getting site settings:', error);
    return null;
  }
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
  try {
    const docRef = doc(db, 'settings', 'site');
    await updateDoc(docRef, {
      ...settings,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
};

// Advanced Image Management
export const uploadMultipleImages = async (files: File[], folder: string = 'products'): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

export const getAllImages = async (folder: string = 'products'): Promise<string[]> => {
  try {
    const folderRef = ref(storage, folder);
    const result = await listAll(folderRef);
    const urlPromises = result.items.map(item => getDownloadURL(item));
    return await Promise.all(urlPromises);
  } catch (error) {
    console.error('Error getting all images:', error);
    return [];
  }
};

// Backup and Restore
export const backupData = async (): Promise<any> => {
  try {
    const [products, categories, companyInfo, inquiries] = await Promise.all([
      getProducts(),
      getCategories(),
      getCompanyInfo(),
      getContactInquiries()
    ]);
    
    return {
      products,
      categories,
      companyInfo,
      inquiries,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error backing up data:', error);
    throw error;
  }
};

// Import existing functions
import { 
  getProducts, 
  getCategories, 
  getCompanyInfo, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  uploadImage,
  type Product,
  type Category,
  type CompanyInfo
} from './firebaseServices';

export {
  getProducts,
  getCategories, 
  getCompanyInfo,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  type Product,
  type Category,
  type CompanyInfo
};
