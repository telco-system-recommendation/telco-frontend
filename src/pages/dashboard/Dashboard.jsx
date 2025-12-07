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
import { getDashboardRecommendations } from "../../services/recommendationApi";
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
  const { addToCart, syncCartUser } = useCart();
  const navigate = useNavigate();
  const session = getSession();
  const user = session?.user;

  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [modelRecommendations, setModelRecommendations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== PAGINATION STATE =====
  const [recommendPage, setRecommendPage] = useState(1);

  const RECOMMEND_PAGE_SIZE = 5;

  const totalPengeluaran = transactions
    .filter((t) => t.status === "success")
    .reduce((sum, t) => sum + Number(t.price || 0), 0);

  const activePackage = transactions.find((t) => t.status === "success");
  const activePackageDate = activePackage?.created_at
    ? new Date(activePackage.created_at).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const totalRecommendPages = Math.max(
    1,
    Math.ceil((products?.length || 0) / RECOMMEND_PAGE_SIZE)
  );

  const visibleRecommendProducts = products.slice(
    (recommendPage - 1) * RECOMMEND_PAGE_SIZE,
    recommendPage * RECOMMEND_PAGE_SIZE
  );

  useEffect(() => {
    const maxPage = Math.max(
      1,
      Math.ceil((products?.length || 0) / RECOMMEND_PAGE_SIZE)
    );
    if (recommendPage > maxPage) {
      setRecommendPage(maxPage);
    }
  }, [products, recommendPage]);

  const handleLogout = async () => {
    try {
      await logout(session?.access_token);
    } catch (err) {
      console.error("Gagal logout:", err);
    }

    clearSession();
    syncCartUser();

    navigate("/");
  };

  const loadAll = async () => {
    try {
      if (!user) return;

      // ---- PROFILE ----
      const p = await getProfile(user.id);
      setProfile(p);

      // 1) REKOMENDASI DARI MODEL
      let modelRecs = [];
      if (p?.preferensi_produk && p.preferensi_produk !== "Semua Produk") {
        const categorySlug = PREFERENCE_TO_CATEGORY[p.preferensi_produk];
        if (categorySlug) {
          try {
            modelRecs = await getDashboardRecommendations({
              userId: user.id,
              category: categorySlug,
            });
          } catch (err) {
            console.error("Gagal mengambil rekomendasi model:", err);
          }
        }
      }
      setModelRecommendations(modelRecs || []);

      // 2) REKOMENDASI BIASA UNTUK KAMU
      let productList = [];

      if (p?.preferensi_produk) {
        if (p.preferensi_produk === "Semua Produk") {
          const allSlugs = Object.values(PREFERENCE_TO_CATEGORY);

          const results = await Promise.all(
            allSlugs.map((slug) => getProductsByCategory(slug))
          );

          const merged = results.flat().filter(Boolean);

          const mapById = {};
          merged.forEach((prod) => {
            if (!prod?.product_id) return;
            if (!mapById[prod.product_id]) {
              mapById[prod.product_id] = prod;
            }
          });

          productList = Object.values(mapById);
        } else {
          const categorySlug = PREFERENCE_TO_CATEGORY[p.preferensi_produk];

          if (categorySlug) {
            productList = await getProductsByCategory(categorySlug);
          }
        }
      }

      setProducts(productList || []);

      //  TRANSAKSI USER + SEMUA TRANSAKSI
      const [trxUser, trxAll] = await Promise.all([
        getUserTransactions(user.id),
        getAllTransactions(),
      ]);

      setTransactions(trxUser || []);

      const basePopular = buildPopularProducts(trxAll || []);

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

  if (loading) {
    return (
      <div className="page page-dashboard">
        <div className="dashboard-loading">Memuat dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page page-dashboard">
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
            <p className="summary-value">
              {activePackage
                ? activePackage.product_name || "Paket terakhir"
                : "Belum tersedia"}
            </p>
          </div>
        </div>

        {/* ===== MAIN 2 KOLOM ===== */}
        <div className="dashboard-main">
          {/* -------- LEFT -------- */}
          <div className="dashboard-main-left">
            {/* === REKOMENDASI DARI MODEL === */}
            <section className="recommend-card model-recommend-section">
              <div className="recommend-header">
                <div className="recommend-icon">🤖</div>
                <div>
                  <p className="recommend-label">Rekomendasi Model</p>
                  <p className="recommend-subtitle">
                    Hasil rekomendasi otomatis berdasarkan perilaku dan
                    preferensi Anda.
                  </p>
                </div>
              </div>

              <div className="recommend-product-list">
                {modelRecommendations.length === 0 ? (
                  <p className="empty-text">
                    Belum ada rekomendasi dari model untuk saat ini.
                  </p>
                ) : (
                  modelRecommendations.slice(0, 5).map((prod) => (
                    <div
                      className="recommend-product-item"
                      key={prod.product_id}
                    >
                      <div className="recommend-product-info">
                        <h4>{prod.name}</h4>
                        <p>{prod.description}</p>
                      </div>

                      <div className="recommend-product-meta">
                        <p className="recommend-price">
                          Rp {Number(prod.price || 0).toLocaleString("id-ID")}
                        </p>
                        <button
                          className="buy-btn"
                          onClick={() => handleBuy(prod)}
                        >
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

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

                {visibleRecommendProducts.map((prod) => (
                  <div className="recommend-product-item" key={prod.product_id}>
                    <div className="recommend-product-info">
                      <h4>{prod.name}</h4>
                      <p>{prod.description}</p>
                    </div>

                    <div className="recommend-product-meta">
                      <p className="recommend-price">
                        Rp {Number(prod.price || 0).toLocaleString("id-ID")}
                      </p>
                      <button
                        className="buy-btn"
                        onClick={() => handleBuy(prod)}
                      >
                        Beli Sekarang
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalRecommendPages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    className="pagination-btn"
                    disabled={recommendPage === 1}
                    onClick={() => setRecommendPage((p) => Math.max(1, p - 1))}
                  >
                    Sebelumnya
                  </button>

                  {Array.from({ length: totalRecommendPages }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <button
                        key={page}
                        type="button"
                        className={`pagination-page-btn ${
                          page === recommendPage ? "active" : ""
                        }`}
                        onClick={() => setRecommendPage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className="pagination-btn"
                    disabled={recommendPage === totalRecommendPages}
                    onClick={() =>
                      setRecommendPage((p) =>
                        Math.min(totalRecommendPages, p + 1)
                      )
                    }
                  >
                    Berikutnya
                  </button>
                </div>
              )}
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
                      <p>{prod.description || "-"} </p>
                      <p className="popular-meta">
                        Dibeli sebanyak <strong>{prod.count}x</strong>
                      </p>
                    </div>

                    <div className="recommend-product-meta">
                      <p className="recommend-price">
                        Rp {Number(prod.price || 0).toLocaleString("id-ID")}
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
          </div>

          {/* -------- RIGHT -------- */}
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
              <button
                className="quick-btn"
                onClick={() => navigate("/profile")}
              >
                Lihat Profil
              </button>
              <button className="quick-btn" onClick={() => navigate("/promo")}>
                Promo Terbaru
              </button>

              <button
                className="quick-btn"
                onClick={() => navigate("/history")}
              >
                Riwayat Transaksi
              </button>

              <div className="active-package-card">
                <h3>Paket Aktif</h3>
                {activePackage ? (
                  <>
                    <p className="active-name">
                      {activePackage.product_name || "Paket Terakhir"}
                    </p>
                    <p className="active-subtext">
                      Terakhir dibeli: {activePackageDate}
                    </p>
                    <div className="quota-bar">
                      <div className="quota-bar-used" />
                    </div>
                    <p className="active-expired">
                      Nominal: Rp{" "}
                      {Number(activePackage.price || 0).toLocaleString("id-ID")}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="active-name">Belum ada paket aktif</p>
                    <p className="active-subtext">
                      Paket aktif akan muncul setelah transaksi berhasil.
                    </p>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
