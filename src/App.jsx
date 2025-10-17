import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ShoesProduct from "./pages/ShoesProduct/ShoesProduct";
import CosmeticsProduct from "./pages/CosmeticsProduct/CosmeticsProduct";
import ClothesProduct from "./pages/ClothesProduct/ClothesProduct";
import TechnologyProduct from "./pages/technologyProduct/TechnologyProduct";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AllProductDisplay from "./pages/AllProductDisplay/AllProductDisplay";
import Privacy from "./pages/Privacy/Privacy";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ShowDetails from "./pages/technologyProduct/ShowDetails/ShowDetails";
import ShowShoesDetails from "./pages/ShoesProduct/ShowDetails/ShowShoesDetails";
import ShowClothesDetails from "./pages/ClothesProduct/ShowClothesDetails/ShowClothesDetails";
import ShowCosmeticeDetails from "./pages/CosmeticsProduct/ShowCosmeticDetails/ShowCosmeticeDetails";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shoesProduct" element={<ShoesProduct />} />
          <Route path="/shoesDetail/:id" element={<ShowShoesDetails />} />
          <Route path="/cosmeticProduct" element={<CosmeticsProduct />} />
          <Route path="/cosmetics/:id" element={<ShowCosmeticeDetails />} />
          <Route path="/clothesProduct" element={<ClothesProduct />} />
          <Route path="/clothes/:id" element={<ShowClothesDetails />} />
          <Route path="/technologyProduct" element={<TechnologyProduct />} />
          <Route path="/technology/:id" element={<ShowDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/allProduct" element={<AllProductDisplay />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
