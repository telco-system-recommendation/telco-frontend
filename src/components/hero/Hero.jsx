import bgHero from "../../assets/latar-belakang.jpg";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${bgHero})`,
      }}
    >
      <div className="hero-content">
        <p className="subtitle">Platform Rekomendasi Produk Digital</p>
        <h1>Solusi Telekomunikasi Terbaik untuk Anda</h1>
        <p className="desc">
          Temukan paket pulsa, data, streaming, dan roaming yang sesuai dengan
          kebutuhan Anda dengan harga terbaik.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate("/produk")}>
            Lihat Semua Produk
          </button>
          <button className="btn-outline" onClick={() => navigate("/promo")}>
            Lihat Promo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
