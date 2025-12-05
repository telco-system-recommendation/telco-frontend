import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponen global
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Checkout from "./pages/checkout/Checkout";
import "./styles/cart.css";
import "./styles/checkout.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Product from "./pages/product/Product";
import Promo from "./pages/promo/Promo";
import ResetPassword from "./pages/reset-password/ResetPassword";
import History from "./pages/history/History";
import Dashboard from "./pages/dashboard/Dashboard";
import ProfileSetup from "./pages/profile/SetupProfile";
import ColdStart from "./pages/profile/ColdStart";
import Profile from "./pages/profile/Profile";
import Receipt from "./pages/receipt/Receipt";
import ComplaintsCenter from "./pages/complaints/ComplaintsCenter";
import ResetPasswordConfirm from "./pages/reset-password/ResetPasswordConfirm";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// CSS Global
import "./styles/_variables.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/footer.css";
import "./styles/login.css";
import "./styles/index.css";
import "./styles/signup.css";
import "./styles/dashboard.css";
import "./styles/profile.css";

function App() {
  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <main className="page-wrapper">
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/produk" element={<Product />} />
            <Route path="/promo" element={<Promo />} />

            {/* AFTER LOGIN — PROTECTED ROUTES */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/setup-profile"
              element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cold-start"
              element={
                <ProtectedRoute>
                  <ColdStart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/receipt"
              element={
                <ProtectedRoute>
                  <Receipt />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints"
              element={
                <ProtectedRoute>
                  <ComplaintsCenter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reset-password-confirm"
              element={<ResetPasswordConfirm />}
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
