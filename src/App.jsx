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

import Dashboard from "./pages/dashboard/Dashboard";
import ProfileSetup from "./pages/profile/SetupProfile";
import ColdStart from "./pages/profile/ColdStart";
import Profile from "./pages/profile/Profile";

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
      <Navbar />

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

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
