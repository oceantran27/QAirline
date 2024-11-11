// pages/index.js
import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Destination from '../components/destination';
import About from "../components/about";
import Review from "../components/review";
import Benefit from "../components/benefit";
import Footer from "../components/footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Destination />
      <About />
      <Review />
      <Benefit />
      <Footer />
    </div>
  );
}

export default Home;
