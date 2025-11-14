import "../../styles/login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">T</div>
        <h2>Selamat Datang</h2>
        <p>Masuk ke akun Telcoreco Anda</p>

        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="nama@email.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <button type="submit" className="login-button">
            Masuk
          </button>
        </form>

        <p className="register-text">
          Belum punya akun? <a href="/signup">Daftar akun baru</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
