import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSession } from "../../services/authApi";
import { getUserTransactions } from "../../services/transactionApi";

import "../../styles/history.css";

const PAGE_SIZE = 15;

const History = () => {
  const navigate = useNavigate();
  const session = getSession();
  const user = session?.user;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc"); 

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        const trxUser = await getUserTransactions(user.id);
        setTransactions(trxUser || []);
      } catch (err) {
        console.error("Gagal memuat riwayat transaksi:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, navigate]);

  const getProcessedTransactions = () => {
    let data = [...(transactions || [])];

    if (filterStatus !== "all") {
      data = data.filter(
        (t) => (t.status || "").toLowerCase() === filterStatus
      );
    }

    data.sort((a, b) => {
      const priceA = Number(a.price || 0);
      const priceB = Number(b.price || 0);
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();

      switch (sortBy) {
        case "date_asc":
          return dateA - dateB;
        case "price_desc":
          return priceB - priceA;
        case "price_asc":
          return priceA - priceB;
        case "date_desc":
        default:
          return dateB - dateA;
      }
    });

    return data;
  };

  const processed = getProcessedTransactions();
  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));

  const visibleTransactions = processed.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [filterStatus, sortBy]);

  if (loading) {
    return (
      <div className="page page-history">
        <div className="history-page">
          <button
            type="button"
            className="history-back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Kembali ke Dashboard
          </button>

          <div className="history-header-center">
            <h1 className="history-main-title">Riwayat Transaksi</h1>
            <p className="history-main-subtitle">
              Daftar transaksi pembelian produk yang pernah Anda lakukan.
            </p>
          </div>

          <p className="history-loading-text">Memuat transaksi...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="page page-history">
      <div className="history-page">
        <button
          type="button"
          className="history-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Kembali ke Dashboard
        </button>

        <div className="history-header-center">
          <h1 className="history-main-title">Riwayat Transaksi</h1>
          <p className="history-main-subtitle">
            Daftar transaksi pembelian produk yang pernah Anda lakukan.
          </p>
        </div>

        {transactions.length === 0 ? (
  <div className="history-empty">
    Belum ada transaksi yang tercatat.
  </div>
) : (
  <>

    <div className="history-filters-row">
      <div className="history-filters">
        <div className="history-filter-group">
          <label>Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
                    <option value="all">Semua status</option>
                    <option value="success">Berhasil</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Gagal</option>
                  </select>
                </div>

                <div className="history-filter-group">
                  <label>Urutkan</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date_desc">Terbaru</option>
                    <option value="date_asc">Terlama</option>
                    <option value="price_desc">Harga tertinggi</option>
                    <option value="price_asc">Harga terendah</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="history-table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Tanggal</th>
                    <th>Harga</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTransactions.map((trx) => (
                    <tr key={trx.id}>
                      <td>{trx.product_name}</td>
                      <td>{trx.created_at?.slice(0, 10)}</td>
                      <td>
                        Rp {Number(trx.price || 0).toLocaleString("id-ID")}
                      </td>
                      <td>
                        <span
                          className={`status-pill ${
                            trx.status === "success" ? "success" : ""
                          }`}
                        >
                          {trx.status === "success" ? "Berhasil" : trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination history-pagination">
                <button
                  type="button"
                  className="pagination-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const p = idx + 1;
                  return (
                    <button
                      key={p}
                      type="button"
                      className={`pagination-page-btn ${
                        p === page ? "active" : ""
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  type="button"
                  className="pagination-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Berikutnya
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default History;
