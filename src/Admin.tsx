import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token in localStorage/cookies
    const token = localStorage.getItem("jwt");
    if (token) {
      // Verify token by hitting backend (optional)
      navigate("/admin/dashboard");
    }
  }, []);

  return <AdminLayout />;
}

export default Admin;
