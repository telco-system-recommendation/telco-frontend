import React, { useEffect, useState } from "react";
import { getSession } from "../../services/authApi";
import { getProfile } from "../../services/profilesApi";
import { getProductsByCategory } from "../../services/productApi";
import {
  getUserTransactions,
  getAllTransactions,   // 🔥 tambah ini
  createTransaction,   // (kalau ga dipakai boleh dihapus)
} from "../../services/transactionApi";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "../../styles/dashboard.css";

// mapping dari preferensi di profil -> kategori di tabel product
const PREFERENCE_TO_CATEGORY = {
  "Pulsa & Nelpon": "pulsa",
  "Kuota Data": "data",
  "Streaming Subscription": "streaming",
  Roaming: "roaming",
};

const Dashboard = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const session = getSession();
  const user = session?.user;

  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState([]);

  const totalPengeluaran = transactions
    .filter((t) => t.status === "success")
    .reduce((sum, t) => sum + Number(t.price || 0), 0);

  // Bangun daftar produk populer dari riwayat transaksi
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
    .sort(
      (a, b) =>
        b.count - a.count || b.totalRevenue - a.totalRevenue
    )
    .slice(0, 4);
};


  const loadAll = async () => {
  try {
    if (!user) return;

    const p = await getProfile(user.id);
    setProfile(p);

    // --- rekomendasi produk berdasar preferensi user ---
    let productList = [];

    if (p?.preferensi_produk) {
      const categorySlug = PREFERENCE_TO_CATEGORY[p.preferensi_produk];

      if (categorySlug) {
        productList = await getProductsByCategory(categorySlug);
      } else {
        productList = [];
      }
    } else {
      productList = [];
    }

    setProducts(productList || []);

    // 🔥 AMBIL DUA JENIS TRANSAKSI SEKALIGUS:
    // - trxUser: riwayat untuk user ini (buat "Riwayat" & total pengeluaran)
    // - trxAll : semua transaksi (buat produk populer)
    const [trxUser, trxAll] = await Promise.all([
      getUserTransactions(user.id),
      getAllTransactions(),
    ]);

    setTransactions(trxUser || []);                 // ini tetap user sendiri
    setPopularProducts(buildPopularProducts(trxAll || [])); // ini semua user
  } catch (err) {
    console.error("Gagal memuat dashboard:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const init = async () => {
      if (!user) return;

      // cek di localStorage apakah user ini sudah pernah isi cold start
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
            {prod.image && <img src={prod.image} alt={prod.name} />}
            <h4>{prod.name}</h4>
            <p className="price">
              Rp {Number(prod.price || 0).toLocaleString("id-ID")}
            </p>

            <button
              className="buy-btn"
              onClick={() => handleBuy(prod)}
            >
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>

      {/* Produk Populer */}
      <h3 className="section-title">Produk Populer</h3>

      {popularProducts.length === 0 && (
        <p>Belum ada produk populer karena belum ada transaksi.</p>
      )}

      {popularProducts.length > 0 && (
        <div className="product-list">
          {popularProducts.map((prod) => (
            <div className="product-card" key={prod.product_id}>
              <h4>{prod.name}</h4>
              <p className="price">
                Total dibelanjakan: Rp{" "}
                {Number(prod.totalRevenue || 0).toLocaleString("id-ID")}
              </p>
              <p className="meta">Dibeli sebanyak {prod.count}x</p>
              <button
                className="buy-btn"
                onClick={() =>
                  handleBuy({
                    product_id: prod.product_id,
                    name: prod.name,
                    // asumsi harga per unit = totalRevenue / count
                    price:
                      prod.count > 0
                        ? Math.round(prod.totalRevenue / prod.count)
                        : 0,
                  })
                }
              >
                Beli Lagi
              </button>
            </div>
          ))}
        </div>
      )}

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
            <p>Rp {Number(trx.price || 0).toLocaleString("id-ID")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
