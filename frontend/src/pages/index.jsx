// pages/index.js
import React from 'react';
import Hero from '../components/Hero';
import Destination from '../components/Destination';
import About from "../components/About";
import Review from "../components/Review";
import Benefit from "../components/Benefit";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
}, []);
  return (
    <div>
      <Hero />
      <Destination />
      <About />
      <Review />
      <Benefit />
    </div>
  );
}

export default Home;
