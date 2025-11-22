import React from "react";
import Hero from "../../components/hero/Hero";
import WhyChoose from "../../components/whychoose/WhyChoose";
import Categories from "../../components/categories/Categories";
import PopularProducts from "../../components/popularproduct/PopularProducts";
import CTA from "../../components/cta/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Categories />
      <PopularProducts />
      <CTA />
    </>
  );
};

export default Home;
