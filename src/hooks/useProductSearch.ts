import { useState, useMemo } from 'react';
import { useFirebaseData } from './useFirebaseData';

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products, categories, loading } = useFirebaseData();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { products: [], categories: [], hasResults: false };
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Search in products
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    // Search in categories
    const filteredCategories = categories.filter(category =>
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );

    return {
      products: filteredProducts,
      categories: filteredCategories,
      hasResults: filteredProducts.length > 0 || filteredCategories.length > 0
    };
  }, [searchQuery, products, categories]);

  const searchSuggestions = useMemo(() => {
    const suggestions = [
      'Jaggery Making Machine',
      'Sugar Cane Crusher',
      'Mini Sugar Plant',
      'Gur Production Equipment',
      'Sugar Mill Gearbox',
      'Khandsari Plant',
      'Sugar Refinery Machinery',
      'Bagasse Handling Equipment'
    ];

    if (!searchQuery.trim()) {
      return suggestions.slice(0, 5);
    }

    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchSuggestions,
    loading
  };
};
