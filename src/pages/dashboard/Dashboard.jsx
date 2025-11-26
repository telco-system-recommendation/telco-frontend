import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { getSession, logout, clearSession } from "../../services/authApi";
import { getProfile } from "../../services/profilesApi";
import {
  getProductsByCategory,
  getProductsByIds,
} from "../../services/productApi";
import {
  getUserTransactions,
  getAllTransactions,
} from "../../services/transactionApi";
import { useCart } from "../../context/CartContext";

import "../../styles/dashboard.css";

// mapping dari preferensi di profil -> kategori di tabel product
const PREFERENCE_TO_CATEGORY = {
  "Pulsa & Nelpon": "pulsa",
  "Kuota Data": "data",
  "Streaming Subscription": "streaming",
  Roaming: "roaming",
};

// hitung produk populer dari daftar semua transaksi
const buildPopularProducts = (trxList) => {
  const map = {};

  (trxList || []).forEach((t) => {
    if (!t.product_id) return;

    const key = t.product_id;

    if (!map[key]) {
      map[key] = {
        product_id: key,
        name: t.product_name,
        totalRevenue: 0,
        count: 0,
      };
    }

    map[key].count += 1;
    map[key].totalRevenue += Number(t.price || 0);
  });

  return Object.values(map)
    .sort((a, b) => b.count - a.count || b.totalRevenue - a.totalRevenue)
    .slice(0, 4);
};

