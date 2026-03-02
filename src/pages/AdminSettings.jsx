import { useEffect, useState } from "react";
import API from "../api/api";
import "./AdminSettings.css";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: "Quantivo ERP",
    companyEmail: "info@quantivo.com",
    companyPhone: "+91 7079308040",
    companyAddress: "HathiKala, Rajpur Road, Dehradun",
    gstRate: 18,
    invoicePrefix: "INV",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timeoutMinutes: 30,
    emailNotifications: true,
    autoBackup: true,
  });

  const [originalSettings, setOriginalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    // Try to fetch settings from backend
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/admin/system-settings");
      if (res.data) {
        setSettings(res.data);
        setOriginalSettings(res.data);
        // Save to localStorage as backup
        localStorage.setItem("systemSettings", JSON.stringify(res.data));
      }
    } catch (err) {
      console.log("API unavailable, trying localStorage:", err.message);
      // Try to load from localStorage
      const savedSettings = localStorage.getItem("systemSettings");
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
          setOriginalSettings(parsedSettings);
        } catch {
          console.log("Using default settings");
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Try API first
      try {
        const res = await API.post("/admin/system-settings", settings);
        setSettings(res.data || settings);
        setOriginalSettings(res.data || settings);
        // Save to localStorage as backup
        localStorage.setItem("systemSettings", JSON.stringify(res.data || settings));
      } catch (apiErr) {
        // API failed, use localStorage
        console.log("API unavailable, saving to localStorage:", apiErr.message);
        localStorage.setItem("systemSettings", JSON.stringify(settings));
        setOriginalSettings(settings);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Error: " + (err.message || "Failed to save settings"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSettings(originalSettings);
    setSaved(false);
  };

  return (
    <div className="admin-settings">
      <div className="settings-header">
        <h1>⚙️ System Settings</h1>
        <p>Configure your Quantivo ERP settings and preferences</p>
      </div>

      {saved && <div className="alert alert-success">✓ Settings saved successfully!</div>}

      <div className="settings-container">
        {/* Company Information */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🏢 Company Information</h2>
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="companyEmail"
              value={settings.companyEmail}
              onChange={handleChange}
              placeholder="Enter company email"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="companyPhone"
              value={settings.companyPhone}
              onChange={handleChange}
              placeholder="Enter company phone"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="companyAddress"
              value={settings.companyAddress}
              onChange={handleChange}
              placeholder="Enter company address"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Financial Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>💰 Financial Settings</h2>
          </div>
          <div className="form-group">
            <label>GST Rate (%)</label>
            <input
              type="number"
              name="gstRate"
              value={settings.gstRate}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
            />
            <small>Default tax rate for invoices</small>
          </div>
          <div className="form-group">
            <label>Invoice Prefix</label>
            <input
              type="text"
              name="invoicePrefix"
              value={settings.invoicePrefix}
              onChange={handleChange}
              placeholder="e.g., INV"
              maxLength="10"
            />
            <small>e.g., INV-001, INV-002</small>
          </div>
          <div className="form-group">
            <label>Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
        </div>

        {/* System Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🔧 System Settings</h2>
          </div>
          <div className="form-group">
            <label>Date Format</label>
            <select
              name="dateFormat"
              value={settings.dateFormat}
              onChange={handleChange}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div className="form-group">
            <label>Session Timeout (Minutes)</label>
            <input
              type="number"
              name="timeoutMinutes"
              value={settings.timeoutMinutes}
              onChange={handleChange}
              min="5"
              max="480"
              step="5"
            />
            <small>Automatically log out after inactivity</small>
          </div>
        </div>

        {/* Notifications & Backup */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🔔 Notifications & Backup</h2>
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              Enable Email Notifications
            </label>
            <small>Send email alerts for important events</small>
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoBackup"
                checked={settings.autoBackup}
                onChange={handleChange}
              />
              Enable Automatic Backup
            </label>
            <small>Automatically backup data daily</small>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="settings-actions">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "💾 Save Settings"}
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          ↺ Reset
        </button>
      </div>

      {/* Help Section */}
      <div className="settings-help">
        <h3>ℹ️ Help</h3>
        <ul>
          <li>
            <strong>Company Information:</strong> Used in invoices and official documents
          </li>
          <li>
            <strong>GST Rate:</strong> Applied to all invoices automatically
          </li>
          <li>
            <strong>Invoice Prefix:</strong> Controls invoice numbering format
          </li>
          <li>
            <strong>Session Timeout:</strong> Users will be logged out if inactive
          </li>
          <li>
            <strong>Auto Backup:</strong> Recommended for data security
          </li>
        </ul>
      </div>
    </div>
  );
}
