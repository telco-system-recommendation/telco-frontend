import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../services/authApi";
import { saveUserBehaviour } from "../../services/userBehaviourApi";

import "../../styles/coldStart.css";

// mapping ke nilai numerik
const VIDEO_MAP = {
  never: 0.0,
  rarely: 0.15,
  sometimes: 0.35,
  often: 0.6,
  always: 0.85,
};

const CALL_MAP = {
  no: 0.0,
  light: 3.5,
  moderate: 8.0,
  heavy: 15.0,
};

const TRAVEL_MAP = {
  never: 0.0,
  rarely: 0.2,
  sometimes: 0.4,
  often: 0.7,
};

const ColdStart = () => {
  const navigate = useNavigate();

  
  const [plan, setPlan] = useState("");     
  const [brand, setBrand] = useState("");   
  const [video, setVideo] = useState("");  
  const [call, setCall] = useState("");   
  const [travel, setTravel] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!plan || !brand || !video || !call || !travel) {
    setError("Semua pertanyaan wajib diisi.");
    return;
  }

  try {
    setLoading(true);

    const session = getSession();
    const userId = session?.user?.id;
    if (!userId) {
      setError("Sesi pengguna tidak ditemukan. Silakan login ulang.");
      return;
    }

    const payload = {
      plan_type: plan,
      avg_data_usage_gb: 0,
      device_brand: brand,
      monthly_spend: 0,
      topup_freq: 0,
      travel_score: TRAVEL_MAP[travel],
      created_at: new Date().toISOString(),
      pct_video_usage: VIDEO_MAP[video],
      sms_frequency: 0,
      avg_call_duration: CALL_MAP[call],
      target_offer: null,
      complain_count: 0,
    };

    await saveUserBehaviour(payload);

    // ⬇FLAG: tandai bahwa user ini sudah mengisi cold start
    const flagKey = `coldstart_completed_${userId}`;
    localStorage.setItem(flagKey, "true");

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    setError("Gagal menyimpan jawaban. Silakan coba lagi.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="coldstart-page">
      <div className="coldstart-wrapper">
        <h1 className="coldstart-title">Profil Awal</h1>
        <p className="coldstart-subtitle">
          Jawaban Anda membantu kami memberikan rekomendasi produk yang lebih tepat.
        </p>

        <form className="coldstart-form" onSubmit={handleSubmit}>
          {/* 1. Jenis paket */}
          <div className="cs-field">
            <label className="cs-label">
              1. Jenis paket yang Anda minati?
            </label>
            <div className="cs-radio-group">
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="prepaid"
                  checked={plan === "prepaid"}
                  onChange={(e) => setPlan(e.target.value)}
                />
                Prepaid - Isi ulang kapan saja
              </label>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value="postpaid"
                  checked={plan === "postpaid"}
                  onChange={(e) => setPlan(e.target.value)}
                />
                Postpaid - Bayar di akhir bulan
              </label>
            </div>
          </div>

          {/* 2. Device brand */}
          <div className="cs-field">
            <label className="cs-label">
              2. Device brand yang Anda gunakan?
            </label>
            <select
              className="cs-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Pilih merk perangkat</option>
              <option value="Samsung">Samsung</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Oppo">Oppo</option>
              <option value="Vivo">Vivo</option>
              <option value="Realme">Realme</option>
              <option value="iPhone">iPhone</option>
              <option value="Infinix">Infinix</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* 3. Streaming */}
          <div className="cs-field">
            <label className="cs-label">
              3. Seberapa sering Anda menonton video streaming?
            </label>
            <div className="cs-radio-group">
              <label>
                <input
                  type="radio"
                  name="video"
                  value="never"
                  checked={video === "never"}
                  onChange={(e) => setVideo(e.target.value)}
                />
                Tidak pernah
              </label>
              <label>
                <input
                  type="radio"
                  name="video"
                  value="rarely"
                  checked={video === "rarely"}
                  onChange={(e) => setVideo(e.target.value)}
                />
                Jarang (1–2 jam/minggu)
              </label>
              <label>
                <input
                  type="radio"
                  name="video"
                  value="sometimes"
                  checked={video === "sometimes"}
                  onChange={(e) => setVideo(e.target.value)}
                />
                Kadang-kadang (3–5 jam/minggu)
              </label>
              <label>
                <input
                  type="radio"
                  name="video"
                  value="often"
                  checked={video === "often"}
                  onChange={(e) => setVideo(e.target.value)}
                />
                Sering (6–10 jam/minggu)
              </label>
              <label>
                <input
                  type="radio"
                  name="video"
                  value="always"
                  checked={video === "always"}
                  onChange={(e) => setVideo(e.target.value)}
                />
                Sangat sering (&gt;10 jam/minggu)
              </label>
            </div>
          </div>

          {/* 4. Paket telepon */}
          <div className="cs-field">
            <label className="cs-label">
              4. Apakah Anda tertarik dengan paket telepon?
            </label>
            <div className="cs-radio-group">
              <label>
                <input
                  type="radio"
                  name="call"
                  value="no"
                  checked={call === "no"}
                  onChange={(e) => setCall(e.target.value)}
                />
                Tidak, saya jarang telepon
              </label>
              <label>
                <input
                  type="radio"
                  name="call"
                  value="light"
                  checked={call === "light"}
                  onChange={(e) => setCall(e.target.value)}
                />
                Ya, sesekali telepon
              </label>
              <label>
                <input
                  type="radio"
                  name="call"
                  value="moderate"
                  checked={call === "moderate"}
                  onChange={(e) => setCall(e.target.value)}
                />
                Ya, cukup sering telepon
              </label>
              <label>
                <input
                  type="radio"
                  name="call"
                  value="heavy"
                  checked={call === "heavy"}
                  onChange={(e) => setCall(e.target.value)}
                />
                Ya, sangat sering telepon
              </label>
            </div>
          </div>

          {/* 5. Frekuensi bepergian */}
          <div className="cs-field">
            <label className="cs-label">
              5. Seberapa sering Anda bepergian?
            </label>
            <div className="cs-radio-group">
              <label>
                <input
                  type="radio"
                  name="travel"
                  value="never"
                  checked={travel === "never"}
                  onChange={(e) => setTravel(e.target.value)}
                />
                Tidak pernah
              </label>
              <label>
                <input
                  type="radio"
                  name="travel"
                  value="rarely"
                  checked={travel === "rarely"}
                  onChange={(e) => setTravel(e.target.value)}
                />
                Jarang (1–2 kali/tahun)
              </label>
              <label>
                <input
                  type="radio"
                  name="travel"
                  value="sometimes"
                  checked={travel === "sometimes"}
                  onChange={(e) => setTravel(e.target.value)}
                />
                Kadang (3–6 kali/tahun)
              </label>
              <label>
                <input
                  type="radio"
                  name="travel"
                  value="often"
                  checked={travel === "often"}
                  onChange={(e) => setTravel(e.target.value)}
                />
                Sering (&gt;6 kali/tahun)
              </label>
            </div>
          </div>

          {error && <p className="cs-error">{error}</p>}

          <button className="cs-submit" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan dan Lanjutkan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ColdStart;
