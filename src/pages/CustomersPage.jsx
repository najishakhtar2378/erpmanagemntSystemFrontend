import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import ResponsiveTable from "../components/ResponsiveTable";
import SearchFilterPanel from "../components/SearchFilterPanel";
import "./Customers.css";

export default function CustomersPage() {
  const storedUser = localStorage.getItem("user");
  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await API.get("/customers");
    setCustomers(res.data);
  };

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        searchTerm === "" ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);

      return matchesSearch;
    });
  }, [searchTerm, customers]);

  // Filter options for search panel
  const filterOptions = [];

  return (
    <div className="customer-container">
      <h2>Customers</h2>

      {/* Search and Filter Panel */}
      <SearchFilterPanel
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        searchPlaceholder="Search customers by name, email, or phone..."
        showResetBtn={true}
      />

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <p className="no-customers">No customers found</p>
      ) : (
        <ResponsiveTable
          data={filteredCustomers}
          headers={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            ...(user?.role === "admin"
              ? [
                  {
                    key: "actions",
                    label: "Actions",
                    render: (value, row) => (
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(row._id)}
                      >
                        Delete
                      </button>
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
