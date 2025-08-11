import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCMSProducts, useCMSCategories } from '@/lib/cmsDataService';

const CMSDebug = () => {
  const [localStorageData, setLocalStorageData] = useState<any>({});
  const { products, loading: productsLoading } = useCMSProducts();
  const { categories, loading: categoriesLoading } = useCMSCategories();

  useEffect(() => {
    const loadLocalStorageData = () => {
      const data = {
        cms_products: localStorage.getItem('cms_products'),
        cms_categories: localStorage.getItem('cms_categories'),
        iew_videos: localStorage.getItem('iew_videos'),
        iew_social_media_config: localStorage.getItem('iew_social_media_config'),
        iew_social_media_links: localStorage.getItem('iew_social_media_links')
      };
      setLocalStorageData(data);
    };

    loadLocalStorageData();
    
    // Refresh every 2 seconds to see live updates
    const interval = setInterval(loadLocalStorageData, 2000);
    return () => clearInterval(interval);
  }, []);

  const clearAllData = () => {
    localStorage.removeItem('cms_products');
    localStorage.removeItem('cms_categories');
    localStorage.removeItem('iew_videos');
    localStorage.removeItem('iew_social_media_config');
    localStorage.removeItem('iew_social_media_links');
    window.location.reload();
  };

  return (
    <Card className="m-4 bg-yellow-50 border-yellow-500">
      <CardHeader>
        <CardTitle className="text-red-600">🐛 CMS DEBUG PANEL</CardTitle>
        <Button onClick={clearAllData} variant="destructive" size="sm">
          Clear All CMS Data & Reload
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">Hook Data:</h3>
            <p>Products: {productsLoading ? 'Loading...' : `${products.length} items`}</p>
            <p>Categories: {categoriesLoading ? 'Loading...' : `${categories.length} items`}</p>
          </div>
          
          <div>
            <h3 className="font-bold">LocalStorage Raw Data:</h3>
            {Object.entries(localStorageData).map(([key, value]) => (
              <div key={key} className="mb-2">
                <strong>{key}:</strong>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                  {value ? JSON.stringify(JSON.parse(value), null, 2) : 'null'}
                </pre>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-bold">Products from Hook:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(products, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-bold">Categories from Hook:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(categories, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CMSDebug;
