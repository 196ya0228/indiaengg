#!/bin/bash

# India Engineering Works - Server Deployment Script
# Run this script on your server after uploading files

echo "🚀 Deploying India Engineering Works Website..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing nginx..."
    apt install nginx -y
    systemctl enable nginx
fi

# Create web directory
echo "📁 Creating web directory..."
mkdir -p /var/www/india-engineering-works
chown -R www-data:www-data /var/www/india-engineering-works
chmod -R 755 /var/www/india-engineering-works

# Copy nginx configuration
echo "⚙️ Setting up nginx configuration..."
cp nginx-deployment.conf /etc/nginx/sites-available/india-engineering-works

# Enable site
ln -sf /etc/nginx/sites-available/india-engineering-works /etc/nginx/sites-enabled/

# Remove default site (optional)
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "🔍 Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    systemctl restart nginx
    echo "🌐 Website deployed successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Upload your website files to /var/www/india-engineering-works/"
    echo "2. Update domain name in /etc/nginx/sites-available/india-engineering-works"
    echo "3. Setup SSL certificate with: sudo certbot --nginx -d your-domain.com"
    echo "4. Open firewall: sudo ufw allow 80 && sudo ufw allow 443"
else
    echo "❌ Nginx configuration error. Please check the config file."
    exit 1
fi
