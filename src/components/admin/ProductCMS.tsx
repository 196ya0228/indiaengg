import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon,
  Package,
  Tag,
  DollarSign,
  FileText,
  Settings,
  Eye,
  Copy
} from "lucide-react";

interface Product {
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

const CATEGORIES = [
  'Jaggery Making Machine',
  'Mini Sugar Plant',
  'Sugar Cane Crusher',
  'Sugar Mill Gears',
  'Khandsari Plant',
  'Sugar Refinery',
  'Spare Parts',
  'Other Equipment'
];

const AVAILABILITY_OPTIONS = [
  { value: 'in-stock', label: 'In Stock', color: 'bg-green-500' },
  { value: 'out-of-stock', label: 'Out of Stock', color: 'bg-red-500' },
  { value: 'made-to-order', label: 'Made to Order', color: 'bg-blue-500' }
];

const ProductCMS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    features: [],
    specifications: '',
    availability: 'in-stock',
    tags: []
  });
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('cms_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with sample products
      const sampleProducts: Product[] = [
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
        }
      ];
      setProducts(sampleProducts);
      localStorage.setItem('cms_products', JSON.stringify(sampleProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('cms_products', JSON.stringify(products));
  }, [products]);

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      image: '',
      features: [],
      specifications: '',
      availability: 'in-stock',
      tags: []
    });
    setCurrentFeature('');
    setCurrentTag('');
  };

  const handleAddProduct = () => {
    if (!formData.title || !formData.description || !formData.category) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      price: formData.price || 'Contact for Price',
      category: formData.category!,
      image: formData.image || 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: formData.features || [],
      specifications: formData.specifications || '',
      availability: formData.availability as Product['availability'] || 'in-stock',
      tags: formData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    showAlert('Product added successfully!', 'success');
  };

  const handleEditProduct = () => {
    if (!editingProduct || !formData.title || !formData.description || !formData.category) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    const updatedProduct: Product = {
      ...editingProduct,
      title: formData.title!,
      description: formData.description!,
      price: formData.price || 'Contact for Price',
      category: formData.category!,
      image: formData.image || editingProduct.image,
      features: formData.features || [],
      specifications: formData.specifications || '',
      availability: formData.availability as Product['availability'] || 'in-stock',
      tags: formData.tags || [],
      updatedAt: new Date().toISOString()
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    resetForm();
    showAlert('Product updated successfully!', 'success');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      showAlert('Product deleted successfully!', 'success');
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      features: [...product.features],
      specifications: product.specifications,
      availability: product.availability,
      tags: [...product.tags]
    });
    setIsEditDialogOpen(true);
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), currentFeature.trim()]
      });
      setCurrentFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || []
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index) || []
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesAvailability = filterAvailability === 'all' || product.availability === filterAvailability;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const duplicateProduct = (product: Product) => {
    const duplicatedProduct: Product = {
      ...product,
      id: Date.now().toString(),
      title: `${product.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts([...products, duplicatedProduct]);
    showAlert('Product duplicated successfully!', 'success');
  };

  const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Product Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter product title"
          />
        </div>
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., ₹2,50,000 or Contact for Price"
          />
        </div>
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value as Product['availability'] })}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="Enter image URL or upload image"
        />
      </div>

      <div>
        <Label htmlFor="specifications">Specifications</Label>
        <Textarea
          id="specifications"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          placeholder="Enter detailed specifications"
          rows={3}
        />
      </div>

      <div>
        <Label>Features</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            placeholder="Enter a feature"
            onKeyPress={(e) => e.key === 'Enter' && addFeature()}
          />
          <Button onClick={addFeature} type="button">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features?.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {feature}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Enter a tag"
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
          />
          <Button onClick={addTag} type="button">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={isEdit ? handleEditProduct : handleAddProduct} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            if (isEdit) {
              setIsEditDialogOpen(false);
              setEditingProduct(null);
            } else {
              setIsAddDialogOpen(false);
            }
            resetForm();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {alert && (
        <Alert className={alert.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={alert.type === 'success' ? 'text-green-700' : 'text-red-700'}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAvailability} onValueChange={setFilterAvailability}>
          <SelectTrigger>
            <SelectValue placeholder="All Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Availability</SelectItem>
            {AVAILABILITY_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-600 flex items-center">
          <Package className="h-4 w-4 mr-1" />
          {filteredProducts.length} products
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={`${AVAILABILITY_OPTIONS.find(opt => opt.value === product.availability)?.color} text-white`}>
                  {AVAILABILITY_OPTIONS.find(opt => opt.value === product.availability)?.label}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                <Badge variant="outline" className="text-xs">{product.category}</Badge>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              
              {product.price && (
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <DollarSign className="h-4 w-4" />
                  {product.price}
                </div>
              )}
              
              {product.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{feature}</Badge>
                  ))}
                  {product.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">+{product.features.length - 2} more</Badge>
                  )}
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(product)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => duplicateProduct(product)}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCMS;
