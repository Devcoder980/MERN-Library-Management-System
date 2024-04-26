import React from 'react'
import Navbar from './utility/Navbar';
import LandingPage from './utility/LandingPage';
import Product from './utility/Product';
export default function Hero() {
  return (
    <div>
        <Navbar />
        <LandingPage/>
        <Product/>
    </div>
  )
}
