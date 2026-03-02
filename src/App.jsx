import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdvancedAnalytics from "./analytics/AdvancedAnalytics";
import Analytics from "./analytics/Analytics";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Signup from "./auth/Signup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminDashboard from "./dashboard/AdminDashboard";
import Dashboard from "./dashboard/Dashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import StaffDashboard from "./dashboard/StaffDashboard";
import OrderListPage from "./orders/OrderListPage";
import SalesOrderPage from "./orders/SalesOrderPage";
import AboutUs from "./pages/AboutUs";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import AdminUsers from "./pages/AdminUsers";
import Bakery from "./pages/Bakery";
import Clothing from "./pages/Clothing";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import CustomersPage from "./pages/CustomersPage";
import Electronics from "./pages/Electronics";
import FoodItems from "./pages/FoodItems";
import Founder from "./pages/Founder";
import Grocery from "./pages/Grocery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Products from "./pages/Product";
import Security from "./pages/Security";
import TermsConditions from "./pages/TermsConditions";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/security" element={<Security />} />

        {/* Product Category Pages */}
        <Route path="/products/electronics" element={<Electronics />} />
        <Route path="/products/clothing" element={<Clothing />} />
        <Route path="/products/food-items" element={<FoodItems />} />
        <Route path="/products/bakery" element={<Bakery />} />
        <Route path="/products/grocery" element={<Grocery />} />

        {/* Role-Based Dashboards */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute requiredRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute requiredRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Dashboard (redirect to role-based) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected Routes */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/new"
          element={
            <ProtectedRoute>
              <CreateCustomerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales-orders"
          element={
            <ProtectedRoute>
              <OrderListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salesorder"
          element={
            <ProtectedRoute>
              <SalesOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/advanced"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <AdvancedAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Admin/Manager Routes */}
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRoles={["admin", "manager"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
