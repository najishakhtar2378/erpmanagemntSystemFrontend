import { useEffect, useState } from "react";
import API from "../api/api";
import "./AdminReports.css";

export default function AdminReports() {
  const [stats, setStats] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("30days");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [reportType, dateRange]);

  const getDateFilter = () => {
    const now = new Date();
    const from = new Date();

    switch (dateRange) {
      case "7days":
        from.setDate(now.getDate() - 7);
        break;
      case "30days":
        from.setDate(now.getDate() - 30);
        break;
      case "90days":
        from.setDate(now.getDate() - 90);
        break;
      case "yearly":
        from.setFullYear(now.getFullYear());
        from.setMonth(0, 1);
        break;
      default:
        from.setDate(now.getDate() - 30);
    }

    return { from, to: now };
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      // Always fetch main stats
      const statsRes = await API.get("/admin/reports");
      setStats(statsRes.data);

      // Fetch report-specific data
      switch (reportType) {
        case "sales":
          try {
            const salesRes = await API.get("/analytics/sales-trend?period=daily");
            setReportData(salesRes.data || []);
          } catch (err) {
            console.log("Sales trend fetch error:", err);
            setReportData([]);
          }
          break;

        case "products":
          try {
            const productsRes = await API.get("/analytics/best-selling");
            setReportData(productsRes.data || []);
          } catch (err) {
            console.log("Products fetch error:", err);
            setReportData([]);
          }
          break;

        case "customers":
          try {
            const customersRes = await API.get("/analytics/top-customers");
            setReportData(customersRes.data || []);
          } catch (err) {
            console.log("Customers fetch error:", err);
            setReportData([]);
          }
          break;

        case "inventory":
          try {
            const inventoryRes = await API.get("/products");
            const lowStockProducts = (inventoryRes.data || []).filter(
              (p) => p.stock <= p.reorderLevel
            );
            setReportData(lowStockProducts);
          } catch (err) {
            console.log("Inventory fetch error:", err);
            setReportData([]);
          }
          break;

        default:
          setReportData([]);
      }
    } catch (err) {
      console.log("Error fetching reports:", err);
      setStats(null);
      setReportData([]);
    }
    setLoading(false);
  };

  const handleDownloadReport = (format) => {
    if (format === "PDF") {
      downloadPDF();
    } else if (format === "Excel") {
      downloadExcel();
    }
  };

  const downloadPDF = () => {
    const reportContent = generateReportContent();
    const element = document.createElement("a");
    const file = new Blob([reportContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${reportType}-report-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadExcel = () => {
    const reportContent = generateReportContent();
    const element = document.createElement("a");
    const file = new Blob([reportContent], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = `${reportType}-report-${new Date().getTime()}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateReportContent = () => {
    return `
Report Type: ${reportType.toUpperCase()}
Date Range: ${dateRange}
Generated: ${new Date().toLocaleString()}

${JSON.stringify(stats, null, 2)}
${reportData.length > 0 ? "\nDetailed Data:\n" + JSON.stringify(reportData, null, 2) : ""}
    `;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  if (loading) {
    return (
      <p style={{ padding: "30px", textAlign: "center" }}>
        Loading reports...
      </p>
    );
  }

  return (
    <div className="admin-reports">
      <div className="reports-header">
        <div>
          <h1>📊 Reports & Analytics</h1>
          <p>View detailed business analytics and reports</p>
        </div>
      </div>

      {/* Report Controls */}
      <div className="report-controls">
        <div className="control-group">
          <label>Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="sales">Sales Report</option>
            <option value="customers">Customer Report</option>
            <option value="products">Product Report</option>
            <option value="inventory">Inventory Report</option>
          </select>
        </div>
        <div className="control-group">
          <label>Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
        <div className="control-group">
          <button
            className="btn btn-primary"
            onClick={() => handleDownloadReport("PDF")}
          >
            📥 Download PDF
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleDownloadReport("Excel")}
          >
            📊 Download Excel
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      {stats && (
        <div className="metrics-grid">
          <div className="metric-card metric-primary">
            <div className="metric-icon">💰</div>
            <h3>Total Sales</h3>
            <p className="metric-value">
              {formatCurrency(stats?.totalSales)}
            </p>
            <span className="metric-change positive">
              ↑ {stats?.monthlySalesGrowth?.toFixed(1)}%
            </span>
          </div>

          <div className="metric-card metric-success">
            <div className="metric-icon">📦</div>
            <h3>Total Orders</h3>
            <p className="metric-value">{stats?.totalOrders}</p>
            <span className="metric-change">
              ✓ {stats?.completedOrders} Completed
            </span>
          </div>

          <div className="metric-card metric-info">
            <div className="metric-icon">📈</div>
            <h3>Average Order Value</h3>
            <p className="metric-value">
              {formatCurrency(stats?.averageOrderValue)}
            </p>
            <span className="metric-change">Per Order</span>
          </div>

          <div className="metric-card metric-warning">
            <div className="metric-icon">🔄</div>
            <h3>Customer Retention</h3>
            <p className="metric-value">{stats?.customerRetention}%</p>
            <span className="metric-change">Return Customers</span>
          </div>
        </div>
      )}

      {/* Detailed Stats */}
      {stats && (
        <div className="detailed-stats">
          <div className="stats-section">
            <h2>📊 Sales Overview</h2>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Total Sales</span>
                <span className="stat-value">
                  {formatCurrency(stats?.totalSales)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Orders Completed</span>
                <span className="stat-value">{stats?.completedOrders}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Orders Cancelled</span>
                <span className="stat-value">{stats?.cancelledOrders}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completion Rate</span>
                <span className="stat-value">
                  {(
                    ((stats?.completedOrders /
                      (stats?.completedOrders + stats?.cancelledOrders || 1)) *
                      100) || 0
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h2>🏆 Top Performers</h2>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Top Product</span>
                <span className="stat-value">{stats?.topProduct}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Top Customer</span>
                <span className="stat-value">{stats?.topCustomer}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Monthly Growth</span>
                <span className="stat-value positive">
                  {stats?.monthlySalesGrowth?.toFixed(1)}%
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Order</span>
                <span className="stat-value">
                  {formatCurrency(stats?.averageOrderValue)}
                </span>
              </div>
            </div>
          </div>

          {/* Report-Specific Detailed Data */}
          {reportData.length > 0 && (
            <div className="stats-section">
              <h2>
                📋 
                {reportType === "sales" && "Sales Trend"}
                {reportType === "products" && "Best Selling Products"}
                {reportType === "customers" && "Top Customers"}
                {reportType === "inventory" && "Low Stock Products"}
              </h2>
              <div className="table-container">
                <table className="report-table">
                  <thead>
                    <tr>
                      {reportType === "sales" && (
                        <>
                          <th>Date</th>
                          <th>Total Orders</th>
                          <th>Total Revenue</th>
                        </>
                      )}
                      {reportType === "products" && (
                        <>
                          <th>Product Name</th>
                          <th>SKU</th>
                          <th>Quantity Sold</th>
                          <th>Total Revenue</th>
                        </>
                      )}
                      {reportType === "customers" && (
                        <>
                          <th>Customer Name</th>
                          <th>Total Orders</th>
                          <th>Total Spent</th>
                        </>
                      )}
                      {reportType === "inventory" && (
                        <>
                          <th>Product Name</th>
                          <th>Current Stock</th>
                          <th>Reorder Level</th>
                          <th>Price</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((item, index) => (
                      <tr key={index}>
                        {reportType === "sales" && (
                          <>
                            <td>{item._id}</td>
                            <td>{item.totalOrders}</td>
                            <td>{formatCurrency(item.totalRevenue)}</td>
                          </>
                        )}
                        {reportType === "products" && (
                          <>
                            <td>{item.productName}</td>
                            <td>{item.productSKU}</td>
                            <td>{item.totalQuantity}</td>
                            <td>{formatCurrency(item.totalRevenue)}</td>
                          </>
                        )}
                        {reportType === "customers" && (
                          <>
                            <td>{item.customerName}</td>
                            <td>{item.totalOrders}</td>
                            <td>{formatCurrency(item.totalAmount)}</td>
                          </>
                        )}
                        {reportType === "inventory" && (
                          <>
                            <td>{item.name}</td>
                            <td>
                              <span
                                style={{
                                  color: item.stock <= item.reorderLevel ? "red" : "green",
                                }}
                              >
                                {item.stock}
                              </span>
                            </td>
                            <td>{item.reorderLevel}</td>
                            <td>{formatCurrency(item.price)}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Export Options */}
      <div className="export-section">
        <h2>📥 Export Reports</h2>
        <div className="export-options">
          <div className="export-card">
            <span className="export-icon">📄</span>
            <h3>PDF Report</h3>
            <p>Download as PDF file</p>
            <button
              className="btn btn-primary btn-small"
              onClick={() => handleDownloadReport("PDF")}
            >
              Download
            </button>
          </div>
          <div className="export-card">
            <span className="export-icon">📊</span>
            <h3>Excel Report</h3>
            <p>Download as Excel file</p>
            <button
              className="btn btn-primary btn-small"
              onClick={() => handleDownloadReport("Excel")}
            >
              Download
            </button>
          </div>
          <div className="export-card">
            <span className="export-icon">📧</span>
            <h3>Email Report</h3>
            <p>Send report via email</p>
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                alert("Email functionality coming soon!");
              }}
            >
              Send Email
            </button>
          </div>
          <div className="export-card">
            <span className="export-icon">📱</span>
            <h3>Share Link</h3>
            <p>Generate shareable link</p>
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                alert("Share link functionality coming soon!");
              }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Help Info */}
      <div className="report-help">
        <h3>ℹ️ Report Information</h3>
        <ul>
          <li>
            <strong>Sales Report:</strong> Complete overview of all sales
            transactions and revenue
          </li>
          <li>
            <strong>Customer Report:</strong> Customer analytics, retention
            rates, and activity
          </li>
          <li>
            <strong>Product Report:</strong> Best-sellers, inventory levels, and
            performance
          </li>
          <li>
            <strong>Inventory Report:</strong> Stock levels, reorder points, and
            movements
          </li>
          <li>
            <strong>Export Options:</strong> Download in PDF or Excel for further
            analysis
          </li>
        </ul>
      </div>
    </div>
  );
}
