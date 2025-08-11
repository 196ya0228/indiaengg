import { useState, useEffect } from 'react';
import { 
  getProducts, 
  getCategories, 
  getCompanyInfo,
  type Product, 
  type Category, 
  type CompanyInfo 
} from '@/lib/firebaseServices';

export const useFirebaseData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData, companyData] = await Promise.all([
        getProducts(),
        getCategories(),
        getCompanyInfo()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
      setCompanyInfo(companyData);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading Firebase data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadData();
  };

  return {
    products,
    categories,
    companyInfo,
    loading,
    error,
    refreshData
  };
};

export const useProductsByCategory = (categoryTitle: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const allProducts = await getProducts();
        const categoryProducts = allProducts.filter(
          product => product.category === categoryTitle
        );
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [categoryTitle]);

  return { products, loading };
};
