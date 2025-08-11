import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  LogOut,
  Package,
  Building,
  Image as ImageIcon,
  Settings,
  ShoppingCart,
  Play,
  Share2
} from "lucide-react";
import ProductCMS from "./ProductCMS";
import VideoCMS from "./VideoCMS";
import AdminPasswordManager from "./AdminPasswordManager";
import SocialMediaCMS from "./SocialMediaCMS";
import { HeaderLanguageSwitcher } from "@/components/LanguageSwitcher";
import { MechanicalGear, CogWheel } from "@/components/MechanicalElements";
import { useAuth } from "@/hooks/useAuth";
import {
  Product,
  Category,
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  updateCategory,
  uploadImage,
  getCompanyInfo,
  updateCompanyInfo,
  type CompanyInfo
} from "@/lib/firebaseServices";

const AdminDashboard = () => {
  const { user, logout, isAdmin, isDemoMode } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Product form state
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: 'Get Quote',
    category: '',
    featured: false,
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  
  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    badge: '',
    badgeColor: 'bg-blue-600',
    description: '',
    order: 1
  });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData, companyData] = await Promise.all([
        getProducts(),
        getCategories(),
        getCompanyInfo()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setCompanyInfo(companyData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file, 'products');
      setProductForm(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingProduct) {
        await updateProduct(editingProduct, productForm);
      } else {
        await addProduct(productForm);
      }
      
      setProductForm({
        title: '',
        description: '',
        price: 'Get Quote',
        category: '',
        featured: false,
        image: ''
      });
      setEditingProduct(null);
      await loadData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
    setLoading(false);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingCategory) {
        await updateCategory(editingCategory, categoryForm);
      } else {
        await addCategory(categoryForm);
      }
      
      setCategoryForm({
        title: '',
        badge: '',
        badgeColor: 'bg-blue-600',
        description: '',
        order: 1
      });
      setEditingCategory(null);
      await loadData();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    }
    setLoading(false);
  };

  const handleCompanyInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyInfo) return;
    
    setLoading(true);
    try {
      await updateCompanyInfo(companyInfo);
      alert('Company information updated successfully');
    } catch (error) {
      console.error('Error updating company info:', error);
      alert('Error updating company information');
    }
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">You need admin privileges to access this dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-sm border-b relative overflow-hidden">
        {/* Mechanical background elements */}
        <div className="absolute top-0 right-0 opacity-10">
          <MechanicalGear size={80} color="white" animate />
        </div>
        <div className="absolute bottom-0 left-20 opacity-10">
          <CogWheel size={60} color="white" className="gear-rotate-reverse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <CogWheel size={32} color="white" className="gear-rotate" />
                <h1 className="text-2xl font-bold text-white text-industrial">Admin Dashboard</h1>
              </div>
              {isDemoMode && (
                <Badge className="bg-orange-500 text-white shadow-lg badge-mechanical">
                  DEMO MODE
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">Welcome, Admin</span>
              <HeaderLanguageSwitcher className="border-slate-600 hover:border-slate-400 bg-slate-700/50" />
              <AdminPasswordManager />
              <Button className="btn-mechanical" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 mb-6 overflow-x-auto">
          {[
            { id: 'products', label: 'Products', icon: Package },
            { id: 'cms', label: 'Product CMS', icon: ShoppingCart },
            { id: 'videos', label: 'Video CMS', icon: Play },
            { id: 'categories', label: 'Categories', icon: ImageIcon },
            { id: 'company', label: 'Company Info', icon: Building },
            { id: 'social', label: 'Social Media', icon: Share2 },
            { id: 'security', label: 'Security Settings', icon: Settings }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      value={productForm.title}
                      onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={productForm.category} 
                      onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.title}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                    {productForm.image && (
                      <img src={productForm.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
                    )}
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  
                  {editingProduct && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({
                          title: '',
                          description: '',
                          price: 'Get Quote',
                          category: '',
                          featured: false,
                          image: ''
                        });
                      }}
                      className="w-full"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                        )}
                        <div>
                          <h4 className="font-medium">{product.title}</h4>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setProductForm({
                              title: product.title,
                              description: product.description,
                              price: product.price,
                              category: product.category,
                              featured: product.featured,
                              image: product.image
                            });
                            setEditingProduct(product.id!);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this product?')) {
                              await deleteProduct(product.id!);
                              loadData();
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Product CMS Tab */}
        {activeTab === 'cms' && (
          <ProductCMS />
        )}

        {/* Video CMS Tab */}
        {activeTab === 'videos' && (
          <VideoCMS />
        )}

        {/* Social Media CMS Tab */}
        {activeTab === 'social' && (
          <SocialMediaCMS />
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="catTitle">Category Title</Label>
                    <Input
                      id="catTitle"
                      value={categoryForm.title}
                      onChange={(e) => setCategoryForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="badge">Badge Text</Label>
                    <Input
                      id="badge"
                      value={categoryForm.badge}
                      onChange={(e) => setCategoryForm(prev => ({ ...prev, badge: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="badgeColor">Badge Color</Label>
                    <Select 
                      value={categoryForm.badgeColor} 
                      onValueChange={(value) => setCategoryForm(prev => ({ ...prev, badgeColor: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-blue-600">Blue</SelectItem>
                        <SelectItem value="bg-green-600">Green</SelectItem>
                        <SelectItem value="bg-orange-600">Orange</SelectItem>
                        <SelectItem value="bg-red-600">Red</SelectItem>
                        <SelectItem value="bg-purple-600">Purple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories ({categories.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{category.title}</h4>
                        <Badge className={category.badgeColor}>{category.badge}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setCategoryForm({
                              title: category.title,
                              badge: category.badge,
                              badgeColor: category.badgeColor,
                              description: category.description,
                              order: category.order
                            });
                            setEditingCategory(category.id!);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Company Info Tab */}
        {activeTab === 'company' && companyInfo && (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanyInfoUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={companyInfo.location}
                    onChange={(e) => setCompanyInfo(prev => prev ? { ...prev, location: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumbers">Phone Numbers (comma separated)</Label>
                  <Input
                    id="phoneNumbers"
                    value={companyInfo.phoneNumbers?.join(', ')}
                    onChange={(e) => setCompanyInfo(prev => prev ? {
                      ...prev,
                      phoneNumbers: e.target.value.split(',').map(p => p.trim())
                    } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    value={companyInfo.whatsappNumber}
                    onChange={(e) => setCompanyInfo(prev => prev ? { ...prev, whatsappNumber: e.target.value } : null)}
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Update Company Info
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Security Settings Tab */}
        {activeTab === 'security' && (
          <div className="max-w-4xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Password Management</h3>
                  <p className="text-gray-600 mb-4">
                    Manage your admin password and security settings. It's recommended to change the default password
                    and set up a security question for password recovery.
                  </p>
                  <AdminPasswordManager onPasswordChanged={() => window.location.reload()} />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">Security Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-800">Session Duration</h4>
                      <p className="text-sm text-gray-600">8 hours</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-800">Failed Attempt Lockout</h4>
                      <p className="text-sm text-gray-600">5 attempts = 15 minutes lockout</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-800">Password Requirements</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        <li>Minimum 8 characters</li>
                        <li>Uppercase & lowercase letters</li>
                        <li>Numbers & special characters</li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-800">Security Question</h4>
                      <p className="text-sm text-gray-600">
                        {localStorage.getItem('iew_admin_security_question') ? 'Configured ✅' : 'Not set up ⚠️'}
                      </p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
