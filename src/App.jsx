import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponen global
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Halaman lama
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Product from "./pages/product/Product";
import Promo from "./pages/promo/Promo";

// Halaman baru (setelah login)
import Dashboard from "./pages/dashboard/Dashboard";
import ProfileSetup from "./pages/profile/SetupProfile";
// import Profile from "./pages/profile/Profile";

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
import "./styles/dashboard.css"; // tambahan
// import "./styles/profile.css"; // nanti dibuat

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

        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
