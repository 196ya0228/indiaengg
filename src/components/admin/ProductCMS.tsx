import { useState, useEffect, useCallback } from "react";
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
import { CMSDataService, type CMSProduct } from "@/lib/cmsDataService";

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
  const [products, setProducts] = useState<CMSProduct[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CMSProduct | null>(null);
  
  // Separate form state to avoid re-render issues
  const [formData, setFormData] = useState<Partial<CMSProduct>>({
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

  const cms = CMSDataService.getInstance();

  // Load products from CMS
  useEffect(() => {
    const loadProducts = () => {
      const cmsProducts = cms.getProducts();
      setProducts(cmsProducts);
    };

    loadProducts();

    // Subscribe to CMS changes
    const unsubscribe = cms.subscribe('products', loadProducts);
    return unsubscribe;
  }, [cms]);

  const showAlert = useCallback((message: string, type: 'success' | 'error') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  }, []);

  const resetForm = useCallback(() => {
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
  }, []);

  // Optimized form field updaters to prevent re-rendering
  const updateFormField = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAddProduct = useCallback(() => {
    if (!formData.title || !formData.description || !formData.category) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    const newProduct: CMSProduct = {
      id: Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      price: formData.price || 'Contact for Price',
      category: formData.category!,
      image: formData.image || 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: formData.features || [],
      specifications: formData.specifications || '',
      availability: formData.availability as CMSProduct['availability'] || 'in-stock',
      tags: formData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    cms.setProducts(updatedProducts);
    
    setIsAddDialogOpen(false);
    resetForm();
    showAlert('Product added successfully!', 'success');
  }, [formData, products, cms, showAlert, resetForm]);

  const handleEditProduct = useCallback(() => {
    if (!editingProduct || !formData.title || !formData.description || !formData.category) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    const updatedProduct: CMSProduct = {
      ...editingProduct,
      title: formData.title!,
      description: formData.description!,
      price: formData.price || 'Contact for Price',
      category: formData.category!,
      image: formData.image || editingProduct.image,
      features: formData.features || [],
      specifications: formData.specifications || '',
      availability: formData.availability as CMSProduct['availability'] || 'in-stock',
      tags: formData.tags || [],
      updatedAt: new Date().toISOString()
    };

    const updatedProducts = products.map(p => p.id === editingProduct.id ? updatedProduct : p);
    setProducts(updatedProducts);
    cms.setProducts(updatedProducts);
    
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    resetForm();
    showAlert('Product updated successfully!', 'success');
  }, [formData, editingProduct, products, cms, showAlert, resetForm]);

  const handleDeleteProduct = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      cms.setProducts(updatedProducts);
      showAlert('Product deleted successfully!', 'success');
    }
  }, [products, cms, showAlert]);

  const openEditDialog = useCallback((product: CMSProduct) => {
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
  }, []);

  const addFeature = useCallback(() => {
    if (currentFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  }, [currentFeature]);

  const removeFeature = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  }, []);

  const addTag = useCallback(() => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()]
      }));
      setCurrentTag('');
    }
  }, [currentTag, formData.tags]);

  const removeTag = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesAvailability = filterAvailability === 'all' || product.availability === filterAvailability;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const duplicateProduct = useCallback((product: CMSProduct) => {
    const duplicatedProduct: CMSProduct = {
      ...product,
      id: Date.now().toString(),
      title: `${product.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedProducts = [...products, duplicatedProduct];
    setProducts(updatedProducts);
    cms.setProducts(updatedProducts);
    showAlert('Product duplicated successfully!', 'success');
  }, [products, cms, showAlert]);

  const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Product Title *</Label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={(e) => updateFormField('title', e.target.value)}
            placeholder="Enter product title"
          />
        </div>
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select 
            value={formData.category || ''} 
            onValueChange={(value) => updateFormField('category', value)}
          >
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
          value={formData.description || ''}
          onChange={(e) => updateFormField('description', e.target.value)}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={formData.price || ''}
            onChange={(e) => updateFormField('price', e.target.value)}
            placeholder="e.g., ₹2,50,000 or Contact for Price"
          />
        </div>
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select 
            value={formData.availability || 'in-stock'} 
            onValueChange={(value) => updateFormField('availability', value)}
          >
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
          value={formData.image || ''}
          onChange={(e) => updateFormField('image', e.target.value)}
          placeholder="Enter image URL or upload image"
        />
      </div>

      <div>
        <Label htmlFor="specifications">Specifications</Label>
        <Textarea
          id="specifications"
          value={formData.specifications || ''}
          onChange={(e) => updateFormField('specifications', e.target.value)}
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
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button onClick={addFeature} type="button" size="sm">Add</Button>
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
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button onClick={addTag} type="button" size="sm">Add</Button>
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
          <p className="text-gray-600">Manage your product catalog - changes reflect immediately on website</p>
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
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h3>
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
