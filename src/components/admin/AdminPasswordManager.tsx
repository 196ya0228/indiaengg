import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Eye, 
  EyeOff, 
  Key, 
  Lock, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  RotateCcw,
  Settings
} from "lucide-react";

interface PasswordManagerProps {
  onPasswordChanged?: () => void;
}

const ADMIN_CONFIG = {
  sessionKey: "iew_admin_session",
  attemptsKey: "iew_admin_attempts",
  lockoutKey: "iew_admin_lockout",
  passwordKey: "iew_admin_password_hash",
  securityQuestionKey: "iew_admin_security_question",
  securityAnswerKey: "iew_admin_security_answer_hash"
};

const PASSWORD_REQUIREMENTS = [
  { test: (p: string) => p.length >= 8, text: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), text: "One uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), text: "One lowercase letter" },
  { test: (p: string) => /\d/.test(p), text: "One number" },
  { test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p), text: "One special character" }
];

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your first school?",
  "What is your favorite book?",
  "What was your childhood nickname?",
  "What is the name of the street you grew up on?",
  "What was your first car model?"
];

// Simple hash function for password storage (in production, use proper bcrypt)
const simpleHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

const AdminPasswordManager = ({ onPasswordChanged }: PasswordManagerProps) => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    securityQuestion: "",
    securityAnswer: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [securitySetup, setSecuritySetup] = useState({
    question: "",
    answer: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
    resetNew: false,
    resetConfirm: false
  });
  const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' | 'warning' } | null>(null);
  const [isSecuritySetupOpen, setIsSecuritySetupOpen] = useState(false);

  const showAlert = (message: string, type: 'error' | 'success' | 'warning') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const getCurrentPassword = (): string => {
    const storedHash = localStorage.getItem(ADMIN_CONFIG.passwordKey);
    if (storedHash) {
      // For simplicity, we'll store the actual password in a different key for demo
      return localStorage.getItem("iew_current_password") || "IEW@Admin2024!";
    }
    return "IEW@Admin2024!"; // Default password
  };

  const getSecurityQuestion = (): string | null => {
    return localStorage.getItem(ADMIN_CONFIG.securityQuestionKey);
  };

  const validatePassword = (password: string): boolean => {
    return PASSWORD_REQUIREMENTS.every(req => req.test(password));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentPassword = getCurrentPassword();
    
    if (changePasswordForm.currentPassword !== currentPassword) {
      showAlert("Current password is incorrect", "error");
      return;
    }

    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      showAlert("New passwords do not match", "error");
      return;
    }

    if (!validatePassword(changePasswordForm.newPassword)) {
      showAlert("New password does not meet security requirements", "error");
      return;
    }

    try {
      // Store new password
      const newPasswordHash = simpleHash(changePasswordForm.newPassword);
      localStorage.setItem(ADMIN_CONFIG.passwordKey, newPasswordHash);
      localStorage.setItem("iew_current_password", changePasswordForm.newPassword);
      
      // Clear session to force re-login
      localStorage.removeItem(ADMIN_CONFIG.sessionKey);
      localStorage.removeItem(ADMIN_CONFIG.attemptsKey);
      localStorage.removeItem(ADMIN_CONFIG.lockoutKey);

      setChangePasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setIsChangePasswordOpen(false);
      
      showAlert("Password changed successfully. Please login again.", "success");
      
      if (onPasswordChanged) {
        onPasswordChanged();
      }
      
      // Reload page to force re-authentication
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      showAlert("Error changing password", "error");
    }
  };

  const handleSetupSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!securitySetup.question || !securitySetup.answer) {
      showAlert("Please select a question and provide an answer", "error");
      return;
    }

    try {
      const answerHash = simpleHash(securitySetup.answer.toLowerCase().trim());
      localStorage.setItem(ADMIN_CONFIG.securityQuestionKey, securitySetup.question);
      localStorage.setItem(ADMIN_CONFIG.securityAnswerKey, answerHash);
      
      setSecuritySetup({ question: "", answer: "" });
      setIsSecuritySetupOpen(false);
      
      showAlert("Security question set up successfully", "success");
    } catch (error) {
      showAlert("Error setting up security question", "error");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedQuestion = getSecurityQuestion();
    const storedAnswerHash = localStorage.getItem(ADMIN_CONFIG.securityAnswerKey);
    
    if (!storedQuestion || !storedAnswerHash) {
      showAlert("Security question not set up. Please contact administrator.", "error");
      return;
    }

    if (resetPasswordForm.securityQuestion !== storedQuestion) {
      showAlert("Security question does not match", "error");
      return;
    }

    const answerHash = simpleHash(resetPasswordForm.securityAnswer.toLowerCase().trim());
    if (answerHash !== storedAnswerHash) {
      showAlert("Security answer is incorrect", "error");
      return;
    }

    if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
      showAlert("New passwords do not match", "error");
      return;
    }

    if (!validatePassword(resetPasswordForm.newPassword)) {
      showAlert("New password does not meet security requirements", "error");
      return;
    }

    try {
      // Reset password
      const newPasswordHash = simpleHash(resetPasswordForm.newPassword);
      localStorage.setItem(ADMIN_CONFIG.passwordKey, newPasswordHash);
      localStorage.setItem("iew_current_password", resetPasswordForm.newPassword);
      
      // Clear session and attempts
      localStorage.removeItem(ADMIN_CONFIG.sessionKey);
      localStorage.removeItem(ADMIN_CONFIG.attemptsKey);
      localStorage.removeItem(ADMIN_CONFIG.lockoutKey);

      setResetPasswordForm({
        securityQuestion: "",
        securityAnswer: "",
        newPassword: "",
        confirmPassword: ""
      });
      setIsResetPasswordOpen(false);
      
      showAlert("Password reset successfully. Please login with your new password.", "success");
      
      // Reload page to force re-authentication
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      showAlert("Error resetting password", "error");
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const hasSecurityQuestion = !!getSecurityQuestion();

  return (
    <div className="flex flex-wrap gap-2">
      {alert && (
        <Alert className={`mb-4 ${
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

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Admin Password
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={changePasswordForm.currentPassword}
                  onChange={(e) => setChangePasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={changePasswordForm.newPassword}
                  onChange={(e) => setChangePasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
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
                        req.test(changePasswordForm.newPassword) ? 'text-green-500' : 'text-gray-300'
                      }`} 
                    />
                    <span className={req.test(changePasswordForm.newPassword) ? 'text-green-600' : 'text-gray-500'}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={changePasswordForm.confirmPassword}
                  onChange={(e) => setChangePasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
              <Button type="submit" className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Security Question Setup Dialog */}
      <Dialog open={isSecuritySetupOpen} onOpenChange={setIsSecuritySetupOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {hasSecurityQuestion ? 'Update' : 'Setup'} Security Question
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Question Setup
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSetupSecurity} className="space-y-4">
            <div>
              <Label htmlFor="securityQuestion">Security Question</Label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={securitySetup.question}
                onChange={(e) => setSecuritySetup(prev => ({ ...prev, question: e.target.value }))}
                required
              >
                <option value="">Select a security question</option>
                {SECURITY_QUESTIONS.map((question, index) => (
                  <option key={index} value={question}>{question}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="securityAnswer">Your Answer</Label>
              <Input
                id="securityAnswer"
                type="text"
                value={securitySetup.answer}
                onChange={(e) => setSecuritySetup(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="Enter your answer"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used for password recovery. Remember your exact answer.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Security Question
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsSecuritySetupOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={!hasSecurityQuestion}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset Admin Password
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="resetSecurityQuestion">Security Question</Label>
              <Input
                id="resetSecurityQuestion"
                type="text"
                value={resetPasswordForm.securityQuestion}
                onChange={(e) => setResetPasswordForm(prev => ({ ...prev, securityQuestion: e.target.value }))}
                placeholder="Enter the exact security question"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Current question: {getSecurityQuestion() || "Not set up"}
              </p>
            </div>

            <div>
              <Label htmlFor="resetSecurityAnswer">Security Answer</Label>
              <Input
                id="resetSecurityAnswer"
                type="text"
                value={resetPasswordForm.securityAnswer}
                onChange={(e) => setResetPasswordForm(prev => ({ ...prev, securityAnswer: e.target.value }))}
                placeholder="Enter your answer"
                required
              />
            </div>

            <div>
              <Label htmlFor="resetNewPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="resetNewPassword"
                  type={showPasswords.resetNew ? "text" : "password"}
                  value={resetPasswordForm.newPassword}
                  onChange={(e) => setResetPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('resetNew')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.resetNew ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="resetConfirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="resetConfirmPassword"
                  type={showPasswords.resetConfirm ? "text" : "password"}
                  value={resetPasswordForm.confirmPassword}
                  onChange={(e) => setResetPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('resetConfirm')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.resetConfirm ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Password
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsResetPasswordOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPasswordManager;
