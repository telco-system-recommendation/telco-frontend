function PopularProducts() {
  return (
    <section className="popular-products">
      <h2>Produk Populer</h2>
      <p>Paket pilihan yang paling banyak diminati</p>

      <div className="product-grid">
        <div className="product-card">
          <h3>Paket Hemat 10GB</h3>
          <p className="price">Rp 50.000</p>
          <p>10GB + bonus streaming</p>
          <button>Lihat Detail</button>
        </div>

        <div className="product-card">
          <h3>Netflix Premium</h3>
          <p className="price">Rp 186.000</p>
          <p>4K Ultra HD, 4 layar</p>
          <button>Lihat Detail</button>
        </div>

        <div className="product-card">
          <h3>Paket Super 25GB</h3>
          <p className="price">Rp 100.000</p>
          <p>25GB + unlimited sosmed</p>
          <button>Lihat Detail</button>
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
