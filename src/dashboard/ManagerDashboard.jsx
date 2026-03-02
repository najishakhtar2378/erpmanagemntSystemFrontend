import { useEffect, useState } from "react";
import API from "../api/api";
import "./RoleDashboard.css";

export default function ManagerDashboard() {
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
          <h1>📊 Manager Dashboard</h1>
          <p>Welcome, {user?.name}! Manage your team and orders.</p>
        </div>
        <div className="role-badge manager-badge">Manager</div>
      </div>

      <div className="dashboard-grid">
        {/* Total Customers */}
        <div className="dashboard-card card-primary">
          <div className="card-icon">👥</div>
          <h3>Total Customers</h3>
          <p className="card-value">{stats.totalCustomers}</p>
          <small>Active customers</small>
        </div>

        {/* Active Orders */}
        <div className="dashboard-card card-warning">
          <div className="card-icon">📦</div>
          <h3>Active Orders</h3>
          <p className="card-value">{stats.totalOrders}</p>
          <small>In progress</small>
        </div>

        {/* Monthly Revenue */}
        <div className="dashboard-card card-info">
          <div className="card-icon">💰</div>
          <h3>Current Revenue</h3>
          <p className="card-value">{formatCurrency(stats.totalRevenue)}</p>
          <small>Total earnings</small>
        </div>

        {/* Team Performance */}
        <div className="dashboard-card card-success">
          <div className="card-icon">📈</div>
          <h3>Performance</h3>
          <p className="card-value">
            {((stats.totalOrders / (stats.totalOrders + stats.cancelledOrders || 1)) * 100).toFixed(1)}%
          </p>
          <small>Success rate</small>
        </div>
      </div>

      {/* Manager Actions */}
      <div className="admin-actions">
        <h2>Manage Operations</h2>
        <div className="actions-grid">
          <div className="action-card">
            <span className="action-icon">📋</span>
            <h4>View Orders</h4>
            <p>Monitor and manage all orders</p>
            <a href="/sales-orders">View Orders</a>
          </div>
          <div className="action-card">
            <span className="action-icon">👤</span>
            <h4>Customer Management</h4>
            <p>View and manage customers</p>
            <a href="/customers">Manage Customers</a>
          </div>
          <div className="action-card">
            <span className="action-icon">📊</span>
            <h4>Reports</h4>
            <p>View team performance reports</p>
            <a href="/analytics">View Reports</a>
          </div>
          <div className="action-card">
            <span className="action-icon">👥</span>
            <h4>Sales Orders</h4>
            <p>Create and track sales orders</p>
            <a href="/salesorder">Create Order</a>
          </div>
        </div>
      </div>
    </div>
  );
}
