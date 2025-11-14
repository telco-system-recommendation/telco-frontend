import React from "react";
import "./../../styles/signup.css";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">

      {/* CARD FORM DI KIRI */}
      <div className="signup-card">
        <h2 className="signup-title">Buat Akun Baru</h2>
        <p className="signup-subtitle">
          Daftar untuk memulai perjalanan digital Anda
        </p>

        {/* Nama */}
        <label>Nama Lengkap</label>
        <div className="input-wrapper">
          <FaUser className="input-icon" />
          <input type="text" placeholder="Masukkan nama lengkap" />
        </div>

        {/* Email */}
        <label>Email</label>
        <div className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="nama@email.com" />
        </div>

        {/* Password */}
        <label>Password</label>
        <div className="input-wrapper">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Minimal 8 karakter" />
        </div>

        <p className="terms">
          Dengan mendaftar, Anda menyetujui <span>Syarat & Ketentuan</span> kami
        </p>

        <button className="signup-btn">Buat Akun →</button>

        <div className="divider"><span>atau</span></div>

        <p className="login-link">
          Sudah punya akun?{" "}
          <span onClick={() => navigate("/login")}>Masuk sekarang →</span>
        </p>
      </div>

      {/* PANEL KANAN */}
      <div className="signup-info">
        <div className="signup-info-header">
          <img src={logo} alt="logo" className="info-logo" />
          <div>
            <h3 className="info-title">Telcoreco</h3>
            <p className="info-subtitle">Connect & Recommend</p>
          </div>
        </div>

        <h2 className="info-bigtitle">
          Bergabunglah dengan Ribuan Pengguna
        </h2>

        <p className="info-desc">
          Nikmati berbagai keuntungan eksklusif dengan menjadi member Telcoreco
        </p>

        {/* Benefit List */}
        <div className="benefit-item">
          <FaCheckCircle className="benefit-icon" />
          <div>
            <h4>Proses Cepat & Mudah</h4>
            <p>Registrasi hanya membutuhkan waktu kurang dari 1 menit</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaCheckCircle className="benefit-icon" />
          <div>
            <h4>Akses ke Semua Produk</h4>
            <p>Dapatkan akses ke ribuan produk digital terbaik</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaCheckCircle className="benefit-icon" />
          <div>
            <h4>Rekomendasi Khusus</h4>
            <p>Sistem AI kami memberikan rekomendasi sesuai preferensi Anda</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaCheckCircle className="benefit-icon" />
          <div>
            <h4>Promo & Diskon Eksklusif</h4>
            <p>Nikmati berbagai penawaran spesial hanya untuk member</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
