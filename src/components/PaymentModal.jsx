import { useState } from "react";
import "./PaymentModal.css";

export default function PaymentModal({ order, onConfirm, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Validation
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert("Please fill all card details");
        return;
      }
      if (cardNumber.length !== 16) {
        alert("Card number must be 16 digits");
        return;
      }
      if (cvv.length !== 3) {
        alert("CVV must be 3 digits");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        alert("Please enter UPI ID");
        return;
      }
      if (!upiId.includes("@")) {
        alert("Invalid UPI format (e.g., username@bank)");
        return;
      }
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call parent handler with payment data
      await onConfirm({
        method: paymentMethod,
        amount: order.totalAmount,
        paymentDetails: paymentMethod === "card" 
          ? { 
              cardLast4: cardNumber.slice(-4),
              cardName 
            }
          : paymentMethod === "upi"
          ? { upiId }
          : { bank: "selected" },
      });
    } catch (error) {
      alert("Payment failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h3>💳 Confirm Payment</h3>
          <button
            className="close-btn"
            onClick={onCancel}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-row">
            <span>Customer:</span>
            <strong>{order.customer?.name}</strong>
          </div>
          <div className="summary-row">
            <span>Order ID:</span>
            <strong>{order._id?.slice(-8)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <strong className="amount">₹ {order.totalAmount}</strong>
          </div>
        </div>

        {/* Payment Methods */}
        <form onSubmit={handlePayment} className="payment-form">
          {/* Method Selection */}
          <div className="payment-methods">
            <label className={`method-option ${paymentMethod === "card" ? "active" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Credit/Debit Card</span>
            </label>

            <label className={`method-option ${paymentMethod === "upi" ? "active" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>📱 UPI</span>
            </label>

            <label className={`method-option ${paymentMethod === "netbanking" ? "active" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === "netbanking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>🏦 Net Banking</span>
            </label>
          </div>

          {/* Card Payment Fields */}
          {paymentMethod === "card" && (
            <div className="payment-fields">
              <div className="field">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  maxLength="16"
                  required
                />
              </div>

              <div className="field">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Expiry Date (MM/YY)</label>
                  <input
                    type="text"
                    placeholder="12/25"
                    value={expiryDate}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length >= 2) {
                        val = val.slice(0, 2) + "/" + val.slice(2, 4);
                      }
                      setExpiryDate(val);
                    }}
                    maxLength="5"
                    required
                  />
                </div>

                <div className="field">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* UPI Payment Fields */}
          {paymentMethod === "upi" && (
            <div className="payment-fields">
              <div className="field">
                <label>UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>
              <p className="info-text">🔒 Your UPI payment will be processed securely</p>
            </div>
          )}

          {/* Net Banking */}
          {paymentMethod === "netbanking" && (
            <div className="payment-fields">
              <div className="field">
                <label>Select Your Bank</label>
                <select required>
                  <option value="">Choose your bank...</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="axis">Axis Bank</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <p className="info-text">🔒 You'll be redirected to your bank's secure portal</p>
            </div>
          )}

          {/* Payment Processing Info */}
          {loading && (
            <div className="processing-info">
              <div className="spinner"></div>
              <p>Processing payment...</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="payment-actions">
            <button
              type="button"
              className="cancel-payment-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="confirm-payment-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹ ${order.totalAmount}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
