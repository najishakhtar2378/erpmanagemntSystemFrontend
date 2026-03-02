# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 📊 Responsive Table Component - Documentation

## Overview
A fully responsive table component designed for mobile, tablet, and desktop views. Automatically converts to card-based layout on mobile devices.

## Features

✅ **Mobile-Friendly** - Converts to card layout on small screens  
✅ **Tablet Optimized** - Adjusts spacing and hides/shows columns appropriately  
✅ **Desktop Ready** - Full-featured table with sticky headers  
✅ **Striped Rows** - Alternate row colors for better readability  
✅ **Hover Effects** - Interactive feedback on desktop  
✅ **Status Badges** - Pre-styled status indicators  
✅ **Action Buttons** - Built-in button styles for actions  
✅ **Custom Rendering** - Render custom content for any column  
✅ **Click Handler** - Optional row-click callbacks  
✅ **Print Friendly** - Optimized print styles  
✅ **Accessibility** - Data labels for mobile card layout  

---

## Installation

### 1. Copy Files
- [ResponsiveTable.jsx](./ResponsiveTable.jsx) → `src/components/`
- [ResponsiveTable.css](./ResponsiveTable.css) → `src/components/`

### 2. Import Component
```jsx
import ResponsiveTable from "../components/ResponsiveTable";
```

---

## Basic Usage

### Simple Table

```jsx
import ResponsiveTable from "../components/ResponsiveTable";

export default function ProductPage() {
  const products = [
    { id: 1, name: "Laptop", price: "$1200", stock: 5 },
    { id: 2, name: "Mouse", price: "$25", stock: 50 },
    { id: 3, name: "Keyboard", price: "$85", stock: 20 },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Product Name" },
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
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headers` | Array | `[]` | Array of header objects `{ key, label, render? }` |
| `data` | Array | `[]` | Array of row data objects |
| `striped` | Boolean | `true` | Alternate row background colors |
| `hover` | Boolean | `true` | Hover effect on rows |
| `bordered` | Boolean | `true` | Add borders to cells |
| `responsive` | Boolean | `true` | Enable responsive behavior |
| `className` | String | `""` | Additional CSS classes |
| `onRowClick` | Function | `null` | Callback for row clicks |

---

## Header Configuration

Each header object should have:

```javascript
{
  key: "fieldName",           // Data key to display
  label: "Column Header",      // Display label
  render: (value, row) => {}  // Optional: Custom render function
}
```

### Example with Custom Rendering

```jsx
const headers = [
  { key: "id", label: "ID" },
  { key: "name", label: "Product Name" },
  {
    key: "price",
    label: "Price",
    render: (value) => `💵 ${value}`
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span className={`status-badge status-${value.toLowerCase()}`}>
        {value}
      </span>
    )
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="table-actions">
        <button className="table-action-btn edit">Edit</button>
        <button className="table-action-btn delete">Delete</button>
      </div>
    )
  }
];
```

---

## Advanced Examples

### 1. Order Table with Status Badges

```jsx
export default function OrdersPage() {
  const orders = [
    { id: "ORD001", customer: "John", amount: "$500", status: "completed" },
    { id: "ORD002", customer: "Jane", amount: "$750", status: "pending" },
    { id: "ORD003", customer: "Bob", amount: "$1200", status: "shipped" },
  ];

  const headers = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
  ];

  return <ResponsiveTable headers={headers} data={orders} />;
}
```

### 2. Table with Actions

```jsx
const handleEdit = (row) => {
  console.log("Edit:", row);
};

const handleDelete = (row) => {
  console.log("Delete:", row);
};

const headers = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="table-actions">
        <button className="table-action-btn edit" onClick={() => handleEdit(row)}>
          Edit
        </button>
        <button className="table-action-btn delete" onClick={() => handleDelete(row)}>
          Delete
        </button>
      </div>
    ),
  },
];
```

### 3. Table with Row Click Handler

```jsx
<ResponsiveTable
  headers={headers}
  data={data}
  onRowClick={(row) => {
    console.log("Row clicked:", row);
    // Navigate to detail page
    // window.location.href = `/details/${row.id}`;
  }}
/>
```

---

## Responsive Breakpoints

### Mobile (≤480px)
- Card-based layout
- Headers hidden
- Data labels shown inline
- Compact padding

