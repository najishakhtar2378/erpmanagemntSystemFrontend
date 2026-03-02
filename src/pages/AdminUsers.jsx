import { useEffect, useState } from "react";
import API from "../api/api";
import "./AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.log("Backend API not available, using localStorage:", err.message);
      // Load demo data from localStorage or use defaults
      const savedUsers = localStorage.getItem("systemUsers");
      if (savedUsers) {
        try {
          setUsers(JSON.parse(savedUsers));
        } catch {
          setUsers([
            { _id: "1", name: "Admin User", email: "admin@example.com", role: "admin", createdAt: new Date().toISOString() },
            { _id: "2", name: "Manager User", email: "manager@example.com", role: "manager", createdAt: new Date().toISOString() },
          ]);
        }
      } else {
        setUsers([
          { _id: "1", name: "Admin User", email: "admin@example.com", role: "admin", createdAt: new Date().toISOString() },
          { _id: "2", name: "Manager User", email: "manager@example.com", role: "manager", createdAt: new Date().toISOString() },
        ]);
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "staff" });
    setEditingUser(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Try API first
        try {
          const res = await API.put(`/admin/users/${editingUser._id}`, formData);
          const updatedUser = res.data;
          setUsers(users.map(u => u._id === editingUser._id ? updatedUser : u));
          // Save to localStorage as backup
          const updatedUsers = users.map(u => u._id === editingUser._id ? updatedUser : u);
          localStorage.setItem("systemUsers", JSON.stringify(updatedUsers));
        } catch (apiErr) {
          // API failed, use localStorage
          console.log("Using localStorage for update:", apiErr.message);
          const updatedUser = {
            ...editingUser,
            ...formData,
            updatedAt: new Date().toISOString()
          };
          const updatedUsers = users.map(u => u._id === editingUser._id ? updatedUser : u);
          setUsers(updatedUsers);
          localStorage.setItem("systemUsers", JSON.stringify(updatedUsers));
        }
      } else {
        // Try API first
        try {
          const res = await API.post("/admin/users", formData);
          const newUser = res.data;
          setUsers([...users, newUser]);
          // Save to localStorage as backup
          const updatedUsers = [...users, newUser];
          localStorage.setItem("systemUsers", JSON.stringify(updatedUsers));
        } catch (apiErr) {
          // API failed, use localStorage
          console.log("Using localStorage for add:", apiErr.message);
          const newUser = {
            _id: Date.now().toString(),
            ...formData,
            createdAt: new Date().toISOString()
          };
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          localStorage.setItem("systemUsers", JSON.stringify(updatedUsers));
        }
      }
      setShowForm(false);
      resetForm();
      alert("User saved successfully!");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Try API first
        try {
          await API.delete(`/admin/users/${userId}`);
        } catch (apiErr) {
          // API failed, continue with localStorage
          console.log("Using localStorage for delete:", apiErr.message);
        }
        // Update state and localStorage
        const updatedUsers = users.filter(u => u._id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem("systemUsers", JSON.stringify(updatedUsers));
        alert("User deleted successfully!");
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowForm(true);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "#ef4444",
      manager: "#f59e0b",
      staff: "#3b82f6",
      sales: "#8b5cf6",
      inventory: "#10b981",
    };
    return colors[role] || "#6b7280";
  };

  if (loading) {
    return <p style={{ padding: "30px", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="admin-users">
      <div className="users-header">
        <div>
          <h1>👥 User Management</h1>
          <p>Manage system users and assign roles</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          resetForm();
          setShowForm(true);
        }}>+ Add New User</button>
      </div>

      {/* Add/Edit User Form */}
      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <div className="form-header">
              <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label>Password {editingUser && "(Leave blank to keep current)"}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Enter password"
                  required={!editingUser}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                >
                  <option value="staff">👤 Staff</option>
                  <option value="sales">💼 Sales</option>
                  <option value="manager">📊 Manager</option>
                  <option value="admin">👨‍💼 Admin</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingUser ? "Update User" : "Add User"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                  No users found. <a href="#" style={{ color: "#38bdf8" }} onClick={(e) => {
                    e.preventDefault();
                    resetForm();
                    setShowForm(true);
                  }}>Create one</a>
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td className="user-name">
                    <span className="avatar">{u.name.charAt(0).toUpperCase()}</span>
                    {u.name}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(u.role) + "20", color: getRoleColor(u.role) }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => handleEditUser(u)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => handleDeleteUser(u._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="users-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Admins</h3>
          <p className="stat-value">{users.filter(u => u.role === "admin").length}</p>
        </div>
        <div className="stat-card">
          <h3>Managers</h3>
          <p className="stat-value">{users.filter(u => u.role === "manager").length}</p>
        </div>
        <div className="stat-card">
          <h3>Staff</h3>
          <p className="stat-value">{users.filter(u => u.role === "staff").length}</p>
        </div>
      </div>
    </div>
  );
}
