import React from "react";
import { useCart } from "../../context/CartContext";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../styles/cart.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, totalItems, subtotal, updateQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  const taxRate = 0.11;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleCheckout = () => {
    if (items.length === 0) return;
    onClose();
    navigate("/checkout");
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      {/* panel kanan */}
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* HEADER BIRU + TOMBOL X */}
        <div className="cart-header">
          <div>
            <h3>Keranjang Belanja</h3>
            <p className="cart-subtitle">
              {totalItems > 0 ? `${totalItems} item` : "Belum ada produk"}
            </p>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Tutup keranjang"
          >
            <FiX />
          </button>
        </div>

        {/* ISI */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <FiShoppingCart className="cart-empty-icon" />
            <h4>Keranjang Kosong</h4>
            <p>Belum ada produk di keranjang. Yuk, mulai belanja!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.product_id} className="cart-item-card">
                  <div className="cart-item-thumbnail">
                    <span className="cube-icon">📦</span>
                  </div>
                  <div className="cart-item-main">
                    <div className="cart-item-top">
                      <div>
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.product_id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-qty-control">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product_id, item.quantity - 1)
                          }
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product_id, item.quantity + 1)
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER TOTAL */}
            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="cart-summary-row">
                <span>Pajak (11%)</span>
                <span>Rp {Math.round(taxAmount).toLocaleString("id-ID")}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>Rp {Math.round(total).toLocaleString("id-ID")}</span>
              </div>
              <button
                type="button"
                className="cart-checkout-btn"
                onClick={handleCheckout}
              >
                Checkout Sekarang →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
