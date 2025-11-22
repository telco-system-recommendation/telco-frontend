import React from "react";
import "./../../styles/cta.css";
import { useNavigate } from "react-router-dom";



const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Siap Untuk Memulai?</h2>
        <p>
          Daftar sekarang dan dapatkan rekomendasi produk yang dipersonalisasi
          khusus untuk Anda
        </p>
        <button className="cta-button" onClick={() => navigate("/signup")}>Daftar Gratis</button>
      </div>
    </section>
  );
};

export default CTA;
