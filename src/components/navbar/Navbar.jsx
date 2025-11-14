import { NavLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaTag, FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Telcoreco Logo" className="logo-img" />
        <div className="logo-text">
          <h1>Telcoreco</h1>
          <p>CONNECT & RECOMMEND</p>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaHome className="nav-icon" /> Home
        </NavLink>
        <NavLink to="/produk" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaBoxOpen className="nav-icon" /> Produk
        </NavLink>
        <NavLink to="/promo" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaTag className="nav-icon" /> Promo
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaShoppingCart className="nav-icon" />
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}>
          <FaSignInAlt /> Masuk
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
