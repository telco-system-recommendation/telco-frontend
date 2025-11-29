import { FiThumbsUp } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiZap } from "react-icons/fi";

function WhyChoose() {
  return (
    <section className="why-choose">
      <h2>Mengapa Memilih Telcoreco?</h2>
      <p>Platform terpercaya untuk kebutuhan telekomunikasi digital Anda</p>

      <div className="features">
        <div className="card">
          <div className="icon-wrapper feature-icon blue">
            <FiThumbsUp size={40} />
          </div>
          <h3>Rekomendasi Personal</h3>
          <p>
            Dapatkan saran produk yang sesuai dengan kebiasaan dan preferensi
            Anda
          </p>
        </div>

        <div className="card">
          <div className="icon-wrapper feature-icon green">
            <FiCheckCircle size={40} />
          </div>
          <h3>Harga Terbaik</h3>
          <p>
            Bandingkan harga dan temukan penawaran terbaik untuk setiap produk
          </p>
        </div>

        <div className="card">
          <div className="icon-wrapper feature-icon orange">
            <FiZap size={40} />
          </div>
          <h3>Proses Cepat</h3>
          <p>Pembelian mudah dan aktivasi instan untuk semua produk digital</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
