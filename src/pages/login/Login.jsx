import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

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

      // 1. Login ke Supabase API
      const session = await loginApi({ email, password });

      // 2. Simpan session (access_token, user, dll)
      saveSession(session);

      // 3. Langsung redirect ke dashboard
      return navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      {/* Kiri: highlight Telcoreco */}
      <div className="login-left">
        <div className="login-brand">
          <p className="login-subtitle">Telcoreco</p>
          <h1 className="login-title">Connect &amp; Recommend</h1>
        </div>

        <div className="login-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">⚡</span>
            <div>
              <h3>Layanan Cepat &amp; Mudah</h3>
              <p>Akses berbagai produk digital dengan proses yang simpel.</p>
            </div>
          </div>

          <div className="highlight-item">
            <span className="highlight-icon">📡</span>
            <div>
              <h3>Rekomendasi Personal</h3>
              <p>Dapatkan saran paket sesuai kebutuhan dan aktivitas Anda.</p>
            </div>
          </div>

          <div className="highlight-item">
            <span className="highlight-icon">🛡️</span>
            <div>
              <h3>Transparan &amp; Aman</h3>
              <p>Transaksi dijamin aman dengan sistem keamanan terbaik.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanan: form login */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-card-title">Selamat Datang Kembali</h2>
          <p className="login-card-subtitle">
            Masuk ke akun Anda untuk melanjutkan.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD + LUPA PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

            
              <div className="forgot-password-wrapper">
                <Link to="/reset-password" className="forgot-password-link">
                  Lupa password?
                </Link>
              </div>
            </div>

            {/* Pesan error */}
            {errorMessage && (
              <p className="form-error-message">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="btn-primary login-submit"
              disabled={isSubmitting}
            >
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