const Dashboard = () => {
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const session = getSession();
  const user = session?.user;

  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalPengeluaran = transactions
    .filter((t) => t.status === "success")
    .reduce((sum, t) => sum + Number(t.price || 0), 0);

  const handleLogout = async () => {
    try {
      await logout(session?.access_token);
    } catch (err) {
      console.error("Gagal logout:", err);
    }

    clearCart();
    clearSession();

    navigate("/");
  };

  const loadAll = async () => {
    try {
      if (!user) return;

      // ---- PROFILE ----
      const p = await getProfile(user.id);
      setProfile(p);

      // ---- REKOMENDASI BERDASARKAN PREFERENSI ----
      let productList = [];

      if (p?.preferensi_produk) {
        const categorySlug = PREFERENCE_TO_CATEGORY[p.preferensi_produk];

        if (categorySlug) {
          productList = await getProductsByCategory(categorySlug);
        }
      }

      setProducts(productList || []);

      // ---- TRANSAKSI USER + SEMUA TRANSAKSI (UNTUK POPULER) ----
      const [trxUser, trxAll] = await Promise.all([
        getUserTransactions(user.id),
        getAllTransactions(),
      ]);

      setTransactions(trxUser || []);

      // 1) hitung produk populer basic dari transaction_history
      const basePopular = buildPopularProducts(trxAll || []);

      // 2) ambil detail dari tabel product (description & price)
      const ids = basePopular.map((p) => p.product_id).filter(Boolean);
      let finalPopular = basePopular;

      if (ids.length > 0) {
        const productDetails = await getProductsByIds(ids);
        const productMap = {};

        (productDetails || []).forEach((prod) => {
          productMap[prod.product_id] = prod;
        });

        finalPopular = basePopular.map((p) => {
          const detail = productMap[p.product_id] || {};
          return {
            ...p,
            description:
              detail.description ||
              detail.product_description ||
              "Produk populer pilihan pengguna lain.",
            price: Number(detail.price || 0),
          };
        });
      }

      setPopularProducts(finalPopular);
    } catch (err) {
      console.error("Gagal memuat dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      const flagKey = `coldstart_completed_${user.id}`;
      const isColdStartDone = localStorage.getItem(flagKey) === "true";

      if (!isColdStartDone) {
        navigate("/cold-start");
        return;
      }

      await loadAll();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = (prod) => {
    addToCart({
      product_id: prod.product_id,
      name: prod.name,
      price: prod.price,
    });
    navigate("/checkout");
  };

  if (loading) return <p>Memuat dashboard...</p>;

  return (
    <div className="dashboard-page">
      {/* ===== HEADER ===== */}
      <header className="dashboard-header">
        <div className="dashboard-header-text">
          <h1>Dashboard</h1>
          <p>
            Selamat datang kembali,{" "}
            <span>{profile?.full_name || profile?.email}</span>!
          </p>
        </div>

        <button
          type="button"
          className="dashboard-logout-btn"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </header>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-top">
            <h4>Total Transaksi</h4>
          </div>
          <p className="summary-value">{transactions.length}</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <h4>Total Pengeluaran</h4>
          </div>
          <p className="summary-value">
            Rp {totalPengeluaran.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <h4>Paket Aktif</h4>
          </div>
          <p className="summary-value">Belum tersedia</p>
        </div>
      </div>

      {/* ===== MAIN 2 KOLOM ===== */}
      <div className="dashboard-main">
        {/* -------- LEFT -------- */}
        <div className="dashboard-main-left">
          {/* === UNTUK KAMU === */}
          <section className="recommend-card">
            <div className="recommend-header">
              <div className="recommend-icon">✴</div>
              <div>
                <p className="recommend-label">Untuk Kamu</p>
                <p className="recommend-subtitle">
                  Rekomendasi{" "}
                  <strong>{profile?.preferensi_produk || "-"}</strong>{" "}
                  berdasarkan preferensi Anda
                </p>
              </div>
            </div>

            {profile?.preferensi_produk && (
              <div className="preference-badge">
                Preferensi: {profile.preferensi_produk}
              </div>
            )}

            <div className="recommend-product-list">
              {products.length === 0 && (
                <p className="empty-text">Tidak ada produk yang cocok.</p>
              )}

              {products.map((prod) => (
                <div className="recommend-product-item" key={prod.product_id}>
                  <div className="recommend-product-info">
                    <h4>{prod.name}</h4>
                    <p>{prod.description}</p>
                  </div>

                  <div className="recommend-product-meta">
                    <p className="recommend-price">
                      Rp {Number(prod.price || 0).toLocaleString("id-ID")}
                    </p>
                    <button className="buy-btn" onClick={() => handleBuy(prod)}>
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === PRODUK POPULER === */}
          <section className="recommend-card popular-section">
            <h3 className="popular-title">Produk Populer</h3>
            <p className="popular-subtitle">
              Produk yang paling sering dibeli oleh pengguna.
            </p>

            <div className="recommend-product-list">
              {popularProducts.length === 0 && (
                <p className="empty-text">
                  Belum ada produk populer karena belum ada transaksi.
                </p>
              )}

              {popularProducts.map((prod) => (
                <div className="recommend-product-item" key={prod.product_id}>
                  <div className="recommend-product-info">
                    <h4>{prod.name}</h4>
                    <p>{prod.description || "-"}</p>
                  </div>

                  <div className="recommend-product-meta">
                    <p className="recommend-price">
                      Rp {Number(prod.price || 0).toLocaleString("id-ID")}
                    </p>
                    <p className="popular-meta">
                      Dibeli sebanyak {prod.count}x
                    </p>
                    <button
                      className="buy-btn"
                      onClick={() =>
                        handleBuy({
                          product_id: prod.product_id,
                          name: prod.name,
                          price: prod.price,
                        })
                      }
                    >
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === RIWAYAT TRANSAKSI === */}
          <section className="recommend-card history-section">
            {transactions.length === 0 ? (
              <p className="empty-text">Belum ada transaksi.</p>
            ) : (
              <>
                <h3 className="history-title">Riwayat Transaksi</h3>
                <p className="history-subtitle">
                  Transaksi pembelian produk terbaru
                </p>

                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Produk</th>
                      <th>Tanggal</th>
                      <th>Harga</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((trx) => (
                      <tr key={trx.id}>
                        <td>{trx.product_name}</td>
                        <td>{trx.created_at?.slice(0, 10)}</td>
                        <td>
                          Rp {Number(trx.price || 0).toLocaleString("id-ID")}
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              trx.status === "success" ? "success" : ""
                            }`}
                          >
                            {trx.status === "success" ? "Berhasil" : trx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </section>
        </div>

        {/* -------- RIGHT (aksi cepat + paket aktif dummy) -------- */}
        <div className="dashboard-main-right">
          <section className="quick-actions-card">
            <h3>Aksi Cepat</h3>
            <p className="quick-desc">Akses fitur populer dengan cepat.</p>

            <button
              className="quick-btn primary"
              onClick={() => navigate("/produk")}
            >
              Lihat Semua Produk
            </button>
            <button className="quick-btn" onClick={() => navigate("/profile")}>
              Lihat Profil
            </button>
            <button className="quick-btn" onClick={() => navigate("/promo")}>
              Promo Terbaru
            </button>

            <div className="active-package-card">
              <h3>Paket Aktif</h3>
              <p className="active-name">Paket Hemat 10GB</p>
              <p className="active-subtext">Sisa kuota: 7.2 GB</p>
              <div className="quota-bar">
                <div className="quota-bar-used" />
              </div>
              <p className="active-expired">Berlaku hingga 30 November 2025</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
