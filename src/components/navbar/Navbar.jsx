import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiTag,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { getSession } from "../../services/authApi";
import { subscribeSession } from "../../services/sessionListener";
import "../../styles/navbar.css";
import logo from "../../assets/logo.png";

// cart
import { useCart } from "../../context/CartContext";
import CartSidebar from "../cart/CartSidebar";

const Navbar = () => {
  const [session, setSession] = useState(() => getSession());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setSession(getSession());

    const unsubscribe = subscribeSession((newSession) => {
      setSession(newSession);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isLoggedIn = !!session;

  // MENU BELUM LOGIN
  const GuestMenu = () => (
    <>
      <NavLink to="/" className="nav-item" onClick={closeMobileMenu}>
        <FiHome className="nav-icon" />
        Home
      </NavLink>

      <NavLink to="/produk" className="nav-item" onClick={closeMobileMenu}>
        <FiBox className="nav-icon" />
        Produk
      </NavLink>

      <NavLink to="/promo" className="nav-item" onClick={closeMobileMenu}>
        <FiTag className="nav-icon" />
        Promo
      </NavLink>

      <Link to="/login" className="nav-btn" onClick={closeMobileMenu}>
        Masuk
      </Link>
    </>
  );

  // MENU SUDAH LOGIN 
  const AuthMenu = () => (
    <>
      <NavLink to="/dashboard" className="nav-item" onClick={closeMobileMenu}>
        <FiHome className="nav-icon" />
        Dashboard
      </NavLink>

      <NavLink to="/produk" className="nav-item" onClick={closeMobileMenu}>
        <FiBox className="nav-icon" />
        Produk
      </NavLink>

      <NavLink to="/promo" className="nav-item" onClick={closeMobileMenu}>
        <FiTag className="nav-icon" />
        Promo
      </NavLink>

      <NavLink to="/profile" className="nav-item" onClick={closeMobileMenu}>
        <FiUser className="nav-icon" />
        Profil
      </NavLink>
    </>
  );

  return (
    <>
      <nav className={`navbar ${isMobileMenuOpen ? "navbar-mobile-open" : ""}`}>
        {/* LOGO */}
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo-img" />
          <div className="logo-text">
            <h1>Telcoreco</h1>
            <p>CONNECT & RECOMMEND</p>
          </div>
        </div>

        {/* KANAN: MENU + ICONS */}
        <div className="nav-right">
          {/* MENU LINKS */}
          <div
            className={`nav-links ${isMobileMenuOpen ? "nav-links-open" : ""}`}
          >
            {!isLoggedIn && <GuestMenu />}
            {isLoggedIn && <AuthMenu />}
          </div>

          {/* ICONS KANAN (KERANJANG + HAMBURGER) */}
          <div className="nav-icons-right">
            {/* Icon keranjang (sidebar) */}
            <button
              type="button"
              className="nav-cart-btn"
              onClick={handleOpenCart}
              aria-label="Buka keranjang"
            >
              <FiShoppingCart className="nav-icon" />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>

            {/* Hamburger) */}
            <button
              type="button"
              className="nav-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* SIDEBAR KERANJANG */}
      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default Navbar;
