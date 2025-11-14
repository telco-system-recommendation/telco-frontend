import React from "react";
import "../../styles/promo.css";

const Promo = () => {
  const bgImage = "/src/assets/latar-belakang.jpg"; // gunakan gambar background yang sudah ada

  return (
    <div className="promo-page">

      {/* Header Section */}
      <div className="promo-header">
        <span className="promo-badge">Promo Spesial</span>
        <h2>Promo Terbaru</h2>
        <p>Jangan lewatkan penawaran menarik untuk produk telekomunikasi favorit Anda</p>
      </div>

      {/* Hero Promo Utama */}
      <div className="promo-hero">
        <div className="promo-hero-left">
          <span className="promo-exclusive">Promo Eksklusif</span>
          <h3>Flash Sale Weekend!</h3>
          <p>Dapatkan diskon hingga 50% untuk semua produk setiap akhir pekan</p>

          <div className="promo-countdown">
            ⏳ Berakhir dalam 2 hari 5 jam
          </div>

          <button className="btn-primary">Belanja Sekarang</button>
        </div>

        <div className="promo-hero-right">
          <img src={bgImage} alt="promo-bg" />
        </div>
      </div>

      {/* Promo Cards */}
      <div className="promo-cards">

        <div className="promo-card">
  
  <div className="promo-card-img">
    <img src={bgImage} alt="promo" />

    <span className="promo-tag promo-blue">Data</span>
    <span className="promo-discount">30%</span>
  </div>

  <h4>Diskon 30% Paket Data</h4>
  <p>Dapatkan diskon 30% untuk semua paket data di atas 20GB</p>
  <p className="promo-date">📅 Berlaku hingga 30 November 2025</p>

  <button className="btn-secondary">Gunakan Promo</button>
</div>


        <div className="promo-card">

  <div className="promo-card-img">
    <img src={bgImage} alt="promo" />

    <span className="promo-tag promo-orange">Pulsa</span>
    <span className="promo-discount">50%</span>
  </div>

  <h4>Beli 1 Gratis 1 Pulsa</h4>
  <p>Pembelian pulsa Rp 100.000 gratis pulsa Rp 50.000</p>
  <p className="promo-date">📅 Berlaku hingga 15 November 2025</p>

  <button className="btn-secondary">Gunakan Promo</button>
</div>


        <div className="promo-card">

  <div className="promo-card-img">
    <img src={bgImage} alt="promo" />

    <span className="promo-tag promo-purple">Streaming</span>
    <span className="promo-discount">25%</span>
  </div>

  <h4>Streaming Premium Hemat</h4>
  <p>Paket bundling Netflix + Spotify dengan harga spesial</p>
  <p className="promo-date">📅 Berlaku hingga 31 Desember 2025</p>

  <button className="btn-secondary">Gunakan Promo</button>
</div>


      </div>

      {/* Newsletter */}
      <div className="newsletter-box">
  <h2>Ingin mendapatkan promo eksklusif?</h2>
  <p>Dapatkan notifikasi promo terbaru langsung ke email Anda</p>
  <button className="newsletter-btn">Berlangganan Newsletter</button>
</div>


    </div>
  );
};

export default Promo;
