import React from "react";
import {
  FiZap,
  FiTag,
  FiPercent,
  FiClock
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import "../../styles/promo.css";

const Promo = () => {
  const navigate = useNavigate();
  const bgImage = "/src/assets/latar-belakang.jpg";

  const goToProduct = () => navigate("/produk");

  return (
    <div className="page page-promo">
      <div className="promo-page">

        {/* Header Section */}
        <div className="promo-header">
          <span className="promo-badge">
            <FiTag style={{ marginRight: "6px" }} />
            Promo Spesial
          </span>
          <h2>Promo Terbaru</h2>
          <p>Jangan lewatkan penawaran menarik untuk produk telekomunikasi favorit Anda</p>
        </div>

        {/* HERO */}
        <div className="promo-hero">
          <div className="promo-hero-left">
            <span className="promo-exclusive">
              <FiZap style={{ marginRight: "6px" }} />
              Promo Eksklusif
            </span>

            <h3>Flash Sale Weekend!</h3>
            <p>Dapatkan diskon hingga 50% untuk semua produk setiap akhir pekan</p>

            <div className="promo-countdown">
              <FiClock style={{ marginRight: "6px" }} />
              Berakhir dalam 2 hari 5 jam
            </div>

            {/* hero button → /produk */}
            <button className="btn-primary" onClick={goToProduct}>
              Belanja Sekarang
            </button>
          </div>

          <div className="promo-hero-right">
            <img src={bgImage} alt="promo-bg" />
          </div>
        </div>

        {/* PROMO CARDS */}
        <div className="promo-cards">

          {/* CARD 1 */}
          <div className="promo-card">
            <div className="promo-card-img">
              <img src={bgImage} alt="promo" />

              <span className="promo-tag promo-blue">Data</span>
              <span className="promo-discount">
                <FiPercent style={{ marginRight: "4px" }} />
                30%
              </span>
            </div>

            <h4>Diskon 30% Paket Data</h4>
            <p>Dapatkan diskon 30% untuk semua paket data di atas 20GB</p>

            <p className="promo-date">
              <FiClock style={{ marginRight: "6px" }} />
              Berlaku hingga 30 November 2025
            </p>

            <button className="btn-secondary" onClick={goToProduct}>
              Gunakan Promo
            </button>
          </div>

          {/* CARD 2 */}
          <div className="promo-card">
            <div className="promo-card-img">
              <img src={bgImage} alt="promo" />

              <span className="promo-tag promo-orange">Pulsa</span>
              <span className="promo-discount">
                <FiPercent style={{ marginRight: "4px" }} />
                50%
              </span>
            </div>

            <h4>Beli 1 Gratis 1 Pulsa</h4>
            <p>Pembelian pulsa Rp 100.000 gratis pulsa Rp 50.000</p>

            <p className="promo-date">
              <FiClock style={{ marginRight: "6px" }} />
              Berlaku hingga 15 November 2025
            </p>

            <button className="btn-secondary" onClick={goToProduct}>
              Gunakan Promo
            </button>
          </div>

          {/* CARD 3 */}
          <div className="promo-card">
            <div className="promo-card-img">
              <img src={bgImage} alt="promo" />

              <span className="promo-tag promo-purple">Streaming</span>
              <span className="promo-discount">
                <FiPercent style={{ marginRight: "4px" }} />
                25%
              </span>
            </div>

            <h4>Streaming Premium Hemat</h4>
            <p>Paket bundling Netflix + Spotify dengan harga spesial</p>

            <p className="promo-date">
              <FiClock style={{ marginRight: "6px" }} />
              Berlaku hingga 31 Desember 2025
            </p>

            <button className="btn-secondary" onClick={goToProduct}>
              Gunakan Promo
            </button>
          </div>

        </div>

        {/* NEWSLETTER */}
        <div className="newsletter-box">
          <h2>Ingin mendapatkan promo eksklusif?</h2>
          <p>Dapatkan notifikasi promo terbaru langsung ke email Anda</p>
          <button className="newsletter-btn" onClick={goToProduct}>
            Berlangganan Newsletter
          </button>
        </div>

      </div>
    </div>
  );
};

export default Promo;
