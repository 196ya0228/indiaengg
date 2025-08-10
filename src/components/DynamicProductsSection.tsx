import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Badge } from "@/components/ui/badge";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import type { Product, Category } from "@/lib/firebaseServices";

const DynamicProductsSection = () => {
  const { products, categories, loading, error } = useFirebaseData();
  const [categorizedProducts, setCategorizedProducts] = useState<{[key: string]: Product[]}>({});

  useEffect(() => {
    if (products && categories) {
      const categorized: {[key: string]: Product[]} = {};
      categories.forEach(category => {
        categorized[category.title] = products.filter(
          product => product.category === category.title
        );
      });
      setCategorizedProducts(categorized);
    }
  }, [products, categories]);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading products: {error}</p>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-600 text-white mb-4 animate-slide-in-up stagger-1">
            OUR PRODUCTS
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6 animate-slide-in-up stagger-2">
            Premium Industrial <span className="gradient-text">Machinery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up stagger-3">
            Specialized manufacturer of Mini Sugar Plants, Jaggery Making Machines, Gur Production Equipment, Sugar Cane Crushers, 
            Khandsari Plants, Sugar Mill Gearboxes, Jaggery Plant Setup, Sugar Refinery Machinery, and Complete Sugar Processing Solutions.
          </p>
        </div>
        
        {categories.map((category, categoryIndex) => {
          const categoryProducts = categorizedProducts[category.title] || [];
          
          if (categoryProducts.length === 0) {
            return null; // Don't render empty categories
          }

          return (
            <div key={category.id || categoryIndex} className="mb-16 animate-slide-in-up" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold text-foreground hover-scale">{category.title}</h3>
                <Badge className={`${category.badgeColor} text-white animate-pulse btn-pulse`}>
                  {category.badge}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product, index) => (
                  <div 
                    key={product.id || index} 
                    className="animate-fade-in-scale hover-lift" 
                    style={{ animationDelay: `${(categoryIndex * 3 + index) * 0.1}s` }}
                  >
                    <ProductCard
                      image={product.image || "/placeholder.svg"}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Fallback if no categories or products */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products available at the moment.</p>
            <p className="text-sm text-gray-500">Please check back later or contact us for more information.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicProductsSection;
