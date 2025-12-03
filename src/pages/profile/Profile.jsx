import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBell,
  FiCreditCard,
  FiLock,
  FiLogOut,
  FiMessageSquare,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  getSession,
  logout,
  clearSession,
  updatePassword,
} from "../../services/authApi";
import { getProfile, updateProfile } from "../../services/profilesApi";
import { useCart } from "../../context/CartContext";

import "../../styles/profile.css";

const PREFERENSI_OPTIONS = [
  "Pulsa & Nelpon",
  "Kuota Data",
  "Streaming Subscription",
  "Roaming",
];

const Profile = () => {
  const navigate = useNavigate();
  const session = getSession();
  const user = session?.user;

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferensi, setPreferensi] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==== STATE UBAH PASSWORD ====
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const sessionData = getSession();
        const currentUser = sessionData?.user;

        if (!currentUser) {
          setError("Session tidak ditemukan. Silakan login ulang.");
          setLoading(false);
          return;
        }

        const p = await getProfile(currentUser.id);

        setProfile(p);
        setFullName(p?.full_name || "");
        setEmail(p?.email || currentUser.email || "");
        setPhone(p?.phone || "");
        setAddress(p?.address || "");
        setPreferensi(p?.preferensi_produk || "");
      } catch (err) {
        setError(err.message || "Gagal memuat profil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const initialName = (fullName || email || "").trim().charAt(0).toUpperCase();

  const handleStartEdit = () => {
    setIsEditing(true);
    setSuccess("");
    setError("");
  };

  const handleCancel = () => {
    if (!profile) {
      setIsEditing(false);
      return;
    }

    setFullName(profile.full_name || "");
    setEmail(profile.email || user.email || "");
    setPhone(profile.phone || "");
    setAddress(profile.address || "");
    setPreferensi(profile.preferensi_produk || "");
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        full_name: fullName,
        phone,
        preferensi_produk: preferensi || null,
        email,
        address: address || null,
      };

      const updated = await updateProfile(user.id, payload);
      setProfile(updated);
      setSuccess("Profil berhasil diperbarui.");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(session?.access_token);
    } catch (e) {
      console.warn("Logout error:", e);
    }

    clearCart();
    clearSession();
    navigate("/");
  };

  // ==== HANDLER UNTUK PANEL UBAH PASSWORD ====
  const handleToggleChangePassword = () => {
    setIsPasswordOpen((prev) => !prev);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!newPassword || !confirmPassword) {
      setPasswordError("Password baru dan konfirmasi wajib diisi.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password baru minimal 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setChangingPassword(true);
      await updatePassword(newPassword);
      setPasswordSuccess("Password berhasil diperbarui.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err.message || "Gagal mengubah password.");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <span className="profile-loading-text">Memuat profil...</span>
      </div>
    );
  }

  return (
    <div className="page page-profile">
      <div className="profile-page">
        <h2 className="profile-title">Profil Saya</h2>

        <div className="profile-layout">
          {/* ===== KARTU RINGKAS KIRI ===== */}
          <aside className="profile-summary-card">
            <div className="profile-avatar">{initialName || "U"}</div>

            <h3 className="profile-summary-name">
              {fullName || "Nama belum diisi"}
            </h3>
            <p className="profile-summary-email">{email}</p>

            <button
              type="button"
              className="profile-edit-btn"
              onClick={isEditing ? handleCancel : handleStartEdit}
            >
              {isEditing ? "Batal Edit" : "Edit Profil"}
            </button>

            <div className="profile-summary-extra">
              <div className="summary-item">
                <div className="summary-icon phone">
                  <FiPhone />
                </div>
                <div className="summary-text">
                  <p className="summary-label">Telepon</p>
                  <p className="summary-value">{profile?.phone}</p>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon location">
                  <FiMapPin />
                </div>
                <div className="summary-text">
                  <p className="summary-label">Alamat</p>
                  <p className="summary-value">{profile?.address}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ===== KONTEN KANAN ===== */}
          <main className="profile-main">
            {/* --- Info pribadi --- */}
            <section className="profile-card">
              <div className="profile-card-header">
                <h3>Informasi Pribadi</h3>
                <p>Kelola informasi pribadi Anda</p>
              </div>

              {error && <div className="profile-alert error">{error}</div>}
              {success && (
                <div className="profile-alert success">{success}</div>
              )}

              <form onSubmit={handleSave} className="profile-form">
                <div className="profile-form-grid">
                  {/* Nama */}
                  <div className="profile-field">
                    <label>Nama Lengkap</label>
                    <div className="profile-input-wrapper">
                      <FiUser className="profile-input-icon" />
                      <input
                        type="text"
                        className="profile-input"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nama lengkap Anda"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="profile-field">
                    <label>Email</label>
                    <div className="profile-input-wrapper">
                      <FiMail className="profile-input-icon" />
                      <input
                        type="email"
                        className="profile-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={true}
                      />
                    </div>
                    <p className="field-hint">
                      Untuk mengubah email, silakan hubungi dukungan.
                    </p>
                  </div>

                  {/* Nomor Telepon */}
                  <div className="profile-field">
                    <label>Nomor Telepon</label>
                    <div className="profile-input-wrapper">
                      <FiPhone className="profile-input-icon" />
                      <input
                        type="text"
                        className="profile-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08123xxxxxxx"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Alamat */}
                  <div className="profile-field">
                    <label>Alamat</label>
                    <div className="profile-input-wrapper">
                      <FiMapPin className="profile-input-icon" />
                      <input
                        type="text"
                        className="profile-input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Contoh: Jl. Sudirman No. 123, Jakarta"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="profile-actions">
                    <button
                      type="submit"
                      className="profile-btn primary"
                      disabled={saving}
                    >
                      {saving ? "Menyimpan..." : "Simpan"}
                    </button>
                    <button
                      type="button"
                      className="profile-btn ghost"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Batal
                    </button>
                  </div>
                )}
              </form>
            </section>

            {/* --- Preferensi Produk --- */}
            <section className="profile-card">
              <div className="profile-card-header warn">
                <span className="dot-live" />
                <div>
                  <h3>Preferensi Produk</h3>
                  <p>
                    Atur preferensi produk untuk rekomendasi yang lebih personal
                  </p>
                </div>
              </div>

              <div className="profile-field">
                <label>Preferensi Produk</label>
                <select
                  className="profile-select"
                  value={preferensi}
                  onChange={(e) => setPreferensi(e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">Pilih preferensi</option>
                  {PREFERENSI_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="field-hint">
                  Preferensi ini akan digunakan untuk memberikan rekomendasi
                  produk di dashboard Anda.
                </p>
              </div>
            </section>

            {/* --- Pengaturan Akun + Logout --- */}
            <section className="profile-card">
              <div className="profile-card-header">
                <h3>Pengaturan Akun</h3>
                <p>Kelola preferensi dan keamanan akun</p>
              </div>

              <div className="account-settings">
                {/* ROW UBAH PASSWORD */}
                <button
                  type="button"
                  className="account-row"
                  onClick={handleToggleChangePassword}
                >
                  <FiLock />
                  <span>Ubah Password</span>
                </button>

                {/* PANEL UBAH PASSWORD */}
                {isPasswordOpen && (
                  <div className="change-password-panel">
                    <h4 className="change-password-title">Ubah Password</h4>
                    <p className="change-password-desc">
                      Masukkan password baru Anda. Pastikan mudah diingat namun
                      sulit ditebak.
                    </p>

                    {passwordError && (
                      <div className="profile-alert error small">
                        {passwordError}
                      </div>
                    )}
                    {passwordSuccess && (
                      <div className="profile-alert success small">
                        {passwordSuccess}
                      </div>
                    )}

                    <form onSubmit={handleChangePassword}>
                      <div className="profile-form-grid">
                        <div className="profile-field">
                          <label>Password Baru</label>
                          <div className="profile-input-wrapper">
                            <FiLock className="profile-input-icon" />
                            <input
                              type="password"
                              className="profile-input"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Minimal 6 karakter"
                            />
                          </div>
                        </div>

                        <div className="profile-field">
                          <label>Konfirmasi Password Baru</label>
                          <div className="profile-input-wrapper">
                            <FiLock className="profile-input-icon" />
                            <input
                              type="password"
                              className="profile-input"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              placeholder="Ulangi password baru"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="change-password-actions">
                        <button
                          type="submit"
                          className="profile-btn primary"
                          disabled={changingPassword}
                        >
                          {changingPassword
                            ? "Menyimpan..."
                            : "Simpan Password"}
                        </button>
                        <button
                          type="button"
                          className="profile-btn ghost"
                          onClick={handleToggleChangePassword}
                          disabled={changingPassword}
                        >
                          Tutup
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <button type="button" className="account-row">
                  <FiBell />
                  <span>Notifikasi</span>
                </button>

                <button type="button" className="account-row">
                  <FiCreditCard />
                  <span>Metode Pembayaran</span>
                </button>

                <button
                  type="button"
                  className="account-row"
                  onClick={() => navigate("/complaints")}
                >
                  <FiMessageSquare />
                  <span>Pusat Komplain</span>
                </button>

                <button
                  type="button"
                  className="account-row logout"
                  onClick={handleLogout}
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
