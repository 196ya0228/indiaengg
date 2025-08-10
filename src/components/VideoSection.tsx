import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Product Videos</h2>
          <p className="text-lg text-muted-foreground">
            Watch our sugarcane crushers in action and see the quality craftsmanship that goes into every machine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((video) => (
            <Card key={video} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-industrial-red/20 to-industrial-green/20 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-industrial-red" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                    2:45
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Sugarcane Crusher Operation Demo {video}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See how our industrial-grade crusher processes sugarcane with maximum efficiency and minimal waste.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;