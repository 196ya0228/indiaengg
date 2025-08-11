import { useState } from "react";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  return (
    <AdminAuth onAuthenticated={handleAuthenticated}>
      {isAuthenticated && <AdminDashboard />}
    </AdminAuth>
  );
};

export default Admin;
