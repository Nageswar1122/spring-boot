import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdminAuthenticated } = useAuth();
  const location = useLocation();

  // 🔐 ADMIN ROUTES
  if (requireAdmin) {
    if (!isAdminAuthenticated) {
      return (
        <Navigate
          to="/admin/login"
          state={{ from: location }}
          replace
        />
      );
    }
    return <>{children}</>;
  }

  // 🔐 USER ROUTES
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // 🚫 Admin trying to access user routes
  if (isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
