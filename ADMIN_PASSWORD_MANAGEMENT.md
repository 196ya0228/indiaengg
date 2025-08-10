# Admin Password Management Guide

## Overview
The CMS admin system now includes comprehensive password management features including password change, security question setup, and password reset functionality.

## Features

### 1. Password Change
- **Location**: Admin Dashboard → Security Settings → Password Management
- **Requirements**: 
  - Current password verification
  - New password must meet security requirements:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter  
    - At least one number
    - At least one special character
- **Process**: After successful password change, you'll be automatically logged out and need to login with the new password

### 2. Security Question Setup
- **Purpose**: Enables password recovery if you forget your admin password
- **Location**: Admin Dashboard → Security Settings → Setup Security Question
- **Process**: 
  1. Select from predefined security questions
  2. Provide your answer (case-insensitive)
  3. Remember your exact answer for password recovery

### 3. Password Reset (Forgot Password)
- **Access**: Available on the login screen via "Forgot Password?" link
- **Requirements**: Security question must be set up first
- **Process**:
  1. Enter the exact security question
  2. Provide your security answer
  3. Set a new password meeting security requirements
  4. Login with the new password

## Default Credentials
- **Username**: Admin
- **Password**: `IEW@Admin2024!`

## Security Features
- **Session Duration**: 8 hours of inactivity
- **Failed Attempts**: 5 attempts before 15-minute lockout
- **Password Storage**: Hashed using simple hash function (upgrade to bcrypt recommended for production)
- **Session Management**: Automatic logout on password change

## Important Notes

### First Time Setup
1. Login with default credentials
2. **Immediately change the default password**
3. Set up a security question for password recovery
4. Store your new credentials securely

### Password Requirements
All passwords must include:
- ✅ At least 8 characters
- ✅ One uppercase letter (A-Z)
- ✅ One lowercase letter (a-z) 
- ✅ One number (0-9)
- ✅ One special character (!@#$%^&*(),.?":{}|<>)

### Security Best Practices
1. **Change Default Password**: Never use the default password in production
2. **Strong Passwords**: Use unique, complex passwords
3. **Security Question**: Choose a question with an answer only you know
4. **Regular Updates**: Change passwords periodically
5. **Secure Storage**: Store credentials in a secure password manager

## Troubleshooting

### Account Locked
- **Cause**: 5 failed login attempts
- **Solution**: Wait 15 minutes for automatic unlock
- **Prevention**: Use correct password or reset if forgotten

### Forgot Password (No Security Question)
- **Issue**: Password reset unavailable if security question not set up
- **Solution**: Contact system administrator to manually reset
- **Prevention**: Set up security question immediately after login

### Password Requirements Not Met
- **Issue**: New password doesn't meet security requirements
- **Solution**: Ensure password includes all required character types
- **Check**: Use the real-time requirement checker in the interface

## Security Settings Dashboard

The Security Settings tab in the admin dashboard provides:

### Password Management Section
- Change Password button
- Setup/Update Security Question button  
- Reset Password button (requires security question)

### Security Information Cards
- **Session Duration**: Current session timeout setting
- **Failed Attempt Lockout**: Lockout policy details
- **Password Requirements**: Complete requirements list
- **Security Question Status**: Shows if configured or not

## Technical Details

### Storage
- Password hashes stored in localStorage (upgrade to secure backend recommended)
- Security questions and answers hashed for protection
- Session data includes expiry and login time

### Session Management
- Automatic session validation every minute
- Session expiry handled gracefully with user notification
- Multiple tabs supported with shared session state

### Password Hashing
- Currently uses simple JavaScript hash function
- **Production Recommendation**: Implement proper bcrypt hashing with backend storage

## Future Enhancements

### Recommended Upgrades
1. **Backend Integration**: Move password storage to secure backend
2. **Enhanced Hashing**: Implement bcrypt or similar secure hashing
3. **2FA Support**: Add two-factor authentication
4. **Audit Logging**: Track login attempts and password changes
5. **Password Policies**: Configurable password complexity rules
6. **Email Recovery**: Email-based password reset option

### Security Hardening
1. **Rate Limiting**: Enhanced brute force protection
2. **IP Blocking**: Temporary IP blocks for repeated failures
3. **Session Encryption**: Encrypt session data
4. **HTTPS Enforcement**: Ensure all admin access uses HTTPS

## Support

For technical issues or security concerns:
1. Check this documentation first
2. Review browser console for error messages
3. Contact system administrator if needed
4. Keep credentials secure and never share them

---

**Last Updated**: December 2024  
**Version**: 1.0  
**System**: India Engineering Works CMS
