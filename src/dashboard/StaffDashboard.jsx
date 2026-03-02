import { useEffect, useState } from "react";
import API from "../api/api";
import "./RoleDashboard.css";

export default function StaffDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  if (loading || !stats)
    return <p style={{ padding: "30px" }}>Loading...</p>;

  return (
    <div className="role-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>👤 Staff Dashboard</h1>
          <p>Welcome, {user?.name}! View orders and customer info.</p>
        </div>
        <div className="role-badge staff-badge">Staff</div>
      </div>

      <div className="dashboard-grid">
        {/* Total Customers */}
        <div className="dashboard-card card-primary">
          <div className="card-icon">👥</div>
          <h3>Total Customers</h3>
          <p className="card-value">{stats.totalCustomers}</p>
          <small>View-only access</small>
        </div>

        {/* Today's Orders */}
        <div className="dashboard-card card-warning">
          <div className="card-icon">📦</div>
          <h3>Total Orders</h3>
          <p className="card-value">{stats.totalOrders}</p>
          <small>Sales orders</small>
        </div>

        {/* Inventory Status */}
        <div className="dashboard-card card-success">
          <div className="card-icon">📊</div>
          <h3>Products</h3>
          <p className="card-value">{stats.totalProducts}</p>
          <small>Available items</small>
        </div>

        {/* Quick Metrics */}
        <div className="dashboard-card card-info">
          <div className="card-icon">📈</div>
          <h3>Quick Reference</h3>
          <p className="card-value small-value">View Only</p>
          <small>Limited dashboard access</small>
        </div>
      </div>

      {/* Staff Actions */}
      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <span className="action-icon">📋</span>
            <h4>View Orders</h4>
            <p>View all sales orders</p>
            <a href="/sales-orders">View Orders</a>
          </div>
          <div className="action-card">
            <span className="action-icon">👤</span>
            <h4>Customer List</h4>
            <p>Browse customers</p>
            <a href="/customers">View Customers</a>
          </div>
          <div className="action-card">
            <span className="action-icon">📦</span>
            <h4>Product List</h4>
            <p>View products</p>
            <a href="/products">View Products</a>
          </div>
          <div className="action-card">
            <span className="action-icon">➕</span>
            <h4>Create Order</h4>
            <p>Create new sales order</p>
            <a href="/salesorder">Create Order</a>
          </div>
        </div>
      </div>

      {/* Permissions Info */}
      <div className="permissions-info">
        <h3>Your Permissions</h3>
        <ul>
          <li>✓ View customers and their information</li>
          <li>✓ Create and view sales orders</li>
          <li>✓ View product inventory</li>
          <li>✗ Cannot modify or delete customer data</li>
          <li>✗ Cannot access system settings</li>
          <li>✗ Cannot view detailed analytics</li>
        </ul>
      </div>
    </div>
  );
}
