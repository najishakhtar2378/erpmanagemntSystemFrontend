import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import API from "../api/api";
import ResponsiveTable from "../components/ResponsiveTable";
import SearchFilterPanel from "../components/SearchFilterPanel";
import "./product.css";

export default function ProductPage() {
  const storedUser = localStorage.getItem("user");
  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts(); // list refresh
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setSku(product.sku);
    setReorderLevel(product.reorderLevel);
    setEditingId(product._id);
  };
  const addProduct = async (e) => {
    e.preventDefault();
    if (editingId) {
      // UPDATE
      await API.put(`/products/${editingId}`, {
        name,
        sku,
        price,
        stock,
        reorderLevel,
      });
    } else {
      // CREATE
      await API.post("/products", {
        name,
        sku,
        price,
        stock,
        reorderLevel,
      });
    }

    setName("");
    setPrice("");
    setStock("");
    setSku("");
    setReorderLevel("");
    setEditingId(null);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get stock status
  const getStockStatus = (stock, reorderLevel) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= reorderLevel) return "Low Stock";
    return "In Stock";
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const stockStatus = getStockStatus(product.stock, product.reorderLevel);
      const matchesStatus =
        !filters.status || stockStatus === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filters, products]);

  // Filter options for search panel
  const filterOptions = [
    {
      key: "status",
      label: "Stock Status",
      type: "select",
      options: [
        { value: "In Stock", label: "In Stock" },
        { value: "Low Stock", label: "Low Stock" },
        { value: "Out of Stock", label: "Out of Stock" },
      ],
    },
  ];

  return (
    <div className="product-container">
      <h2 style={{ color: "blue" }}>Products</h2>
      <p style={{ color: "rgb(2, 117, 33)", marginBottom: "20px" }}>
        Manage your products and inventory
      </p>

      {/* Add Product */}
      <form className="product-form" onSubmit={addProduct}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Reorder Level"
          value={reorderLevel}
          onChange={(e) => setReorderLevel(e.target.value)}
          required
        />

        {/* <button>Add Product</button> */}
        <button className="add-btn">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Search and Filter Panel */}
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search products by name or SKU..."
        showResetBtn={true}
      />

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>No products found</p>
      ) : (
        <ResponsiveTable
          data={filteredProducts}
          headers={[
            { key: "name", label: "Name" },
            { key: "price", label: "Price ₹" },
            { key: "stock", label: "Stock" },
            {
              key: "status",
              label: "Status",
              render: (value, row) => {
                const status = getStockStatus(row.stock, row.reorderLevel);
                const statusClass = status
                  .toLowerCase()
                  .replace(" ", "-");
                return (
                  <span className={`status-badge status-${statusClass}`}>
                    {status}
                  </span>
                );
              },
            },
            ...(user?.role === "admin"
              ? [
                  {
                    key: "actions",
                    label: "Actions",
                    render: (value, row) => (
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(row)}
                        >
                          <FaEdit style={{ marginRight: "5px" }} />
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(row._id)}
                        >
                          <FaTrash style={{ marginRight: "5px" }} />
                          Delete
                        </button>
                      </div>
                    ),
                  },
                ]
              : []),
          ]}
        />
      )}
    </div>
  );
}
