// Invoice Generator Utility
export const generateInvoice = (order) => {
  const invoiceNumber = `INV-${order._id.slice(-8).toUpperCase()}`;
  const invoiceDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dueDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const orderData = {
    invoiceNumber,
    invoiceDate,
    dueDate,
    ...order,
  };

  return orderData;
};

// Generate HTML Invoice for Printing/PDF
export const generateInvoiceHTML = (order) => {
  const invoiceData = generateInvoice(order);
  
  // Extract customer data
  const customerName = order.customer?.name || "Customer";
  const customerEmail = order.customer?.email || "N/A";
  const customerPhone = order.customer?.phone || "N/A";
  const customerAddress = order.customer?.address || "N/A";
  
  const productsHTML = (order.products || [])
    .map(
      (product, index) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${index + 1}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${product.productName || "Product"}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${product.quantity || 0}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹ ${product.price || 0}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹ ${(product.quantity || 0) * (product.price || 0)}</td>
    </tr>
  `
    )
    .join("");

  const subtotal = order.totalAmount || 0;
  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const companyCurrency = "₹";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoiceData.invoiceNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      padding: 20px;
    }
    
    .invoice-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 3px solid #667eea;
      padding-bottom: 30px;
      margin-bottom: 30px;
    }
    
    .company-info h1 {
      color: #667eea;
      font-size: 32px;
      margin-bottom: 5px;
    }
    
    .company-info p {
      color: #6b7280;
      font-size: 14px;
      margin: 3px 0;
    }
    
    .invoice-title {
      text-align: right;
    }
    
    .invoice-title h2 {
      color: #1f2937;
      font-size: 24px;
      margin-bottom: 15px;
    }
    
    .invoice-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .detail-section h3 {
      color: #667eea;
      font-size: 14px;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-weight: 600;
    }
    
    .detail-section p {
      color: #374151;
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 5px;
    }
    
    .detail-section strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .invoice-meta {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin-bottom: 40px;
      padding: 20px;
      background-color: #f3f4f6;
      border-radius: 6px;
    }
    
    .meta-item {
      text-align: center;
    }
    
    .meta-item label {
      display: block;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 5px;
      font-weight: 600;
    }
    
    .meta-item value {
      display: block;
      color: #1f2937;
      font-size: 16px;
      font-weight: 600;
    }
    
    .products-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    
    .products-table thead {
      background-color: #f3f4f6;
    }
    
    .products-table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .products-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      color: #374151;
      font-size: 14px;
    }
    
    .products-table tr:hover {
      background-color: #f9fafb;
    }
    
    .summary {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40px;
    }
    
    .summary-table {
      width: 100%;
      max-width: 400px;
      border-collapse: collapse;
    }
    
    .summary-table tr {
      border-bottom: 1px solid #e5e7eb;
    }
    
    .summary-table tr:last-child {
      border-bottom: 2px solid #667eea;
    }
    
    .summary-table td {
      padding: 12px;
      color: #374151;
      font-size: 14px;
    }
    
    .summary-table td:first-child {
      text-align: left;
      font-weight: 500;
    }
    
    .summary-table td:last-child {
      text-align: right;
      font-weight: 600;
    }
    
    .total-row {
      background-color: #f0f4ff;
      font-size: 16px !important;
      color: #667eea;
    }
    
    .total-row td {
      padding: 14px 12px !important;
    }
    
    .payment-info {
      padding: 20px;
      background-color: #f0f4ff;
      border-radius: 6px;
      margin-bottom: 30px;
    }
    
    .payment-info h3 {
      color: #667eea;
      font-size: 14px;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-weight: 600;
    }
    
    .payment-info p {
      color: #374151;
      font-size: 14px;
      margin: 5px 0;
    }
    
    .footer {
      border-top: 3px solid #667eea;
      padding: 30px 0 20px;
      margin-top: 40px;
      background: linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%);
      border-radius: 0 0 8px 8px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    
    .footer-section h4 {
      color: #667eea;
      font-size: 13px;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }
    
    .footer-section p {
      color: #374151;
      font-size: 13px;
      line-height: 1.8;
      margin-bottom: 5px;
    }
    
    .footer-section a {
      color: #667eea;
      text-decoration: none;
    }
    
    .footer-section a:hover {
      text-decoration: underline;
    }
    
    .footer-divider {
      text-align: center;
      color: #d1d5db;
      font-size: 11px;
      margin: 15px 0;
      padding: 15px 0;
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .footer-bottom {
      text-align: center;
      color: #9ca3af;
      font-size: 11px;
      line-height: 1.6;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .invoice-container {
        box-shadow: none;
        max-width: 100%;
      }
      
      .print-btn {
        display: none;
      }
    }
    
    .print-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }
    
    .print-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Print Invoice / Save as PDF</button>
  
  <div class="invoice-container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>Quantivo ERP</h1>
        <p>📍 123 Business Street</p>
        <p>📧 invoice@quantivo.com</p>
        <p>📞 +91 1234567890</p>
      </div>
      <div class="invoice-title">
        <h2>INVOICE</h2>
        <p style="color: #667eea; font-weight: 600; font-size: 16px;">${invoiceData.invoiceNumber}</p>
      </div>
    </div>
    
    <!-- Invoice Details -->
    <div class="invoice-details">
      <div class="detail-section">
        <h3>Bill To</h3>
        <p><strong>${customerName}</strong></p>
        <p>${customerEmail}</p>
        <p>${customerPhone}</p>
        <p>${customerAddress}</p>
      </div>
      <div class="detail-section">
        <h3>Shipping To</h3>
        <p><strong>${customerName}</strong></p>
        <p>${customerEmail}</p>
        <p>${customerPhone}</p>
        <p>${customerAddress}</p>
      </div>
    </div>
    
    <!-- Invoice Metadata -->
    <div class="invoice-meta">
      <div class="meta-item">
        <label>Invoice Date</label>
        <value>${invoiceData.invoiceDate}</value>
      </div>
      <div class="meta-item">
        <label>Due Date</label>
        <value>${invoiceData.dueDate}</value>
      </div>
      <div class="meta-item">
        <label>Order ID</label>
        <value>${order._id}</value>
      </div>
    </div>
    
    <!-- Products Table -->
    <table class="products-table">
      <thead>
        <tr>
          <th style="width: 5%;">#</th>
          <th style="width: 45%;">Product Description</th>
          <th style="width: 15%; text-align: center;">Quantity</th>
          <th style="width: 15%; text-align: right;">Unit Price</th>
          <th style="width: 20%; text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${productsHTML}
      </tbody>
    </table>
    
    <!-- Summary -->
    <div class="summary">
      <table class="summary-table">
        <tr>
          <td>Subtotal</td>
          <td>${companyCurrency} ${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Tax (18% GST)</td>
          <td>${companyCurrency} ${taxAmount.toFixed(2)}</td>
        </tr>
        <tr class="total-row">
          <td>Total Amount</td>
          <td>${companyCurrency} ${total.toFixed(2)}</td>
        </tr>
      </table>
    </div>
    
    <!-- Payment Info -->
    <div class="payment-info">
      <h3>Payment Information</h3>
      <p><strong>Payment Status:</strong> ${order.paymentStatus === "Completed" ? "✅ Paid" : "⏳ Pending"}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod ? order.paymentMethod.toUpperCase() : "Not specified"}</p>
      <p><strong>Payment Date:</strong> ${order.paymentDate ? new Date(order.paymentDate).toLocaleDateString("en-IN") : "N/A"}</p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>📞 Contact Us</h4>
          <p><strong>Email:</strong> <a href="mailto:invoice@quantivo.com">invoice@quantivo.com</a></p>
          <p><strong>Phone:</strong> 7079308040</p>
          <p><strong>Location:</strong> Rajpur Road, Dehradun</p>
        </div>
        <div class="footer-section">
          <h4>💳 Payment Terms</h4>
          <p><strong>Due Date:</strong> 30 days from invoice date</p>
          <p><strong>Methods:</strong> Card, UPI, Net Banking</p>
          <p><strong>Status:</strong> ✅ Paid</p>
        </div>
        <div class="footer-section">
          <h4>📋 Document Info</h4>
          <p><strong>Type:</strong> Tax Invoice</p>
          <p><strong>Auto-Generated:</strong> Yes</p>
          <p><strong>Status:</strong> Official Document</p>
        </div>
      </div>
      <div class="footer-divider">
        Thank you for your business! This is a computer-generated official invoice. Please retain for your records.
      </div>
      <div class="footer-bottom">
        <p>© 2026 Quantivo ERP. All rights reserved. | For inquiries, contact us at invoice@quantivo.com</p>
        <p style="margin-top: 8px; font-size: 10px;">Generated on ${invoiceData.invoiceDate} | System Version 1.0</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return html;
};

// Download invoice as HTML file
export const downloadInvoice = (order) => {
  const html = generateInvoiceHTML(order);
  const invoiceData = generateInvoice(order);
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(html));
  element.setAttribute("download", `${invoiceData.invoiceNumber}.html`);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Open invoice in new window for printing/PDF
export const openInvoiceInNewWindow = (order) => {
  const html = generateInvoiceHTML(order);
  const newWindow = window.open();
  newWindow.document.write(html);
  newWindow.document.close();
};
