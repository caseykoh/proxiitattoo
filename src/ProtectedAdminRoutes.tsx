import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement; // Ensures the passed element is a valid React component
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("jwt"); // Replace with actual authentication logic
  return isAuthenticated ? element : <Navigate to="/admin" />;
};

export default ProtectedRoute;
