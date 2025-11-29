import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiZap,
  FiGrid,
  FiTarget,
  FiTag,
} from "react-icons/fi";

import Logo from "../../assets/logo.png";
import "../../styles/signup.css";

import {
  signup as signupApi,
  login as loginApi,
  saveSession,
} from "../../services/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Sign up ke Supabase
      await signupApi({ email, password });

      // 2. Langsung login supaya dapat access_token
      const session = await loginApi({ email, password });
      saveSession(session);

      setSuccessMessage("Akun berhasil dibuat!");
      setTimeout(() => {
        navigate("/setup-profile");
      }, 800);
    } catch (error) {
      setErrorMessage(error.message || "Gagal membuat akun. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page page-signup">
      <div className="signup-page">
        {/* Kiri: form signup */}
        <div className="signup-left">
          <div className="signup-card">
            <h2 className="signup-card-title">Buat Akun Baru</h2>
            <p className="signup-card-subtitle">
              Daftar untuk memulai perjalanan digital Anda.
            </p>

            <form className="signup-form" onSubmit={handleSubmit}>
              {/* NAMA LENGKAP */}
              <div className="form-group">
                <label htmlFor="fullName">Nama Lengkap</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

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

              {/* PASSWORD */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Konfirmasi Password</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Ulangi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              {/* Pesan error / sukses */}
              {errorMessage && (
                <p className="form-error-message">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="form-success-message">{successMessage}</p>
              )}

              <button
                type="submit"
                className="btn-primary signup-submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <span className="signup-spinner" />}
                <span className="signup-submit-text">
                  {isSubmitting ? "Memproses..." : "Buat Akun →"}
                </span>
              </button>
            </form>

            <div className="signup-footer">
              <p className="signup-footer-text">
                Sudah punya akun?{" "}
                <Link to="/login" className="link">
                  Masuk sekarang →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Kanan: highlight benefit */}
        <div className="signup-right">
          <div className="signup-right-card">
            {/* Logo + brand */}
            <div className="signup-right-header">
              <div className="signup-logo-circle">
                <span className="signup-logo-dot" />
                <img src={Logo} alt="Telcoreco" className="signup-brand-icon" />
              </div>
              <div>
                <p className="signup-brand-subtitle">Telcoreco</p>
                <h3 className="signup-brand-title">Connect &amp; Recommend</h3>
              </div>
            </div>

            <p className="signup-right-text">
              Bergabunglah dengan ribuan pengguna dan nikmati berbagai
              keuntungan eksklusif sebagai member Telcoreco.
            </p>

            <div className="signup-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">
                  <FiZap />
                </span>
                <div>
                  <h4>Proses Cepat &amp; Mudah</h4>
                  <p>Registrasi hanya membutuhkan waktu kurang dari 1 menit.</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">
                  <FiGrid />
                </span>
                <div>
                  <h4>Akses ke Semua Produk</h4>
                  <p>Dapatkan akses ke ribuan produk digital terbaik.</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">
                  <FiTarget />
                </span>
                <div>
                  <h4>Rekomendasi Khusus</h4>
                  <p>
                    Sistem AI kami memberikan rekomendasi sesuai preferensi.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">
                  <FiTag />
                </span>
                <div>
                  <h4>Promo &amp; Diskon Eksklusif</h4>
                  <p>Nikmati penawaran spesial hanya untuk member Telcoreco.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
