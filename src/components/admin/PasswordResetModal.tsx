import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

const ADMIN_CONFIG = {
  securityQuestionKey: "iew_admin_security_question",
  securityAnswerKey: "iew_admin_security_answer_hash",
  passwordKey: "iew_admin_password_hash",
  currentPasswordKey: "iew_current_password",
  sessionKey: "iew_admin_session",
  attemptsKey: "iew_admin_attempts",
  lockoutKey: "iew_admin_lockout"
};

const PASSWORD_REQUIREMENTS = [
  { test: (p: string) => p.length >= 8, text: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), text: "One uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), text: "One lowercase letter" },
  { test: (p: string) => /\d/.test(p), text: "One number" },
  { test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p), text: "One special character" }
];

// Simple hash function for password storage
const simpleHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
};

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordReset: () => void;
}

const PasswordResetModal = ({ isOpen, onClose, onPasswordReset }: PasswordResetModalProps) => {
  const [resetForm, setResetForm] = useState({
    securityQuestion: "",
    securityAnswer: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });
  const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' | 'warning' } | null>(null);
  const [loading, setLoading] = useState(false);

  const showAlert = (message: string, type: 'error' | 'success' | 'warning') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const getSecurityQuestion = (): string | null => {
    return localStorage.getItem(ADMIN_CONFIG.securityQuestionKey);
  };

  const validatePassword = (password: string): boolean => {
    return PASSWORD_REQUIREMENTS.every(req => req.test(password));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const storedQuestion = getSecurityQuestion();
    const storedAnswerHash = localStorage.getItem(ADMIN_CONFIG.securityAnswerKey);
    
    if (!storedQuestion || !storedAnswerHash) {
      showAlert("Security question not set up. Please contact administrator.", "error");
      setLoading(false);
      return;
    }

    if (resetForm.securityQuestion !== storedQuestion) {
      showAlert("Security question does not match", "error");
      setLoading(false);
      return;
    }

    const answerHash = simpleHash(resetForm.securityAnswer.toLowerCase().trim());
    if (answerHash !== storedAnswerHash) {
      showAlert("Security answer is incorrect", "error");
      setLoading(false);
      return;
    }

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      showAlert("New passwords do not match", "error");
      setLoading(false);
      return;
    }

    if (!validatePassword(resetForm.newPassword)) {
      showAlert("New password does not meet security requirements", "error");
      setLoading(false);
      return;
    }

    try {
      // Reset password
      const newPasswordHash = simpleHash(resetForm.newPassword);
      localStorage.setItem(ADMIN_CONFIG.passwordKey, newPasswordHash);
      localStorage.setItem(ADMIN_CONFIG.currentPasswordKey, resetForm.newPassword);
      
      // Clear session and attempts
      localStorage.removeItem(ADMIN_CONFIG.sessionKey);
      localStorage.removeItem(ADMIN_CONFIG.attemptsKey);
      localStorage.removeItem(ADMIN_CONFIG.lockoutKey);

      setResetForm({
        securityQuestion: "",
        securityAnswer: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      showAlert("Password reset successfully! You can now login with your new password.", "success");
      
      setTimeout(() => {
        onPasswordReset();
        onClose();
      }, 2000);
      
    } catch (error) {
      showAlert("Error resetting password", "error");
    }
    
    setLoading(false);
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const storedQuestion = getSecurityQuestion();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Reset Admin Password
          </DialogTitle>
        </DialogHeader>
        
        {!storedQuestion ? (
          <div className="space-y-4">
            <Alert className="border-yellow-500 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Security question is not set up. Password reset is not available. Please contact the system administrator.
              </AlertDescription>
            </Alert>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <>
            {alert && (
              <Alert className={`${
                alert.type === 'error' ? 'border-red-500 bg-red-50' : 
                alert.type === 'success' ? 'border-green-500 bg-green-50' : 
                'border-yellow-500 bg-yellow-50'
              }`}>
                <AlertTriangle className={`h-4 w-4 ${
                  alert.type === 'error' ? 'text-red-600' : 
                  alert.type === 'success' ? 'text-green-600' : 
                  'text-yellow-600'
                }`} />
                <AlertDescription className={`${
                  alert.type === 'error' ? 'text-red-700' : 
                  alert.type === 'success' ? 'text-green-700' : 
                  'text-yellow-700'
                }`}>
                  {alert.message}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Label htmlFor="resetSecurityQuestion">Security Question</Label>
                <Input
                  id="resetSecurityQuestion"
                  type="text"
                  value={resetForm.securityQuestion}
                  onChange={(e) => setResetForm(prev => ({ ...prev, securityQuestion: e.target.value }))}
                  placeholder="Enter the exact security question"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current question: {storedQuestion}
                </p>
              </div>

              <div>
                <Label htmlFor="resetSecurityAnswer">Security Answer</Label>
                <Input
                  id="resetSecurityAnswer"
                  type="text"
                  value={resetForm.securityAnswer}
                  onChange={(e) => setResetForm(prev => ({ ...prev, securityAnswer: e.target.value }))}
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="resetNewPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="resetNewPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={resetForm.newPassword}
                    onChange={(e) => setResetForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  {PASSWORD_REQUIREMENTS.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle 
                        className={`h-3 w-3 ${
                          req.test(resetForm.newPassword) ? 'text-green-500' : 'text-gray-300'
                        }`} 
                      />
                      <span className={req.test(resetForm.newPassword) ? 'text-green-600' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="resetConfirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="resetConfirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={resetForm.confirmPassword}
                    onChange={(e) => setResetForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
                <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetModal;
