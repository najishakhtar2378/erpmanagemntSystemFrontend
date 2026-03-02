import { Link, useNavigate } from "react-router-dom";
import { getDashboardUrl, getUser, isAdmin, isManager } from "../utils/roleUtils";
import "./Navbar.css";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = getUser();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToDashboard = () => {
    navigate(getDashboardUrl());
  };

  if (!token) return null; // login/signup page pe navbar nahi dikhega

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
      <Sidebar />

      <div className="navbar-links navbar-desktop">
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
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">{user?.name || "User"}</span>
            <span className={`user-role role-${user?.role || "staff"}`}>
              {user?.role?.toUpperCase() || "STAFF"}
            </span>
          </div>
        </div>

        {!token ? (
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
