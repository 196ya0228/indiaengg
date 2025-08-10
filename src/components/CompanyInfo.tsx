import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyInfo = () => {
  return (
    <div id="company-info" className="bg-gradient-company text-company-info-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Company Details */}
          <div>
            <Badge className="bg-white/20 text-white mb-4">ABOUT COMPANY</Badge>
            <h2 className="text-4xl font-bold mb-8">India Engineering <span className="text-modern-orange">Works</span></h2>
            
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              Machines form an essential part of all industries. Various industries require different types of machines for carrying out production, 
              packaging, and many other processes. Therefore, we, <strong>India Engineering Works</strong>, started manufacturing a variety of heavy machines.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Nature of Business</h4>
                  <p className="text-sm opacity-90">Manufacturer</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">GST Registration Date</h4>
                  <p className="text-sm opacity-90">01-07-2017</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Annual Turnover</h4>
                  <p className="text-sm opacity-90">Rs. 5 - 50 Cr</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Legal Status of Firm</h4>
                  <p className="text-sm opacity-90">Propertiership</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold">GST No.</h4>
                  <p className="text-sm opacity-90">09AABPI0229C1ZD</p>
                </div>
              </div>
            </div>
            
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-modern-orange mb-2">35+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-modern-orange mb-2">1000+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>Premium Quality Products</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>Perfect Finishing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>Transparent and Ethical Policies</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-modern-orange rounded-full"></div>
                <span>Customer Satisfaction</span>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 font-bold text-xs">
                IND
              </div>
              <h4 className="font-semibold mb-1">IndiaMART</h4>
              <p className="text-sm opacity-90">Verified Exporter & Trust Seal</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 font-bold text-xs">
                TID
              </div>
              <h4 className="font-semibold mb-1">TradeIndia</h4>
              <p className="text-sm opacity-90">Verified Supplier & Trust Seal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
