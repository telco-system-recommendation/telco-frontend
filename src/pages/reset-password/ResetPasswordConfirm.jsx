import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

import { resetPasswordWithToken } from "../../services/authApi";
import "../../styles/login.css";

import Logo from "../../assets/logo.png";

const ResetPasswordConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --- CEK TOKEN DARI URL (HANYA BISA DARI EMAIL) ---
  useEffect(() => {
    const hash = location.hash || window.location.hash;

    if (!hash) {
      setErrorMessage(
        "Halaman ini hanya bisa dibuka melalui link resmi yang dikirim ke email Anda."
      );
      return;
    }

    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const token = params.get("access_token");
    const type = params.get("type");

    if (!token || type !== "recovery") {
      setErrorMessage("Token tidak valid atau sudah kadaluarsa.");
      return;
    }

    setAccessToken(token);
  }, [location.hash]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!password || !confirmPassword) {
      setErrorMessage("Password baru dan konfirmasi wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setIsSubmitting(true);

      await resetPasswordWithToken({
        accessToken,
        newPassword: password,
      });

      setSuccessMessage("Password berhasil diubah! Mengarahkan ke login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || "Gagal mengubah password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page page-login">
      <div className="login-page">
        {/* LEFT  */}
        <div className="login-left">
          <div className="login-brand-logo">
            <div className="logo-circle">
              <span className="logo-dot" />
              <img src={Logo} alt="Telcoreco Logo" className="brand-icon" />
            </div>

            <div>
              <p className="login-subtitle">Telcoreco</p>
              <h1 className="login-title">Reset Password</h1>
            </div>
          </div>
        </div>

        {/* RIGHT*/}
        <div className="login-right">
          <div className="login-card">
            <h2 className="login-card-title">Buat Password Baru</h2>
            <p className="login-card-subtitle">
              Silakan masukkan password baru untuk akun Anda.
            </p>

            {/* FORM */}
            <form className="login-form" onSubmit={handleSubmit}>
              {/* PASSWORD BARU */}
              <div className="form-group">
                <label>Password Baru</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div className="form-group">
                <label>Konfirmasi Password Baru</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Ulangi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="form-error-message">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="form-success-message">{successMessage}</p>
              )}

              <button
                type="submit"
                className="btn-primary login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <span className="login-spinner" />}
                <span className="login-submit-text">
                  {isSubmitting ? "Memproses..." : "Simpan Password →"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
