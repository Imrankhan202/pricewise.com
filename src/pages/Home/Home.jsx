import React from "react";
import Header from "../../components/Header/Header";
import Category from "../../components/Category/Category";
import Testimonial from "../../components/Testimonial/Testimonial";
import ProductSearch from "../../components/productsearch/productsearch";

const Home = () => {
  return (
    <div>
      <Header />
      <ProductSearch /> {/* 🔥 Add this new section */}
      <Category />
      <Testimonial />
    </div>
  );
};

export default Home;
