#!/bin/bash

# India Engineering Works - Debian Deployment Script
# Usage: ./debian-deploy.sh your-domain.com

set -e

DOMAIN=$1
if [ -z "$DOMAIN" ]; then
    echo "❌ Usage: $0 your-domain.com"
    exit 1
fi

echo "🚀 Deploying India Engineering Works on Debian..."
echo "🌐 Domain: $DOMAIN"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "📦 Installing nginx, certbot, and dependencies..."
apt install -y nginx certbot python3-certbot-nginx ufw curl wget unzip

# Create directories
echo "📁 Creating directories..."
mkdir -p /var/www/india-engineering-works
mkdir -p /tmp/website-deploy

# Set up firewall
echo "🔥 Configuring firewall..."
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Create nginx configuration
echo "⚙️ Creating nginx configuration..."
cat > /etc/nginx/sites-available/india-engineering-works << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    
    root /var/www/india-engineering-works;
    index index.html index.htm;
    
    # Handle React Router (SPA routing)
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Admin route
    location /admin {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Security - deny hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/x-javascript
        application/xml+rss
        application/javascript
        application/json
        image/svg+xml;
}
EOF

# Enable site
echo "🔧 Enabling nginx site..."
ln -sf /etc/nginx/sites-available/india-engineering-works /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "🔍 Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    systemctl restart nginx
    systemctl enable nginx
else
    echo "❌ Nginx configuration error!"
    exit 1
fi

# Set up automatic SSL renewal
echo "🔄 Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

echo "✅ Server setup completed!"
echo ""
echo "📝 Next steps:"
echo "1. Upload your website files to /var/www/india-engineering-works/"
echo "2. Run: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "3. Your website will be live at: https://$DOMAIN"
echo ""
echo "📋 Upload website files with:"
echo "   scp -r dist/* root@\$(hostname -I | awk '{print \$1}'):/var/www/india-engineering-works/"
echo ""
echo "🔒 Setup SSL with:"
echo "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
