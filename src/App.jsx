import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponen global
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Halaman yang sudah ada
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Product from "./pages/product/Product";
import Promo from "./pages/promo/Promo";


// CSS Global
import "./styles/_variables.css";
import "./styles/navbar.css";
import "./styles/hero.css";
// import "./styles/whychoose.css";
// import "./styles/categories.css";
// import "./styles/popularproduct.css";
// import "./styles/cta.css";
import "./styles/footer.css";
import "./styles/login.css";
import "./styles/index.css";
import "./styles/signup.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/produk" element={<Product />} />
        <Route path="/promo" element={<Promo />} />
        {/*
        // Halaman berikut akan diaktifkan nanti
        

        <Route path="/cart" element={<Cart />} />
        */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
