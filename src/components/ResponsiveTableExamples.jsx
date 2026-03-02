// Example: How to use ResponsiveTable Component
// Import it in your page components

import ResponsiveTable from "../components/ResponsiveTable";

// Example 1: Simple Product Table
export function ProductTableExample() {
  const products = [
    { id: 1, name: "Laptop", sku: "SKU001", price: "$1200", stock: 5 },
    { id: 2, name: "Mouse", sku: "SKU002", price: "$25", stock: 50 },
    { id: 3, name: "Keyboard", sku: "SKU003", price: "$85", stock: 20 },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <ResponsiveTable
      headers={headers}
      data={products}
      striped={true}
      hover={true}
      bordered={true}
      responsive={true}
    />
  );
}

// Example 2: Order Table with Custom Rendering
export function OrderTableExample() {
  const orders = [
    { id: "ORD001", customer: "John Doe", total: "$500", status: "completed" },
    { id: "ORD002", customer: "Jane Smith", total: "$750", status: "pending" },
    { id: "ORD003", customer: "BOB Johnson", total: "$1200", status: "shipped" },
  ];

  const headers = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer Name" },
    { key: "total", label: "Total Amount" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <ResponsiveTable
      headers={headers}
      data={orders}
      striped={true}
      hover={true}
      bordered={true}
      responsive={true}
      className="order-table"
    />
  );
}

// Example 3: Customer Table with Actions
export function CustomerTableExample() {
  const customers = [
    { id: 1, name: "Alice Cooper", email: "alice@example.com", phone: "+1 (555) 123-4567", status: "active" },
    { id: 2, name: "Bob Wilson", email: "bob@example.com", phone: "+1 (555) 234-5678", status: "active" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "+1 (555) 345-6789", status: "inactive" },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="table-actions">
          <button className="table-action-btn edit">Edit</button>
          <button className="table-action-btn delete">Delete</button>
        </div>
      ),
    },
  ];

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  return (
    <ResponsiveTable
      headers={headers}
      data={customers}
      striped={true}
      hover={true}
      bordered={true}
      responsive={true}
      onRowClick={handleRowClick}
    />
  );
}

// Example 4: Analytics Table
export function AnalyticsTableExample() {
  const analyticsData = [
    { product: "Laptop", units: 150, revenue: "$180000", growth: "+25%" },
    { product: "Mouse", units: 500, revenue: "$12500", growth: "+45%" },
    { product: "Keyboard", units: 300, revenue: "$25500", growth: "+15%" },
    { product: "Monitor", units: 80, revenue: "$32000", growth: "+60%" },
  ];

  const headers = [
    { key: "product", label: "Product" },
    { key: "units", label: "Units Sold" },
    { key: "revenue", label: "Revenue" },
    {
      key: "growth",
      label: "Growth",
      render: (value) => (
        <span style={{
          color: value.includes("+") ? "#20c997" : "#ff6b6b",
          fontWeight: "600"
        }}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <ResponsiveTable
      headers={headers}
      data={analyticsData}
      striped={true}
      hover={true}
      bordered={false}
      responsive={true}
    />
  );
}
