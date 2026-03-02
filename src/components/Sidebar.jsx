import { useState } from "react";
import { Link } from "react-router-dom";
import { isAdmin, isManager } from "../utils/roleUtils";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Products", path: "/products", icon: "📦" },
    { label: "Analytics", path: "/analytics", icon: "📈" },
    { label: "Add Customer", path: "/customers/new", icon: "➕" },
    { label: "Customers", path: "/customers", icon: "👥" },
    { label: "Sales Orders", path: "/sales-orders", icon: "🛒" },
    { label: "Order List", path: "/sales-orders/new", icon: "📋" },
  ];

  // Add conditional menu items based on role
  const conditionalItems = [];
  
  if (isManager() || isAdmin()) {
    conditionalItems.push({ label: "Create Order", path: "/salesorder", icon: "✏️" });
  }

  if (isAdmin()) {
    conditionalItems.push({ label: "Settings", path: "/admin/users", icon: "⚙️" });
  }

  const allMenuItems = [...menuItems, ...conditionalItems];

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={closeSidebar} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {allMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>© 2026 Quantivo ERP</p>
        </div>
      </aside>
    </>
  );
}
