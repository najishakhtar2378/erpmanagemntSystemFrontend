import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Salesorder.css";

export default function SalesOrderPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      setError("Failed to load customers");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    setCustomer(customerId);
    const selectedCustomer = customers.find((c) => c._id === customerId);
    setCustomerName(selectedCustomer?.name || "");
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setProduct(productId);
    const selectedProduct = products.find((p) => p._id === productId);
    setProductData(selectedProduct);
    if (selectedProduct?.price) {
      setPrice(selectedProduct.price);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const totalAmount = productData && quantity && price 
    ? (parseFloat(price) * parseInt(quantity)).toFixed(2)
    : 0;

  const validateForm = () => {
    if (!customer) {
      setError("Please select a customer");
      return false;
    }
    if (!product) {
      setError("Please select a product");
      return false;
    }
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return false;
    }
    if (productData && quantity > productData.stock) {
      setError(`Only ${productData.stock} units available in stock`);
      return false;
    }
    if (!price || price <= 0) {
      setError("Please enter a valid price");
      return false;
    }
    return true;
  };

  const createOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await API.post("/sales-orders", {
        customer,
        products: [
          {
            product,
            quantity: parseInt(quantity),
            price: parseFloat(price),
          },
        ],
      });
      navigate("/sales-orders");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Failed to create order. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Create Sales Order</h1>
        <p>Fill in the details below to create a new sales order</p>
      </div>

      <div className="order-content">
        <form className="order-form" onSubmit={createOrder}>
          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Customer Selection */}
          <div className="form-group">
            <label htmlFor="customer">
              <span className="label-icon">👤</span> Customer
              <span className="required">*</span>
            </label>
            <select
              id="customer"
              value={customer}
              onChange={handleCustomerChange}
              required
              disabled={loading}
              className="form-input"
            >
              <option value="">-- Select a Customer --</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Selection */}
          <div className="form-group">
            <label htmlFor="product">
              <span className="label-icon">📦</span> Product
              <span className="required">*</span>
            </label>
            <select
              id="product"
              value={product}
              onChange={handleProductChange}
              required
              disabled={loading}
              className="form-input"
            >
              <option value="">-- Select a Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.stock})
                </option>
              ))}
            </select>
            {productData && (
              <div className="product-info">
                <span>Price: ₹{productData.price?.toFixed(2)}</span>
                <span>Stock: {productData.stock} units</span>
              </div>
            )}
          </div>

          {/* Quantity Input */}
          <div className="form-group">
            <label htmlFor="quantity">
              <span className="label-icon">📊</span> Quantity
              <span className="required">*</span>
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={productData?.stock || 999}
              value={quantity}
              onChange={handleQuantityChange}
              required
              disabled={loading}
              className="form-input"
              placeholder="Enter quantity"
            />
          </div>

          {/* Price Input */}
          <div className="form-group">
            <label htmlFor="price">
              <span className="label-icon">💰</span> Price per Unit
              <span className="required">*</span>
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              disabled={loading}
              className="form-input"
              placeholder="Enter price per unit"
            />
          </div>

          {/* Order Summary */}
          {product && quantity && price && (
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Unit Price:</span>
                <span>₹{parseFloat(price).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? "Creating..." : "Create Order"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/sales-orders")}
              disabled={loading}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
