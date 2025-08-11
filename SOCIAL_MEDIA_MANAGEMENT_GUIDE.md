# Social Media Management Guide

## Overview
The CMS now includes comprehensive social media management functionality that allows you to update and control all your social media handles from one central location.

## Features

### 1. **Social Media CMS Tab**
- **Location**: Admin Dashboard → Social Media
- **Purpose**: Centralized management of all social media accounts

### 2. **Supported Platforms**
- **YouTube**: Video content and channel management
- **Instagram**: Photo/video posts and stories
- **Facebook**: Business page and community management  
- **Twitter**: Quick updates and industry news
- **LinkedIn**: Professional networking and B2B content

### 3. **Management Features**

#### **Profile Configuration**
- **Profile URL**: Complete link to your social media profile
- **Username/Handle**: Your @username or handle
- **Display Name**: Business name shown on the platform
- **Description**: Brief description of your content strategy
- **Followers Count**: Optional follower count display
- **Enable/Disable**: Toggle platforms on/off

#### **Display Settings**
- **Show in Header**: Social icons in website header
- **Show in Footer**: Social links in website footer
- **Show in Video Section**: Follow buttons in video section
- **Show Follower Count**: Display follower numbers

## How to Use

### **Step 1: Access Social Media Management**
1. Login to Admin Dashboard
2. Click **"Social Media"** tab
3. You'll see all supported platforms

### **Step 2: Configure Each Platform**
For each social media platform:

1. **Toggle Enable/Disable** - Turn platform on/off
2. **Profile URL** - Enter complete URL (e.g., `https://youtube.com/@yourhandle`)
3. **Username** - Enter your handle (e.g., `@yourhandle`)
4. **Display Name** - Your business name
5. **Description** - What you share on this platform
6. **Followers** - Optional follower count (e.g., "1.2K", "5.6M")

### **Step 3: Set Display Preferences**
Choose where to show social media links:
- ✅ **Header** - Small icons in top navigation
- ✅ **Footer** - Links in website footer
- ✅ **Video Section** - Follow buttons below videos
- ✅ **Follower Count** - Show numbers if desired

### **Step 4: Preview & Save**
1. Click **"Preview Mode"** to see how links will appear
2. Review all sections (Header, Video Section, Footer)
3. Click **"Save Changes"** to apply updates

## Preview Mode
Preview mode shows exactly how your social media links will appear on the website:
- **Header Social Icons**: Small clickable icons
- **Video Section Follow Buttons**: Branded buttons with platform colors
- **Footer Social Links**: Text links with icons
- **Configuration Summary**: Overview of active platforms

## URL Validation
The system automatically validates URLs:
- ✅ **Valid**: `https://youtube.com/@yourhandle`
- ❌ **Invalid**: `youtube.com/yourhandle` (missing https://)
- **Test Button**: Click "Test" to open link in new tab

## Default Configuration
The system comes pre-configured with:
```
YouTube: https://youtube.com/@indiaengineeringworks
Instagram: https://instagram.com/indiaengineeringworks  
Facebook: https://facebook.com/indiaengineeringworks
Twitter: Disabled by default
LinkedIn: https://linkedin.com/company/india-engineering-works
```

## Integration Points

### **1. Video Section Integration**
- Social media links automatically update in video section
- Follow buttons use your configured URLs
- Platform branding matches your settings

### **2. Header/Footer Integration** (Future Enhancement)
- Social icons will appear based on display settings
- Consistent styling across all sections

### **3. Individual Video Social Links**
- Each video can have specific social media URLs
- Managed separately in Video CMS
- Falls back to main account URLs

## Best Practices

### **URL Formats**
- **YouTube**: `https://youtube.com/@yourhandle` or `https://youtube.com/c/YourChannel`
- **Instagram**: `https://instagram.com/yourhandle`
- **Facebook**: `https://facebook.com/yourpage`
- **Twitter**: `https://twitter.com/yourhandle`
- **LinkedIn**: `https://linkedin.com/company/your-company`

### **Content Strategy**
- **YouTube**: Product demos, manufacturing processes
- **Instagram**: Behind-the-scenes, product highlights
- **Facebook**: Customer testimonials, company updates
- **Twitter**: Industry news, quick updates
- **LinkedIn**: Professional content, B2B networking

### **Display Recommendations**
- **Enable Header**: For easy access from any page
- **Enable Video Section**: To grow social following
- **Enable Footer**: For comprehensive contact info
- **Follower Count**: Only if numbers are impressive

## Troubleshooting

### **Links Not Working**
- Check URL format includes `https://`
- Use "Test" button to verify links work
- Ensure social media profiles are public

### **Changes Not Appearing**
- Click "Save Changes" after modifications
- Refresh website page to see updates
- Check if platform is enabled

### **Invalid URL Error**
- URLs must start with `https://`
- Check for typos in domain names
- Copy exact URL from browser address bar

## Technical Details

### **Data Storage**
- Configuration saved in localStorage
- Backup to Firebase if configured
- Real-time updates across website

### **Platform Colors**
Each platform uses official brand colors:
- YouTube: Red (#FF0000)
- Instagram: Pink/Purple gradient (#E4405F)
- Facebook: Blue (#1877F2)
- Twitter: Blue (#1DA1F2)
- LinkedIn: Blue (#0A66C2)

### **Integration API**
Social media data is available through:
```javascript
// Get current configuration
const config = localStorage.getItem('iew_social_media_config');

// Get simple link mapping
const links = localStorage.getItem('iew_social_media_links');
```

## Future Enhancements

### **Planned Features**
1. **Auto-Follower Count**: API integration for live counts
2. **Content Scheduling**: Schedule social media posts
3. **Analytics Integration**: Track clicks and engagement
4. **More Platforms**: TikTok, WhatsApp Business, etc.
5. **Bulk Import**: Import followers/content from platforms

### **Advanced Options**
1. **Custom Colors**: Override default platform colors
2. **Custom Icons**: Upload custom social media icons
3. **Conditional Display**: Show different links to different users
4. **A/B Testing**: Test different social media strategies

## Support
For technical issues:
1. Use "Test" buttons to verify URLs
2. Check browser console for errors
3. Ensure social media profiles are accessible
4. Contact system administrator if needed

---

**Last Updated**: December 2024  
**Version**: 1.0  
**System**: India Engineering Works CMS
