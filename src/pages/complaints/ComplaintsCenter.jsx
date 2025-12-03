import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMessageSquare,
  FiSend,
  FiRotateCcw,
} from "react-icons/fi";

import {
  createComplaint,   
  getMyComplaints,
} from "../../services/complaintsApi";

import "../../styles/complaints.css";

const ComplaintsCenter = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("new");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [historyLoading, setHistoryLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setPriority("Normal");
    setDescription("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !category || !description) {
      setError("Judul, kategori, dan deskripsi wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);

      await createComplaint({
        title,
        category,
        priority,
        description,
      });

      setSuccess("Komplain berhasil dikirim. Terima kasih atas laporan Anda.");
      resetForm();
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Gagal mengirim komplain. Silakan coba beberapa saat lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async () => {
    try {
      setHistoryLoading(true);
      const data = await getMyComplaints();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "history") {
      loadHistory();
    }
  }, [activeTab]);

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="page page-complaints">
      <div className="complaints-page">
        {/* Back link ke profil */}
        <button
          type="button"
          className="complaints-back"
          onClick={handleBack}
        >
          <FiArrowLeft />
          <span>Kembali ke Profil</span>
        </button>

        {/* Header utama */}
        <div className="complaints-header">
          <div className="complaints-icon-wrapper">
            <FiMessageSquare className="complaints-main-icon" />
          </div>
          <div>
            <h1 className="complaints-title">Pusat Komplain</h1>
            <p className="complaints-subtitle">
              Laporkan masalah atau keluhan Anda
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="complaints-tabs">
          <button
            type="button"
            className={`complaints-tab ${
              activeTab === "new" ? "active" : ""
            }`}
            onClick={() => setActiveTab("new")}
          >
            Komplain Baru
          </button>
          <button
            type="button"
            className={`complaints-tab ${
              activeTab === "history" ? "active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            Riwayat Komplain
          </button>
        </div>

        {/* ===== TAB KOMPLAIN BARU ===== */}
        {activeTab === "new" && (
          <section className="complaints-card">
            <div className="complaints-card-header">
              <h2>Formulir Komplain</h2>
              <p>
                Sampaikan masalah yang Anda alami agar kami bisa membantu Anda.
              </p>
            </div>

            <form className="complaints-form" onSubmit={handleSubmit}>
              {/* Judul */}
              <div className="cs-field">
                <label className="cs-label">
                  Judul Komplain <span className="cs-required">*</span>
                </label>
                <input
                  type="text"
                  className="cs-input"
                  placeholder="Misal: Jaringan tidak stabil"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Kategori */}
              <div className="cs-field">
                <label className="cs-label">
                  Kategori <span className="cs-required">*</span>
                </label>
                <select
                  className="cs-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Pilih kategori komplain</option>
                  <option value="Jaringan">Jaringan</option>
                  <option value="Tagihan">Tagihan</option>
                  <option value="Layanan">Layanan</option>
                  <option value="Produk">Produk</option>
                  <option value="Teknis">Teknis</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Prioritas */}
              <div className="cs-field">
                <label className="cs-label">Prioritas</label>
                <select
                  className="cs-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Rendah">Rendah</option>
                  <option value="Normal">Normal</option>
                  <option value="Tinggi">Tinggi</option>
                  <option value="Mendesak">Mendesak</option>
                </select>
              </div>

              {/* Deskripsi */}
              <div className="cs-field">
                <label className="cs-label">
                  Deskripsi Lengkap <span className="cs-required">*</span>
                </label>
                <textarea
                  className="cs-textarea"
                  rows={5}
                  placeholder="Jelaskan masalah yang Anda alami secara detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="cs-helper-text">
                  Berikan informasi selengkap mungkin agar kami dapat membantu
                  Anda dengan lebih baik.
                </p>
              </div>

              {error && <p className="cs-error">{error}</p>}
              {success && <p className="cs-success">{success}</p>}

              <div className="complaints-actions">
                <button
                  type="submit"
                  className="cs-submit"
                  disabled={submitting}
                >
                  <FiSend />
                  {submitting ? "Mengirim..." : "Kirim Komplain"}
                </button>
                <button
                  type="button"
                  className="cs-reset"
                  onClick={resetForm}
                >
                  <FiRotateCcw />
                  Reset
                </button>
              </div>
            </form>

            {/* Catatan di bawah form */}
            <div className="complaints-note">
              <p>
                <strong>Catatan:</strong> Tim customer service kami akan
                merespons komplain Anda dalam waktu 1×24 jam. Untuk masalah
                mendesak, hubungi hotline kami di <strong>1500-123</strong>.
              </p>
            </div>
          </section>
        )}

        {/* ===== TAB RIWAYAT KOMPLAIN ===== */}
        {activeTab === "history" && (
          <section className="complaints-card">
            <div className="complaints-card-header">
              <h2>Riwayat Komplain</h2>
              <p>Lihat daftar komplain yang pernah Anda kirimkan.</p>
            </div>

            {historyLoading && (
              <p className="complaints-info">Memuat riwayat komplain...</p>
            )}

            {!historyLoading && complaints.length === 0 && (
              <p className="complaints-info">
                Belum ada komplain yang tercatat. Silakan kirim komplain baru
                melalui formulir di tab &quot;Komplain Baru&quot;.
              </p>
            )}

            <div className="complaints-history-list">
              {complaints.map((c) => (
                <article key={c.id} className="complaint-item">
                  <div className="complaint-header-row">
                    <h3 className="complaint-title">{c.title}</h3>

                    <div className="complaint-badges">
                      {c.status && (
                        <span
                          className={`badge-status ${
                            c.status === "Selesai" ? "done" : "in-progress"
                          }`}
                        >
                          {c.status}
                        </span>
                      )}
                      {c.priority && (
                        <span className="badge-priority">{c.priority}</span>
                      )}
                      {c.category && (
                        <span className="badge-category">{c.category}</span>
                      )}
                    </div>
                  </div>

                  <p className="complaint-meta">
                    Dibuat:{" "}
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </p>

                  <div className="complaint-body">
                    <p className="complaint-description">{c.description}</p>

                    {/* kalau nanti ada kolom "solution" di DB, baru muncul blok ini */}
                    {c.solution && (
                      <div className="complaint-solution">
                        <strong>Solusi:</strong>
                        <p>{c.solution}</p>
                      </div>
                    )}
                  </div>

                  <p className="complaint-id">ID: {c.id}</p>
                </article>
              ))}
            </div>

            <div className="complaints-note">
              <p>
                <strong>Catatan:</strong> Tim customer service kami akan
                merespons komplain Anda dalam waktu 1×24 jam. Untuk masalah
                mendesak, hubungi hotline kami di <strong>1500-123</strong>.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ComplaintsCenter;
