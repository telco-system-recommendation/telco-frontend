import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiZap, FiWifi, FiShield } from "react-icons/fi";
import Logo from "../../assets/logo.png";
import "../../styles/login.css";

import { login as loginApi, saveSession } from "../../services/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);

      const session = await loginApi({ email, password });
      saveSession(session);

      return navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT */}
      <div className="login-left">
        {/* LOGO + BRAND */}
        <div className="login-brand-logo">
          <div className="logo-circle">
            <span className="logo-dot" />
            <img src={Logo} alt="Telcoreco Logo" className="brand-icon" />
          </div>

          <div>
            <p className="login-subtitle">Telcoreco</p>
            <h1 className="login-title">Connect & Recommend</h1>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="login-highlights">
          <div className="highlight-item">
            <div className="highlight-icon-box">
              <FiZap className="icon-image" />
            </div>
            <div>
              <h3>Layanan Cepat & Mudah</h3>
              <p>
                Akses berbagai produk digital dengan proses yang simpel dan
                efisien.
              </p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-box">
              <FiWifi className="icon-image" />
            </div>
            <div>
              <h3>Rekomendasi Personal</h3>
              <p>Dapatkan saran produk sesuai kebutuhan Anda.</p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-box">
              <FiShield className="icon-image" />
            </div>
            <div>
              <h3>Terpercaya & Aman</h3>
              <p>Transaksi dijamin aman dengan sistem keamanan terbaik.</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT (TIDAK DIUBAH) */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-card-title">Selamat Datang Kembali</h2>
          <p className="login-card-subtitle">
            Masuk ke akun Anda untuk melanjutkan.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="forgot-password-wrapper">
                <Link to="/reset-password" className="forgot-password-link">
                  Lupa password?
                </Link>
              </div>
            </div>

            {errorMessage && (
              <p className="form-error-message">{errorMessage}</p>
            )}

            <button type="submit" className="btn-primary login-submit">
              {isSubmitting ? "Memproses..." : "Masuk →"}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">
              Belum punya akun?{" "}
              <Link to="/signup" className="link">
                Daftar sekarang →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
