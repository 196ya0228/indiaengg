import ProductCard from "./ProductCard";
import crusher1 from "@/assets/sugarcane-crusher-1.jpg";
import crusher2 from "@/assets/sugarcane-crusher-2.jpg";
import crusher3 from "@/assets/sugarcane-crusher-3.jpg";
import cementPlant from "@/assets/cement-plant.jpg";
import stoneCrusher from "@/assets/stone-crusher.jpg";
import ballMill from "@/assets/ball-mill.jpg";
import { Badge } from "@/components/ui/badge";

const ProductsSection = () => {
  const categories = [
    {
      title: "Jaggery & Gur Production Plant",
      badge: "SPECIALTY",
      badgeColor: "bg-orange-600",
      products: [
        {
          image: crusher1,
          title: "Complete Jaggery Making Machine",
          price: "Get Quote",
          description: "Complete jaggery production setup including crusher, juice extractor, boiling pan and cooling system."
        },
        {
          image: crusher2,
          title: "Gur Production Plant",
          price: "Get Quote",
          description: "Traditional gur making equipment with modern efficiency for quality jaggery production."
        },
        {
          image: crusher3,
          title: "Khandsari Sugar Plant",
          price: "Get Quote",
          description: "Small scale khandsari sugar production plant for local sugar manufacturing."
        }
      ]
    },
    {
      title: "Sugar Cane Crushing & Processing",
      badge: "POPULAR",
      badgeColor: "bg-green-600",
      products: [
        {
          image: cementPlant,
          title: "Sugar Cane Crusher - 3 Roller",
          price: "Get Quote",
          description: "Heavy duty 3-roller sugar cane crusher with maximum juice extraction efficiency."
        },
        {
          image: ballMill,
          title: "Sugar Mill Gear Box",
          price: "Get Quote",
          description: "Precision engineered gearboxes for sugar mills with high torque capacity."
        },
        {
          image: cementPlant,
          title: "Bagasse Handling System",
          price: "Get Quote",
          description: "Complete bagasse conveying and handling system for sugar mills."
        }
      ]
    },
    {
      title: "Mini Sugar Plant & Refinery",
      badge: "COMPLETE SOLUTION",
      badgeColor: "bg-blue-600",
      products: [
        {
          image: stoneCrusher,
          title: "Mini Sugar Plant - 50 TCD",
          price: "Get Quote",
          description: "Complete mini sugar plant setup for 50 tonnes cane per day processing capacity."
        },
        {
          image: stoneCrusher,
          title: "Sugar Refinery Equipment",
          price: "Get Quote",
          description: "Sugar refining and purification equipment for premium quality sugar production."
        },
        {
          image: ballMill,
          title: "Crystallization System",
          price: "Get Quote",
          description: "Advanced crystallization and centrifuge system for sugar processing."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
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
        
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16 animate-slide-in-up" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-foreground hover-scale">{category.title}</h3>
              <Badge className={`${category.badgeColor} text-white animate-pulse btn-pulse`}>
                {category.badge}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map((product, index) => (
                <div
                  key={index}
                  className="animate-fade-in-scale hover-lift"
                  style={{ animationDelay: `${(categoryIndex * 3 + index) * 0.1}s` }}
                >
                  <ProductCard
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
