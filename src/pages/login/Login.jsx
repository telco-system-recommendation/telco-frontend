import React from "react";
import "../../styles/login.css";
import { FaBolt, FaWifi, FaShieldAlt, FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      {/* ================= LEFT SIDE ================= */}
      <div className="login-left">
        <div className="login-left-wrapper">

          {/* Logo */}
          <div className="left-logo-box">
            <img src={logo} alt="Telcoreco" className="left-logo-img" />
            <div>
              <h2 className="left-title">Telcoreco</h2>
              <p className="left-subtitle">Connect & Recommend</p>
            </div>
          </div>

          {/* Feature Items */}
          <div className="feature-item">
            <FaBolt className="feature-icon" />
            <div>
              <h4>Layanan Cepat & Mudah</h4>
              <p>Akses berbagai produk digital dengan proses yang simpel dan efisien</p>
            </div>
          </div>

          <div className="feature-item">
            <FaWifi className="feature-icon" />
            <div>
              <h4>Rekomendasi Personal</h4>
              <p>Dapatkan saran produk yang sesuai dengan kebutuhan Anda</p>
            </div>
          </div>

          <div className="feature-item">
            <FaShieldAlt className="feature-icon" />
            <div>
              <h4>Terpercaya & Aman</h4>
              <p>Transaksi dijamin aman dengan sistem keamanan terbaik</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT CARD FORM ================= */}
      <div className="login-card">
        <h2>Selamat Datang Kembali</h2>
        <p className="subtitle">Masuk ke akun Anda untuk melanjutkan</p>

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
          <input type="password" placeholder="********" />
        </div>

        <p className="forgot">Lupa password?</p>

        <button className="login-btn">Masuk →</button>

        <div className="divider">
          <span>atau</span>
        </div>

        <p className="register">
          Belum punya akun?{" "}
          <span onClick={() => navigate("/signup")}>Daftar sekarang →</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
