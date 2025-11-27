import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../services/authApi";
import { updateProfile } from "../../services/profilesApi";
import { FiBarChart2 } from "react-icons/fi";
import "../../styles/setupProfile.css"; 

const SetupProfile = () => {
  const navigate = useNavigate();

  // State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferensi, setPreferensi] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !phone || !preferensi) {
      setErrorMsg("Semua kolom wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const session = getSession();
      const userId = session?.user?.id;

      if (!userId) {
        setErrorMsg("User tidak ditemukan.");
        return;
      }

      await updateProfile(userId, {
        full_name: fullName,
        phone: phone,
        preferensi_produk: preferensi,
      });

      navigate("/cold-start");
    } catch (err) {
      setErrorMsg("Gagal menyimpan profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-profile-page">
      <div className="setup-profile-wrapper">
        <div className="setup-top-icon">
  <FiBarChart2 />
</div>

<h1 className="setup-title">Lengkapi Profil Anda</h1>

        <p className="setup-subtitle">
          Bantu kami memberikan rekomendasi produk terbaik untuk Anda
        </p>

        <form className="setup-form" onSubmit={handleSubmit}>
          <label>
            Nama Lengkap
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <label>
            Nomor Telepon
            <input
              type="text"
              placeholder="08xx xxxx xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label>
  Preferensi Produk
  <select
    value={preferensi}
    onChange={(e) => setPreferensi(e.target.value)}
  >
    <option value="">Pilih preferensi produk</option>

    {/* pakai LABEL yang sama dengan Dashboard & Profile */}
    <option value="Pulsa & Nelpon">Pulsa & Paket Nelpon</option>
    <option value="Kuota Data">Kuota Data Internet</option>
    <option value="Streaming Subscription">Streaming & Entertainment</option>
    <option value="Roaming">Roaming Internasional</option>

    {/* opsi spesial: semua produk */}
    <option value="Semua Produk">Semua Produk</option>
  </select>
</label>



          {errorMsg && <p className="setup-error">{errorMsg}</p>}

          <button className="setup-submit" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Lanjut →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;
