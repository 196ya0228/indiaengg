import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCMSCompanyInfo } from "@/lib/cmsDataService";
import { useTranslation } from "@/hooks/useLanguage";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const { companyInfo, loading } = useCMSCompanyInfo();

  if (loading) {
    return (
      <div id="company-info" className="bg-gradient-company text-company-info-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">{t('common.loading')}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!companyInfo) {
    return null;
  }

  return (
    <div id="company-info" className="bg-gradient-company text-company-info-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Company Details */}
          <div>
            <Badge className="bg-white/20 text-white mb-4">{t('company.aboutCompany')}</Badge>
            <h2 className="text-4xl font-bold mb-8">
              {companyInfo.name?.split(' ')[0]} {companyInfo.name?.split(' ')[1]} <span className="text-modern-orange">{companyInfo.name?.split(' ')[2]}</span>
            </h2>
            
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              {companyInfo.description || t('company.defaultDescription')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">{t('company.natureOfBusiness')}</h4>
                  <p className="text-sm opacity-90">{t('company.manufacturer')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">{t('company.establishedYear')}</h4>
                  <p className="text-sm opacity-90">{companyInfo.establishedYear || '1989'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">{t('company.annualTurnover')}</h4>
                  <p className="text-sm opacity-90">{companyInfo.annualTurnover || 'Rs. 5 - 50 Cr'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">{t('company.legalStatus')}</h4>
                  <p className="text-sm opacity-90">{companyInfo.legalStatus || 'Propertiership'}</p>
                </div>
              </div>
              
              {companyInfo.gstNumber && (
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('company.gstNumber')}</h4>
                    <p className="text-sm opacity-90">{companyInfo.gstNumber}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">{t('company.location')}</h4>
                  <p className="text-sm opacity-90">{companyInfo.location}</p>
                </div>
              </div>
            </div>
            
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-modern-orange mb-2">35+</div>
                <div className="text-sm">{t('company.yearsExperience')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-modern-orange mb-2">1000+</div>
                <div className="text-sm">{t('company.happyClients')}</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>{t('company.premiumQuality')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>{t('company.perfectFinishing')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>{t('company.transparentPolicies')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>{t('company.customerSatisfaction')}</span>
              </div>
            </div>

            {/* Contact Information */}
            {(companyInfo.phoneNumbers?.length > 0 || companyInfo.whatsappNumber || companyInfo.email) && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-3">{t('company.contactInfo')}</h4>
                <div className="space-y-2 text-sm">
                  {companyInfo.phoneNumbers?.filter(phone => phone !== companyInfo.whatsappNumber).map((phone, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="opacity-90">📞</span>
                      <a href={`tel:${phone}`} className="hover:text-modern-orange transition-colors">
                        {phone}
                      </a>
                    </div>
                  ))}
                  {companyInfo.whatsappNumber && (
                    <div className="flex items-center gap-2">
                      <span className="opacity-90">📱</span>
                      <a
                        href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-modern-orange transition-colors"
                      >
                        {companyInfo.whatsappNumber} (WhatsApp)
                      </a>
                    </div>
                  )}
                  {companyInfo.email && (
                    <div className="flex items-center gap-2">
                      <span className="opacity-90">📧</span>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="hover:text-modern-orange transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 font-bold text-xs">
                IND
              </div>
              <h4 className="font-semibold mb-1">IndiaMART</h4>
              <p className="text-sm opacity-90">{t('company.verifiedExporter')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 font-bold text-xs">
                TID
              </div>
              <h4 className="font-semibold mb-1">TradeIndia</h4>
              <p className="text-sm opacity-90">{t('company.verifiedSupplier')}</p>
            </div>

            {/* Additional CMS-managed info */}
            {companyInfo.address && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-semibold mb-2">{t('company.address')}</h4>
                <p className="text-sm opacity-90">{companyInfo.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
