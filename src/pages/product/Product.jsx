import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/product.css";
import { FaPhoneAlt, FaWifi, FaTv, FaGlobe } from "react-icons/fa";
import { getSession } from "../../services/authApi";
import { getProductsByCategory } from "../../services/productApi";

// Modal sederhana untuk memaksa login / signup
const LoginRequiredModal = ({ isOpen, onClose, onLogin, onSignup }) => {
  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-modal-header">
          <h3>Login Diperlukan</h3>
          <button
            type="button"
            className="login-modal-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>
        <p className="login-modal-text">
          Untuk melihat dan membeli produk, Anda perlu masuk ke akun terlebih
          dahulu.
        </p>

        <div className="login-modal-actions">
          <button type="button" className="btn-login" onClick={onLogin}>
            Masuk ke Akun
          </button>
          <button type="button" className="btn-signup" onClick={onSignup}>
            Daftar Akun Baru
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

// Mapping kategori di UI -> kategori di Supabase
const CATEGORY_CONFIG = {
  pulsa: {
    label: "Pulsa & Nelpon",
    supabaseCategory: "pulsa",       
  },
  data: {
    label: "Kuota Data",
    supabaseCategory: "data",
  },
  streaming: {
    label: "Streaming Subscription",
    supabaseCategory: "streaming",
  },
  roaming: {
    label: "Roaming",
    supabaseCategory: "roaming",
  },
};


const Product = () => {
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRequireAuth = () => {
    setIsLoginModalOpen(true);
  };

  const handleViewProducts = async (categoryKey) => {
    const session = getSession();

    // kalau belum login → munculkan modal
    if (!session || !session.access_token) {
      handleRequireAuth();
      return;
    }

    const cfg = CATEGORY_CONFIG[categoryKey];
    if (!cfg) return;

    try {
      setLoading(true);
      setError("");
      setSelectedKey(categoryKey);

      const data = await getProductsByCategory(cfg.supabaseCategory);
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCategories = () => {
    setSelectedKey(null);
    setProducts([]);
    setError("");
  };

  const handleGoLogin = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };

  const handleGoSignup = () => {
    setIsLoginModalOpen(false);
    navigate("/signup");
  };

  const currentCategoryLabel =
    selectedKey && CATEGORY_CONFIG[selectedKey]?.label;

  // Tampilan list produk (setelah kategori dipilih)
  if (selectedKey) {
    return (
      <div className="product-page">
        <button
          type="button"
          className="back-to-category"
          onClick={handleBackToCategories}
        >
          &larr; Kembali ke Kategori
        </button>

        <h2 className="product-title">{currentCategoryLabel}</h2>
        <p className="product-subtitle">
          Pilih produk yang sesuai dengan kebutuhan Anda
        </p>

        {loading && <p className="product-info">Memuat produk...</p>}
        {error && <p className="product-error">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="product-info">
            Belum ada produk untuk kategori ini.
          </p>
        )}

        <div className="selected-product-grid">
          {products.map((item) => (
  <div key={item.product_id} className="selected-product-card">
    {item.popular && <span className="badge-popular">Populer</span>}

    <h3 className="selected-product-name">{item.name}</h3>
    <p className="selected-product-price">
      Rp {Number(item.price || 0).toLocaleString("id-ID")}
    </p>
    {item.description && (
      <p className="selected-product-desc">{item.description}</p>
    )}

    {Array.isArray(item.features) && item.features.length > 0 && (
      <ul className="selected-product-features">
        {item.features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
    )}

    <button type="button" className="btn-buy">
      Beli Sekarang
    </button>
  </div>
))}
        </div>

        <LoginRequiredModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleGoLogin}
          onSignup={handleGoSignup}
        />
      </div>
    );
  }

  // Tampilan default: pilih kategori
  return (
    <div className="product-page">
      <h2 className="product-title">Pilih Kategori Produk</h2>
      <p className="product-subtitle">
        Temukan produk telekomunikasi yang sesuai dengan kebutuhan Anda
      </p>

      <div className="product-grid">
        <div className="product-card">
          <div className="icon blue">
            <FaPhoneAlt size={32} />
          </div>
          <h3>Pulsa &amp; Nelpon</h3>
          <p>Paket pulsa dan telepon untuk kebutuhan komunikasi</p>
          <button
            type="button"
            className="btn-product"
            onClick={() => handleViewProducts("pulsa")}
          >
            Lihat Produk
          </button>
        </div>

        <div className="product-card">
          <div className="icon green">
            <FaWifi size={32} />
          </div>
          <h3>Kuota Data</h3>
          <p>Paket internet untuk browsing dan streaming</p>
          <button
            type="button"
            className="btn-product"
            onClick={() => handleViewProducts("data")}
          >
            Lihat Produk
          </button>
        </div>

        <div className="product-card">
          <div className="icon purple">
            <FaTv size={32} />
          </div>
          <h3>Streaming Subscription</h3>
          <p>Akses ke platform hiburan digital favorit</p>
          <button
            type="button"
            className="btn-product"
            onClick={() => handleViewProducts("streaming")}
          >
            Lihat Produk
          </button>
        </div>

        <div className="product-card">
          <div className="icon orange">
            <FaGlobe size={32} />
          </div>
          <h3>Roaming</h3>
          <p>Paket roaming internasional untuk perjalanan</p>
          <button
            type="button"
            className="btn-product"
            onClick={() => handleViewProducts("roaming")}
          >
            Lihat Produk
          </button>
        </div>
      </div>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleGoLogin}
        onSignup={handleGoSignup}
      />
    </div>
  );
};

export default Product;
