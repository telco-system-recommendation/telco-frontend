import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

import Logo from "../../assets/logo.png";
import "../../styles/receipt.css";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    if (!data) {
      navigate("/dashboard");
    }
  }, [data, navigate]);

  if (!data) return null;

  const {
    orderId,
    transactionTime,
    items,
    subtotal,
    taxAmount,
    total,
    paymentMethod,
    customer,
  } = data;

  const formatCurrency = (value) =>
    `Rp ${value.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;

  const formatDateTime = (isoString) =>
    new Date(isoString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const paymentMethodLabel =
    {
      card: "Kartu Kredit/Debit",
      ewallet: "E-Wallet",
      bank: "Transfer Bank",
    }[paymentMethod] || paymentMethod;

  return (
    <div className="page page-receipt">
      <div className="receipt-page">
        <div className="receipt-container">
          <div className="receipt-card">
            {/*  HEADER UNTUK PRINT (LOGO + BRAND)  */}
            <div className="receipt-print-header">
              <img
                src={Logo}
                alt="Telcoreco"
                className="receipt-print-logo"
              />
              <span className="receipt-print-brand">Telcoreco</span>
            </div>

            {/*  HEADER STATUS PEMBAYARAN  */}
            <div className="receipt-header">
              <div className="receipt-icon">
                <FiCheckCircle />
              </div>
              <h1 className="receipt-title">Pembayaran Berhasil</h1>
              <p className="receipt-subtitle">
                Terima kasih, transaksi Anda telah diproses.
              </p>
            </div>

            <div className="receipt-info">
              <div className="receipt-info-row">
                <span className="receipt-label">ID Transaksi</span>
                <span className="receipt-value">{orderId}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Waktu Transaksi</span>
                <span className="receipt-value">
                  {formatDateTime(transactionTime)}
                </span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Metode Pembayaran</span>
                <span className="receipt-value">{paymentMethodLabel}</span>
              </div>
            </div>

            <div className="receipt-section">
              <h2 className="receipt-section-title">Detail Pelanggan</h2>
              <div className="receipt-info">
                <div className="receipt-info-row">
                  <span className="receipt-label">Nama</span>
                  <span className="receipt-value">{customer?.name}</span>
                </div>
                <div className="receipt-info-row">
                  <span className="receipt-label">Email</span>
                  <span className="receipt-value">{customer?.email}</span>
                </div>
                <div className="receipt-info-row">
                  <span className="receipt-label">No. HP</span>
                  <span className="receipt-value">{customer?.phone}</span>
                </div>
                <div className="receipt-info-row">
                  <span className="receipt-label">Kabupaten/Kota</span>
                  <span className="receipt-value">{customer?.city}</span>
                </div>
                <div className="receipt-info-row">
                  <span className="receipt-label">Alamat</span>
                  <span className="receipt-value">{customer?.address}</span>
                </div>
              </div>
            </div>

            <div className="receipt-section">
              <h2 className="receipt-section-title">Ringkasan Pesanan</h2>

              <div className="receipt-items">
                {items.map((item) => (
                  <div key={item.product_id} className="receipt-item-row">
                    <div>
                      <div className="receipt-item-name">{item.name}</div>
                      <div className="receipt-item-meta">
                        {item.quantity}x @ {formatCurrency(item.price)}
                      </div>
                    </div>
                    <div className="receipt-item-total">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="receipt-summary">
                <div className="receipt-summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="receipt-summary-row">
                  <span>Pajak (11%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="receipt-summary-row receipt-summary-total">
                  <span>Total Pembayaran</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="receipt-footer">
              <button
                type="button"
                className="receipt-button-secondary"
                onClick={() => navigate("/dashboard")}
              >
                Kembali ke Dashboard
              </button>
              <button
                type="button"
                className="receipt-button-primary"
                onClick={() => {
                  window.scrollTo(0, 0);
                  window.print();
                }}
              >
                Cetak / Simpan Struk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
