import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Badge } from "@/components/ui/badge";
import { useCMSProducts, useCMSCategories } from "@/lib/cmsDataService";
import type { CMSProduct, CMSCategory } from "@/lib/cmsDataService";
import { useTranslation } from "@/hooks/useLanguage";

const DynamicProductsSection = () => {
  const { t } = useTranslation();
  const { products, loading: productsLoading } = useCMSProducts();
  const { categories, loading: categoriesLoading } = useCMSCategories();
  const [categorizedProducts, setCategorizedProducts] = useState<{[key: string]: CMSProduct[]}>({});

  const loading = productsLoading || categoriesLoading;

  useEffect(() => {
    if (products && categories) {
      const categorized: {[key: string]: CMSProduct[]} = {};
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
            <p>{t('common.loading')} products...</p>
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
            {t('products.ourProducts')}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6 animate-slide-in-up stagger-2">
            {t('products.premiumIndustrial')} <span className="gradient-text">{t('products.machinery')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up stagger-3">
            {t('products.description')}
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
                      features={product.features}
                      specifications={product.specifications}
                      availability={product.availability}
                      tags={product.tags}
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

        {/* Show total products count */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Badge variant="outline" className="text-sm">
              {products.length} products available across {categories.length} categories
            </Badge>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicProductsSection;
