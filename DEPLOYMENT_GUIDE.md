# 🚀 Complete nginx Deployment Guide

## Prerequisites
- Ubuntu/CentOS server with root access
- Domain name pointed to your server
- SSL certificate (Let's Encrypt recommended)

## Step 1: Server Setup

### Install nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install epel-release
sudo yum install nginx

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Install Node.js (if building on server)
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

## Step 2: SSL Certificate Setup

### Option A: Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot

# Create symbolic link
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Option B: Custom SSL Certificate
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/certs
sudo mkdir -p /etc/ssl/private

# Copy your certificate files
sudo cp your-domain.crt /etc/ssl/certs/
sudo cp your-domain.key /etc/ssl/private/

# Set proper permissions
sudo chmod 644 /etc/ssl/certs/your-domain.crt
sudo chmod 600 /etc/ssl/private/your-domain.key
```

## Step 3: Prepare Application

### On your local machine:
```bash
# Build production version
chmod +x build.sh
./build.sh

# Create deployment archive
tar -czf india-engineering-works.tar.gz deployment/
```

### Upload to server:
```bash
# Using SCP
scp india-engineering-works.tar.gz user@your-server:/tmp/

# Or using rsync
rsync -avz deployment/ user@your-server:/tmp/deployment/
```

## Step 4: Deploy Application

### On your server:
```bash
# Create web directory
sudo mkdir -p /var/www/india-engineering-works

# Extract files
cd /tmp
tar -xzf india-engineering-works.tar.gz
sudo cp -r deployment/* /var/www/india-engineering-works/

# Set proper ownership
sudo chown -R www-data:www-data /var/www/india-engineering-works
sudo chmod -R 755 /var/www/india-engineering-works
```

## Step 5: Configure nginx

### Create site configuration:
```bash
sudo nano /etc/nginx/sites-available/india-engineering-works
```

### Paste this configuration:
```nginx
# HTTP redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # Root directory
    root /var/www/india-engineering-works;
    index index.html index.htm;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' https://firebaseapp.com https://*.firebaseapp.com https://firebase.googleapis.com https://*.googleapis.com 'unsafe-inline' 'unsafe-eval'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
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
    
    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Admin route (optional protection)
    location /admin {
        # Uncomment for basic auth protection
        # auth_basic "Admin Area";
        # auth_basic_user_file /etc/nginx/.htpasswd;
        try_files $uri $uri/ /index.html;
    }
    
    # API routes (if you add backend later)
    location /api {
        # Proxy to backend if needed
        # proxy_pass http://localhost:3001;
        # proxy_http_version 1.1;
        # proxy_set_header Upgrade $http_upgrade;
        # proxy_set_header Connection 'upgrade';
        # proxy_set_header Host $host;
        # proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
    }
    
    # Security - deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Robots.txt and sitemap
    location = /robots.txt {
        access_log off;
        log_not_found off;
    }
    
    location = /sitemap.xml {
        access_log off;
        log_not_found off;
    }
}
```

### Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/india-engineering-works /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 6: Environment Configuration

### Create production environment:
```bash
# Create environment file on server
sudo nano /var/www/india-engineering-works/.env.production

# Add your Firebase configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=india-engineering-works.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=india-engineering-works
VITE_FIREBASE_STORAGE_BUCKET=india-engineering-works.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Step 7: Monitoring & Maintenance

### Create update script:
```bash
sudo nano /usr/local/bin/update-website.sh
```

```bash
#!/bin/bash

# Website update script
BACKUP_DIR="/var/backups/website"
WEB_DIR="/var/www/india-engineering-works"
TEMP_DIR="/tmp/website-update"

echo "🔄 Starting website update..."

# Create backup
sudo mkdir -p $BACKUP_DIR
sudo tar -czf $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz -C $WEB_DIR .

# Update files
if [ -f "$TEMP_DIR/deployment.tar.gz" ]; then
    cd $TEMP_DIR
    tar -xzf deployment.tar.gz
    sudo cp -r deployment/* $WEB_DIR/
    sudo chown -R www-data:www-data $WEB_DIR
    sudo chmod -R 755 $WEB_DIR
    echo "✅ Website updated successfully!"
else
    echo "❌ Update file not found!"
    exit 1
fi

# Test nginx configuration
sudo nginx -t && sudo systemctl reload nginx

echo "🚀 Update completed!"
```

```bash
# Make script executable
sudo chmod +x /usr/local/bin/update-website.sh
```

### Setup log rotation:
```bash
sudo nano /etc/logrotate.d/nginx-website
```

```
/var/log/nginx/access.log /var/log/nginx/error.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 www-data adm
    prerotate
        if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
            run-parts /etc/logrotate.d/httpd-prerotate; \
        fi \
    endprerotate
    postrotate
        invoke-rc.d nginx rotate >/dev/null 2>&1
    endpostrotate
}
```

## Step 8: Performance Optimization

### Add HTTP/2 Push (optional):
```bash
# Add to nginx server block
location = /index.html {
    http2_push /assets/index.css;
    http2_push /assets/index.js;
}
```

### Setup monitoring:
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor nginx status
sudo systemctl status nginx

# Check nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🎉 Deployment Complete!

Your website is now live at: https://your-domain.com

### Admin access:
- Website: https://your-domain.com/admin
- Firebase Console: https://console.firebase.google.com

### Maintenance commands:
```bash
# Restart nginx
sudo systemctl restart nginx

# Update SSL certificate
sudo certbot renew

# Check website status
curl -I https://your-domain.com

# Monitor server resources
htop
```
