import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Globe
} from "lucide-react";

interface SocialMediaHandle {
  platform: string;
  platformName: string;
  icon: React.ReactNode;
  url: string;
  username: string;
  displayName: string;
  description: string;
  enabled: boolean;
  primaryColor: string;
  followers?: string;
}

interface SocialMediaConfig {
  handles: SocialMediaHandle[];
  displaySettings: {
    showInHeader: boolean;
    showInFooter: boolean;
    showInVideoSection: boolean;
    showFollowerCount: boolean;
  };
  lastUpdated: Date;
}

const defaultSocialMediaConfig: SocialMediaConfig = {
  handles: [
    {
      platform: 'youtube',
      platformName: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      url: 'https://youtube.com/@indiaengineeringworks',
      username: '@indiaengineeringworks',
      displayName: 'India Engineering Works',
      description: 'Watch our machinery in action and manufacturing processes',
      enabled: true,
      primaryColor: '#FF0000',
      followers: '1.2K'
    },
    {
      platform: 'instagram',
      platformName: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      url: 'https://instagram.com/indiaengineeringworks',
      username: '@indiaengineeringworks',
      displayName: 'India Engineering Works',
      description: 'Behind the scenes and product highlights',
      enabled: true,
      primaryColor: '#E4405F',
      followers: '850'
    },
    {
      platform: 'facebook',
      platformName: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: 'https://facebook.com/indiaengineeringworks',
      username: 'indiaengineeringworks',
      displayName: 'India Engineering Works',
      description: 'Company updates and customer testimonials',
      enabled: true,
      primaryColor: '#1877F2',
      followers: '2.1K'
    },
    {
      platform: 'twitter',
      platformName: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: 'https://twitter.com/iew_machines',
      username: '@iew_machines',
      displayName: 'IEW Machines',
      description: 'Industry news and quick updates',
      enabled: false,
      primaryColor: '#1DA1F2',
      followers: '340'
    },
    {
      platform: 'linkedin',
      platformName: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://linkedin.com/company/india-engineering-works',
      username: 'india-engineering-works',
      displayName: 'India Engineering Works',
      description: 'Professional network and B2B connections',
      enabled: true,
      primaryColor: '#0A66C2',
      followers: '560'
    }
  ],
  displaySettings: {
    showInHeader: true,
    showInFooter: true,
    showInVideoSection: true,
    showFollowerCount: false
  },
  lastUpdated: new Date()
};

