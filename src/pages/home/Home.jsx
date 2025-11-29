import React from "react";
import Hero from "../../components/hero/Hero";
import WhyChoose from "../../components/whychoose/WhyChoose";
import Categories from "../../components/categories/Categories";
import PopularProducts from "../../components/popularproduct/PopularProducts";
import CTA from "../../components/cta/CTA";

const Home = () => {
  return (
    <div className="page page-home">
      <Hero />
      <WhyChoose />
      <Categories />
      <PopularProducts />
      <CTA />
    </div>
  );
};

export default Home;
