import { FiPhoneCall } from "react-icons/fi";
import { FiWifi } from "react-icons/fi";
import { FiMonitor } from "react-icons/fi";
import { FiGlobe } from "react-icons/fi";

function Categories() {
  return (
    <section className="categories">
      <h2>Jelajahi Kategori</h2>
      <p>Pilih kategori produk sesuai kebutuhan Anda</p>

      <div className="category-grid">
        <div className="category-card">
          <div className="icon-wrapper" style={{ color: "#1976d2" }}>
            <FiPhoneCall size={40} />
          </div>
          <h3>Pulsa & Nelpon</h3>
          <p>Paket pulsa dan telepon</p>
          <a href="#">Lihat Produk →</a>
        </div>

        <div className="category-card">
          <div className="icon-wrapper" style={{ color: "#4caf50" }}>
            <FiWifi size={40} />
          </div>
          <h3>Kuota Data</h3>
          <p>Paket internet unlimited</p>
          <a href="#">Lihat Produk →</a>
        </div>

        <div className="category-card">
          <div className="icon-wrapper" style={{ color: "#7e57c2" }}>
            <FiMonitor size={40} />
          </div>
          <h3>Streaming</h3>
          <p>Platform hiburan digital</p>
          <a href="#">Lihat Produk →</a>
        </div>

        <div className="category-card">
          <div className="icon-wrapper" style={{ color: "#ff9800" }}>
            <FiGlobe size={40} />
          </div>
          <h3>Roaming</h3>
          <p>Paket internasional</p>
          <a href="#">Lihat Produk →</a>
        </div>
      </div>
    </section>
  );
}

export default Categories;
