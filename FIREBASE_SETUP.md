# 🔥 Complete Firebase Setup Guide

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Click "Create a project"**
3. **Project name**: `india-engineering-works`
4. **Enable Google Analytics**: Yes (recommended)
5. **Click "Create project"**

## Step 2: Configure Firebase Services

### 🔐 Authentication Setup
```bash
1. Go to "Authentication" > "Sign-in method"
2. Enable "Email/Password"
3. Add authorized domain: your-domain.com
4. Create admin user:
   - Email: admin@indiaengineeringworks.com
   - Password: [Your secure password]
```

### 🗄️ Firestore Database Setup
```bash
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select location: asia-south1 (Mumbai) - closest to India
5. Click "Done"
```

### 📁 Storage Setup
```bash
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in production mode"
4. Select location: asia-south1 (Mumbai)
5. Click "Done"
```

### ⚙️ Firestore Security Rules
```javascript
// Firestore Rules (replace default rules)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for products, categories, and company info
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
    
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
    
    match /company/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
    
    // Admin-only access for inquiries and analytics
    match /inquiries/{document} {
      allow read, write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
    
    match /analytics/{document} {
      allow read, write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
  }
}
```

### 📁 Storage Security Rules
```javascript
// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
    
    match /company/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@indiaengineeringworks.com";
    }
  }
}
```

## Step 3: Get Firebase Configuration

1. **Go to Project Settings** (gear icon)
2. **Scroll down to "Your apps"**
3. **Click "Web" icon (</>)**
4. **Register app name**: `india-engineering-works-web`
5. **Copy the configuration object**

## Step 4: Environment Configuration

Create `.env.production` file:
```env
# Production Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=india-engineering-works.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=india-engineering-works
VITE_FIREBASE_STORAGE_BUCKET=india-engineering-works.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Admin Configuration
VITE_ADMIN_EMAIL=admin@indiaengineeringworks.com
```

## Step 5: Initial Data Setup

Run this in Firebase Console > Firestore:

### Create Company Document
```javascript
// Collection: company
// Document ID: info
{
  name: "India Engineering Works",
  gst: "09AABPI0229C1ZD",
  phoneNumbers: ["+919897601094", "+919837200396"],
  whatsappNumber: "+919837200396",
  email: "india_enggworks@yahoo.in",
  location: "Muzaffarnagar UP IN",
  workingHours: "Mon-Sun: 8AM-8PM",
  legalStatus: "Propertiership",
  annualTurnover: "Rs. 5 - 50 Cr",
  establishedYear: "1988",
  updatedAt: new Date()
}
```

### Create Categories
```javascript
// Collection: categories
// Document 1:
{
  title: "Jaggery & Gur Production Plant",
  badge: "SPECIALTY",
  badgeColor: "bg-orange-600",
  description: "Complete jaggery and gur production equipment",
  order: 1
}

// Document 2:
{
  title: "Sugar Cane Crushing & Processing",
  badge: "POPULAR",
  badgeColor: "bg-green-600",
  description: "Sugar cane processing machinery and equipment",
  order: 2
}

// Document 3:
{
  title: "Mini Sugar Plant & Refinery",
  badge: "COMPLETE SOLUTION",
  badgeColor: "bg-blue-600",
  description: "Complete mini sugar plant solutions",
  order: 3
}
```
