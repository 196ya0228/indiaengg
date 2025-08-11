import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, Building, Settings, BarChart3, MessageSquare, 
  Upload, Save, Eye, Edit, Trash2, Users, TrendingUp,
  Mail, Phone, Globe, Palette, Shield
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getWebsiteContent,
  updateWebsiteContent,
  getContactInquiries,
  updateInquiryStatus,
  getAnalytics,
  getSiteSettings,
  updateSiteSettings,
  uploadMultipleImages,
  backupData,
  type WebsiteContent,
  type ContactInquiry,
  type Analytics,
  type SiteSettings
} from "@/lib/enhancedFirebaseServices";

const EnhancedAdminDashboard = () => {
  const { user, logout, isDemoMode } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // State for different sections
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [contentData, inquiriesData, analyticsData, settingsData] = await Promise.all([
        getWebsiteContent(),
        getContactInquiries(),
        getAnalytics(30),
        getSiteSettings()
      ]);
      
      setWebsiteContent(contentData);
      setInquiries(inquiriesData);
      setAnalytics(analyticsData);
      setSiteSettings(settingsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setLoading(false);
  };

  const handleContentUpdate = async (updates: Partial<WebsiteContent>) => {
    try {
      await updateWebsiteContent(updates);
      setWebsiteContent(prev => prev ? { ...prev, ...updates } : null);
      alert('Website content updated successfully!');
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Error updating content');
    }
  };

  const handleSettingsUpdate = async (updates: Partial<SiteSettings>) => {
    try {
      await updateSiteSettings(updates);
      setSiteSettings(prev => prev ? { ...prev, ...updates } : null);
      alert('Site settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
  };

  const handleBackup = async () => {
    try {
      const backupData = await backupData();
      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating backup:', error);
      alert('Error creating backup');
    }
  };

  // Calculate analytics summary
  const analyticsSummary = analytics.reduce((acc, day) => {
    acc.totalPageViews += day.pageViews || 0;
    acc.totalWhatsappClicks += day.whatsappClicks || 0;
    acc.totalPhoneClicks += day.phoneClicks || 0;
    acc.totalEmailClicks += day.emailClicks || 0;
    acc.totalInquiries += day.inquiries || 0;
    return acc;
  }, {
    totalPageViews: 0,
    totalWhatsappClicks: 0,
    totalPhoneClicks: 0,
    totalEmailClicks: 0,
    totalInquiries: 0
  });

  const recentInquiries = inquiries.slice(0, 5);
  const inquiryStatusCounts = inquiries.reduce((acc, inquiry) => {
    acc[inquiry.status] = (acc[inquiry.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Enhanced Admin Dashboard</h1>
              {isDemoMode && <Badge className="bg-orange-500 text-white">DEMO MODE</Badge>}
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleBackup} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Backup Data
              </Button>
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Page Views</p>
                      <p className="text-2xl font-bold">{analyticsSummary.totalPageViews}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">WhatsApp Clicks</p>
                      <p className="text-2xl font-bold">{analyticsSummary.totalWhatsappClicks}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phone Calls</p>
                      <p className="text-2xl font-bold">{analyticsSummary.totalPhoneClicks}</p>
                    </div>
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                      <p className="text-2xl font-bold">{inquiries.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Inquiries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{inquiry.name}</h4>
                        <p className="text-sm text-gray-600">{inquiry.productCategory}</p>
                        <p className="text-xs text-gray-500">{inquiry.phone}</p>
                      </div>
                      <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                        {inquiry.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Management</CardTitle>
                <p className="text-sm text-gray-600">Update your website content in real-time</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {websiteContent && (
                  <>
                    <div>
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={websiteContent.heroTitle || ""}
                        onChange={(e) => setWebsiteContent(prev => prev ? { ...prev, heroTitle: e.target.value } : null)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="heroDescription">Hero Description</Label>
                      <Textarea
                        id="heroDescription"
                        value={websiteContent.heroDescription || ""}
                        onChange={(e) => setWebsiteContent(prev => prev ? { ...prev, heroDescription: e.target.value } : null)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="aboutContent">About Content</Label>
                      <Textarea
                        id="aboutContent"
                        value={websiteContent.aboutContent || ""}
                        onChange={(e) => setWebsiteContent(prev => prev ? { ...prev, aboutContent: e.target.value } : null)}
                        rows={5}
                      />
                    </div>

                    <Button 
                      onClick={() => handleContentUpdate(websiteContent)}
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update Content
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(inquiryStatusCounts).map(([status, count]) => (
                <Card key={status}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-gray-600 capitalize">{status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{inquiry.name}</h4>
                          <p className="text-sm text-gray-600">{inquiry.company}</p>
                        </div>
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateInquiryStatus(inquiry.id!, e.target.value as ContactInquiry['status'])}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Phone:</strong> {inquiry.phone}
                        </div>
                        <div>
                          <strong>Email:</strong> {inquiry.email}
                        </div>
                        <div>
                          <strong>Product:</strong> {inquiry.productCategory}
                        </div>
                        <div>
                          <strong>Source:</strong> {inquiry.source}
                        </div>
                      </div>
                      <div className="mt-3">
                        <strong>Message:</strong>
                        <p className="text-sm text-gray-600 mt-1">{inquiry.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Views (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="pageViews" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Method Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'WhatsApp', value: analyticsSummary.totalWhatsappClicks },
                      { name: 'Phone', value: analyticsSummary.totalPhoneClicks },
                      { name: 'Email', value: analyticsSummary.totalEmailClicks }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {siteSettings && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={siteSettings.siteName || ""}
                          onChange={(e) => setSiteSettings(prev => prev ? { ...prev, siteName: e.target.value } : null)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={siteSettings.primaryColor || "#3b82f6"}
                          onChange={(e) => setSiteSettings(prev => prev ? { ...prev, primaryColor: e.target.value } : null)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={siteSettings.siteDescription || ""}
                        onChange={(e) => setSiteSettings(prev => prev ? { ...prev, siteDescription: e.target.value } : null)}
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={() => handleSettingsUpdate(siteSettings)}
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update Settings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab - Import existing functionality */}
          <TabsContent value="products">
            <div className="text-center py-12">
              <p className="text-gray-600">Products management will be integrated here.</p>
              <p className="text-sm text-gray-500">Use the existing admin dashboard for now.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
