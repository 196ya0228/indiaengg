// Mock data service for development without Firebase
import type { Product, Category, CompanyInfo } from './firebaseServices';

// Mock data
const mockCategories: Category[] = [
  {
    id: '1',
    title: "Jaggery & Gur Production Plant",
    badge: "SPECIALTY",
    badgeColor: "bg-orange-600",
    description: "Complete jaggery and gur production equipment",
    order: 1
  },
  {
    id: '2',
    title: "Sugar Cane Crushing & Processing",
    badge: "POPULAR", 
    badgeColor: "bg-green-600",
    description: "Sugar cane processing machinery and equipment",
    order: 2
  },
  {
    id: '3',
    title: "Mini Sugar Plant & Refinery",
    badge: "COMPLETE SOLUTION",
    badgeColor: "bg-blue-600",
    description: "Complete mini sugar plant solutions",
    order: 3
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    title: "Complete Jaggery Making Machine",
    description: "Complete jaggery production setup including crusher, juice extractor, boiling pan and cooling system.",
    price: "Get Quote",
    image: "/placeholder.svg",
    category: "Jaggery & Gur Production Plant",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: "Gur Production Plant",
    description: "Traditional gur making equipment with modern efficiency for quality jaggery production.",
    price: "Get Quote",
    image: "/placeholder.svg",
    category: "Jaggery & Gur Production Plant",
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: "Sugar Cane Crusher - 3 Roller",
    description: "Heavy duty 3-roller sugar cane crusher with maximum juice extraction efficiency.",
    price: "Get Quote",
    image: "/placeholder.svg",
    category: "Sugar Cane Crushing & Processing",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: "Mini Sugar Plant - 50 TCD",
    description: "Complete mini sugar plant setup for 50 tonnes cane per day processing capacity.",
    price: "Get Quote",
    image: "/placeholder.svg",
    category: "Mini Sugar Plant & Refinery",
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockCompanyInfo: CompanyInfo = {
  id: '1',
  name: "India Engineering Works",
  gst: "09AABPI0229C1ZD",
  phoneNumbers: ["+919897601094", "+919837200396"],
  whatsappNumber: "+919837200396",
  location: "Muzaffarnagar UP IN",
  workingHours: "Mon-Sun: 8AM-8PM",
  legalStatus: "Propertiership",
  annualTurnover: "Rs. 5 - 50 Cr",
  establishedYear: "1988",
  updatedAt: new Date()
};

// Mock service functions
export const mockGetProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockProducts];
};

export const mockGetCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCategories];
};

export const mockGetCompanyInfo = async (): Promise<CompanyInfo> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { ...mockCompanyInfo };
};

export const mockGetProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockProducts.filter(product => product.category === category);
};

export const mockAddProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const newProduct: Product = {
    ...product,
    id: `mock_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockProducts.push(newProduct);
  return newProduct.id!;
};

export const mockUpdateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts[index] = { ...mockProducts[index], ...product, updatedAt: new Date() };
  }
};

export const mockDeleteProduct = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts.splice(index, 1);
  }
};

export const mockUploadImage = async (file: File): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return a mock URL - in real implementation this would upload to Firebase Storage
  return `/placeholder.svg`;
};
