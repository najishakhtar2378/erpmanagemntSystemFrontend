import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/register", {
        name,
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Section */}
        <div className="auth-info">
          <div className="info-content">
            <h1>Quantivo ERP</h1>
            <p>Create Your Account</p>
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

        {/* Right Section - Signup Form */}
        <div className="auth-form-wrapper">
          <form className="auth-card" onSubmit={handleSignup}>
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Join Quantivo ERP</p>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

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

            {/* Signup Button */}
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="auth-footer">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