### Tablet (481px - 768px)
- Compressed table layout
- Reduced padding
- Some columns might be hidden
- Optimized spacing

### Desktop (≥769px)
- Full table layout
- All columns visible
- Standard padding
- Sticky headers

---

## Styling Classes

### Status Badges
```jsx
<span className="status-badge status-completed">Completed</span>
<span className="status-badge status-pending">Pending</span>
<span className="status-badge status-shipped">Shipped</span>
<span className="status-badge status-cancelled">Cancelled</span>
<span className="status-badge status-processing">Processing</span>
```

### Action Buttons
```jsx
<div className="table-actions">
  <button className="table-action-btn edit">Edit</button>
  <button className="table-action-btn delete">Delete</button>
  <button className="table-action-btn view">View</button>
</div>
```

### Hide on Specific Devices
```jsx
// Hide column on tablet
<th className="hide-on-tablet">Column</th>

// Hide column on desktop
<th className="hide-on-desktop">Column</th>
```

---

## Mobile Card Layout

On mobile devices (≤480px), the table automatically converts to a card layout:

```
┌─────────────────────────┐
│ ID:          10001      │
│ Name:        John Doe   │
│ Email:       john@... │
│ Status:      Active     │
└─────────────────────────┘
```

Each row becomes a card with inline labels (data-label attribute).

---

## CSS Customization

### Override Primary Color
```css
.responsive-table thead {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%) !important;
}
```

### Override Border Color
```css
.responsive-table.bordered th,
.responsive-table.bordered td {
  border-color: #your-color !important;
}
```

### Custom Hover Effect
```css
.responsive-table.hover tbody tr:hover {
  background-color: #your-color !important;
}
```

---

## Empty State Handling

Automatically shows "No data available" when:
```jsx
data={[]} // Empty array
```

Customize message:
```jsx
{data.length === 0 && (
  <div className="empty-state">
    <p>No products found. Please try again.</p>
  </div>
)}
```

---

## Print Styles

Tables are automatically print-friendly:
```jsx
// Browser print preview (Ctrl+P or Cmd+P)
// Tables will print with proper formatting and page breaks
```

---

## Performance Tips

1. **Memoization** - Use memo for large tables
   ```jsx
   export default React.memo(ResponsiveTable);
   ```

2. **Pagination** - Limit rows displayed
   ```jsx
   const pageSize = 50;
   const paginatedData = data.slice(0, pageSize);
   ```

3. **Virtualization** - For very large datasets, consider react-window

---

## Troubleshooting

### Table not responsive?
- Ensure `responsive={true}` prop is set
- Check CSS is imported correctly
- Verify mobile viewport meta tag in HTML

### Custom render not working?
- Ensure render function returns JSX
- Check data key matches object property
- Verify no syntax errors in render function

### Sticky header not sticking?
- Ensure parent has defined height
- Check z-index doesn't conflict with other elements
- Verify CSS is loaded correctly

---

## Browser Support

✅ Chrome/Edge  
✅ Firefox  
✅ Safari  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  

---

## License & Usage

Free to use and modify in your project!

---

## Need Help?

Check examples in [ResponsiveTableExamples.jsx](./ResponsiveTableExamples.jsx)
// ==================== INTEGRATION GUIDE ====================
// How to integrate SearchFilterPanel with your existing pages

// ==================== EXAMPLE 1: UPDATE CUSTOMERS PAGE ====================

import { useState, useMemo } from "react";
import SearchFilterPanel from "./SearchFilterPanel";
import ResponsiveTable from "./ResponsiveTable";
import API from "../api/api";

