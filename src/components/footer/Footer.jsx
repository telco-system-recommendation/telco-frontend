import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ABOUT */}
        <div className="footer-about">
          <div className="footer-logo">
            <img src={logo} alt="telcoreco-logo" />
            <h3>Telcoreco</h3>
          </div>
          <p>
            Platform rekomendasi produk telekomunikasi terpercaya untuk memenuhi
            kebutuhan digital Anda.
          </p>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Hubungi Kami</h4>
          <p>
            <FaPhone /> +62 21 1234 5678
          </p>
          <p>
            <FaEnvelope /> info@telcoreco.com
          </p>
          <p>
            <FaMapMarkerAlt /> Jakarta, Indonesia
          </p>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Ikuti Kami</h4>
          <div className="footer-social-icons">
            <a>
              <FaFacebook />
            </a>
            <a>
              <FaTwitter />
            </a>
            <a>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="copyright">© 2025 Telcoreco. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
