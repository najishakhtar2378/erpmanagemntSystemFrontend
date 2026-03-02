import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole, requiredRoles }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!userStr) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userStr);

  // Check if user has required role
  const rolesToCheck = requiredRoles || (requiredRole ? [requiredRole] : null);
  
  if (rolesToCheck && !rolesToCheck.includes(user.role)) {
    // Redirect to their own dashboard
    const dashboardMap = {
      admin: "/admin-dashboard",
      manager: "/manager-dashboard",
      staff: "/staff-dashboard",
    };
    return <Navigate to={dashboardMap[user.role] || "/login"} />;
  }

  return children;
}
