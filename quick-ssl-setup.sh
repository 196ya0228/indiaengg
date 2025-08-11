#!/bin/bash

# Quick SSL Setup Script for India Engineering Works
# Usage: ./quick-ssl-setup.sh your-domain.com your-email@example.com

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "❌ Usage: $0 your-domain.com your-email@example.com"
    echo "Example: $0 indiaengineeringworks.com admin@indiaengineeringworks.com"
    exit 1
fi

echo "🔒 Setting up SSL for $DOMAIN..."

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing certbot..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Get SSL certificate
echo "🔐 Obtaining SSL certificate..."
certbot --nginx \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive \
    --redirect

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate installed successfully!"
    echo "🌐 Your website is now secure: https://$DOMAIN"
    
    # Test the certificate
    echo "🔍 Testing SSL certificate..."
    sleep 2
    curl -I https://$DOMAIN
    
    echo ""
    echo "🎉 SSL Setup Complete!"
    echo "📋 Certificate details:"
    certbot certificates
    
    echo ""
    echo "🔄 Auto-renewal is already configured"
    echo "🔍 Test renewal with: certbot renew --dry-run"
else
    echo "❌ SSL certificate installation failed!"
    echo "📋 Please check:"
    echo "1. Domain DNS is pointing to this server"
    echo "2. Firewall allows ports 80 and 443"
    echo "3. nginx is running: systemctl status nginx"
    exit 1
fi
