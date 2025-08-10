import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { initializeDefaultData } from "@/lib/firebaseServices";
import { useEffect } from "react";

const Admin = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Initialize default data when component mounts
    initializeDefaultData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
