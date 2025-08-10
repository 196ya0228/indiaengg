import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';
import {
  mockGetProducts,
  mockGetCategories,
  mockGetCompanyInfo,
  mockGetProductsByCategory,
  mockAddProduct,
  mockUpdateProduct,
  mockDeleteProduct,
  mockUploadImage
} from './mockDataService';

// Types for our data structures
export interface Product {
  id?: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id?: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  order: number;
}

export interface CompanyInfo {
  id?: string;
  name: string;
  gst: string;
  phoneNumbers: string[];
  whatsappNumber: string;
  location: string;
  workingHours: string;
  legalStatus: string;
  annualTurnover: string;
  establishedYear: string;
  updatedAt: Date;
}

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    return import.meta.env.VITE_FIREBASE_PROJECT_ID && 
           import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'demo-project';
  } catch {
    return false;
  }
};

// Products Management
export const getProducts = async (): Promise<Product[]> => {
  if (!isFirebaseConfigured()) {
    console.log('Using mock data for products');
    return mockGetProducts();
  }

  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products, falling back to mock data:', error);
    return mockGetProducts();
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!isFirebaseConfigured()) {
    return mockGetProductsByCategory(category);
  }

  try {
    const products = await getProducts();
    return products.filter(product => product.category === category);
  } catch (error) {
    console.error('Error getting products by category:', error);
    return mockGetProductsByCategory(category);
  }
};

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!isFirebaseConfigured()) {
    return mockAddProduct(product);
  }

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    return mockAddProduct(product);
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    return mockUpdateProduct(id, product);
  }

  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return mockUpdateProduct(id, product);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    return mockDeleteProduct(id);
  }

  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    return mockDeleteProduct(id);
  }
};

// Categories Management
export const getCategories = async (): Promise<Category[]> => {
  if (!isFirebaseConfigured()) {
    console.log('Using mock data for categories');
    return mockGetCategories();
  }

  try {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
  } catch (error) {
    console.error('Error getting categories, falling back to mock data:', error);
    return mockGetCategories();
  }
};

export const addCategory = async (category: Omit<Category, 'id'>): Promise<string> => {
  if (!isFirebaseConfigured()) {
    console.log('Mock mode: Category add simulated');
    return 'mock_category_id';
  }

  try {
    const docRef = await addDoc(collection(db, 'categories'), category);
    return docRef.id;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.log('Mock mode: Category update simulated');
    return;
  }

  try {
    const docRef = doc(db, 'categories', id);
    await updateDoc(docRef, category);
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Company Info Management
export const getCompanyInfo = async (): Promise<CompanyInfo | null> => {
  if (!isFirebaseConfigured()) {
    console.log('Using mock data for company info');
    return mockGetCompanyInfo();
  }

  try {
    const docRef = doc(db, 'company', 'info');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as CompanyInfo;
    }
    return mockGetCompanyInfo();
  } catch (error) {
    console.error('Error getting company info, falling back to mock data:', error);
    return mockGetCompanyInfo();
  }
};

export const updateCompanyInfo = async (info: Partial<CompanyInfo>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.log('Mock mode: Company info update simulated');
    return;
  }

  try {
    const docRef = doc(db, 'company', 'info');
    await updateDoc(docRef, {
      ...info,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating company info:', error);
    throw error;
  }
};

// Image Management
export const uploadImage = async (file: File, folder: string = 'products'): Promise<string> => {
  if (!isFirebaseConfigured()) {
    return mockUploadImage(file);
  }

  try {
    const filename = `${folder}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filename);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return mockUploadImage(file);
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.log('Mock mode: Image delete simulated');
    return;
  }

  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Initialize default data
export const initializeDefaultData = async (): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.log('Mock mode: Using default mock data');
    return;
  }

  try {
    // Check if data already exists
    const categories = await getCategories();
    const products = await getProducts();
    
    if (categories.length === 0) {
      // Add default categories
      const defaultCategories = [
        {
          title: "Jaggery & Gur Production Plant",
          badge: "SPECIALTY",
          badgeColor: "bg-orange-600",
          description: "Complete jaggery and gur production equipment",
          order: 1
        },
        {
          title: "Sugar Cane Crushing & Processing",
          badge: "POPULAR",
          badgeColor: "bg-green-600", 
          description: "Sugar cane processing machinery and equipment",
          order: 2
        },
        {
          title: "Mini Sugar Plant & Refinery",
          badge: "COMPLETE SOLUTION",
          badgeColor: "bg-blue-600",
          description: "Complete mini sugar plant solutions",
          order: 3
        }
      ];
      
      for (const category of defaultCategories) {
        await addCategory(category);
      }
    }
    
    // Initialize company info if it doesn't exist
    const companyInfo = await getCompanyInfo();
    if (!companyInfo) {
      await updateCompanyInfo({
        name: "India Engineering Works",
        gst: "09AABPI0229C1ZD",
        phoneNumbers: ["+919897601094", "+919837200396"],
        whatsappNumber: "+919837200396",
        location: "Muzaffarnagar UP IN",
        workingHours: "Mon-Sun: 8AM-8PM",
        legalStatus: "Propertiership",
        annualTurnover: "Rs. 5 - 50 Cr",
        establishedYear: "1988"
      });
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
};
