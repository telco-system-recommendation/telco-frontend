import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPhone, FiUser, FiMail, FiMapPin } from "react-icons/fi";
import "../../styles/checkout.css";
import { createTransaction } from "../../services/transactionApi";
import { getSession } from "../../services/authApi";

const Checkout = () => {
  const { items, subtotal, clearCart, totalItems } = useCart();
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

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardDetail, setCardDetail] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const [ewalletDetail, setEwalletDetail] = useState({
    provider: "",
    phone: "",
  });

  const [bankDetail, setBankDetail] = useState({
    bank: "",
    accountName: "",
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

  // VALIDASI PEMBAYARAN
  const validatePaymentDetails = () => {
    if (paymentMethod === "card") {
      if (
        !cardDetail.number ||
        !cardDetail.holder ||
        !cardDetail.expiry ||
        !cardDetail.cvv
      ) {
        alert("Lengkapi detail kartu terlebih dahulu.");
        return false;
      }
    }

    if (paymentMethod === "ewallet") {
      if (!ewalletDetail.provider) {
        alert("Pilih e-wallet terlebih dahulu.");
        return false;
      }
    }

    if (paymentMethod === "bank") {
      if (!bankDetail.bank) {
        alert("Pilih bank tujuan transfer terlebih dahulu.");
        return false;
      }
    }

    return true;
  };

  // BAYAR SEKARANG

  const handlePayNow = async (e) => {
    e.preventDefault();

    if (!validatePaymentDetails()) return;

    try {
      const session = getSession();
      if (!session || !session.user || !session.user.id) {
        navigate("/login");
        return;
      }

      const user = session.user;
      const orderId = `TRX-${Date.now()}`;
      const transactionTime = new Date().toISOString();

      // SIMPAN TRANSAKSI
      await Promise.all(
        items.map((item) =>
          createTransaction({
            product_id: item.product_id,
            product_name: item.name,
            price: item.price * item.quantity,
            status: "success",
            user_id: user.id,
            created_at: transactionTime,

            full_name: contact.name,
            phone: contact.phone,
            email: contact.email,

            address: {
              address: shipping.address,
              city: shipping.city,
              postal_code: shipping.postalCode,
            },

            data_quota_gb: item.data_quota_gb || null,
          })
        )
      );

      const customer = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        city: shipping.city,
        address: shipping.address,
      };

      // Kosongkan keranjang
      clearCart();

      // Pindah ke halaman struk
      navigate("/receipt", {
        state: {
          orderId,
          transactionTime,
          items,
          subtotal,
          taxAmount,
          total,
          paymentMethod,
          customer,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.");
    }
  };

  // RENDER FORM SESUAI METODE BAYAR

  const renderPaymentDetails = () => {
    if (paymentMethod === "card") {
      return (
        <div className="page page-checkout">
          <div className="checkout-card nested">
            <h3>Detail Kartu</h3>

            <div className="form-group">
              <label>Nomor Kartu *</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetail.number}
                onChange={(e) =>
                  setCardDetail({ ...cardDetail, number: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Nama Pemegang Kartu *</label>
              <input
                type="text"
                placeholder="NAMA SESUAI KARTU"
                value={cardDetail.holder}
                onChange={(e) =>
                  setCardDetail({ ...cardDetail, holder: e.target.value })
                }
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Tanggal Kadaluarsa *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetail.expiry}
                  onChange={(e) =>
                    setCardDetail({ ...cardDetail, expiry: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>CVV *</label>
                <input
                  type="password"
                  placeholder="123"
                  value={cardDetail.cvv}
                  onChange={(e) =>
                    setCardDetail({ ...cardDetail, cvv: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (paymentMethod === "ewallet") {
      return (
        <div className="page page-checkout">
          <div className="checkout-card nested">
            <h3>Pilih E-Wallet</h3>

            <div className="form-group">
              <label>Pilih e-wallet *</label>
              <select
                value={ewalletDetail.provider}
                onChange={(e) =>
                  setEwalletDetail({
                    ...ewalletDetail,
                    provider: e.target.value,
                  })
                }
              >
                <option value="">Pilih e-wallet</option>
                <option value="GoPay">GoPay</option>
                <option value="OVO">OVO</option>
                <option value="DANA">DANA</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="LinkAja">LinkAja</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nomor E-Wallet (opsional)</label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                value={ewalletDetail.phone}
                onChange={(e) =>
                  setEwalletDetail({ ...ewalletDetail, phone: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="page page-checkout">
        <div className="checkout-card nested">
          <h3>Pilih Bank</h3>

          <div className="form-group">
            <label>Pilih bank tujuan transfer *</label>
            <select
              value={bankDetail.bank}
              onChange={(e) =>
                setBankDetail({ ...bankDetail, bank: e.target.value })
              }
            >
              <option value="">Pilih bank tujuan transfer</option>
              <option value="BCA">BCA</option>
              <option value="Mandiri">Mandiri</option>
              <option value="BNI">BNI</option>
              <option value="BRI">BRI</option>
              <option value="CIMB Niaga">CIMB Niaga</option>
              <option value="Permata Bank">Permata Bank</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nama pemilik rekening (opsional)</label>
            <input
              type="text"
              placeholder="Nama pemilik rekening"
              value={bankDetail.accountName}
              onChange={(e) =>
                setBankDetail({ ...bankDetail, accountName: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    );
  };

  // UI

  return (
    <div className="page page-checkout">
      <div className="checkout-page">
        <button className="checkout-back-btn" onClick={handleBackClick}>
          <FiArrowLeft />
          <span>Kembali</span>
        </button>

        <h1 className="checkout-title">Checkout</h1>
        <p className="checkout-subtitle">
          Lengkapi informasi untuk menyelesaikan pembelian
        </p>

        <div className="checkout-steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Informasi Kontak</span>
          </div>
          <div className={`step ${step === 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">Pembayaran</span>
          </div>
        </div>

        <div className="checkout-layout">
          <main className="checkout-main">
            {step === 1 && (
              <form onSubmit={handleNextToPayment}>
                <section className="checkout-card">
                  <h3>Informasi Kontak</h3>

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

                  <div className="form-group">
                    <label>Nomor Telepon *</label>
                    <div className="input-icon-wrapper">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={contact.phone}
                        onChange={(e) =>
                          setContact({ ...contact, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <div className="input-icon-wrapper">
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        placeholder="email@contoh.com"
                        value={contact.email}
                        onChange={(e) =>
                          setContact({ ...contact, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </section>

                <section className="checkout-card nested">
                  <h3>Alamat & Detail Tambahan</h3>

                  <div className="form-group">
                    <label>Alamat Lengkap</label>
                    <div className="input-icon-wrapper">
                      <FiMapPin className="input-icon" />
                      <input
                        type="text"
                        placeholder="Nama jalan, nomor rumah, kecamatan"
                        value={shipping.address}
                        onChange={(e) =>
                          setShipping({ ...shipping, address: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Kota</label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping({ ...shipping, city: e.target.value })
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
                </section>

                <div className="checkout-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleBackClick}
                  >
                    Kembali
                  </button>
                  <button type="submit" className="primary-btn">
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <section className="checkout-card">
                <h3>Metode Pembayaran</h3>
                <p className="payment-subtitle">
                  Pilih metode pembayaran yang Anda inginkan
                </p>

                <div className="payment-options">
                  <button
                    type="button"
                    className={`payment-option ${
                      paymentMethod === "card" ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="indicator" />
                    <div>
                      <div className="payment-title">Kartu Kredit/Debit</div>
                      <div className="payment-desc">Visa, Mastercard, JCB</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`payment-option ${
                      paymentMethod === "ewallet" ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod("ewallet")}
                  >
                    <div className="indicator" />
                    <div>
                      <div className="payment-title">E-Wallet</div>
                      <div className="payment-desc">
                        GoPay, OVO, Dana, ShopeePay
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`payment-option ${
                      paymentMethod === "bank" ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <div className="indicator" />
                    <div>
                      <div className="payment-title">Transfer Bank</div>
                      <div className="payment-desc">BCA, Mandiri, BNI, BRI</div>
                    </div>
                  </button>
                </div>

                {renderPaymentDetails()}

                <div className="checkout-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setStep(1)}
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={handlePayNow}
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </section>
            )}
          </main>

          <aside className="checkout-summary-card">
            <h3>Ringkasan Pesanan</h3>

            {totalItems === 0 ? (
              <p>Keranjang kosong.</p>
            ) : (
              <>
                <div className="summary-items">
                  <p className="summary-subtitle">{totalItems} Produk</p>
                  {items.map((item) => (
                    <div className="summary-item" key={item.product_id}>
                      <div>
                        <div className="summary-item-name">{item.name}</div>
                        <div className="summary-item-qty">
                          {item.quantity}x @ Rp{" "}
                          {Number(item.price).toLocaleString("id-ID")}
                        </div>
                      </div>

                      <div className="summary-item-price">
                        Rp{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>

                <div className="summary-line">
                  <span>Pajak (11%)</span>
                  <span>Rp {taxAmount.toLocaleString("id-ID")}</span>
                </div>

                <div className="summary-total">
                  <span>Total Pembayaran</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <div className="summary-benefits">
                  <ul>
                    <li>Aktivasi instan setelah pembayaran</li>
                    <li>Pembayaran aman dan terenkripsi</li>
                    <li>Dukungan pelanggan 24/7</li>
                  </ul>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
