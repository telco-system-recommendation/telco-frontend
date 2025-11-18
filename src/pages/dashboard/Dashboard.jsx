// src/pages/dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getSession } from "../../services/authApi";
import { getProfile } from "../../services/profilesApi";
import { getProductsByCategory } from "../../services/productApi";
import {
  getUserTransactions,
  createTransaction,
} from "../../services/transactionApi";

import "../../styles/dashboard.css";

const Dashboard = () => {
  const session = getSession();
  const user = session?.user;

  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalPengeluaran = transactions
    .filter((t) => t.status === "success")
    .reduce((sum, t) => sum + (t.price || 0), 0);

  const loadAll = async () => {
    try {
      if (!user) return;

      const p = await getProfile(user.id);
      setProfile(p);

      const productList = await getProductsByCategory(
        p?.preferensi_produk || null
      );
      setProducts(productList);

      const trx = await getUserTransactions(user.id);
      setTransactions(trx);
    } catch (err) {
      console.error("Gagal memuat dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = async (prod) => {
    try {
      await createTransaction({
        product_id: prod.product_id,
        product_name: prod.name,
        price: prod.price,
        status: "pending",
        user_id: user.id,
        created_at: new Date().toISOString(),
      });
      await loadAll();
      alert("Transaksi berhasil dibuat (pending).");
    } catch (err) {
      alert("Gagal membuat transaksi: " + err.message);
    }
  };

  if (loading) return <p>Memuat dashboard...</p>;

  return (
    <div className="dashboard-page">
      {/* Greeting */}
      <h2 className="greeting">
        Halo, <span>{profile?.full_name || profile?.email}</span> 👋
      </h2>

      {/* Ringkasan */}
      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Transaksi</h4>
          <p>{transactions.length}</p>
        </div>

        <div className="summary-card">
          <h4>Total Pengeluaran</h4>
          <p>Rp {totalPengeluaran.toLocaleString("id-ID")}</p>
        </div>

        <div className="summary-card">
          <h4>Paket Aktif</h4>
          <p>Belum tersedia</p>
        </div>
      </div>

      {/* Rekomendasi Produk */}
      <h3 className="section-title">
        Rekomendasi untuk Anda{" "}
        {profile?.preferensi_produk && (
          <span>({profile.preferensi_produk})</span>
        )}
      </h3>

      {products.length === 0 && <p>Tidak ada produk yang cocok.</p>}

      <div className="product-list">
        {products.map((prod) => (
          <div className="product-card" key={prod.product_id}>
            <img src={prod.image} alt={prod.name} />
            <h4>{prod.name}</h4>
            <p className="price">
              Rp {prod.price ? prod.price.toLocaleString("id-ID") : 0}
            </p>
            <button className="btn-buy" onClick={() => handleBuy(prod)}>
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>

      {/* Riwayat Transaksi */}
      <h3 className="section-title">Riwayat Transaksi Terbaru</h3>

      {transactions.length === 0 && <p>Belum ada transaksi.</p>}

      <div className="transaction-list">
        {transactions.map((trx) => (
          <div className="transaction-item" key={trx.id}>
            <div>
              <strong>{trx.product_name}</strong>
              <p>Status: {trx.status}</p>
            </div>
            <p>Rp {trx.price?.toLocaleString("id-ID")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
