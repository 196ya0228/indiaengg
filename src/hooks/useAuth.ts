import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if we're in demo mode
  const isDemoMode = !import.meta.env.VITE_FIREBASE_PROJECT_ID || 
                     import.meta.env.VITE_FIREBASE_PROJECT_ID === 'demo-project';

  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, simulate a logged-in admin user
      setUser({
        email: 'admin@indiaengineeringworks.com',
        uid: 'demo-admin-uid'
      } as User);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const login = async (email: string, password: string) => {
    if (isDemoMode) {
      // Demo login - accept any credentials for demo purposes
      if (email.includes('admin') && password.length > 0) {
        const demoUser = {
          email: 'admin@indiaengineeringworks.com',
          uid: 'demo-admin-uid'
        } as User;
        setUser(demoUser);
        return demoUser;
      } else {
        throw new Error('Demo mode: Use any email with "admin" and any password');
      }
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (isDemoMode) {
      setUser(null);
      return;
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.email?.includes('admin') || isDemoMode,
    isDemoMode
  };
};
