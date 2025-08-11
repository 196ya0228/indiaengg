import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Play, MessageCircle, Phone, ShoppingCart, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useLanguage';
import { HeaderLanguageSwitcher, FooterLanguageSwitcher } from '@/components/LanguageSwitcher';

const LanguageDemo: React.FC = () => {
  const { t, language } = useTranslation();

  const demoSections = [
    {
      title: 'Header & Navigation',
      items: [
        { key: 'header.companyName', label: 'Company Name' },
        { key: 'navigation.home', label: 'Home' },
        { key: 'navigation.about', label: 'About' },
        { key: 'navigation.products', label: 'Products' },
        { key: 'navigation.contact', label: 'Contact' }
      ]
    },
    {
      title: 'Hero Section',
      items: [
        { key: 'hero.title', label: 'Main Title' },
        { key: 'hero.subtitle', label: 'Subtitle' },
        { key: 'hero.getStarted', label: 'Get Started Button' },
        { key: 'hero.trustedBy', label: 'Trust Message' }
      ]
    },
    {
      title: 'Products & Services',
      items: [
        { key: 'products.title', label: 'Section Title' },
        { key: 'products.subtitle', label: 'Section Subtitle' },
        { key: 'products.categories', label: 'Categories' },
        { key: 'products.featured', label: 'Featured' },
        { key: 'common.getQuote', label: 'Get Quote Button' }
      ]
    },
    {
      title: 'Contact & CTA',
      items: [
        { key: 'cta.title', label: 'CTA Title' },
        { key: 'cta.instantQuote', label: 'Instant Quote' },
        { key: 'cta.whatsappContact', label: 'WhatsApp Contact' },
        { key: 'cta.callDirect', label: 'Call Direct' },
        { key: 'contact.sendMessage', label: 'Send Message' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Card className="mb-8 shadow-xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Globe className="h-8 w-8" />
                  Regional Language System Demo
                </CardTitle>
                <p className="text-blue-100 mt-2">
                  Switch between English, Hindi, Marathi, Gujarati, and Punjabi
                </p>
              </div>
              <HeaderLanguageSwitcher className="bg-white/10 border-white/20 hover:bg-white/20" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">5 Languages</h3>
                <p className="text-sm text-gray-600">Complete support for regional languages</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Real-time Switching</h3>
                <p className="text-sm text-gray-600">Instant language changes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Business Ready</h3>
                <p className="text-sm text-gray-600">Professional translations</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Current Language:</strong> {language.toUpperCase()} | 
                Use the language switcher above to see translations update in real-time!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {demoSections.map((section, index) => (
            <Card key={index} className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-lg text-gray-800">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                      <p className="font-medium text-gray-800 mt-1">{t(item.key)}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.key}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo */}
        <Card className="shadow-xl border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="text-xl">Interactive Elements Demo</CardTitle>
            <p className="text-green-100">These buttons use translated text</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {t('header.callUs')}
              </Button>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {t('header.whatsapp')}
              </Button>
              
              <Button className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                {t('common.getQuote')}
              </Button>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <Play className="h-4 w-4" />
                {t('videos.watch')}
              </Button>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                {t('common.readMore')}
              </Button>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                {t('navigation.contact')}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">How It Works:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• All text content is stored in translation files</li>
                <li>• The `useTranslation` hook provides the `t()` function</li>
                <li>• Language changes update the entire app instantly</li>
                <li>• Fallback to English if translation is missing</li>
                <li>• Language preference is saved in localStorage</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer Demo */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Footer Language Switcher</CardTitle>
            <p className="text-gray-600">Simple text-based language links</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold">{t('footer.description')}</h4>
                  <p className="text-gray-300 text-sm mt-1">{t('footer.copyright')}</p>
                </div>
                <FooterLanguageSwitcher />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Information */}
        <Card className="mt-8 shadow-lg border border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-lg text-blue-800">Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Supported Languages</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🇬🇧</span>
                    <span>English (Default)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🇮🇳</span>
                    <span>हिंदी (Hindi)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🇮🇳</span>
                    <span>मराठी (Marathi)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🇮🇳</span>
                    <span>ગુજરાતી (Gujarati)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🇮🇳</span>
                    <span>ਪੰਜਾਬੀ (Punjabi)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Real-time language switching</li>
                  <li>✅ Persistent language preference</li>
                  <li>✅ Fallback to English for missing translations</li>
                  <li>✅ Professional business translations</li>
                  <li>✅ Multiple switcher variants</li>
                  <li>✅ SEO-friendly implementation</li>
                  <li>✅ Mobile responsive design</li>
                  <li>✅ TypeScript support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="mt-8 shadow-lg border border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-lg text-purple-800">Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              <h4 className="font-semibold text-gray-800">How to Use Language Switching:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click the language switcher in the header (🇬🇧 English ▼)</li>
                <li>Select your preferred language from the dropdown</li>
                <li>Watch as all text on the page updates instantly</li>
                <li>Your language preference is automatically saved</li>
                <li>Navigate to any page - language setting persists</li>
              </ol>

              <h4 className="font-semibold text-gray-800 mt-6">For Developers:</h4>
              <div className="bg-gray-100 p-4 rounded-lg mt-2">
                <code className="text-sm">
                  {`import { useTranslation } from '@/hooks/useLanguage';
const { t } = useTranslation();
// Use: {t('navigation.home')} for translated text`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageDemo;
