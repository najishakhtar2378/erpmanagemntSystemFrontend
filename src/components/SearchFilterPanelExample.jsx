import { useMemo, useState } from "react";
import ResponsiveTable from "../components/ResponsiveTable";
import SearchFilterPanel from "../components/SearchFilterPanel";

// ==================== EXAMPLE 1: PRODUCT FILTER ====================

export function ProductFilterExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const allProducts = [
    { id: 1, name: "Laptop", sku: "SKU001", category: "Electronics", price: 1200, stock: 5, status: "In Stock" },
    { id: 2, name: "Mouse", sku: "SKU002", category: "Accessories", price: 25, stock: 50, status: "In Stock" },
    { id: 3, name: "Keyboard", sku: "SKU003", category: "Accessories", price: 85, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Monitor", sku: "SKU004", category: "Electronics", price: 350, stock: 12, status: "In Stock" },
    { id: 5, name: "Webcam", sku: "SKU005", category: "Accessories", price: 60, stock: 8, status: "In Stock" },
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesStatus = !filters.status || product.status === filters.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, filters]);

  const filterOptions = [
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "Electronics", label: "Electronics" },
        { value: "Accessories", label: "Accessories" },
      ],
    },
    {
      key: "status",
      label: "Stock Status",
      type: "select",
      options: [
        { value: "In Stock", label: "In Stock" },
        { value: "Out of Stock", label: "Out of Stock" },
      ],
    },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-${status === "In Stock" ? "completed" : "cancelled"}`}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Product Filter Example</h2>
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search products by name or SKU..."
      />
      <ResponsiveTable headers={headers} data={filteredProducts} />
      <p style={{ marginTop: "16px", color: "#666" }}>
        Showing {filteredProducts.length} of {allProducts.length} products
      </p>
    </div>
  );
}

// ==================== EXAMPLE 2: ORDER FILTER ====================

export function OrderFilterExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const allOrders = [
    { id: "ORD001", customer: "John Doe", date: "2026-02-24", status: "completed", amount: 500 },
    { id: "ORD002", customer: "Jane Smith", date: "2026-02-25", status: "pending", amount: 750 },
    { id: "ORD003", customer: "Bob Johnson", date: "2026-02-26", status: "shipped", amount: 1200 },
    { id: "ORD004", customer: "Alice Brown", date: "2026-02-23", status: "completed", amount: 450 },
    { id: "ORD005", customer: "Charlie Wilson", date: "2026-02-22", status: "cancelled", amount: 300 },
  ];

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const matchesSearch =
        searchTerm === "" ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !filters.status || order.status === filters.status;

      const orderDate = new Date(order.date);
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

      const matchesDateRange =
        (!fromDate || orderDate >= fromDate) && (!toDate || orderDate <= toDate);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [searchTerm, filters]);

  const filterOptions = [
    {
      key: "status",
      label: "Order Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "shipped", label: "Shipped" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "daterange",
      label: "Order Date Range",
      type: "daterange",
    },
  ];

  const headers = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-${status}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Order Filter Example</h2>
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search orders by ID or customer name..."
      />
      <ResponsiveTable headers={headers} data={filteredOrders} />
      <p style={{ marginTop: "16px", color: "#666" }}>
        Found {filteredOrders.length} of {allOrders.length} orders
      </p>
    </div>
  );
}

// ==================== EXAMPLE 3: CUSTOMER FILTER ====================

export function CustomerFilterExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const allCustomers = [
    { id: 1, name: "John Doe", email: "john@example.com", city: "New York", country: "USA", type: "premium" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", city: "London", country: "UK", type: "regular" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", city: "Toronto", country: "Canada", type: "premium" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", city: "Sydney", country: "Australia", type: "regular" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", city: "Berlin", country: "Germany", type: "vip" },
  ];

  const filteredCustomers = useMemo(() => {
    return allCustomers.filter((customer) => {
      const matchesSearch =
        searchTerm === "" ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry = !filters.country || customer.country === filters.country;
      const matchesType = !filters.type || customer.type === filters.type;

      return matchesSearch && matchesCountry && matchesType;
    });
  }, [searchTerm, filters]);

  const filterOptions = [
    {
      key: "country",
      label: "Country",
      type: "select",
      options: [
        { value: "USA", label: "USA" },
        { value: "UK", label: "UK" },
        { value: "Canada", label: "Canada" },
        { value: "Australia", label: "Australia" },
        { value: "Germany", label: "Germany" },
      ],
    },
    {
      key: "type",
      label: "Customer Type",
      type: "checkbox",
      options: [
        { value: "regular", label: "Regular" },
        { value: "premium", label: "Premium" },
        { value: "vip", label: "VIP" },
      ],
    },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
    {
      key: "type",
      label: "Type",
      render: (type) => (
        <span
          className="status-badge"
          style={{
            backgroundColor: type === "vip" ? "#ffd700" : type === "premium" ? "#667eea" : "#20c997",
            color: "white",
          }}
        >
          {type.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Customer Filter Example</h2>
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search customers by name or email..."
      />
      <ResponsiveTable headers={headers} data={filteredCustomers} />
      <p style={{ marginTop: "16px", color: "#666" }}>
        Found {filteredCustomers.length} of {allCustomers.length} customers
      </p>
    </div>
  );
}