const SocialMediaCMS = () => {
  const [config, setConfig] = useState<SocialMediaConfig>(defaultSocialMediaConfig);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadSocialMediaConfig();
  }, []);

  const loadSocialMediaConfig = () => {
    try {
      const savedConfig = localStorage.getItem('iew_social_media_config');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        // Restore React nodes for icons
        parsedConfig.handles = parsedConfig.handles.map((handle: any) => ({
          ...handle,
          icon: getIconByPlatform(handle.platform)
        }));
        setConfig(parsedConfig);
      } else {
        // Save default config
        saveSocialMediaConfig(defaultSocialMediaConfig);
      }
    } catch (error) {
      console.error('Error loading social media config:', error);
      setConfig(defaultSocialMediaConfig);
    }
  };

  const getIconByPlatform = (platform: string) => {
    switch (platform) {
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  const saveSocialMediaConfig = (configToSave: SocialMediaConfig) => {
    try {
      // Remove React nodes before saving to localStorage
      const configToStore = {
        ...configToSave,
        handles: configToSave.handles.map(handle => ({
          ...handle,
          icon: null // Remove React nodes for storage
        })),
        lastUpdated: new Date()
      };
      localStorage.setItem('iew_social_media_config', JSON.stringify(configToStore));
      
      // Also update the VideoSection data
      updateVideoSectionData(configToSave);
      
      showAlert('Social media configuration saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving social media config:', error);
      showAlert('Error saving configuration', 'error');
    }
  };

  const updateVideoSectionData = (configToSave: SocialMediaConfig) => {
    // Update social media links used in VideoSection component
    const enabledHandles = configToSave.handles.filter(handle => handle.enabled);
    const socialMediaLinks = {
      youtube: enabledHandles.find(h => h.platform === 'youtube')?.url || '',
      instagram: enabledHandles.find(h => h.platform === 'instagram')?.url || '',
      facebook: enabledHandles.find(h => h.platform === 'facebook')?.url || '',
      twitter: enabledHandles.find(h => h.platform === 'twitter')?.url || '',
      linkedin: enabledHandles.find(h => h.platform === 'linkedin')?.url || ''
    };
    localStorage.setItem('iew_social_media_links', JSON.stringify(socialMediaLinks));
  };

  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save delay
      saveSocialMediaConfig(config);
    } catch (error) {
      showAlert('Error saving configuration', 'error');
    }
    setLoading(false);
  };

  const updateHandle = (platform: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      handles: prev.handles.map(handle =>
        handle.platform === platform
          ? { ...handle, [field]: value }
          : handle
      )
    }));
  };

  const updateDisplaySettings = (field: string, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      displaySettings: {
        ...prev.displaySettings,
        [field]: value
      }
    }));
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const testSocialLink = (url: string) => {
    if (validateUrl(url)) {
      window.open(url, '_blank');
    } else {
      showAlert('Invalid URL format', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {alert && (
        <Alert className={`${
          alert.type === 'error' ? 'border-red-500 bg-red-50' : 
          alert.type === 'success' ? 'border-green-500 bg-green-50' : 
          'border-blue-500 bg-blue-50'
        }`}>
          <AlertTriangle className={`h-4 w-4 ${
            alert.type === 'error' ? 'text-red-600' : 
            alert.type === 'success' ? 'text-green-600' : 
            'text-blue-600'
          }`} />
          <AlertDescription className={`${
            alert.type === 'error' ? 'text-red-700' : 
            alert.type === 'success' ? 'text-green-700' : 
            'text-blue-700'
          }`}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media Management
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Manage all your social media handles and display settings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!previewMode ? (
        <>
          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Display Settings</CardTitle>
              <p className="text-sm text-gray-600">Choose where to show social media links</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Show in Header</Label>
                    <p className="text-sm text-gray-500">Display social icons in website header</p>
                  </div>
                  <Switch
                    checked={config.displaySettings.showInHeader}
                    onCheckedChange={(checked) => updateDisplaySettings('showInHeader', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Show in Footer</Label>
                    <p className="text-sm text-gray-500">Display social icons in website footer</p>
                  </div>
                  <Switch
                    checked={config.displaySettings.showInFooter}
                    onCheckedChange={(checked) => updateDisplaySettings('showInFooter', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Show in Video Section</Label>
                    <p className="text-sm text-gray-500">Display follow buttons in video section</p>
                  </div>
                  <Switch
                    checked={config.displaySettings.showInVideoSection}
                    onCheckedChange={(checked) => updateDisplaySettings('showInVideoSection', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Show Follower Count</Label>
                    <p className="text-sm text-gray-500">Display follower numbers (if available)</p>
                  </div>
                  <Switch
                    checked={config.displaySettings.showFollowerCount}
                    onCheckedChange={(checked) => updateDisplaySettings('showFollowerCount', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Handles */}
          <div className="grid gap-6">
            {config.handles.map((handle) => (
              <Card key={handle.platform} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${handle.primaryColor}20` }}>
                        {handle.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{handle.platformName}</CardTitle>
                        <p className="text-sm text-gray-600">Configure your {handle.platformName} presence</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={handle.enabled}
                        onCheckedChange={(checked) => updateHandle(handle.platform, 'enabled', checked)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testSocialLink(handle.url)}
                        disabled={!handle.url || !validateUrl(handle.url)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${handle.platform}-url`}>Profile URL</Label>
                      <Input
                        id={`${handle.platform}-url`}
                        value={handle.url}
                        onChange={(e) => updateHandle(handle.platform, 'url', e.target.value)}
                        placeholder={`https://${handle.platform}.com/yourprofile`}
                        className={!validateUrl(handle.url) && handle.url ? 'border-red-300' : ''}
                      />
                      {!validateUrl(handle.url) && handle.url && (
                        <p className="text-xs text-red-600 mt-1">Invalid URL format</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`${handle.platform}-username`}>Username/Handle</Label>
                      <Input
                        id={`${handle.platform}-username`}
                        value={handle.username}
                        onChange={(e) => updateHandle(handle.platform, 'username', e.target.value)}
                        placeholder="@yourhandle"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`${handle.platform}-displayname`}>Display Name</Label>
                      <Input
                        id={`${handle.platform}-displayname`}
                        value={handle.displayName}
                        onChange={(e) => updateHandle(handle.platform, 'displayName', e.target.value)}
                        placeholder="Your Business Name"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`${handle.platform}-followers`}>Followers Count (Optional)</Label>
                      <Input
                        id={`${handle.platform}-followers`}
                        value={handle.followers || ''}
                        onChange={(e) => updateHandle(handle.platform, 'followers', e.target.value)}
                        placeholder="1.2K, 5.6M, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`${handle.platform}-description`}>Description</Label>
                    <Textarea
                      id={`${handle.platform}-description`}
                      value={handle.description}
                      onChange={(e) => updateHandle(handle.platform, 'description', e.target.value)}
                      placeholder="Brief description of what you share on this platform"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Preview Mode */
        <Card>
          <CardHeader>
            <CardTitle>Preview: How Your Social Media Links Will Appear</CardTitle>
            <p className="text-sm text-gray-600">This shows how your social media links will look on the website</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Header Preview */}
              {config.displaySettings.showInHeader && (
                <div>
                  <h4 className="font-semibold mb-3">Header Social Icons</h4>
                  <div className="flex gap-2 p-3 bg-gray-50 rounded-lg">
                    {config.handles.filter(h => h.enabled).map(handle => (
                      <Button
                        key={handle.platform}
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        style={{ color: handle.primaryColor }}
                      >
                        {handle.icon}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Section Preview */}
              {config.displaySettings.showInVideoSection && (
                <div>
                  <h4 className="font-semibold mb-3">Video Section Follow Buttons</h4>
                  <div className="flex flex-wrap gap-3 p-4 bg-white border rounded-lg">
                    {config.handles.filter(h => h.enabled).map(handle => (
                      <Button
                        key={handle.platform}
                        className="flex items-center gap-2"
                        style={{ backgroundColor: handle.primaryColor }}
                      >
                        {handle.icon}
                        {handle.platformName}
                        {config.displaySettings.showFollowerCount && handle.followers && (
                          <span className="text-xs opacity-90">({handle.followers})</span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Preview */}
              {config.displaySettings.showInFooter && (
                <div>
                  <h4 className="font-semibold mb-3">Footer Social Links</h4>
                  <div className="p-4 bg-gray-800 text-white rounded-lg">
                    <div className="flex gap-4">
                      {config.handles.filter(h => h.enabled).map(handle => (
                        <div key={handle.platform} className="flex items-center gap-2">
                          <span style={{ color: handle.primaryColor }}>
                            {handle.icon}
                          </span>
                          <span className="text-sm">{handle.username}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Active Platforms:</strong> {config.handles.filter(h => h.enabled).length}</p>
                    <p><strong>Total Configured:</strong> {config.handles.length}</p>
                  </div>
                  <div>
                    <p><strong>Display Locations:</strong> {
                      [
                        config.displaySettings.showInHeader && 'Header',
                        config.displaySettings.showInFooter && 'Footer', 
                        config.displaySettings.showInVideoSection && 'Video Section'
                      ].filter(Boolean).join(', ') || 'None'
                    }</p>
                    <p><strong>Last Updated:</strong> {new Date(config.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialMediaCMS;
