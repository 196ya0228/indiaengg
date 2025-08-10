import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Youtube, Instagram, Facebook, Share2 } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  category: string;
}

const VideoSection = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load videos from localStorage or use default videos
    const savedVideos = localStorage.getItem('iew_videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      // Default videos
      const defaultVideos: VideoItem[] = [
        {
          id: '1',
          title: 'Jaggery Making Machine Operation',
          description: 'Complete demonstration of our commercial jaggery making machine with automated temperature control.',
          thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          duration: '3:24',
          youtubeUrl: 'https://youtube.com/watch?v=example1',
          instagramUrl: 'https://instagram.com/p/example1',
          facebookUrl: 'https://facebook.com/watch/example1',
          category: 'jaggery'
        },
        {
          id: '2',
          title: 'Mini Sugar Plant Setup Process',
          description: 'Step-by-step installation and setup process of our complete mini sugar plant.',
          thumbnail: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          duration: '5:12',
          youtubeUrl: 'https://youtube.com/watch?v=example2',
          instagramUrl: 'https://instagram.com/p/example2',
          category: 'sugar-plant'
        },
        {
          id: '3',
          title: 'Sugar Cane Crusher Performance Test',
          description: 'High-capacity sugar cane crusher processing demonstration with efficiency metrics.',
          thumbnail: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          duration: '2:45',
          youtubeUrl: 'https://youtube.com/watch?v=example3',
          facebookUrl: 'https://facebook.com/watch/example3',
          category: 'crusher'
        }
      ];
      setVideos(defaultVideos);
      localStorage.setItem('iew_videos', JSON.stringify(defaultVideos));
    }
  }, []);

  const categories = [
    { value: 'all', label: 'All Videos' },
    { value: 'jaggery', label: 'Jaggery Machines' },
    { value: 'sugar-plant', label: 'Sugar Plants' },
    { value: 'crusher', label: 'Crushers' },
    { value: 'spare-parts', label: 'Spare Parts' }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  const handleSocialClick = (url?: string, platform?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.log(`${platform} link not available for this video`);
    }
  };

  const handleVideoPlay = (video: VideoItem) => {
    // Priority: YouTube > Instagram > Facebook
    if (video.youtubeUrl) {
      window.open(video.youtubeUrl, '_blank');
    } else if (video.instagramUrl) {
      window.open(video.instagramUrl, '_blank');
    } else if (video.facebookUrl) {
      window.open(video.facebookUrl, '_blank');
    } else {
      console.log('No video link available');
    }
  };

  const handleShare = async (video: VideoItem) => {
    const shareData = {
      title: video.title,
      text: video.description,
      url: video.youtubeUrl || video.instagramUrl || video.facebookUrl || window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url || '');
      console.log('Video link copied to clipboard');
    }
  };

  return (
    <section id="videos-section" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Videos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch our machinery in action and see the quality craftsmanship that goes into every product.
            Follow us on social media for more videos and updates.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        onClick={() => handleVideoPlay(video)}
                        size="lg"
                        className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-4 group-hover:scale-110 transition-transform duration-300"
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(video);
                        }}
                        size="sm"
                        variant="ghost"
                        className="bg-black/40 hover:bg-black/60 text-white p-2"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {video.description}
                  </p>

                  {/* Category Badge */}
                  <Badge variant="secondary" className="mb-3">
                    {categories.find(cat => cat.value === video.category)?.label || 'Other'}
                  </Badge>

                  {/* Social Media Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {video.youtubeUrl && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSocialClick(video.youtubeUrl, 'YouTube');
                          }}
                          size="sm"
                          variant="outline"
                          className="p-2 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Youtube className="h-4 w-4" />
                        </Button>
                      )}
                      {video.instagramUrl && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSocialClick(video.instagramUrl, 'Instagram');
                          }}
                          size="sm"
                          variant="outline"
                          className="p-2 border-pink-200 text-pink-600 hover:bg-pink-50"
                        >
                          <Instagram className="h-4 w-4" />
                        </Button>
                      )}
                      {video.facebookUrl && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSocialClick(video.facebookUrl, 'Facebook');
                          }}
                          size="sm"
                          variant="outline"
                          className="p-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Button
                      onClick={() => handleVideoPlay(video)}
                      size="sm"
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Watch
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No videos found</h3>
            <p className="text-gray-500">No videos available for the selected category.</p>
          </div>
        )}

        {/* Social Media Follow Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us for More Videos</h3>
          <p className="text-gray-600 mb-6">Stay updated with our latest machinery videos and industry insights</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => window.open('https://youtube.com/@indiaengineeringworks', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Youtube className="h-5 w-5" />
              YouTube
            </Button>
            <Button
              onClick={() => window.open('https://instagram.com/indiaengineeringworks', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </Button>
            <Button
              onClick={() => window.open('https://facebook.com/indiaengineeringworks', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