export default function CustomersPageWithFilter() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Fetch customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        !searchTerm ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !filters.status || customer.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filters, customers]);

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-${status}`}>{status}</span>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search customers by name or email..."
      />
      <ResponsiveTable headers={headers} data={filteredCustomers} />
      <p style={{ marginTop: "16px", color: "#666" }}>
        Showing {filteredCustomers.length} of {customers.length} customers
      </p>
    </div>
  );
}

// ==================== EXAMPLE 2: UPDATE PRODUCTS PAGE ====================

import { useState, useMemo } from "react";
import SearchFilterPanel from "./SearchFilterPanel";
import ResponsiveTable from "./ResponsiveTable";
import API from "../api/api";

export default function ProductsPageWithFilter() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !filters.category || product.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filters, products]);

  const filterOptions = [
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "Electronics", label: "Electronics" },
        { value: "Software", label: "Software" },
        { value: "Services", label: "Services" },
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
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search products by name or SKU..."
      />
      <ResponsiveTable headers={headers} data={filteredProducts} />
    </div>
  );
}

// ==================== EXAMPLE 3: UPDATE SALES ORDERS PAGE ====================

import { useState, useMemo } from "react";
import SearchFilterPanel from "./SearchFilterPanel";
import ResponsiveTable from "./ResponsiveTable";
import API from "../api/api";

export default function SalesOrdersPageWithFilter() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/sales-orders");
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        !searchTerm ||
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
  }, [searchTerm, filters, orders]);

  const filterOptions = [
    {
      key: "status",
      label: "Order Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "daterange",
      label: "Order Date",
      type: "daterange",
    },
  ];

  const headers = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "date", label: "Date" },
    { key: "total", label: "Total Amount" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sales Orders</h1>
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search orders by ID or customer name..."
      />
      <ResponsiveTable headers={headers} data={filteredOrders} />
      <p style={{ marginTop: "16px", color: "#666" }}>
        Found {filteredOrders.length} of {orders.length} orders
      </p>
    </div>
  );
}

// ==================== REUSABLE FILTER UTILITY ====================

// Create a utils file: src/utils/filterUtils.js

export const applySearchAndFilters = (data, searchTerm, filters) => {
  return data.filter((item) => {
    // Search logic
    const searchFields = Object.values(item).filter(
      (val) => typeof val === "string"
    );
    const matchesSearch =
      !searchTerm ||
      searchFields.some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter logic - handle all filter types
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value || value.length === 0) return true;

      // For date range filters
      if (key.endsWith("_from") || key.endsWith("_to")) {
        const dateField = key.replace("_from", "").replace("_to", "");
        const itemDate = new Date(item[dateField]);

        if (key.endsWith("_from")) {
          return itemDate >= new Date(value);
        } else {
          return itemDate <= new Date(value);
        }
      }

      // For checkbox (array) filters
      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }

      // For regular filters
      return item[key] === value;
    });

    return matchesSearch && matchesFilters;
  });
};

// Usage:
// import { applySearchAndFilters } from "../utils/filterUtils";
// const filtered = applySearchAndFilters(data, searchTerm, filters);

# 🔍 Search + Filter Panel - Documentation

# 💳 Payment-Based Order Confirmation System

## Overview
This payment system integrates secure payment processing with order management in your ERP system. Orders can now be confirmed only after successful payment completion.

## Features

### ✅ Payment Methods Supported
1. **Credit/Debit Card** 💳
   - 16-digit card number
   - Cardholder name
   - Expiry date (MM/YY)
   - CVV (3 digits)

2. **UPI** 📱
   - UPI ID (username@bank)
   - Instant payment processing
   - Real-time confirmation

3. **Net Banking** 🏦
   - Multiple bank options
   - Secure bank portal redirect
   - Advanced payment security

### 🔄 Order Status Flow
```
Create Order (Pending) 
    ↓
Payment Pending → Confirm Payment
    ↓
Payment Modal Opens (Card/UPI/NetBanking)
    ↓
Payment Verification
    ↓
