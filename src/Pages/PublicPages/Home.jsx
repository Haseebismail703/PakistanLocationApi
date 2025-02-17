import React from 'react'
import HomeNavbar from '../../Component/PublicCom/HomeNavbar'
import HeroSection from '../../Component/PublicCom/HeroSection'
import Feature from '../../Component/PublicCom/Feature'
import Howitswork from '../../Component/PublicCom/Howitswork'
import Pricing from '../../Component/PublicCom/Pricing'
import Footer from '../../Component/PublicCom/Footer'
function Home() {
  return (
    <div>
      <HomeNavbar/>
      <HeroSection/>
      <Feature/>
      <Howitswork/>
      <Pricing/>
      <Footer/>
    </div>
  )
}

export default Home
