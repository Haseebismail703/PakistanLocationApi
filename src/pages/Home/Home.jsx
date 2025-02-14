import React, { useState } from "react";
import Homenavbar from "../../Component/HomeCompoent/Homenavbar";
import HeroSection from "../../Component/HomeCompoent/HeroSection";
import KeyFeature from "../../Component/HomeCompoent/KeyFeature";
import HowitsWorks from "../../Component/HomeCompoent/HowitsWork";
import Pricing from "../../Component/HomeCompoent/Pricing";
import Footer from "../../Component/HomeCompoent/Footer";
const HomePage = () => {
  return (
    <>
      <Homenavbar />
      <HeroSection />
      <KeyFeature />
      <HowitsWorks />
      <Pricing/>
      <Footer/>
    </>
  );
};

export default HomePage;