Order Status: Completed (if paid)
Order Status: Pending (if payment fails)
```

### 📊 Payment Status Types
- **Pending**: Awaiting payment confirmation
- **Completed**: Payment successfully processed
- **Failed**: Payment attempt failed

## Implementation Details

### Files Created
1. **PaymentModal.jsx** - Payment UI component
   - Beautiful payment form with multiple methods
   - Real-time validation
   - Responsive design

2. **PaymentModal.css** - Payment styling
   - Modern gradient design
   - Mobile-responsive
   - Smooth animations

### Modified Files
1. **OrderListPage.jsx**
   - Added payment status column in table
   - "💳 Pay" button to initiate payment
   - Filter by payment status
   - Payment modal integration

2. **orderList.css**
   - Payment status badge styles (Pending/Completed/Failed)
   - Confirm payment button styling
   - Color-coded statuses

3. **SalesOrderPage.jsx**
   - Updated success message to redirect to payment

## How to Use

### Creating and Confirming Orders

#### Step 1: Create Order
1. Go to **Create Sales Order** page
2. Select customer, product, quantity, and price
3. Click **Create Order**
4. You'll be redirected to **Sales Orders** list

#### Step 2: Confirm Payment
1. Find the order with **Payment Status: Pending**
2. Click the **💳 Pay** button
3. A payment modal will open

#### Step 3: Choose Payment Method
**Option A: Credit/Debit Card**
- Enter 16-digit card number
- Enter cardholder name
- Enter expiry date (MM/YY)
- Enter 3-digit CVV
- Click "Pay ₹[amount]"

**Option B: UPI**
- Enter UPI ID (e.g., yourname@googlepay)
- Click "Pay ₹[amount]"

**Option C: Net Banking**
- Select your bank from dropdown
- Click "Pay ₹[amount]"
- You'll be redirected to bank's secure portal

#### Step 4: Payment Confirmation
- After successful payment:
  - Payment Status automatically changes to **Completed**
  - Order Status updates to **Completed**
  - Success message displayed
  - Order list refreshes

### Filtering Orders

In the Sales Orders list, you can filter by:
- **Order Status**: Pending, Completed, Cancelled
- **Payment Status**: Pending, Completed, Failed

Example: Filter to see all orders with Pending payment status.

## API Integration

### Backend Endpoint Required
The system expects the following backend endpoint:

```
PUT /sales-orders/:id/confirm-payment

Request Body:
{
  "paymentMethod": "card|upi|netbanking",
  "paymentAmount": 5000,
  "paymentDetails": {
    "cardLast4": "4242",
    "cardName": "John Doe"
    // or for UPI: "upiId": "user@upi"
  }
}

Response:
{
  "_id": "order123",
  "status": "Completed",
  "paymentStatus": "Completed",
  "paymentMethod": "card",
  "paymentDate": "2024-02-26T10:30:00Z"
}
```

## Security Features

✅ **Payment Security**
- Input validation for card details
- CVV masked display (shown as dots)
- No sensitive data stored in localStorage
- HTTPS recommended in production

✅ **User Experience**
- Real-time validation feedback
- Clear error messages
- Loading states during payment
- Responsive design on all devices

## Customization

### Adding Payment Gateway Integration
To integrate with real payment gateways (Razorpay, Stripe, PayU):

1. Replace the `handlePaymentSuccess` function in OrderListPage.jsx
2. Add your payment gateway API call
3. Handle success/failure responses

Example with Razorpay:
```jsx
const handlePaymentSuccess = async (paymentData) => {
  // Replace with actual Razorpay integration
  const razorpayResponse = await initiateRazorpayPayment(
    selectedOrder.totalAmount
  );
  
  if (razorpayResponse.success) {
    // Confirm payment in backend
    await API.put(`/sales-orders/${selectedOrder._id}/confirm-payment`, {
      paymentMethod: 'razorpay',
      paymentId: razorpayResponse.razorpay_payment_id,
      signature: razorpayResponse.razorpay_signature
    });
  }
};
```

### Styling Customization
Modify PaymentModal.css to:
- Change color scheme (currently purple #667eea)
- Update button styles
- Adjust spacing and sizing
- Add custom animations

## Troubleshooting

### Payment Modal Not Appearing
- Check that PaymentModal.jsx is properly imported
- Verify PaymentModal.css is linked
- Check browser console for errors

### Payment Status Not Updating
- Verify backend endpoint `/sales-orders/:id/confirm-payment` exists
- Check API response format matches expectations
- Review network tab in browser DevTools

### Validation Errors
- Card number must be 16 digits
- CVV must be 3 digits
- UPI ID must contain @ symbol
- Date format: MM/YY

## Future Enhancements

🔜 **Planned Features**
- Integration with Razorpay/Stripe
- Payment history/receipts
- Partial payments
- Refund processing
- Payment analytics dashboard
- Email receipts
- Multiple currency support
- Recurring payments
- Wallet integration

## Support

For issues or questions:
1. Check console errors (DevTools)
2. Verify backend endpoints
3. Test with sample data
4. Contact support team

---

**Version**: 1.0  
**Last Updated**: February 26, 2026
