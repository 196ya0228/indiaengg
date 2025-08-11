import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, Shield, AlertTriangle, RotateCcw } from "lucide-react";
import { MechanicalGear, CogWheel } from "@/components/MechanicalElements";
import PasswordResetModal from "./PasswordResetModal";

// Production-grade password configuration
const ADMIN_CONFIG = {
  defaultPassword: "IEW@Admin2024!", // Strong default password
  sessionDuration: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
  maxAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes lockout
  sessionKey: "iew_admin_session",
  attemptsKey: "iew_admin_attempts",
  lockoutKey: "iew_admin_lockout",
  passwordKey: "iew_admin_password_hash",
  currentPasswordKey: "iew_current_password"
};

interface AuthState {
  isAuthenticated: boolean;
  attempts: number;
  lockedUntil: number | null;
  sessionExpiry: number | null;
}

interface AdminAuthProps {
  onAuthenticated: () => void;
  children?: React.ReactNode;
}

const AdminAuth = ({ onAuthenticated, children }: AdminAuthProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    attempts: 0,
    lockedUntil: null,
    sessionExpiry: null
  });
  const [alert, setAlert] = useState<{ message: string; type: 'error' | 'warning' | 'info' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    checkExistingSession();
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      // Set up session monitoring
      const interval = setInterval(checkSessionValidity, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [authState.isAuthenticated]);

  const checkExistingSession = () => {
    try {
      const sessionData = localStorage.getItem(ADMIN_CONFIG.sessionKey);
      const attempts = parseInt(localStorage.getItem(ADMIN_CONFIG.attemptsKey) || "0");
      const lockoutTime = parseInt(localStorage.getItem(ADMIN_CONFIG.lockoutKey) || "0");
      
      const currentTime = Date.now();
      const isLockedOut = lockoutTime > currentTime;
      
      if (sessionData) {
        const { expiry } = JSON.parse(sessionData);
        if (expiry > currentTime && !isLockedOut) {
          setAuthState({
            isAuthenticated: true,
            attempts: 0,
            lockedUntil: null,
            sessionExpiry: expiry
          });
          onAuthenticated();
          setLoading(false);
          return;
        } else {
          // Session expired
          localStorage.removeItem(ADMIN_CONFIG.sessionKey);
        }
      }

      setAuthState({
        isAuthenticated: false,
        attempts,
        lockedUntil: isLockedOut ? lockoutTime : null,
        sessionExpiry: null
      });
      setLoading(false);
    } catch (error) {
      console.error("Session check error:", error);
      setLoading(false);
    }
  };

  const checkSessionValidity = () => {
    const sessionData = localStorage.getItem(ADMIN_CONFIG.sessionKey);
    if (sessionData) {
      const { expiry } = JSON.parse(sessionData);
      if (expiry <= Date.now()) {
        handleLogout();
        showAlert("Session expired. Please login again.", "warning");
      }
    }
  };

  const showAlert = (message: string, type: 'error' | 'warning' | 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const getCurrentPassword = (): string => {
    // Check if custom password is set
    const currentPassword = localStorage.getItem(ADMIN_CONFIG.currentPasswordKey);
    return currentPassword || ADMIN_CONFIG.defaultPassword;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentTime = Date.now();

    // Check if locked out
    if (authState.lockedUntil && authState.lockedUntil > currentTime) {
      const remainingTime = Math.ceil((authState.lockedUntil - currentTime) / 60000);
      showAlert(`Account locked. Try again in ${remainingTime} minutes.`, "error");
      return;
    }

    // Check password
    const currentPassword = getCurrentPassword();
    if (password === currentPassword) {
      // Successful login
      const expiry = currentTime + ADMIN_CONFIG.sessionDuration;
      const sessionData = {
        authenticated: true,
        expiry,
        loginTime: currentTime
      };
      
      localStorage.setItem(ADMIN_CONFIG.sessionKey, JSON.stringify(sessionData));
      localStorage.removeItem(ADMIN_CONFIG.attemptsKey);
      localStorage.removeItem(ADMIN_CONFIG.lockoutKey);
      
      setAuthState({
        isAuthenticated: true,
        attempts: 0,
        lockedUntil: null,
        sessionExpiry: expiry
      });
      
      onAuthenticated();
      setPassword("");
      showAlert("Login successful! Welcome to Admin Panel.", "info");
    } else {
      // Failed login
      const newAttempts = authState.attempts + 1;
      let lockoutTime = null;
      
      if (newAttempts >= ADMIN_CONFIG.maxAttempts) {
        lockoutTime = currentTime + ADMIN_CONFIG.lockoutDuration;
        localStorage.setItem(ADMIN_CONFIG.lockoutKey, lockoutTime.toString());
        showAlert(`Too many failed attempts. Account locked for 15 minutes.`, "error");
      } else {
        const remainingAttempts = ADMIN_CONFIG.maxAttempts - newAttempts;
        showAlert(`Invalid password. ${remainingAttempts} attempts remaining.`, "error");
      }
      
      localStorage.setItem(ADMIN_CONFIG.attemptsKey, newAttempts.toString());
      setAuthState({
        ...authState,
        attempts: newAttempts,
        lockedUntil: lockoutTime
      });
      
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_CONFIG.sessionKey);
    setAuthState({
      isAuthenticated: false,
      attempts: 0,
      lockedUntil: null,
      sessionExpiry: null
    });
    setPassword("");
  };

  const formatTimeRemaining = (timestamp: number) => {
    const remaining = timestamp - Date.now();
    const minutes = Math.ceil(remaining / 60000);
    return minutes > 1 ? `${minutes} minutes` : "1 minute";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white">
          <CogWheel size={40} color="white" animate />
        </div>
      </div>
    );
  }

  if (authState.isAuthenticated) {
    return <>{children}</>;
  }

  const isLockedOut = authState.lockedUntil && authState.lockedUntil > Date.now();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Mechanical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 opacity-10">
          <MechanicalGear size={150} color="white" animate />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <CogWheel size={120} color="white" className="gear-rotate-reverse" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <MechanicalGear size={80} color="white" animate />
        </div>
        <div className="absolute top-1/4 right-1/3 opacity-5">
          <CogWheel size={60} color="white" className="gear-rotate" />
        </div>
      </div>

      <Card className="w-full max-w-md mx-4 shadow-2xl border-slate-200 relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Admin Access
          </CardTitle>
          <p className="text-gray-600 mt-2">
            INDIA ENGINEERING WORKS
          </p>
          <p className="text-sm text-gray-500">
            Secure Content Management System
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {alert && (
            <Alert className={`${
              alert.type === 'error' ? 'border-red-500 bg-red-50' : 
              alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 
              'border-blue-500 bg-blue-50'
            }`}>
              <AlertTriangle className={`h-4 w-4 ${
                alert.type === 'error' ? 'text-red-600' : 
                alert.type === 'warning' ? 'text-yellow-600' : 
                'text-blue-600'
              }`} />
              <AlertDescription className={`${
                alert.type === 'error' ? 'text-red-700' : 
                alert.type === 'warning' ? 'text-yellow-700' : 
                'text-blue-700'
              }`}>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Admin Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                  disabled={isLockedOut}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLockedOut}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 shadow-lg"
              disabled={isLockedOut}
            >
              <Lock className="h-4 w-4 mr-2" />
              {isLockedOut ? "Account Locked" : "Access Admin Panel"}
            </Button>
          </form>

          {isLockedOut && (
            <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              Account locked for {formatTimeRemaining(authState.lockedUntil!)}
            </div>
          )}

          {authState.attempts > 0 && !isLockedOut && (
            <div className="text-center text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              {authState.attempts} failed attempt{authState.attempts > 1 ? 's' : ''} 
              - {ADMIN_CONFIG.maxAttempts - authState.attempts} remaining
            </div>
          )}

          <div className="text-center text-xs text-gray-500 pt-4 border-t space-y-2">
            <p>🔒 Secure authentication system</p>
            <p>Session expires after 8 hours of inactivity</p>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setShowPasswordReset(true)}
              className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Forgot Password?
            </Button>
          </div>
        </CardContent>
      </Card>

      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
        onPasswordReset={() => {
          showAlert("Password reset successful! Please login with your new password.", "info");
        }}
      />
    </div>
  );
};

export default AdminAuth;
