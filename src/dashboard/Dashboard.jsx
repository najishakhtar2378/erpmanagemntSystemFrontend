import { useEffect, useState } from "react";
import API from "../api/api";
import "./Dashboard.css";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      setError("");
      const res = await API.get("/dashboard");
      setStats(res.data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.log("Error fetching dashboard:", error);
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchStats();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const getFormattedTime = () => {
    return lastUpdated.toLocaleTimeString();
  };

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={handleRefresh} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your Quantivo ERP Overview</p>
        </div>
        <div className="header-actions">
          <span className="last-updated">
            Last updated: {getFormattedTime()}
          </span>
          <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
            {loading ? "Refreshing..." : "🔄 Refresh"}
          </button>
        </div>
      </div>

      <div className="dashboard-cards">
        {/* Customers Card */}
        <div className={`dashboard-card card-customers ${loading ? "loading" : ""}`}>
          <div className="card-header">
            <span className="card-icon">👥</span>
            <h3>Total Customers</h3>
          </div>
          <div className="card-value">
            {loading ? <div className="skeleton-text"></div> : stats?.totalCustomers || 0}
          </div>
          <p className="card-subtitle">Active customers</p>
        </div>

        {/* Products Card */}
        <div className={`dashboard-card card-products ${loading ? "loading" : ""}`}>
          <div className="card-header">
            <span className="card-icon">📦</span>
            <h3>Total Products</h3>
          </div>
          <div className="card-value">
            {loading ? <div className="skeleton-text"></div> : stats?.totalProducts || 0}
          </div>
          <p className="card-subtitle">In inventory</p>
        </div>

        {/* Active Orders Card */}
        <div className={`dashboard-card card-orders ${loading ? "loading" : ""}`}>
          <div className="card-header">
            <span className="card-icon">📊</span>
            <h3>Active Orders</h3>
          </div>
          <div className="card-value">
            {loading ? <div className="skeleton-text"></div> : stats?.totalOrders || 0}
          </div>
          <p className="card-subtitle">In progress</p>
        </div>

        {/* Cancelled Orders Card */}
        <div className={`dashboard-card card-cancelled ${loading ? "loading" : ""}`}>
          <div className="card-header">
            <span className="card-icon">❌</span>
            <h3>Cancelled Orders</h3>
          </div>
          <div className="card-value">
            {loading ? <div className="skeleton-text"></div> : stats?.cancelledOrders || 0}
          </div>
          <p className="card-subtitle">Cancelled</p>
        </div>

        {/* Revenue Card */}
        <div className={`dashboard-card card-revenue ${loading ? "loading" : ""}`}>
          <div className="card-header">
            <span className="card-icon">💰</span>
            <h3>Total Revenue</h3>
          </div>
          <div className="card-value revenue-value">
            {loading ? (
              <div className="skeleton-text"></div>
            ) : (
              formatCurrency(stats?.totalRevenue)
            )}
          </div>
          <p className="card-subtitle">All time</p>
        </div>
      </div>

      {/* Quick Stats Summary */}
      {stats && !loading && (
        <div className="dashboard-summary">
          <div className="summary-card">
            <span className="summary-label">Average Order Value</span>
            <span className="summary-value">
              {formatCurrency(stats.totalRevenue / (stats.totalOrders || 1))}
            </span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Products per Order</span>
            <span className="summary-value">
              {(stats.totalProducts / (stats.totalOrders || 1)).toFixed(1)}
            </span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Order Completion Rate</span>
            <span className="summary-value">
              {((stats.totalOrders / (stats.totalOrders + stats.cancelledOrders || 1)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


