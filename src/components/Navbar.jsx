import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardUrl, getUser, isAdmin, isManager } from "../utils/roleUtils";
import "./Navbar.css";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only access localStorage on client-side
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setUser(getUser());
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const goToDashboard = () => {
    navigate(getDashboardUrl());
  };

  // Wait for hydration to complete - show empty navbar during loading to prevent layout shift
  // Don't return null - this causes navbar to disappear completely

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div 
          className="navbar-logo quantivo-logo"
          onClick={goToDashboard}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          title="Quantivo ERP"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="url(#gradient)" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">Q</text>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontWeight: "bold", color: "white", fontSize: "18px", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>Quantivo ERP</span>
        </div>
      </div>
      {isLoaded && token && <Sidebar />}

      <div className="navbar-links navbar-desktop">
        {isLoaded && token && (
          <>
            <Link to="/products">Products</Link>
            <Link to={getDashboardUrl()}>Dashboard</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/customers/new">Add Customer</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/sales-orders">Sales Orders</Link>
            
            {/* Admin Only Links */}
            {isAdmin() && (
              <>
                <Link to="/admin/users" className="admin-link">⚙️ Settings</Link>
              </>
            )}

            {/* Manager & Admin Links */}
            {(isManager() || isAdmin()) && (
              <>
                <Link to="/salesorder">Create Order</Link>
              </>
            )}
          </>
        )}
      </div>

      <div className="navbar-right">
        {isLoaded && token && (
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">{user?.name || "User"}</span>
              <span className={`user-role role-${user?.role || "staff"}`}>
                {user?.role?.toUpperCase() || "STAFF"}
              </span>
            </div>
          </div>
        )}

        {!isLoaded ? (
          <div style={{ width: "60px", height: "36px" }}></div>
        ) : !token ? (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        ) : (
          <button className="logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
