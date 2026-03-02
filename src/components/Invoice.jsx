import { useEffect } from "react";
import { openInvoiceInNewWindow } from "../utils/invoiceGenerator";
import "./Invoice.css";

export default function Invoice({ order, onClose }) {
  useEffect(() => {
    // Auto-open print dialog after short delay for better UX
    setTimeout(() => {
      openInvoiceInNewWindow(order);
    }, 500);
  }, [order]);

  // Extract customer data
  const customerName = order?.customer?.name || "Customer";
  const customerEmail = order?.customer?.email || "N/A";
  const customerPhone = order?.customer?.phone || "N/A";
  const customerAddress = order?.customer?.address || "N/A";

  const invoiceNumber = `INV-${order._id.slice(-8).toUpperCase()}`;
  const invoiceDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const subtotal = order.totalAmount || 0;
  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handlePrint = () => {
    openInvoiceInNewWindow(order);
  };

  const handleDownload = () => {
    const dueDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 20px; }
    .invoice-container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .header { display: flex; justify-content: space-between; border-bottom: 3px solid #667eea; padding-bottom: 30px; margin-bottom: 30px; }
    .company-info h1 { color: #667eea; font-size: 32px; margin-bottom: 5px; }
    .company-info p { color: #6b7280; font-size: 14px; margin: 3px 0; }
    .invoice-title { text-align: right; }
    .invoice-title h2 { color: #1f2937; font-size: 24px; margin-bottom: 15px; }
    .invoice-details { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
    .detail-section h3 { color: #667eea; font-size: 14px; text-transform: uppercase; margin-bottom: 10px; font-weight: 600; }
    .detail-section p { color: #374151; font-size: 14px; line-height: 1.8; margin-bottom: 5px; }
    .detail-section strong { color: #1f2937; font-weight: 600; }
    .invoice-meta { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 40px; padding: 20px; background-color: #f3f4f6; border-radius: 6px; }
    .meta-item { text-align: center; }
    .meta-item label { display: block; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; font-weight: 600; }
    .meta-item value { display: block; color: #1f2937; font-size: 16px; font-weight: 600; }
    .products-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .products-table thead { background-color: #f3f4f6; }
    .products-table th { padding: 12px; text-align: left; font-weight: 600; color: #1f2937; font-size: 14px; border-bottom: 2px solid #e5e7eb; }
    .products-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px; }
    .products-table tr:hover { background-color: #f9fafb; }
    .summary { display: flex; justify-content: flex-end; margin-bottom: 40px; }
    .summary-table { width: 100%; max-width: 400px; border-collapse: collapse; }
    .summary-table tr { border-bottom: 1px solid #e5e7eb; }
    .summary-table tr:last-child { border-bottom: 2px solid #667eea; }
    .summary-table td { padding: 12px; color: #374151; font-size: 14px; }
    .summary-table td:first-child { text-align: left; font-weight: 500; }
    .summary-table td:last-child { text-align: right; font-weight: 600; }
    .total-row { background-color: #f0f4ff; font-size: 16px !important; color: #667eea; }
    .total-row td { padding: 14px 12px !important; }
    .payment-info { padding: 20px; background-color: #f0f4ff; border-radius: 6px; margin-bottom: 30px; }
    .payment-info h3 { color: #667eea; font-size: 14px; text-transform: uppercase; margin-bottom: 10px; font-weight: 600; }
    .payment-info p { color: #374151; font-size: 14px; margin: 5px 0; }
    .footer { border-top: 3px solid #667eea; padding: 30px 0 20px; margin-top: 40px; background: linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%); border-radius: 0 0 8px 8px; }
    .footer-content { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; margin-bottom: 30px; }
    .footer-section h4 { color: #667eea; font-size: 13px; text-transform: uppercase; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.5px; }
    .footer-section p { color: #374151; font-size: 13px; line-height: 1.8; margin-bottom: 5px; }
    .footer-section a { color: #667eea; text-decoration: none; }
    .footer-section a:hover { text-decoration: underline; }
    .footer-divider { text-align: center; color: #d1d5db; font-size: 11px; margin: 15px 0; padding: 15px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
    .footer-bottom { text-align: center; color: #9ca3af; font-size: 11px; line-height: 1.6; }
    @media print { body { background: white; padding: 0; } .invoice-container { box-shadow: none; max-width: 100%; } }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div class="company-info">
        <h1>Quantivo ERP</h1>
        <p>📍 Rajpur Road HathiBarkala Dehradun</p>
        <p>📧 tradeAxix@gmail.com</p>
        <p>📞 7079308040</p>
      </div>
      <div class="invoice-title">
        <h2>INVOICE</h2>
        <p style="color: #667eea; font-weight: 600; font-size: 16px;">${invoiceNumber}</p>
      </div>
    </div>
    <div class="invoice-details">
      <div class="detail-section">
        <h3>Bill To</h3>
        <p><strong>${customerName}</strong></p>
        <p>${customerEmail}</p>
        <p>${customerPhone}</p>
      </div>
      <div class="detail-section">
        <h3>Shipping To</h3>
        <p><strong>${customerName}</strong></p>
        <p>${customerEmail}</p>
        <p>${customerPhone}</p>
      </div>
    </div>
    <div class="invoice-meta">
      <div class="meta-item"><label>Invoice Date</label><value>${invoiceDate}</value></div>
      <div class="meta-item"><label>Due Date</label><value>${dueDate}</value></div>
      <div class="meta-item"><label>Order ID</label><value>${order._id}</value></div>
    </div>
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
        ${(order.products || [])
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
          .join("")}
      </tbody>
    </table>
    <div class="summary">
      <table class="summary-table">
        <tr>
          <td>Subtotal</td>
          <td>₹ ${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Tax (18% GST)</td>
          <td>₹ ${taxAmount.toFixed(2)}</td>
        </tr>
        <tr class="total-row">
          <td>Total Amount</td>
          <td>₹ ${total.toFixed(2)}</td>
        </tr>
      </table>
    </div>
    <div class="payment-info">
      <h3>Payment Information</h3>
      <p><strong>Payment Status:</strong> ✅ Paid</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod ? order.paymentMethod.toUpperCase() : "Not specified"}</p>
      <p><strong>Payment Date:</strong> ${order.paymentDate ? new Date(order.paymentDate).toLocaleDateString("en-IN") : "N/A"}</p>
    </div>
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
        <p style="margin-top: 8px; font-size: 10px;">Generated on ${invoiceDate} | System Version 1.0</p>
      </div>
    </div>
  </div>
</body>
</html>`;
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(html));
    element.setAttribute("download", `${invoiceNumber}.html`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="invoice-modal-overlay">
      <div className="invoice-modal">
        <div className="invoice-header">
          <div>
            <h2>✅ Payment Successful!</h2>
            <p>Invoice has been generated</p>
          </div>
          <button className="close-invoice-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="invoice-preview">
          <div className="invoice-content">
            {/* Header */}
            <div className="preview-header">
              <div>
                <h3>Quantivo ERP</h3>
                <p>📍 123 Business Street</p>
                <p>📧 invoice@quantivo.com</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2>INVOICE</h2>
                <p style={{ color: "#667eea", fontWeight: "600", fontSize: "18px" }}>
                  {invoiceNumber}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="preview-details">
              <div>
                <h4>Bill To</h4>
                <p>
                  <strong>{customerName}</strong>
                  <br />
                  {customerEmail}
                  <br />
                  {customerPhone}
                </p>
              </div>
              <div>
                <p>
                  <strong>Invoice Date:</strong> {invoiceDate}
                  <br />
                  <strong>Order ID:</strong> {order._id}
                </p>
              </div>
            </div>

            {/* Products Summary */}
            <div className="preview-products">
              <p>
                <strong>Items:</strong> {order.products?.length || 0} product(s)
              </p>
              <p>
                <strong>Subtotal:</strong> ₹ {subtotal.toFixed(2)}
              </p>
              <p>
                <strong>Tax (18% GST):</strong> ₹ {taxAmount.toFixed(2)}
              </p>
              <p style={{ borderTop: "2px solid #667eea", paddingTop: "10px", marginTop: "10px" }}>
                <strong style={{ fontSize: "16px", color: "#667eea" }}>
                  Total Amount: ₹ {total.toFixed(2)}
                </strong>
              </p>
            </div>

            {/* Payment Info */}
            <div className="preview-payment">
              <p>
                <strong>Payment Status:</strong> ✅ Completed
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod ? order.paymentMethod.toUpperCase() : "N/A"}
              </p>
              <p>
                <strong>Payment Date:</strong>{" "}
                {order.paymentDate
                  ? new Date(order.paymentDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="invoice-actions">
          <button className="btn-print" onClick={handlePrint}>
            🖨️ Print / Save as PDF
          </button>
          <button className="btn-download" onClick={handleDownload}>
            📥 Download Invoice
          </button>
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
