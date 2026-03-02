import { useEffect, useState } from "react";
import API from "../api/api";
import "./RoleDashboard.css";

export default function AdminDashboard() {
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
          <h1>👨‍💼 Admin Dashboard</h1>
          <p>Welcome, {user?.name}! Full system access.</p>
        </div>
        <div className="role-badge admin-badge">Admin</div>
      </div>

      <div className="dashboard-grid">
        {/* Total Customers */}
        <div className="dashboard-card card-primary">
          <div className="card-icon">👥</div>
          <h3>Total Customers</h3>
          <p className="card-value">{stats.totalCustomers}</p>
          <small>Active customers in system</small>
        </div>

        {/* Total Products */}
        <div className="dashboard-card card-success">
          <div className="card-icon">📦</div>
          <h3>Total Products</h3>
          <p className="card-value">{stats.totalProducts}</p>
          <small>Items in inventory</small>
        </div>

        {/* Total Orders */}
        <div className="dashboard-card card-warning">
          <div className="card-icon">📊</div>
          <h3>Total Orders</h3>
          <p className="card-value">{stats.totalOrders}</p>
          <small>Active orders</small>
        </div>

        {/* Revenue */}
        <div className="dashboard-card card-info">
          <div className="card-icon">💰</div>
          <h3>Total Revenue</h3>
          <p className="card-value">{formatCurrency(stats.totalRevenue)}</p>
          <small>All time earnings</small>
        </div>

        {/* Cancelled Orders */}
        <div className="dashboard-card card-danger">
          <div className="card-icon">❌</div>
          <h3>Cancelled Orders</h3>
          <p className="card-value">{stats.cancelledOrders || 0}</p>
          <small>Cancelled transactions</small>
        </div>

        {/* Order Completion Rate */}
        <div className="dashboard-card card-metrics">
          <div className="card-icon">📈</div>
          <h3>Completion Rate</h3>
          <p className="card-value">
            {((stats.totalOrders / (stats.totalOrders + stats.cancelledOrders || 1)) * 100).toFixed(1)}%
          </p>
          <small>Order success rate</small>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="admin-actions">
        <h2>Admin Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <span className="action-icon">👥</span>
            <h4>User Management</h4>
            <p>Manage system users and assign roles</p>
            <a href="/admin/users">Manage Users</a>
          </div>
          <div className="action-card">
            <span className="action-icon">📋</span>
            <h4>Reports</h4>
            <p>View detailed business analytics</p>
            <a href="/admin/reports">View Reports</a>
          </div>
          <div className="action-card">
            <span className="action-icon">⚙️</span>
            <h4>Settings</h4>
            <p>Configure system settings</p>
            <a href="/admin/settings">Go to Settings</a>
          </div>
          <div className="action-card">
            <span className="action-icon">📊</span>
            <h4>Analytics</h4>
            <p>View in-depth analytics dashboard</p>
            <a href="/analytics">View Analytics</a>
          </div>
        </div>
      </div>
    </div>
  );
}
