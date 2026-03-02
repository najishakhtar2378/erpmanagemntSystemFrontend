import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import Invoice from "../components/Invoice";
import PaymentModal from "../components/PaymentModal";
import ResponsiveTable from "../components/ResponsiveTable";
import SearchFilterPanel from "../components/SearchFilterPanel";
import "./orderList.css";

export default function OrderListPage() {
  const storedUser = localStorage.getItem("user");
  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paidOrder, setPaidOrder] = useState(null);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await API.put(`/sales-orders/${id}/cancel`);
      alert("Order cancelled successfully!");
      // Refresh entire list to ensure consistency
      await fetchOrders();
    } catch (error) {
      alert("Failed to cancel order: " + error.response?.data?.message);
      console.log(error);
    }
  };

  const handleConfirmPayment = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // Update order with payment information
      const response = await API.put(`/sales-orders/${selectedOrder._id}/confirm-payment`, {
        paymentMethod: paymentData.method,
        paymentAmount: selectedOrder.totalAmount,
        paymentDetails: paymentData.paymentDetails,
      });
      // Get updated order with payment details
      const updatedOrder = response.data.order;
      setPaidOrder(updatedOrder);
      setShowPaymentModal(false);
      setShowInvoice(true);
      fetchOrders(); // Refresh list
    } catch (error) {
      alert("❌ Payment failed: " + (error.response?.data?.message || error.message));
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/sales-orders");
      // console.log("ORDERS:", res.data);  
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Exclude cancelled orders from display
      if (order.status === "Cancelled") return false;

      const matchesSearch =
        searchTerm === "" ||
        order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !filters.status || order.status === filters.status;
      const matchesPayment =
        !filters.paymentStatus ||
        (order.paymentStatus === filters.paymentStatus);

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [searchTerm, filters, orders]);

  // Filter options
  const filterOptions = [
    {
      key: "status",
      label: "Order Status",
      type: "select",
      options: [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      options: [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Failed", label: "Failed" },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px" }} className="orders-page">
      <h2>Sales Orders</h2>

      {/* Search and Filter Panel */}
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search by customer name or order ID..."
        showResetBtn={true}
      />

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <p className="empty-text">No orders found</p>
      ) : (
        <ResponsiveTable
          data={filteredOrders}
          headers={[
            {
              key: "customer",
              label: "Customer",
              render: (value, row) => row.customer?.name,
            },
            { key: "totalAmount", label: "Total ($)", render: (val) => `₹ ${val}` },
            {
              key: "status",
              label: "Order Status",
              render: (status) => (
                <span className={`status ${status?.toLowerCase()}`}>
                  {status}
                </span>
              ),
            },
            {
              key: "paymentStatus",
              label: "Payment Status",
              render: (paymentStatus) => (
                <span
                  className={`payment-status ${(
                    paymentStatus || "Pending"
                  ).toLowerCase()}`}
                >
                  {paymentStatus || "Pending"}
                </span>
              ),
            },
            ...(user?.role === "admin" || user?.role === "manager"
              ? [
                  {
                    key: "actions",
                    label: "Actions",
                    render: (value, row) => (
                      <div className="action-buttons-order">
                        {row.paymentStatus !== "Completed" &&
                          row.status !== "Cancelled" && (
                            <button
                              className="confirm-payment-btn"
                              onClick={() => handleConfirmPayment(row)}
                              title="Confirm payment for this order"
                            >
                              💳 Pay
                            </button>
                          )}
                        {row.status === "Pending" && user?.role === "admin" && (
                          <button
                            className="cancel-btn"
                            onClick={() => handleCancel(row._id)}
                          >
                            Cancel
                          </button>
                        )}
                        {row.status === "Cancelled" && (
                          <span style={{ color: "#999" }}>Cancelled</span>
                        )}
                      </div>
                    ),
                  },
                ]
              : []),
          ]}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <PaymentModal
          order={selectedOrder}
          onConfirm={handlePaymentSuccess}
          onCancel={() => {
            setShowPaymentModal(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {/* Invoice Modal */}
      {showInvoice && paidOrder && (
        <Invoice
          order={paidOrder}
          onClose={() => {
            setShowInvoice(false);
            setPaidOrder(null);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}
