// src/components/navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiHome, FiBox, FiTag, FiUser, FiShoppingCart } from "react-icons/fi";

import { getSession } from "../../services/authApi";
import { subscribeSession } from "../../services/sessionListener";
import "../../styles/navbar.css";
import logo from "../../assets/logo.png";

// cart
import { useCart } from "../../context/CartContext";
import CartSidebar from "../cart/CartSidebar";

const Navbar = () => {
  
  const [session, setSession] = useState(() => getSession());

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

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo-img" />
          <div className="logo-text">
            <h1>Telcoreco</h1>
            <p>CONNECT & RECOMMEND</p>
          </div>
        </div>

        {/* MENU */}
        <div className="nav-links">
          {/* ======= BELUM LOGIN ======= */}
          {!session && (
            <>
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>

              <NavLink to="/produk" className="nav-item">
                Produk
              </NavLink>

              <NavLink to="/promo" className="nav-item">
                Promo
              </NavLink>

              {/* Icon keranjang (sidebar) */}
              <button
                type="button"
                className="nav-cart-btn"
                onClick={handleOpenCart}
              >
                <FiShoppingCart className="nav-icon" />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>

              <Link to="/login" className="nav-btn">
                Masuk
              </Link>
            </>
          )}

          {/* ======= SUDAH LOGIN ======= */}
          {session && (
            <>
              <NavLink to="/dashboard" className="nav-item">
                <FiHome className="nav-icon" /> Dashboard
              </NavLink>

              <NavLink to="/produk" className="nav-item">
                <FiBox className="nav-icon" /> Produk
              </NavLink>

              <NavLink to="/promo" className="nav-item">
                <FiTag className="nav-icon" /> Promo
              </NavLink>

              <NavLink to="/profile" className="nav-item">
                <FiUser className="nav-icon" /> Profil
              </NavLink>

              {/* Icon keranjang (sidebar) */}
              <button
                type="button"
                className="nav-cart-btn"
                onClick={handleOpenCart}
              >
                <FiShoppingCart className="nav-icon" />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>
              
            </>
          )}
        </div>
      </nav>

      {/* SIDEBAR KERANJANG */}
      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default Navbar;
