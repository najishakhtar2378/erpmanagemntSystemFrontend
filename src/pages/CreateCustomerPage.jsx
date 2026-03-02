import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./CreateCustomer.css";

export default function CreateCustomerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      setError("Customer name is required");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Customer name must be at least 2 characters");
      return false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (phone && !/^[0-9\-\+\s\(\)]{7,}$/.test(phone.replace(/\s/g, ""))) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const createCustomer = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await API.post("/customers", {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
      });

      navigate("/customers");
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Failed to create customer. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-customer-container">
      <div className="create-customer-header">
        <h1>Create New Customer</h1>
        <p>Add a new customer to your system</p>
      </div>

      <form className="create-customer-form" onSubmit={createCustomer}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">
            <span className="label-icon">👤</span> Customer Name
            <span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <span className="label-icon">📧</span> Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <span className="label-icon">📱</span> Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="btn-submit"
          >
            {loading ? "Creating..." : "Create Customer"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/customers")}
            disabled={loading}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
