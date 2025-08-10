#!/bin/bash

# Production Build Script for India Engineering Works
echo "🏭 Building India Engineering Works Website for Production..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building production version..."
npm run build

# Create deployment package
echo "📋 Creating deployment package..."
if [ -d "deployment" ]; then
    rm -rf deployment
fi

mkdir deployment
cp -r dist/* deployment/
cp -r public/* deployment/ 2>/dev/null || true

# Create nginx configuration
cat > deployment/nginx.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL configuration (replace with your SSL certificate paths)
    ssl_certificate /etc/ssl/certs/your-domain.crt;
    ssl_certificate_key /etc/ssl/private/your-domain.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Root directory
    root /var/www/india-engineering-works;
    index index.html index.htm;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Admin route protection (optional)
    location /admin {
        # Add basic auth if needed
        # auth_basic "Admin Area";
        # auth_basic_user_file /etc/nginx/.htpasswd;
        try_files $uri $uri/ /index.html;
    }
    
    # Security
    location ~ /\. {
        deny all;
    }
}
EOF

echo "✅ Production build completed!"
echo "📁 Files ready in 'deployment' folder"
echo "🌐 Next: Set up Firebase and deploy to nginx"
