// Utility functions for role-based access control

export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const isAdmin = () => {
  return getUserRole() === "admin";
};

export const isManager = () => {
  return getUserRole() === "manager";
};

export const isStaff = () => {
  return getUserRole() === "staff";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getDashboardUrl = () => {
  const role = getUserRole();
  switch (role) {
    case "admin":
      return "/admin-dashboard";
    case "manager":
      return "/manager-dashboard";
    case "staff":
      return "/staff-dashboard";
    default:
      return "/dashboard";
  }
};

// Permission checker
export const hasPermission = (requiredRole) => {
  const role = getUserRole();
  
  // Admin has all permissions
  if (role === "admin") return true;
  
  // Manager can do most things except admin tasks
  if (role === "manager") {
    return requiredRole !== "admin";
  }
  
  // Staff has limited permissions
  if (role === "staff") {
    return requiredRole === "staff" || requiredRole === "all";
  }
  
  return false;
};
