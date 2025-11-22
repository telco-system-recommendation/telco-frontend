import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPhone, FiUser, FiMail, FiMapPin } from "react-icons/fi";
import "../../styles/checkout.css";
import { createTransaction } from "../../services/transactionApi";
import { getSession } from "../../services/authApi";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const taxRate = 0.11;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [shipping, setShipping] = useState({
    address: "",
    city: "Jakarta",
    postalCode: "",
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone || !contact.email) {
      alert("Lengkapi informasi kontak terlebih dahulu.");
      return;
    }
    setStep(2);
  };

  const handlePayNow = async () => {
    if (items.length === 0) return;

    try {
      const session = getSession();
      const user = session?.user;
      if (!user) {
        alert("Session berakhir. Silakan login ulang.");
        navigate("/login");
        return;
      }

      // Simpan transaksi ke Supabase sebagai contoh (satu transaksi per produk)
      for (const item of items) {
        await createTransaction({
          product_id: item.product_id,
          product_name: item.name,
          price: item.price * item.quantity,
          status: "success",
          user_id: user.id,
          created_at: new Date().toISOString(),
        });
      }

      clearCart();
      alert("Pembayaran berhasil (dummy). Terima kasih!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  return (
    <div className="checkout-page">
      <button className="checkout-back-btn" onClick={handleBackClick}>
        <FiArrowLeft />
        <span>Kembali</span>
      </button>

      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-subtitle">
        Lengkapi informasi untuk menyelesaikan pembelian
      </p>

      {/* Step indicator */}
      <div className="checkout-steps">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          <span className="step-number">1</span>
          <span>Informasi Kontak</span>
        </div>
        <div className="step-separator">›</div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          <span className="step-number">2</span>
          <span>Pembayaran</span>
        </div>
      </div>

      <div className="checkout-layout">
        {/* KIRI: FORM */}
        <div className="checkout-main">
          {step === 1 && (
            <form className="checkout-card" onSubmit={handleNextToPayment}>
              <h3>Informasi Kontak</h3>
              <p className="section-subtitle">
                Nomor telepon ini akan digunakan untuk aktivasi paket
              </p>

              {/* Nama */}
              <div className="form-group">
                <label>Nama Lengkap *</label>
                <div className="input-icon-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Telepon */}
              <div className="form-group">
                <label>Nomor Telepon *</label>
                <div className="input-icon-wrapper">
                  <FiPhone className="input-icon" />
                  <input
                    type="text"
                    placeholder="08xx xxxx xxxx"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                  />
                </div>
                <p className="field-hint">
                  Paket akan diaktifkan ke nomor ini
                </p>
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email *</label>
                <div className="input-icon-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Informasi Pengiriman */}
              <div className="checkout-card nested">
                <h4>Informasi Pengiriman</h4>
                <p className="section-subtitle">
                  Opsional - untuk pengiriman kartu SIM fisik
                </p>

                <div className="form-group">
                  <label>Alamat Lengkap</label>
                  <div className="input-icon-wrapper">
                    <FiMapPin className="input-icon" />
                    <input
                      type="text"
                      placeholder="Jl. Contoh No. 123"
                      value={shipping.address}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kota</label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Kode Pos</label>
                    <input
                      type="text"
                      placeholder="12345"
                      value={shipping.postalCode}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          postalCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-actions">
                <button type="submit" className="btn-primary">
                  Lanjut ke Pembayaran
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="checkout-card">
              <h3>Metode Pembayaran</h3>
              <p className="section-subtitle">
                Pilih metode pembayaran yang Anda inginkan
              </p>

              <div className="payment-options">
                <div className="payment-option selected">
                  <div className="indicator" />
                  <div>
                    <p className="payment-title">Kartu Kredit/Debit</p>
                    <p className="payment-desc">Visa, Mastercard, JCB</p>
                  </div>
                </div>

                <div className="payment-option">
                  <div className="indicator" />
                  <div>
                    <p className="payment-title">E-Wallet</p>
                    <p className="payment-desc">
                      GoPay, OVO, Dana, ShopeePay
                    </p>
                  </div>
                </div>

                <div className="payment-option">
                  <div className="indicator" />
                  <div>
                    <p className="payment-title">Transfer Bank</p>
                    <p className="payment-desc">
                      BCA, Mandiri, BNI, BRI
                    </p>
                  </div>
                </div>
              </div>

              <div className="checkout-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Kembali
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handlePayNow}
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          )}
        </div>

        {/* KANAN: RINGKASAN PESANAN */}
        <aside className="checkout-summary-card">
          <h3>Ringkasan Pesanan</h3>
          <p className="summary-subtitle">
            {items.length} Produk
          </p>

          <div className="summary-items">
            {items.map((item) => (
              <div key={item.product_id} className="summary-item">
                <div>
                  <p className="summary-item-name">{item.name}</p>
                  <p className="summary-item-meta">
                    {item.quantity}x @ Rp{" "}
                    {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <p className="summary-item-total">
                  Rp{" "}
                  {(item.quantity * item.price).toLocaleString(
                    "id-ID"
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="summary-row">
            <span>Pajak (11%)</span>
            <span>
              Rp {Math.round(taxAmount).toLocaleString("id-ID")}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total Pembayaran</span>
            <span className="summary-total-amount">
              Rp {Math.round(total).toLocaleString("id-ID")}
            </span>
          </div>

          {step === 1 && (
            <div className="summary-benefits">
              <ul>
                <li>Aktivasi instan setelah pembayaran</li>
                <li>Pembayaran aman dan terenkripsi</li>
                <li>Dukungan pelanggan 24/7</li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
