import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./analytics.css";

const Analytics = () => {
  const navigate = useNavigate();
  const [salesTrend, setSalesTrend] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [revenueByStatus, setRevenueByStatus] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [period]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [trend, products, revenue, customers, monthly] = await Promise.all([
        API.get(`/analytics/sales-trend?period=${period}`),
        API.get("/analytics/best-selling"),
        API.get("/analytics/revenue-status"),
        API.get("/analytics/top-customers"),
        API.get("/analytics/monthly-revenue"),
      ]);

      setSalesTrend(trend.data);
      setBestSellingProducts(products.data);
      setRevenueByStatus(revenue.data);
      setTopCustomers(customers.data);
      setMonthlyRevenue(monthly.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch analytics data");
      console.error("Analytics Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalRevenue = (data) => {
    return data
      .reduce((sum, item) => sum + (item.totalRevenue || item.revenue || 0), 0)
      .toFixed(2);
  };

  const calculateTotalOrders = (data) => {
    return data.reduce((sum, item) => sum + (item.totalOrders || 1), 0);
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics data...</div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
        <div className="analytics-title-section">
          <h1 className="analytics-title">Analytics Dashboard</h1>
          <button 
            className="enhanced-analytics-btn"
            onClick={() => navigate('/analytics/advanced')}
          >
            📊 View Advanced Charts
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* KPI Cards */}
        <div className="kpi-cards">
          <div className="kpi-card">
            <h3>Total Revenue</h3>
            <p className="kpi-value">${calculateTotalRevenue(monthlyRevenue)}</p>
          </div>
          <div className="kpi-card">
            <h3>Total Orders</h3>
            <p className="kpi-value">{calculateTotalOrders(salesTrend)}</p>
          </div>
          <div className="kpi-card">
            <h3>Top Customers</h3>
            <p className="kpi-value">{topCustomers.length}</p>
          </div>
          <div className="kpi-card">
            <h3>Best Products</h3>
            <p className="kpi-value">{bestSellingProducts.length}</p>
          </div>
        </div>

        {/* Sales Trend Section */}
        <div className="analytics-section">
          <div className="section-header">
            <h2>Sales Trend</h2>
            <div className="period-selector">
              <button
                className={period === "daily" ? "active" : ""}
                onClick={() => setPeriod("daily")}
              >
                Daily
              </button>
              <button
                className={period === "weekly" ? "active" : ""}
                onClick={() => setPeriod("weekly")}
              >
                Weekly
              </button>
              <button
                className={period === "monthly" ? "active" : ""}
                onClick={() => setPeriod("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="chart-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Total Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesTrend.map((item, index) => (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.totalOrders}</td>
                    <td>${item.totalRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Revenue Comparison */}
        <div className="analytics-section">
          <h2>Monthly Revenue Comparison</h2>
          <div className="chart-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRevenue.map((item, index) => (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>${item.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Status */}
        <div className="analytics-section">
          <h2>Revenue by Order Status</h2>
          <div className="chart-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Order Count</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {revenueByStatus.map((item, index) => (
                  <tr key={index} className={`status-${item._id.toLowerCase()}`}>
                    <td className="status-badge">{item._id}</td>
                    <td>{item.orderCount}</td>
                    <td>${item.totalRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="analytics-section">
          <h2>Best Selling Products</h2>
          <div className="chart-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {bestSellingProducts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.productSKU}</td>
                    <td>{item.totalQuantity}</td>
                    <td>${item.totalRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Customers */}
        <div className="analytics-section">
          <h2>Top Customers</h2>
          <div className="chart-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.customerName}</td>
                    <td>{item.customerEmail}</td>
                    <td>{item.orderCount}</td>
                    <td>${item.totalSpent.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default Analytics;
