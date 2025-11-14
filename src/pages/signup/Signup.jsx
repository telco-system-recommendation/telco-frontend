import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Akun berhasil dibuat! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-logo">
          <i className="fas fa-t"></i>
        </div>

        <h2>Buat Akun Baru</h2>
        <p>Daftar untuk memulai pengalaman digital Anda</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Nama Lengkap */}
          <div className="form-group">
            <label>Nama Lengkap</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-user"></i>
              <input type="text" placeholder="Masukkan nama lengkap" required />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder="nama@email.com" required />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Minimal 8 karakter" required />
            </div>
          </div>

          <button type="submit" className="signup-btn">
           Buat Akun
          </button>
        </form>

        <p className="redirect-text">
          Sudah punya akun?{" "}
          <a href="/login" className="redirect-link">
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
