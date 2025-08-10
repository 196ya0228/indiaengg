import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Play,
  Youtube,
  Instagram,
  Facebook,
  ExternalLink,
  Copy,
  Eye
} from "lucide-react";

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
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const VIDEO_CATEGORIES = [
  { value: 'jaggery', label: 'Jaggery Machines' },
  { value: 'sugar-plant', label: 'Sugar Plants' },
  { value: 'crusher', label: 'Crushers' },
  { value: 'spare-parts', label: 'Spare Parts' },
  { value: 'installation', label: 'Installation' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'testimonial', label: 'Customer Testimonials' }
];

const VideoCMS = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [formData, setFormData] = useState<Partial<VideoItem>>({
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
    youtubeUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    category: '',
    isActive: true
  });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    localStorage.setItem('iew_videos', JSON.stringify(videos));
  }, [videos]);

  const loadVideos = () => {
    const savedVideos = localStorage.getItem('iew_videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      // Initialize with sample videos
      const sampleVideos: VideoItem[] = [
        {
          id: '1',
          title: 'Jaggery Making Machine Operation',
          description: 'Complete demonstration of our commercial jaggery making machine with automated temperature control.',
          thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          duration: '3:24',
          youtubeUrl: 'https://youtube.com/watch?v=example1',
          instagramUrl: 'https://instagram.com/p/example1',
          facebookUrl: 'https://facebook.com/watch/example1',
          category: 'jaggery',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Mini Sugar Plant Setup Process',
          description: 'Step-by-step installation and setup process of our complete mini sugar plant.',
          thumbnail: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          duration: '5:12',
          youtubeUrl: 'https://youtube.com/watch?v=example2',
          instagramUrl: 'https://instagram.com/p/example2',
          category: 'sugar-plant',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setVideos(sampleVideos);
    }
  };

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      thumbnail: '',
      duration: '',
      youtubeUrl: '',
      instagramUrl: '',
      facebookUrl: '',
      category: '',
      isActive: true
    });
  };

  const validateForm = (): boolean => {
    if (!formData.title || !formData.description || !formData.category) {
      showAlert('Please fill in all required fields (Title, Description, Category)', 'error');
      return false;
    }
    
    if (!formData.youtubeUrl && !formData.instagramUrl && !formData.facebookUrl) {
      showAlert('Please provide at least one social media video link', 'error');
      return false;
    }
    
    return true;
  };

  const extractVideoId = (url: string, platform: 'youtube' | 'instagram' | 'facebook'): string => {
    try {
      const urlObj = new URL(url);
      switch (platform) {
        case 'youtube':
          return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop() || '';
        case 'instagram':
          return urlObj.pathname.split('/')[2] || '';
        case 'facebook':
          return urlObj.pathname.split('/').pop() || '';
        default:
          return '';
      }
    } catch {
      return '';
    }
  };

  const generateThumbnail = (): string => {
    if (formData.youtubeUrl) {
      const videoId = extractVideoId(formData.youtubeUrl, 'youtube');
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return formData.thumbnail || 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const handleAddVideo = () => {
    if (!validateForm()) return;

    const newVideo: VideoItem = {
      id: Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      thumbnail: formData.thumbnail || generateThumbnail(),
      duration: formData.duration || '0:00',
      youtubeUrl: formData.youtubeUrl,
      instagramUrl: formData.instagramUrl,
      facebookUrl: formData.facebookUrl,
      category: formData.category!,
      isActive: formData.isActive || true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setVideos([...videos, newVideo]);
    setIsAddDialogOpen(false);
    resetForm();
    showAlert('Video added successfully!', 'success');
  };

  const handleEditVideo = () => {
    if (!editingVideo || !validateForm()) return;

    const updatedVideo: VideoItem = {
      ...editingVideo,
      title: formData.title!,
      description: formData.description!,
      thumbnail: formData.thumbnail || generateThumbnail(),
      duration: formData.duration || editingVideo.duration,
      youtubeUrl: formData.youtubeUrl,
      instagramUrl: formData.instagramUrl,
      facebookUrl: formData.facebookUrl,
      category: formData.category!,
      isActive: formData.isActive !== undefined ? formData.isActive : editingVideo.isActive,
      updatedAt: new Date().toISOString()
    };

    setVideos(videos.map(v => v.id === editingVideo.id ? updatedVideo : v));
    setIsEditDialogOpen(false);
    setEditingVideo(null);
    resetForm();
    showAlert('Video updated successfully!', 'success');
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(v => v.id !== id));
      showAlert('Video deleted successfully!', 'success');
    }
  };

  const openEditDialog = (video: VideoItem) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      duration: video.duration,
      youtubeUrl: video.youtubeUrl,
      instagramUrl: video.instagramUrl,
      facebookUrl: video.facebookUrl,
      category: video.category,
      isActive: video.isActive
    });
    setIsEditDialogOpen(true);
  };

  const toggleVideoStatus = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, isActive: !video.isActive, updatedAt: new Date().toISOString() }
        : video
    ));
    showAlert('Video status updated!', 'success');
  };

  const duplicateVideo = (video: VideoItem) => {
    const duplicatedVideo: VideoItem = {
      ...video,
      id: Date.now().toString(),
      title: `${video.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setVideos([...videos, duplicatedVideo]);
    showAlert('Video duplicated successfully!', 'success');
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || video.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && video.isActive) ||
                         (filterStatus === 'inactive' && !video.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const VideoForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Video Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter video title"
          />
        </div>
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {VIDEO_CATEGORIES.map(category => (
                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter video description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration (mm:ss)</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 3:24"
          />
        </div>
        <div>
          <Label htmlFor="thumbnail">Custom Thumbnail URL</Label>
          <Input
            id="thumbnail"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            placeholder="Leave empty to auto-generate from YouTube"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Social Media Links (At least one required)</h4>
        
        <div>
          <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
            <Youtube className="h-4 w-4 text-red-600" />
            YouTube URL
          </Label>
          <Input
            id="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div>
          <Label htmlFor="instagramUrl" className="flex items-center gap-2">
            <Instagram className="h-4 w-4 text-pink-600" />
            Instagram URL
          </Label>
          <Input
            id="instagramUrl"
            value={formData.instagramUrl}
            onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
            placeholder="https://instagram.com/p/..."
          />
        </div>

        <div>
          <Label htmlFor="facebookUrl" className="flex items-center gap-2">
            <Facebook className="h-4 w-4 text-blue-600" />
            Facebook URL
          </Label>
          <Input
            id="facebookUrl"
            value={formData.facebookUrl}
            onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
            placeholder="https://facebook.com/watch/..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="rounded"
        />
        <Label htmlFor="isActive">Active (visible on website)</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={isEdit ? handleEditVideo : handleAddVideo} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {isEdit ? 'Update Video' : 'Add Video'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            if (isEdit) {
              setIsEditDialogOpen(false);
              setEditingVideo(null);
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
          <h2 className="text-2xl font-bold">Video Management</h2>
          <p className="text-gray-600">Manage product videos and social media links</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Video</DialogTitle>
            </DialogHeader>
            <VideoForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {VIDEO_CATEGORIES.map(category => (
              <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Videos</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-600 flex items-center">
          <Play className="h-4 w-4 mr-1" />
          {filteredVideos.length} videos
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="sm"
                  className="bg-white/90 text-gray-900 hover:bg-white"
                  onClick={() => {
                    const url = video.youtubeUrl || video.instagramUrl || video.facebookUrl;
                    if (url) window.open(url, '_blank');
                  }}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={video.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                  {video.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {VIDEO_CATEGORIES.find(cat => cat.value === video.category)?.label}
                </Badge>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              
              <div className="flex items-center gap-2">
                {video.youtubeUrl && <Youtube className="h-4 w-4 text-red-600" />}
                {video.instagramUrl && <Instagram className="h-4 w-4 text-pink-600" />}
                {video.facebookUrl && <Facebook className="h-4 w-4 text-blue-600" />}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(video)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => toggleVideoStatus(video.id)}
                  className={video.isActive ? 'text-orange-600' : 'text-green-600'}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {video.isActive ? 'Hide' : 'Show'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => duplicateVideo(video)}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteVideo(video.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Play className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No videos found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Video
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
          </DialogHeader>
          <VideoForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoCMS;
