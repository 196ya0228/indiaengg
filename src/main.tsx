import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeSecurity } from "./lib/security";
import { initializePerformanceMonitoring } from "./lib/performance";

// Initialize production-grade features
if (typeof window !== 'undefined') {
  // Security initialization
  initializeSecurity();

  // Performance monitoring
  initializePerformanceMonitoring();

  // Service Worker registration (for PWA features)
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.info('🔧 Service Worker registered:', registration);
        })
        .catch((error) => {
          console.warn('🔧 Service Worker registration failed:', error);
        });
    });
  }

  // Console branding
  console.log(
    '%c🏭 INDIA ENGINEERING WORKS %c\n' +
    'Sugar Plant Machinery & Equipment Manufacturer\n' +
    '📍 Muzaffarnagar, Uttar Pradesh, India\n' +
    '📞 +91 98372 00396 | 📧 india_enggworks@yahoo.in\n' +
    '🌐 Professional Website by IEW Tech Team',
    'color: #1e40af; font-size: 16px; font-weight: bold;',
    'color: #374151; font-size: 12px;'
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
