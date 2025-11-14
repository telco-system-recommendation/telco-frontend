import React from "react";
import "../../styles/product.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWifi, FaTv, FaGlobe } from "react-icons/fa";

const Product = () => {
  return (
    <div className="product-page">
      <h2 className="product-title">Pilih Kategori Produk</h2>
      <p className="product-subtitle">
        Temukan produk telekomunikasi yang sesuai dengan kebutuhan Anda
      </p>

      <div className="product-grid">
        <div className="product-card">
          <div className="icon blue"><FaPhoneAlt size={32} /></div>
          <h3>Pulsa & Nelpon</h3>
          <p>Paket pulsa dan telepon untuk kebutuhan komunikasi</p>
          <button className="btn-product">Lihat Produk</button>
        </div>

        <div className="product-card">
          <div className="icon green"><FaWifi size={32} /></div>
          <h3>Kuota Data</h3>
          <p>Paket internet untuk browsing dan streaming</p>
          <button className="btn-product">Lihat Produk</button>
        </div>

        <div className="product-card">
          <div className="icon purple"><FaTv size={32} /></div>
          <h3>Streaming Subscription</h3>
          <p>Akses ke platform hiburan digital favorit</p>
          <button className="btn-product">Lihat Produk</button>
        </div>

        <div className="product-card">
          <div className="icon orange"><FaGlobe size={32} /></div>
          <h3>Roaming</h3>
          <p>Paket roaming internasional untuk perjalanan</p>
          <button className="btn-product">Lihat Produk</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
