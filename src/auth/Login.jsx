import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: "admin", label: "👨‍💼 Admin", description: "Full system access" },
    { value: "manager", label: "📊 Manager", description: "Team & order management" },
    { value: "staff", label: "👤 Staff", description: "View & create orders" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/login", { email, password });
      
      // Check if user's role matches selected role
      if (res.data.user.role !== role) {
        setError(`Invalid login. You are registered as ${res.data.user.role}, not ${role}.`);
        setLoading(false);
        return;
      }

      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      const redirectUrl = getDashboardUrl(res.data.user.role);
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  const getDashboardUrl = (userRole) => {
    switch (userRole) {
      case "admin":
        return "/admin-dashboard";
      case "manager":
        return "/manager-dashboard";
      case "staff":
        return "/staff-dashboard";
      default:
        return "/products";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Section */}
        <div className="auth-info">
          <div className="info-content">
            <h1>Quantivo ERP</h1>
            <p>Role-Based Access Control</p>
            <div className="roles-preview">
              {roleOptions.map((option) => (
                <div key={option.value} className="role-item">
                  <span className="role-emoji">{option.label.split(" ")[0]}</span>
                  <div>
                    <strong>{option.label.split(" ").slice(1).join(" ")}</strong>
                    <small>{option.description}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="auth-form-wrapper">
          <form className="auth-card" onSubmit={handleLogin}>
            <div className="form-header">
              <h2>Login</h2>
              <p>Select your role and enter credentials</p>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="role">Select Your Role</label>
              <div className="role-selector">
                {roleOptions.map((option) => (
                  <label key={option.value} className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={loading}
                    />
                    <span className="role-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Login Button */}
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Signup Link */}
            <p className="auth-footer">
              New user? <Link to="/signup">Create an account</Link>
            </p>

            {/* Demo Credentials */}
            <div className="demo-credentials">
              <details>
                <summary>Demo Credentials</summary>
                <div className="credentials-list">
                  <div className="credential-item">
                    <strong>Admin:</strong> admin@example.com / password
                  </div>
                  <div className="credential-item">
                    <strong>Manager:</strong> manager@example.com / password
                  </div>
                  <div className="credential-item">
                    <strong>Staff:</strong> staff@example.com / password
                  </div>
                </div>
              </details>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
