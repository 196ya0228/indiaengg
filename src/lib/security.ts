// Production-grade security utilities for India Engineering Works

/**
 * Content Security Policy configuration
 */
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for inline scripts
    "https://maps.googleapis.com",
    "https://www.google.com",
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for CSS-in-JS
    "https://fonts.googleapis.com",
  ],
  'img-src': [
    "'self'",
    "data:",
    "https://images.unsplash.com",
    "https://cdn.builder.io",
    "https://maps.googleapis.com",
    "https://maps.gstatic.com",
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com",
  ],
  'connect-src': [
    "'self'",
    "https://api.github.com",
    "https://vitals.vercel-analytics.com",
  ],
  'frame-src': [
    "https://www.google.com",
    "https://maps.google.com",
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", "mailto:"],
};

/**
 * Input sanitization for user data
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

/**
 * Validate email addresses
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validate phone numbers (Indian format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91|0)?[6789]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Rate limiting utility
 */
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    // Check if limit exceeded
    if (record.count >= this.maxAttempts) {
      return false;
    }

    // Increment counter
    record.count++;
    record.lastAttempt = now;
    return true;
  }

  getRemainingTime(key: string): number {
    const record = this.attempts.get(key);
    if (!record || record.count < this.maxAttempts) return 0;
    
    const elapsed = Date.now() - record.lastAttempt;
    return Math.max(0, this.windowMs - elapsed);
  }
}

export const contactFormLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 attempts per 10 minutes
export const adminLoginLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

/**
 * Secure local storage wrapper
 */
export const secureStorage = {
  set: (key: string, value: any, expiry?: number): void => {
    try {
      const item = {
        value,
        expiry: expiry || Date.now() + 24 * 60 * 60 * 1000, // 24 hours default
        timestamp: Date.now(),
      };
      localStorage.setItem(`iew_${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Failed to save to secure storage:', error);
    }
  },

  get: (key: string): any => {
    try {
      const itemStr = localStorage.getItem(`iew_${key}`);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(`iew_${key}`);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('Failed to read from secure storage:', error);
      return null;
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(`iew_${key}`);
  },

  clear: (): void => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('iew_')) {
        localStorage.removeItem(key);
      }
    });
  }
};

/**
 * Generate secure random IDs
 */
export const generateSecureId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${randomPart}`;
};

/**
 * Validate and sanitize URLs
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * CSRF token generator (for future API integration)
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Security headers check
 */
export const checkSecurityHeaders = (): void => {
  if (typeof window === 'undefined') return;

  // Check if running on HTTPS in production
  if (process.env.NODE_ENV === 'production' && location.protocol !== 'https:') {
    console.warn('🔒 Security Warning: Site should use HTTPS in production');
  }

  // Check for secure context features
  if (!window.isSecureContext) {
    console.warn('🔒 Security Warning: Some features require secure context (HTTPS)');
  }

  // Check Content Security Policy
  const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!metaCSP) {
    console.info('💡 Consider adding Content Security Policy meta tag for enhanced security');
  }
};

/**
 * Initialize security measures
 */
export const initializeSecurity = (): void => {
  checkSecurityHeaders();
  
  // Prevent right-click in production (optional)
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      // Allow right-click on development
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
    });

    // Prevent F12 and other developer shortcuts
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    });
  }

  // Set up error reporting
  window.addEventListener('error', (event) => {
    const errorData = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Store error locally (in production, send to monitoring service)
    console.error('Global error caught:', errorData);
    secureStorage.set(`error_${Date.now()}`, errorData, Date.now() + 7 * 24 * 60 * 60 * 1000);
  });
};

export default {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  contactFormLimiter,
  adminLoginLimiter,
  secureStorage,
  generateSecureId,
  isValidUrl,
  generateCSRFToken,
  initializeSecurity,
};
