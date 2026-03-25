import React from 'react'
import Hero from '../components/home/Hero'
import Packages from '../components/home/Packages'
import DirectoryOfServices from '../components/home/DirectoryOfServices'
import HomeCollectionProcess from '../components/home/HomeCollectionProcess'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Certifications from '../components/home/Certifications'
import Testimonials from '../components/home/Testimonials'

const Home = () => {
  return (
    <>
      <Hero />
      <Packages />
      <DirectoryOfServices />
      <HomeCollectionProcess />
      <WhyChooseUs />
      <Certifications />
      <Testimonials />
    </>
  )
}

export default Home