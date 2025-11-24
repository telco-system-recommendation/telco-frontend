import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
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

    if (!email || !password || !confirmPassword) {
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

      // 2. (Opsional) langsung login agar dapat access_token
      const session = await loginApi({ email, password });
      saveSession(session);

      setSuccessMessage("Akun berhasil dibuat!");
      // TODO: kalau nanti ada halaman "Lengkapi Profil", ganti ke /profil-setup
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
    <div className="signup-page">
      {/* Kiri: form signup */}
      <div className="signup-left">
        <div className="signup-card">
          <h2 className="signup-card-title">Buat Akun Baru</h2>
          <p className="signup-card-subtitle">
            Daftar untuk memulai perjalanan digital Anda.
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
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
              {isSubmitting ? "Memproses..." : "Buat Akun →"}
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

      {/* Kanan: highlight benefit (sesuai desain figma yang kamu kirim) */}
      <div className="signup-right">
        <div className="signup-highlight">
          <h3>Bergabunglah dengan Ribuan Pengguna</h3>
          <ul>
            <li>⚡ Proses Cepat &amp; Mudah</li>
            <li>📱 Akses ke Semua Produk</li>
            <li>🎯 Rekomendasi Khusus</li>
            <li>🏷️ Promo &amp; Diskon Eksklusif</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
