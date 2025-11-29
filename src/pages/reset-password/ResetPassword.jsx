import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

import "../../styles/login.css";
import { resetPassword } from "../../services/authApi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Email wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword({ email });
      setSuccessMessage(
        "Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam."
      );
    } catch (error) {
      setErrorMessage(
        error.message || "Gagal mengirim link reset password. Coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page page-reset-password">
      <div className="login-page">
        {/* bisa reuse layout kiri kalau mau, atau kosongkan */}
        <div className="login-left" />

        <div className="login-right">
          <div className="login-card">
            <h2 className="login-card-title">Reset Password</h2>
            <p className="login-card-subtitle">
              Masukkan email yang terdaftar. Kami akan mengirimkan link untuk
              mengatur ulang password Anda.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Terdaftar</label>
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
                {isSubmitting ? "Mengirim..." : "Kirim Link Reset"}
              </button>
            </form>

            <div className="login-footer">
              <p className="login-footer-text">
                Kembali ke{" "}
                <Link to="/login" className="link">
                  Halaman Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
